/* ============================================================
   js/matrix.js — Matrix rain canvas animation
============================================================ */

(function () {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\アイウエオカキクケコサシスセソ';
  const FONT_SIZE = 13;
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / FONT_SIZE);
    drops = new Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.055)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = FONT_SIZE + 'px "Share Tech Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const isHead = drops[i] * FONT_SIZE === Math.floor(drops[i]) * FONT_SIZE;

      if (Math.random() > 0.96) {
        ctx.fillStyle = '#FFFFFF';
      } else if (isHead) {
        ctx.fillStyle = '#00FF41';
      } else {
        const alpha = Math.random() * 0.5 + 0.3;
        ctx.fillStyle = `rgba(0,${Math.floor(150 + Math.random() * 105)},0,${alpha})`;
      }

      ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);

      if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 45);
})();
