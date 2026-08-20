// ---------- CONTENT LIBRARY ----------

const CATEGORIES = [
  {
    id: "discovery",
    name: "Discovery & Research",
    heavy: "Discovery and research is a core part of how I work. When helping with product problems, always ask what customer evidence exists before proposing a solution. Push back if a request skips discovery. Help me structure customer interview notes, spot patterns across multiple conversations, and turn qualitative feedback into clear themes I can act on.",
    light: "I do occasional discovery work. If I bring you customer feedback or interview notes, help me summarize and extract themes, but do not assume every decision needs new research first."
  },
  {
    id: "strategy",
    name: "Strategy & Framing",
    heavy: "Strategy work is central to my role. Before any solution discussion, help me frame the problem clearly: who has it, how big is it, why now. Challenge assumptions and surface alternative framings I might be missing.",
    light: "I do occasional strategy framing. Help me sanity check a problem statement when asked, but do not turn every request into a full strategy exercise."
  },
  {
    id: "documents",
    name: "Documents (PRD / BRD / FRD)",
    heavy: "Writing structured product documents is core to my work. When I ask for a PRD, BRD, or FRD, ask clarifying questions first (evidence, stage, audience) rather than filling gaps with generic content. Match the document to what my company actually expects.",
    light: "I write light documentation. Keep documents short and skip sections that do not apply unless I ask for the full version."
  },
  {
    id: "metrics",
    name: "Metrics & Data",
    heavy: "Metrics rigor matters to me. When discussing a feature or decision, ask what success metric applies and how we would know if it worked. Flag vague metrics like 'increase engagement' and push for something measurable.",
    light: "I use metrics but do not live in dashboards. Help me interpret numbers when I bring them, do not assume every conversation needs a metrics framework."
  },
  {
    id: "execution",
    name: "Execution & Delivery",
    heavy: "Execution is where I spend most of my time. Help me break work into clear, testable stories, flag scope creep, and keep sprint discussions grounded in what is actually shippable this cycle.",
    light: "I am involved in execution but not hands on daily. Help me sanity check scope or priority when asked."
  },
  {
    id: "communication",
    name: "Communication",
    heavy: "Clear communication to different audiences matters a lot in my role. Always ask who the audience is before drafting an update, and adjust tone and detail level accordingly (exec, eng, customer facing).",
    light: "I write occasional updates. Help me tighten and clarify when I ask, default to a straightforward tone."
  },
  {
    id: "gtm",
    name: "Go-to-Market",
    heavy: "GTM thinking should be part of product decisions I make. When discussing a launch, ask about positioning, pricing, and who owns go to market messaging.",
    light: "GTM is not a big part of my role. Only bring it up if I explicitly ask about launch or positioning."
  }
];

const TOOLS = [
  "Notion",
  "Linear",
  "Jira",
  "Slack",
  "Teams",
  "Gmail",
  "Google Drive",
  "Outlook"
];

const HABITS = [
  {
    group: "Morning",
    items: [
      "Each morning, summarize my overnight emails when I ask, prioritizing anything time sensitive.",
      "Check for customer escalations in my email or Slack, and flag anything urgent before discussing anything else.",
      "Summarize unread messages from my key Slack or Teams channels when asked.",
      "When I ask what to focus on today, rank my open items by urgency and impact, not just recency.",
      "Flag any overnight metric alerts or anomalies if data sources are connected."
    ]
  },
  {
    group: "During the day",
    items: [
      "Before a customer call, pull and summarize the last email or message thread with that customer.",
      "Before a stakeholder meeting, summarize open action items with that person.",
      "When given a long email thread, summarize it in three lines or less, stating the decision needed if any.",
      "Help draft a reply to a customer escalation, calm and solution focused, not defensive.",
      "Turn rough meeting notes into a clean, structured summary with clear owners and next steps."
    ]
  },
  {
    group: "Metrics & alerts",
    items: [
      "If I share metric data, flag anything that moved more than a threshold I define, not just report the number.",
      "When asked for a weekly digest, show trend direction, not just a snapshot.",
      "Flag when a metric is approaching a threshold I care about, before it crosses it."
    ]
  },
  {
    group: "End of day",
    items: [
      "When asked, summarize what shipped or got done today in a few lines.",
      "Flag anything blocked and who owns unblocking it.",
      "Help draft my end of day status update for my manager, short and factual."
    ]
  },
  {
    group: "Recurring & weekly",
    items: [
      "Help draft my weekly stakeholder update, tailored to who is reading it.",
      "Before a recurring 1:1, help prep an agenda from open items with that person.",
      "When asked, summarize customer feedback collected that week into themes.",
      "Track and remind me of follow ups I said I would do, when I ask for a recap."
    ]
  }
];

