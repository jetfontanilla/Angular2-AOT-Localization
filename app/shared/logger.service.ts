import { Injectable, NgZone } from "@angular/core";
import { Logger, ConsoleLoggerService, NewRelicLoggerService } from "./logger";
export * from "./logger";

@Injectable()
export class LoggerService implements Logger {
    static LOGGER_CONSOLE = "console";
    static LOGGER_NEWRELIC = "newrelic";

    private loggers: string[] = [];

    constructor(private zone: NgZone,
                private consoleLogger: ConsoleLoggerService,
                private newRelicLogger: NewRelicLoggerService) {
        (<any>window).newRelicLogger = {
            zone: this.zone,
            service: this
        };

        if (this.consoleLogger) {
            this.loggers.push(LoggerService.LOGGER_CONSOLE);
        }

        if (this.newRelicLogger) {
            this.loggers.push(LoggerService.LOGGER_NEWRELIC);
        }
    }

    setLoggers(loggers: string[]) {
        this.loggers = loggers;
    }

    getLogger(loggerName: string): Logger {
        switch (loggerName) {
            case LoggerService.LOGGER_CONSOLE:
                return this.consoleLogger;
            case LoggerService.LOGGER_NEWRELIC:
                return this.newRelicLogger;
            default:
                throw "loggerName required";
        }
    }

    log(...args): void {
        this.loggers.map(loggerName => {
            let logFn = this.getLogger(loggerName).log;
            logFn.apply(logFn, args);
        });
    }

    error(message: string,
                e?: any,
                code?: number,
                additionalInfo?: Object): void {

        this.loggers.map(loggerName => {
            this.getLogger(loggerName).error(message, e, code, additionalInfo);
        });

    }

    trackEvent(message: string,
               label?: string,
               additionalInfo?: Object): void {

        this.loggers.map(loggerName => {
            this.getLogger(loggerName).trackEvent(message, label, additionalInfo);
        });
    }
}
