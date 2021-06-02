'use strict';

const menu = document.querySelector('.menu');
const startButton = document.querySelector('.start-button');
const endButton = document.querySelector('.end-button');
const wallButton = document.querySelector('.wall-button');
const eraseWallButton = document.querySelector('.erase-walls-button');
const eraseAllWallsButton = document.querySelector('.erase-all-walls-button');
const eraseAllButton = document.querySelector('.erase-all-button');
const calculateButton = document.querySelector('.calculate-button');

// the canvas
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

export { menu, startButton, endButton, wallButton, eraseWallButton, eraseAllWallsButton, eraseAllButton, calculateButton, canvas, context };