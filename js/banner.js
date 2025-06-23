const BannerControls = {
  init() {
    this.isPlaying = true;
    this.button = document.getElementById('banner-toggle-btn');
    this.buttonIcon = document.getElementById('banner-btn-icon');
    this.bindEvents();
  },

  bindEvents() {
    this.button.addEventListener('click', () => this.togglePlayState());
  },

  togglePlayState() {
    this.isPlaying = !this.isPlaying;
    this.buttonIcon.src = this.isPlaying
      ? './public/stop.svg'
      : './public/play.svg';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  BannerControls.init();
});
