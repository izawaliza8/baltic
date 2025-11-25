// Hero video scroll animation
const heroVideo = document.querySelector(".hero__video");
const heroScrollBtn = document.querySelector(".hero__scroll-btn");
const heroSection = document.querySelector(".hero");

if (heroVideo) {
  // Set initial scale with transform origin
  gsap.set(heroVideo, {
    scale: 0.2,
    transformOrigin: "right top",
    x: -48,
  });

  // Create scroll-triggered animation
  const scrollTrigger = gsap.to(heroVideo, {
    scale: 1,
    x: 0,
    ease: "none",
    scrollTrigger: {
      trigger: heroVideo,
      endTrigger: ".hero",
      start: "top bottom-=27%",
      end: "bottom-=100px bottom",
      scrub: true,
    },
  });
}

// Scroll to full video on button click and fade out button
if (heroScrollBtn && heroSection) {
  // Create scroll-triggered fade out animation
  gsap.to(heroScrollBtn, {
    opacity: 0,
    y: -10,
    ease: "sine.in",
    scrollTrigger: {
      trigger: heroScrollBtn,
      start: "top bottom-=100px",
      end: "bottom bottom",
      markers: true,
      scrub: 0.5,
    },
  });

  // Fade out on button click
  heroScrollBtn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {y: ".hero__video", offsetY: 70},
      ease: "sine.in",
    });
  });
}
