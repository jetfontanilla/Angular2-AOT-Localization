import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

/* App Root */
import { QuizAppComponent } from "./quiz-app.component";
import { QuizStartComponent } from "./quiz-start.component";
import { QuizQuestionComponent } from "./quiz-question.component";
import { QuizCompleteComponent } from "./quiz-complete.component";
import { EventHandlerService } from "./event-handler.service";
import { QuizProgressService } from "./quiz-progress.service";
import { QuizStateService } from "./quiz-state.service";
import { VocabularyQuizService } from "../model/bridge/vocabulary-quiz.service";

/* Feature Modules */
import { SharedModule }   from "../shared/shared.module";
import { SharedPlayerModule } from "../shared-player/shared-player.module";
import { SharedProgressModule } from "../shared-progress/shared-progress.module";

@NgModule({
    imports: [
        SharedModule,
        SharedPlayerModule,
        SharedProgressModule,
        BrowserModule
    ],
    declarations: [
        QuizAppComponent,
        QuizStartComponent,
        QuizQuestionComponent,
        QuizCompleteComponent
    ],
    bootstrap: [
        QuizAppComponent
    ],
    providers: [
        EventHandlerService,
        QuizProgressService,
        QuizStateService,
        VocabularyQuizService
    ]
})
export class QuizAppModule {
}
