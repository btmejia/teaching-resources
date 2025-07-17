document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle elements
  const menuToggle = document.getElementById('menu-toggle');
  const leftBar = document.querySelector('.left-bar');
  const circleWrapper = document.querySelector('.circle-wrapper');
  const sideMenu = document.querySelector('.side-menu');

  // Mobile sidebar overlay elements
  const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
  const mobileSidebarClose = document.getElementById('mobileSidebarClose');

  // Desktop sidebar toggle and mobile overlay toggle
  menuToggle.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      // On mobile: open overlay and hide hamburger
      mobileSidebarOverlay.classList.add('active');
      mobileSidebarOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      circleWrapper.style.display = 'none';  // hide hamburger circle
    } else {
      // On desktop: toggle sidebar expansion
      leftBar.classList.toggle('expanded');
      circleWrapper.classList.toggle('expanded');
      sideMenu.classList.toggle('expanded');
    }
  });

  // Close button in mobile sidebar overlay
  mobileSidebarClose.addEventListener('click', () => {
    mobileSidebarOverlay.classList.remove('active');
    mobileSidebarOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    circleWrapper.style.display = 'flex'; // show hamburger circle again
  });

  // Close overlay if clicking outside menu links
  mobileSidebarOverlay.addEventListener('click', (e) => {
    if (e.target === mobileSidebarOverlay) {
      mobileSidebarOverlay.classList.remove('active');
      mobileSidebarOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      circleWrapper.style.display = 'flex';
    }
  });

  // Colored button panel toggle logic
  const buttons = document.querySelectorAll('.container');
  let currentPanel = null;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-section');
      const targetPanel = document.querySelector(`.expanded-panel.${section}-panel`);

      if (targetPanel === currentPanel) {
        // Close current panel
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
        if (window.innerWidth <= 768) {
          // On mobile: fade out current, fade in target panel (no slide)
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
          // On desktop: slide + fade animations as before
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
        }
      } else {
        // No panel open: just show target panel
        targetPanel.style.display = 'block';
        requestAnimationFrame(() => {
          targetPanel.classList.add('active');
          currentPanel = targetPanel;
        });
      }
    });
  });
});
