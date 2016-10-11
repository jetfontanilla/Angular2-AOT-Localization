import { Component, Renderer, Input, AfterViewChecked } from "@angular/core";

@Component({
    selector: "ec-transcript",
    template: "<div class='transcript' [innerHTML]='getTranscript()'></div>",
    styleUrls: ["transcript.component.css"]
})
export class TranscriptComponent implements AfterViewChecked {
    @Input() transcript: string;
    @Input() orthography: string;
    protected match: string;

    constructor(protected renderer: Renderer) {
    }

    ngAfterViewChecked() {
        if (!this.match) {
            return;
        }

        let transcriptEl = this.renderer.selectRootElement(".transcript-word");
        this.renderer.setText(transcriptEl, this.match);
        this.renderer.setElementStyle(transcriptEl, "text-decoration", "underline");
        this.renderer.setElementStyle(transcriptEl, "font-style", "normal");
        this.renderer.setElementStyle(transcriptEl, "font-weight", "600");
    }

    getTranscript(): string {
        if (!this.transcript) {
            return "";
        }

        if (!this.orthography) {
            return this.transcript;
        }

        let matches = this.transcript.match(
            new RegExp(this.orthography, "i")
        );

        if (!matches || !matches.length) {
            return this.transcript;
        }

        this.match = matches[0];

        return this.transcript.replace(
            this.match,
            "<span class='transcript-word'></span>"
        );
    }
}
