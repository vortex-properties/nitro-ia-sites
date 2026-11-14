(() => {
  "use strict";
  // One authored scrollytelling sequence. Native scrolling: no snap, pin library or wheel interception.
  const root = document.querySelector("[data-story]");
  if (!root) return;
  const layout = root.querySelector("[data-story-layout]");
  const rail = root.querySelector("[data-story-rail]");
  const stage = root.querySelector("[data-story-stage]");
  const chapters = Array.from(root.querySelectorAll("[data-story-chapter]"));
  const jumps = Array.from(root.querySelectorAll("[data-story-jump]"));
  const line = root.querySelector("[data-story-line]");
  const counter = root.querySelector("[data-story-counter]");
  if (!layout || !rail || !stage || chapters.length !== 5 || jumps.length !== 5) return;

  const mobile = window.matchMedia("(max-width: 850px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  let selected = -1;
  let scheduled = false;

  function setStep(step) {
    if (selected === step) return;
    selected = step;
    stage.dataset.storyStep = String(step);
    if (counter) counter.textContent = String(step + 1).padStart(2, "0");
    chapters.forEach((chapter, index) => {
      chapter.dataset.active = String(index === step);
    });
    jumps.forEach((jump, index) => {
      if (index === step) jump.setAttribute("aria-current", "step");
      else jump.removeAttribute("aria-current");
    });
  }

  function render() {
    scheduled = false;
    const focus = window.innerHeight * (mobile.matches ? .75 : .52);
    const parent = rail.getBoundingClientRect();
    const progress = clamp((focus - parent.top) / Math.max(1, parent.height), 0, 1);
    if (line) line.style.transform = "scaleY(" + progress.toFixed(4) + ")";
    stage.style.setProperty("--story-stage-progress", progress.toFixed(4));
    let closest = 0;
    let nearest = Number.POSITIVE_INFINITY;
    chapters.forEach((chapter, index) => {
      const bounds = chapter.getBoundingClientRect();
      const center = bounds.top + bounds.height / 2;
      const distance = Math.abs(center - focus);
      if (distance < nearest) {
        nearest = distance;
        closest = index;
      }
    });
    setStep(closest);
  }

  function requestRender() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(render);
  }

  jumps.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      setStep(index);
      chapters[index].scrollIntoView({
        behavior: reduced.matches ? "instant" : "smooth",
        block: "center"
      });
    });
  });

  // The whole visual changes state only as the narrative chapter changes.
  // All text remains in the document without JS; the visual has a static first-state fallback.
  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender, { passive: true });
  window.addEventListener("pageshow", requestRender);
  mobile.addEventListener?.("change", requestRender);
  reduced.addEventListener?.("change", requestRender);
  requestRender();
})();
