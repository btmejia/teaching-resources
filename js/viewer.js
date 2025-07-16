// viewer.js

let pdfDoc = null;
let pageNum = 1;
let scale = 1.5; // Zoomed out a bit more from 2
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

function renderPage(num) {
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    page.render(renderContext);
  });
}

function loadPdf() {
  const url = 'docs/Bartering-Real-World-Examples.pdf';

  pdfjsLib.getDocument(url).promise.then(pdf => {
    pdfDoc = pdf;
    renderPage(pageNum);
  });
}

document.getElementById('zoomIn').addEventListener('click', () => {
  scale += 0.25;
  renderPage(pageNum);
});

document.getElementById('zoomOut').addEventListener('click', () => {
  scale = Math.max(0.25, scale - 0.25);
  renderPage(pageNum);
});

document.getElementById('openPdfButton').addEventListener('click', () => {
  document.getElementById('pdfModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  loadPdf();
});

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('pdfModal').classList.remove('active');
  document.body.style.overflow = '';
});
