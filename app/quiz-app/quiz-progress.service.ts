import { Injectable } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { EmitterService } from "../shared/emitter.service";
import { StopWatch, StopWatchService } from "../shared-player/stopwatch.service";
import { EventFactoryService } from "../shared-progress/event-factory.service";
import { QuizWord, Word, WordProgress, WordReference } from "./quiz-word";

@Injectable()
export class QuizProgressService {
    static EVENT_ON_WORD_START = "onWordStart";
    static EVENT_ON_WORD_LEARN = "onWordLearn";
    static EVENT_ON_WORD_QUIZ = "onWordQuiz";
    static EVENT_ON_WORD_COMPLETE = "onWordComplete";
    static EVENT_ON_WORD_MATCH = "onWordMatch";
    static EVENT_ON_WORD_REVERSE_MATCH = "onWordReverseMatch";
    static EVENT_ON_ACTIVITY_START = "onActivityStart";
    static EVENT_ON_ACTIVITY_COMPLETE = "onActivityComplete";
    static EVENT_ON_NEXT_QUESTION = "onNextQuestion";
    static EVENT_ON_NEXT_QUESTION_INIT = "onNextQuestionInit";

    static EVENT_START_WORD = "StartWord";
    static EVENT_COMPLETE_WORD = "CompleteWord";
    static EVENT_QUIZZED_WORD = "QuizzedWord";
    static EVENT_LEARNED_WORD = "LearnedWord";

    static PROGRESS_DATA_EVENTS = [
        QuizProgressService.EVENT_ON_WORD_START,
        QuizProgressService.EVENT_ON_WORD_LEARN,
        QuizProgressService.EVENT_ON_WORD_QUIZ,
        QuizProgressService.EVENT_ON_WORD_COMPLETE,
        QuizProgressService.EVENT_ON_WORD_MATCH,
        QuizProgressService.EVENT_ON_WORD_REVERSE_MATCH,
        QuizProgressService.EVENT_ON_ACTIVITY_START,
        QuizProgressService.EVENT_ON_ACTIVITY_COMPLETE
    ];

    static WORD_EVENT_LOOKUP = {
        StartWord: QuizProgressService.EVENT_ON_WORD_START,
        CompleteWord: QuizProgressService.EVENT_ON_WORD_COMPLETE,
        QuizzedWord: QuizProgressService.EVENT_ON_WORD_QUIZ,
        LearnedWord: QuizProgressService.EVENT_ON_WORD_LEARN
    };
    static WORD_ANSWER_EVENT_LOOKUP = {
        MatchWord: QuizProgressService.EVENT_ON_WORD_MATCH,
        ReverseMatchWord: QuizProgressService.EVENT_ON_WORD_REVERSE_MATCH
    };

    constructor(private emitterService: EmitterService,
                private eventFactory: EventFactoryService,
                private stopWatchService: StopWatchService) {
    }

    create(activityData, quizData, accountId: number = 0) {
        return new QuizProgress(
            this.eventFactory,
            this.emitterService.create(),
            activityData,
            quizData,
            accountId,
            this.stopWatchService
        );
    }
}

export class QuizProgress {

    private sessionStopWatch: StopWatch;
    private answerStopWatch: StopWatch;
    private quizWords: QuizWord[] = [];
    private dormantWords: QuizWord[] = [];
    private masteredWords: QuizWord[] = [];
    private wordsQueue: QuizWord[] = [];
    private currentWord: QuizWord;
    private questions: QuizQuestion[] = [];
    private currentQuestion: QuizQuestion;
    private grade: string = "";
    private currentIndex: number = 0;

    constructor(private eventFactory,
                private emitter,
                private activityData,
                private quizData,
                private accountId: number = 0,
                private stopwatchService) {

        this.sessionStopWatch = this.stopwatchService.create();
        this.answerStopWatch = this.stopwatchService.create();

        this.quizWords = this.quizData.quizWords;
        this.dormantWords = this.quizData.dormantWords;
        this.masteredWords = this.quizData.masteredWords;
        this.wordsQueue = _.clone(this.quizWords);
    }

    startSession(): void {
        this.sessionStopWatch.start();
        let startEvent = this.eventFactory
            .getFactory(this.eventFactory.TYPE_START, this.accountId)
            .createEvent(this.activityData);

        this.emitter.publish(QuizProgressService.EVENT_ON_ACTIVITY_START, startEvent);
        this.nextQuestion();
    }

    nextQuestion(): void {
        if (this.isCompleted()) {
            this.endSession();
            return;
        }

        this.publish(QuizProgressService.EVENT_ON_NEXT_QUESTION_INIT);

        this.currentIndex += 1;

        this.currentWord = this.pickWord();
        this.currentQuestion = new QuizQuestion(this.currentWord, QuizQuestion.TYPE_MATCH);

        this.answerStopWatch.reset();
        this.answerStopWatch.start();

        this.publish(QuizProgressService.EVENT_ON_NEXT_QUESTION, this.currentQuestion.getWord());
    }

