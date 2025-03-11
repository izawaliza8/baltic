class AccOrdion extends HTMLElement {
  constructor() {
    super();

    this.buttons = this.querySelectorAll("[data-button]");
    this.timeout = null;
    this.openFirst = this.getAttribute("data-first-open") === "1";

    if (this.buttons) {
      this.buttons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
          this.handleButtonClick(button);
        });

        let content = button.nextElementSibling
        let inner = content.querySelector("[data-inner]");

        if (inner.scrollHeight < content.scrollHeight) {
          content.classList.remove('min-height');
          
          this.handleButtonClick(button);
          
          button.querySelector("[data-icon]").remove();
          button.removeEventListener("click", (event) => {
            this.handleButtonClick(button);
          });
          button.style.pointerEvents = "none";
        }

        if (this.openFirst && index === 0) {
          this.handleButtonClick(button);
        }
      })
    }
  }

  handleButtonClick(button) {

    let content = button.nextElementSibling
    let inner = content.querySelector("[data-inner]");

    if (button.classList.contains("active")) {

      button.parentElement.classList.remove("is-open");

      clearTimeout(this.timeout);

      button.classList.remove("active");
      button.setAttribute("aria-expanded", false);
      content.style.maxHeight = null;
      content.setAttribute("aria-hidden", true);

    } else {

      this.closeAll();

      button.classList.add("active");
      button.setAttribute("aria-expanded", true);
      content.style.maxHeight = inner.scrollHeight + "px";
      content.setAttribute("aria-hidden", false);

      button.parentElement.classList.add("is-open");

      this.timeout = setTimeout(() => {
        let rect = button.getBoundingClientRect();
        let elemTop = rect.top;
        let elemBottom = rect.bottom;

        let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        if (!isVisible) {
          window.scrollTo({
            top: elemTop + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }, 301)
    }
  }

  closeAll() {
    this.buttons.forEach((button) => {
      if (button.querySelector("[data-icon]")) {
        button.classList.remove("active");
        button.setAttribute("aria-expanded", false);
        button.nextElementSibling.style.maxHeight = null;
        button.nextElementSibling.setAttribute("aria-hidden", true);
      }
    });
  }
}

customElements.define('acc-ordion', AccOrdion);
