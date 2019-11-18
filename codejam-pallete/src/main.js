import './assets/stylesheets/main.scss';
import './assets/img/favicon.ico';
import Canvas from './assets/scripts/Canvas';

/* require('./index.html'); */

/* import template from './index.html'; */

// const template = require('html-loader!./index.html');


const canvas = new Canvas();
console.log(`canvas Object = ${canvas}`);
// canvas.loadCityImage('London');

// svg sprite

/* function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context('./assets/icons', true, /\.svg$/)); */
