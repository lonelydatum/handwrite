import Handwrite from './HandwriteES5__ENTRY.js'

import p from './points.js'

const image = document.getElementById('renderImage')
const canvas = document.getElementById('renderCanvas')

canvas.width = image.width
canvas.height = image.height

const handwrite = new Handwrite(canvas, image)

const o = {
	speed:2,
	brushSize:4,
	repeat:1,
	callback: cb,
	cleanFromBehind:true,
	cleanUpWhenDone:true
}

handwrite.draw(p)
handwrite.draw(p)
handwrite.draw(p)
handwrite.draw(p)

function cb() {
	console.log(this);
}

let i = 0
setInterval(()=>{
	if(i<5) {
		handwrite.draw(p, o)
	}
	i++
}, 800)