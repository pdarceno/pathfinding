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
	if (height < 2 || width < 2) {
		return;
	}

	let newX = x;
	let newY = y;
	let newWidth = width;
	let newHeight = height;

	if (isVertical) {
		for (let i = 0; i < height; i++) {
			gridArray[x][i + y].isWall = true;
			gridArray[x][i + y].show(wallColor);
		}

		newWidth = rowCount - x;

	} else {
		for (let i = 0; i < width; i++) {
			gridArray[x + i][y].isWall = true;
			gridArray[x + i][y].show(wallColor);
		}

		newHeight = colCount() - y;
	}
	const xRandom = getRandom(x, x + newWidth);
	newWidth > newHeight && console.log(`x ${x} x + newWidth ${x + newWidth}`);
	newWidth > newHeight && console.log(`xRandom ${xRandom}`)
	newX = newWidth > newHeight ? xRandom : x;
	newY = newWidth > newHeight ? y : getRandom(y, y + newHeight);

	// setTimeout(() => {
		// counter++;
		recursiveDivision(newX, newY, newWidth, newHeight, newWidth > newHeight);

	// }, 1000 * counter);
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
	return Math.floor((Math.random() * (((max - 1) - (min + 2))) + (min + 2)));	
};


/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

export { startRecursiveDivision };