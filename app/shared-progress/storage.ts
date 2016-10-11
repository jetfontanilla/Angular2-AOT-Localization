import { LoggerService } from "../shared/logger.service";
import { Event } from "./event-factory.service";

declare var localforage: any;
declare var window: any;

export interface StorageAdapter {
    append(data: Event): Promise<EventData<Event>[]>;

    get(itemCount: number): Promise<EventData<Event>[]>;

    remove(id: number): Promise<EventData<Event>[]>;

    set(data: EventData<Event>[]): Promise<EventData<Event>[]>;

    removeIds(ids: number[]): Promise<EventData<Event>[]>;
}

export interface EventData<IEvent> {
    eventID: number;
    data: IEvent;
}

export abstract class StorageUtility {

    protected static id: number = 0;
    protected static storageAvailable = true;

    static localStorageAvailable(logger: LoggerService = window.newRelicLogger.service): boolean {
        if (!StorageUtility.storageAvailable) {
            return false;
        }

        let storage;
        let fail: boolean;
        let uid: string;

        StorageUtility.storageAvailable = true;
        try {
            uid = new Date().toLocaleString();
            storage = window.localStorage;
            if (!storage) {
                logger.error("localStorage", "localStorage not supported");
                StorageUtility.setAvailable(false);
            }
            storage.setItem(uid, uid);
            fail = storage.getItem(uid) != uid;
            if (fail) {
                logger.error("localStorage", "localStorage is full");
                StorageUtility.setAvailable(false);
            }
            storage.removeItem(uid);
        } catch (e) {
            logger.error("localStorage", e);
            StorageUtility.setAvailable(false);
        }

        return StorageUtility.storageAvailable;
    }

    static setAvailable(isAvailable: boolean) {
        StorageUtility.storageAvailable = isAvailable;
    }

    static getId(): number {
        this.id += 1;
        return this.id;
    }

    static setId(id: number): void {
        this.id = id;
    }
}

(<any>window).storageUtility = StorageUtility;
