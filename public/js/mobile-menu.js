(function () {
  const menu = document.querySelector(".mobile-menu");
  if (!menu) return;

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.removeAttribute("open");
    });
  });
})();
