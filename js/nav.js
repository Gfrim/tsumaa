// Sticky header state + full-screen overlay nav toggle
(function () {
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.site-nav');
  var navLinks = document.querySelectorAll('.site-nav .nav-links a');

  navLinks.forEach(function (a, i) {
    a.style.setProperty('--i', i);
  });

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeNav() {
    document.body.classList.remove('nav-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    document.body.classList.add('nav-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = document.body.classList.contains('nav-open');
      isOpen ? closeNav() : openNav();
    });
    navLinks.forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }
})();
