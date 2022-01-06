---
title: 关于Electron的升级指南
desc: 在Quasar中处理Electron时的升级说明。
---

## 升级Electron
当你第一次在Quasar项目中加入Electron模式时，你会得到最新版本的Electron软件包。在某个时间点上，你会想要升级Electron的版本。

在升级Electron之前，请参考它的发行说明。是否有突破性的变化？

```bash
# from the root of your Quasar project
$ yarn upgrade electron@latest
# or: npm install electron@latest
```

## 从Quasar v1升级
Quasar v2的Electron模式几乎完全颠覆了之前的版本，大大改善了开发者的体验。为了确保与Electron领域的最新发展相兼容，这里的一些变化是必须的(所以要为即将到来的上游变化做防弹处理)。

### 改进的高度概述

**开箱即用的对Typescript的支持**。只需将electron-main.js和electron-preload.js重命名为electron-main.ts和electron-preload.ts。
* 支持Electron 11，并为即将到来的Electron 12+的变化准备开箱即用的支持(未来你不需要改变任何东西)。其中一个变化是我们将使用 "contextIsolation "而不是被废弃的 "Node Integration"。
* 预加载脚本不再有旧的限制。你可以用相对路径导入其他js文件，因为该脚本现在被捆绑并通过Babel传递(所以你也可以使用`import X from Y`语法)。你也可以为它启用提示功能。
* 你也可以为主线程和预加载脚本启用提示功能。
* 我们删除了默认的electron-main.dev.js支持，因为它似乎不再需要了。然而，你可以通过创建它并从electron-main中引用它来把它添加回来(Quasar CLI不再自动检测它--因为我们不需要；稍后会有更多的内容)。

### /src-electron文件夹

```bash
# old structure
.
└── src-electron/
    ├── icons/                 # Icons of your app for all platforms
    |   ├── icon.icns             # Icon file for Darwin (MacOS) platform
    |   ├── icon.ico              # Icon file for win32 (Windows) platform
    |   └── linux-512x512.png     # Icon file for Linux platform (when using electron-builder)
    └── main-process/
        ├── electron-preload.js   # Electron preload script (injects Node.js stuff into renderer thread)
        ├── electron-main.dev.js  # Main thread code (preceded by dev code only)
        └── electron-main.js      # Main thread code (production code)

# NEW structure
.
└── src-electron/
    ├── icons/                 # Icons of your app for all platforms
    |   ├── icon.icns             # Icon file for Darwin (MacOS) platform
    |   ├── icon.ico              # Icon file for win32 (Windows) platform
    |   └── icon.png              # Tray icon file for all platforms (especially Linux)
    ├── electron-preload.js   # (or .ts) Electron preload script (injects Node.js stuff into renderer thread)
    └── electron-main.js      # (or .ts) Main thread code
```

注意，现在已经没有`electron-main.dev.js`文件了(不需要了)，`electron-preload/main.js`文件需要直接移到`/src-electron`下。

### 电子-main.js文件
为了使我们能够向前兼容未来版本的Electron，你需要做一些小的(但很重要！)改动。

```js
// 老方法
mainWindow = new BrowserWindow({
  // ...
  webPreferences: {
    nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
    nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,
    // preload: path.resolve(__dirname, 'electron-preload.js')
  }
})

// 新方法
mainWindow = new BrowserWindow({
  // ...
  webPreferences: {
    // 我们启用contextIsolation(反正Electron 12+已经默认启用了它)。
    contextIsolation: true,
    // 我们使用一种新的方式来引用预加载脚本
    // (它将被需要，所以添加它并创建文件，如果它不在那里的话)
    preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
  }
})
```

### electron-preload.js文件
如果你还没有这个文件，你将需要它。如果没有的话，请创建它。没有它，你将无法在你的渲染器线程中使用Node.js的力量。

更多信息。[预加载脚本](/quasar-cli/developing-electron-apps/electron-preload-script)。

::: danger
你需要将所有Node.js的东西从你的渲染器线程(来自/src的UI代码)转移到预加载脚本。通过`contextBridge`提供同样的功能，如下图所示。
:::

这是`electron-preload.js`的默认内容。

```js
/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > "dependencies" and NOT in "devDependencies"
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   const { contextBridge } = require('electron')
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
```

### Quasar.conf更改

```js
// 老方法
electron: {
  // 现在没有了(即将到来的上游突破性变化)。
  // 被前面记载的electron-main.js中的一个变化所取代
  nodeIntegration: true, // remove me!

  // 改名为 chainWebpackMain
  chainWebpack (chain) { /* ... */ },

  // 改名为 extendWebpackMain
  extendWebpack (cfg) { /* ... */ }
}

// 新方法
electron: {
  // 已从 chainWebpack() 改名为
  chainWebpackMain (chain) {
    // 其内容的示例(增加了提示性的)。
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: ['js'] }])
  },

  // 已从 extendWebpack() 改名为
  extendWebpackMain (cfg) { /* ... */ },

  // 新的!
  chainWebpackPreload (chain) {
    // 示例(增加了林特化)
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: ['js'] }])
  }

  // 新的!
  extendWebpackPreload (cfg) { /* ... */ }
}
```

### 渲染器线程(/src)
[$q对象](/options/the-q-object)不再包含`electron`属性。你将需要使用[preload script](/quasar-cli/developing-electron-apps/electron-preload-script)来访问它，并将其提供给渲染器线程。

此外，[openURL](/quasar-utils/other-utils#open-external-url)工具不能再接入Electron来打开一个新窗口。你将需要从预加载脚本中提供你自己的util。

::: danger
你需要将所有Node.js的东西从你的渲染器线程(来自/src的UI代码)转移到预加载脚本中。通过 "contextBridge "提供相同的功能，如上面预加载脚本部分所见。
:::

### 浏览器 Devtools
你可能还需要在你的electron-main.js中加入以下代码，以便在开发模式(或启用调试功能的prod)下自动打开devtools，并在生产构建(未启用调试功能)时禁用devtools。

```js
function createWindow () {
  mainWindow = new BrowserWindow({ /* ... */ })

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

