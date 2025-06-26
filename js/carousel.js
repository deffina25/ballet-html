document.addEventListener('DOMContentLoaded', function() {
  const emblaNode = document.querySelector('.embla');
  const viewportNode = emblaNode.querySelector('.embla__viewport');
  const prevButtonNode = emblaNode.querySelector('.embla__button--prev');
  const nextButtonNode = emblaNode.querySelector('.embla__button--next');

  const options = { loop: true };
  const TWEEN_FACTOR_BASE = 1;
  let tweenFactor = 0;

  // Добавляем затемняющий элемент к каждому слайду
  const slides = emblaNode.querySelectorAll('.embla__slide');
  slides.forEach(slide => {
    // Проверяем, есть ли уже затемняющий элемент
    if (!slide.querySelector('.embla__slide-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'embla__slide-overlay';
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = '#11111780';
      overlay.style.opacity = '0'; // Начальное значение
      overlay.style.pointerEvents = 'none'; // Чтобы не блокировать события
      overlay.style.transition = 'opacity 0.2s ease';

      // Убеждаемся, что у слайда есть position: relative
      if (getComputedStyle(slide).position === 'static') {
        slide.style.position = 'relative';
      }

      slide.appendChild(overlay);
    }
  });

  const embla = EmblaCarousel(viewportNode, options);

  const numberWithinRange = (number, min, max) =>
    Math.min(Math.max(number, min), max);

  const setTweenFactor = (embla) => {
    tweenFactor = TWEEN_FACTOR_BASE * embla.scrollSnapList().length;
  };

  const tweenOverlay = (embla, eventName) => {
    const engine = embla.internalEngine();
    const scrollProgress = embla.scrollProgress();
    const slidesInView = embla.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    embla.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor);
        const opacity = 1 - numberWithinRange(tweenValue, 0, 1); // Инвертируем значение

        // Находим затемняющий элемент для текущего слайда
        const slide = embla.slideNodes()[slideIndex];
        const overlay = slide.querySelector('.embla__slide-overlay');
        if (overlay) {
          overlay.style.opacity = opacity;
        }
      });
    });
  };

  const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
    const togglePrevNextBtns = () => {
      if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');
      else prevBtn.setAttribute('disabled', 'disabled');

      if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');
      else nextBtn.setAttribute('disabled', 'disabled');
    };

    prevBtn.addEventListener('click', () => embla.scrollPrev(), false);
    nextBtn.addEventListener('click', () => embla.scrollNext(), false);

    embla.on('select', togglePrevNextBtns);
    embla.on('init', togglePrevNextBtns);
    embla.on('reInit', togglePrevNextBtns);
  };

  // Инициализация затемнения
  setTweenFactor(embla);
  tweenOverlay(embla);

  // Добавляем обработчики для эффекта затемнения
  embla.on('reInit', () => setTweenFactor(embla));
  embla.on('reInit', () => tweenOverlay(embla));
  embla.on('scroll', () => tweenOverlay(embla, 'scroll'));
  embla.on('slideFocus', () => tweenOverlay(embla));

  setupPrevNextBtns(prevButtonNode, nextButtonNode, embla);
});
