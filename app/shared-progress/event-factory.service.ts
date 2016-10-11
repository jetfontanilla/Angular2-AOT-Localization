import { Injectable, NgZone } from "@angular/core";
import { LoggerService } from "../shared/logger.service";
import * as EventFactory from "./event-factory/factory";
export * from "./event-factory/factory";

export interface Event {
    type: string;
    eventTime: Date;
    activityTypeID: number;
    accountID: number;
    activitySessionID: string;
}

@Injectable()
export class EventFactoryService {
    readonly TYPE_START: string = "start";
    readonly TYPE_COMPLETE: string = "complete";
    readonly TYPE_DIALOGLINE: string = "dialog-line";
    readonly TYPE_WORD: string = "word";

    constructor(protected logger: LoggerService, protected zone: NgZone) {
        (<any>window).eventFactory = {
            zone: this.zone,
            getFactory: (eventType: string, accountId: number = 0) => this.getFactory(eventType, accountId),
            service: this
        };
    }

    getFactory(eventType: string, accountId: number = 0): EventFactory.AbstractEventFactory {
        switch (eventType) {
            case this.TYPE_START:
                return new EventFactory.StartEventFactory(accountId, this.logger);
            case this.TYPE_COMPLETE:
                return new EventFactory.CompleteEventFactory(accountId, this.logger);
            case this.TYPE_DIALOGLINE:
                return new EventFactory.DialogLineEventFactory(accountId, this.logger);
            case this.TYPE_WORD:
                return new EventFactory.WordEventFactory(accountId, this.logger);
            default:
                this.logger.error("eventFactoryFactory", "invalid event type:" + eventType);
                return undefined;
        }
    }

    buildSessionTimeKey(): string {
        let date = new Date();

        return _.padStart(String(date.getFullYear()), 2, "0")
            + _.padStart(String(date.getUTCMonth() + 1), 2, "0")
            + _.padStart(String(date.getUTCDate()), 2, "0")
            + _.padStart(String(date.getUTCHours()), 2, "0")
            + _.padStart(String(date.getUTCMinutes()), 2, "0")
            + _.padStart(String(date.getUTCSeconds()), 2, "0")
            + _.padStart(String(date.getUTCMilliseconds()), 3, "0");
    }
}
