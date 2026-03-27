/* ============================================================
   js/effects.js — Typing effect, glitch, misc UI
============================================================ */

(function () {

  /* ── TYPING EFFECT ── */
  const phrases = [
    'Cybersecurity Analyst.',
    'Ethical Hacker.',
    'MERN Stack Developer.',
    'EIH Authorized Professional.',
    'Tech for Good Advocate.',
  ];
  let pi = 0, ci = 0, del = false;
  const tel = document.getElementById('typedText');

  function type() {
    if (!tel) return;
    const p = phrases[pi];
    if (!del) {
      tel.textContent = p.slice(0, ++ci);
      if (ci === p.length) { setTimeout(() => del = true, 2200); setTimeout(type, 80); return; }
    } else {
      tel.textContent = p.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    }
    setTimeout(type, del ? 28 : 62);
  }
  setTimeout(type, 900);

  /* ── BOOT SEQUENCE (hero terminal) ── */
  const bootLines = [
    { text: 'INITIALIZING SECURE CONNECTION...', color: 'g', delay: 200 },
    { text: 'VERIFYING EIH CREDENTIALS... OK', color: 'g', delay: 700 },
    { text: 'LOADING OPERATOR PROFILE...', color: 'c', delay: 1200 },
    { text: '> NAME: AKSHAY KUMAR SATYALA', color: 'w', delay: 1600 },
    { text: '> ROLE: CYBERSECURITY ANALYST', color: 'w', delay: 1900 },
    { text: '> CLEARANCE: AUTHORIZED', color: 'g', delay: 2200 },
    { text: 'ALL SYSTEMS NOMINAL. WELCOME.', color: 'g', delay: 2700 },
  ];

  const bootEl = document.getElementById('bootLines');
  if (bootEl) {
    bootLines.forEach(({ text, color, delay }) => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = 't-' + color;
        div.textContent = text;
        bootEl.appendChild(div);
        bootEl.scrollTop = bootEl.scrollHeight;
      }, delay);
    });
  }

  /* ── CONTACT FORM ── */
  const cfForm = document.getElementById('cfForm');
  if (cfForm) {
    cfForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = document.getElementById('cfBtn');
      btn.textContent = '[ TRANSMISSION SENT ] ✓';
      btn.style.borderColor = 'var(--cyan)';
      btn.style.color = 'var(--cyan)';
      setTimeout(() => {
        btn.textContent = '[ SEND MESSAGE ]';
        btn.style.borderColor = '';
        btn.style.color = '';
        cfForm.reset();
      }, 3200);
    });
  }

  /* ── GLITCH FLICKER on heading ── */
  const glitchEl = document.querySelector('.hero-name .glitch');
  if (glitchEl) {
    setInterval(() => {
      if (Math.random() > 0.92) {
        glitchEl.style.textShadow = '2px 0 var(--red), -2px 0 var(--cyan)';
        setTimeout(() => { glitchEl.style.textShadow = ''; }, 120);
      }
    }, 1200);
  }

})();
