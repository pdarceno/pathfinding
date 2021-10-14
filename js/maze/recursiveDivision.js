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
const finalColCount = colCount();
let done = false;

const recursiveDivision = (grid, cell, tempCounter) => {
	// Recursion Termination
	if (grid.length < 3 || grid[0].length < 3) {
		return;
	}

	if (tempCounter === 3) {
		return;
	}
	tempCounter++;

	// build wall vertically if width is greater
	// const isVertical = grid.length > grid[0].length;
	const isVertical = true;

	// select a cell within the width and height for the base coordinate of the wall
	const newX = getRandom(cell.row, grid.length);
	const newY =  getRandom(cell.col, grid[0].length);

	const dividedGridArray = isVertical ? buildVertical(gridArray[newX][newY]) : buildHorizontal(gridArray[newX][newY]);

	if (isVertical) {
		// left fixed
		const leftGrid = dividedGridArray[0];
		console.log(leftGrid);
		console.log(leftGrid[0][0]);
		// recursiveDivision(leftGrid, leftGrid[0][0], tempCounter);
		// right broken
		// const rightGrid = setupVerticalGrid(gridArray[newX][newY], newX, grid[0].length, true);
		// recursiveDivision(rightGrid, rightGrid[0][0], tempCounter);
		return;
	}
	// top
	// setup vertical grid at left
	// const topGrid = setupHorizontalGrid((gridArray[newX][newY]), grid.length, newY, false);
	// recursiveDivision(topGrid, topGrid[0][0], tempCounter);
	// bot
	const bottomGrid = setupHorizontalGrid((gridArray[newX][newY]), grid.length, finalColCount - newY, true);
	recursiveDivision(bottomGrid, bottomGrid[0][0], tempCounter);
}

