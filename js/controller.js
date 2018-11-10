import { playNote } from "./sound";
import SoundController from "./sound-controller";

const NOTE_LENGTH = 1;

export default class Controller {

	constructor(audioContext) {
		this.audioContext = audioContext;
		this.animAmt = 1;
		this.period = 8;

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
			const soundController = new SoundController(this.audioContext, 0);
			soundController.start();
			this.subControllers.push(soundController);
		}
		this.animAmt %= 1;
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
