// Custom cursor — desktop, fine-pointer only; ring grows over interactive elements
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.body.classList.add('has-cursor');

  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.style.opacity = '0';
  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.style.opacity = '0';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var x = 0, y = 0, rx = 0, ry = 0;
  var hasMoved = false;

  window.addEventListener('mousemove', function (e) {
    x = e.clientX;
    y = e.clientY;
    dot.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
    if (!hasMoved) {
      hasMoved = true;
      rx = x; ry = y;
      dot.style.opacity = '';
      ring.style.opacity = '';
    }
  });

  function loop() {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  var hoverables = 'a, button, .gallery figure, model-viewer, input, textarea';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverables)) ring.classList.add('is-active');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverables)) ring.classList.remove('is-active');
  });
})();
