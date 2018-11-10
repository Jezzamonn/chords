import { playNote } from "./sound";
import { sinEaseInOut, slurp, clamp } from "./util";

const NOTE_LENGTH = 1;
const NUM_NOTES = 3;
const FADE_LENGTH = 1;

const WIDTH = 200;
const HEIGHT = 100;

export default class SoundController {

	constructor(audioContext, startNoteIndex) {
        this.audioContext = audioContext;
        this.startNoteIndex = startNoteIndex;
        this.animAmt = 0;
        this.done = false;
    }
    
    start() {
        this.animAmt = 0;
        playNote(this.audioContext, 0, {delay: 0 * NOTE_LENGTH});
        playNote(this.audioContext, 4, {delay: 1 * NOTE_LENGTH});
        playNote(this.audioContext, 7, {delay: 2 * NOTE_LENGTH});
    }

	/**
	 * @param {Number} dt Time in seconds since last update
	 */
	update(dt) {
        this.animAmt += dt;
        if (this.animAmt > NOTE_LENGTH * NUM_NOTES + FADE_LENGTH) {
            this.done = true;
        }
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
        let noteAmt = this.animAmt % 1;
        let noteIndex = Math.floor(this.animAmt);
        let fadeAmt = clamp((this.animAmt - NUM_NOTES * NOTE_LENGTH) / FADE_LENGTH, 0, 1);
        context.globalAlpha = 1 - fadeAmt;

        const bounceAmt = 1 - (4 * noteAmt * (1 - noteAmt));

        const x = slurp(-WIDTH, WIDTH, (noteIndex + noteAmt) / NUM_NOTES);
        const y = slurp(-HEIGHT, HEIGHT, bounceAmt);

        context.beginPath();
        context.fillStyle = 'blue';
        context.arc(x, y, 2, 0, 2 * Math.PI);
        context.fill();
        context.globalAlpha = 1;
	}

}
