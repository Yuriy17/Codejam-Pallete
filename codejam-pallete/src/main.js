import './assets/stylesheets/main.scss';
import Canvas from './assets/scripts/Canvas';
/* import template from './index.html'; */

// const template = require('html-loader!./index.html');

const canvasHTML = document.getElementById('canvas');
console.log(`aaaaaaaaaaa${canvasHTML}`);
const sizes = [128, 256, 512];
const canvas = new Canvas(canvasHTML, sizes);
canvas.loadCityImage('London');
