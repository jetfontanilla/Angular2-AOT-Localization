import { LoggerService } from "../../../shared/logger.service";
import { AbstractEventFactory } from "./abstract";
import * as EventValidators from "../../event-factory/validator/index";

export class StartEventFactory extends AbstractEventFactory {
    constructor(protected accountId: number = 0, protected logger: LoggerService) {
        super(accountId, logger);

        let startCliplist = {
            eventType: "StartCliplist",
            validator: new EventValidators.StartCliplistValidator
        };
        let startQuiz = {
            eventType: "StartQuiz",
            validator: new EventValidators.StartQuizValidator
        };

        this.eventTypeLookup[AbstractEventFactory.WATCH_DIALOG] = {
            eventType: "StartActivityWatch",
            validator: new EventValidators.StartActivityWatchValidator
        };
        this.eventTypeLookup[AbstractEventFactory.LEARN_DIALOG] = {
            eventType: "StartActivityLearn",
            validator: new EventValidators.StartActivityLearnValidator
        };
        this.eventTypeLookup[AbstractEventFactory.SPEAK_DIALOG] = {
            eventType: "StartActivitySpeak",
            validator: new EventValidators.StartActivitySpeakValidator
        };
        this.eventTypeLookup[AbstractEventFactory.WATCH_NAMEDCLIPLIST] = startCliplist;
        this.eventTypeLookup[AbstractEventFactory.LEARN_NAMEDCLIPLIST] = startCliplist;
        this.eventTypeLookup[AbstractEventFactory.SPEAK_NAMEDCLIPLIST] = startCliplist;
        this.eventTypeLookup[AbstractEventFactory.WATCH_PRONCLIPLIST] = startCliplist;
        this.eventTypeLookup[AbstractEventFactory.SPEAK_PRONCLIPLIST] = startCliplist;
        this.eventTypeLookup[AbstractEventFactory.WATCH_WORDCLIPLIST] = startCliplist;
        this.eventTypeLookup[AbstractEventFactory.LEARN_WORDCLIPLIST] = startCliplist;
        this.eventTypeLookup[AbstractEventFactory.SPEAK_WORDCLIPLIST] = startCliplist;
        this.eventTypeLookup[AbstractEventFactory.QUIZ_DIALOG] = startQuiz;
        this.eventTypeLookup[AbstractEventFactory.QUIZ_COURSE] = startQuiz;
    }
}
