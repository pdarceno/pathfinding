'use strict';
import * as _Cell from './cell.js';
import * as Element from './elements.js';
import * as Constant from './constants.js';

const Cell = _Cell.Cell;

const canvasWidth = Constant.canvasWidth;
const canvasHeight = Constant.canvasHeight;
const cellDimension = Constant.cellDimension;
const rowCount = Constant.rowCount;

const canvas = Element.canvas;
const context = Element.context;

// the counter
// this will depend on the screen size
let colCount = 0;

let gridArray = new Array(rowCount);
// array of the path Cells
let totalPath = new Array();

// setup all the neccessities
const setup = () => {
	context.beginPath();
	context.fillStyle = '#ddd';
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	for (let i = 0; i < canvasWidth; i+=cellDimension) {
		// vertical line
		context.moveTo(i, 0);
		context.lineTo(i, canvasHeight);

		context.strokeStyle = 'white';
		context.stroke();
	}

	context.closePath();

	context.beginPath();
	context.fillStyle = '#ddd';
	for (let i = 0; i < canvasHeight; i+=cellDimension) {
		// count the columns drawn
		colCount++;
		// horizontal line
		context.moveTo(0, i);
		context.lineTo(canvasWidth, i);

		context.strokeStyle = 'white';
		context.stroke();
	}

	// setup Cells
	for (let i = 0; i < rowCount; i++) {
		gridArray[i] = new Array(colCount);
		for (let j = 0; j < colCount; j++) {
			gridArray[i][j] = new Cell(i, j);
		}
	}

	context.closePath();
}

// function to export the variable colcount
const exportColCount = () => {
	return colCount;
}

export { exportColCount, cellDimension, gridArray, totalPath, setup };