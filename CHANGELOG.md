# Changelog

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
