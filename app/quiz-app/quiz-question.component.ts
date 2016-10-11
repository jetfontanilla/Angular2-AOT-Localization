import {
    Component,
    Input,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
} from "@angular/core";
import { AudioInstance, AudioService } from "../shared-player/audio.service";
import { QuizProgressService } from "./quiz-progress.service";
import { QuizStateService } from "./quiz-state.service";
import { QuizQuestion } from "./quiz-progress.service";

@Component({
    selector: "ec-quiz-question",
    templateUrl: "quiz-question.component.html",
    styleUrls: ["quiz-question.component.css"],
    animations: [
        trigger("questionAnimation", [
            state("in", style({transform: "translateX(0)"})),
            transition("out => in", [
                style({transform: "translateX(100%)"}),
                animate("0.3s ease-in")
            ]),
            transition("in => out", [
                animate("0.3s ease-out", style({transform: "translateX(-100%)"}))
            ])
        ])
    ]
})
export class QuizQuestionComponent implements OnInit {
    @Input() quizState: QuizStateService;
    audio: AudioInstance;
    animationState: string = "out";

    constructor(private audioService: AudioService) {
    }

    ngOnInit() {
        this.quizState.subscribe(QuizStateService.EVENT_START, () => {
            let quizProgress = this.quizState.getQuizProgress();

            quizProgress.subscribe(
                QuizProgressService.EVENT_ON_NEXT_QUESTION_INIT,
                () => this.animationState = "out"
            );

            quizProgress.subscribe(
                QuizProgressService.EVENT_ON_NEXT_QUESTION,
                (currentWord) => {
                    if (this.audio) {
                        this.audio.destroy();
                    }
                    this.audio = this.audioService.create(currentWord.audioURL);

                    setTimeout(() => this.animationState = "in", 100);
                }
            );
        });
    }

    // things we do after slider animation
    animationDone($event) {
        if ($event.toState == "in") {
            this.audio.play();
        }
    }

    getQuestion(): QuizQuestion {
        return this.quizState.getQuizProgress().getCurrentQuestion();
    }

    getButtonClass(choice): string {
        if (!this.getQuestion() || !this.getQuestion().isAnswered()) {
            return "";
        }

        let isCorrectChoice = this.getQuestion().getWord().wordHeadID == choice.wordHeadID;

        if (this.getQuestion().isAnswerCorrect()
            && isCorrectChoice) {
            return "correct";
        }

        if (_.isEqual(this.getQuestion().getAnswer(), choice)) {
            return "incorrect";
        }

        if (isCorrectChoice) {
            return "missed";
        }

        return "blur";
    };
}
