import { AbstractValidator } from "./abstract";

export class StartActivityValidator extends AbstractValidator {
    constructor() {
        super();
        this.validateRequired("eventTime");
        this.validateRequired("activityID");
        this.validateRequired("activitySessionID");
    }
}

export class StartActivityWatchValidator extends StartActivityValidator {
}

export class StartActivityLearnValidator extends StartActivityValidator {
}

export class StartActivitySpeakValidator extends StartActivityValidator {
    constructor() {
        super();
        this.validateRequired("sessionTypeID");
        this.validateRequired("sessionTimeKey");
    }
}

export class StartCliplistValidator extends StartActivityValidator {
}

export class StartQuizValidator extends StartActivityValidator {
}

// never used in current site implementation
export class StartVocabularyQuizCourseValidator extends StartActivityValidator {
}

// never used in current site implementation
export class StartVocabularyQuizDialogValidator extends StartActivityValidator {
}
