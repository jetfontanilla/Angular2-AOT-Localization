import { Injectable } from "@angular/core";
import { EmitterService } from "../shared/emitter.service";
import { Logger, LoggerService } from "../shared/logger.service";
import { ProgressQueueService } from "../shared-progress/progress-queue.service";
import { EventHandler, DefaultEventHandler, AndroidEventHandler, IosEventHandler } from "./event-handler";
import { VocabularyQuizService } from "../model/bridge/vocabulary-quiz.service";

declare var window: any;

@Injectable()
export class EventHandlerService {
    private logger: Logger;

    constructor(private emitterService: EmitterService,
                private loggerService: LoggerService,
                private vocabQuizModel: VocabularyQuizService,
                private progressQueue: ProgressQueueService

    ) {
        this.logger = this.loggerService.getLogger(LoggerService.LOGGER_CONSOLE);
    }

    getHandler(): EventHandler {
        let emitter = this.emitterService.create();
        let userAgent = window.navigator.userAgent.toLowerCase() || "";
        if (userAgent.indexOf("android") != -1) {
            return new AndroidEventHandler(emitter, this.logger);
        }

        let isStandalone = window.navigator.standalone || false;
        let isSafari = /safari/.test(userAgent);
        let isIos = /iphone|ipod|ipad/.test(userAgent);
        if (isIos && !isStandalone && !isSafari) {
            return new IosEventHandler(emitter, this.logger);
        }

        return new DefaultEventHandler(emitter, this.logger, this.vocabQuizModel, this.progressQueue);
    }
}
