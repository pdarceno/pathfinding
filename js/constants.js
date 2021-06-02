'use strict';
import { canvas } from './elements.js';

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
// fixed
const rowCount = 80;
const cellDimension = canvasWidth / rowCount;

export { canvasWidth, canvasHeight, rowCount, cellDimension};