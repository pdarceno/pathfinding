'use strict';
import { canvas, context } from './elements.js';
import { rowCount, canvasWidth } from './constants.js';
import { gridArray, exportColCount } from './setup.js';
import * as _State from './state.js';

// startState, endState, State
let startState = _State.startState;
let endState = _State.endState;

const disableButtons = exception => {
	document.querySelectorAll('.buttons').forEach(button => {
		button !== exception && button.classList.remove('active');
	})
}

// place functions
const place = (which, position) => {
	switch (which) {
		case 'start':
			startState && erase(which);
			startState = gridArray[position.x][position.y];
			startState.show('green');
			return;
		
		case 'wall':
			gridArray[position.x][position.y].isWall = true;
			gridArray[position.x][position.y].show('black');
			return;
		
		case 'end':
			endState && erase(which);
			endState = gridArray[position.x][position.y];
			endState.show('red');
			return;

		default:
			return;
	}
}

// erase functions
const erase = which => {
	switch (which) {
		case 'start':
			startState.show('#ddd');
			startState = null;
			return;
		
		case 'walls':
			gridArray.forEach(array => {
				array.forEach(state => {
					if (state.isWall) {
						state.isWall = false;
						state.show('#ddd');
					}
				});
			});
			return;
		
		case 'end':
			endState.show('#ddd');
			endState = null;
			return;		

		case 'paths':
			// reset color and status of anything not a wall
			gridArray.forEach(array => {
				array.forEach(state => {
					if (!state.isWall) {
						state.isPath = false;
						state.weight = 0;
						state.show('#ddd');
					}
				});
			});
			return;

		case 'all':
			startState && erase('start');
			endState && erase('end');

			gridArray.forEach(array => {
				array.forEach(state => {
					state.isPath = false;
					state.isWall = false;
					state.weight = 0;
					state.show('#ddd');
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

const exportStartState = () => {
	return startState;
}

const exportEndState = () => {
	return endState;
}

export { disableButtons, place, erase, eraseWall, getMousePosition, exportStartState, exportEndState };
