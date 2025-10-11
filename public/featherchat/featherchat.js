const CSS_URL = "/featherchat/featherchat.css";
const ICON_URL = "/featherchat/icon.svg";
const CONTEXT_CACHE_KEY = "featherchat_context";
const STATE_KEY = "featherchat_open";

const SELECTORS = [
  "meta[name='description']",
  "meta[property^='og:']",
  "script[type='application/ld+json']",
  "[data-faq]",
  "[data-help]",
  "[data-skill]",
  "[data-service]",
  "main h1",
  "main h2",
  "main h3",
  "main p",
  "footer address",
  "a[href^='mailto:']",
  "a[href^='tel:']"
];

const DEFAULT_SUGGESTIONS = [
  "Can you summarize what you build?",
  "How can I start a project?",
  "What services do you offer?"
];

function ensureStyles(shadowRoot) {
  if (ensureStyles.loaded) return;
  ensureStyles.loaded = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = CSS_URL;
  shadowRoot.appendChild(link);
}
ensureStyles.loaded = false;

function createMessage(role, text) {
  const article = document.createElement("article");
  article.className = `fc-message fc-message-${role}`;
  const bubble = document.createElement("div");
  bubble.className = "fc-bubble-msg";
  bubble.textContent = text;
  article.appendChild(bubble);

  const copy = document.createElement("button");
  copy.className = "fc-copy-btn";
  copy.type = "button";
  copy.textContent = "Copy";
  copy.addEventListener("click", () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    copy.textContent = "Copied";
    setTimeout(() => (copy.textContent = "Copy"), 1500);
  });
  article.appendChild(copy);
  return article;
}

async function extractContext() {
  const cached = sessionStorage.getItem(CONTEXT_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      /* ignore */
    }
  }

  const context = {
    page_title: document.title.slice(0, 120),
    meta: {},
    headings: [],
    services: [],
    skills: [],
    contact: [],
    faq: [],
    summary: "",
  };

  SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      if (node.tagName === "META") {
        const key = node.getAttribute("name") || node.getAttribute("property");
        const val = node.getAttribute("content") || "";
        if (key && val) context.meta[key] = val.slice(0, 280);
        return;
      }

      if (node.tagName === "SCRIPT") {
        try {
          const json = JSON.parse(node.textContent || "{}");
          context.meta.jsonld = json;
        } catch {
          /* ignore */
        }
        return;
      }

      if (node.hasAttribute("data-faq")) {
        const question = node.getAttribute("data-question") || node.textContent || "";
        const answer = node.getAttribute("data-answer") || "";
        if (question.trim() && answer.trim()) {
          context.faq.push({
            question: question.trim().slice(0, 200),
            answer: answer.trim().slice(0, 400),
          });
        }
        return;
      }

      if (node.hasAttribute("data-service")) {
        const text = node.textContent?.trim();
        if (text) context.services.push(text.slice(0, 120));
        return;
      }

      if (node.hasAttribute("data-skill")) {
        const text = node.textContent?.trim();
        if (text) context.skills.push(text.slice(0, 120));
        return;
      }

      if (node.tagName === "A") {
        const href = node.getAttribute("href") || "";
        if (/^mailto:|^tel:/.test(href)) {
          context.contact.push(href.slice(0, 160));
        }
        return;
      }

      const text = node.textContent?.trim();
      if (!text) return;

      if (/^H[1-3]$/.test(node.tagName)) {
        context.headings.push(text.slice(0, 160));
        return;
      }

      if (node.tagName === "P" && context.summary.length < 600) {
        context.summary += " " + text.slice(0, 240);
      }
    });
  });

  context.summary = context.summary.trim().slice(0, 600);
  const json = JSON.stringify(context);
  const limited = json.length > 4096 ? JSON.parse(json.slice(0, 4096)) : context;
  sessionStorage.setItem(CONTEXT_CACHE_KEY, JSON.stringify(limited));
  return limited;
}

