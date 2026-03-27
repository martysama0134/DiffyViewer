# Changelog

## v1.8.0

### Features

- **URL loader** — load diffs from remote URLs via `#@<url>` in the hash or by pasting a URL into the textarea
- **GitHub URL rewriting** — GitHub commit and PR URLs (including `.patch`/`.diff` links) are automatically routed through `api.github.com` to bypass CORS restrictions
- **Commit metadata in diff view** — author, date, subject, and body from `git log -p` / `git format-patch` output now shown at the top of the diff view (previously tutorial-only)

### Improvements

- Loading spinner and error UI for URL fetches (CORS, timeout, HTTP errors)
- Cache-busting now uses version tag (`?v=1.8.0`)
- Commit metadata CSS included in all HTML exports, not just tutorial exports

### Fixes

- Fix `j`/`k` keyboard navigation not working in tutorial mode (wrong selector)
- Fix `Diff2Html.parse()` crash on malformed input showing blank screen (now shows error with Go Back button)

## v1.7.0

### Features

- Colored `+X` `-X` stats in the tutorial export file tree index

### Improvements

- SRI integrity hashes on all CDN scripts and diff2html CSS
- Cache-busting on `app.js` (`app.js?v=3`)
- Extracted shared `downloadBlob` and `exportTutorialAs` helpers, removing duplicated export code

### Fixes

- Fix `btoa` stack overflow on large diffs (chunked 8KB conversion)
- Fix deleted files showing as `/dev/null` in sidebar tree, tutorial view, and text exports
- Fix sidebar tree not scrolling to files when in tutorial mode

## v1.6.0

### Improvements

- Plain text export: consistent `===` heading bars above and below file names
- Plain text export: added spacing between Find/Replace code blocks for readability
- Plain text export: wider step separators for better visibility
- Plain text export: replaced unicode box-drawing separator with pure ASCII
- Plain text export: single closing separator at end of document instead of between each file
- Updated README with tutorial view, export formats, and correct repo URL

## v1.5.0

### Features

- **Export dropdown** — single `⬇ Export ▾` button replaces individual download buttons, with conditional menu items
- **Markdown tutorial export** — fenced code blocks, headings, horizontal rule separators between steps
- **BBCode tutorial export** — `[code]`, `[b]`, `[size]`, `[hr]` tags for forum posting
- **Plain text tutorial export** — no markup, works anywhere (notepad, Discord, DMs)

### Changes

- Reordered toolbar: Tutorial before export buttons
- Download buttons now show `⬇` emoji prefix

## v1.4.0

### Changes

- Removed "New Diff" button (use logo click or Esc to go home)
- Renamed "HTML" button to "Export HTML" and moved it to last position in toolbar
- In-app WebView detection (Telegram, Instagram, Facebook, etc.) — shows "Open in browser" hint on download buttons

### Fixes

- Fix "Find:" label showing grey instead of yellow in tutorial view (missing `--yellow` CSS variable)
- Fix mobile downloads not triggering (anchor element now appended to DOM before click)
- Fix tutorial export copy button on non-HTTPS contexts (fallback to `execCommand`)
- Fix WebView warning button text not restoring after double-click

## v1.3.0

### Features

- **Syntax highlighting in tutorial view** — code blocks are highlighted via highlight.js based on file extension
- **Commit metadata in tutorial view** — displays author, date, subject, and description when available (supports `git log -p` and `git format-patch` output)

### Fixes

- Fix script loading race on hard-refresh by deferring app.js

## v1.2.0

### Features

- **Tutorial view** — converts diffs into human-readable find/replace instructions (Find → Replace with, Find → Add below, Remove, New file, Delete file)
- Per-block copy buttons in tutorial view for easy forum pasting
- Tutorial HTML export with clickable file tree index and inline copy buttons

## v1.1.0

### Improvements

- Default to unified view and hidden sidebar on mobile for better usability
- Mobile sidebar is now a full-height drawer overlay with backdrop dismiss
- Tapping a file in the tree auto-closes the sidebar on mobile

## v1.0.0

Initial release.

### Features

- Split (side-by-side) and unified diff viewing
- Syntax highlighting via highlight.js / diff2html-ui-slim
- Character-level inline diffs (`diffStyle: "char"`)
- 24 color themes with live switching (GitHub Dark/Light, Dracula, Nord, Catppuccin Mocha/Latte, Tokyo Night, One Dark, Solarized Dark/Light, Gruvbox Dark/Light, Monokai Pro, Rose Pine/Dawn, Kanagawa, Everforest Dark, Ayu Dark, Palenight, Synthwave '84, Poimandres, Night Owl, Zenburn, Zenburn Darker)
- Hide Whitespace toggle using LCS alignment on parsed DiffFile[] data, matching `git diff -w` behavior
- Sidebar file tree with hierarchical directory structure, per-file +/- stats, collapsible directories
- Collapse/Expand All files toggle
- Shareable URLs via pako-compressed base64url hash fragments
- Download as `.patch` file
- Download as self-contained HTML file
- Drag & drop file upload
- Diff stats summary (files changed, additions, deletions)
- Keyboard shortcuts (j/k navigate, b tree, w whitespace, Esc home, Ctrl+Enter submit)
- Clickable logo to return home
- Sticky header + toolbar (single sticky container)
- All preferences persisted in localStorage (theme, view mode, sidebar, whitespace)
- Responsive layout for mobile
- CSS cache-busting via query string
- Large diff guard (diffMaxChanges: 5000)
- Auto-loads diff from URL hash on page load
