import { AbstractValidator } from "./abstract";

let validateWord = (eventParams): void => {
    if (!_.has(eventParams, "word")) {
        throw "missing field: word";
    }

    if (!_.has(eventParams.word, "wordHeadID")) {
        throw "missing field: word.wordHeadID";
    }

    if (eventParams.word.wordHeadID == 0) {
        throw "wordHeadID is empty";
    }
};

export class WordEventValidator extends AbstractValidator {
    constructor() {
        super();
        this.removeRequired("activityTypeID");
        this.validateRequired("eventTime");
        this.validateRequired("activitySessionID");
        this.validateRequired("word");
        this.addValidator(validateWord);
    }
}

export class StartWordValidator extends WordEventValidator {
}

export class CompleteWordValidator extends WordEventValidator {
}

export class WordQuestionEventValidator extends WordEventValidator {
    constructor() {
        super();
        this.validateRequired("exampleDialogLineID");
        this.validateRequired("userResponseTime");
    }
}

export class MatchWordValidator extends WordQuestionEventValidator {
    constructor() {
        super();
        this.validateRequired("answerWord");
        this.validateRequired("distractorWords");
    }
}

export class ReverseMatchWordValidator extends MatchWordValidator {
}

export class DialogWordEventValidator extends WordEventValidator {
}

export class LearnedWordEventValidator extends DialogWordEventValidator {
}

export class StudiedWordEventValidator extends DialogWordEventValidator {
}

export class ViewedWordEventValidator extends DialogWordEventValidator {
}

export class DialogWordInteractiveEventValidator extends DialogWordEventValidator {
    constructor() {
        super();
        this.validateRequired("correct");
    }
}

export class TypedWordValidator extends DialogWordInteractiveEventValidator {
    constructor() {
        super();
        this.validateRequired("typedWord");
        this.removeRequired("correct");
    }
}

export class RecordedWordValidator extends DialogWordInteractiveEventValidator {
}

export class HiddenRecordedWordValidator extends DialogWordInteractiveEventValidator {
}

export class QuizzedWordValidator extends DialogWordInteractiveEventValidator {
    constructor() {
        super();
        this.validateRequired("sessionTimeKey");
    }
}


export class MarkWordValidator extends WordEventValidator {
    constructor() {
        super();
        this.validateRequired("markAs");
        this.removeRequired("activitySessionID");
    }
}

export class FavoriteWordValidator extends MarkWordValidator {
}

export class KnownWordValidator extends MarkWordValidator {
}
