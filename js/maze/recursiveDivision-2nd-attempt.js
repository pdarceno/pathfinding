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

const recursiveDivision = (grid, width, height, isVertical, tempCounter) => {
	console.log(`
		width: ${width}, 
		height: ${height}, 
		isVertical: ${isVertical}`)
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

	if (isVertical) {
		for (let i = 0; i < height; i++) {
			grid[x][i + y].isWall = true;
			grid[x][i + y].show(wallColor);
		}

		const rightWidth = width - x;
		const rightX = rightWidth > height ? getRandom(x, x + rightWidth) : x;
		const rightY = rightWidth > height ? y : getRandom(y, y + height);
		console.log(`
			rightX: ${rightX}, 
			rightY: ${rightY}, 
			rightWidth: ${rightWidth},
			height: ${height}, 
			isVertical: ${rightWidth > height}`);

		const leftWidth = width - rightWidth;
		const leftX = leftWidth > height ? getRandom(width - (), leftWidth) : x;
		const leftY = leftWidth > height ? y : getRandom(y, y + height);
		console.log(`
			leftX: ${leftX}, 
			leftY: ${leftY}, 
			leftWidth: ${leftWidth}, 
			height: ${height}, 
			isVertical: ${leftWidth > height}`);

		// right
		recursiveDivision(rightX, rightY, rightWidth, height, rightWidth > height, tempCounter);
		// left
		recursiveDivision(leftX, leftY, leftWidth, height, leftWidth > height, tempCounter);

	} else {
		for (let i = 0; i < width; i++) {
			grid[x + i][y].isWall = true;
			grid[x + i][y].show(wallColor);
		}

		const bottomHeight = colCount() - y;
		const bottomY = width > bottomHeight ? getRandom(y, y + bottomHeight) : y;
		const bottomX = width > bottomHeight ? x : getRandom(x, x + width);
		console.log(`
			bottomX: ${bottomX}, 
			bottomY: ${bottomY},
			width: ${width}, 
			bottomHeight: ${bottomHeight}`);

		const topHeight = (colCount() - height) + y;
		const topY = width > topHeight ? getRandom(colCount() - height, topHeight) : y;
		const topX = width > topHeight ? x : getRandom(x, x + width);
		console.log(`
			topX: ${topX}, 
			topY: ${topY}, 
			width: ${width}, 
			topHeight: ${topHeight}`);
		
		// bottom
		recursiveDivision(bottomX, bottomY, width, bottomHeight, width > bottomHeight, tempCounter);
		// top
		recursiveDivision(topX, topY, width, topHeight, width > topHeight, tempCounter);
	}
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
	let grid = gridArray;

	x = rowCount > colCount() ? getRandom(x, rowCount) : 0;
	y = rowCount > colCount() ? 0 : getRandom(y, colCount());


	console.log(`beginX = ${x} beginY = ${y}`)
	recursiveDivision(grid, rowCount, colCount(), rowCount > colCount(), 0);


	// test
	// const test = false;
	// x = test ? getRandom(x, rowCount) : 0;
	// y = test ? 0 : getRandom(y, colCount());

	// recursiveDivision(x, y, rowCount, colCount(), test);
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandom = (min, max) => {
	return Math.floor((Math.random() * (((max - 2) - (min + 2))) + (min + 2)));	
};


/*========================================= START OF A RECURSIVE DIVISION ALGORITHM =========================================*/

export { startRecursiveDivision };