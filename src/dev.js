import DragFile from './DragFile.js'
import Capture from './Capture.js'
import Render from './Render.js'


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




class Dev {
	constructor() {
		this.render = null

		brushSize.addEventListener('change', this.brushUpdate.bind(this))
		this.capture = new Capture(captureCanvas, brushSize.value)
		this.brushUpdate()


		this.dragFile = new DragFile(dragTarget)
		this.dragFile.signals.imageReady.add((imageData)=>{
			this.loadImage(imageData);
		})

		const imageData = localStorage.getItem('image')
		if(imageData) {
			this.loadImage(imageData)
		}


		const drawButton = document.getElementById('drawButton');
		drawButton.addEventListener('click', ()=>{
			this.draw(this.capture.points)
		})

		undo.addEventListener('click', this.undo.bind(this))

		startOver.addEventListener('click', this.capture.startOver.bind(this.capture) )

		this.pointsUpdated([])

	}

	undo() {
		this.capture.undo()
	}

	brushUpdate() {
		this.capture.setBrush(brushSize.value)
		brushSizeResult.innerHTML = `Brush size of: ${brushSize.value}`
	}

	loadImage(imageData) {
		localStorage.setItem('image', imageData)
		renderImage.src = captureImage.src = imageData
		renderCanvas.width = captureCanvas.width = captureImage.width
		renderCanvas.height = captureCanvas.height = captureImage.height

		this.capture.signals.pointsUpdated.add(this.pointsUpdated)

		this.render = new Render(renderCanvas, renderImage)
	}


	draw(points) {
		this.render.draw(points, {radius:this.capture.radius})
	}


	pointsUpdated(points) {
		pointsTextArea.value = JSON.stringify(points)
		totalPoint.innerHTML = `Length of array ${points.length}`
		localStorage.setItem('points', pointsTextArea.value)
	}

}





















export default new Dev()
