(() => {
  "use strict";
  // Native scroll drives exactly one authored film. No wheel interception.
  const progress = document.querySelector("[data-ed-scroll-progress]");
  const film = document.querySelector("[data-ed-film]");
  const runway = document.querySelector("[data-ed-runway]");
  const stage = document.querySelector(".ed-film-stage");
  const sticky = document.querySelector(".ed-film-sticky");
  const filmProgress = document.querySelector("[data-ed-film-progress]");
  const count = document.querySelector("[data-ed-scene-number]");
  const jumps = Array.from(document.querySelectorAll("[data-ed-jump]"));
  const art = document.querySelector("[data-ed-hero-art]");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const compact = matchMedia("(max-width: 760px)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
  let previous = -1;
  let pending = false;
  let pointerPending = 0;

  function setAct(next) {
    if (!stage || previous === next) return;
    previous = next;
    stage.dataset.act = String(next);
    if (sticky) sticky.dataset.act = String(next);
    if (count) count.textContent = String(next + 1).padStart(2,"0");
    jumps.forEach((a,i) => {
      if (i === next) a.setAttribute("aria-current","step");
      else a.removeAttribute("aria-current");
    });
  }

  function draw() {
    pending = false;
    const total = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    if (progress) progress.style.transform = "scaleX(" + clamp(scrollY / total,0,1).toFixed(4) + ")";
    if (!runway || !stage) return;
    if (compact.matches) {
      // Every act is static/readable on touch: no sticky scene or auto playback.
      setAct(0);
      if (filmProgress) filmProgress.style.setProperty("--ed-progress","1");
      return;
    }
    const rect = runway.getBoundingClientRect();
    const stickyHeight = Math.max(1,innerHeight - parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header")) || innerHeight - 74);
    const scrollRange = Math.max(1,rect.height - stickyHeight);
    const ratio = clamp(-rect.top / scrollRange, 0, 1);
    const scene = Math.min(2, Math.floor(ratio * 3));
    setAct(scene);
    if (filmProgress) filmProgress.style.setProperty("--ed-progress", ratio.toFixed(4));
  }

  function requestDraw() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(draw);
  }

  jumps.forEach((jump,index) => {
    jump.addEventListener("click", event => {
      if (!runway || compact.matches) return;
      event.preventDefault();
      const height = runway.getBoundingClientRect().height;
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header")) || 74;
      const range = Math.max(1,height - (innerHeight - header));
      const destination = runway.getBoundingClientRect().top + scrollY + range * ((index + .42) / 3);
      setAct(index);
      window.scrollTo({top:destination,behavior:reduced.matches ? "instant":"smooth"});
    });
  });

  if (art) {
    art.addEventListener("pointermove", event => {
      if (!fine.matches || reduced.matches || pointerPending) return;
      const rect = art.getBoundingClientRect();
      const x = clamp(((event.clientX - rect.left) / rect.width - .5) * 13,-7,7);
      const y = clamp(((event.clientY - rect.top) / rect.height - .5) * 13,-7,7);
      pointerPending = requestAnimationFrame(() => {
        pointerPending = 0;
        art.style.setProperty("--art-x",x.toFixed(1)+"px");
        art.style.setProperty("--art-y",y.toFixed(1)+"px");
      });
    },{passive:true});
    art.addEventListener("pointerleave",() => {
      art.style.setProperty("--art-x","0px");
      art.style.setProperty("--art-y","0px");
    });
  }
  window.addEventListener("scroll",requestDraw,{passive:true});
  window.addEventListener("resize",requestDraw,{passive:true});
  window.addEventListener("pageshow",requestDraw);
  compact.addEventListener?.("change",requestDraw);
  requestDraw();
})();
