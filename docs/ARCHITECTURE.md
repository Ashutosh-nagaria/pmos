# Architecture

## What this is

A static site. No server, no database, no accounts. The form, the content library, and the file generator all run in the visitor's browser.

## How data flows

```
User clicks a toggle or types text
        |
        v
state object updates (in memory, browser only)
        |
        v
buildMarkdown() reads state + CATEGORIES/HABITS library
        |
        v
Live preview pane updates instantly
        |
        v
User clicks Download
        |
        v
Blob created in browser, triggers a file save
        |
        v
pmos.md lands on the user's device
```

Nothing is sent to any server at any point. No analytics, no logging, no network calls.

## Files

- `index.html` — page structure, form fields, preview panel
- `style.css` — visual design (ivory/steel control panel theme)
- `generator.js` — content library (CATEGORIES, HABITS, TOOLS), state, markdown assembly, download logic
- `README.md` — project overview
- `docs/ARCHITECTURE.md` — this file

## Why static and not a connected app

A connected version (auto export to Drive, live email/Slack integration) needs OAuth, a backend, and handling other people's account access. That is a real security and hosting responsibility, and it is a different product. This version deliberately stays a one time file generator: zero cost, zero data handling, works instantly for a stranger with no setup.

## Extending it

To add a new working style category: add an entry to the `CATEGORIES` array in `generator.js` with `id`, `name`, `heavy`, and `light` text. The form and generator pick it up automatically.

To add a new habit: add a string to the relevant group in the `HABITS` array.

No other file needs to change for either.
