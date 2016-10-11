import { EventHandler } from "./event-handler";
import { Subscription } from "rxjs/Subscription";
import { QuizStateService } from "../quiz-state.service";

declare var window: any;

export class IosEventHandler implements EventHandler {
    private handlerType: string = "ios";

    constructor(private emitter, private logger) {

    }

    // get/set WebViewJavascriptBridge
    private getHandler(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge);
        }

        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }

        window.WVJBCallbacks = [callback];
        let WVJBIframe = document.createElement("iframe");
        WVJBIframe.style.display = "none";
        WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(() => {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    }

    addExternalInterface(methodName: string) {
        this.getHandler((handler) => {
            handler.registerHandler(methodName, (data) =>  {
                this.emitter.publish(methodName, data);
            });
        });
    }

    subscribe(eventName: string, callback: () => void): Subscription {
        return this.emitter.subscribe(eventName, callback);
    }

    publish(eventName: string, data?: any) {
        this.logger.log("calling:: IOS handler for ", eventName, data);
        try {
            this.getHandler((handler) => {
                handler.callHandler(eventName, data);
            });
        } catch (e) {
            // report error
            this.logger.error("error calling:: IOS handler for " + eventName, e);
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
