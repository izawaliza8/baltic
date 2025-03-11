class SimpleCarousel extends HTMLElement {
  constructor() {
    super();
    this.assets = [...this.querySelectorAll('[data-asset]')];

    if (this.assets.length < 2) {
      this.assets[0].style.opacity = 1;
      return;
    }

    this.current = 0;
    this.total = this.assets.length;
    this.interval = 3000;
    this.timer = null;
    this.zindex = 1;
    this.cycleCount = 0;

    this.counterDisplay = document.createElement('div');
    this.counterDisplay.style.position = 'absolute';
    this.counterDisplay.style.color = 'var(--white)';
    this.counterDisplay.style.mixBlendMode = 'difference';
    this.counterDisplay.style.zIndex = '1000';
    this.counterDisplay.style.whiteSpace = 'nowrap';
    this.counterDisplay.style.opacity = 0;
    this.counterDisplay.classList.add('fs-16');
    this.counterDisplay.classList.add('simple-carousel-counter');
    this.counterDisplay.style.pointerEvents = 'none';
    this.updateCounterDisplay();
    this.appendChild(this.counterDisplay);

    this.addEventListener('mousemove', this.updateCounterPosition);
    this.addEventListener('mouseenter', this.showCounter);
    this.addEventListener('mouseleave', this.hideCounter);

    this.style.cursor = 'none';

    this.dialog = this.closest('dialog');
    if (this.dialog) {
      this.dialog.addEventListener('close', () => {
        this.stop();
        this.assets.forEach((asset) => {
          if (asset.tagName.toLowerCase() === 'video') {
            asset.pause();
            asset.currentTime = 0;
          }
          asset.style.opacity = 0;
        });
      });
    } else {
      this.init();
    }

  }

  updateCounterDisplay = () => {
    this.counterDisplay.textContent = `Next ${this.current + 1} / ${this.total}`;
  };

  updateCounterPosition = (event) => {
    const rect = this.getBoundingClientRect();
    this.counterDisplay.style.top = `${event.clientY - rect.top}px`;
    this.counterDisplay.style.left = `${event.clientX - rect.left}px`;
  };

  showCounter = () => {
    this.counterDisplay.style.opacity = 1;
  };

  hideCounter = () => {
    this.counterDisplay.style.opacity = 0;
  };

  init = () => {
    const initializeAssets = () => {
      this.assets.forEach((asset, index) => {
        asset.style.position = index === 0 ? 'relative' : 'absolute';
        asset.style.opacity = index === 0 ? 1 : 0;
        asset.style.transition = 'opacity .45s var(--easing)';
        asset.style.height = this.assets[0].offsetHeight + 'px';
        asset.style.width = this.assets[0].offsetWidth + 'px';
        asset.addEventListener('click', this.next);
      });
    };

    if (this.assets[0].tagName.toLowerCase() === 'video') {
      this.assets[0].addEventListener('loadedmetadata', () => {
        this.assets[0].play();
        initializeAssets();
        this.assets[0].addEventListener('ended', this.next);
      });
    } else {
      const img = this.assets[0];
      if (img.complete) {
        initializeAssets();
        this.start();
      } else {
        img.addEventListener('load', initializeAssets);
        this.start();
      }
    }

    window.addEventListener('resize', () => {
      this.stop();
      this.current = 0;
      initializeAssets();
      this.start();
    });
  };

  start = () => {
    this.timer = setTimeout(this.next, this.interval);
  };

  stop = () => {
    clearTimeout(this.timer);
  };

  next = () => {
    if (this.assets[this.current].tagName.toLowerCase() === 'video') {
      this.assets[this.current].pause();
      this.assets[this.current].currentTime = 0;
    }
    this.assets[this.current].style.opacity = 0;
    this.current = (this.current + 1) % this.total;
    const nextAsset = this.assets[this.current];
    nextAsset.style.opacity = 1;
    nextAsset.style.zIndex = this.zindex;
    this.zindex++;
    this.stop();
    if (nextAsset.tagName.toLowerCase() === 'video') {
      nextAsset.addEventListener('ended', this.next);
      nextAsset.play();
    } else {
      this.start();
    }
    this.updateCounterDisplay();
  };
}

customElements.define('simple-carousel', SimpleCarousel);