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

// checkArray is the list of elements to be checked
let checkArray = new Array();

const recursiveDivision = (cell, width, height, isVertical) => {
	if (height < 2 || width < 2) {
		return;
	}
	
	let newWidth = width;
	let newHeight = height;

	// build the wall from left to right or from up to down
	buildWall(cell, isVertical);
	// assign a new width if vertical, else assign a new height
	isVertical ? newWidth = rowCount - cell.row : newHeight = colCount() - cell.col;
	// newX is a new random x ranging from the current cell row to cell row + width if the new width is greater than height
	const newX = newWidth > newHeight ? getRandom(cell.row, cell.row + newWidth) : cell.row;
	// newY is a new random y ranging from the current cell col to cell col + height if the new height is greater than width
	const newY = newWidth > newHeight ? cell.col : getRandom(cell.col, cell.col + newHeight);

	// right and down
	recursiveDivision(gridArray[newX][newY], newWidth, newHeight, newWidth > newHeight);
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

	recursiveDivision(gridArray[x][y], rowCount, colCount(), rowCount > colCount());
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
	return Math.floor((Math.random() * (((max - 1) - (min + 2))) + (min + 2)));	
};

/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

export { startRecursiveDivision };