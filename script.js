'use strict';

// The entire site is a fictional portfolio concept. Forms do not send or store data.
// Remote editorial photographs use a local illustrative fallback if unavailable.
const FALLBACK_IMAGE = 'assets/architecture-fallback.svg';
function useFallback(image) {
  if (image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = 'true';
  image.removeAttribute('srcset');
  image.removeAttribute('sizes');
  image.src = FALLBACK_IMAGE;
  image.alt = 'Stylized modern residence illustration (photograph unavailable)';
}
for (const image of document.images) {
  image.addEventListener('error', () => useFallback(image));
  // Cover images that failed before this deferred script attached its listener.
  if (image.getAttribute('src') && image.complete && image.naturalWidth === 0) useFallback(image);
}

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-navigation');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mobileNav.hidden = true;
}
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
  mobileNav.hidden = !opening;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', e => {
  if (!mobileNav.hidden && !mobileNav.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
window.matchMedia('(min-width: 951px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

// Client-side property filters operate on static, illustrative listings.
const cards = [...document.querySelectorAll('.property-card')];
const filterButtons = [...document.querySelectorAll('[data-type-filter]')];
const cityFilter = document.getElementById('city-filter');
const priceFilter = document.getElementById('price-filter');
const resultCount = document.getElementById('results-count');
const emptyState = document.getElementById('no-results');
const clearButton = document.getElementById('clear-filters');
let activeType = 'all';

function applyFilters() {
  let matching = 0;
  for (const card of cards) {
    const typeMatch = activeType === 'all' || card.dataset.type === activeType;
    const cityMatch = cityFilter.value === 'all' || card.dataset.city === cityFilter.value;
    const priceMatch = priceFilter.value === 'all' || Number(card.dataset.price) <= Number(priceFilter.value);
    const visible = typeMatch && cityMatch && priceMatch;
    card.hidden = !visible;
    if (visible) matching++;
  }
  resultCount.textContent = `Showing ${matching} sample ${matching === 1 ? 'home' : 'homes'}`;
  emptyState.hidden = matching !== 0;
  clearButton.hidden = activeType === 'all' && cityFilter.value === 'all' && priceFilter.value === 'all';
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeType = button.dataset.typeFilter;
  filterButtons.forEach(tab => {
    const selected = tab === button;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-pressed', String(selected));
  });
  applyFilters();
}));
cityFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('change', applyFilters);
function resetFilters() {
  activeType = 'all'; cityFilter.value = 'all'; priceFilter.value = 'all';
  filterButtons.forEach(button => {
    const selected = button.dataset.typeFilter === 'all';
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  applyFilters();
}
document.getElementById('reset-filters').addEventListener('click', resetFilters);
clearButton.addEventListener('click', resetFilters);

// Dialog descriptions are fixed, local sample data, never loaded from an external API.
const properties = {
  palm: { name:'The Palm House', city:'Goa', type:'Villa', beds:4, baths:3, price:'₹3.8 Cr', description:'A warm, expansive villa concept where considered architecture makes room for meaningful everyday moments.' },
  indigo: { name:'Indigo Residence', city:'Gurugram', type:'Apartment', beds:3, baths:2, price:'₹2.25 Cr', description:'An elegant city apartment concept with beautifully balanced interiors and generous natural light.' },
  terrace: { name:'Terrace House', city:'Pune', type:'Villa', beds:4, baths:4, price:'₹3.2 Cr', description:'A striking architectural villa concept with open spaces and effortless indoor-outdoor living.' },
  atelier: { name:'Atelier Apartment', city:'Bengaluru', type:'Apartment', beds:2, baths:2, price:'₹1.4 Cr', description:'A compact, sophisticated apartment concept with calm finishes and an inviting connection to the outdoors.' },
  grove: { name:'The Grove', city:'Goa', type:'Villa', beds:5, baths:4, price:'₹4.7 Cr', description:'A relaxed residential concept surrounded by greenery, designed around light, connection and room to breathe.' },
  haven: { name:'Haven Loft', city:'Pune', type:'Apartment', beds:3, baths:2, price:'₹1.95 Cr', description:'An airy loft-inspired apartment concept full of simple comforts and quiet character.' }
};
const dialog = document.getElementById('property-dialog');
const detailImage = document.getElementById('dialog-image');
let currentProperty = '';
let lastDialogOpener = null;
function openProperty(id, opener) {
  const property = properties[id];
  const card = document.querySelector(`[data-id="${id}"]`);
  if (!property || !card) return;
  lastDialogOpener = opener;
  currentProperty = property.name;
  const originalImage = card.querySelector('img');
  delete detailImage.dataset.fallbackApplied;
  detailImage.src = originalImage.currentSrc || originalImage.src;
  detailImage.alt = originalImage.alt;
  document.getElementById('dialog-title').textContent = property.name;
  document.getElementById('dialog-location').textContent = `${property.city.toUpperCase()} · ${property.type.toUpperCase()}`;
  document.getElementById('dialog-type').textContent = 'CONCEPT RESIDENCE';
  document.getElementById('dialog-description').textContent = property.description;
  document.getElementById('dialog-beds').textContent = `${property.beds} bedrooms`;
  document.getElementById('dialog-baths').textContent = `${property.baths} bathrooms`;
  document.getElementById('dialog-price').textContent = property.price;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}
document.querySelectorAll('[data-detail]').forEach(button => {
  button.addEventListener('click', () => openProperty(button.dataset.detail, button));
});
function closeDialog() { if (dialog.open) dialog.close(); }
dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastDialogOpener?.focus({ preventScroll:true });
});
document.getElementById('dialog-inquire').addEventListener('click', () => {
  const selection = currentProperty;
  lastDialogOpener = null;
  closeDialog();
  document.getElementById('interest').value = selection;
  document.getElementById('contact').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  // Moving focus after the modal closes helps keyboard users find the form.
  window.setTimeout(() => document.getElementById('name').focus({preventScroll:true}), 120);
});

