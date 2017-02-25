import {Circle} from './Helper'
import Signals from 'signals'


class Capture {
	constructor(canvas, radius=20, points=[]) {
		this.signals = {
			pointsUpdated: new Signals()
		}

		this.radius = radius
		this.isDown = false
		this.canvas = canvas
		this.ctx = this.canvas.getContext('2d')

		this.canvas.addEventListener('mousemove', this.onMove.bind(this), false )
		this.canvas.addEventListener('mousedown', this.onDown.bind(this), false )
		this.canvas.addEventListener('mouseup', this.onUp.bind(this), false )

		this.points = points

		this.index = 0

		this.tl = new TimelineMax()
		this.color = 'rgba(255, 0, 255, .2)'
		this.prev = {x:-1, y:-1}

		this.storage = []

		this.currentItem = this.points.slice();

		this.draw()

		document.onkeydown = this.onKeyPress.bind(this, this);
		this.onUp()
		console.log(this.storage, this.currentItem);
	}

	setBrush(value) {
		this.radius = value
	}


	// undo from key: ctr+z
	onKeyPress(scope, e) {
		var evtobj = window.event? event : e
		if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
			scope.undo()
		}
	}


	undo(){
		this.storage.splice(-1, 1)
		this.merge()
		this.updateDraw()
	}


	// takes all the items from this.storage and merges/flattens them into this.points
	merge() {
		this.points = []
		this.storage.forEach(item=>{
			this.points = this.points.concat(item)
		})

		localStorage.setItem('points', JSON.stringify(this.points))
		this.signals.pointsUpdated.dispatch(this.points)
	}



	onDown(e) {
		e.preventDefault()
		this.currentItem = []
		this.isDown = true
	}

	onUp() {
		this.isDown = false
		this.storage.push(this.currentItem)
		this.merge()
	}



	onMove(e){
		if(!this.isDown) { return }


		const pos = this.getMousePos(this.canvas, e)
		if(pos.x!==this.prev.x|| pos.y!==this.prev.y) {
			this.currentItem.push(pos)
			this.prev = pos
			this.drawCircle(pos.x, pos.y)
		}
	}

	drawCircle(x, y) {
		Circle(this.ctx, x, y, this.radius, this.color)
	}

	updateDraw() {
		this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
		this.points.forEach(pos => this.drawCircle(pos.x, pos.y) )

	}

	startOver() {
		this.storage = []
		this.merge()
		this.updateDraw()
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	draw() {
		this.clear()
		this.index = 0
		const si = setInterval(()=>{
			const point = this.points[this.index]
			if(point) {
				this.drawCircle(point.x, point.y)
			} else {
				clearInterval(si)
			}
			this.index++
		}, 10)
	}



	getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect()
        return {
          x: Math.round(evt.clientX - rect.left),
          y: Math.round(evt.clientY - rect.top)
        };
    }
}

export default Capture