'use strict';

// button declaration
const menu = document.querySelector('.menu');
const startButton = document.querySelector('.start-button');
const endButton = document.querySelector('.end-button');
const wallButton = document.querySelector('.wall-button');
const eraseWallButton = document.querySelector('.erase-walls-button');
const eraseAllWallsButton = document.querySelector('.erase-all-walls-button');
const eraseAllButton = document.querySelector('.erase-all-button');
const calculateButton = document.querySelector('.calculate-button');
// the grid wrapper
const grid = document.querySelector('.grid');

const rowCount = 50;
const colCount = rowCount * 2;

let gridArray = new Array(rowCount);
//start and finish
let startNode = new Node();
let endNode = new Node();
// array of the path nodes
let totalPath = new Array();

// javascript 'class' implementation of Node
function Node(row, col, isWall) {
	this.row = row;
	this.col = col;
	this.isWall = isWall;
	// For node n, n.gScore is the cost of the cheapest path from start to n currently known.
	this.gScore = Infinity; 
	/* For node n, n.cameFrom is the node immediately preceding it on the cheapest path from start
	 to n currently known. */
	this.fScore = Infinity;
	this.cameFrom = null;
	this.neighbors = new Array();
}
/*========================================= START OF A STAR ALGORITHM =========================================*/
function reconstructPath(node) {
	const origin = node.cameFrom;
	if (origin) {
		totalPath.push(origin);
		return reconstructPath(origin);
	}

	totalPath.forEach(function(path){
		placePath(path.row, path.col);
	});
}

function startAStarAlgorithm() {
	totalPath = [];
	reset('nodes');
	// openSet are all the list of nodes that are passed
	let openSet = new Array();
	let closedSet = new Array();
	/* For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
	to n currently known. */
	let cameFrom = new Array();
	// Initially, only the start node is known.
	openSet.push(startNode);
	// startnode gscore is 0
	startNode.gScore = 0;

	// while openSet is not empty
	while(openSet.length > 0) {
		let currentNode = openSet[0];
		for(let i = 0; i < openSet.length; i++) {
			// console.log(`comparing openSet[${i}].fScore to currentFscore: ${openSet[i].fScore} ${currentNode.fScore}`);
			if(openSet[i].fScore < currentNode.fScore) {
				currentNode = openSet[i];
			}
		}

		//done
		// if(currentNode === endNode) {
		if (calculateHScore(currentNode) === 0) {
			console.log('currentNode');
			console.log(currentNode);
			console.log('endNode');
			console.log(endNode);
			return reconstructPath(currentNode);
		}
		// remove currentNode to the openSet
		openSet.splice(openSet.indexOf(currentNode), 1);
		closedSet.push(currentNode);
		// assign neighbors
		getNeighbors(currentNode);
		// console.log(`current node entering the neighbor check (${currentNode.row}, ${currentNode.col})`);
		// //check node's neighbors
		for (let i = 0; i < currentNode.neighbors.length; i++) {
			// retrieve the neigbor with lowest f value
			let neighbor = currentNode.neighbors[i];
			if (!closedSet.includes(neighbor)) {
				// tentativeG is the distance from start to the neighbor through current
				let tentativeG = currentNode.gScore + calculateDistance(currentNode, neighbor);
				
				// add neighbor to openSet if not already present
				if (openSet.includes(neighbor)) {
					// console.log(`comparing tentativeG to neigborG: ${tentativeG} ${neighbor.gScore}`);
					if (tentativeG < neighbor.gScore) {
						// This path to neighbor is better than any previous one. Record it!
						neighbor.cameFrom = currentNode;
						neighbor.gScore = tentativeG;
					}
				}

				else {
					neighbor.cameFrom = currentNode;
					neighbor.gScore = tentativeG;

					openSet.push(neighbor);
				}

				neighbor.fScore = neighbor.gScore + calculateHScore(neighbor);
			}
		}
	}

	console.log('FAIL');
}

function getNeighbors(currentNode) {
	const rowLimit = rowCount - 1;
	const columnLimit = colCount - 1;
	let currentRow = currentNode.row;
	let currentCol = currentNode.col;
	// reset neighbors
	currentNode.neighbors = [];
	// loop through neigbors and add to each individual current node 
	// minimum index is always 0. Maximum index is always each respective limit
	for(let i = Math.max(0, currentRow - 1); i <= Math.min(currentRow + 1, rowLimit); i++) {
		for(let j = Math.max(0, currentCol - 1); j <= Math.min(currentCol + 1, columnLimit); j++) {
			if(i !== currentRow || j !== currentCol) {
				currentNode.neighbors.push(gridArray[i][j]);
			}
		}
	}
}

function calculateHScore(node) {
	let distance = Math.sqrt(Math.pow((node.row - endNode.row), 2) + Math.pow((node.col - endNode.col), 2));
	return distance;
}

function calculateDistance(current, neighbor) {
	// let distance = Math.abs(current.col - current.row) + Math.abs(neighbor.col - neighbor.row);
	// return distance;
	let distance = Math.sqrt(Math.pow((current.row - neighbor.row), 2) + Math.pow((current.col - neighbor.col), 2));
	return distance;
}
/*========================================= END OF A STAR ALGORITHM =========================================*/

