---
title: App Icons for (BEX)
desc: 如何管理Quasar浏览器扩展(BEX)的应用程序图标。
---

这个构建目标包括浏览器扩展所需的图标。你需要所有这些图标--如果你发现有新的或缺失的图标，请[打开一个问题](https://github.com/quasarframework/quasar/issues) 。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px; padding-top:40px" />

## Icon Genie CLI

::: tip
我们强烈建议使用[Icon Genie CLI](/icongenie/introduction)，因为它可以使用一个源图标，并自动克隆、缩放、最小化，并为你把图标放到适当的目录中。需要时，它还会告诉你需要在你的/src/index.template.html文件中添加哪些标签。
:::

用Icon Genie CLI快速启动必要的图像。有关完整的选项清单，请访问[Icon Genie CLI](/icongenie/command-list)命令清单页面。

```bash
$ icongenie generate -m bex -i /path/to/source/icon.png
```

## ##手册说明

```
src-bex/
  icons/
     icon-16x16.png   # Favicon on extension pages
     icon-48x48.png   # Extension management page
     icon-128x128.png # Installation and web store
```
