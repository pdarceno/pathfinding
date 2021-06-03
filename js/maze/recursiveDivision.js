'use strict';
import { rowCount, wallColor } from '../constants.js';
import * as Util from '../utils.js';
import * as Setup from '../setup.js';
import { timeLabel } from '../elements.js';

/*========================================= CELL =========================================*/
const startCell = Util.exportStartCell;
const endCell = Util.exportEndCell;
const erase = Util.erase;
/*========================================= CELL =========================================*/

/*========================================= SETUP =========================================*/
const colCount = Setup.exportColCount;
const gridArray = Setup.gridArray;
const totalPath = Setup.totalPath;
/*========================================= SETUP =========================================*/

/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

let complete = false;
let counter = 0;

const recursiveDivision = (x, y, width, height, isVertical) => {
	if (complete) {
		return;
	}

	if (width < 2 || height < 2) {
		return;
	}	

	if (counter === 10) {
		return;
	}

	let newX = x;
	let newY = y;
	let newWidth = width;
	let newHeight = height;
	
	console.log('received')
	console.log(newX)
	console.log(newY)
	console.log(newWidth)
	console.log(newHeight)
	console.log(newWidth > newHeight)

	if (isVertical) {
		console.log('compute vertical')
		const point = getRandom(x, height);

		for (let i = 0; i < height; i++) {
			if (i !== point) {
				gridArray[x][i + y].isWall = true;
				gridArray[x][i + y].show(wallColor);
			}
		}

		newWidth = rowCount - x;
		newX = newWidth > height ? getRandom(x, rowCount) : x;
	}

	else {
		console.log('compute horizontal')
		const point = getRandom(y, width);
		
		for (let i = 0; i < width; i++) {
			if (i !== point) {
				gridArray[x + i][y].isWall = true;
				gridArray[x + i][y].show(wallColor);
			}
		}

		newHeight = colCount() - y;
		newY = width > newHeight ? y : getRandom(y, colCount());
	}

	console.log('pass')
	console.log(newX)
	console.log(newY)
	console.log(newWidth)
	console.log(newHeight)
	console.log(newWidth > newHeight)
	counter++;
	return recursiveDivision(newX, newY, newWidth, newHeight, newWidth > newHeight);
}

const startRecursiveDivision = () => {
	/*
	x is the current position in currentRowCount
	y is the current position in currentColCount

	width is currentRowCount
	height is currentColCount

	isVertical:
	if width > height orientation vertical divide
	*/
	
	let x = 0;
	let y = 0;

	x = rowCount > colCount() ? getRandom(x, rowCount) : 0;
	y = rowCount > colCount() ? 0 : getRandom(y, colCount());

	recursiveDivision(x, y, rowCount, colCount(), rowCount > colCount());
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandom = (min, max) => {
	return Math.floor(Math.random() * (((max - 1) - (min + 1)) + (min + 1)));	
};


/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

export { startRecursiveDivision };