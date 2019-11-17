import Slider from './Slider';

const imgSrc = require('../img/sculpture.jpg');
/* const ctx = canvas.getContext('2d'); */
/* import url from '../img/sculpture.png'; */

export default class Canvas {
  canvasNode;

  ctx;

  canvasWrapper;

  constructor() {
    this.init();
  }


  init() {
    /* const image = new Image();
    image.src = 'img/sculpture.png'; */
    this.canvasWrapper = document.querySelector('.canvas_wrapper');
    const inputRange = new Slider(this.canvasWrapper);
    this.canvasNode = this.canvasWrapper.querySelector('.canvas');
    this.ctx = this.canvasNode.getContext('2d');
    const image = new Image();
    image.src = imgSrc;

    image.onload = () => {
      [inputRange.sliderOut.innerHTML,
        this.canvasNode.width,
        this.canvasNode.height] = new Array(3).fill(
        inputRange.currentSize,
      );
      this.ctx.drawImage(
        image, 0, 0, this.canvasNode.width, this.canvasNode.height,
      );
    };

    inputRange.slider.addEventListener('input', () => {
      [inputRange.sliderOut.innerHTML,
        this.canvasNode.width,
        this.canvasNode.height] = new Array(3).fill(
        inputRange.currentSize,
      );
      this.ctx.drawImage(
        image, 0, 0, this.canvasNode.width, this.canvasNode.height,
      );
    });


    /*     this.canvasNode.width = 512;
    this.canvasNode.height = 512; */


    console.log(`Slider Object = ${this.inputRange}`);
    /*     Canvas.load('../img/sculpture.png');
    this.draw(image, 512, 512); */


    /*  const switchPanel = this.dom.window.document
     .querySelector('.switch_panel');

      switchPanel
     .querySelector('.switch4x4')
     .addEventListener('change', this.onChange4x4);
   switchPanel
     .querySelector('.switch32x32')
     .addEventListener('change', this.onChange32x32);
   switchPanel.querySelector('.switch32x32')
     .dispatchEvent(new this.dom.window.Event('change')); */
  }

  static async load(src) {
    let data = null;
    try {
      data = await fetch(src);
      console.log(`Resource ${data}`);
    } catch (error) {
      console.log(`Can't load resource ${error}`);
    }
    return data;
  }

  /*   draw(image, width, height, x = 0, y = 0) {
    this.ctx.drawImage(image, x, y, width, height);
  } */
/*
  static draw(image, width, height, x = 0, y = 0) {
    this.ctx.drawImage(image, x, y, width, height);
  }

  static onChange4x4 = () => {
    const flattenedRGBAValues = canvas4x4
      .reduce(this.canvas)
      .map(this.hexToRGBA)
      .reduce(this.canvas);
    [this.canvas.width, this.canvas.height] = [4, 4];
    const imgData = new this.dom.window.ImageData(
      Uint8ClampedArray.from(flattenedRGBAValues),
      4,
      4,
    );
    this.ctx.putImageData(imgData, 0, 0);
  };

  static onChange32x32 = () => {
    const flattenedRGBAValues = canvas32x32
      .reduce(this.canvas).reduce(this.canvas);
    [this.canvas.width, this.canvas.height] = [32, 32];
    const imgData = new this.dom.window.ImageData(
      Uint8ClampedArray.from(flattenedRGBAValues),
      32,
      32,
    );
    this.ctx.putImageData(imgData, 0, 0);
  }; */
}
