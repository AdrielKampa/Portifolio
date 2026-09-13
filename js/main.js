// ============================================================
// Adriel Kampa — Cybersecurity Portfolio — interactions
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Navbar scroll state ---------------- */
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 20);
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------------- Mobile nav toggle ---------------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('is-open');
  navLinks.classList.toggle('is-open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('is-open');
    navLinks.classList.remove('is-open');
  });
});

/* ---------------- Active section highlight ---------------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('[data-nav]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`[data-nav][href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ---------------- Scroll reveal ---------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------------- Terminal typing animation ---------------- */
const terminalLines = [
  { prompt: '~$', cmd: 'whoami', out: 'adriel_kampa_de_gois' },
  { prompt: '~$', cmd: 'cat role.txt', out: 'CS Student · Cybersecurity Track · Dublin, IE' },
  { prompt: '~$', cmd: 'cat status.txt', out: 'Studying · Open to opportunities <span class="ok">[ACTIVE]</span>' },
  { prompt: '~$', cmd: 'cat certifications.txt', out: 'Cisco Ethical Hacker <span class="tag">[IN PROGRESS]</span>' },
  { prompt: '~$', cmd: 'ls projects/', out: 'ad-infrastructure/  secure-access-manager/' },
  { prompt: '~$', cmd: '_', out: '' },
];

const terminalBody = document.getElementById('terminalBody');

function typeTerminal() {
  let lineIndex = 0;

  function nextLine() {
    if (lineIndex >= terminalLines.length) return;
    const data = terminalLines[lineIndex];
    const lineEl = document.createElement('div');
    lineEl.className = 'line';

    const promptEl = document.createElement('span');
    promptEl.className = 'terminal-prompt';
    promptEl.textContent = data.prompt;

    const cmdEl = document.createElement('span');
    cmdEl.className = 'terminal-cmd';

    lineEl.appendChild(promptEl);
    lineEl.appendChild(cmdEl);
    terminalBody.appendChild(lineEl);

    let charIndex = 0;
    const isLast = lineIndex === terminalLines.length - 1;
    const cmdText = isLast ? '' : data.cmd;

    function typeChar() {
      if (charIndex < cmdText.length) {
        cmdEl.textContent += cmdText[charIndex];
        charIndex++;
        setTimeout(typeChar, 28 + Math.random() * 35);
      } else {
        if (isLast) {
          const cursor = document.createElement('span');
          cursor.className = 'terminal-cursor';
          lineEl.appendChild(cursor);
          return;
        }
        if (data.out) {
          const outEl = document.createElement('div');
          outEl.className = 'terminal-out';
          outEl.innerHTML = data.out;
          terminalBody.appendChild(outEl);
        }
        lineIndex++;
        setTimeout(nextLine, 260);
      }
    }
    typeChar();
  }
  nextLine();
}

// Start typing once terminal scrolls into view
const terminalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeTerminal();
      terminalObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
terminalObserver.observe(document.querySelector('.terminal'));

/* ---------------- Background network canvas ---------------- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = Math.min(window.innerHeight * 1.1, 900);
}

function initParticles() {
  const count = Math.min(60, Math.floor((w * h) / 26000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, w, h);
  const maxDist = 140;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.strokeStyle = `rgba(57, 255, 157, ${0.14 * (1 - dist / maxDist)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = 'rgba(57, 255, 157, 0.55)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(drawParticles);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}

/* ---------------- Smooth anchor scroll offset ---------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});
