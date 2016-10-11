import { MemoryAdapterService } from "./memory-adapter.service";

xdescribe("MemoryAdapterService", () => {
    beforeEach(() => {
        // configure TestBed and Providers here
    });

    // test for localStorageAvailable, spy StorageUtility set to return true
    it("localStorage available is true", () => {
        expect(true).toBe(false);
    });

    // test for localStorageAvailable, spy StorageUtility set to return false
    it("localStorage available is false", () => {
        expect(true).toBe(false);
    });

    it("localStorage getAll/set", () => {
        expect(true).toBe(false);
        // spy on memory, and make sure memory has empty storage

        // check getAll() returns empty set

        // call set() with an array of objects

        // check that get() returns what we have set()
    });

    it("localStorage get(n)", () => {
        expect(true).toBe(false);
        // spy on memory, and make sure memory has empty storage

        // check getAll()

        // call set() with an array of m objects

        // check that get(n) returns n items if n < m

        // check that get(n) returns m items if n > m
    });

    it("localStorage append", () => {
        expect(true).toBe(false);
        // spy on memory, and make sure memory has empty storage

        // check getAll()

        // call append() with an object

        // check that get() returns what we have appended as the last item

        // check that the auto increment ID is also correct
    });

    it("localStorage remove", () => {
        expect(true).toBe(false);
        // spy on memory, and make sure memory has empty storage

        // check getAll()

        // call append() with an object
        // call append() with another object

        // check that get() returns what we have appended as the last item

        // call remove() with the ID of the last item

        // call getAll()

        // make sure that the item we removed has now been removed from storage
        // while the item we didn't remove is still there
    });

    it("localStorage removeIds", () => {
        expect(true).toBe(false);
        // spy on memory, and make sure memory has empty storage

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

    it("localStorage removeAll", () => {
        expect(true).toBe(false);
        // spy on memory, and make sure memory has empty storage

        // check get()

        // call append() with an object
        // call append() with another object

        // call removeAll()

        // call getAll()

        // should return empty set
    });
});
