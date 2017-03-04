export default class Animation {

	constructor() {
		this.stop = false;
		this.frameCount = 0;


		this.fpsInterval
		this.startTime
		this.now
		this.then
		this.elapsed

	}

	startAnimating(fps, callback) {
		// console.log(this);
		this.callback = callback
	    this.fpsInterval = 1000 / fps;
	    this.then = Date.now();
	    this.startTime = this.then;
	    this.animate();
	}
	animate() {
		// if(this.stop){
	 //    	return
	 //    }
		// requestAnimationFrame(this.animate.bind(this));
		// this.callback()

		const si = setInterval(()=>{
			this.callback()
			if(this.stop) {
				clearInterval(si)
			}
		}, 1)
	}

	animate_() {

	    // request another frame
	    if(this.stop){
	    	return
	    }
	    requestAnimationFrame(this.animate.bind(this));

	    // calc elapsed time since last loop

	    this.now = Date.now();
	    this.elapsed = this.now - this.then;
	    // console.log(this.fpsInterval);
	    // if enough time has elapsed, draw the next frame

	    if (this.elapsed > this.fpsInterval) {

	        // Get ready for next frame by setting then=now, but also adjust for your
	        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
	        this.then = this.now - (this.elapsed % this.fpsInterval)
	        this.callback()
	        // console.log(Math.random());
	        // Put your drawing code here

	    }
	}
}