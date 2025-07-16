window.addEventListener('DOMContentLoaded', () => {
  let pdfDoc = null;
  let scale = 1.5;
  const pdfContainer = document.getElementById('pdf-container');

  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');

  // Render a single page and return its canvas element
  function renderPage(pageNum) {
    return pdfDoc.getPage(pageNum).then(page => {
      const viewport = page.getViewport({ scale: scale });
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(() => canvas);
    });
  }

  // Render all pages and append canvases to container
  function renderAllPages() {
    pdfContainer.innerHTML = '';

    const renderPromises = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      renderPromises.push(renderPage(i));
    }

    Promise.all(renderPromises).then(canvases => {
      canvases.forEach(canvas => pdfContainer.appendChild(canvas));
    }).catch(err => {
      console.error('Error rendering pages:', err);
      pdfContainer.textContent = 'Failed to render PDF pages.';
    });
  }

  // Load PDF document
  function loadPdf() {
    const url = 'docs/Bartering-Real-World-Examples.pdf';

    pdfjsLib.getDocument(url).promise.then(pdf => {
      pdfDoc = pdf;
      renderAllPages();
    }).catch(err => {
      console.error('Error loading PDF:', err);
      pdfContainer.textContent = 'Failed to load PDF.';
    });
  }

  // Open modal & load PDF
  document.getElementById('openPdfButton').addEventListener('click', () => {
    document.getElementById('pdfModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    loadPdf();
  });

  // Close modal and clear PDF container
  function closeModal() {
    document.getElementById('pdfModal').classList.remove('active');
    document.body.style.overflow = '';
    pdfContainer.innerHTML = '';
    pdfDoc = null;
  }

  document.getElementById('closeModal').addEventListener('click', closeModal);

  document.getElementById('pdfModal').addEventListener('click', e => {
    if (e.target.id === 'pdfModal') {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('pdfModal').classList.contains('active')) {
      closeModal();
    }
  });

  // Zoom in/out handlers
  zoomInBtn.addEventListener('click', () => {
    scale = Math.min(scale + 0.25, 4);
    if(pdfDoc) renderAllPages();
  });

  zoomOutBtn.addEventListener('click', () => {
    scale = Math.max(scale - 0.25, 0.5);
    if(pdfDoc) renderAllPages();
  });
});
