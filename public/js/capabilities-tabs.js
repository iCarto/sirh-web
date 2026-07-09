(function () {
  const root = document.getElementById("capabilities-tabs");
  if (!root) return;

  const tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
  const panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
  if (tabs.length === 0 || panels.length === 0) return;

  const inactiveTabClasses = [
    "border-neutral-200",
    "bg-neutral-0",
    "hover:bg-primary-lighter/50",
    "hover:border-primary-light",
  ];
  const activeTabClasses = [
    "is-active",
    "border-primary-main",
    "bg-primary-lighter",
    "border-l-[3px]",
    "border-l-primary-main",
    "shadow-sm",
  ];

  function setTabClasses(tab, isActive) {
    inactiveTabClasses.forEach(function (cls) {
      tab.classList.toggle(cls, !isActive);
    });
    activeTabClasses.forEach(function (cls) {
      tab.classList.toggle(cls, isActive);
    });
  }

  function setPanelVisibility(activePanelId) {
    panels.forEach(function (panel, index) {
      const isActive = panel.id === activePanelId;
      const counter = panel.querySelector("[data-capability-counter]");
      panel.classList.toggle("hidden", !isActive);
      if (isActive) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
      if (counter) {
        counter.textContent = String(index + 1) + " / " + String(panels.length);
      }
    });
  }

  function activateTab(tab) {
    const panelId = tab.getAttribute("aria-controls");
    if (!panelId) return;

    tabs.forEach(function (candidate) {
      const isActive = candidate === tab;
      candidate.setAttribute("aria-selected", isActive ? "true" : "false");
      candidate.setAttribute("tabindex", isActive ? "0" : "-1");
      setTabClasses(candidate, isActive);
    });

    setPanelVisibility(panelId);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activateTab(tab);
    });
  });

  activateTab(tabs[0]);
})();
