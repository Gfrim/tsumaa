// Lightweight lightbox for .gallery figures — prev/next, keyboard, Esc, click-outside
(function () {
  var galleries = document.querySelectorAll('.gallery');
  if (!galleries.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous image">&larr;</button>' +
    '<img alt="">' +
    '<button class="lightbox-next" aria-label="Next image">&rarr;</button>' +
    '<span class="lightbox-count"></span>';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector('img');
  var countEl = overlay.querySelector('.lightbox-count');
  var closeBtn = overlay.querySelector('.lightbox-close');
  var prevBtn = overlay.querySelector('.lightbox-prev');
  var nextBtn = overlay.querySelector('.lightbox-next');

  var currentSet = [];
  var currentIndex = 0;
  var lastFocused = null;

  function render() {
    var src = currentSet[currentIndex];
    imgEl.src = src.getAttribute('data-full') || src.src;
    imgEl.alt = src.alt || '';
    countEl.textContent = (currentIndex + 1) + ' / ' + currentSet.length;
  }

  function open(set, index) {
    currentSet = set;
    currentIndex = index;
    lastFocused = document.activeElement;
    render();
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  function step(dir) {
    currentIndex = (currentIndex + dir + currentSet.length) % currentSet.length;
    render();
  }

  galleries.forEach(function (gallery) {
    var figures = Array.prototype.slice.call(gallery.querySelectorAll('img'));
    figures.forEach(function (img, i) {
      img.closest('figure').addEventListener('click', function () {
        open(figures, i);
      });
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { step(-1); });
  nextBtn.addEventListener('click', function () { step(1); });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
