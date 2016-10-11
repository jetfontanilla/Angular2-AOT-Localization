import { NgModule } from "@angular/core";
import { SharedModule }   from "../shared/shared.module";

// progress queue
import { LocalForageAdapterService } from "./local-forage-adapter.service";
import { MemoryAdapterService } from "./memory-adapter.service";
import { ProgressQueueService } from "./progress-queue.service";

// event factory
import { EventFactoryService } from "./event-factory.service";

@NgModule({
    imports: [SharedModule],
    providers: [
        LocalForageAdapterService,
        MemoryAdapterService,
        ProgressQueueService,
        EventFactoryService
    ]
})
export class SharedProgressModule {
}
