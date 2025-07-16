document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const menuToggle = document.getElementById('menu-toggle');
  const leftBar = document.querySelector('.left-bar');
  const circleWrapper = document.querySelector('.circle-wrapper');
  const sideMenu = document.querySelector('.side-menu');

  menuToggle.addEventListener('click', () => {
    leftBar.classList.toggle('expanded');
    circleWrapper.classList.toggle('expanded');
    sideMenu.classList.toggle('expanded');
  });

  // Colored button panel toggle
  const buttons = document.querySelectorAll('.container');
  const panels = document.querySelectorAll('.expanded-panel');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-section');

      panels.forEach(panel => {
        if (panel.classList.contains(`${section}-panel`)) {
          if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            panel.classList.add('closing');
            setTimeout(() => {
              panel.classList.remove('closing');
              panel.style.display = 'none';
            }, 400);
          } else {
            panel.style.display = 'block';
            requestAnimationFrame(() => {
              panel.classList.add('active');
            });
          }
        } else {
          if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            panel.classList.add('closing');
            setTimeout(() => {
              panel.classList.remove('closing');
              panel.style.display = 'none';
            }, 400);
          }
        }
      });
    });
  });

  // Modal PDF preview logic
  const pdfModal = document.getElementById('pdfModal');
  const closeModal = document.getElementById('closeModal');

  // "Open" button in assignment card
  const openPdfButton = document.getElementById('openPdfButton');
  openPdfButton.addEventListener('click', () => {
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close modal button
  closeModal.addEventListener('click', () => {
    pdfModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close modal if clicking outside modal content
  pdfModal.addEventListener('click', (e) => {
    if (e.target === pdfModal) {
      pdfModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
      pdfModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

