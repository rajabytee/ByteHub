// Pro Workspace Hub — main process (v3: updater, downloads, spellcheck, tray dot)
// নতুন:
//  6. Auto-updater (electron-updater) — নতুন ভার্সন এলে স্বয়ংক্রিয় আপডেট
//  7. Download handler — webview থেকে ফাইলে save dialog
//  8. Spell-checker — webview সেশনে en-US অভিধান
//  9. Tray icon-এ লাল ডট — unread থাকলে renderer-এর আঁকা আইকন বসে
const { app, BrowserWindow, Notification, ipcMain, shell, Tray, Menu, nativeImage, session, dialog, powerMonitor, globalShortcut, webContents } = require('electron');
const fs = require('fs');
const path = require('path');
let autoUpdater = null;
try { ({ autoUpdater } = require('electron-updater')); } catch (e) { /* updater ইনস্টল না থাকলে */ }
if (autoUpdater) {
  autoUpdater.on('update-not-available', () => {
    if (typeof mainWindow !== 'undefined' && mainWindow)
      mainWindow.webContents.send('update-status', 'latest');
  });
  autoUpdater.on('error', () => {
    if (typeof mainWindow !== 'undefined' && mainWindow)
      mainWindow.webContents.send('update-status', 'error');
  });
  autoUpdater.on('update-downloaded', async () => {
    const { response } = await dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'নতুন ভার্সন ডাউনলোড হয়েছে। এখনই রিস্টার্ট করে আপডেট করতে চান?',
      buttons: ['Restart Now', 'Later'],
    });
    if (response === 0) autoUpdater.quitAndInstall();
  });
}

// --- per-account proxy auth (main-এ মনে রাখা হয়) ---
const proxyAuth = {};
app.on('login', (event, webContents, request, authInfo, callback) => {
  if (!authInfo.isProxy) return;
  for (const part of Object.keys(proxyAuth)) {
    try {
      if (session.fromPartition(part) === webContents.session) {
        event.preventDefault();
        callback(proxyAuth[part].username || '', proxyAuth[part].password || '');
        return;
      }
    } catch (e) {}
  }
});

let mainWindow = null;
let tray = null;
let willQuit = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'Pro Workspace Hub',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.setMenuBarVisibility(false);

  // উইন্ডো বন্ধ = tray-তে লুকানো (অ্যাপ চলতে থাকবে, নোটিফিকেশন আসবে)
  mainWindow.on('close', (e) => {
    if (!willQuit) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

function toggleWindow() {
  if (!mainWindow) return;
  if (mainWindow.isVisible()) mainWindow.hide();
  else { mainWindow.show(); mainWindow.focus(); }
}

function createTray() {
  try {
    const icon = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));
    tray = new Tray(icon.isEmpty() ? undefined : icon);
  } catch (e) { return; }
  tray.setToolTip('Pro Workspace Hub');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'খুলুন / লুকান', click: toggleWindow },
    { type: 'separator' },
    { label: 'সম্পূর্ণ বন্ধ করুন', click: () => app.quit() },
  ]));
  tray.on('click', toggleWindow);
}

// --- IPC: নোটিফিকেশন (ক্লিক ডেটাসহ + অ্যাকশন বাটন) ---
ipcMain.on('notify', (event, { title, body, wsKey, appId, openLabel, readLabel }) => {
  const actions = (openLabel && readLabel)
    ? [{ type: 'button', text: openLabel }, { type: 'button', text: readLabel }]
    : [];
  const n = new Notification({ title: title || 'Pro Workspace Hub', body: body || '', actions });
  const openIt = () => {
    if (mainWindow) { mainWindow.show(); mainWindow.focus(); }
    if (mainWindow) mainWindow.webContents.send('open-app', { wsKey, appId });
  };
  n.on('click', openIt);
  n.on('action', (e, index) => {
    if (index === 0) openIt();
    else if (mainWindow && appId) mainWindow.webContents.send('mark-read', appId);
  });
  n.show();
});

// --- IPC: taskbar/dock badge + tray icon + tray menu (unreadসহ) ---
ipcMain.on('taskbar-badge', (event, { total, dataURL, trayDataURL, wsCounts, showLabel, quitLabel }) => {
  const t = Number(total) || 0;
  if (process.platform === 'darwin') {
    try { app.setBadgeCount(t); } catch (e) {}
  } else if (mainWindow) {
    try {
      if (t > 0 && dataURL) {
        mainWindow.setOverlayIcon(nativeImage.createFromDataURL(dataURL), t + ' unread');
      } else {
        mainWindow.setOverlayIcon(null, '');
      }
    } catch (e) {}
  }
  if (tray) {
    try {
      if (trayDataURL) tray.setImage(nativeImage.createFromDataURL(trayDataURL));
      tray.setToolTip(t > 0 ? `Pro Workspace Hub — ${t} unread` : 'Pro Workspace Hub');
      if (Array.isArray(wsCounts)) {
        const items = wsCounts.map(w => ({
          label: `${w.total > 0 ? `(${w.total}) ` : ''}${w.name}`,
          click: () => {
            if (mainWindow) { mainWindow.show(); mainWindow.focus(); }
            if (mainWindow) mainWindow.webContents.send('open-app', { wsKey: w.key });
          },
        }));
        items.push({ type: 'separator' });
        items.push({ label: showLabel || 'খুলুন / লুকান', click: toggleWindow });
        items.push({ label: quitLabel || 'সম্পূর্ণ বন্ধ করুন', click: () => app.quit() });
        tray.setContextMenu(Menu.buildFromTemplate(items));
      }
    } catch (e) {}
  }
});

