const jsdom = require('jsdom');

const { JSDOM } = jsdom;

class Canvas {
  static async initial() {
    this.dom = await JSDOM.fromFile('../../index.html', {
      resources: 'usable',
      runScripts: 'dangerously',
    });

    const switchPanel = this.dom.window.document
      .querySelector('.switch_panel');

    switchPanel
      .querySelector('.switch4x4')
      .addEventListener('change', this.onChange4x4);
    switchPanel
      .querySelector('.switch32x32')
      .addEventListener('change', this.onChange32x32);
    switchPanel.querySelector('.switch4x4')
      .dispatchEvent(new this.dom.window.Event('change'));
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
  };
}

export default Canvas;
