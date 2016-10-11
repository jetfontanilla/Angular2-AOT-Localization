import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

/* App Root */
import { ProgressAppComponent } from "./progress-app.component";

/* Feature Modules */
import { SharedProgressModule }   from "../shared-progress/shared-progress.module";

@NgModule({
    imports: [
        SharedProgressModule,
        BrowserModule
    ],
    declarations: [
        ProgressAppComponent
    ],
    bootstrap: [
        ProgressAppComponent
    ]
})
export class ProgressAppModule {
}
