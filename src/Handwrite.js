import {Circle} from './Helper'

class Handwrite {
	constructor(canvas, image) {

		this.image = image
		this.canvasArt = canvas
		this.canvasMask = this.canvasArt.cloneNode()
		// document.body.appendChild(this.canvasMask)
		this.ctxArt = this.canvasArt.getContext('2d')
		this.ctxMask = this.canvasMask.getContext('2d')

		this.WIDTH = this.canvasArt.width
		this.HEIGHT = this.canvasArt.height

		this.defaultOptions = {
			speed:3,
			brushSize:6,
			repeat:0,
			cleanFromBehind:false,
			cleanUpWhenDone: false,
			callback:null
		}

		this.options
		this.interval
		this.timeout
		this.loopCount = 0
	}


	drawCycle() {
		this.index = 0
		this.clear()
		clearInterval(this.interval)
		clearTimeout(this.timeout)
		this.interval = setInterval(()=>{
			const pos = this.points[this.index]

			if(pos) {
				this.drawArt(pos, this.options.brushSize)

			} else {

				this.onDoneForever()
				if(this.options.callback) {
					this.options.callback()
				}

				if( this.loopCount < this.options.repeat ) {
					this.loopCount++
					this.timeout = setTimeout(this.drawCycle.bind(this), 1000)
				}
			}
			this.index++
		}, this.options.speed)
	}


	draw(points, options) {
		this.loopCount = 0
		this.points = points
		this.options =  {...this.defaultOptions, ...options}
		this.drawCycle()
	}

	clear() {
		this.ctxArt.clearRect(0,0,this.WIDTH, this.HEIGHT)
		this.ctxMask.clearRect(0,0,this.WIDTH, this.HEIGHT)
	}


	drawArt(pos) {
		if(pos){
			Circle(this.ctxMask, pos.x, pos.y, this.options.brushSize)

			if(this.options.cleanFromBehind) {
				this.ctxMask.fillRect(0,0,pos.x-30, this.HEIGHT)
			}
		}




		this.ctxArt.clearRect(0, 0, this.WIDTH, this.HEIGHT)
		this.ctxArt.drawImage(this.canvasMask, 0, 0);
		this.ctxArt.save();
		this.ctxArt.globalCompositeOperation = 'source-in';
		this.ctxArt.drawImage(this.image, 0, 0);
		this.ctxArt.restore();
	}

	onDoneForever() {
		if(this.options.cleanUpWhenDone) {
			this.ctxMask.fillStyle = "#31B131"
			this.ctxMask.fillRect(0,0,this.WIDTH, this.HEIGHT)
			this.drawArt()
		}
		clearInterval(this.interval)
	}
}

export default Handwrite