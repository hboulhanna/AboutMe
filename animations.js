// ── Scroll reveal ──────────────────────────────────────────────
const revealSelectors = [
  '.about-card', '.skill-group', '.cert-card', '.passion-card',
  '.women-card', '.topic-card', '.article-card', '.about-left',
  '.about-right', '.sp-card', '.offer-card',
  '.wt-manifesto', '.wt-signature-layout', '.wt-quote', '.wt-why-layout',
  '.res-card', '.res-featured'
];

const revealEls = document.querySelectorAll(revealSelectors.join(','));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Stagger children in grids
document.querySelectorAll(
  '.skills-grid, .certs-grid, .passions-grid, .about-cards, .articles-hero-topics, .sp-grid, .booking-offer, .res-grid'
).forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 70}ms`;
  });
});

// ── Nav active on scroll ────────────────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// ── Typed effect in banner ──────────────────────────────────────
const phrases = ['MS Fabric Expert', 'Data & AI Trainer', 'Tech Lead Data', 'MCT Microsoft'];
let pIdx = 0, cIdx = 0, deleting = false;
const typed = document.getElementById('typed-text');

function typeLoop() {
  if (!typed) return;
  const current = phrases[pIdx];
  typed.textContent = deleting ? current.slice(0, cIdx--) : current.slice(0, ++cIdx);
  if (!deleting && cIdx === current.length) {
    setTimeout(() => { deleting = true; typeLoop(); }, 2200);
    return;
  }
  if (deleting && cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  setTimeout(typeLoop, deleting ? 40 : 85);
}
typeLoop();

// ── Animated counters ───────────────────────────────────────────
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 28);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => { c.dataset.target = c.textContent; c.textContent = '0'; counterObserver.observe(c); });

// ── Women section — word-by-word reveal ────────────────────────
const wtWords = document.querySelectorAll('.wt-why-words span, .wt-manifesto-verbs span');
const wordObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('wt-word-visible');
      wordObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

wtWords.forEach((w, i) => {
  w.style.transitionDelay = `${i * 120}ms`;
  wordObserver.observe(w);
});

// ── Nav: scroll shadow ─────────────────────────────────────────
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  const onScroll = () => mainNav.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Hamburger menu — premium ───────────────────────────────────
const burger  = document.getElementById('navBurger');
const navMenu = document.getElementById('navLinks');
const overlay = document.getElementById('navOverlay');

function closeNav() {
  navMenu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  if (overlay) overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

if (burger && navMenu) {
  burger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    if (overlay) overlay.classList.toggle('visible', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  if (overlay) overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
}

// ── SP cards — subtle parallax on mouse ────────────────────────
document.querySelectorAll('.sp-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.querySelector('.sp-card-inner').style.transform =
      `rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.sp-card-inner').style.transform = '';
  });
});
