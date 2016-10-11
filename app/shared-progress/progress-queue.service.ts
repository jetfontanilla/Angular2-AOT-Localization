import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { LoggerService } from "../shared/logger.service";
import { Event } from "./event-factory.service";
import { StorageAdapter, StorageUtility, EventData } from "./storage";
import { LocalForageAdapterService } from "./local-forage-adapter.service";
import { MemoryAdapterService } from "./memory-adapter.service";
import { ConnectionFactoryService } from "../shared/connection-factory.service";
import { Emitter, EmitterService } from "../shared/emitter.service";

// Add the RxJS Observable operators we need in this app.
import "../rxjs-operators";


@Injectable()
export class ProgressQueueService {
    static NS = "events";
    static RETRY_COEFFICIENT = 1.5;
    static NUM_EVENT_LIMIT = 10;

    private iterations: number;
    private pollEndTime: number;
    private pollActive: boolean = false;
    private isProcessing: boolean = false;
    private isLocked: boolean = false;
    private emitter: Emitter;

    constructor(private zone: NgZone,
                private connection: ConnectionFactoryService,
                private logger: LoggerService,
                private storage: LocalForageAdapterService,
                private memoryStorage: MemoryAdapterService,
                private emitterService: EmitterService) {

        this.storage.setNameSpace(ProgressQueueService.NS);
        this.memoryStorage.setNameSpace(ProgressQueueService.NS);
        this.emitter = this.emitterService.create();

        (<any>window).progressQueue = {
            zone: this.zone,
            sendEvent: (params: Event) => this.sendEvent(params),
            subscribe: (callback: () => void) => this.subscribe(callback),
            processEvents: () => this.processEvents(),
            service: this
        };

        this.processEvents();
    }

    processEvents(): void {
        this.pollFunc(() => this.processQueue(this.storage)); // for checking if we have left-over events
    }

    sendEvent(params: Event): void {
        if (_.isEmpty(params)) {
            return;
        }

        if (this.isLocked) {
            setTimeout(() => this.sendEvent(params), 10);
            return;
        }

        this.isLocked = true;

        let fallbackFn = () => {
            this
                .postEvent(this.memoryStorage, [{
                    eventID: StorageUtility.getId(),
                    data: params
                }])
                .subscribe(
                    () => {
                    },
                    () => this.pollFunc(() => this.processQueue(this.memoryStorage))
                );

            this.isLocked = false;
        };

        if (this.storage.localStorageAvailable()) {
            this.storage
                .append(params)
                .then(() => {
                    this.pollFunc(() => this.processQueue(this.storage));
                    this.isLocked = false;
                })
                .catch(e => {
                    this.storage.getAll().then(eventData => {
                        _.map(eventData, event => {
                            if (!_.isEmpty(event) && event.data) {
                                this.memoryStorage.append(event.data);
                            }
                        });
                        this.storage.removeAll();
                    });

                    fallbackFn();
                });
        } else {
            fallbackFn();
        }
    }

    protected pollFunc(fn: () => Promise<boolean>, timeout: number = 60000, interval: number = 1000): void {
        let self = this;
        self.iterations = 0;
        self.pollEndTime = (new Date()).getTime() + timeout; //extend timeout when a new request comes

        if (!self.pollActive) {
            self.pollActive = true;

            // start main loop
            let loopFn = () => {
                if (self.isProcessing) {
                    // previous thread not yet done, re-process again on the next iteration
                    self.pollEndTime += interval;
                    setTimeout(loopFn, interval);
                    return;
                }

                fn().then(isDone => {
                    let canPoll = (new Date).getTime() < self.pollEndTime;
                    if (!isDone && canPoll) {
                        // storage not empty, re-process
                        self.iterations += 1;
                        setTimeout(loopFn, interval * Math.pow(ProgressQueueService.RETRY_COEFFICIENT, self.iterations));
                    } else {
                        // if max timeout reached or storage is empty, poll main thread ends
                        self.pollActive = false;
                    }
                });
            };
            loopFn();
        }
    }

