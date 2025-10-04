const COLUMN_KEYS = ["plan", "progress", "review"];

const COLUMN_DATA = [
  {
    title: "Plan",
    key: COLUMN_KEYS[0],
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
    key: COLUMN_KEYS[1],
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
    key: COLUMN_KEYS[2],
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

const NEW_TASKS = {
  review: [
    {
      id: "review-sre-audit",
      heading: "SRE audit punch list",
      chips: [{ text: "Ops", tone: "green" }],
      description: "Finalize handoff notes before go-live approvals.",
      meta: { label: "Task", tone: "emerald", avatar: "SR" },
      progress: [0.54, 0.88],
      float: { amplitude: 7, speed: 0.58, phase: 0.92 },
      pulse: { speed: 0.74, phase: 0.32 }
    },
    {
      id: "review-release-comms",
      heading: "Draft release comms",
      chips: [{ text: "Launch", tone: "blue" }],
      description: "Bundle product notes and visuals for the rollout email.",
      meta: { label: "Story", tone: "blue", avatar: "MB" },
      progress: [0.36, 0.76],
      float: { amplitude: 8, speed: 0.63, phase: 1.4 },
      pulse: { speed: 0.68, phase: 1.2 }
    }
  ],
  progress: [
    {
      id: "progress-automation-handoff",
      heading: "Automation readiness checks",
      chips: [{ text: "Advanced", tone: "blue" }],
      description: "Verify rules, alerts, and dashboards before handoff.",
      meta: { label: "Task", tone: "amber", avatar: "DK" },
      progress: [0.25, 0.64],
      float: { amplitude: 9, speed: 0.6, phase: 0.35 },
      pulse: { speed: 0.7, phase: 0.4 }
    }
  ],
  plan: [
    {
      id: "plan-roadmap-refresh",
      heading: "Refresh roadmap scenarios",
      chips: [{ text: "Blueprint", tone: "blue" }],
      description: "Prioritize next iteration experiments for Q3 planning.",
      meta: { label: "Story", tone: "violet", avatar: "HN" },
      progress: [0.12, 0.44],
      float: { amplitude: 8, speed: 0.52, phase: 0.68 },
      pulse: { speed: 0.62, phase: 0.28 }
    }
  ]
};

const FLOATER_DATA = [
  { text: "Story", tone: "sky", left: "10%", top: "24%", amplitude: 18, axis: "y", speed: 0.45, phase: 0.2 },
  { text: "AI Assist", tone: "mint", left: "62%", top: "68%", amplitude: 20, axis: "x", speed: 0.4, phase: 0.8 },
  { text: "Bug fix", tone: "violet", left: "78%", top: "18%", amplitude: 16, axis: "y", speed: 0.37, phase: 1.6 }
];

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const EASE = "cubic-bezier(.25,.8,.25,1)";
const DURATIONS = {
  collapse: 460,
  expand: 520
};
const SCENARIO_DELAY = 1000;

const taskCursor = {
  review: 0,
  progress: 0,
  plan: 0
};

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
    const chipEl = createElement(
      "span",
      "jira-chip" + (chip.tone ? ` jira-chip--${chip.tone}` : "")
    );
    chipEl.textContent = chip.text;
    row.appendChild(chipEl);
  });
  return row;
}

function createCard(data) {
  const card = createElement(
    "article",
    "jira-card task" + (data.layer ? " jira-card--raised" : ""),
    data.id ? { "data-card-id": data.id } : undefined
  );
  if (data.layer) {
    card.setAttribute("data-elevation", String(data.layer));
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
    configuration: data
  };
}

