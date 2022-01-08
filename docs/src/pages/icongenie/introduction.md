---
title: Icon Genie CLI.
desc: Quasar 工具，用于生成 100 多种格式的应用程序图标和启动画面。
---

你喜欢默认的 Quasar Logo，可能与团队一样多，但是你只是花了一生，就像一生都是让自己的像素完美的表达式的应用程序，现在你想用自己的方式替换那个徽标！

您的图标可能会看到许多不同的情况：在浏览器选项卡中，在桌面上，在移动电话的主屏幕上，甚至在App Store中。然后有溅屏可以在所有各种设备大小和方向中创建。

这意味着您需要在大约100多个不同大小的徽标中使用大约100个不同的大小，arthane格式，放置在正确的文件夹中，可能也适用于 Cordova 的正确`<xml>`声明。即使你确切地知道你在做什么，这是一个乏味和错误的任务。为了让您的生活轻松无保险，我们建立了Icon Genie CLI工具，使这种疲惫的过程**死亡简单**。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px;padding-top:40px" />

## 它如何帮助你

::: tip
我们强烈建议使用 Icon Genie CLI **为您的 Quasar CLI 生成的项目**，因为它会使用源图标并自动克隆，缩放，缩小，并将图标和启动屏幕图像放在适当的目录中。 在需要时，它还告诉您您需要添加到/src/index.template.html文件中的标记。
:::

## 要求

这个工具由 Quasar 团队尤其是**与标准的CLI项目结构在于**。 如果将项目文件夹与另一个CLI构建，则应浏览Icon Genie [配置文件文件](/icongenie/profile-files)。
