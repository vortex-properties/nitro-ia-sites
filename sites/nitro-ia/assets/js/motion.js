(() => {
  "use strict";

  // Motion stays a layer of progressive enhancement.
  // Everything is readable when this script, animation, or IntersectionObserver is missing.
  const $ = selector => document.querySelector(selector);
  const visual = $(".hero-visual");
  const demo = $("[data-demo-controls]");
  const toggle = $("[data-demo-toggle]");
  const next = $("[data-demo-next]");
  const status = $("[data-demo-status]");
  const method = $("[data-method-steps]");
  const scrollMeter = $("[data-scroll-meter]");
  const brandMoment = $("[data-brand-moment]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const narrow = window.matchMedia("(max-width: 700px)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  let currentStep = 1;
  let timer = null;
  let heroVisible = false;
  let manuallyPaused = reduced.matches;
  let rafPending = false;
  let pointerRAF = 0;

  const statuses = [
    "01 / Entrada recebida",
    "02 / Contexto organizado",
    "03 / Próxima ação"
  ];

  function paintStep(step) {
    if (!visual || !status) return;
    currentStep = ((step % 3) + 3) % 3;
    visual.dataset.flowActive = "";
    visual.dataset.activeStage = String(currentStep);
    status.textContent = statuses[currentStep];
  }

  function stopTimer() {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
    if (visual) visual.dataset.playing = "false";
  }

  function updateControls() {
    if (!toggle || !demo) return;
    const active = Boolean(timer);
    demo.dataset.paused = String(!active);
    toggle.textContent = active ? "Pausar Ⅱ" : "Reproduzir ▷";
    toggle.setAttribute("aria-label", active ? "Pausar demonstração" : "Reproduzir demonstração");
    if (reduced.matches) {
      toggle.hidden = true;
      next.textContent = "Próxima etapa →";
    } else {
      toggle.hidden = false;
      next.textContent = "Avançar →";
    }
  }

  function mayPlay() {
    return !reduced.matches && !manuallyPaused && heroVisible &&
      document.visibilityState === "visible";
  }

  function tick() {
    timer = null;
    if (!mayPlay()) {
      stopTimer();
      updateControls();
      return;
    }
    paintStep(currentStep + 1);
    schedule();
  }

  function schedule() {
    stopTimer();
    if (mayPlay()) {
      timer = window.setTimeout(tick, 1750);
      visual.dataset.playing = "true";
    }
    updateControls();
  }

  if (visual && demo && toggle && next && status) {
    demo.hidden = false;
    paintStep(currentStep);

    // The autoplay is deliberately one localized interface story, never a timed tab.
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
        schedule();
      }, { threshold: 0.13 });
      observer.observe(visual);
    } else {
      heroVisible = true;
      schedule();
    }

    toggle.addEventListener("click", () => {
      manuallyPaused = Boolean(timer);
      if (!manuallyPaused) {
        paintStep(currentStep + 1);
      }
      schedule();
    });

    next.addEventListener("click", () => {
      manuallyPaused = true;
      stopTimer();
      paintStep(currentStep + 1);
      updateControls();
    });

    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener?.("change", () => {
      if (reduced.matches) manuallyPaused = true;
      schedule();
    });

    // A modest optical depth response, isolated to the hero.
    // No scroll-linked parallax, custom cursor, or layout reflow.
    visual.addEventListener("pointermove", event => {
      if (!finePointer.matches || reduced.matches || !heroVisible || pointerRAF) return;
      const rect = visual.getBoundingClientRect();
      const x = Math.max(-7, Math.min(7, ((event.clientX - rect.left) / rect.width - .5) * 14));
      const y = Math.max(-7, Math.min(7, ((event.clientY - rect.top) / rect.height - .5) * 14));
      pointerRAF = window.requestAnimationFrame(() => {
        pointerRAF = 0;
        visual.style.setProperty("--pointer-x", x.toFixed(2) + "px");
        visual.style.setProperty("--pointer-y", y.toFixed(2) + "px");
      });
    }, { passive: true });
    visual.addEventListener("pointerleave", () => {
      visual.style.setProperty("--pointer-x", "0px");
      visual.style.setProperty("--pointer-y", "0px");
    });
    updateControls();
  }

  // Stage changes in the existing accessible tab tour are user initiated.
  const tabs = document.querySelectorAll('[role="tab"][data-phase]');
  const panel = $(".phase-display");
  if (panel && tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener("click", () => { panel.dataset.activated = ""; });
      tab.addEventListener("keydown", event => {
        if (["ArrowRight","ArrowLeft","Home","End"].includes(event.key)) {
          panel.dataset.activated = "";
        }
      });
    });
  }

  // The scroll line communicates reading progress; the method line communicates process.
  function updateScrollIndicators() {
    rafPending = false;
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (scrollMeter) {
      const fraction = Math.min(1, Math.max(0, window.scrollY / scrollable));
      scrollMeter.style.transform = "scaleX(" + fraction.toFixed(4) + ")";
    }
    if (!method) return;
    const rect = method.getBoundingClientRect();
    const focalLine = window.innerHeight * .55;
    const progress = Math.max(0, Math.min(1, (focalLine - rect.top) / Math.max(1, rect.height)));
    method.style.setProperty("--method-progress", progress.toFixed(4));
    const steps = method.querySelectorAll(".method-step");
    const withinView = rect.bottom >= 0 && rect.top < window.innerHeight;
    steps.forEach((step, i) => {
      if (withinView && i === Math.min(steps.length - 1, Math.floor(progress * steps.length))) {
        step.dataset.currentStep = "true";
      } else {
        delete step.dataset.currentStep;
      }
    });
  }
  function queueScrollUpdate() {
    if (rafPending) return;
    rafPending = true;
    window.requestAnimationFrame(updateScrollIndicators);
  }
  window.addEventListener("scroll", queueScrollUpdate, { passive: true });
  window.addEventListener("resize", queueScrollUpdate, { passive: true });
  queueScrollUpdate();

  // A single authored brand arrival. No generic reveal animation on every card.
  if (brandMoment && !reduced.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        brandMoment.dataset.entered = "";
        observer.disconnect();
      }
    }, { threshold: 0.28 });
    observer.observe(brandMoment);
  }
})();