// ---------- STATE ----------

const state = {
  categories: {},
  categoryText: {},
  tools: {},
  toolsOther: "",
  habits: {},
  design: false,
  designWords: "",
  designTool: "",
  doc: false
};

CATEGORIES.forEach(c => state.categories[c.id] = "skip");
TOOLS.forEach(t => state.tools[t] = false);

// ---------- RENDER FORM ----------

function renderCategories() {
  const el = document.getElementById("categoryList");
  el.innerHTML = "";

  CATEGORIES.forEach(cat => {
    const div = document.createElement("div");

    div.className = "category-item";

    div.innerHTML = `
      <div class="category-item-head">
        <span class="category-name">${cat.name}</span>

        <div class="switch3" data-id="${cat.id}">
          <button data-val="skip" class="active">Skip</button>
          <button data-val="light">Light</button>
          <button data-val="heavy">Heavy</button>
        </div>
      </div>

      <input
        type="text"
        class="text-input category-text"
        data-id="${cat.id}"
        placeholder="Common use cases (optional)"
      >
    `;

    el.appendChild(div);
  });

  document.querySelectorAll(".switch3 button").forEach(btn => {

    btn.addEventListener("click", () => {

      const wrap = btn.parentElement;
      const id = wrap.dataset.id;
      const val = btn.dataset.val;

      state.categories[id] = val;

      wrap
        .querySelectorAll("button")
        .forEach(b => b.classList.remove("active", "heavy"));

      btn.classList.add("active");

      if (val === "heavy") {
        btn.classList.add("heavy");
      }

      const textInput =
        document.querySelector(`.category-text[data-id="${id}"]`);

      textInput.classList.toggle("show", val !== "skip");

      updatePreview();
    });

  });

  document.querySelectorAll(".category-text").forEach(inp => {

    inp.addEventListener("input", () => {

      state.categoryText[inp.dataset.id] = inp.value;

      updatePreview();

    });

  });
}

function renderTools() {

  const el = document.getElementById("toolsGrid");

  el.innerHTML = "";

  TOOLS.forEach(tool => {

    const chip = document.createElement("div");

    chip.className = "chip";
    chip.textContent = tool;

    chip.addEventListener("click", () => {

      state.tools[tool] = !state.tools[tool];

      chip.classList.toggle(
        "active",
        state.tools[tool]
      );

      updatePreview();

    });

    el.appendChild(chip);

  });

  document
    .getElementById("toolsOther")
    .addEventListener("input", e => {

      state.toolsOther = e.target.value;

      updatePreview();

    });
}

function renderHabits() {

  const el = document.getElementById("habitList");

  el.innerHTML = "";

  let counter = 0;

  HABITS.forEach(group => {

    const label = document.createElement("div");

    label.className = "habit-group-label";
    label.textContent = group.group.toUpperCase();

    el.appendChild(label);

    group.items.forEach(text => {

      const id = "habit_" + counter++;

      state.habits[id] = {
        checked: false,
        text
      };

      const item = document.createElement("label");

      item.className = "habit-item";

      item.innerHTML = `
        <input type="checkbox" data-id="${id}">
        <span>${text}</span>
      `;

      item
        .querySelector("input")
        .addEventListener("change", e => {

          state.habits[id].checked =
            e.target.checked;

          updatePreview();

        });

      el.appendChild(item);

    });

  });
}

function wireExtras() {

  const designToggle =
    document.getElementById("designToggle");

  const designFields =
    document.getElementById("designFields");

  designToggle.addEventListener("change", () => {

    state.design = designToggle.checked;

    designFields.classList.toggle(
      "show",
      state.design
    );

    updatePreview();

  });

  document
    .getElementById("designWords")
    .addEventListener("input", e => {

      state.designWords = e.target.value;

      updatePreview();

    });

  document
    .getElementById("designTool")
    .addEventListener("input", e => {

      state.designTool = e.target.value;

      updatePreview();

    });

  const docToggle =
    document.getElementById("docToggle");

  docToggle.addEventListener("change", () => {

    state.doc = docToggle.checked;

    updatePreview();

  });
}

// ---------- ASSEMBLE MARKDOWN ----------

