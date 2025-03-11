class TabsEl extends HTMLElement {
  connectedCallback() {
    this.initTabs();
    this.observeTabList();
  }

  initTabs = () => {
    this.tabList = this.querySelector('[role="tablist"]');
    this.tabs = Array.from(this.tabList.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(this.querySelectorAll('[role="tabpanel"]'));
    this.carousels = Array.from(this.querySelectorAll('[data-carousel]'));

    if (this.tabs) {
      this.tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => this.activateTab(index));
        tab.addEventListener('keydown', (e) => this.onKeyDown(e, index));
      });

      this.activateTab(0, false);
    }
  }

  activateTab = (index, scrollToTab = true) => {
    this.tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', i === index);
      tab.setAttribute('tabindex', i === index ? '0' : '-1');
      if (this.panels.length) {
        this.panels[i].hidden = i !== index;
      }
      if (this.carousels.length) {
        this.carousels[i].hidden = i !== index;
        if (i === index) {
          setTimeout(() => {
            this.carousels[i].refresh();
          }, 5);
        } else {
          this.carousels[i].stop();
        }
      }
    });

    if (scrollToTab) {
      const panelRect = this.panels[index].getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + panelRect.top - 139,
        behavior: 'smooth'
      });
    }
  }

  onKeyDown = (e, index) => {
    const { key } = e;
    let newIndex = index;

    if (key === 'ArrowRight') {
      newIndex = (index + 1) % this.tabs.length;
    } else if (key === 'ArrowLeft') {
      newIndex = (index - 1 + this.tabs.length) % this.tabs.length;
    }

    this.tabs[newIndex].focus();
    this.activateTab(this.tabs, this.querySelectorAll('[role="tabpanel"]'), newIndex);
  }

  observeTabList = () => {
    const tabList = this.querySelector('.menu__tab-list');
    const stickyTop = 78;

    window.addEventListener('scroll', () => {
      const rect = tabList.getBoundingClientRect();
      if (rect.top == stickyTop) {
        tabList.classList.add('sticky');
      } else {
        tabList.classList.remove('sticky');
      }
    });
  }
}

customElements.define('tabs-el', TabsEl);

