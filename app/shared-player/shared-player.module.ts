import { NgModule } from "@angular/core";
import { AudioService } from "./audio.service";
import { VideoComponent } from "./video.component";
import { StopWatchService } from "./stopwatch.service";
import { TranscriptComponent } from "./transcript.component";

@NgModule({
    providers: [
        AudioService,
        StopWatchService
    ],
    declarations: [
        TranscriptComponent,
        VideoComponent
    ],
    exports: [
        TranscriptComponent,
        VideoComponent
    ]
})
export class SharedPlayerModule {
}
