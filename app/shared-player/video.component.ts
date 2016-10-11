import { Component, Input, AfterViewInit, OnChanges, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { EmitterService } from "../shared/emitter.service";
import { Logger, LoggerService } from "../shared/logger.service";

// inject jQuery into the global namespace
let videojs = require("video.js");
(<any>window).videojs = videojs;

import "video.js/dist/video-js.min.css";

@Component({
    selector: "ec-video",
    template: `
        <video
        [id]="videoId"
        controls
        webkit-playsinline 
        playsinline
        class="video-js vjs-default-skin vjs-big-play-centered">
            <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
        </video>
`
})
export class VideoComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() videoId: string;
    @Input() videoUrl: string;
    @Input() poster: string;
    @Input() width: string;
    @Input() height: string;
    @Input() videoOptions: any;

    player;
    private logger: Logger;

    constructor(private emitterService: EmitterService, private loggerService: LoggerService) {
        this.logger = this.loggerService.getLogger(LoggerService.LOGGER_CONSOLE);
    }

    private getVideoOptions() {
        let baseVideoOptions = {
            poster: this.poster,
            width: this.width,
            height: this.height
        };

        return _.assign(baseVideoOptions, this.videoOptions);
    }

    private renderVideo() {
        if (!this.videoId || !this.videoUrl) {
            return;
        }

        let videoOptions = this.getVideoOptions();

        this.player = videojs(
            this.videoId,
            videoOptions,
            () => {
            }
        );
        this.player.src(this.videoUrl);
        this.player.load();

        if (_.has(videoOptions, "controlBar") && !videoOptions.controlBar) {
            this.player.on("ended", () => {
                this.player.load();
            });
        }
    }

    ngAfterViewInit() {
        this.renderVideo();
        console.log("init");
        //  let videoElement = this.videoElement.nativeElement.querySelector("video");
        //   this.video = new VideoInstance(videoElement, this.emitterService.create(), this.logger);
    }

    ngOnChanges(changes) {
        if (!this.videoId || !this.videoUrl) {
            return;
        }

        if (this.player) {
            let videoOptions = this.getVideoOptions();
            this.player.src(this.videoUrl);
            this.player.poster(videoOptions.poster);
            this.player.load();
        }
    }

    ngOnDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    }
}

export class VideoInstance {
    static ON_PLAY = "play";
    static ON_STOP = "stop";
    static ON_END = "end";

    video: HTMLVideoElement;
    isPlaying: boolean = false;
    hasError: boolean = false;

    constructor(video: HTMLVideoElement, private emitter, private logger) {
        video.onended = () => {
            this.isPlaying = false;
            this.emitter.publish(VideoInstance.ON_END, this);
        };
        video.addEventListener("error", e => {
            this.hasError = true;
            this.logger.error("video error", e);
        });

        this.video = video;
    }

    play(): void {
        if (this.hasError || !this.video) {
            return;
        }
        this.video.currentTime = 0;
        this.video.play();
        this.isPlaying = true;
        this.emitter.publish(VideoInstance.ON_PLAY, this);
    }

    stop(): void {
        if (this.hasError || !this.video) {
            return;
        }
        this.video.currentTime = 0;
        this.video.pause();
        this.isPlaying = false;
        this.emitter.publish(VideoInstance.ON_STOP, this);
    }

    onPlay(callback: () => void): Subscription {
        return this.emitter.subscribe(VideoInstance.ON_PLAY, callback);
    }

    onStop(callback: () => void): Subscription {
        return this.emitter.subscribe(VideoInstance.ON_STOP, callback);
    }

    onEnd(callback: () => void): Subscription {
        return this.emitter.subscribe(VideoInstance.ON_END, callback);
    }

    destroy(): void {
        this.stop();
        this.video.src = "";
        this.video.load();
        this.video = undefined;
        this.emitter.destroy();
    }
}
