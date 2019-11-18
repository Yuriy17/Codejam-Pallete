export default class Slider {
    slider;

    sliderOut;

    currentSize;

    values = [16, 32, 64, 128, 256, 512];

    constructor(canvasWrapper) {
      this.canvasWrapper = canvasWrapper;
      this.init();
    }

    init() {
      this.slider = this.canvasWrapper.querySelector('.range_slider');
      this.currentSize = this.values[this.slider.value - 1];
      this.slider.addEventListener('input', () => {
        this.currentSize = this.values[this.slider.value - 1];
      });
      this.sliderOut = this.canvasWrapper
        .querySelector('.range_slider_output span');
    }
}
