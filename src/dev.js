import DragFile from './DragFile.js'
import Capture from './Capture.js'
import Handwrite from './Handwrite.js'



const dragTarget = document.getElementById('dragTarget');
const captureCanvas = document.getElementById('captureCanvas');
const captureImage = document.getElementById('captureImage');
const pointsTextArea = document.getElementById('pointsTextArea');

const renderImage = document.getElementById('renderImage');
const renderCanvas = document.getElementById('renderCanvas');

const brushSizeResult = document.getElementById('brushSizeResult');
const brushSize = document.getElementById('brushSize');

const undo = document.getElementById('undo');
const totalPoint = document.getElementById('totalPoint');

const startOver = document.getElementById('startOver');
const drawButton = document.getElementById('drawButton');



class Dev {
	constructor() {

		this.points = []
		this.brush = brushSize.value
		this.image = null

		console.log(localStorage);
		if(localStorage.length>0) {
			this.updateFromLocal()
			this.ready()
		}


		this.dragFile = new DragFile(dragTarget)
		this.dragFile.signals.imageReady.add(this.loadImage.bind(this))

		brushSize.addEventListener('change', ()=>this.brushUpdate(brushSize.value))
		drawButton.addEventListener('click', this.draw.bind(this), false )
		undo.addEventListener('click', this.undo.bind(this))

	}

	ready() {
		console.log(this.points);
		this.capture = new Capture(captureCanvas, brushSize.value, this.points)
		this.handwrite = new Handwrite(renderCanvas, renderImage)

		this.capture.signals.pointsUpdated.add(this.pointsUpdated)
		startOver.addEventListener('click', this.capture.startOver.bind(this.capture) )

		this.loadImage(this.image)
		this.pointsUpdated(this.points);
		this.brushUpdate(this.brush)
	}

	updateFromLocal() {
		this.image = localStorage.getItem('image')
		this.points = JSON.parse(localStorage.getItem('points'))
		this.brush = localStorage.getItem('brush')
	}

	undo() {
		this.capture.undo()
	}

	brushUpdate(size) {
		brushSize.value = size;
		brushSizeResult.innerHTML = `Brush size of: ${size}`
		localStorage.setItem('brush', size)
		this.capture.setBrush(size)
		this.capture.draw()
	}

	loadImage(imageData) {
		localStorage.setItem('image', imageData)
		renderImage.src = captureImage.src = imageData
		renderCanvas.width = captureCanvas.width = captureImage.width
		renderCanvas.height = captureCanvas.height = captureImage.height


		const holders = document.querySelectorAll('#handwrite .holder')
		for(let i=0;i<holders.length; i++) {
			const holderItem = holders[i]
			holderItem.style.width = `${captureImage.width}px`
			holderItem.style.height = `${captureImage.height}px`
		}

	}


	draw() {
		this.handwrite.draw(this.capture.points, {radius:this.capture.radius})
	}


	pointsUpdated(points) {
		pointsTextArea.value = JSON.stringify(points)
		totalPoint.innerHTML = `${points.length}`
		localStorage.setItem('points', pointsTextArea.value)
	}

}


export default new Dev()
