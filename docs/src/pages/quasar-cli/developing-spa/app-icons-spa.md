---
title: 用于SPA的应用程序图标
desc: 如何管理Quasar单页应用程序的应用程序图标。
---

这个构建目标包括各种用于个别浏览器和操作系统的特殊图标。你需要所有这些图标--如果你发现一个新的或丢失的图标，请[打开一个问题](https://github.com/quasarframework/quasar/issues)。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px; padding-top:40px" />

## Icon Genie CLI

::: tip
我们强烈建议使用[Icon Genie CLI](/icongenie/introduction)，因为它可以使用一个源图标，并自动克隆、缩放、最小化，并为你把图标放到适当的目录中。需要时，它还会告诉你需要在你的/src/index.template.html文件中添加哪些标签。
:::

用Icon Genie CLI快速启动必要的图像。有关完整的选项清单，请访问[Icon Genie CLI](/icongenie/command-list)命令清单页面。

```bash
$ icongenie generate -m spa -i /path/to/source/icon.png
```

## ##手册说明

```
public/
   favicon.ico
   icons/
      favicon-128x128.png
      favicon-96x96.png
      favicon-32x32.png
      favicon-16x16.png
```

进入`/src/index.template.html`的所需HTML代码，以引用上述文件。

```html
<link rel="icon" type="image/ico" href="favicon.ico">
<link rel="icon" type="image/png" sizes="128x128" href="icons/favicon-128x128.png">
<link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png">
```

