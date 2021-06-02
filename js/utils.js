'use strict';
import { canvas, context } from './elements.js';
import { rowCount, canvasWidth } from './constants.js';
import { gridArray, exportColCount } from './setup.js';
import * as _Cell from './cell.js';

// startCell, endCell, Cell
let startCell = _Cell.startCell;
let endCell = _Cell.endCell;

const disableButtons = exception => {
	document.querySelectorAll('.buttons').forEach(button => {
		button !== exception && button.classList.remove('active');
	})
}

// place functions
const place = (which, position) => {
	switch (which) {
		case 'start':
			startCell && erase(which);
			startCell = gridArray[position.x][position.y];
			startCell.show('green');
			return;
		
		case 'wall':
			gridArray[position.x][position.y].isWall = true;
			gridArray[position.x][position.y].show('black');
			return;
		
		case 'end':
			endCell && erase(which);
			endCell = gridArray[position.x][position.y];
			endCell.show('red');
			return;

		default:
			return;
	}
}

// erase functions
const erase = which => {
	switch (which) {
		case 'start':
			startCell.show('#ddd');
			startCell = null;
			return;
		
		case 'walls':
			gridArray.forEach(array => {
				array.forEach(cell => {
					if (cell.isWall) {
						cell.isWall = false;
						cell.show('#ddd');
					}
				});
			});
			return;
		
		case 'end':
			endCell.show('#ddd');
			endCell = null;
			return;		

		case 'paths':
			// reset color and status of anything not a wall
			gridArray.forEach(array => {
				array.forEach(cell => {
					if (!cell.isWall) {
						cell.isPath = false;
						cell.weight = 0;
						cell.show('#ddd');
					}
				});
			});
			return;

		case 'all':
			startCell && erase('start');
			endCell && erase('end');

			gridArray.forEach(array => {
				array.forEach(cell => {
					cell.isPath = false;
					cell.isWall = false;
					cell.weight = 0;
					cell.show('#ddd');
				});
			});
			return;

		default:
			return;
	}
}

// erase wall function
const eraseWall = position => {
	if (gridArray[position.x][position.y].isWall) {
		gridArray[position.x][position.y].isWall = false;
		gridArray[position.x][position.y].show('#ddd');
	}
}

// get current position on click
const getMousePosition = event => {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;

	let cellX = 0;
	let cellY = 0;

	context.beginPath(); // begin

	context.lineWidth = 5;
	context.lineCap = 'round';
	context.strokeStyle = 'purple';

	context.moveTo(x, y); // from
	context.lineTo(x, y); // to

	context.stroke(); // draw it

	// bounds of the square unit can depend on just row
	const bounds = canvasWidth / rowCount;


	for (let i = 0; i < rowCount; i++) {
		if (x > (bounds * i)){
			cellX = i;
		}

		if (y > (bounds * i)){
			cellY = i;
		}
	}

	const position = {x: cellX, y: cellY};
	console.log(exportColCount())
	return position;
}

// function to export the variable startCell
const exportStartCell = () => {
	return startCell;
}

// function to export the variable endCell
const exportEndCell = () => {
	return endCell;
}

export { disableButtons, place, erase, eraseWall, getMousePosition, exportStartCell, exportEndCell };
