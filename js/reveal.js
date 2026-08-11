// Scroll-reveal via IntersectionObserver — adds .is-visible, staggers children by --i
(function () {
  document.querySelectorAll('.reveal-stagger').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.classList.add('reveal');
      child.style.setProperty('--i', i);
    });
  });

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  items.forEach(function (el) { io.observe(el); });
})();
