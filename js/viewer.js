// viewer.js

let pdfDoc = null;
let scale = 1.5; // initial zoom scale
const pdfContainer = document.getElementById('pdf-container');

const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');

function renderPage(pageNum) {
  return pdfDoc.getPage(pageNum).then(page => {
    const viewport = page.getViewport({ scale: scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(() => {
      return canvas;
    });
  });
}

function renderAllPages() {
  pdfContainer.innerHTML = ''; // Clear previous canvases

  const renderPromises = [];
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    renderPromises.push(renderPage(i));
  }

  Promise.all(renderPromises).then(canvases => {
    canvases.forEach(canvas => {
      pdfContainer.appendChild(canvas);
    });
  });
}

function loadPdf() {
  const url = 'docs/Bartering-Real-World-Examples.pdf';
  pdfjsLib.getDocument(url).promise.then(pdf => {
    pdfDoc = pdf;
    renderAllPages();
  });
}

// Zoom handlers
zoomInBtn.addEventListener('click', () => {
  scale = Math.min(scale + 0.25, 4); // max 4x zoom
  renderAllPages();
});

zoomOutBtn.addEventListener('click', () => {
  scale = Math.max(scale - 0.25, 0.5); // min 0.5x zoom
  renderAllPages();
});

// Open and close modal
document.getElementById('openPdfButton').addEventListener('click', () => {
  document.getElementById('pdfModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  loadPdf();
});

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('pdfModal').classList.remove('active');
  document.body.style.overflow = '';
  pdfContainer.innerHTML = '';
});

// Close modal on clicking outside modal content
document.getElementById('pdfModal').addEventListener('click', e => {
  if (e.target.id === 'pdfModal') {
    document.getElementById('pdfModal').classList.remove('active');
    document.body.style.overflow = '';
    pdfContainer.innerHTML = '';
  }
});

// Close modal on ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('pdfModal').classList.contains('active')) {
    document.getElementById('pdfModal').classList.remove('active');
    document.body.style.overflow = '';
    pdfContainer.innerHTML = '';
  }
});
