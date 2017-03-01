import {Circle} from './Helper'
import Animation from './Animation.js'


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

		this.defaultOptions = {fps:40, brushSize:6}
		this.options
		this.animation = new Animation()
	}

	animationCallback() {
		const item = this.points[this.index]
		if(item) {
			Circle(this.ctxMask, item.x, item.y, this.options.brushSize)
		} else {
			this.onDone()
		}
		this.index++
	}




	draw(points, options) {
		alert(JSON.stringify(options))
		this.points = points
		this.index = 0

		this.clear()
		this.options =  {...this.defaultOptions, ...options}
		this.animation.startAnimating(this.options.fps, this.animationCallback.bind(this))
		this.keepRendering = true
		this.render()
	}

	clear() {
		this.ctxArt.clearRect(0,0,this.WIDTH, this.HEIGHT)
		this.ctxMask.clearRect(0,0,this.WIDTH, this.HEIGHT)
	}


	onDone() {
		this.animation.stop = true
		this.keepRendering = false
		this.drawArt()
	}


	drawArt() {
		this.ctxArt.clearRect(0, 0, this.WIDTH, this.HEIGHT)
		this.ctxArt.drawImage(this.canvasMask, 0, 0);
		this.ctxArt.save();
		this.ctxArt.globalCompositeOperation = 'source-in';
		this.ctxArt.drawImage(this.image, 0, 0);
		this.ctxArt.restore();
	}

	render() {
		this.drawArt()
		// console.log(Math.random());
		if(!this.keepRendering) {
			return
		}
		requestAnimationFrame(this.render.bind(this))

	}
}

export default Handwrite