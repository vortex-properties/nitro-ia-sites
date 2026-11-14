(() => {
  "use strict";
  // This is an illustrative system simulation, not live customer data.
  // Keep the presentation functional without a backend, external JS or heavy rendering.

  const network = document.querySelector("[data-network]");
  const system = document.querySelector("[data-command-system]");
  if (!network || !system) return;

  const nodes = Array.from(network.querySelectorAll("[data-network-node]"));
  const tabs = Array.from(system.querySelectorAll("[data-command-tab]"));
  const trace = Array.from(system.querySelectorAll("[data-trace]"));
  const heroCounter = document.querySelector("[data-network-step]");
  const systemNumber = document.querySelector("[data-sys-number]");
  const systemTag = document.querySelector("[data-sys-tag]");
  const systemTitle = document.querySelector("[data-sys-title]");
  const systemDescription = document.querySelector("[data-sys-description]");
  const systemOutcome = document.querySelector("[data-sys-outcome]");
  const telemetryState = document.querySelector("[data-telemetry-state]");
  const systemProgress = document.querySelector("[data-system-progress]");
  const playToggle = document.querySelector("[data-play-toggle]");
  const heroToggle = document.querySelector("[data-hero-toggle]");
  const expandControl = document.querySelector("[data-command-expand]");
  const nextStep = document.querySelector("[data-next-step]");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");

  const modules = [
    {
      tag:"01 / CAPTURA", title:"Tudo começa com um sinal.",
      description:"Uma conversa chega. O contexto é identificado e uma oportunidade pode entrar em um fluxo estruturado.",
      outcome:"Informação capturada com continuidade.", status:"RECEBENDO", progress:18
    },
    {
      tag:"02 / INTELIGÊNCIA", title:"O contexto encontra uma lógica.",
      description:"Agentes e regras podem organizar a intenção, qualificar o caso e determinar qual etapa faz sentido a seguir.",
      outcome:"Critérios claros para a próxima decisão.", status:"ANALISANDO", progress:42
    },
    {
      tag:"03 / INTEGRAÇÃO", title:"Os sistemas passam a conversar.",
      description:"Informações de atendimento, agenda, CRM e outras ferramentas podem compartilhar o mesmo histórico de trabalho.",
      outcome:"Menos retrabalho entre ferramentas.", status:"CONECTANDO", progress:72
    },
    {
      tag:"04 / EXECUÇÃO", title:"A operação continua sem recomeçar.",
      description:"Encaminhamentos, atualizações e acompanhamento podem seguir um fluxo definido e observável.",
      outcome:"Ação preparada, contexto preservado.", status:"EXECUTANDO", progress:100
    }
  ];

  let index = 0;
  let paused = reduced.matches;
  let timer = 0;
  let inView = {network:false,system:false};
  let pointerFrame = 0;

  function setStage(next) {
    index = (next + modules.length) % modules.length;
    const content = modules[index];
    const label = String(index + 1).padStart(2, "0");

    network.dataset.state = String(index);
    system.dataset.state = String(index);
    network.style.setProperty("--stage-index", String(index));
    system.style.setProperty("--sys-pipe-progress", String(content.progress));

    if (heroCounter) heroCounter.textContent = label;
    if (systemNumber) systemNumber.textContent = label;
    if (systemTag) systemTag.textContent = content.tag;
    if (systemTitle) systemTitle.textContent = content.title;
    if (systemDescription) systemDescription.textContent = content.description;
    if (systemOutcome) systemOutcome.textContent = content.outcome;
    if (telemetryState) telemetryState.textContent = content.status;
    if (systemProgress) systemProgress.textContent = label + " / 04";

    nodes.forEach((item,i) => item.setAttribute("aria-pressed", String(i===index)));
    tabs.forEach((item,i) => item.setAttribute("aria-pressed", String(i===index)));
    trace.forEach((item,i) => item.dataset.active = String(i===index));
  }

  function stop() {
    if (timer) { clearTimeout(timer); timer = 0; }
    network.dataset.paused = "true";
    system.dataset.paused = "true";
  }
  function canPlay() {
    return !paused && !reduced.matches &&
      document.visibilityState === "visible" && (inView.network || inView.system);
  }
  function updatePlayButton() {
    const playing = canPlay();
    if (playToggle) {
      playToggle.setAttribute("aria-pressed", String(!paused));
      playToggle.textContent = paused ? "Reproduzir ▷" : "Pausar Ⅱ";
      playToggle.setAttribute("aria-label", paused ? "Reproduzir demonstração" : "Pausar demonstração");
      playToggle.hidden = reduced.matches;
    }
    if (heroToggle) {
      heroToggle.textContent = paused ? "Reproduzir ▷" : "Pausar Ⅱ";
      heroToggle.setAttribute("aria-label", paused ? "Reproduzir demonstração" : "Pausar demonstração");
      heroToggle.hidden = reduced.matches;
    }
    network.dataset.paused = String(!playing);
    system.dataset.paused = String(!playing);
  }
  function schedule() {
    stop();
    if (canPlay()) {
      timer = window.setTimeout(() => {
        timer = 0;
        setStage(index + 1);
        schedule();
      }, 3700);
    }
    updatePlayButton();
  }
  function choose(next) {
    paused = true;
    stop();
    setStage(next);
    updatePlayButton();
  }
  function togglePlayback() {
    if (reduced.matches) return;
    paused = !paused;
    schedule();
  }

  nodes.forEach(item => {
    item.addEventListener("click", () => choose(Number(item.dataset.networkNode)));
  });
  tabs.forEach(item => {
    item.addEventListener("click", () => choose(Number(item.dataset.commandTab)));
  });
  nextStep?.addEventListener("click", () => choose(index + 1));
  playToggle?.addEventListener("click", togglePlayback);
  heroToggle?.addEventListener("click", togglePlayback);

  if (expandControl) {
    if (!document.fullscreenEnabled || !system.requestFullscreen) {
      expandControl.hidden = true;
    } else {
      expandControl.addEventListener("click", async () => {
        try {
          if (document.fullscreenElement === system) await document.exitFullscreen();
          else await system.requestFullscreen();
        } catch (_err) { expandControl.textContent = "Tela cheia indisponível"; }
      });
      document.addEventListener("keydown", event => {
        if (event.key === "Escape" && document.fullscreenElement === system) {
          void document.exitFullscreen();
        }
      });
      document.addEventListener("fullscreenchange", () => {
        const open = document.fullscreenElement === system;
        expandControl.textContent = open ? "Sair da tela cheia ×" : "Expandir central ⤢";
        expandControl.setAttribute("aria-label", open ? "Sair da tela cheia" : "Expandir central de comando em tela cheia");
      });
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        inView[entry.target === network ? "network" : "system"] = entry.isIntersecting;
      });
      schedule();
    }, {threshold:.08});
    observer.observe(network);
    observer.observe(system);
  } else {
    inView.network = true;
    inView.system = true;
  }

  // Optical response is bounded to this one diagram. No scroll jacking or layout reflows.
  network.addEventListener("pointermove", event => {
    if (!fine.matches || reduced.matches || pointerFrame) return;
    const rect = network.getBoundingClientRect();
    const x = Math.max(-6,Math.min(6,((event.clientX-rect.left)/rect.width-.5)*12));
    const y = Math.max(-6,Math.min(6,((event.clientY-rect.top)/rect.height-.5)*12));
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      network.style.setProperty("--look-x", x.toFixed(1)+"px");
      network.style.setProperty("--look-y", y.toFixed(1)+"px");
    });
  }, {passive:true});
  network.addEventListener("pointerleave", () => {
    network.style.setProperty("--look-x","0px");
    network.style.setProperty("--look-y","0px");
  });

  document.addEventListener("visibilitychange",schedule);
  reduced.addEventListener?.("change", () => {
    if (reduced.matches) paused = true;
    schedule();
  });
  setStage(0);
  schedule();
})();
