export interface Validator {
    validate(eventParams): void;
}

export abstract class AbstractValidator implements Validator {
    protected requiredFields: string[] = [];
    protected validators: {(any): void}[] = [];

    constructor() {
        this.validateRequired("activityTypeID");
    }

    protected validateRequired(additionalField: string) {
        if (!_.isEmpty(additionalField)) {
            this.requiredFields.push(additionalField);
        }
    }

    protected removeRequired(additionalField: string) {
        if (!_.isEmpty(additionalField)) {
            this.requiredFields = _.without(this.requiredFields, additionalField);
        }
    }

    protected setRequired(additionalFields: string[]) {
        this.requiredFields = additionalFields;
    }

    protected addValidator(validateFn: (eventParams: any) => void) {
        this.validators.push(validateFn);
    }

    validate(eventParams): void {
        this.checkRequiredParameters(eventParams);
        _.map(this.validators, validate => validate(eventParams));
    }

    checkRequiredParameters(eventParams): void {
        let eventKeys = _.keys(eventParams);
        let missingFields = _.difference(this.requiredFields, eventKeys);

        if (!_.isEmpty(missingFields)) {
            throw "missing: " + missingFields.join(", ");
        }
    }
}
