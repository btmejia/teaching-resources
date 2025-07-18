document.addEventListener('DOMContentLoaded', () => {
  const pdfModal = document.getElementById('pdfModal');
  const closeModal = document.getElementById('closeModal');
  const pdfContainer = document.getElementById('pdfContainer');

  // Mobile detection
  function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  // Handle all PDF buttons
  const pdfButtons = document.querySelectorAll('.open-pdf-btn');
  pdfButtons.forEach(button => {
    const pdfUrl = button.dataset.pdf;
    button.addEventListener('click', () => {
      if (isMobile()) {
        window.open(pdfUrl, '_blank');
      } else {
        PDFObject.embed(pdfUrl, "#pdfContainer");
        pdfModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModalFunc() {
    pdfModal.classList.remove('active');
    document.body.style.overflow = '';
    pdfContainer.innerHTML = '';
  }

  closeModal.addEventListener('click', closeModalFunc);
  pdfModal.addEventListener('click', e => {
    if (e.target === pdfModal) closeModalFunc();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
      closeModalFunc();
    }
  });
});