function buildMarkdown() {

  const lines = [];

  lines.push("# My PM Operating System");

  lines.push("");

  lines.push(
    "These are standing instructions for how I work as a Product Manager. Follow them by default in our conversations."
  );

  lines.push("");

  const activeCats =
    CATEGORIES.filter(
      c => state.categories[c.id] !== "skip"
    );

  if (activeCats.length) {

    lines.push("## Working style");
    lines.push("");

    activeCats.forEach(cat => {

      const depth =
        state.categories[cat.id];

      lines.push(
        `### ${cat.name} (${depth === "heavy" ? "Heavy" : "Light"})`
      );

      lines.push(cat[depth]);

      const extra =
        (state.categoryText[cat.id] || "").trim();

      if (extra) {

        lines.push(
          `My common use cases here: ${extra}`
        );

      }

      lines.push("");

    });
  }

  const activeTools =
    TOOLS.filter(t => state.tools[t]);

  const otherTools =
    state.toolsOther.trim();

  if (activeTools.length || otherTools) {

    lines.push("## Tools I use");
    lines.push("");

    const all = [...activeTools];

    if (otherTools) {
      all.push(otherTools);
    }

    lines.push(
      all.join(", ") + "."
    );

    lines.push(
      "Reference these tools naturally when relevant, and assume I may have connectors for some of them."
    );

    lines.push("");

  }

  const activeHabits =
    Object.values(state.habits)
      .filter(h => h.checked);

  if (activeHabits.length) {

    lines.push("## Daily habits");
    lines.push("");

    lines.push(
      "When I ask, or at the start of a session, be ready to do the following:"
    );

    lines.push("");

    activeHabits.forEach(h => {

      lines.push(
        `- ${h.text}`
      );

    });

    lines.push("");

    lines.push(
      "Note: these run when I ask or when a session starts, not on a fixed clock, unless the surface I'm using supports scheduled tasks."
    );

    lines.push("");

  }

  if (state.design) {

    lines.push("## Design principles");
    lines.push("");

    let block =
      "When asked to generate design or UI prompts, use these principles:";

    if (state.designWords.trim()) {

      block +=
        ` style: ${state.designWords.trim()}.`;

    }

    if (state.designTool.trim()) {

      block +=
        ` Default to producing a prompt formatted for ${state.designTool.trim()}, not raw code, unless I ask for code directly.`;

    }

    lines.push(block);
    lines.push("");

  }

  if (state.doc) {

    lines.push("## Documentation");
    lines.push("");

    lines.push(
      "When I say 'document this' or reference a project by name, generate structured documentation: a short overview, key decisions made, and open items, in plain markdown, without me having to specify format each time."
    );

    lines.push("");

  }

  if (
    !activeCats.length &&
    !activeHabits.length &&
    !state.design &&
    !state.doc
  ) {

    lines.push(
      "_Nothing configured yet. Set your working style, habits, or extras on the left._"
    );

  }

  return lines.join("\n");
}

// ---------- PREVIEW + DOWNLOAD ----------

function updatePreview() {

  const md = buildMarkdown();

  document.getElementById(
    "previewBody"
  ).textContent = md;

  const lineCount =
    md
      .split("\n")
      .filter(l => l.trim())
      .length;

  document.getElementById(
    "lineCount"
  ).textContent = `${lineCount} lines`;

  const hasContent =
    Object.values(state.categories)
      .some(v => v !== "skip") ||

    Object.values(state.habits)
      .some(h => h.checked) ||

    state.design ||

    state.doc;

  const statusEl =
    document.getElementById("statusLight");

  statusEl.classList.toggle(
    "live",
    hasContent
  );

  document.getElementById(
    "statusText"
  ).textContent =
    hasContent
      ? "CONFIGURED"
      : "STANDBY";
}

function downloadFile() {

  const md = buildMarkdown();

  const blob =
    new Blob(
      [md],
      { type: "text/markdown" }
    );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download = "pmos.md";

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// ---------- INIT ----------

renderCategories();
renderTools();
renderHabits();
wireExtras();
updatePreview();

document
  .getElementById("downloadBtn")
  .addEventListener(
    "click",
    downloadFile
  );

// ---------- THEME ----------

const themeToggle =
  document.getElementById("themeToggle");

const savedTheme =
  localStorage.getItem("pmos-theme");

if (savedTheme === "dark") {

  document.documentElement
    .setAttribute(
      "data-theme",
      "dark"
    );

  themeToggle.textContent =
    "LIGHT";

  themeToggle.setAttribute(
    "aria-label",
    "Switch to light mode"
  );
}

themeToggle.addEventListener(
  "click",
  () => {

    const isDark =
      document.documentElement
        .getAttribute("data-theme") ===
      "dark";

    if (isDark) {

      document.documentElement
        .removeAttribute("data-theme");

      localStorage.setItem(
        "pmos-theme",
        "light"
      );

      themeToggle.textContent =
        "DARK";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
      );

    } else {

      document.documentElement
        .setAttribute(
          "data-theme",
          "dark"
        );

      localStorage.setItem(
        "pmos-theme",
        "dark"
      );

      themeToggle.textContent =
        "LIGHT";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
      );

    }

  }
);
