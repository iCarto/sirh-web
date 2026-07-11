(function () {
  const root = document.getElementById("capabilities-tabs");
  if (!root) return;

  const tabs = Array.prototype.slice.call(
    root.querySelectorAll('[role="tab"]'),
  );
  const panels = Array.prototype.slice.call(
    root.querySelectorAll('[role="tabpanel"]'),
  );
  if (tabs.length === 0 || panels.length === 0) return;

  const inactiveTabClasses = ["hover:bg-neutral-100"];
  const activeTabClasses = [
    "is-active",
    "bg-neutral-0",
    "border-t",
    "border-b",
    "border-t-primary-light",
    "border-b-primary-light",
    "border-l-4",
    "border-l-primary-dark",
    "lg:relative",
    "lg:z-10",
    "lg:rounded-r-none",
    "lg:-mr-px",
    "lg:border-r-0",
  ];
  const inactiveIconClasses = ["border", "border-neutral-200"];
  const activeIconClasses = ["border-2", "border-primary-dark"];

  const inactiveLabelClasses = ["text-neutral-900"];
  const activeLabelClasses = ["text-primary-dark"];

  function setTabClasses(tab, isActive) {
    inactiveTabClasses.forEach(function (cls) {
      tab.classList.toggle(cls, !isActive);
    });
    activeTabClasses.forEach(function (cls) {
      tab.classList.toggle(cls, isActive);
    });
    const icon = tab.querySelector(".capabilities-tab-icon");
    if (icon) {
      inactiveIconClasses.forEach(function (cls) {
        icon.classList.toggle(cls, !isActive);
      });
      activeIconClasses.forEach(function (cls) {
        icon.classList.toggle(cls, isActive);
      });
    }
    const label = tab.querySelector(".capabilities-tab-label");
    if (label) {
      inactiveLabelClasses.forEach(function (cls) {
        label.classList.toggle(cls, !isActive);
      });
      activeLabelClasses.forEach(function (cls) {
        label.classList.toggle(cls, isActive);
      });
    }
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
