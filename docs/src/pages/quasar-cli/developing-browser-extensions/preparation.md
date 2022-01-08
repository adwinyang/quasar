---
title: 准备参加BEX
desc: 如何将浏览器扩展(BEX)模式添加到 Quasar 应用程序中。
---

构建SPA、Mobile App、Electron App、BEX或SSR之间的区别只是由 "quasar dev" 和 "quasar build" 命令中的 "mode" 参数决定。

## 1. 添加Quasar BEX模式
为了构建一个BEX，我们首先需要在 Quasar 项目中添加BEX模式。

```bash
$ quasar mode add bex
```

如果你想直接进入并开始开发，你可以跳过 "Quasar 模式 "命令并发出。

```bash
$ quasar dev -m bex
```

这将自动添加BEX模式，如果缺少的话，在你的项目中添加一个`src-bex`文件夹。

::: tip
`src-bex`文件夹只是一个标准的浏览器扩展文件夹，所以你可以像使用其他浏览器扩展项目文件夹一样自由使用它。请参考支持的浏览器扩展文档以了解更多。

* [Mozilla FireFox 浏览器扩展文档](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
* [Google Chrome 浏览器扩展文档](https://developer.chrome.com/extensions)
* **其他基于Chromium的浏览器** - 请参考它们的具体文档。
:::

## 2. 了解 `src-bex` 的解剖结构

新的文件夹有如下结构：
```bash
.
└── src-bex/
    ├── css                    # 在浏览器上下文中使用的CSS
          |   ├── content-css.css       # CSS文件，该文件通过manifest.json自动注入到消费的网页中。
    ├── icons/                 # 适用于所有平台的应用程序图标
           |   ├── icon-16x16.png         # Icon file at 16px x 16px
           |   ├── icon-48x48.png         # Icon file at 48px x 48px
           |   └── icon-128x128.png       # Icon file at 128px x 128px
    ├── js/                    # 在BEX上下文中使用的Javascript文件。
          |   ├── background.js         # 标准后台脚本 BEX 文件 - 通过 manifest.json 自动注入
          |   ├── background-hooks.js   # 后台脚本与BEX通信层的挂钩
          |   ├── content-hooks.js      # 内容脚本，带有BEX通信层的挂钩
          |   ├── content-script.js     # 标准内容脚本 BEX 文件 - 通过 manifest.json 自动注入
          |   └── dom-hooks.js          # JS文件，该文件通过一个钩子注入到BEX通信层的DOM中
          └── www/                   # 编译的 BEX 源代码 - 从 /src 编译（Quasar 应用程序）
          └── manifest.json          # 用于生产的主线程代码
```

下一节将更详细地讨论这些。