    private pickWord(): QuizWord {
        return _.sample(this.wordsQueue);
    }

    getCurrentIndex(): number {
        return this.currentIndex;
    }

    getCurrentQuestion(): QuizQuestion {
        return this.currentQuestion;
    }

    answerQuestion(answer): void {
        this.answerStopWatch.stop();

        let question = this.getCurrentQuestion();
        let wordProgress: WordProgress = question.getQuizWord().getProgress();

        if (!wordProgress.hasProgress()) {
            this.publishWordEvent(QuizProgressService.EVENT_START_WORD, question.getWord());
        }

        question.setAnswer(answer);
        this.questions.push(question);
        if (wordProgress.isCorrect()) {
            if (!wordProgress.isLearned()) {
                wordProgress.setLearned();
                this.publishWordEvent(QuizProgressService.EVENT_LEARNED_WORD, question.getWord());
            }

            this.publishWordEvent(QuizProgressService.EVENT_COMPLETE_WORD, question.getWord());
        }
        this.updateWordQueues(this.currentWord);

        this.publishWordAnswerEvent(
            question.getType(),
            question.getWord(),
            question.getAnswer(),
            question.getDistractors(),
            question.isAnswerCorrect(),
            this.answerStopWatch.getTime(),
            question.getExample().dialogLineID
        );

        this.publishWordEvent(
            QuizProgressService.EVENT_QUIZZED_WORD,
            question.getWord(), {
                correct: question.isAnswerCorrect(),
                sessionTimeKey: this.eventFactory.buildSessionTimeKey()
            }
        );

        setTimeout(() => this.nextQuestion(), 2000);
    }

    private updateWordQueues(quizWord: QuizWord) {
        this.wordsQueue = _.filter(this.wordsQueue, (word: QuizWord) => {
            return word.getWord().wordHeadID != quizWord.getWord().wordHeadID;
        });
    }

    endSession(): void {
        this.sessionStopWatch.stop();
        let totalQuestions = this.questions.length;
        let correct = _.filter(this.questions, question => question.isAnswerCorrect()).length;
        let score = correct / totalQuestions;
        this.grade = this.computeGrade(score);

        let startEvent = this.eventFactory
            .getFactory(this.eventFactory.TYPE_COMPLETE, this.accountId)
            .createEvent(_.assign({}, this.activityData, {
                timeOnTask: this.sessionStopWatch.getTime(),
                total: totalQuestions,
                correct: correct,
                score: score,
                grade: this.grade
            }));

        this.emitter.publish(QuizProgressService.EVENT_ON_ACTIVITY_COMPLETE, startEvent);
    }

    getWordsCorrect(): QuizWord[] {
        return _.chain(this.questions)
            .map((question: QuizQuestion) => question.getQuizWord())
            .filter((quizWord: QuizWord) => {
                return quizWord.getProgress().isCorrect();
            })
            .value();
    }

    computeGrade(score): string {
        if (score >= 0.99) {
            return "A+";
        }
        if (score >= 0.90) {
            return "A";
        }
        if (score >= 0.85) {
            return "B+";
        }
        if (score >= 0.80) {
            return "B";
        }
        if (score >= 0.70) {
            return "C+";
        }
        if (score >= 0.60) {
            return "C";
        }
        if (score >= 0.40) {
            return "D";
        }
        return "F";
    }

    getGrade(): string {
        return this.grade;
    }

    getQuizWords(): QuizWord[] {
        return this.quizWords;
    };

    getDormantWords(): QuizWord[] {
        return this.dormantWords;
    }

    getMasteredWords(): QuizWord[] {
        return this.masteredWords;
    }

    getWordsQueue(): QuizWord[] {
        return this.wordsQueue;
    }

    getQuestions(): QuizQuestion[] {
        return this.questions;
    }

    getAnsweredQuestions(): QuizQuestion[] {
        return _.chain(this.questions)
            .filter(question => question.isAnswered())
            .sortBy(question => question.getWord().wordRootOrthography)
            .value();
    }

    getCompletionPercentage(): number {
        if (this.getWordsCorrect().length === this.getQuizWords().length) {
            return 100;
        }
        return this.getWordsCorrect().length / this.getQuizWords().length * 100;
    }

    getProgressBarWidth(): string {
        let percentage = this.getCurrentIndex() / this.getQuizWords().length * 100;
        return String(percentage) + "%";
    }

    hasProgress(): boolean {
        return this.getDormantWords().length > 0 || this.getMasteredWords().length > 0;
    }

    isCompleted(): boolean {
        return this.wordsQueue.length == 0;
    }

    subscribe(eventName: string, successFn: (data?) => void, errorFn?: (e?) => void): Subscription {
        return this.emitter.subscribe(eventName, successFn, errorFn);
    }

