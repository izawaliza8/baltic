class HeaderEl extends HTMLElement {
  connectedCallback() {

    this.button = this.querySelector('[data-burger]');

    this.button.addEventListener('click', () => {
      this.classList.contains('active') ? this.close() : this.open();
    });

    this.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        this.close();
      }
    });

    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });

    this.addEventListener('focusout', (e) => {
      if (!this.contains(e.relatedTarget)) {
        this.close();
      }
    });

  }

  open = () => {
    this.classList.add('active');
    setTimeout(() => {
      this.scrollPosition = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${this.scrollPosition}px`;
    }, 251); // Adjust the delay to match the animation duration
  }

  close = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, this.scrollPosition);
    document.documentElement.style.scrollBehavior = scrollBehavior;
    this.classList.remove('active');
  }
}

customElements.define('header-el', HeaderEl);