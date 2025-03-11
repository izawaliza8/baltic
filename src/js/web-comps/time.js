class Time extends HTMLElement {
  connectedCallback() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();
    const options = { timeZone: 'Asia/Hong_Kong', hour: '2-digit', minute: '2-digit' };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    const [hour, minute] = timeString.split(':');
    this.innerHTML = `${hour}<span class="blink">:</span>${minute}`;
  }
}

customElements.define('time-el', Time);