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
const resetGrid = Setup.resetGrid;
/*========================================= SETUP =========================================*/

/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

// cellArray is the list of elements checked
let cellArray = new Array();
let done = false;

const recursiveBacktrack = (cell, width, height, rightDown, tempCounter) => {
	// if done
	if (done) {
		return;
	}
	if (tempCounter === 6) {
		return;
	}

	let newWidth = width;
	let newHeight = height;
	let newX = cell.row;
	let newY = cell.col;
	let newRightDown = rightDown;
	// push the cell
	cellArray.push(cell);

	if (newWidth > newHeight) {
		// build the wall from up to down
		buildVertical(cell, newRightDown);
		newWidth = rowCount - newX;
		newX = newWidth > newHeight ? getRandom(newX, newX + newWidth) : newX;

		if (newWidth < 3) {
			newRightDown = false;
			// get a new X to build a wall
			cell = cellArray.pop();
			buildVertical(cell, newRightDown);
		}

		tempCounter++;
		return recursiveBacktrack(cell, newWidth, newHeight, newRightDown, tempCounter);
	}
	// build the wall from left to right
	buildHorizontal(cell, newRightDown);
	newHeight = colCount() - newY;
	newY = newWidth > newHeight ? newY : getRandom(newY, newY + newHeight);
	if (newHeight < 3) {
		// recurse to the cell's left
		newRightDown = false;
		cell = cellArray.pop();
		buildHorizontal(cell, newRightDown);
	}

	tempCounter++;
	return recursiveBacktrack(cell, newWidth, newHeight, newRightDown, tempCounter);
}

const startRecursiveDivision = () => {
	resetGrid();
	cellArray = new Array();
	
	let x = 0;
	let y = 0;

	x = rowCount > colCount() ? getRandom(x, rowCount) : 0;
	y = rowCount > colCount() ? 0 : getRandom(y, colCount());

	recursiveBacktrack(gridArray[x][y], rowCount, colCount(), true, 0);
}

// build a wall
const buildVertical = (start, isDown) => {
	// if building the check if either a wall or undefined to stop
	let i = 1;
	if (isDown) {
		while (gridArray[start.row][i + start.col] !== undefined) {
			if (gridArray[start.row][i + start.col].isWall){
				return;
			}
			gridArray[start.row][i + start.col].isWall = true;
			gridArray[start.row][i + start.col].show(wallColor);
			i ++;
		}
		// since it started at 1 + row, add wall for the passed cell at finish
		start.isWall = true;
		start.show(wallColor);
		return;
	}

	while (gridArray[start.row][start.col - i] !== undefined) {
		if (gridArray[start.row][start.col - i].isWall){
			return;
		}
		gridArray[start.row][start.col - i].isWall = true;
		gridArray[start.row][start.col - i].show('red');
		i ++;
	}
	// since it started at 1 + row, add wall for the passed cell at finish
	start.isWall = true;
	start.show('red');
}


const buildHorizontal = (start, isRight) => {
	// if building the check if either a wall or undefined to stop
	let i = 1;
	if (isRight) {
		while (gridArray[i + start.row] !== undefined) {
			if (gridArray[i + start.row][start.col].isWall){
				return;
			}
			gridArray[i + start.row][start.col].isWall = true;
			gridArray[i + start.row][start.col].show(wallColor);
			i++;;
		}
		// since it started at 1 + row, add wall for the passed cell at finish
		start.isWall = true;
		start.show(wallColor);
		return;
	}
	while (gridArray[start.row - i] !== undefined) {
		if (gridArray[start.row - i][start.col].isWall){
			return;
		}
		gridArray[start.row - i][start.col].isWall = true;
		gridArray[start.row - i][start.col].show('blue');
		i++;
	}
	// since it started at 1 + row, add wall for the passed cell at finish
	start.isWall = true;
	start.show('blue');
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandom = (min, max) => {
	return Math.floor((Math.random() * (((max - 1) - (min + 2))) + (min + 2)));	
};

/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

export { startRecursiveDivision };