import { Component, Input } from "@angular/core";
import { QuizStateService } from "./quiz-state.service";

@Component({
    selector: "ec-quiz-start",
    templateUrl: "quiz-start.component.html",
    styleUrls: ["quiz-start.component.css"]
})
export class QuizStartComponent {
    @Input()
    quizState: QuizStateService;
}
