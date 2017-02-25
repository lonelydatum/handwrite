const PI = Math.PI
// const color = '#ff0000'

function Circle(ctx, x, y, r=8, color='#ff0000') {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * PI, false);
	ctx.fillStyle = color;
	ctx.fill();
}

export {Circle}