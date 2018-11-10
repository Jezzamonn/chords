import { playNote } from "./sound";
import SoundController from "./sound-controller";

const NOTE_LENGTH = 1;

export default class Controller {

	constructor(audioContext) {
		this.audioContext = audioContext;
		this.animAmt = 1;
		this.period = 4;

		this.loopCount = 0;

		this.subControllers = [];
	}

	/**
	 * @param {Number} dt Time in seconds since last update
	 */
	update(dt) {
		this.subControllers = this.subControllers.filter(controller => !controller.done);
		for (const subController of this.subControllers) {
			subController.update(dt);
		}

		this.animAmt += dt / this.period;
		if (this.animAmt >= 1) {
			this.onLoop();
			this.loopCount ++;
		}
		this.animAmt %= 1;
	}

	onLoop() {
		const soundController = new SoundController(this.audioContext, -this.loopCount);
		soundController.start();
		this.subControllers.push(soundController);
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		for (const subController of this.subControllers) {
			subController.render(context);
		}
	}

}
