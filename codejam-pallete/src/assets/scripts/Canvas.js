import Slider from './Slider';

const imgSrc = require('../img/sculpture.jpg');

export default class Canvas {
  canvasNode;

  ctx;

  canvasWrapper;

  constructor() {
    this.init();
  }

  init() {
    this.canvasWrapper = document.querySelector('.canvas_wrapper');
    const inputRange = new Slider(this.canvasWrapper);
    this.canvasNode = this.canvasWrapper.querySelector('.canvas');
    this.ctx = this.canvasNode.getContext('2d');
    let img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      [inputRange.sliderOut.innerHTML,
        this.canvasNode.width,
        this.canvasNode.height] = new Array(3).fill(
        inputRange.currentSize,
      );
      this.ctx.drawImage(
        img, 0, 0, this.canvasNode.width, this.canvasNode.height,
      );
    };

    inputRange.slider.addEventListener('input', () => {
      [inputRange.sliderOut.innerHTML,
        this.canvasNode.width,
        this.canvasNode.height] = new Array(3).fill(
        inputRange.currentSize,
      );
      const hRatio = this.canvasNode.width / img.width;
      const vRatio = this.canvasNode.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerShiftX = (this.canvasNode.width - img.width * ratio) / 2;
      const centerShiftY = (this.canvasNode.height - img.height * ratio) / 2;
      this.ctx.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height);
      this.ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
    });

    const loadBtn = this.canvasWrapper.querySelector('.search_button');
    const loadInput = this.canvasWrapper.querySelector('.search_input');

    loadBtn.addEventListener('click', () => {
      const c = loadInput.value;
      const url = `https://api.unsplash.com/photos/random?query=town,${c}&client_id=5322c6ca0f80d3f03cbd1dea2a8dd23307ce22738a901a33187d6288662a9aee`;
      Canvas.load(url)
        .then((res) => res.json())
        .then((data) => {
          this.ctx.clearRect(0, 0, this.canvasNode.w, this.canvasNode.h);
          img = new Image();
          img.onload = () => {
            const hRatio = this.canvasNode.width / img.width;
            const vRatio = this.canvasNode.height / img.height;
            const ratio = Math.min(hRatio, vRatio);
            const centerShiftX = (this.canvasNode.width - img.width * ratio) / 2;
            const centerShiftY = (this.canvasNode.height - img.height * ratio) / 2;
            this.ctx.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height);
            this.ctx.drawImage(img, 0, 0, img.width, img.height,
              centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
          };
          img.crossOrigin = 'Anonymous';
          img.src = data.urls.small;
        });
    });
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
}
