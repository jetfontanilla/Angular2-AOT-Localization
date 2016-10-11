import { Injectable } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { LoggerService } from "../shared/logger.service";
import { EmitterService } from "../shared/emitter.service";
import { StopWatchService } from "../shared-player/stopwatch.service";
import { QuizProgress, QuizProgressService } from "./quiz-progress.service";
import { QuizWord } from "./quiz-word";

@Injectable()
export class QuizStateService {
    static EVENT_INITIALIZE = "initialize";
    static EVENT_RESET = "reset";
    static EVENT_START = "start";
    static EVENT_PAUSE = "pauseSession";
    static EVENT_END = "end";
    static EVENT_ON_APP_LOAD = "onLoad";
    static EVENT_ON_APP_START_BUTTON_CLICK = "onStartButtonClick";
    static EVENT_ON_APP_CONTINUE_BUTTON_CLICK = "onContinueButtonClick";
    static EVENT_ON_APP_CONTACT_SUPPORT_CLICK: "onContactSupportClick";
    static EVENT_ON_APP_PAUSE = "onPause";
    static EVENT_ON_APP_CLOSE = "onClose";

    static APP_EVENTS = [
        QuizStateService.EVENT_ON_APP_START_BUTTON_CLICK,
        QuizStateService.EVENT_ON_APP_CONTINUE_BUTTON_CLICK,
        QuizStateService.EVENT_ON_APP_CONTACT_SUPPORT_CLICK,
        QuizStateService.EVENT_ON_APP_LOAD,
        QuizStateService.EVENT_ON_APP_CLOSE
    ];

    quizProgress: QuizProgress;
    initialized: boolean = false;
    started: boolean = false;
    completed: boolean = false;

    private emitter;
    private logger;
    private stopwatch;
    private appData: any = {};
    private quizWords: QuizWord[] = [];
    private dormantWords: QuizWord[] = [];
    private masteredWords: QuizWord[] = [];

    constructor(private quizProgressService: QuizProgressService,
                private emitterService: EmitterService,
                private stopwatchService: StopWatchService,
                private loggerService: LoggerService) {
        this.logger = this.loggerService.getLogger(LoggerService.LOGGER_CONSOLE);
        this.emitter = this.emitterService.create();
        this.stopwatch = this.stopwatchService.create();
    }

    subscribe(eventName: string, successFn: (data?) => void, errorFn?: (e?) => void): Subscription {
        return this.emitter.subscribe(eventName, successFn, errorFn);
    }

    publish(eventName: string, data?: any): void {
        this.emitter.publish(eventName, data);
    }

    initialize(quizParameters: any): void {

        if (_.isObject(quizParameters)) {
            this.appData = quizParameters;
            this.logger.log("quiz initialized", quizParameters);
        } else if (_.isString(quizParameters)) {
            try {
                this.appData = JSON.parse(quizParameters);
            } catch (e) {
                this.logger.error("invalid quiz parameters on initialization", e, 0, {quizParameters: quizParameters});
                this.appData = {};
                return;
            }
        } else {
            this.logger.error("invalid quiz parameters on initialization", "", 0, {quizParameters: quizParameters});
            this.appData = {};
            return;
        }

        this.quizWords = this.sortWords(this.getQuizData().quizWords);
        this.masteredWords = this.sortWords(this.getQuizData().mastered);
        this.dormantWords = this.sortWords(this.getQuizData().dormant);

        this.initialized = true;
    }

    private sortWords(words): QuizWord[] {
        if (!words || !words.length) {
            return [];
        }

        return _.chain(words)
            .map(quizWord => new QuizWord(quizWord))
            .sortBy("word.wordRootOrthography")
            .value();
    }

    getQuizProgress(): QuizProgress {
        return this.quizProgress;
    }

    start() {
        this.quizProgress = this.quizProgressService.create({
                activityID: this.getActivityId(),
                activityTypeID: this.getActivityTypeId()
            }, {
                quizWords: this.getQuizWords(),
                masteredWords: this.getMasteredWords(),
                dormantWords: this.getDormantWords()
            },
            this.getAccountId());

        this.publish(QuizStateService.EVENT_START);
        this.quizProgress.subscribe(
            QuizProgressService.EVENT_ON_ACTIVITY_COMPLETE,
            () => this.end()
        );
        this.quizProgress.startSession();
        this.stopwatch.start();
        this.started = true;

        this.publish(QuizStateService.EVENT_ON_APP_START_BUTTON_CLICK);
    }

    ready() {
        this.publish(QuizStateService.EVENT_ON_APP_LOAD);
    }

    end() {
        this.stopwatch.stop();
        this.completed = true;
        this.publish(QuizStateService.EVENT_END);
        setTimeout(() => this.close(), 5000);
    }

    pause() {
        this.stopwatch.stop();
        this.publish(QuizStateService.EVENT_PAUSE);
        this.publish(QuizStateService.EVENT_ON_APP_PAUSE);
    }

    resume() {
        this.stopwatch.start();
        this.publish(QuizStateService.EVENT_ON_APP_CONTINUE_BUTTON_CLICK);
    }

    reset() {
        this.initialized = false;
        this.started = false;
        this.completed = false;
        this.appData = {};
        this.quizProgress.destroy();
        this.quizProgress = undefined;
        this.publish(QuizStateService.EVENT_RESET);
    }

    close() {
        this.publish(QuizStateService.EVENT_ON_APP_CLOSE);
    }

    contactSupport() {
        this.publish(QuizStateService.EVENT_ON_APP_CONTACT_SUPPORT_CLICK);
    }

    getAccountId(): number {
        return this.appData.accountID || 0;
    }

    getActivityId(): number {
        return this.appData.activityID || 0;
    }

    getActivityTypeId(): number {
        return this.appData.activityTypeID || 0;
    }

    getQuizData(): any {
        return this.appData.quizData || {};
    }

    getQuizWords(): QuizWord[] {
        return this.quizWords;
    };

    getDormantWords(): QuizWord[] {
        return this.dormantWords;
    }

    getMasteredWords(): QuizWord[] {
        return this.masteredWords;
    }

    getTitle(): string {
        return this.appData.title || this.getQuizData().sessionTitle || "";
    }

    getUnitNumber(): string {
        return this.appData.unitNumber || "";
    }

    getSubTitle(): string {
        let subTitle = this.appData.subTitle || "";

        if (this.getUnitNumber()) {
            return this.getUnitNumber() + " : " + subTitle;
        }
        return subTitle;
    }

    isUpdateRequired(): boolean {
        if (_.isNil(this.appData.device)) {
            return false;
        }

        let updateRequiredDeviceLookup = [{
            os: "android",
            model: "shv-e300s",
            osVersion: "5.0.1",
            manufacturer: "samsung"
        }];
        let currentDevice = this.appData.device;
        let match = _.find(updateRequiredDeviceLookup, device => _.isEqual(currentDevice, device));

        return !_.isNil(match);
    };

    getActivityPoints(): number {
        return this.appData.expPoints || 0;
    }
}
