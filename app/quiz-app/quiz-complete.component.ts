import { Component, Input } from "@angular/core";
import { QuizStateService } from "./quiz-state.service";

@Component({
    selector: "ec-quiz-complete",
    templateUrl: "quiz-complete.component.html",
    styleUrls: ["quiz-complete.component.css"]
})
export class QuizCompleteComponent {
    static NUM_STARS = 40;

    @Input() quizState: QuizStateService;

    stars = Array(QuizCompleteComponent.NUM_STARS).keys();
}
