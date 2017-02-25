import {Circle} from './Helper'

class Render {
	constructor(canvas, image) {

		this.image = image
		this.canvasArt = canvas
		this.canvasMask = this.canvasArt.cloneNode()
		// document.body.appendChild(this.canvasMask)
		this.ctxArt = this.canvasArt.getContext('2d')
		this.ctxMask = this.canvasMask.getContext('2d')

		this.WIDTH = this.canvasArt.width
		this.HEIGHT = this.canvasArt.height
	}

	draw(points, options) {
		this.clear()
		const defaultOptions = {timeScale:1, radius:6}
		const o = {...defaultOptions, ...options}
		const {timeScale, radius} = o
		this.tl = new TimelineMax()
		const tlDraw = new TimelineMax({onComplete:this.onDone.bind(this)})
		tlDraw.timeScale(timeScale)

		let size = 0
		points.map(item=>{
			tlDraw.addCallback(()=>{
				Circle(this.ctxMask, item.x, item.y, radius)
				size++
			}, "+=.01")
		})

		this.tl.add(tlDraw)

		this.tl.add('final')
		// this.tl.to(this.canvasArt, .001, {opacity:0}, 'final')
		// this.tl.to(this.image, .001, {opacity:1}, 'final')


		this.keepRendering = true
		this.render()
		return this.tl

	}

	clear() {
		this.ctxArt.clearRect(0,0,this.WIDTH, this.HEIGHT)
		this.ctxMask.clearRect(0,0,this.WIDTH, this.HEIGHT)
	}


	onDone() {
		// this.keepRendering = false
		// this.drawArt()
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

		if(!this.keepRendering) {
			return
		}
		requestAnimationFrame(this.render.bind(this))

	}
}

export default Render