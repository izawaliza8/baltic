class BackToTop extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.scrollToTop);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
 }

customElements.define('back-to-top', BackToTop);