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
    "gruvbox-light": {
      label: "Gruvbox Light", type: "light",
      bg: "#fbf1c7", surface: "#ebdbb2", border: "#bdae93",
      text: "#3c3836", textMuted: "#928374",
      accent: "#076678", accentHover: "#427b58",
      green: "#79740e", red: "#9d0006", yellow: "#b57614",
    },
    "monokai-pro": {
      label: "Monokai Pro", type: "dark",
      bg: "#2d2a2e", surface: "#403e41", border: "#5b595c",
      text: "#fcfcfa", textMuted: "#939293",
      accent: "#78dce8", accentHover: "#a9dc76",
      green: "#a9dc76", red: "#ff6188", yellow: "#ffd866",
    },
    "catppuccin-latte": {
      label: "Catppuccin Latte", type: "light",
      bg: "#eff1f5", surface: "#dce0e8", border: "#bcc0cc",
      text: "#4c4f69", textMuted: "#8c8fa1",
      accent: "#1e66f5", accentHover: "#7287fd",
      green: "#40a02b", red: "#d20f39", yellow: "#df8e1d",
    },
    "rose-pine": {
      label: "Ros\u00e9 Pine", type: "dark",
      bg: "#191724", surface: "#1f1d2e", border: "#403d52",
      text: "#e0def4", textMuted: "#6e6a86",
      accent: "#c4a7e7", accentHover: "#31748f",
      green: "#9ccfd8", red: "#eb6f92", yellow: "#f6c177",
    },
    "rose-pine-dawn": {
      label: "Ros\u00e9 Pine Dawn", type: "light",
      bg: "#faf4ed", surface: "#fffaf3", border: "#dfdad9",
      text: "#575279", textMuted: "#9893a5",
      accent: "#907aa9", accentHover: "#286983",
      green: "#56949f", red: "#b4637a", yellow: "#ea9d34",
    },
    "kanagawa": {
      label: "Kanagawa", type: "dark",
      bg: "#1f1f28", surface: "#2a2a37", border: "#363646",
      text: "#dcd7ba", textMuted: "#727169",
      accent: "#7e9cd8", accentHover: "#957fb8",
      green: "#76946a", red: "#c34043", yellow: "#dca561",
    },
    "everforest-dark": {
      label: "Everforest Dark", type: "dark",
      bg: "#2d353b", surface: "#343f44", border: "#475258",
      text: "#d3c6aa", textMuted: "#859289",
      accent: "#7fbbb3", accentHover: "#83c092",
      green: "#a7c080", red: "#e67e80", yellow: "#dbbc7f",
    },
    "ayu-dark": {
      label: "Ayu Dark", type: "dark",
      bg: "#0a0e14", surface: "#1f2430", border: "#33415e",
      text: "#bfbdb6", textMuted: "#636a76",
      accent: "#e6b450", accentHover: "#ffb454",
      green: "#7fd962", red: "#f07171", yellow: "#e6b450",
    },
    "palenight": {
      label: "Palenight", type: "dark",
      bg: "#292d3e", surface: "#34324a", border: "#4e4e6a",
      text: "#a6accd", textMuted: "#676e95",
      accent: "#82aaff", accentHover: "#c3e88d",
      green: "#c3e88d", red: "#ff5370", yellow: "#ffcb6b",
    },
    "synthwave-84": {
      label: "Synthwave '84", type: "dark",
      bg: "#262335", surface: "#34294f", border: "#495495",
      text: "#f0e3ff", textMuted: "#848bbd",
      accent: "#ff7edb", accentHover: "#36f9f6",
      green: "#72f1b8", red: "#fe4450", yellow: "#fede5d",
    },
    "poimandres": {
      label: "Poimandres", type: "dark",
      bg: "#1b1e28", surface: "#252b37", border: "#303340",
      text: "#e4f0fb", textMuted: "#767c9d",
      accent: "#add7ff", accentHover: "#91b4d5",
      green: "#5de4c7", red: "#d0679d", yellow: "#fffac2",
    },
    "night-owl": {
      label: "Night Owl", type: "dark",
      bg: "#011627", surface: "#0b2942", border: "#1d3b53",
      text: "#d6deeb", textMuted: "#637777",
      accent: "#82aaff", accentHover: "#7fdbca",
      green: "#addb67", red: "#ef5350", yellow: "#ecc48d",
    },
    "zenburn": {
      label: "Zenburn", type: "dark",
      bg: "#3f3f3f", surface: "#434443", border: "#5f5f5f",
      text: "#dcdccc", textMuted: "#9fafaf",
      accent: "#8cd0d3", accentHover: "#93e0e3",
      green: "#7f9f7f", red: "#e37170", yellow: "#f0dfaf",
    },
    "zenburn-darker": {
      label: "Zenburn Darker", type: "dark",
      bg: "#1f1f1f", surface: "#2a2a2a", border: "#4f5f5f",
      text: "#dcdccc", textMuted: "#8a8a8a",
      accent: "#7ee0de", accentHover: "#93e0e3",
      green: "#7f9f7f", red: "#dc8383", yellow: "#feb183",
    },
  };

  // ═══════════════════════════════════════════════════════════
  // Preferences (localStorage)
  // ═══════════════════════════════════════════════════════════
  const PREF_KEY = "diffyviewer-prefs";
  const DEFAULTS = { theme: "github-dark", viewMode: "side-by-side", sidebar: true, hideWhitespace: false };

  function loadPrefs() {
    try {
      return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(PREF_KEY)));
    } catch { return Object.assign({}, DEFAULTS); }
  }

  function savePrefs() {
    localStorage.setItem(PREF_KEY, JSON.stringify({
      theme: currentThemeName,
      viewMode: currentMode,
      sidebar: sidebarVisible,
      hideWhitespace: hideWhitespace,
    }));
  }

  // ═══════════════════════════════════════════════════════════
  // DOM refs
  // ═══════════════════════════════════════════════════════════
  const $ = (sel) => document.querySelector(sel);
  const inputPanel = $("#inputPanel");
  const outputPanel = $("#outputPanel");
  const outputToolbar = $("#outputToolbar");
  const diffInput = $("#diffInput");
  const diffContainer = $("#diffContainer");
  const diffStats = $("#diffStats");
  const sidebar = $("#sidebar");
  const sidebarBackdrop = $("#sidebarBackdrop");
  const sidebarTree = $("#sidebarTree");
  const btnDiff = $("#btnDiff");
  const btnSample = $("#btnSample");
  const btnDownload = $("#btnDownload");
  const btnDownloadHtml = $("#btnDownloadHtml");
  const btnExport = $("#btnExport");
  const exportMenu = $("#exportMenu");
  const btnExportMarkdown = $("#btnExportMarkdown");
  const btnExportBBCode = $("#btnExportBBCode");
  const btnExportPlain = $("#btnExportPlain");
  const btnTutorial = $("#btnTutorial");
  const btnCollapseAll = $("#btnCollapseAll");
  const btnToggleSidebar = $("#btnToggleSidebar");
  const btnHideWhitespace = $("#btnHideWhitespace");
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
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const isWebView = /Telegram|Instagram|FBAN|FBAV|Line\/|MicroMessenger/i.test(navigator.userAgent) || typeof window.TelegramWebviewProxy !== "undefined";
  let currentMode = isMobile ? "line-by-line" : prefs.viewMode;
  let sidebarVisible = isMobile ? false : prefs.sidebar;
  let hideWhitespace = prefs.hideWhitespace;
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
    s.setProperty("--yellow", t.yellow);

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
  // Hide whitespace — filters parsed DiffFile[] like git diff -w
  // Uses LCS on whitespace-normalized lines to align del/add blocks
  // even when counts differ, then hides whitespace-only matched pairs.
  // ═══════════════════════════════════════════════════════════
  function stripWs(s) { return s.replace(/\s/g, ""); }

  // LCS on normalized content — returns array of [delIdx, addIdx] pairs
  function lcsAlign(dels, adds) {
    var dn = dels.map(function (l) { return stripWs(l.content.substring(1)); });
    var an = adds.map(function (l) { return stripWs(l.content.substring(1)); });
    var m = dn.length, n = an.length;
    // DP table
    var dp = [];
    for (var i = 0; i <= m; i++) { dp[i] = new Array(n + 1).fill(0); }
    for (var i = 1; i <= m; i++) {
      for (var j = 1; j <= n; j++) {
        dp[i][j] = dn[i - 1] === an[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    // Backtrack to get matched pairs
    var pairs = [];
    var i = m, j = n;
    while (i > 0 && j > 0) {
      if (dn[i - 1] === an[j - 1]) { pairs.push([i - 1, j - 1]); i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) { i--; }
      else { j--; }
    }
    pairs.reverse();
    return pairs;
  }

  function filterWhitespaceFiles(files) {
    return files.map(function (file) {
      var newBlocks = [];

      file.blocks.forEach(function (block) {
        var newLines = [];
        var lines = block.lines;
        var i = 0;

        while (i < lines.length) {
          if (lines[i].type === "context") {
            newLines.push(lines[i]);
            i++;
            continue;
          }

          // Collect consecutive delete then insert lines
          var dels = [];
          var adds = [];
          while (i < lines.length && lines[i].type === "delete") { dels.push(lines[i]); i++; }
          while (i < lines.length && lines[i].type === "insert") { adds.push(lines[i]); i++; }

          // Use LCS alignment to match del/add lines by normalized content
          var pairs = lcsAlign(dels, adds);
          var matchedDel = new Set(pairs.map(function (p) { return p[0]; }));
          var matchedAdd = new Set(pairs.map(function (p) { return p[1]; }));

          // Unmatched deletes = real deletions; unmatched adds = real additions
          // Matched pairs = whitespace-only changes → convert to context
          var di = 0, ai = 0, pi = 0;
          while (di < dels.length || ai < adds.length) {
            // Emit unmatched deletes before next matched pair
            while (di < dels.length && !matchedDel.has(di)) {
              newLines.push(dels[di]);
              di++;
            }
            // Emit unmatched adds before next matched pair
            var nextMatchedAdd = pi < pairs.length ? pairs[pi][1] : adds.length;
            while (ai < adds.length && !matchedAdd.has(ai) && ai < nextMatchedAdd) {
              newLines.push(adds[ai]);
              ai++;
            }
            // Emit matched pair as context
            if (pi < pairs.length && di === pairs[pi][0] && ai === pairs[pi][1]) {
              newLines.push({
                type: "context",
                content: " " + adds[ai].content.substring(1),
                oldNumber: dels[di].oldNumber,
                newNumber: adds[ai].newNumber,
              });
              di++; ai++; pi++;
            }
          }
          // Any remaining unmatched adds
          while (ai < adds.length) {
            if (!matchedAdd.has(ai)) newLines.push(adds[ai]);
            ai++;
          }
        }

        // Keep block only if it has remaining changes
        var hasChanges = newLines.some(function (l) { return l.type !== "context"; });
        if (hasChanges) {
          newBlocks.push({ oldStartLine: block.oldStartLine, newStartLine: block.newStartLine, header: block.header, lines: newLines });
        }
      });

      // Recount added/deleted
      var added = 0, deleted = 0;
      newBlocks.forEach(function (b) {
        b.lines.forEach(function (l) {
          if (l.type === "insert") added++;
          if (l.type === "delete") deleted++;
        });
      });

      if (added === 0 && deleted === 0) return null; // File has only whitespace changes

      return {
        blocks: newBlocks,
        deletedLines: deleted,
        addedLines: added,
        isCombined: file.isCombined,
        isGitDiff: file.isGitDiff,
        oldName: file.oldName,
        newName: file.newName,
        language: file.language,
        oldMode: file.oldMode,
        newMode: file.newMode,
        checksumBefore: file.checksumBefore,
        checksumAfter: file.checksumAfter,
      };
    }).filter(Boolean);
  }

  btnHideWhitespace.addEventListener("click", () => {
    hideWhitespace = !hideWhitespace;
    btnHideWhitespace.classList.toggle("btn-active", hideWhitespace);
    savePrefs();
    if (currentRaw) renderDiff(currentRaw);
  });

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
  function setSidebar(visible) {
    sidebarVisible = visible;
    sidebar.classList.toggle("collapsed", !sidebarVisible);
    btnToggleSidebar.classList.toggle("btn-active", sidebarVisible);
    if (isMobile) sidebarBackdrop.classList.toggle("hidden", !sidebarVisible);
    savePrefs();
  }

  btnToggleSidebar.addEventListener("click", () => setSidebar(!sidebarVisible));
  sidebarBackdrop.addEventListener("click", () => setSidebar(false));

  // ═══════════════════════════════════════════════════════════
  // Render diff
  // ═══════════════════════════════════════════════════════════
  function renderDiff(raw) {
    currentRaw = raw;
    collapsed = false;
    btnCollapseAll.textContent = "Collapse All";
    // Exit tutorial mode on re-render
    if (tutorialActive) {
      tutorialActive = false;
      btnTutorial.classList.remove("btn-active");
      diffContainer.removeEventListener("click", handleTutorialCopy);
      savedDiffHtml = "";
    }

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

    const parsed = Diff2Html.parse(raw);
    const filtered = hideWhitespace ? filterWhitespaceFiles(parsed) : parsed;

    diffContainer.innerHTML = "";
    const ui = new Diff2HtmlUI(diffContainer, filtered, config);
    ui.draw();
    ui.highlightCode();

    buildStats(filtered);
    buildSidebarTree(filtered);
    updateShareUrl(raw);

    // Show sidebar for multi-file diffs (respect saved pref on first load)
    if (parsed.length <= 1) {
      sidebarVisible = false;
    }
    sidebar.classList.toggle("collapsed", !sidebarVisible);
    btnToggleSidebar.classList.toggle("btn-active", sidebarVisible);
    if (isMobile) sidebarBackdrop.classList.toggle("hidden", !sidebarVisible);

    inputPanel.classList.add("hidden");
    outputPanel.classList.remove("hidden");
    outputToolbar.classList.remove("hidden");
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
      el.addEventListener("click", () => { scrollToFile(file.idx); highlightTreeFile(file.idx); if (isMobile) setSidebar(false); });
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
    const bodies = diffContainer.querySelectorAll(".d2h-file-diff, .d2h-files-diff");
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
  // Export dropdown
  // ═══════════════════════════════════════════════════════════
  btnExport.addEventListener("click", function (e) {
    e.stopPropagation();
    exportMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", function () {
    exportMenu.classList.add("hidden");
  });

  exportMenu.addEventListener("click", function () {
    exportMenu.classList.add("hidden");
  });

  function updateExportMenu() {
    exportMenu.querySelectorAll(".export-tutorial-only").forEach(function (el) {
      el.classList.toggle("hidden", !tutorialActive);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // Download (with WebView detection)
  // ═══════════════════════════════════════════════════════════
  if (isWebView) {
    btnExport.title = "Open in browser to download";
  }

  function webViewWarn(btn) {
    if (!btn.dataset.origText) btn.dataset.origText = btn.textContent;
    btn.textContent = "Open in browser ↗";
    btn.style.color = "var(--yellow)";
    setTimeout(function () { btn.textContent = btn.dataset.origText; btn.style.color = ""; }, 2500);
  }

  btnDownload.addEventListener("click", () => {
    if (isWebView) { webViewWarn(btnExport); return; }
    if (!currentRaw) return;
    const blob = new Blob([currentRaw], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "changes.patch";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
  });

  // Export as self-contained HTML
  btnDownloadHtml.addEventListener("click", () => {
    if (isWebView) { webViewWarn(btnExport); return; }
    if (!diffContainer.innerHTML) return;
    const t = THEMES[currentThemeName] || THEMES["github-dark"];
    const hljsName = t.type === "dark" ? "github-dark" : "github";
    var tutorialCss = "";
    if (tutorialActive) {
      tutorialCss =
        '.tutorial-view{max-width:900px}\n' +
        '.tutorial-commit{border:1px solid ' + t.border + ';border-radius:6px;margin-bottom:20px;padding:16px;background:' + t.surface + '}\n' +
        '.tutorial-commit-subject{font-size:18px;font-weight:700;margin-bottom:8px;line-height:1.3}\n' +
        '.tutorial-commit-meta{display:flex;gap:16px;font-size:13px;color:' + t.textMuted + ';flex-wrap:wrap}\n' +
        '.tutorial-commit-author{color:' + t.accent + '}\n' +
        '.tutorial-commit-body{margin-top:12px;padding-top:12px;border-top:1px solid ' + t.border + ';font-size:13px;line-height:1.5;white-space:pre-wrap}\n' +
        '.tutorial-file{border:1px solid ' + t.border + ';border-radius:6px;margin-bottom:20px;overflow:hidden}\n' +
        '.tutorial-file-header{background:' + t.surface + ';padding:10px 14px;font-family:monospace;font-size:13px;font-weight:600;border-bottom:1px solid ' + t.border + '}\n' +
        '.tutorial-file-path{color:' + t.accent + '}\n' +
        '.tutorial-action-badge{display:inline-block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;padding:2px 6px;border-radius:3px;vertical-align:middle}\n' +
        '.tutorial-badge-new{background:' + t.green + ';color:#000}\n' +
        '.tutorial-badge-delete{background:' + t.red + ';color:#fff}\n' +
        '.tutorial-step{padding:12px 14px;border-bottom:1px solid ' + t.border + '}\n' +
        '.tutorial-step:last-child{border-bottom:none}\n' +
        '.tutorial-step+.tutorial-step{margin-top:4px;border-top:1px dashed ' + t.border + '}\n' +
        '.tutorial-instruction{font-size:13px;font-weight:600;margin-bottom:6px;color:' + t.textMuted + '}\n' +
        '.tutorial-instruction-find{color:' + (t.yellow || t.textMuted) + '}\n' +
        '.tutorial-instruction-replace{color:' + t.accent + ';margin-top:10px}\n' +
        '.tutorial-instruction-add{color:' + t.green + ';margin-top:10px}\n' +
        '.tutorial-instruction-remove{color:' + t.red + '}\n' +
        '.tutorial-code-wrap{position:relative}\n' +
        '.tutorial-code{background:' + t.bg + ';border:1px solid ' + t.border + ';border-radius:4px;padding:10px 12px;font-family:monospace;font-size:12px;line-height:1.5;overflow-x:auto;white-space:pre;margin:0}\n' +
        '.tutorial-index{border:1px solid ' + t.border + ';border-radius:6px;margin-bottom:20px;overflow:hidden}\n' +
        '.tutorial-index-header{background:' + t.surface + ';padding:10px 14px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:' + t.textMuted + ';border-bottom:1px solid ' + t.border + '}\n' +
        '.tutorial-index ul{list-style:none;margin:0;padding:6px 0}\n' +
        '.tutorial-index li{padding:4px 14px;font-family:monospace;font-size:13px}\n' +
        '.tutorial-index a{color:' + t.accent + ';text-decoration:none}\n' +
        '.tutorial-index a:hover{text-decoration:underline}\n' +
        '.tutorial-copy{position:absolute;top:6px;right:6px;background:' + t.surface + ';border:1px solid ' + t.border + ';color:' + t.textMuted + ';font-size:11px;padding:2px 8px;border-radius:3px;cursor:pointer}\n' +
        '.tutorial-copy:hover{color:' + t.text + ';border-color:' + t.accent + '}\n';
    }
    var exportContent = tutorialActive
      ? generateTutorialHtml(Diff2Html.parse(currentRaw), true, currentRaw)
      : diffContainer.innerHTML;
    var exportScript = tutorialActive
      ? '<script>function tutCopy(text,btn){if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){btn.textContent="Copied!";setTimeout(function(){btn.textContent="Copy"},1500)}).catch(function(){fallback(text,btn)})}else{fallback(text,btn)}}function fallback(text,btn){var ta=document.createElement("textarea");ta.value=text;ta.style.cssText="position:fixed;opacity:0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");btn.textContent="Copied!";setTimeout(function(){btn.textContent="Copy"},1500)}catch(e){btn.textContent="Failed"}document.body.removeChild(ta)}document.addEventListener("click",function(e){var btn=e.target.closest(".tutorial-copy");if(!btn)return;var pre=btn.parentElement.querySelector(".tutorial-code");if(!pre)return;tutCopy(pre.textContent,btn)});<\/script>\n'
      : '';
    const html = '<!DOCTYPE html>\n<html lang="en"><head>\n' +
      '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">\n' +
      '<title>DiffyViewer Export</title>\n' +
      (tutorialActive ? '' : '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.11.1/styles/' + hljsName + '.min.css">\n' +
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/diff2html@3.4.56/bundles/css/diff2html.min.css">\n') +
      '<style>\n' +
      'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;' +
      'background:' + t.bg + ';color:' + t.text + ';padding:24px;margin:0}\n' +
      '.d2h-wrapper{background:transparent}\n' +
      '.d2h-file-wrapper{border:1px solid ' + t.border + ';border-radius:6px;margin-bottom:16px;overflow:hidden}\n' +
      '.d2h-file-header{background:' + t.bg + '}\n' +
      '.d2h-file-list-wrapper{display:none}\n' +
      tutorialCss +
      '</style>\n' +
      '</head><body>\n' +
      exportContent +
      '\n' + exportScript + '</body></html>';
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diff.html";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
  });

  // Export tutorial as Markdown
  btnExportMarkdown.addEventListener("click", function () {
    if (isWebView) { webViewWarn(btnExport); return; }
    if (!currentRaw || !tutorialActive) return;
    var parsed = Diff2Html.parse(currentRaw);
    var filtered = hideWhitespace ? filterWhitespaceFiles(parsed) : parsed;
    var md = generateTutorialText(filtered, currentRaw, "markdown");
    var blob = new Blob([md], { type: "text/markdown" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "tutorial.md";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
  });

  // Export tutorial as BBCode
  btnExportBBCode.addEventListener("click", function () {
    if (isWebView) { webViewWarn(btnExport); return; }
    if (!currentRaw || !tutorialActive) return;
    var parsed = Diff2Html.parse(currentRaw);
    var filtered = hideWhitespace ? filterWhitespaceFiles(parsed) : parsed;
    var bb = generateTutorialText(filtered, currentRaw, "bbcode");
    var blob = new Blob([bb], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "tutorial.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
  });

  // Export tutorial as plain text
  btnExportPlain.addEventListener("click", function () {
    if (isWebView) { webViewWarn(btnExport); return; }
    if (!currentRaw || !tutorialActive) return;
    var parsed = Diff2Html.parse(currentRaw);
    var filtered = hideWhitespace ? filterWhitespaceFiles(parsed) : parsed;
    var txt = generateTutorialText(filtered, currentRaw, "plain");
    var blob = new Blob([txt], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "tutorial.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
  });

  // ═══════════════════════════════════════════════════════════
  // Tutorial view
  // ═══════════════════════════════════════════════════════════
  let tutorialActive = false;
  let savedDiffHtml = "";

  function stripPrefix(line) {
    // Remove the leading +/-/space character from diff lines
    return line.length > 0 ? line.substring(1) : "";
  }

  // Map file extension to hljs language name; returns " language-xxx" or ""
  function langSuffix(file) {
    var name = file.newName || file.oldName || "";
    var ext = name.split(".").pop().toLowerCase();
    var map = {
      py: "python", js: "javascript", ts: "typescript", jsx: "javascript", tsx: "typescript",
      rb: "ruby", rs: "rust", go: "go", java: "java", c: "c", cpp: "cpp", cc: "cpp",
      h: "c", hpp: "cpp", hh: "cpp", cs: "csharp", php: "php", lua: "lua",
      sh: "bash", bash: "bash", zsh: "bash", bat: "dos", cmd: "dos", ps1: "powershell",
      yml: "yaml", yaml: "yaml", json: "json", xml: "xml", html: "html", css: "css",
      scss: "scss", less: "less", sql: "sql", md: "markdown", r: "r", swift: "swift",
      kt: "kotlin", scala: "scala", pl: "perl", m: "objectivec", mm: "objectivec",
      hs: "haskell", ex: "elixir", erl: "erlang", clj: "clojure", dart: "dart",
      v: "verilog", sv: "verilog", vhd: "vhdl", zig: "zig", nim: "nim",
      makefile: "makefile", dockerfile: "dockerfile", cmake: "cmake",
      toml: "ini", ini: "ini", conf: "ini", cfg: "ini", proto: "protobuf",
    };
    // Handle extensionless files like Makefile, Dockerfile
    var basename = name.split("/").pop().toLowerCase();
    var lang = map[ext] || map[basename] || "";
    return lang ? " language-" + lang : "";
  }

  function parseCommitMeta(raw) {
    var lines = raw.split("\n");
    var meta = { author: "", date: "", subject: "", body: "" };
    var i = 0;

    // git log -p format: "commit <hash>"
    if (/^commit [0-9a-f]{7,}/.test(lines[0])) {
      i = 1;
      while (i < lines.length && !lines[i].startsWith("diff ")) {
        var line = lines[i];
        if (/^Author:\s+/i.test(line)) meta.author = line.replace(/^Author:\s+/i, "").trim();
        else if (/^Date:\s+/i.test(line)) meta.date = line.replace(/^Date:\s+/i, "").trim();
        else if (line.startsWith("    ") && !meta.subject) meta.subject = line.trim();
        else if (line.startsWith("    ") && meta.subject) meta.body += (meta.body ? "\n" : "") + line.trim();
        i++;
      }
    }
    // git format-patch format: "From <hash>" or starts with "From:"
    else if (/^From [0-9a-f]{7,}/.test(lines[0]) || /^From:\s+/.test(lines[0])) {
      i = /^From [0-9a-f]/.test(lines[0]) ? 1 : 0;
      var inBody = false;
      while (i < lines.length && !lines[i].startsWith("diff ") && lines[i] !== "---") {
        var line = lines[i];
        if (/^From:\s+/i.test(line)) meta.author = line.replace(/^From:\s+/i, "").trim();
        else if (/^Date:\s+/i.test(line)) meta.date = line.replace(/^Date:\s+/i, "").trim();
        else if (/^Subject:\s+/i.test(line)) { meta.subject = line.replace(/^Subject:\s+(\[PATCH[^\]]*\]\s*)?/i, "").trim(); inBody = true; }
        else if (inBody && line === "") inBody = true;
        else if (inBody && line !== "---") meta.body += (meta.body ? "\n" : "") + line;
        i++;
      }
    }

    if (!meta.author && !meta.subject) return null;
    return meta;
  }

  function generateTutorialText(parsed, raw, format) {
    var isMd = format === "markdown";
    var isBB = format === "bbcode";
    var out = "";

    function code(text, lang) {
      if (isMd) return "```" + (lang || "") + "\n" + text + "\n```\n";
      if (isBB) return "[code]" + text + "[/code]\n";
      return text + "\n\n";
    }
    function heading(text, level) {
      if (isMd) return "#".repeat(level) + " " + text + "\n\n";
      if (isBB) return "[size=" + (7 - level) + "][b]" + text + "[/b][/size]\n\n";
      var line = "=".repeat(text.length);
      return line + "\n" + text + "\n" + line + "\n\n";
    }
    function bold(text) {
      if (isMd) return "**" + text + "**";
      if (isBB) return "[b]" + text + "[/b]";
      return text.toUpperCase();
    }
    function label(text) {
      return bold(text) + "\n";
    }
    function hr() {
      if (isMd) return "---\n\n";
      if (isBB) return "[hr]\n\n";
      return "\n";
    }

    // Commit metadata
    var meta = raw ? parseCommitMeta(raw) : null;
    if (meta) {
      if (meta.subject) out += heading(meta.subject, 1);
      if (meta.author) out += bold("Author:") + " " + meta.author + "\n";
      if (meta.date) out += bold("Date:") + " " + meta.date + "\n";
      if (meta.author || meta.date) out += "\n";
      if (meta.body) out += meta.body + "\n\n";
      out += hr();
    }

    parsed.forEach(function (file, idx) {
      var filePath = file.newName || file.oldName || "(unknown)";
      var isNew = file.oldName === "/dev/null";
      var isDeleted = file.newName === "/dev/null";
      var fileLabel = filePath;
      if (isNew) fileLabel = "[NEW FILE] " + filePath;
      else if (isDeleted) fileLabel = "[DELETE FILE] " + filePath;

      out += heading(fileLabel, 2);

      if (isNew) {
        var content = "";
        file.blocks.forEach(function (block) {
          block.lines.forEach(function (line) {
            if (line.type === "insert") content += stripPrefix(line.content) + "\n";
          });
        });
        out += label("Create this file with the following content:") + code(content.replace(/\n$/, "")) + "\n";
      } else if (isDeleted) {
        out += bold("Delete this file.") + "\n\n";
      } else {
        var steps = [];
        file.blocks.forEach(function (block) {
          var lines = block.lines;
          var i = 0;
          while (i < lines.length) {
            while (i < lines.length && lines[i].type === "context") { i++; }
            if (i >= lines.length) break;

            var contextBefore = [];
            var cb = i - 1;
            while (cb >= 0 && lines[cb].type === "context" && contextBefore.length < 2) {
              contextBefore.unshift(lines[cb]);
              cb--;
            }

            var dels = [];
            var adds = [];
            while (i < lines.length && (lines[i].type === "delete" || lines[i].type === "insert")) {
              if (lines[i].type === "delete") dels.push(lines[i]);
              else adds.push(lines[i]);
              i++;
            }

            var step = "";
            if (dels.length > 0 && adds.length > 0) {
              var findText = dels.map(function (l) { return stripPrefix(l.content); }).join("\n");
              var replaceText = adds.map(function (l) { return stripPrefix(l.content); }).join("\n");
              step = label("Find:") + code(findText) + label("Replace with:") + code(replaceText);
            } else if (adds.length > 0) {
              var addText = adds.map(function (l) { return stripPrefix(l.content); }).join("\n");
              if (contextBefore.length > 0) {
                var anchorText = contextBefore.map(function (l) { return stripPrefix(l.content); }).join("\n");
                step = label("Find:") + code(anchorText) + label("Add below:") + code(addText);
              } else {
                step = label("Add at the beginning of the section:") + code(addText);
              }
            } else if (dels.length > 0) {
              var removeText = dels.map(function (l) { return stripPrefix(l.content); }).join("\n");
              step = label("Remove:") + code(removeText);
            }
            if (step) steps.push(step);
          }
        });
        var sep = isMd ? "\n---\n\n" : isBB ? "\n[hr]\n\n" : "\n- - - - - - - - - - - - - - - - - - - -\n\n";
        out += steps.join(sep) + "\n";
      }

      if (idx < parsed.length - 1) out += hr();
    });

    if (!isMd && !isBB) out += "========================================\n";
    return out;
  }

  function generateTutorialHtml(parsed, forExport, raw) {
    let html = '<div class="tutorial-view">';

    // Commit metadata header
    var meta = raw ? parseCommitMeta(raw) : null;
    if (meta) {
      html += '<div class="tutorial-commit">';
      if (meta.subject) html += '<div class="tutorial-commit-subject">' + esc(meta.subject) + '</div>';
      html += '<div class="tutorial-commit-meta">';
      if (meta.author) html += '<span class="tutorial-commit-author">' + esc(meta.author) + '</span>';
      if (meta.date) html += '<span class="tutorial-commit-date">' + esc(meta.date) + '</span>';
      html += '</div>';
      if (meta.body) html += '<div class="tutorial-commit-body">' + esc(meta.body) + '</div>';
      html += '</div>';
    }

    // File index for export
    if (forExport && parsed.length > 1) {
      html += '<div class="tutorial-index"><div class="tutorial-index-header">Files</div><ul>';
      parsed.forEach(function (file, idx) {
        var fp = file.newName || file.oldName || "(unknown)";
        var badge = "";
        if (file.oldName === "/dev/null") badge = ' <span class="tutorial-action-badge tutorial-badge-new">NEW</span>';
        else if (file.newName === "/dev/null") badge = ' <span class="tutorial-action-badge tutorial-badge-delete">DEL</span>';
        html += '<li><a href="#tutorial-file-' + idx + '">' + esc(fp) + '</a>' + badge + '</li>';
      });
      html += '</ul></div>';
    }

    parsed.forEach(function (file, idx) {
      const filePath = file.newName || file.oldName || "(unknown)";
      const isNew = file.oldName === "/dev/null";
      const isDeleted = file.newName === "/dev/null";
      const ls = langSuffix(file);
      html += '<div class="tutorial-file" id="tutorial-file-' + idx + '">';
      html += '<div class="tutorial-file-header">';
      if (isNew) {
        html += '<span class="tutorial-action-badge tutorial-badge-new">NEW FILE</span> ';
      } else if (isDeleted) {
        html += '<span class="tutorial-action-badge tutorial-badge-delete">DELETE FILE</span> ';
      }
      html += '<span class="tutorial-file-path">' + esc(filePath) + '</span>';
      html += '</div>';

      if (isNew) {
        // New file: show full content to create
        var content = "";
        file.blocks.forEach(function (block) {
          block.lines.forEach(function (line) {
            if (line.type === "insert") content += stripPrefix(line.content) + "\n";
          });
        });
        html += '<div class="tutorial-step">';
        html += '<div class="tutorial-instruction">Create this file with the following content:</div>';
        html += '<div class="tutorial-code-wrap"><button class="tutorial-copy" title="Copy">Copy</button>';
        html += '<pre class="tutorial-code' + ls + '">' + esc(content.replace(/\n$/, "")) + '</pre></div>';
        html += '</div>';
      } else if (isDeleted) {
        html += '<div class="tutorial-step">';
        html += '<div class="tutorial-instruction">Delete this file.</div>';
        html += '</div>';
      } else {
        // Modified file: generate find/replace steps per hunk
        file.blocks.forEach(function (block) {
          var lines = block.lines;
          // Split hunk into groups: sequences of changes with surrounding context
          var i = 0;
          while (i < lines.length) {
            // Skip leading context
            while (i < lines.length && lines[i].type === "context") { i++; }
            if (i >= lines.length) break;

            // Grab context before (up to 2 lines)
            var contextBefore = [];
            var cb = i - 1;
            while (cb >= 0 && lines[cb].type === "context" && contextBefore.length < 2) {
              contextBefore.unshift(lines[cb]);
              cb--;
            }

            // Collect consecutive changes
            var dels = [];
            var adds = [];
            while (i < lines.length && (lines[i].type === "delete" || lines[i].type === "insert")) {
              if (lines[i].type === "delete") dels.push(lines[i]);
              else adds.push(lines[i]);
              i++;
            }

            // Grab context after (up to 2 lines)
            var contextAfter = [];
            var ca = i;
            while (ca < lines.length && lines[ca].type === "context" && contextAfter.length < 2) {
              contextAfter.push(lines[ca]);
              ca++;
            }

            html += '<div class="tutorial-step">';

            if (dels.length > 0 && adds.length > 0) {
              // Replace
              var findText = dels.map(function (l) { return stripPrefix(l.content); }).join("\n");
              var replaceText = adds.map(function (l) { return stripPrefix(l.content); }).join("\n");
              html += '<div class="tutorial-instruction tutorial-instruction-find">Find:</div>';
              html += '<div class="tutorial-code-wrap"><button class="tutorial-copy" title="Copy">Copy</button>';
              html += '<pre class="tutorial-code tutorial-code-find' + ls + '">' + esc(findText) + '</pre></div>';
              html += '<div class="tutorial-instruction tutorial-instruction-replace">Replace with:</div>';
              html += '<div class="tutorial-code-wrap"><button class="tutorial-copy" title="Copy">Copy</button>';
              html += '<pre class="tutorial-code tutorial-code-replace' + ls + '">' + esc(replaceText) + '</pre></div>';
            } else if (adds.length > 0) {
              // Add — show what comes before so user knows where to insert
              var addText = adds.map(function (l) { return stripPrefix(l.content); }).join("\n");
              if (contextBefore.length > 0) {
                var anchorText = contextBefore.map(function (l) { return stripPrefix(l.content); }).join("\n");
                html += '<div class="tutorial-instruction tutorial-instruction-find">Find:</div>';
                html += '<div class="tutorial-code-wrap"><button class="tutorial-copy" title="Copy">Copy</button>';
                html += '<pre class="tutorial-code tutorial-code-find' + ls + '">' + esc(anchorText) + '</pre></div>';
                html += '<div class="tutorial-instruction tutorial-instruction-add">Add below:</div>';
              } else {
                html += '<div class="tutorial-instruction tutorial-instruction-add">Add at the beginning of the section:</div>';
              }
              html += '<div class="tutorial-code-wrap"><button class="tutorial-copy" title="Copy">Copy</button>';
              html += '<pre class="tutorial-code tutorial-code-add' + ls + '">' + esc(addText) + '</pre></div>';
            } else if (dels.length > 0) {
              // Remove
              var removeText = dels.map(function (l) { return stripPrefix(l.content); }).join("\n");
              html += '<div class="tutorial-instruction tutorial-instruction-remove">Remove:</div>';
              html += '<div class="tutorial-code-wrap"><button class="tutorial-copy" title="Copy">Copy</button>';
              html += '<pre class="tutorial-code tutorial-code-remove' + ls + '">' + esc(removeText) + '</pre></div>';
            }

            html += '</div>'; // tutorial-step
          }
        });
      }

      html += '</div>'; // tutorial-file
    });

    html += '</div>';
    return html;
  }

  function handleTutorialCopy(e) {
    var btn = e.target.closest(".tutorial-copy");
    if (!btn) return;
    var pre = btn.parentElement.querySelector(".tutorial-code");
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent).then(function () {
      var orig = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(function () { btn.textContent = orig; }, 1500);
    });
  }

  btnTutorial.addEventListener("click", function () {
    if (!currentRaw) return;
    tutorialActive = !tutorialActive;
    btnTutorial.classList.toggle("btn-active", tutorialActive);
    updateExportMenu();

    if (tutorialActive) {
      var parsed = Diff2Html.parse(currentRaw);
      var filtered = hideWhitespace ? filterWhitespaceFiles(parsed) : parsed;
      savedDiffHtml = diffContainer.innerHTML;
      diffContainer.innerHTML = generateTutorialHtml(filtered, false, currentRaw);
      if (typeof hljs !== "undefined") {
        diffContainer.querySelectorAll("pre[class*='language-']").forEach(function (el) {
          hljs.highlightElement(el);
        });
      }
      diffContainer.addEventListener("click", handleTutorialCopy);
    } else {
      diffContainer.removeEventListener("click", handleTutorialCopy);
      diffContainer.innerHTML = savedDiffHtml;
      savedDiffHtml = "";
    }
  });

  // ═══════════════════════════════════════════════════════════
  // Back / Submit
  // ═══════════════════════════════════════════════════════════
  btnDiff.addEventListener("click", () => {
    const raw = diffInput.value.trim();
    if (raw) renderDiff(raw);
  });

  function goHome() {
    outputPanel.classList.add("hidden");
    outputToolbar.classList.add("hidden");
    inputPanel.classList.remove("hidden");
    diffContainer.innerHTML = "";
    sidebarTree.innerHTML = "";
    diffStats.innerHTML = "";
    history.replaceState(null, "", location.pathname);
  }

  $("#logo").addEventListener("click", goHome);

  // ═══════════════════════════════════════════════════════════
  // Shareable URL (pako compress → base64url → hash)
  // ═══════════════════════════════════════════════════════════
  const shareInput = $("#shareInput");
  const btnCopyUrl = $("#btnCopyUrl");

  function encodeToHash(raw) {
    try {
      const compressed = pako.deflateRaw(new TextEncoder().encode(raw));
      let b64 = btoa(String.fromCharCode.apply(null, compressed));
      // base64 → base64url
      b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      return b64;
    } catch { return ""; }
  }

  function decodeFromHash(hash) {
    try {
      let b64 = hash.replace(/-/g, "+").replace(/_/g, "/");
      // re-pad
      while (b64.length % 4) b64 += "=";
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder().decode(pako.inflateRaw(bytes));
    } catch { return ""; }
  }

  function updateShareUrl(raw) {
    const hash = encodeToHash(raw);
    if (hash) {
      const url = location.origin + location.pathname + "#" + hash;
      history.replaceState(null, "", "#" + hash);
      shareInput.value = url;
    } else {
      shareInput.value = location.href;
    }
  }

  btnCopyUrl.addEventListener("click", () => {
    navigator.clipboard.writeText(shareInput.value).then(() => {
      const orig = btnCopyUrl.textContent;
      btnCopyUrl.textContent = "Copied!";
      setTimeout(() => { btnCopyUrl.textContent = orig; }, 1500);
    });
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
      e.preventDefault(); goHome(); return;
    }
    if (e.target === diffInput) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); btnDiff.click(); }
      return;
    }
    if (outputPanel.classList.contains("hidden")) return;

    if (e.key === "b") { e.preventDefault(); btnToggleSidebar.click(); return; }
    if (e.key === "w") { e.preventDefault(); btnHideWhitespace.click(); return; }

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

    // Restore hide-whitespace button state
    btnHideWhitespace.classList.toggle("btn-active", hideWhitespace);

    // Restore sidebar state
    btnToggleSidebar.classList.toggle("btn-active", sidebarVisible);
    sidebar.classList.toggle("collapsed", !sidebarVisible);
    if (isMobile) sidebarBackdrop.classList.toggle("hidden", !sidebarVisible);

    // Load diff from URL hash if present
    const hash = location.hash.slice(1);
    if (hash) {
      const decoded = decodeFromHash(hash);
      if (decoded) {
        diffInput.value = decoded;
        renderDiff(decoded);
      }
    }
  })();
})();
