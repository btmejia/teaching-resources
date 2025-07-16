document.addEventListener('DOMContentLoaded', () => {
  const pdfModal = document.getElementById('pdfModal');
  const closeModal = document.getElementById('closeModal');
  const openPdfButton = document.getElementById('openPdfButton');
  const pdfContainer = document.getElementById('pdfContainer');

  // Your PDF URL
  const pdfUrl = 'https://btmejia-teaching-resources.netlify.app/docs/Bartering-Real-World-Examples.pdf';

  // Simple mobile detection function
  function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  openPdfButton.addEventListener('click', () => {
    if (isMobile()) {
      // On mobile devices, open PDF in a new tab instead of embedding
      window.open(pdfUrl, '_blank');
    } else {
      // On desktop, embed PDF in the modal
      PDFObject.embed(pdfUrl, "#pdfContainer");
      pdfModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  function closeModalFunc() {
    pdfModal.classList.remove('active');
    document.body.style.overflow = '';
    pdfContainer.innerHTML = ''; // Clear embedded PDF on close
  }

  closeModal.addEventListener('click', closeModalFunc);

  pdfModal.addEventListener('click', e => {
    if (e.target === pdfModal) {
      closeModalFunc();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
      closeModalFunc();
    }
  });
});
