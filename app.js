(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const inputPanel = $("#inputPanel");
  const outputPanel = $("#outputPanel");
  const diffInput = $("#diffInput");
  const diffContainer = $("#diffContainer");
  const diffStats = $("#diffStats");
  const fileTree = $("#fileTree");
  const btnDiff = $("#btnDiff");
  const btnBack = $("#btnBack");
  const btnSample = $("#btnSample");
  const btnDownload = $("#btnDownload");
  const btnCollapseAll = $("#btnCollapseAll");
  const fileUpload = $("#fileUpload");
  const viewToggle = $("#viewToggle");
  const shortcutHint = $("#shortcutHint");

  let currentMode = "side-by-side";
  let currentRaw = "";
  let collapsed = false;

  // ── View toggle ──
  viewToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;
    viewToggle.querySelectorAll(".toggle-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode === "unified" ? "line-by-line" : "side-by-side";
    if (currentRaw) renderDiff(currentRaw);
  });

  // ── Render using Diff2HtmlUI ──
  function renderDiff(raw) {
    currentRaw = raw;
    collapsed = false;
    btnCollapseAll.textContent = "Collapse All";

    const config = {
      outputFormat: currentMode,
      drawFileList: false,
      matching: "lines",
      diffStyle: "char",
      highlight: true,
      colorScheme: "dark",
      synchronisedScroll: true,
      fileContentToggle: true,
      stickyFileHeaders: true,
      renderNothingWhenEmpty: false,
      diffMaxChanges: 5000,
      diffTooBigMessage: function () {
        return "Diff too large to render inline. Download the patch instead.";
      },
    };

    diffContainer.innerHTML = "";
    const ui = new Diff2HtmlUI(diffContainer, raw, config);
    ui.draw();
    ui.highlightCode();

    buildStats(raw);
    buildFileTree(raw);
    inputPanel.classList.add("hidden");
    outputPanel.classList.remove("hidden");
    showShortcutHint();
  }

  // ── Diff stats summary ──
  function buildStats(raw) {
    const parsed = Diff2Html.parse(raw);
    let totalAdd = 0;
    let totalDel = 0;
    parsed.forEach((f) => {
      totalAdd += f.addedLines;
      totalDel += f.deletedLines;
    });

    diffStats.innerHTML =
      '<span class="stat-files">' + parsed.length + " file" + (parsed.length !== 1 ? "s" : "") + "</span>" +
      '<span class="stat-add">+' + totalAdd + "</span>" +
      '<span class="stat-del">-' + totalDel + "</span>";
  }

  // ── File tree pills with per-file stats ──
  function buildFileTree(raw) {
    const parsed = Diff2Html.parse(raw);
    fileTree.innerHTML = "";
    if (parsed.length <= 1) return;

    parsed.forEach((file, i) => {
      const pill = document.createElement("button");
      pill.className = "file-pill";

      const name = document.createElement("span");
      name.textContent = shortName(file.newName || file.oldName);
      pill.appendChild(name);

      if (file.addedLines || file.deletedLines) {
        const stats = document.createElement("span");
        stats.className = "pill-stats";
        const parts = [];
        if (file.addedLines) parts.push('<span class="pill-add">+' + file.addedLines + "</span>");
        if (file.deletedLines) parts.push('<span class="pill-del">-' + file.deletedLines + "</span>");
        stats.innerHTML = parts.join(" ");
        pill.appendChild(stats);
      }

      pill.title = file.newName || file.oldName;
      pill.addEventListener("click", () => scrollToFile(i));
      fileTree.appendChild(pill);
    });
  }

  function scrollToFile(idx) {
    const wrappers = diffContainer.querySelectorAll(".d2h-file-wrapper");
    if (!wrappers[idx]) return;
    const headerHeight = 49;
    const y = wrappers[idx].getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
    highlightPill(idx);
  }

  function highlightPill(idx) {
    const pills = fileTree.querySelectorAll(".file-pill");
    pills.forEach((p) => p.classList.remove("active"));
    if (pills[idx]) pills[idx].classList.add("active");
  }

  function shortName(path) {
    if (!path) return "(unknown)";
    const parts = path.split("/");
    return parts.length > 2 ? "\u2026/" + parts.slice(-2).join("/") : path;
  }

  // ── Collapse / expand all ──
  btnCollapseAll.addEventListener("click", () => {
    const collapseButtons = diffContainer.querySelectorAll(".d2h-file-collapse");
    const diffBodies = diffContainer.querySelectorAll(".d2h-file-diff");

    if (!collapsed) {
      diffBodies.forEach((body) => (body.style.display = "none"));
      collapseButtons.forEach((btn) => btn.classList.add("d2h-selected"));
      btnCollapseAll.textContent = "Expand All";
    } else {
      diffBodies.forEach((body) => (body.style.display = ""));
      collapseButtons.forEach((btn) => btn.classList.remove("d2h-selected"));
      btnCollapseAll.textContent = "Collapse All";
    }
    collapsed = !collapsed;
  });

  // ── Download patch ──
  btnDownload.addEventListener("click", () => {
    if (!currentRaw) return;
    const blob = new Blob([currentRaw], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "changes.patch";
    a.click();
    URL.revokeObjectURL(url);
  });

  // ── Back / submit ──
  btnDiff.addEventListener("click", () => {
    const raw = diffInput.value.trim();
    if (!raw) return;
    renderDiff(raw);
  });

  btnBack.addEventListener("click", () => {
    outputPanel.classList.add("hidden");
    inputPanel.classList.remove("hidden");
    diffContainer.innerHTML = "";
    fileTree.innerHTML = "";
    diffStats.innerHTML = "";
  });

  // ── File upload ──
  fileUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    readFile(file);
    fileUpload.value = "";
  });

  function readFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      diffInput.value = reader.result;
      renderDiff(reader.result.trim());
    };
    reader.readAsText(file);
  }

  // ── Drag & drop ──
  let dragCounter = 0;

  document.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dragCounter++;
    document.body.classList.add("drag-over");
  });

  document.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      document.body.classList.remove("drag-over");
    }
  });

  document.addEventListener("dragover", (e) => e.preventDefault());

  document.addEventListener("drop", (e) => {
    e.preventDefault();
    dragCounter = 0;
    document.body.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  });

  // ── Keyboard shortcuts ──
  document.addEventListener("keydown", (e) => {
    // Escape: go back to input
    if (e.key === "Escape" && !outputPanel.classList.contains("hidden")) {
      e.preventDefault();
      btnBack.click();
      return;
    }

    // Don't capture when typing in textarea
    if (e.target === diffInput) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        btnDiff.click();
      }
      return;
    }

    if (outputPanel.classList.contains("hidden")) return;
    const wrappers = [...diffContainer.querySelectorAll(".d2h-file-wrapper")];
    if (wrappers.length <= 1) return;

    if (e.key === "j" || e.key === "k") {
      e.preventDefault();
      const headerHeight = 49;
      let currentIdx = 0;
      for (let i = 0; i < wrappers.length; i++) {
        if (wrappers[i].getBoundingClientRect().top <= headerHeight + 10) currentIdx = i;
      }
      const next = e.key === "j"
        ? Math.min(currentIdx + 1, wrappers.length - 1)
        : Math.max(currentIdx - 1, 0);
      scrollToFile(next);
    }
  });

  // ── Shortcut hint toast ──
  function showShortcutHint() {
    const wrappers = diffContainer.querySelectorAll(".d2h-file-wrapper");
    if (wrappers.length <= 1) return;
    shortcutHint.classList.remove("hidden", "fade-out");
    setTimeout(() => shortcutHint.classList.add("fade-out"), 3000);
    setTimeout(() => shortcutHint.classList.add("hidden"), 3400);
  }

  // ── Sample diff (multi-file, renames, binary) ──
  const SAMPLE = `diff --git a/src/utils/config.js b/src/utils/config.js
index 8a3b5c1..f2d4e6a 100644
--- a/src/utils/config.js
+++ b/src/utils/config.js
@@ -1,8 +1,10 @@
-const DEFAULT_TIMEOUT = 3000;
+const DEFAULT_TIMEOUT = 5000;
+const MAX_RETRIES = 3;

 function loadConfig(env) {
-  const config = { timeout: DEFAULT_TIMEOUT };
+  const config = {
+    timeout: DEFAULT_TIMEOUT,
+    retries: MAX_RETRIES,
+  };
   if (env === "production") {
     config.debug = false;
-    config.logLevel = "error";
   }
   return config;
 }
diff --git a/src/index.js b/src/index.js
index 1a2b3c4..5d6e7f8 100644
--- a/src/index.js
+++ b/src/index.js
@@ -1,6 +1,7 @@
 import { loadConfig } from "./utils/config";
+import { logger } from "./utils/logger";

 const config = loadConfig(process.env.NODE_ENV);
-console.log("App started with config:", config);
+logger.info("App started", { config });

 export default config;
diff --git a/src/utils/logger.js b/src/utils/logger.js
new file mode 100644
index 0000000..a1b2c3d
--- /dev/null
+++ b/src/utils/logger.js
@@ -0,0 +1,15 @@
+const LEVELS = ["debug", "info", "warn", "error"];
+
+function createLogger(minLevel = "info") {
+  const minIdx = LEVELS.indexOf(minLevel);
+  const logger = {};
+  LEVELS.forEach((level, idx) => {
+    logger[level] = (...args) => {
+      if (idx >= minIdx) {
+        console[level === "debug" ? "log" : level](
+          \`[\${level.toUpperCase()}]\`,
+          ...args
+        );
+      }
+    };
+  });
+  return logger;
+}
+
+export const logger = createLogger(process.env.LOG_LEVEL);
diff --git a/README.md b/README.md
index 9f8e7d6..3c2b1a0 100644
--- a/README.md
+++ b/README.md
@@ -1,5 +1,8 @@
 # My App

-A simple application.
+A simple application with structured logging and retry support.

 ## Getting Started
+
+1. Install dependencies: \`npm install\`
+2. Run: \`npm start\`
`;

  btnSample.addEventListener("click", () => {
    diffInput.value = SAMPLE;
    renderDiff(SAMPLE.trim());
  });
})();
