const items = document.querySelectorAll('[data-item-hover]');

// Create hover text element
const hoverText = document.createElement('div');
hoverText.classList.add('hover-text');
document.body.appendChild(hoverText);

// Flag to track scrolling state
let isScrolling;

// Handle scroll events
window.addEventListener('scroll', () => {
  // Hide the hover text while scrolling
  hoverText.classList.remove('active');
  
  // Clear the timeout
  clearTimeout(isScrolling);
  
  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(() => {
    isScrolling = false;
  }, 100);
});

// Track mouse position and update hover text
items.forEach(item => {
  const text = item.getAttribute('data-item-hover');
  const media = item.querySelector('img, video'); // Get the media element
  
  if (!media) return; // Skip if no media element found

  media.addEventListener('mouseenter', () => {
    if (!isScrolling) {
      hoverText.textContent = text;
      hoverText.classList.add('active');
    }
  });

  media.addEventListener('mouseleave', () => {
    hoverText.classList.remove('active');
  });

  media.addEventListener('mousemove', (e) => {
    if (!isScrolling) {
      requestAnimationFrame(() => {
        hoverText.style.left = `${e.clientX}px`;
        hoverText.style.top = `${e.clientY}px`;
      });
    }
  });
});