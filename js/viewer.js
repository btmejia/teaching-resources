// viewer.js

let pdfDoc = null;
let pageNum = 1;
let scale = 1.5; // initial zoom out a bit
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

const pageInfo = document.getElementById('pageInfo');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');

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

    // Update page info display
    pageInfo.textContent = `Page ${num} / ${pdfDoc.numPages}`;

    // Enable/disable buttons
    prevPageBtn.disabled = (num <= 1);
    nextPageBtn.disabled = (num >= pdfDoc.numPages);
  });
}

function queueRenderPage(num) {
  if (num < 1 || num > pdfDoc.numPages) return;
  pageNum = num;
  renderPage(pageNum);
}

function loadPdf() {
  const url = 'docs/Bartering-Real-World-Examples.pdf';

  pdfjsLib.getDocument(url).promise.then(pdf => {
    pdfDoc = pdf;
    pageNum = 1;
    renderPage(pageNum);
  });
}

// Event Listeners
document.getElementById('openPdfButton').addEventListener('click', () => {
  document.getElementById('pdfModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  loadPdf();
});

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('pdfModal').classList.remove('active');
  document.body.style.overflow = '';
});

// Navigation
prevPageBtn.addEventListener('click', () => {
  if (pageNum <= 1) return;
  queueRenderPage(pageNum - 1);
});

nextPageBtn.addEventListener('click', () => {
  if (pageNum >= pdfDoc.numPages) return;
  queueRenderPage(pageNum + 1);
});

// Zoom
zoomInBtn.addEventListener('click', () => {
  scale += 0.25;
  renderPage(pageNum);
});

zoomOutBtn.addEventListener('click', () => {
  scale = Math.max(0.25, scale - 0.25);
  renderPage(pageNum);
});
