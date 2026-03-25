# DiffyViewer

Browser-based diff viewer. Paste or upload patches, view side-by-side or unified diffs with syntax highlighting. Runs entirely client-side on GitHub Pages.

An alternative to [diffy.org](https://github.com/pbu88/diffy) that requires no server, no accounts, and no expiring links.

## Features

- **Split & Unified views** -- toggle between side-by-side and inline diff layouts
- **Syntax highlighting** -- powered by highlight.js via diff2html
- **Character-level diffs** -- see exactly which characters changed within a line
- **24 color themes** -- GitHub Dark/Light, Dracula, Nord, Catppuccin Mocha/Latte, Tokyo Night, One Dark, Solarized Dark/Light, Gruvbox Dark/Light, Monokai Pro, Rose Pine/Dawn, Kanagawa, Everforest Dark, Ayu Dark, Palenight, Synthwave '84, Poimandres, Night Owl, Zenburn, Zenburn Darker
- **Hide Whitespace** -- filters whitespace-only changes using LCS alignment, matching `git diff -w` behavior
- **Sidebar file tree** -- hierarchical directory tree with per-file +/- stats, collapsible directories
- **Collapse/Expand All** -- toggle all file diffs at once
- **Shareable URLs** -- diffs are compressed (pako deflate) and stored in the URL hash, no server needed
- **Download Patch** -- save the raw diff as a `.patch` file
- **Download HTML** -- export the rendered diff as a self-contained HTML file
- **Drag & drop** -- drop `.diff` or `.patch` files anywhere on the page
- **Keyboard shortcuts** -- `j`/`k` navigate files, `b` toggle tree, `w` toggle whitespace, `Esc` go home, `Ctrl+Enter` submit
- **Persistent preferences** -- theme, view mode, sidebar, and whitespace settings saved in localStorage
- **Sticky header** -- toolbar stays visible while scrolling through long diffs

## Usage

### GitHub Pages

Visit the deployed site, then either:

1. **Paste** a diff into the textarea and click **View Diff**
2. **Upload** a `.diff` or `.patch` file
3. **Drag & drop** a file onto the page
4. **Open a shared URL** with the diff encoded in the hash

### Self-hosted

Clone the repo and open `index.html` in a browser. No build step, no dependencies to install.

```
git clone https://github.com/user/DiffyViewer.git
cd DiffyViewer
# open index.html in your browser
```

### Generating diffs

```bash
# Copy to clipboard
git diff | clip          # Windows
git diff | pbcopy        # Mac

# Save to file
git diff > changes.patch
git diff HEAD~3 > last-3-commits.patch
```

## Tech Stack

- [diff2html](https://github.com/rtfpessoa/diff2html) -- diff parsing and rendering
- [highlight.js](https://highlightjs.org/) -- syntax highlighting (bundled with diff2html-ui-slim)
- [pako](https://github.com/nodeca/pako) -- zlib compression for shareable URLs
- Vanilla JS, no build tools, no frameworks

## License

MIT
