# Pro Workspace Hub — v10 (সব ফিক্স + ফিচার)

## UI রিডিজাইন (Astryx Neutral থিম)

সম্পূর্ণ UI এখন [@astryxdesign](https://astryx.design) Neutral ডিজাইন সিস্টেমের token দিয়ে সাজানো — কোনো ফিচার বদলায়নি, শুধু দেখতে বদলেছে:
- রঙ: `--color-*` semantic token (light/dark অটো — `body.light` হ্যাক মুছে ফেলা হয়েছে)
- স্পেসিং: `--spacing-*`, কর্নার: `--radius-*`, ছায়া: `--shadow-*`
- বাটন/ইনপুটে Astryx ফোকাস রিং, modal-এ `shadow-high`
- থিম ফাইল: `astryx-theme.css` (`data-astryx-theme="neutral"`, `html[data-theme]` দিয়ে dark/light)

## v10-তে নতুন: ◫ Split view

| ফিচার | কীভাবে |
|---|---|
| ◫ Split view | বাম বারে ◫ বাটন → ২ বা ৪ স্ক্রিন বাছো → যেকোনো workspace-এর অ্যাকাউন্ট টিক দাও → Start। প্রতিটি pane-তে আলাদা অ্যাকাউন্ট একসাথে লাইভ |
| ✕ প্রতি pane বন্ধ | প্রতিটি pane-এর হেডারে ✕ — ২-এর কম pane থাকলে split শেষ |
| Esc | split থেকে বেরিয়ে আসা |
| 🧠 স্মার্ট | split-এর pane sleep-এ unload হবে না; Facebook/WhatsApp counter split-এও চলবে; নোটিফিকেশন/badge আগের মতোই |

## v9-তে নতুন (২টা)

| ফিচার | কীভাবে |
|---|---|
| 🔄 Update feedback | হাতে "Check for updates" চাপলে আপডেট না থাকলে "সর্বশেষ ভার্সনেই আছো" জানাবে; চেক ব্যর্থ হলে জানাবে; গ্লোবাল হটকি অন্য অ্যাপ দখল করে রাখলে জানাবে (auto-check চুপচাপই থাকে) |
| 🏠 Dashboard চিহ্ন | কার্ডে 🔇 (muted) / 🕒 (auto-mute) / 😴n (snoozed অ্যাকাউন্ট সংখ্যা); snoozed অ্যাকাউন্টের পাশে 😴 |

## v8-তে নতুন (৬টা)

| ফিচার | কীভাবে |
|---|---|
| 💾 Last workspace মনে রাখা | অ্যাপ বন্ধ করে খুললে আগের workspace-এই ফিরবে |
| 🔇 Per-account audio mute | অ্যাকাউন্টে রাইট-ক্লিক → আওয়াজ বন্ধ/চালু (autoplay ভিডিওর যন্ত্রণা শেষ) |
| 🔍 Find in page | `Ctrl+F` — webview-র ভেতরে খোঁজা (↑↓, Enter, Esc) |
| 🖨️ Save as PDF | অ্যাকাউন্টে রাইট-ক্লিক → পেজ PDF করে সেভ |
| 😴 Per-account snooze | রাইট-ক্লিক → ১/৩ ঘণ্টা চুপ; সময় শেষে নিজে ফিরবে |
| 📖 UPDATE-GUIDE.md | auto-update সত্যিই চালু করার ধাপে ধাপে বাংলা গাইড |

## v7-তে নতুন (৬টা)

| ফিচার | কীভাবে |
|---|---|
| 🔐 Backup encryption | সেটিংসে টগল → Export-এ passphrase চাইবে; ফাইল AES-GCM-এ এনক্রিপ্ট (`.hbk`); Import-এ passphrase ছাড়া খুলবে না। পুরনো plain JSON-ও চলে |
| 🔒 App lock (PIN) | সেটিংসে PIN দাও → চালু হলে PIN ছাড়া খুলবে না; idle-এ auto-lock (সময় বাছাই যায়) |
| 🔢 Workspace badge | বাম বারের প্রতিটি workspace বাটনে তার unread সংখ্যা |
| 🌗 Auto theme | Theme → 🌓 Auto → রাত ৮টা–সকাল ৭টা dark (সময় বদলানো যায়) |
| ⏰ Scheduled switch | সেটিংসে সময় + workspace → প্রতিদিন ওই সময়ে নিজে চলে যাবে |
| 🔊 Custom sound | নিজের mp3/wav বাছাই করো (সর্বোচ্চ 1MB); Test বাটনসহ |

## v6-তে নতুন (৭টা)

| ফিচার | কীভাবে |
|---|---|
| ⌨️ Global hotkey | `Ctrl+Shift+Space` — যেকোনো জায়গা থেকে অ্যাপ সামনে আনবে (সেটিংসে ON/OFF) |
| 🔔 Toast-এ বাটন | নোটিফিকেশনে [খোলো] [পড়া হয়েছে] — "পড়া হয়েছে" চাপলে badge শূন্য |
| 📋 Tray menu-তে unread | tray আইকনে রাইট-ক্লিক → workspace অনুযায়ী সংখ্যা, ক্লিকে সেখানে যাওয়া |
| 🧙 Wizard-এ Import | প্রথম চালুতেই পুরনো backup থেকে পুরো সেটআপ ফেরানো |
| 🔍 History-তে সার্চ | History ট্যাবে কীওয়ার্ড দিয়ে খোঁজা |
| 📥 History CSV export | History ট্যাবে 📥 CSV বাটন — Excel-এ নেওয়া যায় |
| 🌐 Spellcheck ভাষা | সেটিংসে English (US/UK) / বাংলা বাছাই |

## v5-তে নতুন (৮টা)

| ফিচার | কীভাবে |
|---|---|
| ⌨️ Command palette | `Ctrl+K` — নাম লিখে যেকোনো অ্যাকাউন্টে ঝাঁপ (↑↓ + Enter) |
| 🏠 Dashboard | বাম বার-এ 🏠 — সব workspace-এর unread এক নজরে, কার্ডে ক্লিক → সেখানে যাবে |
| 💬 Message preview | WhatsApp-এর শেষ মেসেজের লেখা নোটিফিকেশনে দেখাবে (সেটিংসে ON/OFF)। সৎ নোট: WhatsApp ডিজাইন বদলালে ভাঙতে পারে |
| 🎨 Per-account custom CSS | অ্যাকাউন্টে রাইট-ক্লিক → Custom CSS — "Force dark" ও "Hide clutter" প্রিসেটসহ |
| 🕒 Auto-mute schedule | workspace-এ রাইট-ক্লিক → প্রতিদিন নির্দিষ্ট সময়ে চুপ থাকবে |
| 😴 Idle auto-DND | সেটিংস → ৫/১০/১৫/৩০ মিনিট না ছুঁলে নোটিফিকেশন বাজবে না |
| ↔️ Drag to reorder | workspace ও অ্যাকাউন্ট টেনে সাজানো যায় |
| 💾 Backup-এ settings | Export-এ এখন থিম/ভাষাসহ সব সেটিংস যায়; Import-এ ফিরে আসে |

## v4-তে নতুন (৮টা) — সবগুলোর ON/OFF সেটিংসে আছে

| ফিচার | কীভাবে |
|---|---|
| 💤 Sleep inactive tabs | ⚙️ সেটিংস → টগল + সময় (15/30/60 মিনিট)। যে workspace অনেকক্ষণ দেখোনি, তার webview RAM থেকে unload — ফিরে গেলে আবার লোড |
| 🔕 Group notification floods | সেটিংস → টগল। ১০ সেকেন্ডে এক অ্যাপ থেকে ঝড় এলে ১টা নোটিফিকেশন |
| 📜 Notification history | সেটিংস → টগল। ড্রয়ারে 🔔 New / 📜 History ট্যাব — কী কখন এলো, Clear বাটনসহ |
| 🔇 Per-workspace mute | workspace-এ রাইট-ক্লিক → Mute/Unmute। চুপ workspace-এর badge জমবে, কিন্তু বাজবে না |
| 🌐 Per-account proxy | অ্যাকাউন্টে রাইট-ক্লিক → Proxy… → HTTP/SOCKS5 হোস্ট:পোর্ট (+ইউজার/পাস)। তোমার নিজের proxy business-এর proxy বসিয়ে প্রতিটি অ্যাকাউন্ট আলাদা IP-তে চালাতে পারবে |
| 🪟 Pop-out window | অ্যাকাউন্টে রাইট-ক্লিক → আলাদা উইন্ডোতে খুলবে |
| 🔍 Updates | সেটিংসে ভার্সন দেখা + "Check for updates" বাটন + auto-check টগল |
| 🐞 ফিক্স | import-এ duplicate ID আর হবে না; লুকানো workspace-এ Facebook counter পোল বন্ধ (CPU বাঁচে); zoom মনে থাকে |

মূল `Workspace-Hub-App-Source.zip`-এর ৭টা সমস্যা ঠিক করে এই সংস্করণ বানানো হয়েছে।

## কী কী ঠিক করা হয়েছে

| # | সমস্যা ছিল | এখন |
|---|---|---|
| 1 | 🔴 নোটিফিকেশন dead code — OS toast আসতো না | ✅ সংখ্যা বাড়লেই **আসল ডেস্কটপ নোটিফিকেশন** বাজে (`preload` সেতু → `main.js`) |
| 2 | 🟡 `nodeIntegration:true, contextIsolation:false` (অনিরাপদ) | ✅ `preload.js` + `contextBridge` — রেন্ডারার শুধু `notify()` ডাকতে পারে |
| 3 | 🟡 facebook.com-এর badge কখনো আপডেট হতো না | ✅ Facebook-এর জন্য **DOM counter** (Notifications বাটনের aria-label পড়ে, ৫ সেকেন্ড পরপর) |
| 4 | 🟡 সব webview একসাথে লোড → RAM খেতো | ✅ **Lazy-load** — workspace খুললে তখনই webview তৈরি হয় |
| 5 | 🟡 অ্যাকাউন্ট delete/rename-এর উপায় ছিল না | ✅ প্রতিটি অ্যাকাউন্টে ✏️ (rename) ও 🗑 (delete) বাটন |
| 6 | 🟡 installer বানানোর config ছিল না | ✅ `electron-builder` config যোগ — `npm run dist` দিলেই Windows installer |
| 7 | 🟡 webview-তে নতুন ট্যাবের লিংক কাজ করতো না | ✅ `target=_blank` লিংক ডিফল্ট ব্রাউজারে খোলে |

এছাড়া: ড্রয়ারের নোটিফিকেশন কার্ডে **ক্লিক করলে সংশ্লিষ্ট workspace + অ্যাপ** খুলে যায়; URL-এ `https://` না দিলে স্বয়ংক্রিয়ভাবে যোগ হয়।

## চালানো (ল্যাপটপ/ডেস্কটপে)

```bash
cd workspace-hub-fixed
npm install
npm start
```

প্রথমবার প্রতিটি অ্যাকাউন্টে লগইন করে নাও — প্রতিটার সেশন আলাদা থাকে, একবার লগইন করলেই মনে রাখে।

## Installer বানানো (Windows)

```bash
npm run dist
```

`dist/` ফোল্ডারে `.exe` সেটআপ ফাইল তৈরি হবে। নিজের আইকন চাইলে `build/icon.ico` রেখে `package.json`-এর `build.win` অংশে `"icon": "build/icon.ico"` যোগ করো।

## ফাইল

- `main.js` — Electron main process (tray, auto-start, taskbar badge, notification click, session clear)
- `preload.js` — নিরাপদ সেতু (notify, taskbar badge, auto-start, session clear)
- `index.html` — পুরো UI + লজিক (workspace CRUD, shortcuts, context menu, DND, theme, wizard)
- `icon.png` / `icon.ico` — অ্যাপ আইকন
- `package.json` — dependencies + builder config

## v3-তে নতুন (৭টা ফিচার)

| ফিচার | কীভাবে |
|---|---|
| 🔄 Auto-updater | `electron-updater` — `package.json`-এর `publish` অংশে তোমার GitHub `owner/repo` বসিয়ে `npm run dist` দিয়ে release দিলে, ব্যবহারকারীর অ্যাপ নিজেই আপডেট চেক করে ইনস্টল দেবে |
| 🇧🇩 বাংলা/English ভাষা | ⚙️ সেটিংস → Language — পুরো UI এক ক্লিকে বাংলায় |
| 💾 Backup/Restore | সেটিংস → Export/Import — workspace সাজানো JSON ফাইলে; নতুন মেশিনে Import করলেই সেটআপ ফিরে আসে |
| ⬇️ Download handler | webview থেকে ফাইল ডাউনলোডে save dialog আসে, শেষ হলে নোটিফিকেশন |
| 🔴 Tray icon-এ লাল ডট | unread থাকলে tray icon-এ লাল ডট জ্বলে |
| 🧘 Focus mode | নোটিফিকেশন ড্রয়ারে 25m/50m — ওই সময় নোটিফিকেশন বাজবে না, শেষ হলে জানিয়ে দেবে |
| ✍️ Spell-checker | webview সেশনে en-US অভিধান চালু — লেখার নিচে লাল দাগ আসবে |

## v2-তে নতুন ছিল (user-friendly ফিচার)

| ফিচার | কীভাবে |
|---|---|
| 🗂️ Workspace add/rename/delete | বাম বার: `+` বাটন; workspace-এ right-click |
| 🔽 System tray | উইন্ডো বন্ধ করলে tray-তে চলতে থাকে; tray মেনু থেকে quit |
| 🚀 Windows-এর সাথে auto-start | ⚙️ সেটিংস → টগল |
| 🔢 Taskbar/dock-এ মোট unread | Windows overlay icon, macOS dock badge, tray tooltip |
| 🖱️ Notification-এ ক্লিক | সরাসরি ওই workspace-এর ওই অ্যাপ খুলে যায় |
| ⌨️ Shortcuts | `Ctrl+1..9` workspace, `Ctrl+R` reload |
| 📋 Right-click মেনু | Reload, Zoom ±/reset, Logout (সেশন মুছো), DevTools |
| 🌙 Do Not Disturb | সেটিংসে সময় বসাও — ওই সময়ে নোটিফিকেশন বাজবে না |
| 🔊 সাউন্ড টগল | সেটিংসে on/off |
| ☀️ Light/Dark theme | সেটিংসে বদলাও |
| 🎉 First-run wizard | প্রথম চালুতে workspace-এর নাম দিয়ে শুরু |

## নোট

- Facebook-এর ভাষা **English** রাখলে সংখ্যা সবচেয়ে নির্ভুল আসে।
- WhatsApp Web-এ প্রথমবার ফোন দিয়ে QR স্ক্যান করে লিংক করতে হবে।
- ডেটা (অ্যাকাউন্ট তালিকা, সেশন) শুধু তোমার কম্পিউটারে থাকে — কোথাও পাঠানো হয় না।
