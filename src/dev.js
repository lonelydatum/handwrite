import Handwrite from './HandwriteES5__ENTRY.js'



const image = document.getElementById('renderImage')
const canvas = document.getElementById('renderCanvas')

canvas.width = image.width
canvas.height = image.height

const handwrite = new Handwrite(canvas, image)
console.log(this);