// Demonstration form: validation only; no network calls, no email and no persistence.
const inquiryForm = document.getElementById('inquiry-form');
const feedback = document.getElementById('form-feedback');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const fields = [nameInput, emailInput, phoneInput];
function errorFor(input) {
  const value = input.value.trim();
  if (input === phoneInput) {
    if (!value) return '';
    const digits = value.replace(/\D/g, '').length;
    return /^\+?[\d\s\-()]+$/.test(value) && digits >= 7 && digits <= 15 ? '' : 'Enter 7 to 15 digits. You may use +, spaces, hyphens or brackets.';
  }
  if (!value) return input === nameInput ? 'Enter your name.' : 'Enter your email address.';
  if (input === nameInput && value.length < 2) return 'Enter at least two characters.';
  if (input === emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'Enter a valid email address, such as name@example.com.';
  return '';
}
function validateField(input) {
  const message = errorFor(input);
  input.setAttribute('aria-invalid', String(Boolean(message)));
  document.getElementById(`${input.id}-error`).textContent = message;
  return !message;
}
fields.forEach(input => {
  input.addEventListener('blur', () => { if (input.value.length) validateField(input); });
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validateField(input);
    feedback.hidden = true;
  });
});
inquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  const valid = fields.map(validateField).every(Boolean);
  if (!valid) { fields.find(input => input.getAttribute('aria-invalid') === 'true')?.focus(); feedback.hidden = true; return; }
  // Never echo personal details into HTML; the demo does not save anything.
  inquiryForm.reset();
  fields.forEach(input => input.removeAttribute('aria-invalid'));
  feedback.textContent = 'Demo complete. The form validated successfully, no message was sent and no information was saved. For a real client website, connect a secure form provider before accepting enquiries.';
  feedback.hidden = false;
  feedback.scrollIntoView({block:'nearest'});
});

// Highlight the current section in the desktop navigation.
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach(link => {
        const current = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-current', current);
        if (current) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main > section').forEach(section => observer.observe(section));
}
document.getElementById('current-year').textContent = String(new Date().getFullYear());
