---
title: Icon Genie CLI 安装
desc: 如何在开发计算机上安装 Icon Genie CLI。
---

确保在计算机上安装了 Node >= 12.22.1 和 NPM >= 6.14.12。

::: warning
**不要使用节点的不均匀版本i.e.13,15等。** 这些版本没有用 Quasar 测试过，并且经常由于其实验性而导致问题。 我们强烈建议始终使用LTS版本的节点。
:::

您将全局安装 Icon Genie CLI。 您无需在项目文件夹中安装它。

```bash
# Node.js >=12.22.1 is required.

$ yarn global add @quasar/icongenie
# or
$ npm install -g @quasar/icongenie
```

这将安装“ICONGENIE”命令行工具。

::: tip Attention developers on Windows
如果您收到错误，如 “pgquant无法构建”，则需要在全局安装 Windows-Build-Tools"yarn global add windows-build-tools" or "npm install --global windows-build-tools")。 然后转到 C\users\\<windows_username>\\。windows-build-tools 并运行 vs_BuildTools.exe。 从那里选择 npm/yarn 和 Python 安装。 在此步骤之后，可能需要您重新启动计算机，否则您现在可以安装 @quasar/icongenie。
:::

## 安装提示

如果您使用的是 yarn，请确保 yarn[全局安装位置](https://yarnpkg.com/lang/en/docs/cli/global/)在您的路径中：

```bash
# in ~/.bashrc or equivalent
export PATH="$(yarn global bin):$PATH"
```

在Windows下，修改用户的路径环境变量。 如果您使用的是yarn，则添加`％localappdata％\yarn\bin`，否则如果您正在使用npm，则添加`％appdata％\npm`。

## 升级到Icon Genie v2

本节适用于使用Icon Genie V1的那些，现在正在升级到Icon Genie V2。

### NPM包名称更改

版本1是 Quasar [App Extension](/ app-extensions /介绍)，因此您将其安装到项目文件夹中。 新版本(v2)不需要在全局安装时本地安装。 您的CI / CD不需要它，因为它是一个一次性进程，输出文件(图像)将被直接添加到项目文件夹中。

因此，请从项目文件夹中卸载Icon Genie V1：

```bash
# from your Quasar CLI project folder:
$ quasar ext remove @quasar/icon-genie
```

### 输入文件

版本1您需要拥有app-icon.png和app-splashscreen.png(以固定的宽度和高度)。这不再是版本2的情况。您现在只需要一个PNG文件(其名称可以是任何东西)，具有透明度，至少64x64 px(但越高，越好！ - 推荐最小尺寸：1024x1024)该图标，然后是Splash屏幕背景的另一个可选的PNG(任何名称)(最小128x128 PX，但建议最小为1024x1024 px)。

Splash屏幕也以完全不同的方式工作。它们将在可选背景顶部的图标生成。可以使用CLI Params(`--splashscreen-icab-presions)调整图标到宽度或高度(以较低的较低)的尺寸比。您甚至可以告诉Icon Genie，比率为0，因此它不会在后台添加图标。

### 输出文件

我们已经改进了生成的图标和启动屏幕图像列表，以匹配最新标准，并避免重复。所以你会注意到一些旧文件不再生成了，有些是完全新的。 icon genie现在将告诉您您需要添加哪些标记(如果有的话)到您的/src/index.template.html(**您可以复制标签并替换旧的**) - 所以请注意标签列表。

删除所有当前图标/闪烁版本可能是一个很好的主意，并让图标精灵再次执行它的作业。这样你就可以确定你剩下的东西实际上是在你的 Quasar 应用程序中使用。

## Icon Genie V2中的新功能

Icon Genie V2是从上到下的完整重写。

* Icon Genie现在是一个CLI自己，而不是四个应用程序扩展。
* 输入文件(对于图标和后台)可以具有任何名称，放置在任何地方，并且它们不需要具有固定宽度+高度。从V2.1开始，图标输入文件不需要具有相同的宽度和高度。此外，图标输入文件现在会自动修剪。
* 您现在可以为图标输入文件配置填充。 (v2.1 +)
* 我们已经改进了生成的图标和启动屏幕图像列表，以符合最新标准，并避免重复。
* 启动屏幕图像以更好的方式创建，在后台上的图标(具有您想要的任何尺寸比的图标，包括0，这意味着：“我只希望在顶部没有图标的背景图像”)
* 新命令：[生成](/icongenie/ command-list#生成)，[验证](/icongenie/command-list#验证)，和[配置](/icongenie/command-list#配置)，每个都有它自己的目的。
* `generate` 命令现在还向您展示了您在`/src/index.template.html` 文件中所需的标签。
* `verify` 命令甚至可以检查每个文件是否位于正确的位置，并且它具有正确的高度宽度。
* 很多新参数：quality，svg-color, png-color, splashscreen-color, splashscreen-icon-ratio 等。查看[命令列表](/icongenie/command-list)页面。
* 您现在可以单独控制每个标准模式的每种类型的资产(ico, png, splashscreen,...)，每个都具有自己的设置/参数。检查`--filter`, `--quality` 和所有颜色参数。一个很好示例是`.ico`文件。
* 现在可以通过 Icon Genie [配置文件文件](/icongenie/profile-files) 实现自动化。
* 您现在可以通过 [配置文件](/icongenie/profile-files) 使用 Icon Genie API **生成自定义图像文件**。

最后，我们需要再次强调`quality`参数，它将决定生成图像的质量和多大(KB)。
