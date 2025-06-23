document.addEventListener('DOMContentLoaded', function() {
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
      ab.classList.add('hidden');
      arrow?.classList.remove('rotate-180');
    });
  });
});