function measureCardMetrics(card) {
  const rect = card.getBoundingClientRect();
  const styles = window.getComputedStyle(card);
  return {
    height: rect.height,
    paddingTop: parseFloat(styles.paddingTop) || 0,
    paddingBottom: parseFloat(styles.paddingBottom) || 0
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

  const frame = createElement("div", "jira-hero__frame");
  hero.appendChild(frame);

  const chrome = createElement("div", "jira-hero__chrome");
  const brand = createElement("div", "jira-hero__brand");
  const logo = createElement("span", "jira-hero__logo", { "aria-hidden": "true" });
  logo.textContent = "P";
  const brandCopy = createElement("div", "jira-hero__brand-copy");
  const brandName = createElement("span", "jira-hero__brand-name");
  brandName.textContent = "Product Pulse";
  const status = createElement("span", "jira-hero__status");
  status.textContent = "Live Process";
  brandCopy.appendChild(brandName);
  brandCopy.appendChild(status);
  brand.appendChild(logo);
  brand.appendChild(brandCopy);

  const controls = createElement("div", "jira-hero__controls");

  const presence = createElement("div", "jira-hero__presence", { "aria-label": "Team presence" });
  const presenceStack = createElement("div", "jira-hero__presence-stack");
  const presenceInitials = ["LA", "JP", "SM"];
  presenceInitials.forEach((initials, index) => {
    const avatar = createElement("span", "jira-hero__presence-avatar", {
      style: `--offset:${index}`
    });
    avatar.textContent = initials;
    presenceStack.appendChild(avatar);
  });
  const presenceMore = createElement("span", "jira-hero__presence-more");
  presenceMore.textContent = "+8";
  presence.appendChild(presenceStack);
  presence.appendChild(presenceMore);

  const searchForm = createElement("form", "jira-hero__search", { role: "search" });
  const searchIcon = createElement("span", "jira-hero__search-icon", { "aria-hidden": "true" });
  const searchField = createElement("input", "jira-hero__search-field", {
    type: "search",
    placeholder: "Search tasks",
    "aria-label": "Search tasks"
  });
  searchForm.appendChild(searchIcon);
  searchForm.appendChild(searchField);
  searchForm.addEventListener("submit", (event) => event.preventDefault());

  controls.appendChild(presence);
  controls.appendChild(searchForm);

  chrome.appendChild(brand);
  chrome.appendChild(controls);
  frame.appendChild(chrome);

  const board = createElement("div", "jira-hero__board");
  const headingsRow = createElement("div", "jira-hero__columns-head");
  const columnsWrap = createElement("div", "jira-hero__columns");
  board.appendChild(headingsRow);
  board.appendChild(columnsWrap);
  frame.appendChild(board);

  const columns = {};
  const cardStates = [];
  const progressStates = [];

  COLUMN_DATA.forEach((column) => {
    const headingCell = createElement("div", "jira-hero__column-title");
    headingCell.textContent = column.title;
    headingsRow.appendChild(headingCell);

    const columnEl = createElement("div", "jira-hero__column kanban-col", { "data-col": column.key });
    const mobileTitle = createElement("div", "jira-hero__column-mobile-title");
    mobileTitle.textContent = column.title;
    const listEl = createElement("div", "jira-hero__stack list");
    columnEl.appendChild(mobileTitle);
    columnEl.appendChild(listEl);
    columnsWrap.appendChild(columnEl);

    columns[column.key] = {
      column: columnEl,
      list: listEl
    };

    column.cards.forEach((cardData) => {
      const card = createCard(cardData);
      listEl.appendChild(card.element);
      cardStates.push({
        el: card.element,
        amplitude: cardData.float?.amplitude ?? 6,
        speed: cardData.float?.speed ?? 0.5,
        phase: cardData.float?.phase ?? 0
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
  frame.appendChild(floatersLayer);

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

  return { root, hero, board, columns, cardStates, progressStates, floaterStates, poster };
}
function initAnimation(scene) {
  let playing = false;
  let rafId = null;
  let startTime = 0;
  const pointer = {
    currentX: 0,
    currentY: 4,
    targetX: 0,
    targetY: 4
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
      if (!card.el?.isConnected) {
        return;
      }
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
    updatePointerTargets(0, 4);
  }

  return {
    start,
    stop,
    resetPointer,
    updatePointerTargets
  };
}

function getColumn(scene, key) {
  return scene.columns[key];
}

function wait(ms, timers) {
  return new Promise((resolve) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      resolve();
    }, ms);
    timers.add(id);
  });
}

function waitForTransition(element, duration, propertyName) {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }
    let resolved = false;
    const handle = (event) => {
      if (!propertyName || event.propertyName === propertyName) {
        cleanup();
      }
    };
    const cleanup = () => {
      if (resolved) return;
      resolved = true;
      element.removeEventListener("transitionend", handle);
      resolve();
    };
    element.addEventListener("transitionend", handle);
    window.setTimeout(cleanup, duration + 80);
  });
}

function getRowGap(list) {
  const gapValue = window.getComputedStyle(list).rowGap;
  const parsed = parseFloat(gapValue);
  return Number.isFinite(parsed) ? parsed : 0;
}

function animateHeightChange(list, fromHeight, toHeight, duration) {
  if (!list) {
    return Promise.resolve();
  }

  if (Math.abs(fromHeight - toHeight) < 0.5) {
    list.style.height = "";
    list.style.transition = "";
    list.style.overflow = "";
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    list.style.overflow = "hidden";
    list.style.height = `${fromHeight}px`;
    list.style.transition = `height ${duration}ms ${EASE}`;

    requestAnimationFrame(() => {
      list.style.height = `${Math.max(toHeight, 0)}px`;
    });

    const cleanup = () => {
      list.style.height = "";
      list.style.transition = "";
      list.style.overflow = "";
      resolve();
    };

    const onEnd = (event) => {
      if (event.propertyName === "height") {
        list.removeEventListener("transitionend", onEnd);
        cleanup();
      }
    };

    list.addEventListener("transitionend", onEnd);
    window.setTimeout(() => {
      list.removeEventListener("transitionend", onEnd);
      cleanup();
    }, duration + 80);
  });
}

