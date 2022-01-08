---
title: Electron 的应用图标
desc: 如何管理桌面 Quasar 应用程序的应用程序图标。
---

这些图像用于在桌面操作系统中的托盘、桌面、文件浏览器和相关商店中显示应用程序的图标。`icon.ico`文件用于Windows，`icon.icns`用于MacOS。如果你发现有任何遗漏，请[打开一个问题](https://github.com/quasarframework/quasar/issues) 。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px; padding-top:40px" />

## Icon Genie CLI

::: tip
我们强烈建议使用[Icon Genie CLI](/icongenie/introduction)，因为它可以使用一个源图标，并自动克隆、缩放、最小化，并为你把图标放到适当的目录中。需要时，它还会告诉你需要在你的/src/index.template.html文件中添加哪些标签。
:::

用Icon Genie CLI快速启动必要的图像。有关完整的选项清单，请访问[Icon Genie CLI](/icongenie/command-list) 命令清单页面。

```bash
$ icongenie generate -m electron -i /path/to/source/icon.png
```

## 手册说明

```
src-electron/
  icons/
    icon.ico
    icon.icns
    icon.png
```
