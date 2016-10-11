import { AbstractEventFactory } from "./event-factory/factory/abstract";

export class EventFactoryMock {

    // db.activityevents.find({"eventType":"StartActivityWatch", eventTime: {$gte: ISODate("2016-10-01T00:00:00.000Z"),$lt: ISODate("2016-10-10T00:00:00.000Z")}}).limit(1);

    private eventParamMock : {[activityTypeId: number]: {}} = {};

    constructor() {

        this.eventParamMock["StartCliplist"] = {
            eventType : "StartCliplist",
            eventTime : "2016-10-01T00:00:19.883Z",
            activityTypeID : 8,
            activityID : 74027,
            activitySessionID : "7402729959801475280019883",
            accountID : 0
        };

        this.eventParamMock["StartActivityWatch"] = {
            eventType : "StartActivityWatch",
            eventTime : "2016-10-01T00:00:00.183Z",
            activityTypeID : 9,
            activityID : 785,
            activitySessionID : "785240297220161001000000182",
            accountID : 0
        };

        this.eventParamMock["StartActivityLearn"] = {
            eventType : "StartActivityLearn",
            eventTime : "2016-10-01T00:00:00.310Z",
            activityTypeID : 10,
            activityID : 217373,
            activitySessionID : "21737330544541475280000310",
            accountID : 0
        };

        this.eventParamMock["StartActivitySpeak"] = {
            eventType : "StartActivitySpeak",
            eventTime : "2016-10-01T00:00:00.624Z",
            activityTypeID : 11,
            activityID : 203482,
            activitySessionID : "203482284941920161001000000623",
            sessionTimeKey : 20161001000000623,
            accountID : 0,
            sessionTypeID : 1,
            wordRootID : 0,
            wordHeadID : 0,
            detectorLabel : ""
        };

        this.eventParamMock["StartQuiz"] = {
            eventType : "StartQuiz",
            eventTime : "2016-10-01T00:00:07.032Z",
            activityTypeID : 15,
            activityID : 199768,
            activitySessionID : "19976829746761475280007032"
        };

        /*
        this.eventParamMock[AbstractEventFactory.LEARN_NAMEDCLIPLIST] = {
            activityTypeID: AbstractEventFactory.LEARN_NAMEDCLIPLIST,
            sessionTypeID: 12,
            activityID: 90256,
            dialogLineID: 37058,
            sessionTimeKey: 171123486149140591,
            sessionLineTimeKey: 171123486149140591
        };

        this.eventParamMock[AbstractEventFactory.SPEAK_NAMEDCLIPLIST] = {
            activityTypeID: AbstractEventFactory.SPEAK_NAMEDCLIPLIST,
            sessionTypeID: 12,
            activityID: 90390,
            dialogID: 11009,
            dialogLineID: 21452,
            sessionTimeKey: 171123486149140591,
            sessionLineTimeKey: 171123486149140591,
            lineCount: 10
        };

        this.eventParamMock[AbstractEventFactory.WATCH_PRONCLIPLIST] = {
            activityTypeID: AbstractEventFactory.WATCH_PRONCLIPLIST,
            sessionTypeID: 11,
            activityID: 179573
        };

        this.eventParamMock[AbstractEventFactory.SPEAK_PRONCLIPLIST] = {
            activityTypeID: AbstractEventFactory.SPEAK_PRONCLIPLIST,
            sessionTypeID: 11,
            activityID: 88975
        };

        this.eventParamMock[AbstractEventFactory.WATCH_WORDCLIPLIST] = {
            activityTypeID: AbstractEventFactory.WATCH_WORDCLIPLIST,
            sessionTypeID: 10,
            activityID: 52114
        };

        this.eventParamMock[AbstractEventFactory.LEARN_WORDCLIPLIST] = {
            activityTypeID: AbstractEventFactory.LEARN_NAMEDCLIPLIST,
            sessionTypeID: 10,
            activityID: 68497
        };

        this.eventParamMock[AbstractEventFactory.SPEAK_WORDCLIPLIST] = {
            activityTypeID: AbstractEventFactory.SPEAK_NAMEDCLIPLIST,
            sessionTypeID: 10,
            activityID: 72592
        };

        this.eventParamMock[AbstractEventFactory.WATCH_DIALOG] = {
            activityTypeID: AbstractEventFactory.WATCH_DIALOG,
            sessionTypeID: 1,
            activityID: 1
        };

        this.eventParamMock[AbstractEventFactory.LEARN_DIALOG] = {
            activityTypeID: AbstractEventFactory.LEARN_DIALOG,
            sessionTypeID: 1,
            activityID: 2
        };

        this.eventParamMock[AbstractEventFactory.SPEAK_DIALOG] = {
            activityTypeID: AbstractEventFactory.SPEAK_DIALOG,
            sessionTypeID: 1,
            activityID: 3,
            sessionTimeKey: 171123486149140591
        };

        this.eventParamMock[AbstractEventFactory.QUIZ_DIALOG] = {
            activityTypeID: AbstractEventFactory.QUIZ_DIALOG,
            activityID: 4
        };

        this.eventParamMock[AbstractEventFactory.QUIZ_COURSE] = {
            activityTypeID: AbstractEventFactory.QUIZ_COURSE,
            activityID: 27540
        };

*/
    }

    public getEventParameters(eventType: string) {
        return this.eventParamMock[eventType];
    }

}
