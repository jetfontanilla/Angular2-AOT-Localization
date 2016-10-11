import { Injectable } from "@angular/core";
import { LoggerService } from "../shared/logger.service";
import { Event } from "./event-factory.service";
import { StorageAdapter, StorageUtility, EventData } from "./storage";

declare var localforage: any;

@Injectable()
export class LocalForageAdapterService implements StorageAdapter {
    protected nameSpace: string;

    constructor(protected logger: LoggerService) {
        try {
            localforage.config({
                name: "LocalForage Adapter"
            });
        } catch (e) {
            this.logger.error("localForage", e);
        }
    }

    setNameSpace(nameSpace: string) {
        this.nameSpace = nameSpace;
        this.getStorage().then(items => {
            if (!items || _.isEmpty(items)) {
                return;
            }

            let lastEvent = _.maxBy(items, "eventID");
            StorageUtility.setId(lastEvent.eventID);
        });
    }

    localStorageAvailable(): boolean {
        return StorageUtility.localStorageAvailable(this.logger);
    }

    getId() {
        return StorageUtility.getId();
    }

    private getStorage(): Promise<EventData<Event>[]> {
        return localforage
            .getItem(this.nameSpace)
            .catch(e => {
                this.logger.error("localForage", e);
                StorageUtility.setAvailable(false);

                return Promise.reject(e);
            });
    }

    set(data: EventData<Event>[]): Promise<EventData<Event>[]> {
        return localforage
            .setItem(this.nameSpace, data)
            .catch(e => {
                this.logger.error("localForage", e);
                StorageUtility.setAvailable(false);

                return Promise.reject(e);
            });
    }

    get(itemCount: number): Promise<EventData<Event>[]> {
        return this.getStorage().then(items => {
            if (!items || _.isEmpty(items)) {
                return [];
            }

            return items.slice(0, itemCount);
        });
    }

    append(data: Event): Promise<EventData<Event>[]> {
        return this.getStorage().then(items => {
            if (_.isEmpty(items)) {
                items = [];
            }

            let newData = _.concat(items, [{
                eventID: StorageUtility.getId(),
                data: data
            }]);

            return this.set(newData);
        });
    }

    remove(id: number): Promise<EventData<Event>[]> {
        return this.getStorage().then(items => {
            if (!items || _.isEmpty(items)) {
                return this.set([]);
            }

            let newData = _.filter(items, (event) => {
                return !_.isEmpty(event) && event.eventID != id && !!event.data;
            });

            return this.set(newData);
        });
    }

    removeIds(ids: number[]): Promise<EventData<Event>[]> {
        return this.getStorage().then(items => {
            if (!items || _.isEmpty(items)) {
                return this.set([]);
            }

            let newData = _.filter(items, (event) => {
                return !_.isEmpty(event) && !_.includes(ids, event.eventID) && !!event.data;
            });

            return this.set(newData);
        });
    }

    getAll(): Promise<EventData<Event>[]> {
        return this.getStorage();
    }

    removeAll(): Promise<void> {
        return localforage.removeItem(this.nameSpace);
    }
}
