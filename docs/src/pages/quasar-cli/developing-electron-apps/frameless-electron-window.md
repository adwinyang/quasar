---
title: 无框 Electron 窗口
desc: 如何隐藏 Quasar 桌面应用程序中的窗口框架。
related:
  - /vue-components/bar
---

一个不错的组合是使用无框 Electron 窗和[QBar](/vue-components/bar) 组件。这就是原因。

## 主线
### 设置无框架窗口
首先，在你的应用程序中安装`@electron/remote`依赖关系。

```bash
$ yarn add @electron/remote
// 或：
$ npm install @electron/remote
```

然后，在你的`src-electron/main-process/electron-main.js`文件中，对这些行进行一些编辑：

```js
// src-electron/main-process/electron-main.js

import { app, BrowserWindow, nativeTheme } from 'electron'
import { initialize, enable } from '@electron/remote/main' // <-- 增加这个
import path from 'path'

initialize() // <-- 增加这个

// ...

mainWindow = new BrowserWindow({
  width: 1000,
  height: 600,
  useContentSize: true,
  frame: false // <-- 增加这个
  webPreferences: {
    // ...
  }
})

enable(mainWindow.webContents) // <-- 增加这个

mainWindow.loadURL(process.env.APP_URL)

// ...
```

请注意，我们也需要明确地启用远程模块。我们将在预加载脚本中使用它，为渲染器线程提供窗口最小化/最大化/关闭功能。

### 预加载脚本
由于我们不能从渲染器线程中直接访问Electron，我们需要通过 Electron 预加载脚本(`src-electron/main-process/electron-preload.js`)提供必要的功能。所以我们把它编辑成：

```js
// src-electron/main-process/electron-preload.js

import { contextBridge } from 'electron'
import { BrowserWindow } from '@electron/remote'

contextBridge.exposeInMainWorld('myWindowAPI', {
  minimize () {
    BrowserWindow.getFocusedWindow().minimize()
  },

  toggleMaximize () {
    const win = BrowserWindow.getFocusedWindow()

    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  },

  close () {
    BrowserWindow.getFocusedWindow().close()
  }
})
```

## 渲染线程
### 处理窗口拖动
当我们使用一个无框架的窗口时(仅无框架！)，我们还需要一种方法让用户能够在屏幕上移动应用程序的窗口。你可以使用`q-electron-drag`和`q-electron-drag--exception` Quasar CSS辅助类来实现。

```html
<q-bar class="q-electron-drag">
  ...
</q-bar>
```

这样做的目的是，它允许用户在屏幕上点击、按住并同时拖动鼠标时拖动应用程序窗口。

虽然这是一个很好的功能，但你也必须考虑到，你需要指定一些例外情况。在你的自定义状态栏中，可能有一些元素你不希望触发窗口拖动。默认情况下，[QBtn](/vue-components/button) 被**排除在这个行为之外**(不需要为此做任何事情)。如果你想给具有`q-electron-drag`类的元素的任何子元素添加例外，你可以给它们附加`q-electron-drag--exception`CSS类。

给图标添加异常的示例：

```html
<q-bar class="q-electron-drag">
  <q-icon name="map" class="q-electron-drag--exception" />

  <div>My title</div>
</q-bar>
```

### 最小化、最大化和关闭应用程序

<doc-example title="完整示例" file="frameless-electron-window/StatusBar" />

在上面的示例中，注意到我们在QBar中添加了`q-electron-drag`，我们还通过使用注入的`window.myWindowAPI`对象(来自Electron预加载脚本)为最小化、最大化和关闭应用程序的按钮添加了处理程序。

```js
// 一些.vue文件

// 我们守护着Electron的API调用，但这
// 只有在我们用其他软件建立相同的应用程序时才需要。
// Quasar模式也是如此(SPA/PWA/Cordova/SSR...)。

export default {
  setup () {
    // 我们依靠的是
    function minimize () {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.minimize()
      }
    }

    function toggleMaximize () {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.toggleMaximize()
      }
    }

    function closeApp () {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.close()
      }
    }

    return { minimize, toggleMaximize, closeApp }
  }
}
```
