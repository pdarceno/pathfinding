'use strict';
import { context } from './elements.js';
import { cellDimension } from './constants.js';

class Cell {
	constructor (row, col) {
		// save current index (row, col) to know where in the canvas it is
		this.row = row;
		this.col = col;
		// check if is path
		// this.isPath = true;
		// // check if is start
		// this.isStart = false;
		// // check if is end
		// this.isEnd = false;
		// check if is an obstacle
		this.isWall = false;
		// the weight of the Cell for weighted pathfinding
		this.weight = 0;
		// For Cell n, n.gScore is the cost of the cheapest path from start to n currently known.
		this.gScore = Infinity; 
		/* For Cell n, n.cameFrom is the Cell immediately preceding it on the cheapest path from start
		 to n currently known. */
		this.fScore = Infinity;
		// heuristic can be a computed value since it is just the distance to end Cell, so it does not need to be saved.
		this.cameFrom = null;
		this.neighbors = new Array();

		this.show = color => {
			const border_offset = context.lineWidth;
			context.beginPath();
			context.rect(
				(this.row * cellDimension) + border_offset, 
				(this.col * cellDimension) + border_offset, 
				cellDimension - border_offset, 
				cellDimension - border_offset
				);
			context.fillStyle = color;
			context.fill();
			// remember we're on, so we can be redrawn on resize
			this.color = color;
		}


	}
}

//start and finish
let startCell = new Cell();
let endCell = new Cell();

export { 
	startCell, 
	endCell, 
	Cell 
};