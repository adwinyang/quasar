---
title: 关于Electron的升级指南
desc: 在 Quasar 中处理Electron时的升级说明。
---

## 升级Electron
当你第一次在 Quasar 项目中加入Electron模式时，你会得到最新版本的Electron软件包。在某个时间点上，你会想要升级Electron的版本。

在升级Electron之前，请参考它的发行说明。是否有突破性的变化？

```bash
# 从你的 Quasar 项目的根目录
$ yarn upgrade electron@latest
# 或: npm install electron@latest
```

## 从Quasar v1升级
Quasar v2的Electron模式几乎完全颠覆了之前的版本，大大改善了开发者的体验。为了确保与Electron领域的最新发展相兼容，这里的一些变化是必须的(所以要为即将到来的上游变化做防弹处理)。

### 改进的高度概括

**开箱即用的对Typescript的支持**。只需将electron-main.js和electron-preload.js重命名为electron-main.ts和electron-preload.ts。
* 支持Electron 11，并为即将到来的Electron 12+的变化准备开箱即用的支持(未来你不需要改变任何东西)。其中一个变化是我们将使用 "contextIsolation "而不是被废弃的 "Node Integration"。
* 预加载脚本不再有旧的限制。你可以用相对路径导入其他js文件，因为该脚本现在被捆绑并通过Babel传递(所以你也可以使用`import X from Y`语法)。你也可以为它启用提示功能。
* 你也可以为主线程和预加载脚本启用提示功能。
* 我们删除了默认的electron-main.dev.js支持，因为它似乎不再需要了。然而，你可以通过创建它并从electron-main中引用它来把它添加回来( Quasar CLI 不再自动检测它--因为我们不需要；稍后会有更多的内容)。

### /src-electron文件夹

```bash
# 旧的结构
.
└── src-electron/
          ├── icons/                 # 适用于所有平台的应用程序图标
          |   ├── icon.icns             # Darwin (MacOS) 平台的图标文件
          |   ├── icon.ico              # win32 (Windows) 平台的图标文件
          |   └── linux-512x512.png     # Linux平台的图标文件（使用electron-builder时）
    └── main-process/
        ├── electron-preload.js   # Electron预加载脚本（将Node.js内容注入渲染器线程）
        ├── electron-main.dev.js  # 主线程代码（仅在开发代码之前）
              └── electron-main.js      # 主线程代码（生产代码）

# 新的结构
.
└── src-electron/
          ├── icons/                 # 适用于所有平台的应用程序图标
          |   ├── icon.icns             # Darwin (MacOS) 平台的图标文件
          |   ├── icon.ico              # win32 (Windows) 平台的图标文件
          |   └── icon.png              # 适用于所有平台（尤其是 Linux）的托盘图标文件
    ├── electron-preload.js   # （或 .ts）Electron 预加载脚本（将 Node.js 内容注入渲染器线程）
          └── electron-main.js      # （或 .ts）主线程代码
```

注意，现在已经没有`electron-main.dev.js`文件了(不需要了)，`electron-preload/main.js`文件需要直接移到`/src-electron`下：

###  Electron -main.js文件
为了使我们能够向前兼容未来版本的Electron，你需要做一些小的(但很重要！)改动。

```js
// 老方式
mainWindow = new BrowserWindow({
  // ...
  webPreferences: {
    nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
    nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,
    // preload: path.resolve(__dirname, 'electron-preload.js')
  }
})

// 新方式
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

### electron-preload.js 文件
如果你还没有这个文件，你将需要它。如果没有的话，请创建它。没有它，你将无法在你的渲染器线程中使用Node.js的力量。

更多信息：[预加载脚本](/quasar-cli/developing-electron-apps/electron-preload-script)。

::: danger
你需要将所有Node.js的东西从你的渲染器线程(来自/src的UI代码)转移到预加载脚本。通过`contextBridge`提供同样的功能，如下图所示。
:::

这是`electron-preload.js`的默认内容：

```js
/**
 * 此文件专门用于安全原因。
 * 在这里你可以访问 Nodejs 的东西并将功能注入
 * 渲染器线程（可通过“window”对象访问）
 *
 * 警告！
 * 如果从 node_modules 中导入任何内容，请确保指定了包
 * 在 package.json > "dependencies" 而不是 "devDependencies"
 *
 * 示例（将 window.myAPI.doAThing() 注入渲染器线程）：
 *
 *   const { contextBridge } = require('electron')
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
```

### Quasar.conf 更改

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
[$q对象](/options/the-q-object)不再包含`electron`属性。你将需要使用[preload script](/quasar-cli/developing-electron-apps/electron-preload-script) 来访问它，并将其提供给渲染器线程。

此外，[openURL](/quasar-utils/other-utils#open-external-url) 工具不能再接入Electron来打开一个新窗口。你将需要从预加载脚本中提供你自己的util。

::: danger
你需要将所有Node.js的东西从你的渲染器线程(来自/src的UI代码)转移到预加载脚本中。通过 `contextBridge` 提供相同的功能，如上面预加载脚本部分所见。
:::

### 浏览器 Devtools
你可能还需要在你的electron-main.js中加入以下代码，以便在开发模式(或启用调试功能的prod)下自动打开devtools，并在生产构建(未启用调试功能)时禁用 devtools:

```js
function createWindow () {
  mainWindow = new BrowserWindow({ /* ... */ })

  if (process.env.DEBUGGING) {
    // 如果在 DEV 或生产上，并启用了调试功能
    mainWindow.webContents.openDevTools()
  }
  else {
    // 我们在生产中，无法访问 devtools。
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }
}
```