function collapseTask(list, card, options) {
  if (!list || !card) {
    return Promise.resolve();
  }

  if (options.reducedMotion) {
    card.remove();
    return Promise.resolve();
  }

  const metrics = measureCardMetrics(card);
  const listHeightBefore = list.getBoundingClientRect().height;
  const rowGap = getRowGap(list);
  const siblings = Array.from(list.children).filter((node) => node !== card);
  const listHeightAfter = Math.max(
    listHeightBefore - metrics.height - (siblings.length > 0 ? rowGap : 0),
    0
  );

  card.classList.add("is-collapsing");
  card.style.overflow = "hidden";
  card.style.height = `${metrics.height}px`;
  card.style.paddingTop = `${metrics.paddingTop}px`;
  card.style.paddingBottom = `${metrics.paddingBottom}px`;
  card.style.opacity = "1";

  const cardAnimation = new Promise((resolve) => {
    requestAnimationFrame(() => {
      card.style.transition = `height ${DURATIONS.collapse}ms ${EASE}, padding ${DURATIONS.collapse}ms ${EASE}, opacity ${DURATIONS.collapse}ms ${EASE}`;
      requestAnimationFrame(() => {
        card.style.height = "0px";
        card.style.paddingTop = "0px";
        card.style.paddingBottom = "0px";
        card.style.opacity = "0";
      });
    });

    waitForTransition(card, DURATIONS.collapse, "height").then(() => {
      card.remove();
      resolve();
    });
  });

  return Promise.all([
    cardAnimation,
    animateHeightChange(list, listHeightBefore, listHeightAfter, DURATIONS.collapse)
  ]).then(() => {
    card.classList.remove("is-collapsing");
  });
}

function registerDynamicCard(scene, cardConfig, cardElement, progressEl) {
  scene.cardStates.push({
    el: cardElement,
    amplitude: cardConfig.float?.amplitude ?? 7,
    speed: cardConfig.float?.speed ?? 0.58,
    phase: cardConfig.float?.phase ?? Math.random() * Math.PI * 2
  });
  scene.progressStates.push({
    el: progressEl,
    min: clamp(cardConfig.progress?.[0] ?? 0.25, 0.05, 0.95),
    max: clamp(cardConfig.progress?.[1] ?? 0.85, 0.1, 1),
    speed: cardConfig.pulse?.speed ?? 0.68,
    phase: cardConfig.pulse?.phase ?? Math.random() * Math.PI * 2
  });
}

