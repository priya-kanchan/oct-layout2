(() => {
  'use strict';
  document.querySelectorAll('.enquiry-form').forEach(form => {
    form.addEventListener('submit', event => event.preventDefault());
  });
  const header = document.querySelector('.header');
  const menu = document.querySelector('#site-menu');
  const toggle = document.querySelector('.menu-toggle');
  const enquiryDialog = document.querySelector('#enquiry-dialog');
  const imageDialog = document.querySelector('#image-dialog');
  const dialogs = [enquiryDialog, imageDialog];
  const syncHeader = () => header.classList.toggle('sticky', window.scrollY > 50);
  syncHeader();
  window.addEventListener('scroll', syncHeader, {passive:true});
  function closeMenu(returnFocus = false) {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    toggle.setAttribute('aria-expanded', String(!menu.hidden));
    if (!menu.hidden) menu.querySelector('a').focus();
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('click', e => {
    if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  function openDialog(dialog) {
    closeMenu();
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  dialogs.forEach(dialog => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
    dialog.addEventListener('click', e => {
      const rect = dialog.getBoundingClientRect();
      if (e.target === dialog && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) dialog.close();
    });
  });
  document.querySelectorAll('[data-enquire]').forEach(button => button.addEventListener('click', () => {
    const intent = button.dataset.enquire;
    document.querySelector('#dialog-title').textContent = intent;
    openDialog(enquiryDialog);
  }));
  document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    imageDialog.querySelector('img').src = link.getAttribute('href');
    imageDialog.querySelector('img').alt = link.title;
    imageDialog.querySelector('p').textContent = link.title;
    openDialog(imageDialog);
  }));
  const slides = [...document.querySelectorAll('.hero-slide')];
  let activeSlide = 0;
  function changeSlide(direction) {
    activeSlide = (activeSlide + direction + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle('active', index === activeSlide));
    document.querySelector('#slide-counter').textContent = `0${activeSlide + 1} / 0${slides.length}`;
  }
  document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => changeSlide(button.dataset.slide === 'next' ? 1 : -1)));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      if (!document.hidden && !dialogs.some(dialog => dialog.open) && !document.querySelector('.hero').matches(':hover, :focus-within')) changeSlide(1);
    }, 7000);
  }
  // Match the original delayed enquiry, once per visit; don't interrupt typing.
  let popupShown = false;
  enquiryDialog.addEventListener('close', () => { popupShown = true; });
  setTimeout(() => {
    if (popupShown || dialogs.some(dialog => dialog.open) || document.activeElement.closest('form') || window.scrollY > 600) return;
    popupShown = true;
    openDialog(enquiryDialog);
  }, 8000);
})();
