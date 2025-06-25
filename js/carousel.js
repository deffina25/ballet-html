document.addEventListener('DOMContentLoaded', function() {
  const emblaNode = document.querySelector('.embla');
  const viewportNode = emblaNode.querySelector('.embla__viewport');
  const prevButtonNode = emblaNode.querySelector('.embla__button--prev');
  const nextButtonNode = emblaNode.querySelector('.embla__button--next');

  const options = { loop: true };
  const TWEEN_FACTOR_BASE = 0.84;
  let tweenFactor = 0;

  const embla = EmblaCarousel(viewportNode, options);

  const numberWithinRange = (number, min, max) =>
    Math.min(Math.max(number, min), max);

  const setTweenFactor = (embla) => {
    tweenFactor = TWEEN_FACTOR_BASE * embla.scrollSnapList().length;
  };

  const tweenOpacity = (embla, eventName) => {
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
        const opacity = numberWithinRange(tweenValue, 0, 1);
        embla.slideNodes()[slideIndex].style.opacity = opacity;
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
  tweenOpacity(embla);

  // Добавляем обработчики для эффекта затемнения
  embla.on('reInit', () => setTweenFactor(embla));
  embla.on('reInit', () => tweenOpacity(embla));
  embla.on('scroll', () => tweenOpacity(embla, 'scroll'));
  embla.on('slideFocus', () => tweenOpacity(embla));

  setupPrevNextBtns(prevButtonNode, nextButtonNode, embla);
});
