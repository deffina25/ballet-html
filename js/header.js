document.addEventListener('DOMContentLoaded', function() {
  // Существующий код для выпадающих меню
  const dropdowns = document.querySelectorAll('.relative');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.click-menu.flex');
    const submenu = dropdown.querySelector('.submenu');
    const ab = dropdown.querySelector('.ab');
    const arrow = dropdown.querySelector('.arrow-menu');

    if (!trigger || !submenu) {
      console.log('elements not found:', { trigger, submenu });
      return;
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isCurrentlyOpen = !submenu.classList.contains('hidden');

      if (isCurrentlyOpen) {
        submenu.classList.add('hidden');
        arrow?.classList.remove('rotate-180');
      } else {
        submenu.classList.remove('hidden');
        arrow?.classList.add('rotate-180');
      }
    });

    submenu.addEventListener('mouseleave', () => {
      submenu.classList.add('hidden');
      arrow?.classList.remove('rotate-180');
    });

    dropdown.addEventListener('mouseleave', () => {
      ab?.classList.add('hidden');
      arrow?.classList.remove('rotate-180');
    });
  });

  // Код для мобильного меню
  const mobileMenuButton = document.querySelector('button[aria-label="Toggle menu"]');
  const mobileMenu = document.querySelector('.fixed.top-\\[52px\\]');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      // Переключаем класс translate-x-full для показа/скрытия меню
      mobileMenu.classList.toggle('translate-x-full');

      // Анимация кнопки бургер-меню
      const spans = this.querySelectorAll('span');
      if (mobileMenu.classList.contains('translate-x-full')) {
        // Возвращаем в исходное состояние (гамбургер)
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      } else {
        // Трансформируем в крестик
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      }
    });
  }

  // Выпадающие подменю в мобильной версии
  const mobileMenuItems = document.querySelectorAll('.fixed.top-\\[52px\\] li .flex.cursor-pointer');

  mobileMenuItems.forEach(item => {
    const submenu = item.nextElementSibling;
    const arrow = item.querySelector('.transition-transform');

    if (submenu && submenu.classList.contains('submenu')) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        submenu.classList.toggle('hidden');
        arrow?.classList.toggle('rotate-180');
      });
    }
  });
});
