import * as _ from "lodash";
import {
    CompleteEventFactory,DialogLineEventFactory, EventFactoryService, StartEventFactory, WordEventFactory
} from "./event-factory.service";
import { LoggerService } from "../shared/logger.service";

import { TestBed } from "@angular/core/testing";
import { ConsoleLoggerService } from "../shared/logger/console-logger.service";
import { AbstractEventFactory } from "./event-factory/factory/abstract";
import { EventFactoryMock } from "./event-factory.mock";


describe("EventFactoryService", () => {

    let logger: any;
    let errorLoggerSpy: jasmine.Spy;

    let eventFactory : any;
    let eventMock : any;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                {provide: LoggerService, useValue: logger},
                {provide: EventFactoryService, useValue: eventFactory}
            ]
        });

        logger = new LoggerService(undefined, new ConsoleLoggerService(), undefined);
        errorLoggerSpy = spyOn(logger, "error").and.callThrough();

        eventFactory = new EventFactoryService(logger, undefined);
        eventMock = new EventFactoryMock();
    });

    it("should return StartEventFactory", () => {
        let startEventFactory = eventFactory.getFactory(eventFactory.TYPE_START);
        expect(startEventFactory instanceof StartEventFactory).toBe(true);

        testEventFactoryValidation(startEventFactory);
    });

    xit("should return CompleteEventFactory", () => {
        let completeEventFactory = eventFactory.getFactory(eventFactory.TYPE_COMPLETE);
        expect(completeEventFactory instanceof CompleteEventFactory).toBe(true);

        testEventFactoryValidation(completeEventFactory);
    });

    xit("should return DialogLineEventFactory", () => {
        let dialogLineEventFactory = eventFactory.getFactory(eventFactory.TYPE_DIALOGLINE);
        expect(dialogLineEventFactory instanceof DialogLineEventFactory).toBe(true);

        testEventFactoryValidation(dialogLineEventFactory);
    });

    xit("should return WordEventFactory", () => {
        let wordEventFactory = eventFactory.getFactory(eventFactory.TYPE_WORD);
        expect(wordEventFactory instanceof WordEventFactory).toBe(true);

        testEventFactoryValidation(wordEventFactory);
    });

    xit("should return undefined on invalid type", () => {
        let bogusFactory = eventFactory.getFactory("bogus");
        expect(bogusFactory).toBeUndefined();
        expect(errorLoggerSpy.calls.count()).toBe(1, "error called");

        // here's how to spy and get the args
        //_.map(errorLoggerSpy.calls.first().args, (arg) => {
        //    console.log(arg);
        //});

        expect(errorLoggerSpy.calls.first().args[1]).toBe("invalid event type:bogus");
    });

    let testEventFactoryValidation = (eventFactory : AbstractEventFactory) => {

        let definedEventTypes : string[] = eventFactory.getValidEventTypes();
        expect(definedEventTypes.length).toBeGreaterThan(0);

        _.map(definedEventTypes, (eventType : string) => {
            let eventParams : any = eventMock.getEventParameters(eventType);
            let activityEvent = eventFactory.createEvent(eventParams);
            expect(activityEvent).toBeDefined();
        });

        //
        //let activityEvent = eventFactory.createEvent(eventParams);
        //expect(activityEvent).toBeDefined();
        //let undefinedEvents = _.difference(eventFactory.getAllActivityIds(), definedEvents);
    };

    /*

    this is going to be a very long part, but the pseudo code for the O(n^2) test is as follows:

    for (eventfactory in [start, complete, dialog, word]) => {
        for (validTypes in eventfactory) => {
            // create event with valid schema
            it("should return valid event")

            // create event with invalid schema
            // spy on logger and check that an error log is sent
            it("should return undefined on invalid events")
        }

         // create event with unkown / invalid type
         // spy on logger and check that an error log is sent
         it("should return undefined on invalid event type")
    }
     */
});


