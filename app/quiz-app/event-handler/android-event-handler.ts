import { Subscription } from "rxjs/Subscription";
import { EventHandler } from "./event-handler";
import { QuizStateService } from "../quiz-state.service";

declare var window: any;

export class AndroidEventHandler implements EventHandler {
    private handlerType: string = "android";

    constructor(private emitter, private logger) {

    }

    addExternalInterface(methodName: string) {
        this.logger.log("Hooking interface for %s", methodName);

        if (!window.Android) {
            this.logger.log("window.Android not available", methodName);
        }

        try {
            window.Android[methodName] = (data) => {
                this.emitter.publish(methodName, data);
            };
        } catch (e) {
            this.logger.error("Could not add Android handler for " + methodName, e);
        }
    }

    subscribe(eventName: string, callback: () => void): Subscription {
        return this.emitter.subscribe(eventName, callback);
    }

    publish(eventName: string, data?: any) {
        if (!window.Android) {
            this.logger.error("window.Android not available");
            return;
        }

        try {
            if (data) {
                window.Android[eventName](JSON.stringify(data));
            } else {
                window.Android[eventName]();
            }
        } catch (e) {
            this.logger.error("error calling " + eventName + " on window.Android");
            this.logger.log(e);
        }
    }

    initialize() {

    }

    initializeActivity(activity: any) {

    }

    getType(): string {
        return this.handlerType;
    }
}