function appearTask(scene, columnKey, list, cardData, options) {
  if (!list || !cardData) {
    return Promise.resolve();
  }

  const beforeHeight = list.getBoundingClientRect().height;
  const card = createCard(cardData);
  const insertTarget = list.firstElementChild;
  list.insertBefore(card.element, insertTarget);
  registerDynamicCard(scene, cardData, card.element, card.progressEl);

  const tasks = Array.from(list.querySelectorAll(".task"));
  while (tasks.length > 3) {
    const extra = tasks.pop();
    if (extra && extra !== card.element) {
      extra.remove();
    }
  }

  if (options.reducedMotion) {
    return Promise.resolve();
  }

  const metrics = measureCardMetrics(card.element);
  const afterHeight = list.getBoundingClientRect().height;

  card.element.classList.add("is-expanding");
  card.element.style.overflow = "hidden";
  card.element.style.height = "0px";
  card.element.style.paddingTop = "0px";
  card.element.style.paddingBottom = "0px";
  card.element.style.opacity = "0";

  const cardAnimation = new Promise((resolve) => {
    requestAnimationFrame(() => {
      card.element.style.transition = `height ${DURATIONS.expand}ms ${EASE}, padding ${DURATIONS.expand}ms ${EASE}, opacity ${DURATIONS.expand}ms ${EASE}`;
      requestAnimationFrame(() => {
        card.element.style.height = `${metrics.height}px`;
        card.element.style.paddingTop = `${metrics.paddingTop}px`;
        card.element.style.paddingBottom = `${metrics.paddingBottom}px`;
        card.element.style.opacity = "1";
      });
    });

    waitForTransition(card.element, DURATIONS.expand, "height").then(() => {
      card.element.style.height = "";
      card.element.style.paddingTop = "";
      card.element.style.paddingBottom = "";
      card.element.style.opacity = "";
      card.element.style.transition = "";
      card.element.style.overflow = "";
      card.element.classList.remove("is-expanding");
      resolve();
    });
  });

  return Promise.all([
    cardAnimation,
    animateHeightChange(list, beforeHeight, afterHeight, DURATIONS.expand)
  ]);
}

function nextTaskData(columnKey) {
  const tasks = NEW_TASKS[columnKey] ?? [];
  const index = taskCursor[columnKey] ?? 0;
  const blueprint = tasks[index % tasks.length];
  taskCursor[columnKey] = index + 1;
  if (!blueprint) {
    return null;
  }
  return {
    ...blueprint,
    id: `${columnKey}-injected-${index}`
  };
}

function createScenario(scene, options) {
  let hasRun = false;
  let cancelled = false;
  const timers = new Set();
  let scenarioPromise = null;

  const shouldAbort = () => cancelled || !scene.root.isConnected;

  const runAnimated = async () => {
    const reviewColumn = getColumn(scene, "review");
    const progressColumn = getColumn(scene, "progress");
    const planColumn = getColumn(scene, "plan");
    if (!reviewColumn || !progressColumn || !planColumn) {
      return;
    }

    const reviewList = reviewColumn.list;
    const progressList = progressColumn.list;
    const planList = planColumn.list;

    if (shouldAbort()) return;
    await collapseTask(reviewList, reviewList.querySelector(".task:last-child"), options);
    if (shouldAbort()) return;
    await wait(SCENARIO_DELAY, timers);

    if (shouldAbort()) return;
    await appearTask(scene, "review", reviewList, nextTaskData("review"), options);

    if (shouldAbort()) return;
    await collapseTask(progressList, progressList.querySelector(".task:first-child"), options);
    if (shouldAbort()) return;
    await wait(SCENARIO_DELAY, timers);

    if (shouldAbort()) return;
    await appearTask(scene, "review", reviewList, nextTaskData("review"), options);

    if (shouldAbort()) return;
    await collapseTask(planList, planList.querySelector(".task:first-child"), options);
    if (shouldAbort()) return;
    await wait(SCENARIO_DELAY, timers);

    if (shouldAbort()) return;
    await appearTask(scene, "progress", progressList, nextTaskData("progress"), options);

    if (shouldAbort()) return;
    await appearTask(scene, "plan", planList, nextTaskData("plan"), options);
  };

  const runReduced = async () => {
    const reviewColumn = getColumn(scene, "review");
    const progressColumn = getColumn(scene, "progress");
    const planColumn = getColumn(scene, "plan");
    if (!reviewColumn || !progressColumn || !planColumn) {
      return;
    }

    const reviewList = reviewColumn.list;
    const progressList = progressColumn.list;
    const planList = planColumn.list;

    reviewList.querySelector(".task:last-child")?.remove();
    await wait(SCENARIO_DELAY, timers);
    reviewList.appendChild(createCard(nextTaskData("review")).element);

    progressList.querySelector(".task:first-child")?.remove();
    await wait(SCENARIO_DELAY, timers);
    reviewList.insertBefore(createCard(nextTaskData("review")).element, reviewList.firstChild);

    planList.querySelector(".task:first-child")?.remove();
    await wait(SCENARIO_DELAY, timers);
    progressList.appendChild(createCard(nextTaskData("progress")).element);
    planList.appendChild(createCard(nextTaskData("plan")).element);
  };

  const run = () => {
    if (hasRun) {
      return scenarioPromise ?? Promise.resolve();
    }
    hasRun = true;
    scenarioPromise = options.reducedMotion ? runReduced() : runAnimated();
    return scenarioPromise;
  };

  const cancel = () => {
    cancelled = true;
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
  };

  return { run, cancel };
}

