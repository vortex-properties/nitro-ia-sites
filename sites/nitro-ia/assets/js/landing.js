(() => {
  "use strict";

  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
      mobileMenu.hidden = true;
    };
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
      mobileMenu.hidden = isOpen;
    });
    mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !mobileMenu.hidden) {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener("click", event => {
      if (!mobileMenu.hidden && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000) closeMenu();
    });
  }

  const tabs = Array.from(document.querySelectorAll('[role="tab"][data-phase]'));
  const display = document.querySelector(".phase-display");
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"][data-panel]'));

  if (tabs.length && display && panels.length) {
    const activate = (nextTab, moveFocus = false) => {
      const phase = nextTab.dataset.phase;
      tabs.forEach(tab => {
        const selected = tab === nextTab;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(panel => {
        panel.hidden = panel.dataset.panel !== phase;
      });
      display.dataset.current = phase;
      if (moveFocus) nextTab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", event => {
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(tabs[next], true);
      });
    });
    activate(tabs[0]);
  }
})();
