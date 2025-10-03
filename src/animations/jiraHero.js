const COLUMN_DATA = [
  {
    title: "Plan",
    cards: [
      {
        id: "plan-adaptive-billing",
        heading: "Plan adaptive billing milestones",
        chips: [{ text: "Blueprint", tone: "blue" }],
        description: "Map usage, finance, and API signals into one launch calendar.",
        meta: { label: "Story", tone: "blue", avatar: "AL" },
        progress: [0.18, 0.62],
        float: { amplitude: 9, speed: 0.48, phase: 0.2 },
        pulse: { speed: 0.55, phase: 0.8 },
        layer: 1
      },
      {
        id: "plan-ai-escalation",
        heading: "Draft AI escalation rubric",
        chips: [{ text: "Automation", tone: "purple" }],
        description: "Score incidents with intent, severity, and customer impact weightings.",
        meta: { label: "Task", tone: "violet", avatar: "EV" },
        progress: [0.28, 0.54],
        float: { amplitude: 7, speed: 0.62, phase: 1.4 },
        pulse: { speed: 0.75, phase: 1.1 },
        layer: 0
      },
      {
        id: "plan-feedback-grid",
        heading: "Cluster research feedback",
        chips: [{ text: "Insights", tone: "green" }],
        description: "Surface repeating patterns across research calls and NPS verbatims.",
        meta: { label: "Story", tone: "emerald", avatar: "JS" },
        progress: [0.22, 0.46],
        float: { amplitude: 8, speed: 0.51, phase: 2.2 },
        pulse: { speed: 0.65, phase: 0.35 },
        layer: 0
      }
    ]
  },
  {
    title: "In Progress",
    cards: [
      {
        id: "progress-ai-handovers",
        heading: "Prototype AI handover briefs",
        chips: [{ text: "Advanced", tone: "blue" }],
        description: "Generate summaries for analysts before stand-up each morning.",
        meta: { label: "Story", tone: "blue", avatar: "MN" },
        progress: [0.42, 0.86],
        float: { amplitude: 11, speed: 0.56, phase: 0.65 },
        pulse: { speed: 0.7, phase: 0.15 },
        layer: 1
      },
      {
        id: "progress-dashboard-polish",
        heading: "Polish KPI dashboard visuals",
        chips: [{ text: "Craft", tone: "orange" }],
        description: "Line up typography, contrast, and animation handoffs for launch.",
        meta: { label: "Bug", tone: "amber", avatar: "LT" },
        progress: [0.36, 0.72],
        float: { amplitude: 6, speed: 0.74, phase: 1.6 },
        pulse: { speed: 0.82, phase: 0.55 },
        layer: 0
      },
      {
        id: "progress-command-center",
        heading: "Design command center tiles",
        chips: [{ text: "Ops", tone: "green" }],
        description: "Highlight at-risk workflows and automation health for support teams.",
        meta: { label: "Task", tone: "emerald", avatar: "PR" },
        progress: [0.48, 0.9],
        float: { amplitude: 10, speed: 0.6, phase: 2.5 },
        pulse: { speed: 0.68, phase: 1.45 },
        layer: 0
      }
    ]
  },
  {
    title: "Review",
    cards: [
      {
        id: "review-api-launch",
        heading: "QA adaptive API onboarding",
        chips: [{ text: "Launch", tone: "blue" }],
        description: "Confirm guardrails, rate limits, and partner messaging alignment.",
        meta: { label: "Story", tone: "blue", avatar: "QH" },
        progress: [0.58, 0.98],
        float: { amplitude: 8, speed: 0.52, phase: 0.4 },
        pulse: { speed: 0.62, phase: 1.9 },
        layer: 1
      },
      {
        id: "review-retro",
        heading: "Compile sprint retro signals",
        chips: [{ text: "Insights", tone: "green" }],
        description: "Snapshot top wins, blockers, and automation recommendations.",
        meta: { label: "Task", tone: "emerald", avatar: "CY" },
        progress: [0.32, 0.68],
        float: { amplitude: 6, speed: 0.63, phase: 1.1 },
        pulse: { speed: 0.76, phase: 0.4 },
        layer: 0
      },
      {
        id: "review-showcase",
        heading: "Prepare showcase clips",
        chips: [{ text: "Highlights", tone: "purple" }],
        description: "Trim demo sequences for leadership sync and public launch.",
        meta: { label: "Story", tone: "violet", avatar: "VP" },
        progress: [0.44, 0.74],
        float: { amplitude: 7, speed: 0.71, phase: 2.4 },
        pulse: { speed: 0.8, phase: 1.05 },
        layer: 0
      }
    ]
  }
];

const FLOATER_DATA = [
  { text: "Story", tone: "sky", left: "10%", top: "24%", amplitude: 18, axis: "y", speed: 0.45, phase: 0.2 },
  { text: "AI Assist", tone: "mint", left: "62%", top: "68%", amplitude: 20, axis: "x", speed: 0.4, phase: 0.8 },
  { text: "Bug fix", tone: "violet", left: "78%", top: "18%", amplitude: 16, axis: "y", speed: 0.37, phase: 1.6 }
];

