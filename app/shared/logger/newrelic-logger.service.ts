import { Injectable, NgZone } from "@angular/core";
import { ConnectionFactoryService } from "../connection-factory.service";
import { Logger } from "./logger";

@Injectable()
export class NewRelicLoggerService implements Logger {

    constructor(private zone: NgZone,
                private connection: ConnectionFactoryService) {
        (<any>window).newRelicLogger = {
            zone: this.zone,
            service: this
        };
    }

    log(...args) {

    }

    error(message: string,
        e?: any,
        code?: number,
        additionalInfo?: Object): void {

        let errorParams = {
            name: message,
            url: window.location.href
        };

        if (code) {
            errorParams["code"] = code;
        }

        if (additionalInfo) {
            errorParams["additionalInfo"] = additionalInfo;
        }

        if (e) {
            if (_.isObject(e)) {
                errorParams["name"] = e.name || "generic error";
                errorParams["message"] = e.message || "";
                errorParams["error"] = e;
            } else if (typeof e == "string") {
                errorParams["message"] = e;
            }
        }

        this.connection
            .service("base")
            .setPath("/newrelic")
            .post({}, errorParams)
            .subscribe(() => {});
    }

    trackEvent(message: string,
               label?: string,
               additionalInfo?: Object): void {

        let eventParams = {
            name: label ? (name + "/" + label) : name,
            url: window.location.href
        };

        if (additionalInfo && _.isObject(additionalInfo)) {
            eventParams["additionalInfo"] = additionalInfo;
        }

        this.connection
            .service("base")
            .setPath("/newrelic/event")
            .post({}, eventParams)
            .subscribe(() => {});
    }
}
