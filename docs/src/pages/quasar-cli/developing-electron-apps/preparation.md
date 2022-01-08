---
title: 为 Electron 做准备
desc: 如何在 Quasar 应用程序中加入 Electron 模式。
---
在我们深入到实际的开发中去之前，我们需要做一些准备工作。

## 1. 添加Quasar Electron模式
为了开发/构建一个Quasar Electron应用，我们需要在我们的 Quasar 项目中添加Electron模式。这样做的目的是，它将安装一些Electron软件包并创建`/src-electron`文件夹。

```bash
$ quasar mode add electron
```

每个Electron应用程序都有两个线程：主线程(处理窗口和初始化代码--来自新创建的`/src-electron`文件夹)和渲染器线程(处理来自`/src`的应用程序的实际内容)。

新文件夹的结构如下。

```bash
.
└── src-electron/
          ├── icons/                 # 适用于所有平台的应用程序图标
          |   ├── icon.icns             # Darwin (MacOS) 平台的图标文件
          |   ├── icon.ico              # win32 (Windows) 平台的图标文件
          |   └── icon.png              # 所有平台的托盘图标文件
    ├── electron-preload.js   # （或.ts）Electron预加载脚本（将Node.js内容注入渲染器线程）
          └── electron-main.js      # (或.ts) 主线程代码
```

### 对 Windows 用户的说明
如果你在npm安装过程中遇到关于node-gyp的错误，那么你的系统中很可能没有安装适当的构建工具。构建工具包括Python和Visual Studio等项目。幸运的是，有一些软件包可以帮助简化这个过程。

我们需要检查的第一个项目是我们的npm版本，并确保它没有过期。这可以通过[npm-windows-upgrade](https://github.com/felixrieseberg/npm-windows-upgrade) 来完成。如果你正在使用 yarn，那么你可以跳过这个检查。

一旦完成，我们就可以继续设置所需的构建工具。使用[windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) ，大部分的脏活累活都替我们干了。在全局范围内安装这个工具将反过来设置 Visual C++包、Python 和更多。

::: warning 注: 2019年四月
在 Powershell.exe 中(以管理员身份运行)`npm install --global windows-build-tools`目前似乎失败了，错误指向了python2 和 vctools。你可以用 Chocolatey 来解决这个问题。单行本安装。

**Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))**

然后运行`choco upgrade python2 visualstudio2017-workload-vctools`。
:::

在这一点上，事情应该成功安装，但如果没有，那么你将需要一个干净的Visual Studio安装。请注意，这些不是 Quasar 的问题，而是与NPM和Windows有关。

## 2. 开始开发
如果你想直接进入并开始开发，你可以跳过前面的步骤，用 "quasar模式 "命令并发出：

```bash
$ quasar dev -m electron

# 传递额外的参数和/或选项到
# 底层“电子”可执行文件：
$ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
# 在 Windows 上使用 Powershell 时：
$ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox
```

这将自动添加Electron模式，如果它是缺失的。
它将打开一个Electron窗口，该窗口将呈现你的应用程序与开发工具并排打开。
