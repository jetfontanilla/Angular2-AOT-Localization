import { Component } from "@angular/core";
import { ProgressQueueService } from "../shared-progress/progress-queue.service";
import { EventFactoryService } from "../shared-progress/event-factory.service";

// Add the RxJS Observable operators we need in this app.
import "../rxjs-operators";

@Component({
    selector: "ec-progress-app",
    template: "Hello World"
})
export class ProgressAppComponent {
    constructor(private progressQueue: ProgressQueueService,
                private eventFactory: EventFactoryService) {

    }
}
