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
  let currentPanel = null;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-section');
      const targetPanel = document.querySelector(`.expanded-panel.${section}-panel`);

      // If clicking the already open panel, close it normally
      if (targetPanel === currentPanel) {
        currentPanel.classList.remove('active');
        currentPanel.classList.add('closing');
        setTimeout(() => {
          currentPanel.classList.remove('closing');
          currentPanel.style.display = 'none';
          currentPanel = null;
        }, 400);
        return;
      }

      if (currentPanel) {
        // Show new panel behind old panel
        targetPanel.style.display = 'block';
        targetPanel.style.opacity = 1;
        targetPanel.style.position = 'absolute';
        targetPanel.style.top = '0';
        targetPanel.style.left = '50%';
        targetPanel.style.transform = 'translateX(-50%)';
        targetPanel.style.zIndex = '0';

        // Old panel on top to fade out
        currentPanel.style.animation = 'fadeOut 0.3s ease forwards';
        currentPanel.style.position = 'absolute';
        currentPanel.style.top = '0';
        currentPanel.style.left = '50%';
        currentPanel.style.transform = 'translateX(-50%)';
        currentPanel.style.zIndex = '1';

        setTimeout(() => {
          currentPanel.style.display = 'none';
          currentPanel.style.animation = '';
          currentPanel.style.position = '';
          currentPanel.style.top = '';
          currentPanel.style.left = '';
          currentPanel.style.transform = '';
          currentPanel.style.zIndex = '';
          currentPanel.classList.remove('active');

          targetPanel.classList.add('active');
          targetPanel.style.position = '';
          targetPanel.style.top = '';
          targetPanel.style.left = '';
          targetPanel.style.transform = '';
          targetPanel.style.zIndex = '';
          targetPanel.style.opacity = '';

          currentPanel = targetPanel;
        }, 300);
      } else {
        // No panel open, open normally with slideUp
        targetPanel.style.display = 'block';
        requestAnimationFrame(() => {
          targetPanel.classList.add('active');
          currentPanel = targetPanel;
        });
      }
    });
  });

  // Modal PDF preview logic
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
