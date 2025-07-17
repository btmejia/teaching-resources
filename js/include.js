document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const leftBar = document.querySelector('.left-bar');
  const circleWrapper = document.querySelector('.circle-wrapper');
  const sideMenu = document.querySelector('.side-menu');

  const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
  const mobileSidebarClose = document.getElementById('mobileSidebarClose');

  menuToggle.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      // MOBILE: show full screen overlay
      mobileSidebarOverlay.classList.add('active');
      mobileSidebarOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      // DESKTOP: toggle sidebar width
      leftBar.classList.toggle('expanded');
      circleWrapper.classList.toggle('expanded');
      sideMenu.classList.toggle('expanded');
    }
  });

  mobileSidebarClose.addEventListener('click', () => {
    mobileSidebarOverlay.classList.remove('active');
    mobileSidebarOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });

  // Close overlay if clicking outside the menu area
  mobileSidebarOverlay.addEventListener('click', e => {
    if (e.target === mobileSidebarOverlay) {
      mobileSidebarClose.click();
    }
  });

  // Close overlay on Escape key press
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileSidebarOverlay.classList.contains('active')) {
      mobileSidebarClose.click();
    }
  });
});
