ByteHub — Pro Workspace Hub
![GitHub release](https://img.shields.io/github/v/release/rajabytee/ByteHub)
![Platform](https://img.shields.io/badge/platform-Windows-blue)
All your accounts in one desktop app — never miss a notification.
ByteHub (Pro Workspace Hub) is a Station/Franz-style desktop container for all your accounts: multiple Gmails, Facebook, Messenger, WhatsApp, Telegram and any other web account — organized into color-coded workspaces, each with isolated sessions, a unified notification center, and automatic updates.
No servers. No tracking. Everything runs locally on your PC.
---

✨ Features
🗂️ Organization
Workspaces — Business, Study, Personal… each with its own accounts and unread badges
Isolated sessions — every account keeps its own login, cookies and storage
Home dashboard — unread counts per workspace at a glance
Drag to reorder workspaces and accounts

🔔 Notifications
Unified notification center — desktop toasts from every account in one drawer
Click a notification to jump straight to that account
Taskbar / dock badge + tray icon red dot with total unread count
Do Not Disturb schedules, per-workspace mute, per-account snooze (1h / 3h)
Notification history with search and CSV export

⚙️ Power tools
Command palette (`Ctrl+K`) — jump anywhere instantly
Global hotkey (`Ctrl+Shift+Space`) to summon the window
Find in page (`Ctrl+F`), Save as PDF, per-account proxy (HTTP/SOCKS5)
Custom CSS per account, per-account audio mute, zoom controls
Focus mode timer, idle auto-DND, auto dark/light theme by schedule
Backup & restore (encrypted), PIN app lock

🌍 Languages
Full UI in English and বাংলা (one-click switch)
---

📥 Download & Install
Go to Releases
Download the latest `Pro Workspace Hub Setup X.Y.Z.exe`
Run the installer
> Windows SmartScreen may warn on first install (the app isn't code-signed yet) → **More info** → **Run anyway**.
Updates are automatic — when a new version is released, the app downloads it and asks you to restart.
---

🔒 Privacy
No backend server, no analytics, no tracking
Accounts, settings and history are stored in localStorage on your PC only
The app talks directly to the websites you add (like a browser would) — credentials never pass through any third-party server
The only external connection besides your own sites is GitHub, to check for app updates
---

🛠️ Development
Requirements: Node.js (LTS) on Windows
```bash
# install dependencies
npm install

# run the app
npm start

# build the Windows installer
npm run dist
```
The installer lands in `dist/` (`Pro Workspace Hub Setup X.Y.Z.exe` + `latest.yml` + `.blockmap`).
Releasing a new version
Bump `version` in `package.json`
Run `npm run dist`
Create a GitHub Release with tag `vX.Y.Z` (must match the version!)
Upload the `.exe`, `latest.yml` and `.blockmap` from `dist/`
Publish — users get the update automatically
See `UPDATE-GUIDE.md` for the full step-by-step guide.
---

🧱 Built with
Electron 33 — desktop shell
electron-builder — installer packaging
electron-updater — auto-updates from GitHub Releases
Vanilla HTML/CSS/JS — no framework, no build step for the UI
---
📄 License
© rajabytee — All rights reserved.
