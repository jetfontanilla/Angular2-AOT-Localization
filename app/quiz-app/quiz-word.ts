export class QuizWord {
    word: Word;
    distractors: Word[];
    examples: Object;

    private progress: WordProgress;

    constructor(quizWord: any) {
        this.word = quizWord.word;
        this.distractors = quizWord.distractors;
        this.examples = quizWord.examples;
        this.progress = new WordProgress();
    }

    getWord(): Word {
        return this.word;
    }

    getDistractors(): Word[] {
        return this.distractors;
    }

    getProgress(): WordProgress {
        return this.progress;
    }
}

export class WordProgress {
    private correct: boolean;
    private learned: boolean = false;
    private mastered: boolean = false;
    private dormant: boolean = false;

    setCorrect(correct: boolean): void {
        this.correct = correct;
    }

    isCorrect(): boolean {
        return this.correct;
    }

    setLearned(): void {
        this.learned = true;
    }

    isLearned(): boolean {
        return this.learned;
    }

    setMastered(): void {
        this.mastered = true;
    }

    isMastered(): boolean {
        return this.mastered;
    }

    setDormant(): void {
        this.dormant = true;
    }

    isDormant(): boolean {
        return this.dormant;
    }

    hasProgress(): boolean {
        return !_.isNil(this.correct);
    }
}

export interface WordReference {
    wordHeadID: number;
    wordRootID: number;
    wordRootDefinitionID: number;
}

export interface Word extends WordReference {
    orthography;
    wordRootOrthography;
    pronunciation;
    definition;
    partOfSpeech;
    audioURL;
}
