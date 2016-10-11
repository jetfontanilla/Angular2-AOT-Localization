import { LocalForageAdapterService } from "./local-forage-adapter.service";
import { LoggerService } from "../shared/logger.service";
import { StorageUtility } from "./storage";

import { TestBed } from "@angular/core/testing";
import { ConsoleLoggerService } from "../shared/logger/console-logger.service";

describe("LocalForageAdapterService", () => {

    let logger: LoggerService;
    let storage: LocalForageAdapterService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                {provide: LoggerService, useValue: logger},
                {provide: LocalForageAdapterService, useValue: storage}
            ]
        });

        logger = new LoggerService(undefined, new ConsoleLoggerService(), undefined);
        storage = new LocalForageAdapterService(logger);
    });

    // test for localStorageAvailable, spy StorageUtility set to return true
    it("localStorage available is true", () => {
        expect(storage.localStorageAvailable()).toBe(true);
    });

    // test for localStorageAvailable, spy StorageUtility set to return false
    xit("localStorage available is false", () => {
        expect(true).toBe(false);
    });

    xit("localStorage getAll/set", () => {
        expect(true).toBe(false);
        // spy on localforage, and make sure localforage has empty storage

        // check getAll() returns empty set

        // call set() with an array of objects

        // check that get() returns what we have set()
    });

    xit("localStorage get(n)", () => {
        expect(true).toBe(false);
        // spy on localforage, and make sure localforage has empty storage

        // check getAll()

        // call set() with an array of m objects

        // check that get(n) returns n items if n < m

        // check that get(n) returns m items if n > m
    });

    xit("localStorage append", () => {
        expect(true).toBe(false);
        // spy on localforage, and make sure localforage has empty storage

        // check getAll()

        // call append() with an object

        // check that get() returns what we have appended as the last item

        // check that the auto increment ID is also correct
    });

    xit("localStorage remove", () => {
        expect(true).toBe(false);
        // spy on localforage, and make sure localforage has empty storage

        // check getAll()

        // call append() with an object
        // call append() with another object

        // check that get() returns what we have appended as the last item

        // call remove() with the ID of the last item

        // call getAll()

        // make sure that the item we removed has now been removed from storage
        // while the item we didn't remove is still there
    });

    xit("localStorage removeIds", () => {
        expect(true).toBe(false);
        // spy on localforage, and make sure localforage has empty storage

        // check getAll()

        // call append() with an object
        // call append() with another object
        // call append() with another object

        // check that get() returns what we have appended as the items

        // call removeIds() with the IDs 2 of the items we appended

        // call getAll()

        // make sure that the item we removed has now been removed from storage,
        // while the item we didn't remove is still there
    });

    xit("localStorage removeAll", () => {
        expect(true).toBe(false);
        // spy on localforage, and make sure localforage has empty storage

        // check get()

        // call append() with an object
        // call append() with another object

        // call removeAll()

        // call getAll()

        // should return empty set
    });
});
