'use strict';
import * as Element from './elements.js';

const canvasContainer = Element.canvasContainer;
const canvas = Element.canvas;
const context = Element.context;

/*COLORS*/
const wallColor = '#000';
const gridLineColor = '#fff';
const backgroundColor = '#ddd';
const startColor = '#0db';
const endColor = '#f55';
const openSetColor = '#1ff';
const closedSetColor = '#db9';
const pathColor = '#f81';

/*CELL DESCS*/
const start = 'start';
const wall = 'wall';
const end = 'end';
const walls = 'walls';
const path = 'path';
const paths = 'paths';
const open = 'open';
const closed = 'closed';

// get the size of the container measured by CSS
// remove 1 lineWidth for outer strokes
canvas.width = canvasContainer.offsetWidth - context.lineWidth;
canvas.height = canvasContainer.offsetHeight - context.lineWidth;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
// fixed
const rowCount = 80;
// cellDimension must be an integer
const cellDimension = Math.floor(canvasWidth / rowCount);

export { 
	wallColor,
	gridLineColor,
	backgroundColor,
	startColor,
	endColor,
	openSetColor,
	closedSetColor,
	pathColor,
	start,
	wall,
	end,
	walls,
	path,
	paths,
	open,
	closed,
	canvasWidth, 
	canvasHeight, 
	rowCount, 
	cellDimension
};