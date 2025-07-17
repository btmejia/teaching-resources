document.addEventListener("DOMContentLoaded", () => {
  // === Mobile Sidebar Toggle ===
  const hamburger = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const closeSidebar = document.querySelector(".close-sidebar");

  if (hamburger && sidebar && overlay && closeSidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.add("open");
      overlay.classList.add("active");
    });

    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  // === Colored Button Panel Toggle ===
  const panels = document.querySelectorAll(".expanded-panel");
  const colorButtons = document.querySelectorAll(".color-section");

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const targetPanel = document.getElementById(targetId);

      panels.forEach((panel) => {
        if (panel !== targetPanel) {
          panel.classList.remove("active");
          panel.style.pointerEvents = "none";
          panel.style.opacity = "0";
          panel.style.transition = "opacity 0.5s ease";
        }
      });

      if (targetPanel.classList.contains("active")) {
        targetPanel.classList.remove("active");
        targetPanel.style.pointerEvents = "none";
        targetPanel.style.opacity = "0";
      } else {
        targetPanel.classList.add("active");
        targetPanel.style.pointerEvents = "auto";
        targetPanel.style.opacity = "1";
        targetPanel.style.transition = "opacity 0.5s ease";
      }
    });
  });
});
