class TextAssetsScroll extends HTMLElement {
  constructor() {
    super();
    this.parallaxElements = [];
    this.scrollHandler = this.handleScroll.bind(this);
    this.mediaQuery = window.matchMedia('(min-width: 1180px)');
    this.isDesktop = this.mediaQuery.matches;
  }

  connectedCallback() {
    this.initParallax();
    window.addEventListener('scroll', this.scrollHandler);
    this.mediaQuery.addEventListener('change', this.handleMediaQueryChange.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.scrollHandler);
    this.mediaQuery.removeEventListener('change', this.handleMediaQueryChange.bind(this));
  }

  handleMediaQueryChange(e) {
    this.isDesktop = e.matches;
    if (!this.isDesktop) {
      this.parallaxElements.forEach(item => {
        item.element.style.transform = 'none';
      });
    }
  }

  initParallax() {
    this.parallaxElements = Array.from(this.querySelectorAll('[data-parallax]')).map(element => {
      const speed = element.dataset.parallaxSpeed * 0.5 || 0.1; // Default speed if not specified
      const rect = element.getBoundingClientRect();
      const startPosition = rect.top + window.scrollY;
      
      return {
        element,
        speed: parseFloat(speed),
        startPosition
      };
    });
  }

  handleScroll() {
    if (!this.isDesktop) return;
    
    const scrollPosition = window.scrollY;
    
    this.parallaxElements.forEach(item => {
      const { element, speed, startPosition } = item;
      const distance = scrollPosition - startPosition;
      const translateY = distance * speed;
      
      element.style.transform = `translateY(${translateY}px)`;
    });
  }
}

customElements.define('text-assets-scroll', TextAssetsScroll);