function streamToText(response, onChunk) {
  const reader = response.body?.getReader();
  if (!reader) return Promise.resolve("");
  const decoder = new TextDecoder();
  let result = "";

  return new Promise(async (resolve, reject) => {
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        chunk
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.startsWith("data:"))
          .forEach((line) => {
            const payload = line.slice(5).trim();
            if (!payload || payload === "{}") return;
            try {
              const json = JSON.parse(payload);
              if (json.token) {
                result += json.token;
                onChunk(json.token);
              }
            } catch {
              /* ignore */
            }
          });
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

class FeatherChat extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>@import "${CSS_URL}";</style>
      <button class="fc-bubble" type="button" aria-label="Open chat">
        <span class="fc-icon" aria-hidden="true"></span>
      </button>
      <section class="fc-panel" role="dialog" aria-modal="false" aria-hidden="true" data-open="false">
        <header class="fc-header">
          <div>
            <h2 class="fc-title"></h2>
            <p class="fc-subtitle"></p>
          </div>
          <button class="fc-close" type="button" aria-label="Close chat">×</button>
        </header>
        <main class="fc-body" role="log" aria-live="polite"></main>
        <footer class="fc-footer">
          <div class="fc-suggestions" role="list"></div>
          <div class="fc-input-wrapper">
            <textarea class="fc-input" rows="1" placeholder="Type your message" aria-label="Message"></textarea>
            <button class="fc-send" type="button">Send</button>
          </div>
        </footer>
      </section>
    `;

    ensureStyles(this.shadowRoot);

    this.state = {
      open: false,
      busy: false,
      contextPromise: null,
      messages: [],
    };
    this._ready = false;
  }

  static get observedAttributes() {
    return ["app-name", "welcome", "theme"];
  }

  attributeChangedCallback() {
    if (!this._ready) return;
    this.updateTexts();
  }

  connectedCallback() {
    this.cacheElements();
    this.addEventListeners();
    this._ready = true;
    this.updateTexts();
    this.restoreState();
  }

  cacheElements() {
    const root = this.shadowRoot;
    this.$bubble = root.querySelector(".fc-bubble");
    this.$panel = root.querySelector(".fc-panel");
    this.$title = root.querySelector(".fc-title");
    this.$subtitle = root.querySelector(".fc-subtitle");
    this.$close = root.querySelector(".fc-close");
    this.$body = root.querySelector(".fc-body");
    this.$suggestions = root.querySelector(".fc-suggestions");
    this.$input = root.querySelector(".fc-input");
    this.$send = root.querySelector(".fc-send");
  }

  addEventListeners() {
    this.$bubble.addEventListener("click", () => this.toggle());
    this.$close.addEventListener("click", () => this.close());
    this.$send.addEventListener("click", () => this.handleSubmit());
    this.$input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.close();
        return;
      }
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        this.handleSubmit();
      }
    });

    DEFAULT_SUGGESTIONS.forEach((text) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "fc-chip";
      button.textContent = text;
      button.addEventListener("click", () => {
        this.$input.value = text;
        this.handleSubmit();
      });
      this.$suggestions.appendChild(button);
    });
  }

  updateTexts() {
    if (!this.$title || !this.$subtitle) return;
    const appName = this.getAttribute("app-name") || "FeatherChat";
    const welcome = this.getAttribute("welcome") || "Hi! How can I help?";
    const theme = this.getAttribute("theme") || "auto";
    this.$title.textContent = appName;
    this.$subtitle.textContent = welcome;
    this.setAttribute("data-theme", theme);
  }

  restoreState() {
    const saved = sessionStorage.getItem(STATE_KEY);
    if (saved === "open") {
      this.open(false);
    }
  }

  toggle() {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  }

  open(save = true) {
    this.state.open = true;
    this.$panel.dataset.open = "true";
    this.$panel.setAttribute("aria-hidden", "false");
    this.$input.focus();
    if (save) sessionStorage.setItem(STATE_KEY, "open");
    this.ensureContext();
  }

  close(save = true) {
    this.state.open = false;
    this.$panel.dataset.open = "false";
    this.$panel.setAttribute("aria-hidden", "true");
    if (save) sessionStorage.setItem(STATE_KEY, "closed");
  }

  ensureContext() {
    if (!this.state.contextPromise) {
      this.state.contextPromise = extractContext();
    }
    return this.state.contextPromise;
  }

  addMessage(role, text) {
    const element = createMessage(role, text);
    this.$body.appendChild(element);
    this.$body.scrollTop = this.$body.scrollHeight;
    this.state.messages.push({ role, content: text });
    return element;
  }

  async handleSubmit() {
    if (this.state.busy) return;
    const text = this.$input.value.trim();
    if (!text) return;
    this.$input.value = "";
    this.addMessage("user", text);
    this.state.busy = true;

    const payload = {
      messages: [...this.state.messages, { role: "user", content: text }].slice(-8),
      site_context: await this.ensureContext(),
    };

    try {
      const endpoint =
        this.getAttribute("endpoint") ||
        window.__FEATHERCHAT_ENDPOINT ||
        "/api/featherchat";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const placeholder = this.addMessage("assistant", "...");
      const bubble = placeholder.querySelector(".fc-bubble-msg");
      let buffer = "";

      await streamToText(response, (chunk) => {
        buffer += chunk;
        bubble.textContent = buffer;
      });

      bubble.textContent = buffer.trim();
      this.state.messages[this.state.messages.length - 1].content = buffer.trim();
    } catch (error) {
      console.error("FeatherChat", error);
      this.addMessage("assistant", "Sorry, something went wrong. Please try again later.");
    } finally {
      this.state.busy = false;
    }
  }
}

if (!window.customElements.get("feather-chat")) {
  window.customElements.define("feather-chat", FeatherChat);
}

const preload = document.createElement("link");
preload.rel = "preload";
preload.as = "image";
preload.href = ICON_URL;
document.head.appendChild(preload);
