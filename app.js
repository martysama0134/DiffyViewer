(() => {
  "use strict";

  // ═══════════════════════════════════════════════════════════
  // Theme definitions
  // ═══════════════════════════════════════════════════════════
  const THEMES = {
    "github-dark": {
      label: "GitHub Dark", type: "dark",
      bg: "#0d1117", surface: "#161b22", border: "#30363d",
      text: "#e6edf3", textMuted: "#8b949e",
      accent: "#58a6ff", accentHover: "#79b8ff",
      green: "#3fb950", red: "#f85149", yellow: "#d29922",
    },
    "github-light": {
      label: "GitHub Light", type: "light",
      bg: "#ffffff", surface: "#f6f8fa", border: "#d0d7de",
      text: "#1f2328", textMuted: "#656d76",
      accent: "#0969da", accentHover: "#0550ae",
      green: "#1a7f37", red: "#cf222e", yellow: "#9a6700",
    },
    "dracula": {
      label: "Dracula", type: "dark",
      bg: "#282a36", surface: "#44475a", border: "#6272a4",
      text: "#f8f8f2", textMuted: "#6272a4",
      accent: "#bd93f9", accentHover: "#caa9fa",
      green: "#50fa7b", red: "#ff5555", yellow: "#f1fa8c",
    },
    "nord": {
      label: "Nord", type: "dark",
      bg: "#2e3440", surface: "#3b4252", border: "#4c566a",
      text: "#eceff4", textMuted: "#d8dee9",
      accent: "#88c0d0", accentHover: "#8fbcbb",
      green: "#a3be8c", red: "#bf616a", yellow: "#ebcb8b",
    },
    "catppuccin-mocha": {
      label: "Catppuccin Mocha", type: "dark",
      bg: "#1e1e2e", surface: "#313244", border: "#45475a",
      text: "#cdd6f4", textMuted: "#a6adc8",
      accent: "#89b4fa", accentHover: "#b4d0fb",
      green: "#a6e3a1", red: "#f38ba8", yellow: "#f9e2af",
    },
    "tokyo-night": {
      label: "Tokyo Night", type: "dark",
      bg: "#1a1b26", surface: "#24283b", border: "#414868",
      text: "#c0caf5", textMuted: "#565f89",
      accent: "#7aa2f7", accentHover: "#89b4fa",
      green: "#9ece6a", red: "#f7768e", yellow: "#e0af68",
    },
    "one-dark": {
      label: "One Dark", type: "dark",
      bg: "#282c34", surface: "#21252b", border: "#3e4452",
      text: "#abb2bf", textMuted: "#636d83",
      accent: "#61afef", accentHover: "#80bfff",
      green: "#98c379", red: "#e06c75", yellow: "#e5c07b",
    },
    "solarized-dark": {
      label: "Solarized Dark", type: "dark",
      bg: "#002b36", surface: "#073642", border: "#586e75",
      text: "#839496", textMuted: "#657b83",
      accent: "#268bd2", accentHover: "#2aa198",
      green: "#859900", red: "#dc322f", yellow: "#b58900",
    },
    "solarized-light": {
      label: "Solarized Light", type: "light",
      bg: "#fdf6e3", surface: "#eee8d5", border: "#93a1a1",
      text: "#657b83", textMuted: "#93a1a1",
      accent: "#268bd2", accentHover: "#2aa198",
      green: "#859900", red: "#dc322f", yellow: "#b58900",
    },
    "gruvbox-dark": {
      label: "Gruvbox Dark", type: "dark",
      bg: "#282828", surface: "#3c3836", border: "#504945",
      text: "#ebdbb2", textMuted: "#a89984",
      accent: "#83a598", accentHover: "#8ec07c",
      green: "#b8bb26", red: "#fb4934", yellow: "#fabd2f",
    },
  };

  // ═══════════════════════════════════════════════════════════
  // Preferences (localStorage)
  // ═══════════════════════════════════════════════════════════
  const PREF_KEY = "diffyviewer-prefs";
  const DEFAULTS = { theme: "github-dark", viewMode: "side-by-side", wrap: false, sidebar: true };

  function loadPrefs() {
    try {
      return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(PREF_KEY)));
    } catch { return Object.assign({}, DEFAULTS); }
  }

  function savePrefs() {
    localStorage.setItem(PREF_KEY, JSON.stringify({
      theme: currentThemeName,
      viewMode: currentMode,
      wrap: wrapEnabled,
      sidebar: sidebarVisible,
    }));
  }

  // ═══════════════════════════════════════════════════════════
  // DOM refs
  // ═══════════════════════════════════════════════════════════
  const $ = (sel) => document.querySelector(sel);
  const inputPanel = $("#inputPanel");
  const outputPanel = $("#outputPanel");
  const diffInput = $("#diffInput");
  const diffContainer = $("#diffContainer");
  const diffStats = $("#diffStats");
  const sidebar = $("#sidebar");
  const sidebarTree = $("#sidebarTree");
  const btnDiff = $("#btnDiff");
  const btnBack = $("#btnBack");
  const btnSample = $("#btnSample");
  const btnDownload = $("#btnDownload");
  const btnCollapseAll = $("#btnCollapseAll");
  const btnToggleSidebar = $("#btnToggleSidebar");
  const btnToggleWrap = $("#btnToggleWrap");
  const fileUpload = $("#fileUpload");
  const viewToggle = $("#viewToggle");
  const themeSelect = $("#themeSelect");
  const hljsLink = $("#hljsTheme");
  const shortcutHint = $("#shortcutHint");

  // ═══════════════════════════════════════════════════════════
  // State
  // ═══════════════════════════════════════════════════════════
  const prefs = loadPrefs();
  let currentThemeName = prefs.theme;
  let currentMode = prefs.viewMode;
  let wrapEnabled = prefs.wrap;
  let sidebarVisible = prefs.sidebar;
  let currentRaw = "";
  let collapsed = false;

  // ═══════════════════════════════════════════════════════════
  // Theme logic
  // ═══════════════════════════════════════════════════════════
  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function rgba(hex, a) {
    const [r, g, b] = hexToRgb(hex);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  function applyTheme(name) {
    const t = THEMES[name];
    if (!t) return;
    currentThemeName = name;
    const s = document.documentElement.style;

    // Base variables
    s.setProperty("--bg", t.bg);
    s.setProperty("--surface", t.surface);
    s.setProperty("--border", t.border);
    s.setProperty("--text", t.text);
    s.setProperty("--text-muted", t.textMuted);
    s.setProperty("--accent", t.accent);
    s.setProperty("--accent-hover", t.accentHover);
    s.setProperty("--green", t.green);
    s.setProperty("--red", t.red);

    // diff2html custom properties
    const prefix = t.type === "dark" ? "--d2h-dark-" : "--d2h-";
    // Clear both sets first
    clearD2hVars("--d2h-dark-");
    clearD2hVars("--d2h-");
    // Set for current type
    s.setProperty(prefix + "bg-color", t.surface);
    s.setProperty(prefix + "border-color", t.border);
    s.setProperty(prefix + "dim-color", t.textMuted);
    s.setProperty(prefix + "line-border-color", t.border);
    s.setProperty(prefix + "file-header-bg-color", t.bg);
    s.setProperty(prefix + "file-header-border-color", t.border);
    s.setProperty(prefix + "empty-placeholder-bg-color", t.bg);
    s.setProperty(prefix + "empty-placeholder-border-color", t.border);
    s.setProperty(prefix + "selected-color", rgba(t.accent, 0.15));
    s.setProperty(prefix + "ins-bg-color", rgba(t.green, 0.12));
    s.setProperty(prefix + "ins-border-color", rgba(t.green, 0.25));
    s.setProperty(prefix + "ins-highlight-bg-color", rgba(t.green, 0.30));
    s.setProperty(prefix + "ins-label-color", t.green);
    s.setProperty(prefix + "del-bg-color", rgba(t.red, 0.12));
    s.setProperty(prefix + "del-border-color", rgba(t.red, 0.25));
    s.setProperty(prefix + "del-highlight-bg-color", rgba(t.red, 0.30));
    s.setProperty(prefix + "del-label-color", t.red);
    s.setProperty(prefix + "info-bg-color", rgba(t.accent, 0.08));
    s.setProperty(prefix + "info-border-color", rgba(t.accent, 0.2));
    s.setProperty(prefix + "change-del-color", rgba(t.red, 0.40));
    s.setProperty(prefix + "change-ins-color", rgba(t.green, 0.40));
    s.setProperty(prefix + "change-label-color", t.yellow);
    s.setProperty(prefix + "moved-label-color", t.accent);

    // Swap d2h color scheme class on wrapper (if rendered)
    const wrapper = diffContainer.querySelector(".d2h-wrapper");
    if (wrapper) {
      wrapper.classList.remove("d2h-dark-color-scheme", "d2h-light-color-scheme");
      wrapper.classList.add(t.type === "dark" ? "d2h-dark-color-scheme" : "d2h-light-color-scheme");
    }

    // Swap highlight.js theme
    const hljsName = t.type === "dark" ? "github-dark" : "github";
    hljsLink.href = "https://cdn.jsdelivr.net/npm/highlight.js@11.11.1/styles/" + hljsName + ".min.css";

    themeSelect.value = name;
    savePrefs();
  }

  const D2H_PROPS = [
    "bg-color", "border-color", "dim-color", "line-border-color",
    "file-header-bg-color", "file-header-border-color",
    "empty-placeholder-bg-color", "empty-placeholder-border-color",
    "selected-color",
    "ins-bg-color", "ins-border-color", "ins-highlight-bg-color", "ins-label-color",
    "del-bg-color", "del-border-color", "del-highlight-bg-color", "del-label-color",
    "info-bg-color", "info-border-color",
    "change-del-color", "change-ins-color", "change-label-color", "moved-label-color",
  ];

  function clearD2hVars(prefix) {
    const s = document.documentElement.style;
    D2H_PROPS.forEach((p) => s.removeProperty(prefix + p));
  }

  function populateThemeSelect() {
    themeSelect.innerHTML = "";
    Object.keys(THEMES).forEach((key) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = THEMES[key].label;
      themeSelect.appendChild(opt);
    });
  }

  themeSelect.addEventListener("change", () => applyTheme(themeSelect.value));

  // ═══════════════════════════════════════════════════════════
  // Word wrap — JS inline styles (guaranteed override)
  // ═══════════════════════════════════════════════════════════
  function applyWrapInlineStyles(enable) {
    if (enable) {
      diffContainer.querySelectorAll(".d2h-diff-table").forEach((el) => {
        el.style.setProperty("table-layout", "fixed", "important");
        el.style.setProperty("width", "100%", "important");
      });
      diffContainer.querySelectorAll(".d2h-code-line, .d2h-code-side-line").forEach((el) => {
        el.style.setProperty("display", "block", "important");
        el.style.setProperty("width", "auto", "important");
        el.style.setProperty("white-space", "pre-wrap", "important");
        el.style.setProperty("word-wrap", "break-word", "important");
        el.style.setProperty("overflow-wrap", "anywhere", "important");
      });
      diffContainer.querySelectorAll(".d2h-code-line-ctn").forEach((el) => {
        el.style.setProperty("white-space", "pre-wrap", "important");
        el.style.setProperty("word-wrap", "break-word", "important");
        el.style.setProperty("overflow-wrap", "anywhere", "important");
      });
      diffContainer.querySelectorAll(".d2h-code-line-prefix").forEach((el) => {
        el.style.setProperty("white-space", "pre-wrap", "important");
      });
      diffContainer.querySelectorAll(".d2h-file-side-diff, .d2h-code-wrapper, .d2h-file-diff, .d2h-files-diff").forEach((el) => {
        el.style.setProperty("overflow-x", "hidden", "important");
      });
    } else {
      const props = ["table-layout", "width", "display", "white-space", "word-wrap", "overflow-wrap", "overflow-x"];
      diffContainer.querySelectorAll(".d2h-diff-table, .d2h-code-line, .d2h-code-side-line, .d2h-code-line-ctn, .d2h-code-line-prefix, .d2h-file-side-diff, .d2h-code-wrapper, .d2h-file-diff, .d2h-files-diff").forEach((el) => {
        props.forEach((p) => el.style.removeProperty(p));
      });
    }
  }

  function toggleWrap(enable) {
    wrapEnabled = enable;
    diffContainer.classList.toggle("line-wrap", wrapEnabled);
    btnToggleWrap.classList.toggle("btn-active", wrapEnabled);
    applyWrapInlineStyles(wrapEnabled);
    savePrefs();
  }

  // ═══════════════════════════════════════════════════════════
  // View toggle
  // ═══════════════════════════════════════════════════════════
  viewToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;
    viewToggle.querySelectorAll(".toggle-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode === "unified" ? "line-by-line" : "side-by-side";
    savePrefs();
    if (currentRaw) renderDiff(currentRaw);
  });

  // ═══════════════════════════════════════════════════════════
  // Sidebar toggle
  // ═══════════════════════════════════════════════════════════
  btnToggleSidebar.addEventListener("click", () => {
    sidebarVisible = !sidebarVisible;
    sidebar.classList.toggle("collapsed", !sidebarVisible);
    btnToggleSidebar.classList.toggle("btn-active", sidebarVisible);
    savePrefs();
  });

  // ═══════════════════════════════════════════════════════════
  // Wrap toggle
  // ═══════════════════════════════════════════════════════════
  btnToggleWrap.addEventListener("click", () => toggleWrap(!wrapEnabled));

  // ═══════════════════════════════════════════════════════════
  // Render diff
  // ═══════════════════════════════════════════════════════════
  function renderDiff(raw) {
    currentRaw = raw;
    collapsed = false;
    btnCollapseAll.textContent = "Collapse All";

    const t = THEMES[currentThemeName] || THEMES["github-dark"];

    const config = {
      outputFormat: currentMode,
      drawFileList: false,
      matching: "lines",
      diffStyle: "char",
      highlight: true,
      colorScheme: t.type === "dark" ? "dark" : "light",
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

    // Apply wrap inline styles if enabled
    diffContainer.classList.toggle("line-wrap", wrapEnabled);
    if (wrapEnabled) applyWrapInlineStyles(true);

    const parsed = Diff2Html.parse(raw);
    buildStats(parsed);
    buildSidebarTree(parsed);

    // Show sidebar for multi-file diffs (respect saved pref on first load)
    if (parsed.length <= 1) {
      sidebarVisible = false;
    }
    sidebar.classList.toggle("collapsed", !sidebarVisible);
    btnToggleSidebar.classList.toggle("btn-active", sidebarVisible);

    inputPanel.classList.add("hidden");
    outputPanel.classList.remove("hidden");
    showShortcutHint(parsed.length);
  }

  // ═══════════════════════════════════════════════════════════
  // Stats
  // ═══════════════════════════════════════════════════════════
  function buildStats(parsed) {
    let totalAdd = 0;
    let totalDel = 0;
    parsed.forEach((f) => { totalAdd += f.addedLines; totalDel += f.deletedLines; });
    diffStats.innerHTML =
      '<span class="stat-files">' + parsed.length + " file" + (parsed.length !== 1 ? "s" : "") + "</span>" +
      '<span class="stat-add">+' + totalAdd + "</span>" +
      '<span class="stat-del">-' + totalDel + "</span>";
  }

  // ═══════════════════════════════════════════════════════════
  // Sidebar tree
  // ═══════════════════════════════════════════════════════════
  function buildSidebarTree(parsed) {
    const root = { children: {}, files: [] };
    parsed.forEach((file, idx) => {
      const filePath = file.newName || file.oldName || "(unknown)";
      const parts = filePath.split("/");
      let node = root;
      for (let i = 0; i < parts.length - 1; i++) {
        const dir = parts[i];
        if (!node.children[dir]) node.children[dir] = { children: {}, files: [] };
        node = node.children[dir];
      }
      node.files.push({ name: parts[parts.length - 1], fullPath: filePath, idx, added: file.addedLines, deleted: file.deletedLines });
    });
    sidebarTree.innerHTML = "";
    renderTreeNode(root, sidebarTree, 0);
  }

  function renderTreeNode(node, container, depth) {
    Object.keys(node.children).sort().forEach((dirName) => {
      const dirEl = document.createElement("div");
      dirEl.className = "tree-dir";
      const label = document.createElement("div");
      label.className = "tree-label";
      label.style.paddingLeft = (12 + depth * 16) + "px";
      label.innerHTML = '<span class="tree-arrow">&#9662;</span><span class="tree-dirname">' + esc(dirName) + "/</span>";
      label.addEventListener("click", () => dirEl.classList.toggle("closed"));
      const childContainer = document.createElement("div");
      childContainer.className = "tree-children";
      dirEl.appendChild(label);
      dirEl.appendChild(childContainer);
      container.appendChild(dirEl);
      renderTreeNode(node.children[dirName], childContainer, depth + 1);
    });

    node.files.forEach((file) => {
      const el = document.createElement("div");
      el.className = "tree-file";
      el.style.paddingLeft = (12 + depth * 16 + 17) + "px";
      el.title = file.fullPath;
      el.dataset.idx = file.idx;
      let statsHtml = "";
      if (file.added || file.deleted) {
        const p = [];
        if (file.added) p.push('<span class="ts-add">+' + file.added + "</span>");
        if (file.deleted) p.push('<span class="ts-del">-' + file.deleted + "</span>");
        statsHtml = '<span class="tree-stats">' + p.join("") + "</span>";
      }
      el.innerHTML = '<span class="tree-filename">' + esc(file.name) + "</span>" + statsHtml;
      el.addEventListener("click", () => { scrollToFile(file.idx); highlightTreeFile(file.idx); });
      container.appendChild(el);
    });
  }

  function highlightTreeFile(idx) {
    sidebarTree.querySelectorAll(".tree-file").forEach((f) => f.classList.remove("active"));
    const t = sidebarTree.querySelector('.tree-file[data-idx="' + idx + '"]');
    if (t) t.classList.add("active");
  }

  function esc(str) { const d = document.createElement("div"); d.textContent = str; return d.innerHTML; }

  function scrollToFile(idx) {
    const wrappers = diffContainer.querySelectorAll(".d2h-file-wrapper");
    if (!wrappers[idx]) return;
    const y = wrappers[idx].getBoundingClientRect().top + window.scrollY - 98;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // ═══════════════════════════════════════════════════════════
  // Collapse all
  // ═══════════════════════════════════════════════════════════
  btnCollapseAll.addEventListener("click", () => {
    const bodies = diffContainer.querySelectorAll(".d2h-file-diff");
    const btns = diffContainer.querySelectorAll(".d2h-file-collapse");
    if (!collapsed) {
      bodies.forEach((b) => (b.style.display = "none"));
      btns.forEach((b) => b.classList.add("d2h-selected"));
      btnCollapseAll.textContent = "Expand All";
    } else {
      bodies.forEach((b) => (b.style.display = ""));
      btns.forEach((b) => b.classList.remove("d2h-selected"));
      btnCollapseAll.textContent = "Collapse All";
    }
    collapsed = !collapsed;
  });

  // ═══════════════════════════════════════════════════════════
  // Download
  // ═══════════════════════════════════════════════════════════
  btnDownload.addEventListener("click", () => {
    if (!currentRaw) return;
    const blob = new Blob([currentRaw], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "changes.patch"; a.click();
    URL.revokeObjectURL(url);
  });

  // ═══════════════════════════════════════════════════════════
  // Back / Submit
  // ═══════════════════════════════════════════════════════════
  btnDiff.addEventListener("click", () => {
    const raw = diffInput.value.trim();
    if (raw) renderDiff(raw);
  });

  btnBack.addEventListener("click", () => {
    outputPanel.classList.add("hidden");
    inputPanel.classList.remove("hidden");
    diffContainer.innerHTML = "";
    sidebarTree.innerHTML = "";
    diffStats.innerHTML = "";
  });

  // ═══════════════════════════════════════════════════════════
  // File upload
  // ═══════════════════════════════════════════════════════════
  fileUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    readFile(file);
    fileUpload.value = "";
  });

  function readFile(file) {
    const reader = new FileReader();
    reader.onload = () => { diffInput.value = reader.result; renderDiff(reader.result.trim()); };
    reader.readAsText(file);
  }

  // ═══════════════════════════════════════════════════════════
  // Drag & drop
  // ═══════════════════════════════════════════════════════════
  let dragCounter = 0;
  document.addEventListener("dragenter", (e) => { e.preventDefault(); dragCounter++; document.body.classList.add("drag-over"); });
  document.addEventListener("dragleave", (e) => { e.preventDefault(); dragCounter--; if (dragCounter <= 0) { dragCounter = 0; document.body.classList.remove("drag-over"); } });
  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", (e) => {
    e.preventDefault(); dragCounter = 0; document.body.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  });

  // ═══════════════════════════════════════════════════════════
  // Keyboard shortcuts
  // ═══════════════════════════════════════════════════════════
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !outputPanel.classList.contains("hidden")) {
      e.preventDefault(); btnBack.click(); return;
    }
    if (e.target === diffInput) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); btnDiff.click(); }
      return;
    }
    if (outputPanel.classList.contains("hidden")) return;

    if (e.key === "b") { e.preventDefault(); btnToggleSidebar.click(); return; }
    if (e.key === "w") { e.preventDefault(); btnToggleWrap.click(); return; }

    const wrappers = [...diffContainer.querySelectorAll(".d2h-file-wrapper")];
    if (wrappers.length <= 1) return;
    if (e.key === "j" || e.key === "k") {
      e.preventDefault();
      let cur = 0;
      for (let i = 0; i < wrappers.length; i++) {
        if (wrappers[i].getBoundingClientRect().top <= 100) cur = i;
      }
      const next = e.key === "j" ? Math.min(cur + 1, wrappers.length - 1) : Math.max(cur - 1, 0);
      scrollToFile(next);
      highlightTreeFile(next);
    }
  });

  // ═══════════════════════════════════════════════════════════
  // Shortcut hint
  // ═══════════════════════════════════════════════════════════
  function showShortcutHint(fileCount) {
    if (fileCount <= 1) return;
    shortcutHint.classList.remove("hidden", "fade-out");
    setTimeout(() => shortcutHint.classList.add("fade-out"), 3000);
    setTimeout(() => shortcutHint.classList.add("hidden"), 3400);
  }

  // ═══════════════════════════════════════════════════════════
  // Sample diff
  // ═══════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════
  // Init — restore preferences
  // ═══════════════════════════════════════════════════════════
  (function init() {
    populateThemeSelect();
    applyTheme(currentThemeName);

    // Restore view mode toggle
    const modeBtn = viewToggle.querySelector('[data-mode="' + (currentMode === "line-by-line" ? "unified" : "split") + '"]');
    if (modeBtn) {
      viewToggle.querySelectorAll(".toggle-btn").forEach((b) => b.classList.remove("active"));
      modeBtn.classList.add("active");
    }

    // Restore wrap button state
    btnToggleWrap.classList.toggle("btn-active", wrapEnabled);

    // Restore sidebar state
    btnToggleSidebar.classList.toggle("btn-active", sidebarVisible);
    sidebar.classList.toggle("collapsed", !sidebarVisible);
  })();
})();
