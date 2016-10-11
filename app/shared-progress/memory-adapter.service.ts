import { Injectable } from "@angular/core";
import { LoggerService } from "../shared/logger.service";
import { Event } from "./event-factory.service";
import { StorageAdapter, StorageUtility, EventData } from "./storage";

@Injectable()
export class MemoryAdapterService implements StorageAdapter {
    protected nameSpace: string;
    protected storage: EventData<Event>[] = [];

    constructor(protected logger: LoggerService) {
    }

    setNameSpace(nameSpace: string) {
        this.nameSpace = nameSpace;
    }

    localStorageAvailable(): boolean {
        return StorageUtility.localStorageAvailable(this.logger);
    }

    getId() {
        return StorageUtility.getId();
    }

    get(itemCount: number): Promise<EventData<Event>[]> {
        return new Promise(resolve => {
            resolve(this.storage.slice(0, itemCount));
        });
    }

    set(data: EventData<Event>[]): Promise<EventData<Event>[]> {
        this.storage = data;
        return new Promise(resolve => {
            resolve(data);
        });
    }

    append(data: Event): Promise<EventData<Event>[]> {
        let items = this.storage;
        if (!items || _.isEmpty(items)) {
            return this.set([{
                eventID: 1,
                data: data
            }]);
        }

        let lastEvent = _.maxBy(items, "eventID");
        let newData = _.concat(items, [{
            eventID: lastEvent.eventID,
            data: data
        }]);

        return this.set(newData);
    }

    remove(id: number): Promise<EventData<Event>[]> {
        let filtered = _.filter(this.storage, (event) => {
            return !_.isEmpty(event) && event.eventID != id && !!event.data;
        });
        return this.set(filtered);
    }

    removeIds(ids: number[]): Promise<EventData<Event>[]> {
        let filtered = _.filter(this.storage, (event) => {
            return !_.isEmpty(event) && !_.includes(ids, event.eventID) && !!event.data;
        });
        return this.set(filtered);
    }
}
