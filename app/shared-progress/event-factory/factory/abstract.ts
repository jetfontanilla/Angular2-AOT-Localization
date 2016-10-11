import { LoggerService } from "../../../shared/logger.service";
import * as EventValidators from "../../event-factory/validator/index";

export interface EventTypeInfo {
    eventType: string;
    validator: EventValidators.Validator;
}

export abstract class AbstractEventFactory {
    static WATCH_NAMEDCLIPLIST = 1;
    static LEARN_NAMEDCLIPLIST = 2;
    static SPEAK_NAMEDCLIPLIST = 3;
    static WATCH_PRONCLIPLIST = 4;
    static SPEAK_PRONCLIPLIST = 5;
    static WATCH_WORDCLIPLIST = 6;
    static LEARN_WORDCLIPLIST = 7;
    static SPEAK_WORDCLIPLIST = 8;
    static WATCH_DIALOG = 9;
    static LEARN_DIALOG = 10;
    static SPEAK_DIALOG = 11;
    static QUIZ_DIALOG = 15;
    static QUIZ_COURSE = 17;

    static DEFINED_ACTIVITY_IDS = [
        AbstractEventFactory.WATCH_NAMEDCLIPLIST,
        AbstractEventFactory.LEARN_NAMEDCLIPLIST,
        AbstractEventFactory.SPEAK_NAMEDCLIPLIST,
        AbstractEventFactory.WATCH_PRONCLIPLIST,
        AbstractEventFactory.SPEAK_PRONCLIPLIST,
        AbstractEventFactory.WATCH_WORDCLIPLIST,
        AbstractEventFactory.LEARN_WORDCLIPLIST,
        AbstractEventFactory.SPEAK_WORDCLIPLIST,
        AbstractEventFactory.WATCH_DIALOG,
        AbstractEventFactory.LEARN_DIALOG,
        AbstractEventFactory.SPEAK_DIALOG,
        AbstractEventFactory.QUIZ_DIALOG,
        AbstractEventFactory.QUIZ_COURSE,
    ];

    protected eventTypeLookup: {[activityTypeId: number]: EventTypeInfo} = {};

    constructor(protected accountId: number = 0, protected logger: LoggerService) {
    }

    protected generateSessionId(activityID: number, time: Date): string {
        return [activityID, this.accountId, time.getTime()].join("");
    }

    protected getEventValidator(activityTypeId: number): EventValidators.Validator {
        if (activityTypeId in this.eventTypeLookup) {
            return this.eventTypeLookup[activityTypeId].validator;
        }

        this.logger.error("eventFactory", "invalid activity type ID");
        return undefined;
    }

    protected getEventType(activityTypeId: number): string {
        if (activityTypeId in this.eventTypeLookup) {
            return this.eventTypeLookup[activityTypeId].eventType;
        }

        this.logger.error("eventFactory", "invalid activity type ID");
        return undefined;
    }

    protected getValidator(eventParams): EventValidators.Validator {
        if (!eventParams.activityTypeID) {
            throw "missing activityTypeID";
        }

        let eventValidator = this.getEventValidator(eventParams.activityTypeID);
        if (!eventValidator) {
            throw "no validator found for activityID: " + eventParams.activityTypeID;
        }
        return eventValidator;
    }

    protected isValid(eventParams): boolean {
        if (_.isEmpty(eventParams)) {
            this.logger.error("eventFactory", "invalid event param type", 0, eventParams);
            return false;
        }

        try {
            let eventValidator = this.getValidator(eventParams);
            eventValidator.validate(eventParams);
        } catch (e) {
            this.logger.error("eventFactory", e, 0, eventParams);
            return false;
        }

        return true;
    }

    public createEvent(eventParams: any): Event {
        if (_.isEmpty(eventParams)) {
            return undefined;
        }

        let currentTime = new Date();
        let params = _.clone(eventParams);

        params.type = this.getEventType(eventParams.activityTypeID) || eventParams.type;
        params.eventTime = this.getBsonDate(currentTime);
        params.accountID = this.accountId;
        params.activitySessionID = this.generateSessionId(eventParams.activityID, currentTime);

        if (!this.isValid(params)) {
            return undefined;
        }

        return params;
    }

    public getBsonDate(date: Date) {
        return moment(date || new Date()).utc().format("YYYY-MM-DDTHH:mm:ss[.000Z]");
    }


    public getAllActivityIds(): number[] {
        return AbstractEventFactory.DEFINED_ACTIVITY_IDS;
    }

    public getValidActivityIds(): number[] {
        return _.keys(this.eventTypeLookup).map(Number);
    }

    public getValidEventTypes(): string[] {
        let eventTypes: Set<string> = new Set<string>();
        for (let e of _.values(this.eventTypeLookup) ) {
            let eventType: string = e["eventType"];
            eventTypes.add(eventType);
        }
        return Array.from(eventTypes);
    }

}
