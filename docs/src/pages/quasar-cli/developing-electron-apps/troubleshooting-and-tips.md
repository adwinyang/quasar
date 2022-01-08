---
title: 故障排除和提示
desc: 使用 Electron 的 Quasar 桌面应用程序的技巧和窍门。
---

## 浏览器开发工具
你可能希望你的应用程序只在开发模式下才允许访问浏览器的开发工具。在生产版本中(没有启用调试功能)，你会希望禁用这一行为。

既然如此，为什么不在开发模式时默认打开 devtools 呢。

```js
//  Electron -main.[js|ts]

function createWindow () {
  mainWindow = new BrowserWindow({ ... })

  if (process.env.DEBUGGING) {
    // 如果在DEV或Production上，并启用了调试功能
    mainWindow.webContents.openDevTools()
  }
  else {
    // 我们在生产中，无法访问devtools。
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }
}
```

## 调试主进程
当你在开发中运行你的应用程序时，你可能已经注意到了来自主进程的信息，其中提到了一个远程调试器。自从electron@^1.7.2发布后，通过Inspect API的远程调试被引入，可以通过用Google Chrome浏览器打开所提供的链接，或者通过其他可以使用默认端口5858远程连接到进程的调试器，如Visual Studio Code，轻松访问。

```bash
Debugger listening on ws://127.0.0.1:5858/b285586a-6091-4c41-b6ea-0d389e6f9c93
For help, see: https://nodejs.org/en/docs/inspector
```

## 应用程序在Windows上不能以黑暗主题打开
一些Chrome DevTools扩展程序在 Electron 6以上的Windows黑暗主题下不能正常运行。Quasar在默认的`electron-main.js`中提供了一个变通方法，在启动应用程序之前删除`DevTools Extensions`。

```javascript
import { app, BrowserWindow, nativeTheme } from 'electron'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }
```

更多细节请关注 [electron bug report](https://github.com/electron/electron/issues/19468) 。