const startRecursiveDivision = () => {
	recursiveDivision(gridArray, gridArray[0][0], rowCount, finalColCount, 0);
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandom = (min, max) => {
	return Math.floor((Math.random() * (((max - 1) - (min + 2))) + (min + 2)));	
};

// build a wall
const buildVertical = (start, isDown) => {
	// if building the check if either a wall or undefined to stop
	let iUp = 1;
	let iDown = 1;
	while (gridArray[start.row][iUp + start.col] !== undefined) {
		if (gridArray[start.row][iUp + start.col].isWall){
			return;
		}
		gridArray[start.row][iUp + start.col].isWall = true;
		gridArray[start.row][iUp + start.col].show(wallColor);
		iUp ++;
	}

	while (gridArray[start.row][start.col - iDown] !== undefined) {
		if (gridArray[start.row][start.col - iDown].isWall){
			return;
		}
		gridArray[start.row][start.col - iDown].isWall = true;
		gridArray[start.row][start.col - iDown].show('red');
		iDown++;
	}
	// // since it started at 1 + row, add wall for the passed cell at finish
	// start.isWall = true;
	// start.show('red');

	let dividedGridArray = new Array();
	let leftGrid = new Array();
	let rightGrid = new Array();
	let gridHeight = iUp + iDown;
	let iBounds = 1;
	// left grid to return
	while (gridArray[start.row - iBounds] !== undefined) {
		if (gridArray[start.row - iBounds][start.col].isWall){
			return;
		}
		leftGrid[iBounds - 1] = new Array(gridHeight);
		iUp = 1;
		iDown = 1;
		while (gridArray[start.row - iBounds][iUp + start.col] !== undefined) {
			if (gridArray[start.row - iBounds][iUp + start.col].isWall){
				return;
			}
			leftGrid[iBounds - 1][iUp - 1] = gridArray[start.row - iBounds][iUp + start.col];
			iUp ++;
		}

		while (gridArray[start.row - iBounds][start.col - iDown] !== undefined) {
			if (gridArray[start.row - iBounds][start.col - iDown].isWall){
				return;
			}
			leftGrid[iBounds - 1][start.col + iDown] = gridArray[start.row - iBounds][start.col - iDown];
			iDown++;
		}

		iBounds++;
	}

	// right grid to return
	iBounds = 1;
	while (gridArray[start.row + iBounds] !== undefined) {
		if (gridArray[start.row + iBounds][start.col].isWall){
			return;
		}
		rightGrid[iBounds - 1] = new Array(gridHeight);
		iUp = 1;
		iDown = 1;
		while (gridArray[start.row + iBounds][iUp + start.col] !== undefined) {
			if (gridArray[start.row + iBounds][iUp + start.col].isWall){
				return;
			}
			rightGrid[iBounds - 1][iUp - 1] = gridArray[start.row + iBounds][iUp + start.col];
			iUp ++;
		}

		while (gridArray[start.row + iBounds][start.col - iDown] !== undefined) {
			if (gridArray[start.row + iBounds][start.col - iDown].isWall){
				return;
			}
			rightGrid[iBounds - 1][start.col + iDown] = gridArray[start.row + iBounds][start.col - iDown];
			iDown++;
		}

		iBounds++;
	}

	dividedGridArray.push(leftGrid);
	dividedGridArray.push(rightGrid);
	return dividedGridArray;
}

const buildHorizontal = (start, isRight) => {
	// if building the check if either a wall or undefined to stop
	let iRight = 1;
	let iLeft = 1;

	while (gridArray[iRight + start.row] !== undefined) {
		if (gridArray[iRight + start.row][start.col].isWall){
			return;
		}
		gridArray[iRight + start.row][start.col].isWall = true;
		gridArray[iRight + start.row][start.col].show(wallColor);
		iRight++;
	}
	
	while (gridArray[start.row - iLeft] !== undefined) {
		if (gridArray[start.row - iLeft][start.col].isWall){
			return;
		}
		gridArray[start.row - iLeft][start.col].isWall = true;
		gridArray[start.row - iLeft][start.col].show('blue');
		iLeft++;
	}
	// // since it started at 1 + row, add wall for the passed cell at finish
	// start.isWall = true;
	// start.show('blue');

	let dividedGridArray = new Array();
	let topGrid = new Array();
	let bottomGrid = new Array();
	let gridWidth = iRight + iLeft;
	let iBounds = 1;

	// top grid to return 
	while (gridArray[start.row][iBounds + start.col] !== undefined) {
		if (gridArray[start.row][iBounds + start.col].isWall){
			return;
		}
		topGrid[gridWidth] = new Array(/*gridHeight*/);
		let iRight = 1;
		let iLeft = 1;
		while (gridArray[start.row][iBounds + start.col] !== undefined) {
			if (gridArray[start.row][iBounds + start.col].isWall){
				return;
			}
			// console.log(iBounds)
			// topGrid[iBounds - 1][iUp - 1] = gridArray[start.row - iBounds][iUp + start.col];
			gridArray[start.row - iBounds][iUp + start.col].show('red');
			iUp ++;
		}

		while (gridArray[start.row][start.col - iBounds] !== undefined) {
			if (gridArray[start.row][start.col - iBounds].isWall){
				return;
			}
			// topGrid[iBounds - 1][start.col + (iDown - 1)] = gridArray[start.row - iBounds][start.col - iDown];
			// topGrid[iBounds - 1][start.col + iDown] = gridArray[start.row - iBounds][start.col - iDown];
			gridArray[start.row][start.col + iDown].show('red');
			iDown++;
		}
		iBounds ++;
	}

	iBounds = 1;
	while (gridArray[start.row][start.col - iBounds] !== undefined) {
		if (gridArray[start.row][start.col - iBounds].isWall){
			return;
		}
		iBounds++;
	}
	// while (gridArray[start.row][start.col - iBounds] !== undefined) {
	// 	if (gridArray[start.row - iBounds][start.col].isWall){
	// 		return;
	// 	}
		// topGrid[iBounds - 1] = new Array(gridHeight);
		// iUp = 1;
		// iDown = 1;
		// while (gridArray[start.row - iBounds][iUp + start.col] !== undefined) {
		// 	if (gridArray[start.row - iBounds][iUp + start.col].isWall){
		// 		return;
		// 	}
		// 	// console.log(iBounds)
		// 	topGrid[iBounds - 1][iUp - 1] = gridArray[start.row - iBounds][iUp + start.col];
		// 	// gridArray[start.row - iBounds][iUp + start.col].show('red');
		// 	iUp ++;
		// }

		// while (gridArray[start.row - iBounds][start.col - iDown] !== undefined) {
		// 	if (gridArray[start.row - iBounds][start.col - iDown].isWall){
		// 		return;
		// 	}
		// 	// topGrid[iBounds - 1][start.col + (iDown - 1)] = gridArray[start.row - iBounds][start.col - iDown];
		// 	topGrid[iBounds - 1][start.col + iDown] = gridArray[start.row - iBounds][start.col - iDown];
		// 	// gridArray[start.row - iBounds][start.col - iDown].show('red');
		// 	iDown++;
		// }

	// 	iBounds++;
	// }

	// // right grid to return
	// iBounds = 1;
	// while (gridArray[start.row + iBounds] !== undefined) {
	// 	if (gridArray[start.row + iBounds][start.col].isWall){
	// 		return;
	// 	}
	// 	bottomGrid[iBounds - 1] = new Array(gridHeight);
	// 	iUp = 1;
	// 	iDown = 1;
	// 	while (gridArray[start.row + iBounds][iUp + start.col] !== undefined) {
	// 		if (gridArray[start.row + iBounds][iUp + start.col].isWall){
	// 			return;
	// 		}
	// 		// console.log(iBounds)
	// 		bottomGrid[iBounds - 1][iUp - 1] = gridArray[start.row + iBounds][iUp + start.col];
	// 		gridArray[start.row + iBounds][iUp + start.col].show('red');
	// 		iUp ++;
	// 	}

	// 	while (gridArray[start.row + iBounds][start.col - iDown] !== undefined) {
	// 		if (gridArray[start.row + iBounds][start.col - iDown].isWall){
	// 			return;
	// 		}
	// 		// bottomGrid[iBounds - 1][start.col + (iDown - 1)] = gridArray[start.row - iBounds][start.col - iDown];
	// 		bottomGrid[iBounds - 1][start.col + iDown] = gridArray[start.row + iBounds][start.col - iDown];
	// 		gridArray[start.row + iBounds][start.col - iDown].show('red');
	// 		iDown++;
	// 	}

	// 	iBounds++;
	// }

	dividedGridArray.push(topGrid);
	dividedGridArray.push(bottomGrid);
	return dividedGridArray;
}


/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

export { startRecursiveDivision };