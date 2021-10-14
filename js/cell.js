'use strict';
import { context } from './elements.js';
import { cellDimension, borderOffset, backgroundColor } from './constants.js';

class Cell {
	constructor (row, col) {
		// save current index (row, col) to know where in the canvas it is
		this.row = row;
		this.col = col;
		// if a start or end node
		this.start = false;
		this.end = false;
		// // for building a maze
		// this.checkedLeft = false;
		// this.checkedTop = false;
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
			context.beginPath();
			context.rect(
				(this.row * cellDimension) + borderOffset, 
				(this.col * cellDimension) + borderOffset, 
				cellDimension - borderOffset, 
				cellDimension - borderOffset
				);
			context.fillStyle = color;
			context.fill();
			// remember we're on, so we can be redrawn on resize
			this.color = color;
		}
	}

	reset = () => {
		this.checkedLeft = false;
		this.checkedTop = false;
		this.isWall = false;
		this.weight = 0;
		(!this.start || !this.end) && this.show(backgroundColor);
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