const POINTER_REST = { x: 0, y: 4 };
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function createElement(tag, className, attrs) {
  const el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  if (attrs) {
    Object.entries(attrs).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        el.setAttribute(key, String(val));
      }
    });
  }
  return el;
}

function createChipRow(chips = []) {
  if (!chips.length) return null;
  const row = createElement("div", "jira-chip-row");
  chips.forEach((chip) => {
    const chipEl = createElement("span", "jira-chip" + (chip.tone ? ` jira-chip--${chip.tone}` : ""));
    chipEl.textContent = chip.text;
    row.appendChild(chipEl);
  });
  return row;
}

function createCard(data) {
  const card = createElement("article", "jira-card" + (data.layer ? " jira-card--raised" : ""));
  if (data.layer) {
    card.setAttribute("data-elevation", String(data.layer));
  }
  if (data.id) {
    card.setAttribute("data-card-id", data.id);
  }

  const chipRow = createChipRow(data.chips);
  if (chipRow) {
    card.appendChild(chipRow);
  }

  if (data.heading) {
    const heading = createElement("h4", "jira-card__heading");
    heading.textContent = data.heading;
    card.appendChild(heading);
  }

  if (data.description) {
    const description = createElement("p", "jira-card__description");
    description.textContent = data.description;
    card.appendChild(description);
  }

  const metaRow = createElement("div", "jira-card__meta");
  const pill = createElement("span", "jira-pill");
  pill.textContent = data.meta?.label ?? "Story";
  if (data.meta?.tone) {
    pill.dataset.tone = data.meta.tone;
  }
  metaRow.appendChild(pill);

  const avatar = createElement("span", "jira-avatar");
  avatar.textContent = data.meta?.avatar ?? "JD";
  metaRow.appendChild(avatar);
  card.appendChild(metaRow);

  const progress = createElement("div", "jira-progress");
  const fill = document.createElement("span");
  const min = Array.isArray(data.progress) ? clamp(data.progress[0], 0, 1) : 0.25;
  fill.style.transform = `scaleX(${min})`;
  progress.style.setProperty("--progress", `${Math.round(min * 100)}%`);
  progress.appendChild(fill);
  card.appendChild(progress);

  return {
    element: card,
    progressEl: fill,
    baseShadow: data.layer ? 30 : 24
  };
}

function createPoster(hero) {
  const poster = createElement("div", "jira-hero__poster");
  const glow = createElement("div", "jira-hero__poster-glow");
  const grid = createElement("div", "jira-hero__poster-grid");
  for (let i = 0; i < 9; i += 1) {
    grid.appendChild(createElement("div", "jira-hero__poster-card"));
  }
  const content = createElement("div", "jira-hero__poster-content");
  content.textContent = "Jira motion snapshot";

  poster.appendChild(glow);
  poster.appendChild(grid);
  poster.appendChild(content);
  hero.appendChild(poster);
  return poster;
}

function buildScene(root) {
  root.innerHTML = "";
  const hero = createElement("div", "jira-hero");
  root.appendChild(hero);

  const wrapper = createElement("div", "jira-hero__wrapper");
  const board = createElement("div", "jira-hero__board");
  wrapper.appendChild(board);
  hero.appendChild(wrapper);

  const cardStates = [];
  const progressStates = [];

  COLUMN_DATA.forEach((column) => {
    const columnEl = createElement("div", "jira-hero__column", { "data-title": column.title });
    const stack = createElement("div", "jira-hero__stack");
    columnEl.appendChild(stack);
    board.appendChild(columnEl);

    column.cards.forEach((cardData) => {
      const card = createCard(cardData);
      stack.appendChild(card.element);
      cardStates.push({
        el: card.element,
        amplitude: cardData.float?.amplitude ?? 6,
        speed: cardData.float?.speed ?? 0.5,
        phase: cardData.float?.phase ?? 0,
        baseShadow: card.baseShadow,
        layer: cardData.layer ?? 0
      });
      progressStates.push({
        el: card.progressEl,
        min: clamp(cardData.progress?.[0] ?? 0.3, 0.05, 0.95),
        max: clamp(cardData.progress?.[1] ?? 0.9, 0.1, 1),
        speed: cardData.pulse?.speed ?? 0.6,
        phase: cardData.pulse?.phase ?? 0
      });
    });
  });

  const floatersLayer = createElement("div", "jira-hero__floaters");
  hero.appendChild(floatersLayer);

  const floaterStates = FLOATER_DATA.map((floater) => {
    const floaterEl = createElement("span", "jira-floater", { "data-tone": floater.tone });
    floaterEl.style.left = floater.left;
    floaterEl.style.top = floater.top;
    floaterEl.textContent = floater.text;
    floatersLayer.appendChild(floaterEl);
    return {
      el: floaterEl,
      amplitude: floater.amplitude ?? 14,
      speed: floater.speed ?? 0.45,
      phase: floater.phase ?? 0,
      axis: floater.axis === "x" ? "x" : "y"
    };
  });

  const poster = createPoster(hero);

  return { root, hero, board, cardStates, progressStates, floaterStates, poster };
}