    protected processQueue(storage: StorageAdapter): Promise<boolean> {
        return storage.get(ProgressQueueService.NUM_EVENT_LIMIT).then(events => {
            let isDone = _.isEmpty(events);
            if (isDone) {
                return true;
            }

            this.postEvent(storage, events);
            return false;
        });
    }

    protected postEvent(storage: StorageAdapter,
                        baseEventData: EventData<Event>[]): Observable<Object> {
        let eventData = _.filter(baseEventData, (event) => {
            return !_.isEmpty(event) && event.data;
        });

        if (_.isEmpty(eventData)) {
            return;
        }

        let events: Event[] = _.map(eventData, e => e.data);
        if (!events || !events.length) {
            storage.removeIds(_.map(eventData, e => e.eventID));
            return;
        }

        this.isProcessing = true;

        let alwaysFn = () => {
            this.isProcessing = false;
            this.logger.trackEvent("postEvent", "total");
        };

        let successFn = () => {
            storage.removeIds(_.map(eventData, e => e.eventID));
            this.publish(eventData, true, 200);
            alwaysFn();
        };

        let errorFn = (error) => {
            if (error.status && error.status == 500) {
                // rotate the events, so they don"t get stuck
                storage.removeIds(_.map(eventData, e => e.eventID));
                _.map(eventData, e => storage.append(e.data));

                return this.publish(eventData, false, error.status);
            }

            let responseBody: any = {};
            let responseText: string = "";

            if (typeof error == "Response") {
                responseText = error.text() || error.statusText || "error in sending events";
                if (responseText) {
                    try {
                        responseBody = JSON.parse(responseText);
                    } catch (e) {
                        responseBody = {};
                    }
                }
            } else {
                responseText = error;
                responseBody = {};
            }

            if (responseBody && "key" in responseBody && responseBody.key && _.isArray(responseBody.key)) {
                let failedEventIndex = _.map(responseBody.key, "index");

                if (failedEventIndex && failedEventIndex.length) {
                    let failedEventData = _.filter(eventData, (v, k) => {
                        return _.includes(failedEventIndex, k);
                    });
                    let successEventData = _.filter(eventData, (v, k) => {
                        return !_.includes(failedEventIndex, k);
                    });

                    if (successEventData.length) {
                        this.publish(successEventData, true, error.status);
                        storage.removeIds(_.map(successEventData, e => e.eventID));
                    }

                    if (!failedEventData.length) {
                        return;
                    }

                    this.logger.error("postEvent", responseText, error.status);
                    this.logger.trackEvent("postEvent", error.status ? "fail/" + error.status : "fail", {statusCode: error.status});

                    if (error.status == 405 || (responseBody.statusCode && responseBody.statusCode == 405)) {
                        storage.removeIds(_.map(failedEventData, e => e.eventID));
                    }

                    return this.publish(failedEventData, false, error.status);
                }
            }

            this.logger.error("postEvent", responseText || "error in sending events", error.status);
            this.logger.trackEvent("postEvent", error.status ? "fail/" + error.status : "fail", {statusCode: error.status});

            if (error.status == 405 || (responseBody && responseBody.statusCode && responseBody.statusCode == 405)) {
                storage.removeIds(_.map(eventData, e => e.eventID));
            }

            alwaysFn();
            this.publish(eventData, false, error.status);
        };

        let httpStream = this.connection
            .service("reportcard")
            .setPath("/event")
            .post({}, events);

        httpStream.subscribe(successFn, errorFn);

        return httpStream;
    }

    subscribe(callback: (data?) => void): void {
        this.emitter.subscribe(ProgressQueueService.NS, callback);
    }

    protected publish(eventData: EventData<Event>[], success: boolean, status: number): void {
        _.map(eventData, event => {
            this.emitter.publish(ProgressQueueService.NS, {
                success: success,
                data: event.data,
                httpStatus: status
            });
        });
    }
}
