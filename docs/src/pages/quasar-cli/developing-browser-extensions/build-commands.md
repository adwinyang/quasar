---
title: BEX构建命令
desc: 在开发或构建浏览器扩展(BEX)时，Quasar CLI的命令列表。
---

使用[Quasar CLI](/start/quasar-cli)，开发和构建浏览器扩展的可分发程序是非常容易的。下面，我们将详细解释这两个过程。

## 开发

只需一条命令就可以开始开发一个浏览器扩展程序。

```bash
$ quasar dev -m bex

# ..or the longer form:
$ quasar dev --mode bex
```

你可能已经有一个`src-bex`文件夹，也可能没有，但你现在肯定会有一个。你还会在`src-bex/www`下有一组文件。这些文件是webpack开发服务器的输出。通常情况下，这些文件被保存在内存中，这就是为什么你在创建SPA时不会看到它们，但对于浏览器扩展的开发来说，为了使进程正常进行，需要物理文件。

::: warning
不要编辑`src-bex/www`文件夹下的任何东西，因为这些修改会被热模块重载(HMR)覆盖。这个文件夹只是你的`src`文件夹的内置输出，所以在那里进行修改。
:::

现在我们已经创建了一个开发环境，我们需要将生成的浏览器扩展加载到你的浏览器中。

### Chrome浏览器

![在Chrome浏览器中安装Quasar浏览器扩展](https://cdn.quasar.dev/img/adding-bex-to-chrome-with-debug.png)

按照上面的截图，必须采取以下步骤：

1. 在Chrome浏览器中，导航到`chrome://extensions`。
2. 切换 "开发者模式"。
3. 3. 点击 "加载解压"。这将使你看到*文件夹*的选择对话框。导航并选择你的 "src-bex "文件夹。
4. 4.现在你应该看到你的BEX在Chrome中被安装了。

关于调试Chrome浏览器扩展的更多信息可以在[官方文档](https://developer.chrome.com/extensions/tut_debugging)中找到。

### 其他Chromium浏览器

尽管我们还没有测试过所有基于Chromium的浏览器，但BEX模式应该与它们兼容。请参考相应的浏览器文档，了解如何在该特定的浏览器上添加浏览器扩展。

### Firefox

![在Firefox中安装Quasar浏览器扩展](https://cdn.quasar.dev/img/adding-bex-to-firefox.png)

与上面的截图一致，必须采取以下步骤：

1. 在Firefox中，导航到`about:debugging`。
2. 点击 "这个火狐浏览器"
3. 点击 "加载临时插件..."。这将为您提供*文件*选择对话框。导航并选择你的`src-bex/manifest.json`文件。**注意：** Firefox需要清单文件，而不是像Chromium浏览器那样的`src-bex`文件夹。
4. 现在你应该看到你的BEX安装在Firefox中。

更多关于调试Firefox临时附加组件的信息可以在[Firefox Extension Workshop](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)中找到。

### 热模块重新载入(HMR)

HMR与浏览器扩展开发一起工作，但根据你在哪个浏览器上开发，工作方式略有不同。在这两种情况下，正在构建的Quasar应用程序将在发生变化时重新加载。在这种情况下，Quasar应用程序指的是对`src`文件夹下的一切所做的改变。

::: tip
**Chrome与Firefox的差异** - 在开发你的浏览器扩展时，你经常需要对`src-bex`文件夹下的文件进行修改。这将在配置钩子、设置弹出窗口等时进行。火狐浏览器会看到这些变化并自动重新加载浏览器扩展。另一方面，Chrome则不会。当你在Chrome浏览器中做了这些改变后，你将需要导航到你的扩展(见上面的Chrome部分)并点击开发浏览器扩展中的刷新图标。
:::

## 调试

浏览器扩展在三种不同的环境中运行(更多的是在即将到来的页面上)，它需要各种环境来进行调试。

### 使用Chrome浏览器

你可以在DevTools中找到以下地方来调查错误和控制台的输出。

1. 弹出窗口 - 右键点击页面或扩展图标，选择DevTools的 "检查 "弹出窗口。
2. 后台脚本(例如：background-hooks.js)从`管理扩展-后台页面`打开DevTools。
3. 内容脚本 - 你的脚本被注入的页面。
4. 扩展错误 - 与扩展有关的错误列表(如清单配置)可在`管理扩展-错误`中找到。

![弹出窗口](https://cdn.quasar.dev/img/bex-debug-popup.png)

![后台脚本、内容脚本和扩展错误](https://cdn.quasar.dev/img/bex-debug-bg.png)

如果你的代码修改没有传播到浏览器上，你可以尝试一下。
- 更新或重新加载扩展 - 从扩展列表中(截图)
- 重新启动浏览器
- 重新启动开发进程

欲了解更多信息，请访问[调试扩展](https://developer.chrome.com/docs/extensions/mv2/tut_debugging/)。

## 为生产构建
```bash
$ quasar build -m bex

# ..or the longer form:
$ quasar build --mode bex
```
当为生产构建时，会产生多个目录。

新的文件夹有以下结构：
```bash
.
└── dist/
    ├── UnPackaged/                       # 构建代码，以便在开发环境中进行测试
    └── Packaged/
         ├── Chrome
         |   └── your-project-name.zip     # 一个zip文件，可以提交到Chrome浏览器扩展商店/其他基于Chrome的商店。
         └── Firefox
             └── your-project-name.zip     # 准备提交到Firefox扩展商店的zip文件
```

::: tip
如果你想测试 "your-project-name.zip "文件，你可以将该文件拖到你在开发模式下加载扩展的地方；对于Chrome`chrome://extensions`和Firefox`about:debugging`。更多信息见上面的开发截图。
:::

### 关于最小化的说明

在Chrome和Firefox的浏览器扩展的审查过程中，必须允许相关团队检查作为实时扩展部署的代码。考虑到这一点，不允许对代码进行最小化。因此，为了允许审查过程，Quasar将不对浏览器扩展的内置代码进行混淆和减化。

鉴于任何扩展都将直接在用户的电脑上运行，上传速度不是一个需要担心的因素，所以对代码进行最小化是没有必要的。

## 发布到商店

因为Quasar消除了构建和打包浏览器扩展的负担，所以一旦完成扩展的开发，它就可以发布了。不同浏览器的发布过程不同，但官方文档将指导您完成发布过程。

**Chrome** - [发布Chrome浏览器扩展](https://developer.chrome.com/webstore/publish)

**火狐浏览器** - [发布火狐浏览器附加组件(浏览器扩展)](https://extensionworkshop.com/documentation/publish/)

::: tip
BEX模式应该与所有基于chromium的浏览器兼容。请参考他们关于发布扩展的相关文档。
:::
