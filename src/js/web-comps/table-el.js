class TableEl extends HTMLElement {
  connectedCallback() {
    this.tabButtons = this.querySelectorAll('.table__tab-btn');
    this.panels = this.querySelectorAll('.table__panel');
    this.rows = this.querySelectorAll('.table__row');
    this.preview = this.querySelector('.table__preview');
    this.previewImage = this.querySelector('.table__preview-image');

    this.initTabs();
    this.initHoverPreview();
    this.showFirstImage();
  }

  showFirstImage() {
    // Get the first row's image
    const firstRow = this.rows[0];
    if (firstRow && firstRow.dataset.image) {
      this.previewImage.src = firstRow.dataset.image;
      this.preview.classList.add('is-visible');
      // Add active state to first row
      firstRow.classList.add('is-active');
    }
  }

  initTabs() {
    this.tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        this.tabButtons.forEach(btn => btn.classList.remove('is-active'));
        this.panels.forEach(panel => panel.classList.remove('is-active'));

        // Add active class to clicked button and corresponding panel
        button.classList.add('is-active');
        const panelId = button.dataset.tab;
        const activePanel = this.querySelector(`[data-panel="${panelId}"]`);
        activePanel.classList.add('is-active');

        // Reset animations for the newly activated panel
        const animTriggers = activePanel.querySelectorAll('.anim-trigger');
        animTriggers.forEach(trigger => {
          window.removeAndReobserve(trigger);
        });

        // Show first image of newly activated panel
        const firstRowInPanel = activePanel.querySelector('.table__row');
        if (firstRowInPanel && firstRowInPanel.dataset.image) {
          this.previewImage.src = firstRowInPanel.dataset.image;
          this.preview.classList.add('is-visible');
          
          // Remove active state from all rows
          this.rows.forEach(row => row.classList.remove('is-active'));
          // Add active state to first row
          firstRowInPanel.classList.add('is-active');
        }
      });
    });
  }

  initHoverPreview() {
    this.rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        const imageUrl = row.dataset.image;
        if (imageUrl) {
          this.previewImage.src = imageUrl;
          this.preview.classList.add('is-visible');
          
          // Remove active state from all rows
          this.rows.forEach(r => r.classList.remove('is-active'));
          // Add active state to hovered row
          row.classList.add('is-active');
        }
      });
    });
  }
}

customElements.define('table-el', TableEl);