'use strict';
import * as _Cell from './cell.js';
import { context } from './elements.js';
import * as Constant from './constants.js';

const Cell = _Cell.Cell;

const backgroundColor = Constant.backgroundColor;
const gridLineColor = Constant.gridLineColor;
const canvasWidth = Constant.canvasWidth;
const canvasHeight = Constant.canvasHeight;
const cellDimension = Constant.cellDimension;
const rowCount = Constant.rowCount;

// the counter
// this will depend on the screen size
let colCount = 0;

let gridArray = new Array(rowCount);
// array of the path Cells
let totalPath = new Array();

// setup all the neccessities


// called at init, and at every page resize
const setup = (initialize = false) => {
	const gridWidth = cellDimension * rowCount;

	context.beginPath();
	context.fillStyle = backgroundColor;
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	// now we know the size of our grid,
	// our canvas will be one lineWidth bigger to show the outer strokes
	const strokeOffset = context.lineWidth / 2;

	for (let i = 0; i <= canvasHeight + context.lineWidth; i += cellDimension) {
		colCount++;
		// vertical divider
		context.moveTo(strokeOffset, i + strokeOffset);
		context.lineTo(gridWidth + strokeOffset, i + strokeOffset);
	}

	for (let i = 0; i <= gridWidth + context.lineWidth; i += cellDimension) {
		context.moveTo(i + strokeOffset, strokeOffset);
		context.lineTo(i + strokeOffset, gridWidth + strokeOffset);
	}
	// stroke only once
	context.strokeStyle = gridLineColor;
	context.stroke();
	context.closePath();

	initialize && setupGrid();

	// redraw all the nodes that were already active
	gridArray.flat().filter(node => node.color).forEach(node => node.show(node.color));
}

// setup Cells
const setupGrid = () => {
	for (let i = 0; i < rowCount; i++) {
		gridArray[i] = new Array(colCount);
		for (let j = 0; j < colCount; j++) {
			gridArray[i][j] = new Cell(i, j);
		}
	}

	// setup neighbors
	for (let i = 0; i < rowCount; i++) {
		for (let j = 0; j < colCount; j++) {
			getNeighbors(gridArray[i][j]);
		}
	}
}
// get neighbors
const getNeighbors = currentCell => {
	const rowLimit = rowCount - 1;
	const colLimit = colCount - 1;

	let currentRow = currentCell.row;
	let currentCol = currentCell.col;
	// reset neighbors
	currentCell.neighbors = [];
	// loop through neigbors and add to each individual current cell 
	// minimum index is always 0. Maximum index is always each respective limit
	for(let i = Math.max(0, currentRow - 1); i <= Math.min(currentRow + 1, rowLimit); i++) {
		for(let j = Math.max(0, currentCol - 1); j <= Math.min(currentCol + 1, colLimit); j++) {
			if(i !== currentRow || j !== currentCol) {
				currentCell.neighbors.push(gridArray[i][j]);
			}
		}
	}
}

// 
const resetGrid = () => {
	for (let i = 0; i < rowCount; i++) {
		for (let j = 0; j < colCount; j++) {
			gridArray[i][j].reset();
		}
	}
}

// function to export the variable colcount
const exportColCount = () => {
	return colCount;
}

export { 
	cellDimension, 
	gridArray, 
	totalPath, 
	setup,
	resetGrid,
	exportColCount
};