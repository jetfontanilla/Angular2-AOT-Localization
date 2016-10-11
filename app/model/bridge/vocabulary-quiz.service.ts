import { Injectable } from "@angular/core";
import { ConnectionFactoryService } from "../../shared/connection-factory.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VocabularyQuizService {

    constructor(private connection: ConnectionFactoryService) {
    }

    getQuizOptions(options: Object,
                   additionalOptions: Object = {}): Object {
        const defaultOptions = {
            maxExamples: 1,
            maxDistractors: 3,
            includeMasteredAndDormant: true,
            personalize: true
        };

        return _.assign({}, defaultOptions, additionalOptions, options);
    }

    getByActivityId(activityId: number,
                    courseId?: number,
                    additionalOptions: Object = {}): Observable<any> {

        let options = courseId ? {
            complete: true,
            activityID: activityId,
            courseID: courseId
        } : {
            complete: true,
            activityID: activityId
        };

        return this.connection
            .service("bridge")
            .setPath("/content/vocabularyQuiz")
            .get(this.getQuizOptions(options, additionalOptions));
    }

    getByWordHeadIds(wordHeadIds: number[],
                     additionalOptions: Object = {}): Observable<any> {
        let options = {
            complete: true,
            wordHeadIDs: wordHeadIds.join(",")
        };

        return this.connection
            .service("bridge")
            .setPath("/content/vocabularyQuiz")
            .get(this.getQuizOptions(options, additionalOptions));
    }
}
