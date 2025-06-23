document.addEventListener('DOMContentLoaded', function() {
  const emblaNode = document.querySelector('.embla');
  const viewportNode = emblaNode.querySelector('.embla__viewport');
  const prevButtonNode = emblaNode.querySelector('.embla__button--prev');
  const nextButtonNode = emblaNode.querySelector('.embla__button--next');

  const options = { loop: true };

  const embla = EmblaCarousel(viewportNode, options);

  const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
    const togglePrevNextBtns = () => {
      if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');
      else prevBtn.setAttribute('disabled', 'disabled');

      if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');
      else nextBtn.setAttribute('disabled', 'disabled');
    };

    // Используем bind для правильного контекста
    prevBtn.addEventListener('click', () => embla.scrollPrev(), false);
    nextBtn.addEventListener('click', () => embla.scrollNext(), false);

    embla.on('select', togglePrevNextBtns);
    embla.on('init', togglePrevNextBtns);
    embla.on('reInit', togglePrevNextBtns);
  };

  setupPrevNextBtns(prevButtonNode, nextButtonNode, embla);
});
