const footerLogo = document.querySelector('[data-footer-logo] svg');
if (footerLogo) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.classList.add('hide-nav');
      } else {
        document.body.classList.remove('hide-nav');
      }
    });
  }, {
    threshold: 0.01 // Trigger when at least 10% of the element is visible
  });

  observer.observe(footerLogo);
}