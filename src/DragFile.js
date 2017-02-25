import Signals from 'signals'

class DragFile {
	constructor(dom) {
		this.signals = {
			imageReady: new Signals()
		}
		var holder = dom
		holder.ondragleave = function () { this.className = ''; return false; };
		holder.ondragover = function () { this.className = 'hover'; return false; };
		holder.ondragend = function () { this.className = ''; return false; };
		holder.ondrop = this.onDrop.bind(holder, this)
	}

	onDrop(scope, e) {
		this.className = '';
		e.preventDefault();

		var file = e.dataTransfer.files[0]
		const reader = new FileReader();
		reader.onload = (event) => {
			scope.signals.imageReady.dispatch(event.target.result)
		};


		reader.readAsDataURL(file);
		return false;

	}


}

export default DragFile