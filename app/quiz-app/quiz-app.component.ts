// Add the RxJS Observable operators we need in this app.
import "../rxjs-operators";

import { Component, ElementRef, ApplicationRef, OnInit } from "@angular/core";
import { EventHandlerService } from "./event-handler.service";
import { QuizProgressService, QuizProgress } from "./quiz-progress.service";
import { QuizStateService } from "./quiz-state.service";

@Component({
    selector: "ec-quiz-app",
    templateUrl: "quiz-app.component.html",
    styleUrls: ["quiz-app.component.css"]
})
export class QuizAppComponent implements OnInit {
    private activity;

    constructor(elementRef: ElementRef,
                public quizState: QuizStateService,
                private eventHandler: EventHandlerService,
                private applicationRef: ApplicationRef) {
        let activity = elementRef.nativeElement.getAttribute("activity");
        if (activity) {
            try {
                this.activity = JSON.parse(activity);
            } catch (e) {
                this.activity = activity;
            }
        }
    }

    ngOnInit() {
        let eventHandler = this.eventHandler.getHandler();
        this.initializeStateSubscribers(eventHandler);
        this.initializeStatePublishers(eventHandler);

        this.quizState.subscribe(QuizStateService.EVENT_START, () => {
            this.initializeProgressPublishers(eventHandler);
        });

        eventHandler.initialize();
        if (this.activity) {
            // convert activity into word objects
            eventHandler.initializeActivity(this.activity);
        }

        this.quizState.ready();
    }

    private initializeProgressPublishers(eventHandler) {
        let quizProgress: QuizProgress = this.quizState.getQuizProgress();

        _.map(QuizProgressService.PROGRESS_DATA_EVENTS, eventName => {
            this.forwardEvent(quizProgress, eventHandler, eventName);
        });
    }

    private initializeStatePublishers(eventHandler) {
        _.map(QuizStateService.APP_EVENTS, eventName => {
            this.forwardEvent(this.quizState, eventHandler, eventName);
        });
    }

    private initializeStateSubscribers(eventHandler) {
        eventHandler.addExternalInterface(QuizStateService.EVENT_INITIALIZE);
        eventHandler.addExternalInterface(QuizStateService.EVENT_RESET);
        eventHandler.addExternalInterface(QuizStateService.EVENT_PAUSE);

        eventHandler.subscribe(QuizStateService.EVENT_INITIALIZE, data => {
            this.quizState.initialize(data);
            this.applicationRef.tick();
        });

        eventHandler.subscribe(QuizStateService.EVENT_RESET, () => {
            this.quizState.reset();
            this.applicationRef.tick();
        });

        eventHandler.subscribe(QuizStateService.EVENT_PAUSE, () => {
            this.quizState.pause();
            this.applicationRef.tick();
        });

        eventHandler.subscribe(QuizStateService.EVENT_END, () => {
            this.quizState.end();
            this.applicationRef.tick();
        });

        eventHandler.subscribe(QuizStateService.EVENT_ON_APP_CONTINUE_BUTTON_CLICK, () => {
            this.quizState.resume();
            this.applicationRef.tick();
        });
    }

    private forwardEvent(publisher, subscriber, eventName) {
        publisher.subscribe(eventName, (data?: any) => {
            console.log("published " + eventName, data);
            subscriber.publish(eventName, data);
        });
    }

    getElementClasses() {
        return this.eventHandler.getHandler().getType();
    }
}
