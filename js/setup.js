'use strict';
import * as _Cell from './cell.js';
import { canvas, context } from './elements.js';
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
	// now we know the size of our grid,
	// our canvas will be one lineWidth bigger to show the outer strokes
	const strokeOffset = context.lineWidth / 2;

	for (let i = 0; i <= gridWidth + context.lineWidth; i += cellDimension) {
		// horizontal divider
		context.moveTo(strokeOffset, i + strokeOffset);
		context.lineTo(gridWidth + strokeOffset, i + strokeOffset);
	}

	for (let i = 0; i <= canvasHeight; i += cellDimension) {
		colCount++;
		// vertical divider
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
// logs 0
const setupGrid = () => {
	for (let i = 0; i < rowCount; i++) {
		gridArray[i] = new Array(colCount);
		for (let j = 0; j < colCount; j++) {
			gridArray[i][j] = new Cell(i, j);
		}
	}
}

// const setup = () => {
// 	context.beginPath();
// 	context.fillStyle = backgroundColor;
// 	context.fillRect(0, 0, canvasWidth, canvasHeight);
// 	for (let i = 0; i < canvasWidth; i+=cellDimension) {
// 		// vertical line
// 		context.moveTo(i, 0);
// 		context.lineTo(i, canvasHeight);

// 		context.strokeStyle = gridLineColor;
// 		context.stroke();
// 	}

// 	context.closePath();

// 	context.beginPath();
// 	context.fillStyle = backgroundColor;
// 	for (let i = 0; i < canvasHeight; i+=cellDimension) {
// 		// count the columns drawn
// 		colCount++;
// 		// horizontal line
// 		context.moveTo(0, i);
// 		context.lineTo(canvasWidth, i);

// 		context.strokeStyle = gridLineColor;
// 		context.stroke();
// 	}

// 	context.closePath();

// 	// setup Cells
// 	for (let i = 0; i < rowCount; i++) {
// 		gridArray[i] = new Array(colCount);
// 		for (let j = 0; j < colCount; j++) {
// 			gridArray[i][j] = new Cell(i, j);
// 		}
// 	}
// }

// function to export the variable colcount
const exportColCount = () => {
	return colCount;
}

export { 
	exportColCount, 
	cellDimension, 
	gridArray, 
	totalPath, 
	setup 
};