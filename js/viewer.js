document.addEventListener('DOMContentLoaded', () => {
  const pdfModal = document.getElementById('pdfModal');
  const closeModal = document.getElementById('closeModal');
  const openPdfButton = document.getElementById('openPdfButton');
  const pdfContainer = document.getElementById('pdfContainer');

  // Update path if your pdf location changes
  const pdfUrl = '/docs/Bartering-Real-World-Examples.pdf';

  openPdfButton.addEventListener('click', () => {
    PDFObject.embed(pdfUrl, "#pdfContainer");
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
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
