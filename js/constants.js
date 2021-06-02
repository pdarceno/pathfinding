'use strict';
import { canvas } from './elements.js';

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// fixed
const rowCount = 80;
const cellDimension = canvas.width / rowCount;

export { rowCount, cellDimension};