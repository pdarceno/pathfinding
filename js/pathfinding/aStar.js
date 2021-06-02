'use strict';
import * as Util from '../utils.js';
import * as Setup from '../setup.js';
import { rowCount } from '../constants.js';
import { timeLabel } from '../elements.js';

/*========================================= NODE =========================================*/
const startState = Util.exportStartState;
const endState = Util.exportEndState;
const erase = Util.erase;
/*========================================= NODE =========================================*/

/*========================================= SETUP =========================================*/
const colCount = Setup.exportColCount;
const gridArray = Setup.gridArray;
let totalPath = Setup.totalPath;
/*========================================= SETUP =========================================*/

/*========================================= START OF A STAR ALGORITHM =========================================*/

function reconstructPath(state, end = false) {
	const origin = state.cameFrom;
	// include state if end
	end && totalPath.push(state);
	if (origin) {
		totalPath.push(origin);
		return reconstructPath(origin);
	}

	// reconstruct path backwards
	totalPath.forEach((currentState, i) => {
		setTimeout(() => {
			color('path', currentState);
		}, 50 * (totalPath.length - i));
	});
}


const startAStarAlgorithm = () => {
	// check time

	if (!startState() && !endState()) {
		return;
	}
	// reset path array
	totalPath = [];
	erase('paths');
	// openSet are all the list of states that are passed
	let openSet = new Array();
	let closedSet = new Array();
	/* For state n, cameFrom[n] is the state immediately preceding it on the cheapest path from start
	to n currently known. */
	let cameFrom = new Array();
	// Initially, only the start state is known.
	openSet.push(startState()); 
	// startstate gscore is 0
	startState().gScore = 0;
	// while openSet is not empty
	const start = performance.now();
	while(openSet.length > 0) {
		let currentState = openSet[0];

		// make a heap sort for O(1)
		for(let i = 0; i < openSet.length; i++) {
			if(openSet[i].fScore < currentState.fScore) {
				currentState = openSet[i];
			}
		}

		//done
		if(currentState === endState()) {
			timeLabel.innerHTML = `time: ${performance.now() - start} ms`;
			console.log('reconstruct path');
			return reconstructPath(endState(), true);
		}
		// remove currentState to the openSet
		openSet.splice(openSet.indexOf(currentState), 1);
		closedSet.push(currentState);

		//color the state once pushed into the array
		color('closed', currentState);
		// assign neighbors
		getNeighbors(currentState);

		// //check state's neighbors
		for (let i = 0; i < currentState.neighbors.length; i++) {
			// retrieve the neigbor with lowest f value
			let neighbor = currentState.neighbors[i];
			if (closedSet.includes(neighbor) || neighbor.isWall) {
				// Ignore the neighbor which is already evaluated or a wall.
				continue;
			}
			// tentativeG is the distance from start to the neighbor through current
			let tentativeG = currentState.gScore + calculateDistance(currentState, neighbor);
			
			// add neighbor to openSet if not already present
			if (openSet.includes(neighbor)) {

				if (tentativeG < neighbor.gScore) {
					// This path to neighbor is better than any previous one. Record it!
					neighbor.cameFrom = currentState;
					neighbor.gScore = tentativeG;
				}
				 // This is not a better path
				continue;
			}

			// neighbor not in set
			neighbor.cameFrom = currentState;
			neighbor.gScore = tentativeG;
			// push into the openSet array if not included
			openSet.push(neighbor);
			//color the state once pushed into the array
			color('open', neighbor);

			neighbor.fScore = neighbor.gScore + calculateHScore(neighbor);
		}
	}

	console.log('failure');
}

// color functions
const color = (which, state) => {
	switch (which) {
		case 'open':
			setTimeout(() => {
				state.show('blue');
			}, 0);
			return;
		
		case 'closed':
			setTimeout(() => {
				state.show('orange');
			}, 0);
			return;
		
		case 'path':
			setTimeout(() => {
				state.show('yellow');
			}, 0);
			return;

		default:
			return;
	}
}

const colorOpen = state => {
	setTimeout(() => {
		state.show('blue');
	}, 0);
}

const colorClosed = state => {
	setTimeout(() => {
		state.show('red');
	}, 0);
}

const getNeighbors = currentState => {
	const rowLimit = rowCount - 1;
	const colLimit = colCount() - 1;

	let currentRow = currentState.row;
	let currentCol = currentState.col;
	// reset neighbors
	currentState.neighbors = [];
	// loop through neigbors and add to each individual current state 
	// minimum index is always 0. Maximum index is always each respective limit
	for(let i = Math.max(0, currentRow - 1); i <= Math.min(currentRow + 1, rowLimit); i++) {
		for(let j = Math.max(0, currentCol - 1); j <= Math.min(currentCol + 1, colLimit); j++) {
			if(i !== currentRow || j !== currentCol) {
				currentState.neighbors.push(gridArray[i][j]);
			}
		}
	}
}

const calculateHScore = state => {
	let distance = Math.sqrt(Math.pow((state.row - endState().row), 2) + Math.pow((state.col - endState().col), 2));
	return distance;
}

const calculateDistance = (current, neighbor) => {
	let distance = Math.sqrt(Math.pow((current.row - neighbor.row), 2) + Math.pow((current.col - neighbor.col), 2));
	return distance;
}
/*========================================= END OF A STAR ALGORITHM =========================================*/

export { startAStarAlgorithm };