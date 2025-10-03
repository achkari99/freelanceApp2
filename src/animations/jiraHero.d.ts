export type JiraHeroInstance = {
  destroy: () => void;
  pause: () => void;
  play: () => void;
  runScenario: () => Promise<void>;
};

export type JiraHeroOptions = {
  forceReduceMotion?: boolean;
};

export function initJiraHero(
  root: HTMLElement,
  options?: JiraHeroOptions
): JiraHeroInstance;
