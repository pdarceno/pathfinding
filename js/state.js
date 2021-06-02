'use strict';
import { context } from './elements.js';
import * as Constant from './constants.js';

const cellDimension = Constant.cellDimension;

class State {
	constructor (row, col) {
		// save current index (row, col) to know where in the canvas it is
		this.row = row;
		this.col = col;
		// check if is a path
		this.isPath = false;
		// check if is an obstacle
		this.isWall = false;
		// the weight of the State for weighted pathfinding
		this.weight = 0;
		// For State n, n.gScore is the cost of the cheapest path from start to n currently known.
		this.gScore = Infinity; 
		/* For State n, n.cameFrom is the State immediately preceding it on the cheapest path from start
		 to n currently known. */
		this.fScore = Infinity;
		// heuristic can be a computed value since it is just the distance to end State, so it does not need to be saved.
		this.cameFrom = null;
		this.neighbors = new Array();

		this.show = color => {
			context.beginPath();
			context.rect((this.row * cellDimension) + 1, (this.col * 20) + 1, cellDimension - 2, cellDimension - 2);
			context.fillStyle = color;
			context.fill();
		}
	}
}

//start and finish
let startState = new State();
let endState = new State();

export { startState, endState, State };