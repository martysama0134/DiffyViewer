# DiffyViewer

Browser-based diff viewer and tutorial generator. Paste or upload patches, view side-by-side or unified diffs with syntax highlighting, and convert diffs into human-readable find/replace tutorials. Runs entirely client-side on GitHub Pages.

An alternative to [diffy.org](https://github.com/pbu88/diffy) that requires no server, no accounts, and no expiring links.

## Features

### Diff Viewing
- **Split & Unified views** -- toggle between side-by-side and inline diff layouts
- **Syntax highlighting** -- powered by highlight.js via diff2html
- **Character-level diffs** -- see exactly which characters changed within a line
- **24 color themes** -- GitHub Dark/Light, Dracula, Nord, Catppuccin Mocha/Latte, Tokyo Night, One Dark, Solarized Dark/Light, Gruvbox Dark/Light, Monokai Pro, Rose Pine/Dawn, Kanagawa, Everforest Dark, Ayu Dark, Palenight, Synthwave '84, Poimandres, Night Owl, Zenburn, Zenburn Darker
- **Hide Whitespace** -- filters whitespace-only changes using LCS alignment, matching `git diff -w` behavior
- **Commit metadata** -- displays author, date, subject, and body from `git log -p` and `git format-patch` output
- **Sidebar file tree** -- hierarchical directory tree with per-file +/- stats, collapsible directories
- **File search filter** -- filter files by path in the sidebar; hides non-matching files in both the tree and the diff view
- **Collapse/Expand All** -- toggle all file diffs at once
- **Shareable URLs** -- diffs are compressed (pako deflate) and stored in the URL hash, no server needed
- **URL loader** -- load diffs from remote URLs via `#@<url>` in the hash or by pasting a URL into the textarea; supports GitHub commits, PRs, and Gists (auto-rewritten to CORS-friendly API)

### Tutorial View
- **Find/Replace instructions** -- converts diffs into step-by-step instructions (Find, Replace with, Add below, Remove)
- **New/Deleted file handling** -- shows full content for new files, clear labels for deleted files
- **Syntax highlighting** -- code blocks highlighted based on file extension
- **Commit metadata** -- displays author, date, subject, and description when available (supports `git log -p` and `git format-patch` output)
- **Per-block copy buttons** -- hover to reveal, click to copy individual code blocks

### Export
- **Patch** -- download the raw diff as a `.patch` file
- **HTML** -- self-contained HTML with inline styles, clickable file tree index, commit header, and copy buttons (both diff and tutorial modes)
- **Markdown** -- fenced code blocks with horizontal rule separators between steps
- **BBCode** -- `[code]`, `[b]`, `[size]`, `[hr]` tags for forum posting
- **Plain Text** -- no markup, works anywhere (notepad, Discord, DMs)
- **Filtered exports** -- when a file filter is active, exports only include matching files with a "filtered" notice and `-filtered` filename suffix

### General
- **Drag & drop** -- drop `.diff` or `.patch` files anywhere on the page
- **Keyboard shortcuts** -- `j`/`k` navigate files, `b` toggle tree, `w` toggle whitespace, `f` focus file filter, `Esc` go home, `Ctrl+Enter` submit
- **Persistent preferences** -- theme, view mode, sidebar, and whitespace settings saved in localStorage
- **Sticky header** -- toolbar stays visible while scrolling through long diffs
- **Mobile support** -- responsive layout, drawer sidebar with backdrop dismiss, unified view default
- **WebView detection** -- warns users in Telegram, Instagram, etc. to open in browser for downloads

## Usage

### GitHub Pages

Visit the deployed site, then either:

1. **Paste** a diff into the textarea and click **View Diff**
2. **Paste a URL** to a `.patch` or `.diff` file (GitHub commits, PRs, and Gists work directly)
3. **Upload** a `.diff` or `.patch` file
4. **Drag & drop** a file onto the page
5. **Open a shared URL** with the diff encoded in the hash

You can also link directly to a remote patch using the `#@` hash scheme:
```
https://martysama0134.github.io/DiffyViewer/#@https://github.com/owner/repo/commit/sha
https://martysama0134.github.io/DiffyViewer/#@https://gist.github.com/user/gist-id
```

To generate a tutorial, click **Tutorial** after viewing a diff, then use **Export** to download in your preferred format.

### Self-hosted

Clone the repo and open `index.html` in a browser. No build step, no dependencies to install.

```
git clone https://github.com/martysama0134/DiffyViewer.git
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

# With commit metadata (for tutorial view)
git log -1 -p > commit.patch
git format-patch -1 HEAD
```

## Tech Stack

- [diff2html](https://github.com/rtfpessoa/diff2html) -- diff parsing and rendering
- [highlight.js](https://highlightjs.org/) -- syntax highlighting
- [pako](https://github.com/nodeca/pako) -- zlib compression for shareable URLs
- Vanilla JS, no build tools, no frameworks

## License

MIT
