document.addEventListener("DOMContentLoaded", function () {
  let touchStartX = 0;
  let touchEndX = 0;

  function handleGesture() {
    const width = window.innerWidth;

    // Applichiamo solo su telefoni (max 768px)
    if (width > 768) return;

    const sidebar = document.querySelector(".sidebar");
    const toc = document.querySelector(".quarto-margin-sidebar");

    const sidebarVisible = sidebar && sidebar.classList.contains("floating");
    const tocVisible = toc && toc.classList.contains("floating");

    const swipeDistance = touchEndX - touchStartX;

    // swipe destra
    if (swipeDistance > 80) {
      if (tocVisible) {
        toc.classList.remove("floating");
      } else if (sidebar) {
        sidebar.classList.add("floating");
      }
    }

    // swipe sinistra
    if (swipeDistance < -80) {
      if (sidebarVisible) {
        sidebar.classList.remove("floating");
      } else if (toc) {
        toc.classList.add("floating");
      }
    }
  }

  document.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });
});
