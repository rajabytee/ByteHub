// Pro Workspace Hub — নিরাপদ সেতু (preload v2)
// রেন্ডারার শুধু এই ফাংশনগুলো ডাকতে পারবে, node-এর আর কিছু নয়।
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('hubAPI', {
  // ডেস্কটপ নোটিফিকেশন (wsKey/appId সহ — ক্লিকে জাম্প করার জন্য; অ্যাকশন বাটনসহ)
  notify: (title, body, wsKey, appId, openLabel, readLabel) =>
    ipcRenderer.send('notify', { title, body, wsKey, appId, openLabel, readLabel }),

  // নোটিফিকেশনে ক্লিক → renderer এই callback পাবে
  onOpenApp: (cb) => ipcRenderer.on('open-app', (e, d) => cb(d)),

  // "পড়া হয়েছে" অ্যাকশন → renderer এই callback পাবে
  onMarkRead: (cb) => ipcRenderer.on('mark-read', (e, appId) => cb(appId)),
  // আপডেট/হটকি স্ট্যাটাস → renderer এই callback পাবে
  onUpdateStatus: (cb) => ipcRenderer.on('update-status', (e, s) => cb(s)),

  // taskbar/dock-এ মোট unread badge + tray icon (লাল ডটসহ) + tray menu
  setTaskbarBadge: (total, dataURL, trayDataURL, wsCounts, showLabel, quitLabel) =>
    ipcRenderer.send('taskbar-badge', { total, dataURL, trayDataURL, wsCounts, showLabel, quitLabel }),
  // বর্তমান পেজ PDF হিসেবে সেভ
  printPdf: (wcId) => ipcRenderer.send('print-pdf', wcId),
  // গ্লোবাল হটকি
  setHotkey: (on) => ipcRenderer.send('set-hotkey', on),
  // spellcheck ভাষা
  setSpellcheck: (langs) => ipcRenderer.send('set-spellcheck', langs),
  // per-account proxy
  setProxy: (partition, rules, username, password) =>
    ipcRenderer.send('set-proxy', { partition, rules, username, password }),
  // pop-out window
  popout: (info) => ipcRenderer.send('popout', info),
  // updates
  checkForUpdates: () => ipcRenderer.send('check-updates'),
  getVersion: () => ipcRenderer.invoke('get-version'),
  getIdleTime: () => ipcRenderer.invoke('get-idle'),

  // Windows/macOS auto-start
  getAutoStart: () => ipcRenderer.invoke('get-autostart'),
  setAutoStart: (v) => ipcRenderer.send('set-autostart', v),

  // অ্যাকাউন্টের সেশন মুছে ফেলা (logout)
  clearSession: (partition) => ipcRenderer.send('clear-session', partition),
  onSessionCleared: (cb) => ipcRenderer.on('session-cleared', (e, p) => cb(p)),
});
