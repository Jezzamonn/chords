import { playNote } from "./sound";
import { sinEaseInOut, slurp, clamp } from "./util";

const NOTE_LENGTH = 0.5;
const NUM_NOTES = 5;
const FADE_LENGTH = 0.5;

const WIDTH = 200;
const HEIGHT = 100;

export default class SoundController {

	constructor(audioContext, startNote = 1) {
        this.audioContext = audioContext;
        this.startNote = startNote;
        this.animAmt = 0;
        this.done = false;
    }
    
    start() {
        this.animAmt = 0;

        for (let i = 0; i < NUM_NOTES; i ++) {
            playNote({
                audioContext: this.audioContext,
                scaleNote: this.startNote + 2 * i,
                delay: i * NOTE_LENGTH
            });
        }
    }

	/**
	 * @param {Number} dt Time in seconds since last update
	 */
	update(dt) {
        this.animAmt += dt;
        if (this.animAmt > (NUM_NOTES - 1) * NOTE_LENGTH + FADE_LENGTH) {
            this.done = true;
        }
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
        let noteAmt = (this.animAmt / NOTE_LENGTH) % 1;
        let noteIndex = Math.floor(this.animAmt / NOTE_LENGTH);
        let fadeAmt = clamp((this.animAmt - (NUM_NOTES - 1) * NOTE_LENGTH) / FADE_LENGTH, 0, 1);
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
