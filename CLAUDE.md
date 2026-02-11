# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

dr-input-filler is a Chrome Extension (Manifest V3) that generates and fills fake data (CPF, Email, Person Name, Lorem Ipsum) into text fields via context menu or popup. No build step, no bundler, no package manager - plain vanilla JS loaded directly by Chrome.

## Development

### Loading the Extension

1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select this directory
4. Reload the extension after any code change

### No Build/Test/Lint Commands

This is a raw Chrome Extension with no `package.json`, no build tools, no test framework. All JS files are loaded directly by the browser.

## Architecture

### Manifest V3 Extension Structure

- **`manifest.json`** - Extension config. Declares permissions (`contextMenus`, `scripting`, `activeTab`, `storage`), registers the service worker, content scripts, popup, and options page.
- **`background.js`** - Service worker. Imports `utils.js` via `importScripts`. Creates a parent context menu "dr-input-filler" with 4 sub-items (CPF, Email, Nome, Lorem Ipsum) on install. Routes clicks to the content script via `chrome.tabs.sendMessage({action: "fill", type})`.
- **`content.js`** - Injected into all pages. Listens for `fill` messages, reads user settings from `chrome.storage.sync`, generates data by type, fills the focused editable element, dispatches `input`/`change` events, and shows a toast notification.
- **`utils.js`** - Shared constants (`DATA_TYPES`, `DATA_TYPE_LABELS`, `DEFAULT_SETTINGS`) and generator classes:
  - `CPFGenerator` - `generateValidCPF()`, `formatCPF()`, `validateCPF()` (modulo-11 algorithm)
  - `EmailGenerator` - `generate()` combines random Brazilian name + number + fake domain
  - `PersonNameGenerator` - `generate(format)` returns full name, first only, or last only from Brazilian name lists
  - `LoremIpsumGenerator` - `generate(sentenceCount)` builds random sentences from lorem ipsum word bank
- **`popup.js` / `popup.html` / `popup.css`** - Popup UI. Type selector dropdown, generates data on open and on type change, copies to clipboard.
- **`options.js` / `options.html` / `options.css`** - Settings page. Global settings (notification, clipboard) plus per-type settings (CPF format, name format, lorem sentence count). Persists to `chrome.storage.sync`.

### Message Flow

```
User right-clicks input -> background.js (contextMenus.onClicked)
  -> chrome.tabs.sendMessage({action: "fill", type: "fillCPF"|"fillEmail"|"fillName"|"fillLorem"})
  -> content.js reads settings from chrome.storage.sync
  -> generates data using appropriate generator class
  -> fills focused element and dispatches events
```

### Settings Structure (chrome.storage.sync)

```
{
  notification: boolean,
  copy: boolean,
  cpf: { format: "formatted" | "unformatted" },
  name: { format: "full" | "first" | "last" },
  lorem: { sentences: 1-5 }
}
```
