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

const startMaze = (x, y, width, height, isVertical) => {
	if (complete) {
		return;
	}

	if (width < 2 || height < 2) {
		return;
	}	

	if (isVertical) {
		for (let i = 0; i < height; i++) {
			if (i !== x) {
				gridArray[x][i].isWall = true;
				gridArray[x][i].show(wallColor);
			}
		}
	}
	/*
	do same if horizontal
	*/
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
	
	let x = getRandom(0, rowCount);
	let y = getRandom(0, colCount());

	let isVertical = rowCount > colCount();

	startMaze(x, y, rowCount, colCount(), isVertical);
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandom = (min, max) => {
	return Math.floor(Math.random() * ((max - 1) - (min + 1)) + (min + 1));	
};


/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

export { startRecursiveDivision };