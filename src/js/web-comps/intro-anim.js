class IntroAnim extends HTMLElement {
  connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const showIntroQuery = urlParams.get('intro') === '1';
    const showIntro = !sessionStorage.getItem('showIntro') || showIntroQuery;

    if (!showIntro) {
      this.remove();
      document.body.classList.add('show-nav');
      return;
    }
    
    this.animateIntro();
  }
  
  animateIntro = () => {
    document.body.classList.add('start-intro');

    const bottomElement = this.querySelector('.intro-anim__bottom');
    const logoElement = this.querySelector('.intro-anim__logo');
    const rElement = this.querySelector('.intro-anim__r');
    const container = this.querySelector('.intro-anim__bg');
    const containerLeft = this.querySelector('.intro-anim__bg-left');
    
    
    setTimeout(() => {
      bottomElement.style.transition = 'opacity .5s';
      bottomElement.style.opacity = '0';
      
    }, 750);
    
    setTimeout(() => {
      logoElement.style.transition = 'transform .75s, opacity .75s';
      logoElement.style.transform = 'translateX(calc(50% + 30px))';
      logoElement.style.opacity = '0';
      
      rElement.style.transition = 'transform .75s, opacity .75s';
      rElement.style.transform = 'translateX(calc(-50% - 30px))';
      rElement.style.opacity = '0';
      
      container.style.transition = 'width .75s';
      container.style.width = '50%';
      
      containerLeft.style.transition = 'width .75s';
      containerLeft.style.width = '50%';
      
    }, 1500);
    
    setTimeout(() => {
      container.style.width = '0%';
      containerLeft.style.width = '0%';
      
    }, 2250);
    
    setTimeout(() => {
      document.body.classList.add('show-nav');
      sessionStorage.setItem('showIntro', true);
      this.remove();
    }, 3000);
  }
}

customElements.define('intro-anim', IntroAnim);