// --- গ্লোবাল হটকি: Ctrl+Shift+Space → উইন্ডো সামনে ---
function registerHotkey() {
  try {
    globalShortcut.register('CommandOrControl+Shift+Space', () => {
      if (!mainWindow) return;
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    });
    if (!globalShortcut.isRegistered('CommandOrControl+Shift+Space') && mainWindow) {
      mainWindow.webContents.send('update-status', 'hotkey-fail'); // অন্য অ্যাপ দখল করে রেখেছে
    }
  } catch (e) {
    if (mainWindow) mainWindow.webContents.send('update-status', 'hotkey-fail');
  }
}
ipcMain.on('set-hotkey', (event, on) => {
  try {
    if (on) { if (!globalShortcut.isRegistered('CommandOrControl+Shift+Space')) registerHotkey(); }
    else globalShortcut.unregister('CommandOrControl+Shift+Space');
  } catch (e) {}
});
app.on('will-quit', () => { try { globalShortcut.unregisterAll(); } catch (e) {} });

// --- IPC: বর্তমান পেজ PDF হিসেবে সেভ ---
ipcMain.on('print-pdf', async (event, wcId) => {
  try {
    const wc = webContents.fromId(wcId);
    if (!wc) return;
    const data = await wc.printToPDF({});
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      defaultPath: 'page.pdf',
      filters: [{ name: 'PDF', extensions: ['pdf'] }],
    });
    if (canceled || !filePath) return;
    fs.writeFileSync(filePath, data);
    new Notification({ title: '🖨️ PDF সেভ হয়েছে', body: filePath }).show();
  } catch (e) {}
});

// --- spellcheck ভাষা ---
let spellLangs = ['en-US'];
ipcMain.on('set-spellcheck', (event, langs) => {
  spellLangs = (Array.isArray(langs) && langs.length) ? langs : ['en-US'];
  try { session.defaultSession.setSpellCheckerLanguages(spellLangs); } catch (e) {}
});

// --- IPC: auto-start ---
ipcMain.handle('get-autostart', () => {
  try { return app.getLoginItemSettings().openAtLogin; } catch (e) { return false; }
});
ipcMain.on('set-autostart', (event, val) => {
  try { app.setLoginItemSettings({ openAtLogin: !!val }); } catch (e) {}
});

// --- IPC: session clear (অ্যাকাউন্ট logout) ---
ipcMain.on('clear-session', (event, partition) => {
  try {
    session.fromPartition(partition).clearStorageData().then(() => {
      if (mainWindow) mainWindow.webContents.send('session-cleared', partition);
    });
  } catch (e) {}
});

// --- IPC: per-account proxy ---
ipcMain.on('set-proxy', (event, { partition, rules, username, password }) => {
  try {
    const ses = session.fromPartition(partition);
    if (rules) {
      ses.setProxy({ proxyRules: rules });
      if (username) proxyAuth[partition] = { username, password: password || '' };
      else delete proxyAuth[partition];
    } else {
      ses.setProxy({ mode: 'direct' });
      delete proxyAuth[partition];
    }
  } catch (e) {}
});

// --- IPC: pop-out window (আলাদা উইন্ডোতে অ্যাকাউন্ট) ---
ipcMain.on('popout', (event, { partition, url, title }) => {
  const win = new BrowserWindow({
    width: 1100, height: 800, title: title || 'Account',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false, webviewTag: true,
    },
  });
  win.setMenu(null);
  win.loadFile(path.join(__dirname, 'popout.html'),
    { query: { partition: partition || '', url: url || '', title: title || 'Account' } });
});

// --- IPC: updates (renderer-এর সেটিংস অনুযায়ী) ---
ipcMain.on('check-updates', () => {
  if (autoUpdater) { try { autoUpdater.checkForUpdatesAndNotify().catch(() => {}); } catch (e) {} }
});
ipcMain.handle('get-version', () => app.getVersion());
ipcMain.handle('get-idle', () => {
  try { return powerMonitor.getSystemIdleTime(); } catch (e) { return 0; }
});

// webview-এর target=_blank লিংক → বাইরের ব্রাউজারে
// + spell-checker + download handler (প্রতিটি webview সেশনে)
app.on('web-contents-created', (event, contents) => {
  if (contents.getType() === 'webview') {
    contents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });
    try { contents.session.setSpellCheckerLanguages(spellLangs); } catch (e) {}
    contents.session.on('will-download', (ev, item) => {
      const fileName = item.getFilename() || 'download';
      dialog.showSaveDialog(mainWindow, { defaultPath: fileName }).then(({ canceled, filePath }) => {
        if (canceled) { item.cancel(); return; }
        item.setSavePath(filePath);
        item.once('done', (e2, state) => {
          if (state === 'completed')
            new Notification({ title: '⬇️ ডাউনলোড শেষ', body: fileName }).show();
          else if (state === 'cancelled' || state === 'interrupted')
            new Notification({ title: 'ডাউনলোড বাতিল', body: fileName }).show();
        });
      });
    });
  }
});

app.on('before-quit', () => { willQuit = true; });

app.whenReady().then(() => {
  createWindow();
  createTray();
  // Auto-updater: renderer সেটিংস (autoCheckUpdate) অনুযায়ী check-updates পাঠালে চেক হয়
});

app.on('window-all-closed', () => {
  // tray-তে চলতে থাকবে — quit শুধু tray মেনু থেকে
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
  else if (mainWindow) mainWindow.show();
});