function initAnimation(scene, options = {}) {
  let playing = false;
  let rafId = null;
  let startTime = 0;
  const pointer = {
    currentX: POINTER_REST.x,
    currentY: POINTER_REST.y,
    targetX: POINTER_REST.x,
    targetY: POINTER_REST.y
  };

  function updatePointerTargets(x, y) {
    pointer.targetX = clamp(x, -10, 10);
    pointer.targetY = clamp(y, 0, 8);
  }

  function frame(now) {
    if (!playing) {
      return;
    }
    if (!startTime) {
      startTime = now;
    }
    const elapsed = (now - startTime) / 1000;

    scene.cardStates.forEach((card) => {
      const offset = Math.sin(elapsed * card.speed + card.phase) * card.amplitude;
      card.el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });

    scene.progressStates.forEach((progress) => {
      const loop = (Math.sin(elapsed * progress.speed + progress.phase) + 1) / 2;
      const value = progress.min + (progress.max - progress.min) * loop;
      progress.el.style.transform = `scaleX(${value})`;
    });

    scene.floaterStates.forEach((floater) => {
      const delta = Math.sin(elapsed * floater.speed + floater.phase) * floater.amplitude;
      const translateX = floater.axis === "x" ? delta : 0;
      const translateY = floater.axis === "y" ? delta : 0;
      floater.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    });

    pointer.currentX += (pointer.targetX - pointer.currentX) * 0.08;
    pointer.currentY += (pointer.targetY - pointer.currentY) * 0.08;
    scene.board.style.transform = `rotateX(${pointer.currentY}deg) rotateY(${pointer.currentX}deg)`;

    rafId = window.requestAnimationFrame(frame);
  }

  function start() {
    if (playing) return;
    playing = true;
    startTime = 0;
    rafId = window.requestAnimationFrame(frame);
  }

  function stop() {
    if (!playing) return;
    playing = false;
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function resetPointer() {
    updatePointerTargets(POINTER_REST.x, POINTER_REST.y);
  }

  return {
    start,
    stop,
    resetPointer,
    updatePointerTargets,
    pointer
  };
}

export function initJiraHero(root, options = {}) {
  if (typeof window === "undefined" || !root) {
    return {
      destroy() {},
      pause() {},
      play() {}
    };
  }

  if (root.__jiraHeroInstance) {
    root.__jiraHeroInstance.destroy();
  }

  const scene = buildScene(root);
  const controller = initAnimation(scene, options);

  let isIntersecting = false;
  const motionQuery = window.matchMedia(MOTION_QUERY);
  let reducedMotion = options.forceReduceMotion ? true : motionQuery.matches;

  scene.hero.classList.toggle("jira-hero--poster", reducedMotion);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target !== root) return;
        isIntersecting = entry.isIntersecting;
        if (reducedMotion || document.hidden) {
          controller.stop();
          return;
        }
        if (isIntersecting) {
          controller.start();
        } else {
          controller.stop();
        }
      });
    },
    { threshold: [0.2, 0.6], rootMargin: "0px 0px -10% 0px" }
  );
  observer.observe(root);

  function handleVisibilityChange() {
    if (document.hidden) {
      controller.stop();
      return;
    }
    if (!reducedMotion && isIntersecting) {
      controller.start();
    }
  }

  function handlePointerMove(event) {
    const rect = scene.board.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10 + POINTER_REST.y;
    controller.updatePointerTargets(x, y);
  }

  function handlePointerLeave() {
    controller.resetPointer();
  }

  function handleMotionChange(event) {
    reducedMotion = options.forceReduceMotion ? true : event.matches;
    scene.hero.classList.toggle("jira-hero--poster", reducedMotion);
    if (reducedMotion) {
      controller.stop();
    } else if (isIntersecting && !document.hidden) {
      controller.start();
    }
  }

  scene.hero.addEventListener("pointermove", handlePointerMove, { passive: true });
  scene.hero.addEventListener("pointerleave", handlePointerLeave);
  scene.hero.addEventListener("pointercancel", handlePointerLeave);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  motionQuery.addEventListener("change", handleMotionChange);

  if (!reducedMotion) {
    controller.start();
  }

  const instance = {
    destroy() {
      controller.stop();
      observer.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      scene.hero.removeEventListener("pointermove", handlePointerMove);
      scene.hero.removeEventListener("pointerleave", handlePointerLeave);
      scene.hero.removeEventListener("pointercancel", handlePointerLeave);
      root.innerHTML = "";
      delete root.__jiraHeroInstance;
    },
    pause: () => controller.stop(),
    play: () => {
      if (!reducedMotion) {
        controller.start();
      }
    }
  };

  root.__jiraHeroInstance = instance;
  return instance;
}
