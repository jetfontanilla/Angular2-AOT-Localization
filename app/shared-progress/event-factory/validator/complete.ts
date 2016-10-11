import { AbstractValidator } from "./abstract";

export class CompleteActivityValidator extends AbstractValidator {
    constructor() {
        super();
        this.validateRequired("eventTime");
        this.validateRequired("activityID");
        this.validateRequired("activitySessionID");
    }
}

export class CompleteActivityWatchValidator extends CompleteActivityValidator {
}

export class CompleteActivityLearnValidator extends CompleteActivityValidator {
}

export class CompleteActivitySpeakValidator extends CompleteActivityValidator {
}

export class CompleteCliplistValidator extends CompleteActivityValidator {
}

export class CompleteQuizValidator extends CompleteActivityValidator {
}

// events below not used in current site implementation
export class CompleteVocabularyQuizCourseValidator extends CompleteActivityValidator {
    constructor() {
        super();
        this.validateRequired("correct");
        this.validateRequired("total");
    }
}

export class CompleteVocabularyQuizDialogValidator extends CompleteActivityValidator {
    constructor() {
        super();
        this.validateRequired("correct");
        this.validateRequired("total");
    }
}
