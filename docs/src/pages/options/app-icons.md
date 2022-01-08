---
title: 应用程序图标
desc: 管理 Quasar 应用中的所有App图标和启动画面。
---

如果你要针对 Quasar 目前支持的所有平台，你将需要制作100多个不同的文件，包括4种不同的媒体类型(png, ico, icns和svg)。如果你只是使用Gimp、Photoshop或Affinity Designer这样的工具，你会发现这些文件相当大，而且制作和命名的过程很容易出现操作错误。你可能至少要对PNG文件进行压缩，还要从SVG中删除不必要的应用元数据。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px; padding-top:40px" />

## Icon Genie CLI

::: tip
我们强烈建议使用[Icon Genie CLI](/icongenie/introduction)，因为它可以使用一个源图标，并自动克隆、缩放、最小化，并为你把图标放到适当的目录中。需要时，它还会告诉你需要在你的 `/src/index.template.html` 文件中添加哪些标签。
:::
