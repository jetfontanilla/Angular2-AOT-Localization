import { ProgressQueueService } from "./progress-queue.service";

xdescribe("ProgressQueueService", () => {
    beforeEach(() => {
        // configure TestBed and Providers here
    });


    // create spy on localforageservice, set localStorageAvailable function to return true
    it("should use localforageadapter if html5 storage available", () => {
        expect(true).toBe(false);

    });

    it("should append event to localforageadapter when html5 storage available", () => {
        expect(true).toBe(false);

        // spy and check value of this._storage.get()

        // call sendEvent with a sample object

        // spy and check that this._storage.get() now contains what was passed on sendEvent
    });

    // create spy on localforageservice, set localStorageAvailable function to return false
    it("should use memoryadapter if html5 storage not available", () => {
        expect(true).toBe(false);

    });

    it("should append event to memoryadapter when html5 storage not available", () => {
        expect(true).toBe(false);
        // spy and check value of this._memorystorage.get()

        // call sendEvent with a sample object

        // spy and check that this._memorystorage.get() now contains what was passed on sendEvent
    });

    it("should remove items from queue when event is sent successfully", () => {
        expect(true).toBe(false);
        // spy and prepopulate localforageadapter with 10 or more events

        // call storage.get(num items) to check the items to send in queue

        // call processEvents

        // spy on .post() and return an Observable that is success

        // check localforageadapter and check that successful elements were removed
    });

    it("should not remove items from queue when event sending failed", () => {
        expect(true).toBe(false);
        // spy and prepopulate localforageadapter with 10 or more events

        // call storage.get(num items) to check the items to send in queue

        // call processEvents

        // spy on .post() and return an Observable that is failing

        // check localforageadapter and check that error elements were still present
    });

    it("should only remove specific items from queue when event returns a 405 for only specific events", () => {
        expect(true).toBe(false);
        // spy and prepopulate localforageadapter with 10 or more events

        // call storage.get(num items) to check the items to send in queue

        // call processEvents

        // spy on .post() and return an Observable that is failing with the 405 message where the failing events index are

        // check localforageadapter and check that error elements were still present, and success events were removed
    });

    it("should notify subscribers of successful events", () => {
        expect(true).toBe(false);
        // call subscribe with a callback function

        // call post event

        // attach spy on post() and return successful event

        // assert that for each event passed, a successful notification event was triggered
    });

    it("should notify subscribers of failed events", () => {
        expect(true).toBe(false);
        // call subscribe with a callback function

        // call post event

        // attach spy on post() and return failed event

        // assert that for each event failed, a successful notification event was triggered
    });
});
