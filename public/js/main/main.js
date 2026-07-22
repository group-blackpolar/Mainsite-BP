'use strict';

/**
 * public/js/main.js — Black Polar
 * Cargado con <script src="/public/js/main.js" defer>
 */

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const BP = {
  services: [
    {
      number: '01',
      name: 'Technology Services',
      description: 'End-to-end IT solutions encompassing infrastructure design, deployment, and management. We architect and maintain the digital backbone that keeps your organization running without interruption.',
      tags: ['Cloud Migration', 'Infrastructure', 'DevOps', '24/7 Support'],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" class="service-icon"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    },
    {
      number: '02',
      name: 'Systems Administration',
      description: 'Reliable management of Linux, Windows, and hybrid environments. From patch management to performance optimization, we ensure your systems are stable, secure, and performing at their peak.',
      tags: ['Linux/Unix', 'Windows Server', 'Virtualization', 'Monitoring'],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" class="service-icon"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    },
    {
      number: '03',
      name: 'Strategic Consulting',
      description: 'Technology strategy aligned to business outcomes. We partner with leadership to map digital transformation roadmaps, evaluate vendor ecosystems, and build investment cases for critical technology decisions.',
      tags: ['Digital Transformation', 'IT Strategy', 'Audit', 'Roadmapping'],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" class="service-icon"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    },
  ],
};

/* ══════════════════════════════════════════════════════════
   RENDER — Services
══════════════════════════════════════════════════════════ */
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = BP.services.map(s => `
    <div class="service-card reveal">
      <div class="service-number">${s.number}</div>
      ${s.icon}
      <h3 class="service-name">${s.name}</h3>
      <p class="service-desc">${s.description}</p>
      <div class="service-tags">
        ${s.tags.map(t => `<span class="service-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════════════════════
   SCROLL HEADER
══════════════════════════════════════════════════════════ */
function initScrollHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let ticking = false;
  const update = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

/* ══════════════════════════════════════════════════════════
   REVEAL ON SCROLL
══════════════════════════════════════════════════════════ */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════
   STATS COUNTER
══════════════════════════════════════════════════════════ */
function initStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 900;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count]').forEach((el) => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const open = () => {
    toggle.classList.add('active');
    menu.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => menu.classList.contains('active') ? close() : open());
  menu.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) close();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 768) close(); }, { passive: true });
}

/* ══════════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const btn = document.getElementById('form-submit');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const origHTML  = btn.innerHTML;
    btn.disabled    = true;
    btn.textContent = 'Sending…';

    try {
      // Swap for real fetch when API is ready:
      // await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      await new Promise(r => setTimeout(r, 900));

      btn.innerHTML          = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Message Sent`;
      btn.style.background   = 'transparent';
      btn.style.color        = '#f5f5f0';
      btn.style.borderColor  = 'rgba(245,245,240,0.25)';
      form.reset();

    } catch {
      btn.textContent = 'Error — try again';
    } finally {
      setTimeout(() => {
        btn.disabled          = false;
        btn.innerHTML         = origHTML;
        btn.style.background  = '';
        btn.style.color       = '';
        btn.style.borderColor = '';
      }, 4000);
    }
  });
}

/* ══════════════════════════════════════════════════════════
   ADMIN BUTTON
══════════════════════════════════════════════════════════ */
function initAdminButton() {
  const btn = document.getElementById('admin-btn');
  if (btn) btn.addEventListener('click', () => alert('Admin login'));
}

/* ══════════════════════════════════════════════════════════
   FOOTER YEAR
══════════════════════════════════════════════════════════ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
function init() {
  renderServices();
  initScrollHeader();
  initReveal();       // after render so dynamic cards are observed
  initStats();
  initMobileMenu();
  initContactForm();
  initAdminButton();
  initFooterYear();
}

// defer guarantees DOM is ready, guard handles edge cases
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
