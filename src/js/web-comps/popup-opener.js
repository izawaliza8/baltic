class PopupOpener extends HTMLElement {
  connectedCallback() {
    this.button = this.querySelector('button');
    this.popUp = document.querySelector(`${this.getAttribute('data-pop-id')}`);
    this.parentPopup = this.closest('pop-up');

    if (this.popUp) {
      this.button.setAttribute('aria-haspopup', 'dialog');
      this.button.setAttribute('aria-controls', this.popUp.id);
      this.button.addEventListener('click', () => {
        if (this.parentPopup) {
          this.parentPopup.hide();
        }
        this.popUp.show();
      });
    }
  }
}

customElements.define('popup-opener', PopupOpener);