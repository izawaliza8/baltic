import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

class SplideSlider extends HTMLElement {
  constructor() {
    super();

    this.init()
  }

  init = () => {
    this.slider = new Splide(this)
    this.isAutoScroll = this.getAttribute('data-auto-scroll') == '1'
    this.counter = this.querySelector('[data-counter]')

    if (this.counter) {
      this.slider.on('mounted move', () => {
        this.counter.innerText = `${this.slider.index + 1} / ${this.slider.Components.Slides.getLength(true)}`
      })
    }

    if (this.isAutoScroll) {
      this.slider.mount({ AutoScroll });
    } else {
      this.slider.mount()
    }
  }
}
customElements.define('sp-lide', SplideSlider);