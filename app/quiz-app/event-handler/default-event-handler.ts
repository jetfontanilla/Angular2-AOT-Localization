import { Subscription } from "rxjs/Subscription";
import { ProgressQueueService } from "../../shared-progress/progress-queue.service";
import { EventHandler } from "./event-handler";
import { QuizStateService } from "../quiz-state.service";
import { QuizProgressService } from "../quiz-progress.service";

export class DefaultEventHandler implements EventHandler {
    private handlerType: string = "default";

    constructor(private emitter,
                private logger,
                private vocabQuizModel,
                private progressQueue: ProgressQueueService) {

    }

    addExternalInterface(methodName: string) {
        // do nothing
    }

    subscribe(eventName: string, callback: (data?) => void): Subscription {
        return this.emitter.subscribe(eventName, callback);
    }

    publish(eventName: string, data?: any) {
        this.emitter.publish(eventName, data);
    }

    initialize() {

    }

    initializeActivity(activity: any) {
        _.map(QuizProgressService.PROGRESS_DATA_EVENTS, eventName => {
            this.subscribe(eventName, (event) => {
                this.progressQueue.sendEvent(event);
            });
        });

        if (activity.activityID) {
            this.vocabQuizModel
                .getByActivityId(activity.activityID)
                .subscribe((quizData) => {
                    this.publish(
                        QuizStateService.EVENT_INITIALIZE,
                        _.assign(activity, {quizData: quizData})
                    );
                });
        }
    }

    getType(): string {
        return this.handlerType;
    }
}
