/* const ctx = canvas.getContext('2d'); */

export default class Canvas {
  /* static dom;

  static canvas;

  static ctx;

  constructor(template, sizes) {

  }

  static init() {
    this.dom = this.load('../../index.html');

    const image = this.load('../img/pony.png');

    console.log('Dom !!!!!!!: \n ${this.dom}');

    this.canvas = this.dom.window.document.getElementById('canvas');

    this.ctx = this.canvas.getContext('2d');

    this.draw(image, 32, 32);


    const switchPanel = this.dom.window.document
      .querySelector('.switch_panel');

    switchPanel
      .querySelector('.switch4x4')
      .addEventListener('change', this.onChange4x4);
    switchPanel
      .querySelector('.switch32x32')
      .addEventListener('change', this.onChange32x32);
    switchPanel.querySelector('.switch32x32')
      .dispatchEvent(new this.dom.window.Event('change'));
  }

  static async load(src) {
    let data = null;

    try {
      data = await fetch(src);
    } catch (error) {
      console.log(`Can't load resource ${error}`);
    }
    return data;
  }

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
