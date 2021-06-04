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

const recursiveDivision = (grid, cell, width, height, tempCounter) => {
	if (
		height < 2 
		|| width < 2 
	) {
		return;
	}

	if (tempCounter === 2) {
		return;
	}
	tempCounter++;
	// width > height, build wall vertically
	// build the wall
	buildWall(cell, width > height);
	if (width > height) {
		const rightWidth = width - cell.row;
		// create new 2darray per block of size width x height
		const newRightGrid = new Array(rightWidth, height);
		console.log(newRightGrid);
		// recurse right and left respectively
		// recursiveDivision(gridArray[cell.row][cell.col],)
	}
	else{
		// recurse up and down
	}
}

const startRecursiveDivision = () => {
	let x = 0;
	let y = 0;

	x = rowCount > colCount() ? getRandom(x, rowCount) : 0;
	y = rowCount > colCount() ? 0 : getRandom(y, colCount());

	recursiveDivision(gridArray, gridArray[x][y], rowCount, colCount(), 0);
}

// build a wall
const buildWall = (start, isVertical) => {
	let i = 0;
	if (isVertical) {
		while (gridArray[start.row][i + start.col] !== undefined) {
			gridArray[start.row][i + start.col].isWall = true;
			gridArray[start.row][i + start.col].show(wallColor);
			i++;
		}
		return;
	}

	while (gridArray[i + start.row] !== undefined) {
		gridArray[i + start.row][start.col].isWall = true;
		gridArray[i + start.row][start.col].show(wallColor);
		i++;
	}
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandom = (min, max) => {
	return Math.floor((Math.random() * (((max - 2) - (min + 2))) + (min + 2)));	
};
/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

export { startRecursiveDivision };