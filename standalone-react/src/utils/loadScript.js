export function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      resolve();
      return;
    }

    const existing = document.querySelector(`script[data-inline-loader="${src}"]`) || document.querySelector(`script[src="${src}"]`);

    if (existing) {
      if (existing.dataset.loaded === "true" || existing.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      }

      const handleLoad = () => {
        existing.dataset.loaded = "true";
        existing.setAttribute("data-loaded", "true");
        existing.removeEventListener("load", handleLoad);
        resolve();
      };

      existing.addEventListener("load", handleLoad, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.inlineLoader = src;

    const handleLoad = () => {
      script.dataset.loaded = "true";
      script.setAttribute("data-loaded", "true");
      resolve();
    };

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.body.appendChild(script);
  });
}