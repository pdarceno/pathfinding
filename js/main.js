'use strict';
import * as Element from './elements.js';
import * as Setup from './setup.js';
import * as Util from './utils.js';
import * as AStar from './pathfinding/aStar.js';

/*========================================= ELEMENTS =========================================*/
const menu = Element.menu;
const startButton = Element.startButton;
const endButton = Element.endButton;
const wallButton = Element.wallButton;
const eraseWallButton = Element.eraseWallButton;
const eraseAllWallsButton = Element.eraseAllWallsButton;
const eraseAllButton = Element.eraseAllButton;
const calculateButton = Element.calculateButton;

const canvas = Element.canvas;
const context = Element.context;
/*========================================= ELEMENTS =========================================*/
/*========================================= SETUP =========================================*/
const rowCount = Setup.rowCount;
const colCount = Setup.exportColCount;
const cellDimension = Setup.cellDimension;
const gridArray = Setup.gridArray;
let totalPath = Setup.totalPath;
const setup = Setup.setup;
/*========================================= UTILS =========================================*/
// { disableButtons, place, erase, eraseWall, getMousePosition }
const disableButtons = Util.disableButtons;
const place = Util.place;
const erase = Util.erase;
const eraseWall = Util.eraseWall;
const getMousePosition = Util.getMousePosition;
/*========================================= UTILS =========================================*/

/*========================================= SETUP =========================================*/
/*========================================= A-STAR =========================================*/
const startAStarAlgorithm = AStar.startAStarAlgorithm;
/*========================================= A-STAR =========================================*/
window.addEventListener('load', () => {
	// setup the canvas
	setup();

	// setup the menu
	menu.addEventListener('click', event => {
		if (event.target.classList.contains('buttons')) {
			const buttonSelected = event.target.closest('.buttons');
			
			disableButtons(buttonSelected);
			buttonSelected.classList.toggle('active');

			buttonSelected.classList.contains('erase-all-walls-button') && erase('walls');
			buttonSelected.classList.contains('erase-all-button') && erase('all');
			buttonSelected.classList.contains('calculate-button') && startAStarAlgorithm();
		}
	});

	let mouseDown = false;

	canvas.addEventListener('mousedown', event => {
		startButton.classList.contains('active') && place('start', getMousePosition(event));
		endButton.classList.contains('active') && place('end', getMousePosition(event));
		wallButton.classList.contains('active') && place('wall', getMousePosition(event));
		eraseWallButton.classList.contains('active') && eraseWall(getMousePosition(event));
		eraseAllWallsButton.classList.contains('active') && erase('walls');
		eraseAllButton.classList.contains('active') && erase('all');
		mouseDown = true;
	});

	canvas.addEventListener('mousemove', event => {
		mouseDown && wallButton.classList.contains('active') && place('wall', getMousePosition(event));
		mouseDown && eraseWallButton.classList.contains('active') && eraseWall(getMousePosition(event));
	}); 

	canvas.addEventListener('mouseup', () => {
		mouseDown = false;
	}); 
});

