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
      console.log(`Canvas slider = ${this.slider}`);
      this.currentSize = this.values[this.slider.value - 1];
      this.slider.addEventListener('input', () => {
        this.currentSize = this.values[this.slider.value - 1];
      });
      this.sliderOut = this.canvasWrapper
        .querySelector('.range_slider_output span');
      /*       this.onChangeInput();
      console.log(`Canvas slider = ${this.slider}`);
      this.slider.addEventListener('input', this.onChangeInput); */

      /*       this.slider.oninput = () => {
        [this.sliderOut.innerHTML,
          this.canvasNode.width,
          this.canvasNode.height] = new Array(3).fill(
          this.values[this.slider.value - 1],
        );
        console.log(`Canvas width = ${this.canvasNode.width}`);
        // console.log(`Slider value = ${this.values[this.slider.value - 1]}`);
      }; */
    }

/*     onChangeInput() {
      [this.sliderOut.innerHTML,
        this.canvasNode.width,
        this.canvasNode.height] = new Array(3).fill(
        this.values[this.slider.value - 1],
      );
      console.log(`Canvas width = ${this.canvasNode.width}`);
      // console.log(`Slider value = ${this.values[this.slider.value - 1]}`);
    } */
}
