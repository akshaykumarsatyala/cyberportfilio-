/* ============================================================
   js/navigation.js — 3D room navigation, cursor, typing
============================================================ */

(function () {
  const ROOMS = 7;
  const LABELS = ['ACCESS','PROFILE','SKILLS','PROJECTS','ACHIEVEMENTS','CERTS','CONTACT'];
  let current = 0;
  let isAnimating = false;

  /* ── CURSOR ── */
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    if (cur) cur.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    if (ring) ring.style.transform = `translate(${rx - 22}px, ${ry - 22}px)`;
    requestAnimationFrame(animCursor);
  })();

  document.querySelectorAll('a,button,.proj-card,.sk-card,.ach-card,.c-link,.cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring && ring.classList.add('h'));
    el.addEventListener('mouseleave', () => ring && ring.classList.remove('h'));
  });

  /* ── NAV DOTS ── */
  const navDots = document.getElementById('navDots');
  if (navDots) {
    for (let i = 0; i < ROOMS; i++) {
      const d = document.createElement('div');
      d.className = 'nav-dot' + (i === 0 ? ' active' : '');
      d.title = LABELS[i];
      d.onclick = () => goRoom(i);
      navDots.appendChild(d);
    }
  }

  function updateUI() {
    document.querySelectorAll('.nav-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    const lbl = document.getElementById('room-label');
    if (lbl) lbl.textContent =
      `[ ${String(current + 1).padStart(2, '0')} / ${String(ROOMS).padStart(2, '0')} ] — ${LABELS[current]}`;
    const prog = document.getElementById('progress');
    if (prog) prog.style.width = ((current / (ROOMS - 1)) * 100) + '%';
  }

  /* ── GO TO ROOM ── */
  window.goRoom = function (n) {
    if (n < 0 || n >= ROOMS || n === current || isAnimating) return;
    isAnimating = true;
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.add('show');
    setTimeout(() => {
      current = n;
      const track = document.getElementById('track');
      if (track) track.style.transform = `translateX(-${current * 100}vw)`;
      updateUI();
      setTimeout(() => {
        if (overlay) overlay.classList.remove('show');
        isAnimating = false;
      }, 320);
    }, 280);
  };

  /* ── WHEEL ── */
  let wheelAcc = 0, wheelTimer = null;
  window.addEventListener('wheel', e => {
    e.preventDefault();
    wheelAcc += e.deltaY;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      if (Math.abs(wheelAcc) > 50) {
        goRoom(wheelAcc > 0 ? current + 1 : current - 1);
      }
      wheelAcc = 0;
    }, 70);
  }, { passive: false });

  /* ── KEYBOARD ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goRoom(current + 1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goRoom(current - 1);
  });

  /* ── TOUCH ── */
  let tx = 0;
  document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
  document.addEventListener('touchend', e => {
    const dx = tx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) goRoom(dx > 0 ? current + 1 : current - 1);
  });

  /* ── INIT ── */
  updateUI();
  setTimeout(() => {
    const hint = document.getElementById('scroll-hint');
    if (hint) hint.style.opacity = '0';
  }, 5000);

})();
