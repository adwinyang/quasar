---
title:  Electron 预加载脚本
desc: 如何用 Quasar CLI 处理Electron节点与Electron预加载脚本的集成。
---

出于安全考虑，渲染器线程(你在`/src`的UI代码)不能访问Node.js的东西。然而，你可以运行Node.js代码，并通过位于`/src-electron/electron-preload.[js|ts]`的Electron预加载脚本将其连接到渲染器线程。使用`contextBridge`(来自`electron`包)来暴露你的用户界面所需要的东西。

由于预加载脚本是从Node.js中运行的，所以要注意你对它所做的事情以及你向渲染器线程暴露的东西

## 如何使用它
在`/src-electron/`文件夹中，有一个名为`electron-preload.js`的文件。将你的预加载代码填入其中。

确保你的`/src-electron/electron-main.[js|ts]`有以下内容(靠近 "webPreferences "部分)：

```js
// 文件：/src-electron/electron-main.[js|ts]

// 在顶部添加这个。
import path from 'path'

// ...

function createWindow () {
  // ...
  mainWindow = new BrowserWindow({
    // ...
    webPreferences: {
      // 这就是神奇之处。
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })
```

`/src-electron/electron-preload.[js|ts]`内容的示例：

```js
// 示例，它将window.myAPI.doAThing()注入到渲染器中。
// 线程 (/src/*)

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

::: warning
1. 请注意该文件是在Node.js环境下运行的。
2. 如果你从node_modules中导入任何东西，那么请确保该包是在/package.json > "dependencies "中指定的，而不是在 "devDependencies "中。
:::

## 安全考虑
使用 "contextBridge "并不自动意味着你所做的一切是安全的。例如，下面的代码是不安全的。

```js
// 糟糕的代码；不要！！！。
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

它直接暴露了一个强大的API，没有任何形式的参数过滤。这将允许任何网站发送任意的IPC消息，这是你不希望看到的。暴露基于IPC的API的正确方式是为每个IPC消息提供一个方法。


```js
// 良好的代码
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

现在，`loadPreferences`在你的javascript代码中全局可用(即：`window.myAPI.loadPreferences`)。

::: warning
请确保挑选的名称不与现有的 "窗口 "键相冲突。
:::

在主线程中使用上述代码和`invoke'到`load-prefs'，会有这样的代码。

```js
ipcMain.handle('myAPI:load-prefs', () => {
  return {
    // 对象，其中包含偏好
  }
})
```

## 预装脚本的自定义路径
如果你想改变预装脚本的位置(甚至是主线程文件)，那么请编辑`/quasar.conf.js`。

```
// 如果你想改变默认文件
sourceFiles: {
  electronMain: 'src-electron/electron-main.js',
  electronPreload: 'src-electron/electron-preload.js'
}
```
