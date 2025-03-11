class MenuCarousel extends HTMLElement {
  connectedCallback() {
    this.assets = [...this.querySelectorAll('[data-asset]')];

    this.menuIndex = parseInt(this.getAttribute('data-menu-index'))
    this.menuPanels = [...this.parentElement.querySelectorAll('[role=tabpanel]')];
    this.menuSections = [...this.menuPanels[this.menuIndex].querySelectorAll('[data-menu-section]')];

    if (this.assets.length < 2) {
      this.assets[0].style.opacity = 1;
      return;
    }

    this.current = 0;
    this.total = this.assets.length;
    this.interval = 3000;
    this.timer = null;
    this.zindex = 1;

    window.addEventListener('resize', this.handleResize);

    this.observer = new IntersectionObserver(this.handleIntersect, {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Observe a strip in the middle of the screen
      threshold: 0
    });

    this.assets.forEach(asset => {
      asset.style.transition = 'opacity 0.15s ease-in-out';
    });
  }

  handleResize = () => {
    if (!this.hidden) {
      this.refresh();
    }
  }

  handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = this.menuSections.indexOf(entry.target);
        this.assets.forEach((asset, assetIndex) => {
          asset.style.opacity = assetIndex === index ? 1 : 0;
        });
      }
    });
  };

  init = () => {
    const isDt = window.matchMedia('(min-width: 1180px)').matches;
    const initializeAssets = () => {
      this.assets.forEach((asset, index) => {
        asset.style.position = index === 0 ? 'relative' : 'absolute';
        asset.style.opacity = index === 0 ? 1 : 0;
        asset.style.height = this.assets[0].offsetHeight + 'px';
        asset.style.width = this.assets[0].offsetWidth + 'px';
      });
    };

    if (this.assets[0].tagName.toLowerCase() === 'video') {
      this.assets[0].addEventListener('loadedmetadata', () => {
        this.assets[0].play();
        initializeAssets();
        if (!isDt) {
          this.assets[0].addEventListener('ended', this.next);
        }
      });
    } else {
      const img = this.assets[0];
      if (img.complete) {
        initializeAssets();
        if (!isDt) {
          this.start();
        }
      } else {
        img.addEventListener('load', initializeAssets);
        if (!isDt) {
          this.start();
        }
      }
    }

    this.assets.forEach((asset) => {
      if (isDt) {
        asset.removeEventListener('click', this.next);
        this.menuSections.forEach(section => this.observer.observe(section));
      } else {
        asset.addEventListener('click', this.next);
        this.menuSections.forEach(section => this.observer.unobserve(section));
      }
    });
  };

  start = () => {
    this.timer = setTimeout(this.next, this.interval);
  };

  stop = () => {
    clearTimeout(this.timer);
  };

  refresh = () => {
    this.stop();
    this.current = 0;
    this.assets.forEach((asset) => {
      if (asset.tagName.toLowerCase() === 'video') {
        asset.pause();
        asset.currentTime = 0;
      }
      asset.style.opacity = 0;
      asset.style.height = undefined;
      asset.style.width = undefined;
    });
    this.init();
  }

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
  };
}

customElements.define('menu-carousel', MenuCarousel);