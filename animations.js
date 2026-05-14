// Scroll reveal
const revealEls = document.querySelectorAll(
  '.about-card, .skill-group, .cert-card, .timeline-item, .passion-card, .women-card, .topic-card, .article-card, .about-left, .about-right'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Stagger children in grids
document.querySelectorAll('.women-grid, .articles-grid, .skills-grid, .certs-grid, .passions-grid, .about-cards, .articles-topics').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// Nav active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// Typed effect for hero subtitle
const phrases = [
  'MS Fabric Expert',
  'Data & AI Trainer',
  'Tech Lead Data',
  'MCT Microsoft',
];
let pIdx = 0, cIdx = 0, deleting = false;
const typed = document.getElementById('typed-text');

function typeLoop() {
  if (!typed) return;
  const current = phrases[pIdx];
  typed.textContent = deleting ? current.slice(0, cIdx--) : current.slice(0, ++cIdx);

  if (!deleting && cIdx === current.length) {
    setTimeout(() => { deleting = true; typeLoop(); }, 2000);
    return;
  }
  if (deleting && cIdx === 0) {
    deleting = false;
    pIdx = (pIdx + 1) % phrases.length;
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

// Smooth counter animation for stats
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
      }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => {
  c.dataset.target = c.textContent;
  c.textContent = '0';
  counterObserver.observe(c);
});
