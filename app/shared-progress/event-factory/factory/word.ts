import { LoggerService } from "../../../shared/logger.service";
import { AbstractEventFactory } from "./abstract";
import * as EventValidators from "../../event-factory/validator/index";

export class WordEventFactory extends AbstractEventFactory {
    static START_WORD = "StartWord";
    static COMPLETE_WORD = "CompleteWord";
    static MATCH_WORD = "MatchWord";
    static REVERSE_MATCH_WORD = "ReverseMatchWord";
    static LEARNED_WORD = "LearnedWord";
    static STUDIED_WORD = "StudiedWord";
    static VIEWED_WORD = "ViewedWord";
    static TYPED_WORD = "TypedWord";
    static RECORDED_WORD = "RecordedWord";
    static QUIZZED_WORD = "QuizzedWord";
    static HIDDEN_RECORDED_WORD = "HiddenRecordedWord";
    static FAVORITE_WORD = "FavoriteWord";
    static KNOWN_WORD = "KnownWord";

    static DEFINED_ACTIVITY_TYPES = [
        WordEventFactory.START_WORD,
        WordEventFactory.COMPLETE_WORD,
        WordEventFactory.MATCH_WORD,
        WordEventFactory.REVERSE_MATCH_WORD,
        WordEventFactory.LEARNED_WORD,
        WordEventFactory.STUDIED_WORD,
        WordEventFactory.VIEWED_WORD,
        WordEventFactory.TYPED_WORD,
        WordEventFactory.RECORDED_WORD,
        WordEventFactory.QUIZZED_WORD,
        WordEventFactory.HIDDEN_RECORDED_WORD,
        WordEventFactory.FAVORITE_WORD,
        WordEventFactory.KNOWN_WORD
    ];

    protected eventTypeValidatorLookup: {[eventType: string]: EventValidators.Validator} = {};

    constructor(protected accountId: number = 0, protected logger: LoggerService) {
        super(accountId, logger);

        this.eventTypeValidatorLookup[WordEventFactory.START_WORD] = new EventValidators.StartWordValidator();
        this.eventTypeValidatorLookup[WordEventFactory.COMPLETE_WORD] = new EventValidators.CompleteWordValidator();
        this.eventTypeValidatorLookup[WordEventFactory.MATCH_WORD] = new EventValidators.MatchWordValidator();
        this.eventTypeValidatorLookup[WordEventFactory.REVERSE_MATCH_WORD] = new EventValidators.ReverseMatchWordValidator();
        this.eventTypeValidatorLookup[WordEventFactory.LEARNED_WORD] = new EventValidators.LearnedWordEventValidator();
        this.eventTypeValidatorLookup[WordEventFactory.STUDIED_WORD] = new EventValidators.StudiedWordEventValidator();
        this.eventTypeValidatorLookup[WordEventFactory.VIEWED_WORD] = new EventValidators.ViewedWordEventValidator();
        this.eventTypeValidatorLookup[WordEventFactory.TYPED_WORD] = new EventValidators.TypedWordValidator();
        this.eventTypeValidatorLookup[WordEventFactory.RECORDED_WORD] = new EventValidators.RecordedWordValidator();
        this.eventTypeValidatorLookup[WordEventFactory.QUIZZED_WORD] = new EventValidators.QuizzedWordValidator();
        this.eventTypeValidatorLookup[WordEventFactory.HIDDEN_RECORDED_WORD] = new EventValidators.HiddenRecordedWordValidator();
        this.eventTypeValidatorLookup[WordEventFactory.FAVORITE_WORD] = new EventValidators.FavoriteWordValidator();
        this.eventTypeValidatorLookup[WordEventFactory.KNOWN_WORD] = new EventValidators.KnownWordValidator();
    }

    // for Word Events, event type must be explicitly passed due to activityTypeID collisions
    protected getEventType(activityTypeId: number): string {
        return undefined;
    }

    protected getEventValidatorFromEventType(eventType: string): EventValidators.Validator {
        if (eventType in this.eventTypeValidatorLookup) {
            return this.eventTypeValidatorLookup[eventType];
        }

        this.logger.error("eventFactory", "invalid event type");
        return undefined;
    }

    protected getValidator(eventParams): EventValidators.Validator {
        if (!eventParams.type) {
            throw "missing activity type";
        }

        let eventValidator = this.getEventValidatorFromEventType(eventParams.type);
        if (!eventValidator) {
            throw "no validator found for event type: " + eventParams.type;
        }
        return eventValidator;
    }

    getValidActivityTypes(): string[] {
        return _.keys(this.eventTypeValidatorLookup);
    }

}
