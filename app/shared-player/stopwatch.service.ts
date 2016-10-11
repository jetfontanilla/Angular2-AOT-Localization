import { Injectable } from "@angular/core";

@Injectable()
export class StopWatchService {
    create() {
        return new StopWatch();
    }
}

export class StopWatch {
    private startDate: Date;
    private endDate: Date;
    private started: boolean = false;

    start(): void {
        if (!this.started) {
            this.startDate = new Date();
            this.endDate = this.startDate;
        }
    }

    stop(): void {
        if (this.started) {
            this.endDate = new Date();
        }
    }

    getTime(): number {
        if (this.started && this.startDate && this.endDate) {
            return this.endDate.getTime() - this.startDate.getTime();
        }

        return 0;
    }

    reset() {
        this.started = false;
    }
}
