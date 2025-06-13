document.addEventListener('DOMContentLoaded', function () {
  const burgerBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const mobileMenu = document.querySelector('[data-menu]');
  const mobileMenuLinks = document.querySelectorAll('[data-menu-link]');
  const body = document.body;

  if (burgerBtn) {
    burgerBtn.addEventListener('click', openMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (mobileMenu) {
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  // ↓ removed by Maksym Veretnov. Replaced with handleEscDown function, ↓
  // ↓ which works only when opening the mobile menu                     ↓
  //   document.addEventListener('keydown', function (e) {
  //     if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
  //       closeMenu();
  //     }
  //   });
  // -------------------------------------------------------------------- //

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href.startsWith('#')) {
        e.preventDefault();

        closeMenu();

        setTimeout(() => {
          const targetSection = document.querySelector(href);
          if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 10;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            });
          }
        }, 300);
      }
    });
  });

  function openMenu() {
    mobileMenu.classList.add('is-open');
    body.classList.add('menu-open');
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscDown);
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    body.classList.remove('menu-open');
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', handleEscDown);
  }

  function handleEscDown(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  }
});
