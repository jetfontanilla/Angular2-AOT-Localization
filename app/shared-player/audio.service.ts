import { Injectable } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { EmitterService } from "../shared/emitter.service";
import { Logger, LoggerService } from "../shared/logger.service";

@Injectable()
export class AudioService {
    private logger: Logger;

    constructor(private emitterService: EmitterService, private loggerService: LoggerService) {
        this.logger = this.loggerService.getLogger(LoggerService.LOGGER_CONSOLE);
    }

    create(url) {
        return new AudioInstance(url, this.emitterService.create(), this.logger);
    }
}

export class AudioInstance {
    static ON_PLAY = "play";
    static ON_STOP = "stop";
    static ON_END = "end";

    audio: HTMLAudioElement;
    isPlaying: boolean = false;
    hasError: boolean = false;

    constructor(url, private emitter, private logger) {
        let audio = new Audio(url);
        audio.preload = "true";
        audio.onended = () => {
            this.isPlaying = false;
            this.emitter.publish(AudioInstance.ON_END, this);
        };
        audio.onerror = (e) => {
            this.hasError = true;
            this.logger.error("audio error", e, 0, {
                url: url
            });
            this.logger.log(e);
        };

        this.audio = audio;
    }

    play(): void {
        if (this.hasError || !this.audio || this.isPlaying) {
            return;
        }
        this.audio.currentTime = 0;
        this.audio.play();
        this.isPlaying = true;
        this.emitter.publish(AudioInstance.ON_PLAY, this);
    }

    stop(): void {
        if (this.hasError || !this.audio) {
            return;
        }
        this.audio.currentTime = 0;
        this.audio.pause();
        this.isPlaying = false;
        this.emitter.publish(AudioInstance.ON_STOP, this);
    }

    onPlay(callback: () => void): Subscription {
        return this.emitter.subscribe(AudioInstance.ON_PLAY, callback);
    }

    onStop(callback: () => void): Subscription {
        return this.emitter.subscribe(AudioInstance.ON_STOP, callback);
    }

    onEnd(callback: () => void): Subscription {
        return this.emitter.subscribe(AudioInstance.ON_END, callback);
    }

    destroy(): void {
        this.stop();
        this.audio.onerror = () => {};
        this.audio.src = "";
        this.audio.load();
        this.audio = undefined;
        this.emitter.destroy();
    }
}
