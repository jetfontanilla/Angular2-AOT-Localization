import { AbstractValidator } from "./abstract";

export class DialogLineEventValidator extends AbstractValidator {
    constructor() {
        super();
        this.validateRequired("eventTime");
        this.validateRequired("activitySessionID");
        this.validateRequired("dialogLineID");
        this.validateRequired("progress");
        this.validateRequired("sessionTypeID");
        this.validateRequired("sessionLineTimeKey");
        this.validateRequired("lineCount");
    }
}

export class DialogLineWatchValidator extends DialogLineEventValidator {
    constructor() {
        super();
        this.validateRequired("activityID");
    }
}

export class DialogLineWatchCliplistValidator extends DialogLineWatchValidator {
    constructor() {
        super();
        this.removeRequired("activityID");
        this.validateRequired("dialogID");
    }
}

export class DialogLineSpeakValidator extends DialogLineEventValidator {
    constructor() {
        super();
        this.validateRequired("activityID");
        this.validateRequired("sessionTimeKey");
        this.validateRequired("xmlURL");
        this.validateRequired("pointsLine");
        this.validateRequired("pointsTotal");
    }
}

export class DialogLineSpeakCliplistValidator extends DialogLineSpeakValidator {
    constructor() {
        super();
        this.removeRequired("activityID");
        this.validateRequired("dialogID");
    }
}
