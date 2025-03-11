class PopUp extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector('dialog');
    this.closeBtn = this.querySelector('[data-close-btn]');
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', this.hide);
    }
    this.dialog.addEventListener('close', this.hide);
    this.simpleCarousels = [...this.querySelectorAll('simple-carousel')];
  }

  show = () => {
    document.documentElement.style.scrollBehavior = 'auto';
    this.scrollPosition = window.scrollY;
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.position = 'fixed';
    this.dialog.showModal();
    this.closeBtn.focus();
    this.dialog.classList.add('visible');
    
    if (this.simpleCarousels.length) {
      this.simpleCarousels.forEach((carousel) => {
        carousel.init();
      });
    }
  }

  hide = () => {
    this.dialog.classList.remove('visible');
    document.body.style.position = '';
    document.body.style.top = '';
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, this.scrollPosition);
    document.documentElement.style.scrollBehavior = 'smooth';

    setTimeout(() => {
      this.dialog.close();
    }, 300);
  }
}

customElements.define('pop-up', PopUp);