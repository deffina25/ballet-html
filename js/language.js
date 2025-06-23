document.addEventListener('DOMContentLoaded', function() {
  const selector = document.querySelector('.language-selector');
  if (!selector) return;

  const trigger = selector.querySelector('.language-trigger');
  const dropdown = selector.querySelector('.language-dropdown');
  const currentLangSpan = selector.querySelector('.current-lang');
  const arrow = selector.querySelector('.lang-arrow');
  const langOptions = selector.querySelectorAll('.lang-option');

  function handleLanguageChange(newLang) {
    const oldLang = currentLangSpan.textContent;
    if (oldLang === newLang) return;

    currentLangSpan.textContent = newLang;

    const visibleOptions = Array.from(langOptions).filter(option =>
      option.getAttribute('data-lang') !== newLang
    );

    langOptions.forEach(option => {
      const lang = option.getAttribute('data-lang');

      if (lang === newLang) {
        option.style.display = 'none';
      } else {
        option.style.display = 'flex';

        const isLastVisible = visibleOptions[visibleOptions.length - 1] === option;
        if (!isLastVisible) {
          option.style.borderBottom = '1px solid transparent';
          option.style.borderImage = 'linear-gradient(90deg, #FFD700 0%, #0057B8 86.06%) 1';
        } else {
          option.style.borderBottom = 'none';
          option.style.borderImage = 'none';
        }
      }
    });

    closeDropdown();
  }

  function closeDropdown() {
    dropdown.classList.add('hidden');
    arrow.classList.remove('rotate-180');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains('hidden');

    if (isHidden) {
      const currentLang = currentLangSpan.textContent;
      const visibleOptions = Array.from(langOptions).filter(option =>
        option.getAttribute('data-lang') !== currentLang
      );

      langOptions.forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLang) {
          option.style.display = 'none';
        } else {
          option.style.display = 'flex';

          const isLastVisible = visibleOptions[visibleOptions.length - 1] === option;
          if (!isLastVisible) {
            option.style.borderBottom = '1px solid transparent';
            option.style.borderImage = 'linear-gradient(90deg, #FFD700 0%, #0057B8 86.06%) 1';
          } else {
            option.style.borderBottom = 'none';
            option.style.borderImage = 'none';
          }
        }
      });

      dropdown.classList.remove('hidden');
      arrow.classList.add('rotate-180');
    } else {
      closeDropdown();
    }
  });

  langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const newLang = option.getAttribute('data-lang');
      if (newLang) {
        handleLanguageChange(newLang);
      }
    });
  });

  dropdown.addEventListener('mouseleave', closeDropdown);

  document.addEventListener('click', (e) => {
    if (!selector.contains(e.target)) {
      closeDropdown();
    }
  });

  handleLanguageChange(currentLangSpan.textContent);
});
