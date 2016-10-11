import { LoggerService } from "../../../shared/logger.service";
import { AbstractEventFactory } from "./abstract";
import * as EventValidators from "../../event-factory/validator/index";

export class DialogLineEventFactory extends AbstractEventFactory {
    constructor(protected accountId: number = 0, protected logger: LoggerService) {
        super(accountId, logger);

        let dialogLineWatchCliplist = {
            eventType: "DialogLineWatchCliplist",
            validator: new EventValidators.DialogLineWatchCliplistValidator
        };
        let dialogLineSpeakCliplist = {
            eventType: "DialogLineSpeakCliplist",
            validator: new EventValidators.DialogLineSpeakCliplistValidator
        };

        this.eventTypeLookup[AbstractEventFactory.WATCH_DIALOG] = {
            eventType: "DialogLineWatch",
            validator: new EventValidators.DialogLineWatchValidator
        };
        this.eventTypeLookup[AbstractEventFactory.SPEAK_DIALOG] = {
            eventType: "DialogLineSpeak",
            validator: new EventValidators.DialogLineSpeakValidator
        };
        this.eventTypeLookup[AbstractEventFactory.WATCH_NAMEDCLIPLIST] = dialogLineWatchCliplist;
        this.eventTypeLookup[AbstractEventFactory.SPEAK_NAMEDCLIPLIST] = dialogLineSpeakCliplist;
        this.eventTypeLookup[AbstractEventFactory.WATCH_PRONCLIPLIST] = dialogLineWatchCliplist;
        this.eventTypeLookup[AbstractEventFactory.SPEAK_PRONCLIPLIST] = dialogLineSpeakCliplist;
        this.eventTypeLookup[AbstractEventFactory.WATCH_WORDCLIPLIST] = dialogLineWatchCliplist;
        this.eventTypeLookup[AbstractEventFactory.SPEAK_WORDCLIPLIST] = dialogLineSpeakCliplist;
    }
}
