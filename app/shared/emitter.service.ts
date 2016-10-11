import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class EmitterService {
    create(): Emitter {
        return new Emitter();
    }
}

export class Emitter {
    protected observables = {};

    constructor() {
    }

    subscribe(eventName: string, successFn: (data?) => void, errorFn?: (e?) => void): Subscription {
        if (!successFn) {
            throw "No callback provided for subscription. Subscription cancelled.";
        }

        if (!this.observables[eventName]) {
            this.observables[eventName] = new Subject();
        }

        return this.observables[eventName].subscribe(successFn, errorFn);
    }

    publish(eventName: string, data?: any): void {
        if (!this.observables[eventName]) {
            return;
        }

        this.observables[eventName].next(data);
    }

    destroy(): void {
        for (const k in this.observables) {
            if (this.observables.hasOwnProperty(k)) {
                this.observables[k].unsubscribe();
            }
        }

        this.observables = {};
    }
}