    publish(eventName: string, data?: any): void {
        this.emitter.publish(eventName, data);
    }

    destroy(): void {
        this.emitter.destroy();
    }

    publishWordEvent(type, word, additionalData: Object = {}): void {
        if (!QuizProgressService.WORD_EVENT_LOOKUP[type] || !this.accountId) {
            return;
        }

        let eventData = _.assign({}, this.activityData, {
            type: type,
            word: this.createWordReference(word)
        }, additionalData);

        let event = this.eventFactory
            .getFactory(this.eventFactory.TYPE_WORD, this.accountId)
            .createEvent(eventData);

        this.publish(QuizProgressService.WORD_EVENT_LOOKUP[type], event);
    }

    publishWordAnswerEvent(type,
                           word,
                           answerWord,
                           distractorWords,
                           correct,
                           userResponseTime,
                           exampleDialogLineId,
                           courseId?): void {
        if (!QuizProgressService.WORD_ANSWER_EVENT_LOOKUP[type] || !this.accountId) {
            return;
        }

        let eventData = _.assign({}, this.activityData, {
            type: type,
            word: this.createWordReference(word)
        });
        if (!_.isNil(answerWord)) {
            eventData.answerWord = this.createWordReference(answerWord);
        }
        if (!_.isNil(distractorWords)) {
            eventData.distractorWords = _.map(distractorWords, this.createWordReference);
        }
        if (!_.isNil(correct)) {
            eventData.correct = correct;
        }
        if (!_.isNil(userResponseTime)) {
            eventData.userResponseTime = userResponseTime;
        }
        if (!_.isNil(exampleDialogLineId)) {
            eventData.exampleDialogLineID = exampleDialogLineId;
        }
        if (!_.isNil(courseId)) {
            eventData.courseID = courseId;
        }

        let event = this.eventFactory
            .getFactory(this.eventFactory.TYPE_WORD, this.accountId)
            .createEvent(eventData);

        this.publish(QuizProgressService.WORD_ANSWER_EVENT_LOOKUP[type], event);
    }

    private createWordReference(word: Word): WordReference {
        return {
            wordHeadID: word.wordHeadID,
            wordRootID: word.wordRootID,
            wordRootDefinitionID: word.wordRootDefinitionID
        };
    }
}

export class QuizQuestion {
    static NUM_CHOICES = 4;
    static TYPE_MATCH = "MatchWord";
    static TYPE_REVERSE_MATCH = "ReverseMatchWord";
    static TYPE_REVERSE_INPUT = "ReverseMatchWordType";

    private isQuestionAnswered: boolean = false;
    private distractors: Word[] = [];
    private choices: Word[] = [];
    private example;
    private answer: Word;
    private typedAnswer: string;

    constructor(private quizWord: QuizWord,
                private type: string = QuizQuestion.TYPE_MATCH,
                numChoices: number = QuizQuestion.NUM_CHOICES) {
        this.example = _.sample(this.getQuizWord().examples);
        this.distractors = _.sampleSize(this.getQuizWord().distractors, (numChoices - 1) || 0);
        let choicePool = _.concat(this.distractors, this.example.word);
        this.choices = _.shuffle(choicePool);
    }

    getType(): string {
        return this.type;
    }

    isTypeMatch(): boolean {
        return this.type == QuizQuestion.TYPE_MATCH;
    }

    isTypeReverseMatch(): boolean {
        return this.type == QuizQuestion.TYPE_REVERSE_MATCH;
    }

    isTypeReverseInput(): boolean {
        return this.type == QuizQuestion.TYPE_REVERSE_INPUT;
    }

    getQuizWord(): QuizWord {
        return this.quizWord;
    }

    getWord(): Word {
        return this.getQuizWord().getWord();
    }

    getExample(): any {
        return this.example;
    }

    getDistractors(): Word[] {
        return this.distractors;
    }

    getAnswer(): Word {
        return this.answer;
    }

    setAnswer(answer: Word): boolean {
        this.answer = answer;
        this.isQuestionAnswered = true;

        let wordProgress = this.getQuizWord().getProgress();
        if (_.has(this.answer, "wordHeadID")) {
            wordProgress.setCorrect(answer.wordHeadID == this.example.word.wordHeadID);
        }

        return wordProgress.isCorrect();
    }

    getTypedAnswer(): string {
        return this.typedAnswer;
    }

    setTypedAnswer(typedAnswer: string): boolean {
        this.typedAnswer = typedAnswer;
        this.isQuestionAnswered = true;

        let wordProgress = this.getQuizWord().getProgress();
        wordProgress.setCorrect(typedAnswer.toUpperCase() == this.example.word.orthography);

        return wordProgress.isCorrect();
    }

    isAnswered(): boolean {
        return this.isQuestionAnswered;
    }

    isAnswerCorrect(): boolean {
        return this.getQuizWord().getProgress().isCorrect();
    }

    getChoices(): Word[] {
        return this.choices;
    }
}
