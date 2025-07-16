// js/include.js

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileOverlay = document.getElementById('mobileMenuOverlay');
  const leftBar = document.querySelector('.left-bar');

  // Hamburger toggle
  menuToggle.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      mobileOverlay.classList.toggle('active');
    } else {
      leftBar.classList.toggle('expanded');
    }
  });

  // PDF modal logic
  const pdfModal = document.getElementById('pdfModal');
  const closeModal = document.getElementById('closeModal');
  const openPdfButton = document.getElementById('openPdfButton');

  openPdfButton.addEventListener('click', () => {
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeModal.addEventListener('click', () => {
    pdfModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  pdfModal.addEventListener('click', (e) => {
    if (e.target === pdfModal) {
      pdfModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
      pdfModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
