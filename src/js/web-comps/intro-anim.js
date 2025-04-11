class IntroAnim extends HTMLElement {
  connectedCallback() {
    // Force scroll to top with instant behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Create orange overlay
    const overlay = document.createElement('div');
    overlay.className = 'intro-anim__orange-overlay';
    this.prepend(overlay);

    // Double check we're at the top before proceeding
    const checkScroll = () => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
        requestAnimationFrame(checkScroll);
      } else {
        // Only initialize once we're confirmed at the top
        this.initElements();
        this.initAnimation();
        this.startIntroSequence(overlay);
        ScrollTrigger.refresh();
      }
    };

    // Start the check
    requestAnimationFrame(checkScroll);

    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });
  }


  initElements = () => {
    this.imageWrapper = this.querySelector('.intro-anim__image');
    this.image = this.querySelector('.intro-anim__image img');
    this.logoWrapper = this.querySelector('.intro-anim__logo');
    this.beigeLogo = this.querySelector('.logo-full--beige');
    this.blackLogo = this.querySelector('.logo-full--black');
    this.homeTopLogo = document.querySelector('[data-top-logo]');
    this.headerLogo = document.querySelector('.header-wrapper svg');
    this.logoHeight = this.beigeLogo.getBoundingClientRect().height;
    this.sectionHeight = this.getBoundingClientRect().height;


    // Set initial state of image back to original
    gsap.set(this.image, {
      yPercent: 0,
      opacity: 1,
      visibility: 'visible'
    });


    this.headerLogo.style.opacity = 1;
  }

  initAnimation = () => {
    // Reset initial states
    gsap.set(this.headerLogo, { opacity: 0 });
    gsap.set(this.homeTopLogo, { opacity: 0 });
    gsap.set(this.logoWrapper, {
      position: 'fixed',
      bottom: 0,
      xPercent: 0,
      zIndex: 1010,
      opacity: 1
    });
    gsap.set(this.blackLogo, { clipPath: 'inset(100% 0 0 0)' });

    // Create ScrollTrigger context
    const context = {
      trigger: '.intro-anim',
      start: 'top top',
      end: 'bottom top',
      scrub: 0,
      invalidateOnRefresh: true
    };

    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        ...context,
        onLeave: () => {
          gsap.set([this.logoWrapper, this.headerLogo], { opacity: 0 });
          gsap.set(this.homeTopLogo, { opacity: 1 });
        },
        onEnterBack: () => {
          gsap.set([this.logoWrapper], { opacity: 1 });
          gsap.set([this.homeTopLogo, this.headerLogo], { opacity: 0 });
        }
      }
    });

    // Logo animations
    tl.fromTo(this.logoWrapper,
      { bottom: 8 },
      {
        bottom: `calc(100% - ${this.logoHeight}px)`,
        ease: 'none'
      },
      0
    );

    tl.fromTo(this.blackLogo,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        ease: 'none'
      },
      0
    );

    // Restore original parallax animation
    gsap.fromTo(this.image,
      { yPercent: 0 },
      {
        scrollTrigger: {
          ...context,
          scrub: 0
        },
        yPercent: 40,
        ease: 'none'
      }
    );

    // Header logo visibility
    ScrollTrigger.create({
      trigger: this.homeTopLogo,
      start: 'top top',
      end: 'bottom top',
      onLeave: () => gsap.to(this.headerLogo, { opacity: 1, duration: 0.3 }),
      onEnterBack: () => gsap.to(this.headerLogo, { opacity: 0, duration: 0.3 })
    });
  }

  startIntroSequence = (overlay) => {
    const tl = gsap.timeline();

    setTimeout(() => {
      gsap.to(overlay, {
        translateY: '-100vh',
        duration: 1.2,
        ease: "power2.inOut",
      })

      gsap.to(this.imageWrapper, {
        translateY: '0vh',
        duration: 1.2,
        ease: "power2.inOut",
      })
    }, 300);
  }

  disconnectedCallback() {
    ScrollTrigger.getAll().forEach(st => st.kill());
  }
}

customElements.define('intro-anim', IntroAnim); 