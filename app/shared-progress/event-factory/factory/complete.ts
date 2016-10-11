import { LoggerService } from "../../../shared/logger.service";
import { AbstractEventFactory } from "./abstract";
import * as EventValidators from "../../event-factory/validator/index";

export class CompleteEventFactory extends AbstractEventFactory {
    constructor(protected accountId: number = 0, protected logger: LoggerService) {
        super(accountId, logger);

        let completeCliplist = {
            eventType: "CompleteCliplist",
            validator: new EventValidators.CompleteCliplistValidator
        };
        let completeQuiz = {
            eventType: "CompleteQuiz",
            validator: new EventValidators.CompleteQuizValidator
        };

        this.eventTypeLookup[AbstractEventFactory.WATCH_DIALOG] = {
            eventType: "CompleteActivityWatch",
            validator: new EventValidators.CompleteActivityWatchValidator
        };
        this.eventTypeLookup[AbstractEventFactory.LEARN_DIALOG] = {
            eventType: "CompleteActivityLearn",
            validator: new EventValidators.CompleteActivityLearnValidator
        };
        this.eventTypeLookup[AbstractEventFactory.SPEAK_DIALOG] = {
            eventType: "CompleteActivitySpeak",
            validator: new EventValidators.CompleteActivitySpeakValidator
        };
        this.eventTypeLookup[AbstractEventFactory.WATCH_NAMEDCLIPLIST] = completeCliplist;
        this.eventTypeLookup[AbstractEventFactory.LEARN_NAMEDCLIPLIST] = completeCliplist;
        this.eventTypeLookup[AbstractEventFactory.SPEAK_NAMEDCLIPLIST] = completeCliplist;
        this.eventTypeLookup[AbstractEventFactory.WATCH_PRONCLIPLIST] = completeCliplist;
        this.eventTypeLookup[AbstractEventFactory.SPEAK_PRONCLIPLIST] = completeCliplist;
        this.eventTypeLookup[AbstractEventFactory.WATCH_WORDCLIPLIST] = completeCliplist;
        this.eventTypeLookup[AbstractEventFactory.LEARN_WORDCLIPLIST] = completeCliplist;
        this.eventTypeLookup[AbstractEventFactory.SPEAK_WORDCLIPLIST] = completeCliplist;
        this.eventTypeLookup[AbstractEventFactory.QUIZ_DIALOG] = completeQuiz;
        this.eventTypeLookup[AbstractEventFactory.QUIZ_COURSE] = completeQuiz;
    }
}