export function initJiraHero(root, options = {}) {
  if (typeof window === "undefined" || !root) {
    return {
      destroy() {},
      pause() {},
      play() {},
      runScenario() {
        return Promise.resolve();
      }
    };
  }

  if (root.__jiraHeroInstance) {
    root.__jiraHeroInstance.destroy();
  }

  const scene = buildScene(root);
  const controller = initAnimation(scene);

  const motionQuery = window.matchMedia(MOTION_QUERY);
  let reducedMotion = options.forceReduceMotion ? true : motionQuery.matches;

  scene.hero.classList.toggle("jira-hero--poster", reducedMotion);

  let scenarioController = createScenario(scene, { reducedMotion });
  let scenarioStarted = false;
  let lastIntersecting = false;
  let scenarioPromise = null;

  const startScenario = () => {
    if (!scenarioStarted) {
      scenarioStarted = true;
      scenarioPromise = scenarioController.run();
    }
    return scenarioPromise ?? Promise.resolve();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target !== root) return;
        lastIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!reducedMotion && !document.hidden) {
            controller.start();
          } else {
            controller.stop();
          }
          if (!document.hidden) {
            startScenario();
          }
        } else {
          controller.stop();
        }
      });
    },
    { threshold: [0.2, 0.6], rootMargin: "0px 0px -10% 0px" }
  );
  observer.observe(root);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      controller.stop();
      return;
    }
    if (!reducedMotion && lastIntersecting) {
      controller.start();
    }
    if (lastIntersecting) {
      startScenario();
    }
  };

  const handleMotionChange = (event) => {
    reducedMotion = options.forceReduceMotion ? true : event.matches;
    scene.hero.classList.toggle("jira-hero--poster", reducedMotion);

    scenarioController.cancel();
    scenarioController = createScenario(scene, { reducedMotion });
    scenarioStarted = false;
    scenarioPromise = null;

    if (reducedMotion) {
      controller.stop();
    } else if (lastIntersecting && !document.hidden) {
      controller.start();
    }

    if (lastIntersecting) {
      startScenario();
    }
  };

  const handlePointerMove = (event) => {
    const rect = scene.board.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10 + 4;
    controller.updatePointerTargets(x, y);
  };

  const handlePointerLeave = () => {
    controller.resetPointer();
  };

  scene.hero.addEventListener("pointermove", handlePointerMove, { passive: true });
  scene.hero.addEventListener("pointerleave", handlePointerLeave);
  scene.hero.addEventListener("pointercancel", handlePointerLeave);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  motionQuery.addEventListener("change", handleMotionChange);

  const instance = {
    destroy() {
      controller.stop();
      observer.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      scene.hero.removeEventListener("pointermove", handlePointerMove);
      scene.hero.removeEventListener("pointerleave", handlePointerLeave);
      scene.hero.removeEventListener("pointercancel", handlePointerLeave);
      scenarioController.cancel();
      root.innerHTML = "";
      delete root.__jiraHeroInstance;
    },
    pause: () => controller.stop(),
    play: () => {
      if (!reducedMotion) {
        controller.start();
      }
    },
    runScenario: () => startScenario()
  };

  root.__jiraHeroInstance = instance;
  return instance;
}

