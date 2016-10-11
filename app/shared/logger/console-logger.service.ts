import { Injectable } from "@angular/core";
import { Logger } from "./logger";

declare var window: any;

@Injectable()
export class ConsoleLoggerService implements Logger {

    log(...args) {
        if (!window.console) {
            return;
        }

        let log = Function.prototype.bind.call(window.console.log, window.console);
        log.apply(window.console, args);
    }

    error(message: string,
        e?: string | Object,
        code?: number,
        additionalInfo?: Object): void {

        if (!window.console) {
            return;
        }

        let consoleFn = window.console.error || window.console.log;
        consoleFn(message);
        if (e) {
            consoleFn("error", e);
        }
        if (code) {
            consoleFn("error code", code);
        }
        if (additionalInfo) {
            consoleFn("additionalInfo", additionalInfo);
        }
    }

    trackEvent(name: string,
               label?: string,
               additionalInfo?: Object) {

        if (!window.console) {
            return;
        }

        let eventParams = {
            name: label ? (name + "/" + label) : name,
            url: window.location.href
        };

        if (additionalInfo && _.isObject(additionalInfo)) {
            eventParams["additionalInfo"] = additionalInfo;
        }

        console.log("eventParams", eventParams);
    }

}
