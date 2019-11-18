import Slider from './Slider';

const imgSrc = require('../img/sculpture.jpg');

export default class Canvas {
  canvasNode;

  ctx;

  imageData;

  canvasWrapper;

  constructor() {
    this.init();
  }

  init() {
    this.canvasWrapper = document.querySelector('.canvas_wrapper');
    const inputRange = new Slider(this.canvasWrapper);
    this.canvasNode = this.canvasWrapper.querySelector('.canvas');
    this.ctx = this.canvasNode.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
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
      this.imageData = this.ctx.getImageData(0, 0, img.width, img.height);
    };

    inputRange.slider.addEventListener('input', () => {
      [inputRange.sliderOut.innerHTML,
        this.canvasNode.width,
        this.canvasNode.height] = new Array(3).fill(
        inputRange.currentSize,
      );
      this.ratio(img, true);
    });

    const loadBtn = this.canvasWrapper.querySelector('.search_button');
    const loadInput = this.canvasWrapper.querySelector('.search_input');

    loadBtn.addEventListener('click', () => {
      const c = loadInput.value;
      const id = '5322c6ca0f80d3f03cbd1dea2a8dd23307ce22738a901a33187d6288662a9aee';
      const baseUrl = 'https://api.unsplash.com/photos/';
      const url = `${baseUrl}random?query=town,${c}&client_id=${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.ctx.clearRect(0, 0, this.canvasNode.w, this.canvasNode.h);
          img = new Image();
          img.onload = () => this.ratio(img, true);
          img.crossOrigin = 'Anonymous';
          img.src = data.urls.small;
          loadInput.placeholder = 'Random City';
        })
        .catch((error) => console.error(error));
    });

    const grayBtn = this.canvasWrapper.querySelector('.gray_scales');

    grayBtn.addEventListener('click', () => this.grayScale());
  }

  ratio(img, isShiftable) {
    const hRatio = this.canvasNode.width / img.width;
    const vRatio = this.canvasNode.height / img.height;
    const ratio = Math.min(hRatio, vRatio);
    this.ctx.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height);
    const centerShiftX = (this.canvasNode.width - img.width * ratio) / 2;
    const centerShiftY = (this.canvasNode.height - img.height * ratio) / 2;
    if (isShiftable) {
      this.ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
      this.imageData = this.ctx.getImageData(0, 0, this.canvasNode.width, this.canvasNode.height);
    } else {
      this.ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShiftX, centerShiftY, img.width, img.height);
    }
  }

  grayScale() {
    console.log(this.imageData.data);
    const d = this.imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      // CIE luminance for the RGB
      // The human eye is bad at seeing red and blue, so we de-emphasize them.
      const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      [d[i], d[i + 1], d[i + 2]] = new Array(3).fill(v);
    }
    createImageBitmap(this.imageData).then((imgBitmap) => {
      this.ratio(imgBitmap, false);
    });
    /* this.ctx.drawImage(this.imageData.data, 0, 0); */
    console.log(this.imageData.data);
  }

  drawLine(startX, startY, endX, endY) {
    let x0 = Math.floor(startX / this.canvasNode.width);
    let y0 = Math.floor(startY / this.canvasNode.height);
    const x1 = Math.floor(endX / this.canvasNode.width);
    const y1 = Math.floor(endY / this.canvasNode.height);
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    const condition = true;

    while (condition) {
      setPixel(x0, y0, canvas);

      if ((x0 === x1) && (y0 === y1)) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }

  setPixel(x, y, canvas) {
    const imgData = this.ctx.createImageData(1, 1);
    const colorArr = getRGBA(this.canvasNode.currentColor);
    [imgData.data[0], imgData.data[1], imgData.data[2], imgData.data[3]] = [...colorArr];
    const { data } = canvas.ctx.getImageData(x, y, 1, 1);
    if (data[3] <= imgData.data[3]) canvas.ctx.putImageData(imgData, x, y);
  }
}