// call every time an algorithm is ran to reset all nodes
function makeRows(initialize = false) {
	grid.style.setProperty('--grid-rows', rowCount);
	grid.style.setProperty('--grid-cols', colCount);
	for (let i = 0; i < rowCount; i++) {
		gridArray[i] = new Array(colCount);
		for (let j = 0; j < colCount; j++) {
			gridArray[i][j] = new Node(i, j, false);
			if (initialize) {
				let cell = document.createElement('div');
				grid.appendChild(cell).className = `grid-item ${i} ${j}`;
			}
		}
	}
};

function disableButtons(exception) {
	document.querySelectorAll('.buttons').forEach(function(button){
		button !== exception && button.classList.remove('active');
	})
}

function reset(which) {
	switch (which) {
		case 'start':
			[...grid.children].forEach(function(child) {
				child.classList.remove('start');
			});
			return;
		
		case 'walls':
			[...grid.children].forEach(function(child) {
				child.classList.remove('wall');
			});

			gridArray.forEach(function(row, rowIndex) {
				row.forEach(function(col, colIndex) {
					gridArray[rowIndex][colIndex].isWall = false;
				});
			});
			return;
		
		case 'end':
			[...grid.children].forEach(function(child) {
				child.classList.remove('end');
			});
			return;
		
		case 'nodes':
			/*=================== RESET ===================*/
			console.clear();
			makeRows();
			/*=================== RESET ===================*/
			return;

		case 'all':
			reset('start');
			reset('walls');
			reset('end');
			/*=================== RESET ===================*/
			console.clear();
			makeRows(true);
			/*=================== RESET ===================*/
			return;
		default:
			return;
	}
}

function placeStart(gridItem) {
	if (gridItem) {
		reset('start');

		gridItem.classList.remove('wall');
		gridItem.classList.remove('end');
		gridItem.classList.toggle('start');

		const selectedRow =  gridItem.classList[1];
		const selectedCol = isNaN(gridItem.classList[2]) ? gridItem.classList[1] : gridItem.classList[2];

		startNode = gridArray[selectedRow][selectedCol];
	}
}

function placeEnd(gridItem) {
	if (gridItem) {
		reset('end');

		gridItem.classList.remove('start');
		gridItem.classList.remove('wall');
		gridItem.classList.toggle('end');

		const selectedRow =  gridItem.classList[1];
		const selectedCol = isNaN(gridItem.classList[2]) ? gridItem.classList[1] : gridItem.classList[2];

		endNode = gridArray[selectedRow][selectedCol];
	}
}

function placePath(row, col) {
	[...grid.children].forEach((gridItem) => {
		const selectedRow =  gridItem.classList[1];
		const selectedCol = isNaN(gridItem.classList[2]) ? gridItem.classList[1] : gridItem.classList[2];
		if (selectedRow == row && selectedCol == col) {
			gridItem.classList.add('path');
		}
	});
}


function placeWall(gridItem) {
	if (gridItem) {
		gridItem.classList.remove('start');
		gridItem.classList.remove('end');
		gridItem.classList.add('wall');

		const selectedRow =  gridItem.classList[1];
		const selectedCol = isNaN(gridItem.classList[2]) ? gridItem.classList[1] : gridItem.classList[2];

		gridArray[selectedRow][selectedCol].isWall = true;
	}
}

function eraseWall(gridItem) {
	if (gridItem) {
		gridItem.classList.contains('wall') && gridItem.classList.remove('wall');
		
		const selectedRow =  gridItem.classList[1];
		const selectedCol = isNaN(gridItem.classList[2]) ? gridItem.classList[1] : gridItem.classList[2];
		
		gridArray[selectedRow][selectedCol].isWall = false;
	}
}

window.addEventListener('load', function() {
	reset('all');
	menu.addEventListener('click', function(event) {
		if (event.target.classList.contains('buttons')) {
			const buttonSelected = event.target.closest('.buttons');
			
			disableButtons(buttonSelected);
			buttonSelected.classList.toggle('active');

			buttonSelected.classList.contains('erase-all-walls-button') && reset('walls');
			buttonSelected.classList.contains('erase-all-button') && reset('all');
			buttonSelected.classList.contains('calculate-button') && startAStarAlgorithm();
		}
	});

	let mouseDown = false;

	grid.addEventListener('mousedown', function(event) {
		startButton.classList.contains('active') && placeStart(event.target.closest('.grid-item'));
		endButton.classList.contains('active') && placeEnd(event.target.closest('.grid-item'));
		wallButton.classList.contains('active') && placeWall(event.target.closest('.grid-item'));
		eraseWallButton.classList.contains('active') && eraseWall(event.target.closest('.grid-item'));
		mouseDown = true;
	});

	grid.addEventListener('mousemove', function(event) {
		mouseDown && wallButton.classList.contains('active') && placeWall(event.target.closest('.grid-item'));
		mouseDown && eraseWallButton.classList.contains('active') && eraseWall(event.target.closest('.grid-item'));
	}); 

	grid.addEventListener('mouseup', function() {
		mouseDown = false;
	}); 
});

