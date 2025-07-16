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
        currentPanel.style.animation = 'fadeOut 0.3s ease forwards';
        targetPanel.style.display = 'block';
        targetPanel.style.opacity = 0;
        targetPanel.style.animation = 'fadeIn 0.3s ease forwards';

        setTimeout(() => {
          currentPanel.style.display = 'none';
          currentPanel.style.animation = '';
          currentPanel.classList.remove('active');

          targetPanel.classList.add('active');
          targetPanel.style.animation = '';
          targetPanel.style.opacity = '';
          currentPanel = targetPanel;
        }, 300);
      } else {
        targetPanel.style.display = 'block';
        requestAnimationFrame(() => {
          targetPanel.classList.add('active');
          currentPanel = targetPanel;
        });
      }
    });
  });
});
