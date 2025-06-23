const Events = {
  currentIndex: 0,
  isAnimating: false,
  slideDirection: null,
  eventsPerPage: 2,

  init() {
    this.container = document.getElementById('eventsContainer');
    this.prevButton = document.getElementById('prevButton');
    this.nextButton = document.getElementById('nextButton');
    this.seeMoreLink = document.getElementById('seeMoreLink');

    this.articles = this.container.getElementsByTagName('article');
    this.totalEvents = this.articles.length;

    this.hideAllEvents();
    this.showCurrentEvents();

    this.bindEvents();
    this.updateControls();
  },

  bindEvents() {
    this.prevButton.addEventListener('click', () => this.handlePrev());
    this.nextButton.addEventListener('click', () => this.handleNext());
  },

  hideAllEvents() {
    Array.from(this.articles).forEach(article => {
      article.style.display = 'none';
    });
  },

  showCurrentEvents() {
    const start = this.currentIndex;
    const end = Math.min(start + this.eventsPerPage, this.totalEvents);

    for (let i = start; i < end; i++) {
      if (this.articles[i]) {
        this.articles[i].style.display = 'grid';
      }
    }
  },

  handleNext() {
    if (this.currentIndex + this.eventsPerPage < this.totalEvents && !this.isAnimating) {
      this.animate('up', () => {
        this.currentIndex += this.eventsPerPage;
        this.hideAllEvents();
        this.showCurrentEvents();
        this.updateControls();
      });
    }
  },

  handlePrev() {
    if (this.currentIndex > 0 && !this.isAnimating) {
      this.animate('down', () => {
        this.currentIndex -= this.eventsPerPage;
        this.hideAllEvents();
        this.showCurrentEvents();
        this.updateControls();
      });
    }
  },

  animate(direction, callback) {
    this.isAnimating = true;
    this.slideDirection = direction;

    this.container.style.transition = 'all 0.3s ease-out';
    this.container.style.opacity = '0';
    this.container.style.transform = `translateY(${direction === 'up' ? '20%' : '-20%'})`;

    setTimeout(() => {
      callback();
      this.container.style.opacity = '1';
      this.container.style.transform = 'translateY(0)';

      setTimeout(() => {
        this.isAnimating = false;
        this.slideDirection = null;
      }, 300);
    }, 300);
  },

  updateControls() {
    const isLastPage = this.currentIndex + this.eventsPerPage >= this.totalEvents;

    if (this.currentIndex === 0) {
      this.prevButton.classList.add('cursor-default', 'opacity-30');
      this.prevButton.classList.remove('cursor-pointer');
    } else {
      this.prevButton.classList.remove('cursor-default', 'opacity-30');
      this.prevButton.classList.add('cursor-pointer');
    }

    if (isLastPage) {
      this.nextButton.classList.add('cursor-default', 'opacity-30');
      this.nextButton.classList.remove('cursor-pointer');
    } else {
      this.nextButton.classList.remove('cursor-default', 'opacity-30');
      this.nextButton.classList.add('cursor-pointer');
    }

    if (isLastPage) {
      this.seeMoreLink.classList.remove('hidden');
    } else {
      this.seeMoreLink.classList.add('hidden');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Events.init();
});
