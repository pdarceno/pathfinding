'use strict';
import * as Constant from '../constants.js';
import * as Util from '../utils.js';
import * as Setup from '../setup.js';
import { timeLabel } from '../elements.js';

/*========================================= CONSTANT =========================================*/
const closedSetColor = Constant.closedSetColor;
const pathColor = Constant.pathColor;
const openSetColor = Constant.openSetColor;
const rowCount = Constant.rowCount;
const open = Constant.open;
const closed = Constant.closed;
const path = Constant.path;
const paths = Constant.paths;
/*========================================= CONSTANT =========================================*/
/*========================================= CELL =========================================*/
const startCell = Util.exportStartCell;
const endCell = Util.exportEndCell;
const erase = Util.erase;
/*========================================= CELL =========================================*/

/*========================================= SETUP =========================================*/
const colCount = Setup.exportColCount;
const gridArray = Setup.gridArray;
let totalPath = Setup.totalPath;
/*========================================= SETUP =========================================*/

/*========================================= START OF A STAR ALGORITHM =========================================*/

function reconstructPath(cell, end = false) {
	const origin = cell.cameFrom;
	// include cell if end
	end && totalPath.push(cell);
	if (origin) {
		totalPath.push(origin);
		return reconstructPath(origin);
	}

	// reconstruct path backwards
	totalPath.forEach((currentCell, i) => {
		setTimeout(() => {
			color(path, currentCell);
		}, 50 * (totalPath.length - i));
	});
}


const startAStarAlgorithm = () => {
	// check time

	if (!startCell() && !endCell()) {
		return;
	}
	
	// counter timer multiplier
	let counter = 0;

	// reset path array
	totalPath = [];
	erase(paths);
	// openSet are all the list of cells that are to be checked
	let openSet = new Array();
	// closedSet are all the list of cells that passed
	let closedSet = new Array();
	/* For cell n, cameFrom[n] is the cell immediately preceding it on the cheapest path from start
	to n currently known. */
	let cameFrom = new Array();
	// Initially, only the start cell is known.
	openSet.push(startCell()); 
	// startcell gscore is 0
	startCell().gScore = 0;
	// while openSet is not empty
	const start = performance.now();
	while(openSet.length > 0) {
		let currentCell = openSet[0];
		// make a heap sort for O(1)
		for(let i = 0; i < openSet.length; i++) {
			if(openSet[i].fScore < currentCell.fScore) {
				currentCell = openSet[i];
			}
		}

		//done
		if(currentCell === endCell()) {
			timeLabel.innerHTML = `time: ${performance.now() - start} ms`;
			return reconstructPath(endCell(), true);
		}
		// remove currentCell to the openSet
		openSet.splice(openSet.indexOf(currentCell), 1);
		closedSet.push(currentCell);

		//color the cell once pushed into the array
		setTimeout(() => {
			color(closed, currentCell);
		}, 1 * counter);

		// //check cell's neighbors
		for (let i = 0; i < currentCell.neighbors.length; i++) {
			// retrieve the neigbor with lowest f value
			let neighbor = currentCell.neighbors[i];

			if (closedSet.includes(neighbor) || neighbor.isWall) {
				// Ignore the neighbor which is already evaluated or a wall.
				continue;
			}
			// tentativeG is the distance from start to the neighbor through current
			let tentativeG = currentCell.gScore + calculateDistance(currentCell, neighbor);
			
			// add neighbor to openSet if not already present
			if (openSet.includes(neighbor)) {

				if (tentativeG < neighbor.gScore) {
					// This path to neighbor is better than any previous one. Record it!
					neighbor.cameFrom = currentCell;
					neighbor.gScore = tentativeG;
				}
				 // This is not a better path
				continue;
			}

			// neighbor not in set
			neighbor.cameFrom = currentCell;
			neighbor.gScore = tentativeG;
			// push into the openSet array if not included
			openSet.push(neighbor);
			//color the cell once pushed into the array
			setTimeout(() => {
				color(open, neighbor);
			}, 1 * counter);

			neighbor.fScore = neighbor.gScore + calculateHScore(neighbor);
		}
	}

	console.log('failure');
}

// color functions
const color = (which, cell) => {
	switch (which) {
		case open:
			cell.show(openSetColor);
			return;
		
		case closed:
			cell.show(closedSetColor);
			return;
		
		case path:
			cell.show(pathColor);
			return;

		default:
			return;
	}
}

const calculateHScore = cell => {
	let distance = Math.sqrt(Math.pow((cell.row - endCell().row), 2) + Math.pow((cell.col - endCell().col), 2));
	return distance;
}

const calculateDistance = (current, neighbor) => {
	let distance = Math.sqrt(Math.pow((current.row - neighbor.row), 2) + Math.pow((current.col - neighbor.col), 2));
	return distance;
}
/*========================================= END OF A STAR ALGORITHM =========================================*/

export { startAStarAlgorithm };