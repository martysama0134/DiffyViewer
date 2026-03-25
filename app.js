(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const inputPanel = $("#inputPanel");
  const outputPanel = $("#outputPanel");
  const diffInput = $("#diffInput");
  const diffOutput = $("#diffOutput");
  const fileTree = $("#fileTree");
  const btnDiff = $("#btnDiff");
  const btnBack = $("#btnBack");
  const btnSample = $("#btnSample");
  const fileUpload = $("#fileUpload");
  const viewToggle = $("#viewToggle");

  let currentMode = "side-by-side"; // "side-by-side" | "line-by-line"
  let currentRaw = "";

  // --- View toggle ---
  viewToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;
    viewToggle.querySelectorAll(".toggle-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode === "unified" ? "line-by-line" : "side-by-side";
    if (currentRaw) renderDiff(currentRaw);
  });

  // --- Render ---
  function renderDiff(raw) {
    currentRaw = raw;
    const html = Diff2Html.html(raw, {
      outputFormat: currentMode,
      drawFileList: false,
      matching: "lines",
      synchronisedScroll: true,
    });
    diffOutput.innerHTML = html;
    buildFileTree(raw);
    inputPanel.classList.add("hidden");
    outputPanel.classList.remove("hidden");
  }

  function buildFileTree(raw) {
    const parsed = Diff2Html.parse(raw);
    fileTree.innerHTML = "";
    if (parsed.length <= 1) return;

    parsed.forEach((file, i) => {
      const pill = document.createElement("button");
      pill.className = "file-pill";
      pill.textContent = shortName(file.newName || file.oldName);
      pill.title = file.newName || file.oldName;
      pill.addEventListener("click", () => {
        const wrappers = diffOutput.querySelectorAll(".d2h-file-wrapper");
        if (wrappers[i]) {
          wrappers[i].scrollIntoView({ behavior: "smooth", block: "start" });
          fileTree.querySelectorAll(".file-pill").forEach((p) => p.classList.remove("active"));
          pill.classList.add("active");
        }
      });
      fileTree.appendChild(pill);
    });
  }

  function shortName(path) {
    if (!path) return "(unknown)";
    const parts = path.split("/");
    return parts.length > 2 ? ".../" + parts.slice(-2).join("/") : path;
  }

  // --- Actions ---
  btnDiff.addEventListener("click", () => {
    const raw = diffInput.value.trim();
    if (!raw) return;
    renderDiff(raw);
  });

  btnBack.addEventListener("click", () => {
    outputPanel.classList.add("hidden");
    inputPanel.classList.remove("hidden");
    diffOutput.innerHTML = "";
    fileTree.innerHTML = "";
  });

  // --- File upload ---
  fileUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      diffInput.value = reader.result;
      renderDiff(reader.result.trim());
    };
    reader.readAsText(file);
    fileUpload.value = "";
  });

  // --- Drag & drop ---
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
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      diffInput.value = reader.result;
      renderDiff(reader.result.trim());
    };
    reader.readAsText(file);
  });

  // --- Keyboard shortcuts ---
  document.addEventListener("keydown", (e) => {
    if (outputPanel.classList.contains("hidden")) return;
    const wrappers = [...diffOutput.querySelectorAll(".d2h-file-wrapper")];
    if (wrappers.length <= 1) return;

    if (e.key === "j" || e.key === "k") {
      e.preventDefault();
      const scrollTop = window.scrollY;
      let currentIdx = 0;
      for (let i = 0; i < wrappers.length; i++) {
        if (wrappers[i].getBoundingClientRect().top <= 60) currentIdx = i;
      }
      const next = e.key === "j"
        ? Math.min(currentIdx + 1, wrappers.length - 1)
        : Math.max(currentIdx - 1, 0);
      wrappers[next].scrollIntoView({ behavior: "smooth", block: "start" });

      const pills = fileTree.querySelectorAll(".file-pill");
      pills.forEach((p) => p.classList.remove("active"));
      if (pills[next]) pills[next].classList.add("active");
    }
  });

  // --- Sample diff ---
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
`;

  btnSample.addEventListener("click", () => {
    diffInput.value = SAMPLE;
    renderDiff(SAMPLE.trim());
  });

  // --- Ctrl+Enter to submit ---
  diffInput.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      btnDiff.click();
    }
  });
})();
