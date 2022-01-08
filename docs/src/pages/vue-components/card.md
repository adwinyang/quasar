---
title: 卡片
desc: QCard Vue组件是显示重要的分组内容的一个好方法。它通过包含和组织信息来协助浏览者，同时也设置了可预测的预期。
keys: QCard
related:
  - /vue-components/separator
---

QCard组件是显示重要的分组内容的一个好方法。这种模式正在迅速崛起，成为应用程序、网站预览和电子邮件内容的核心设计模式。它通过包含和组织信息来帮助浏览者，同时也设置了可预测的预期。

由于有这么多的内容需要同时显示，而屏幕上的空间往往又非常小，卡片已经迅速成为许多公司的首选设计模式，包括像 Google 和Twitter。

QCard组件是有意轻量级的，本质上是一个包含元素，能够 "承载 "任何其他合适的组件。

## QCard API
<doc-api file="QCard" />

## QCardSection API
<doc-api file="QCardSection" />

## QCardActions API
<doc-api file="QCardActions" /> ## QCardActions API

## 使用方法

::: tip
你可以在你的卡片内玩弄排版，创造美丽的卡片。
:::

### Basic
<doc-example title="Basic cards" file="QCard/Basic" />

### With actions
<doc-example title="Cards with actions" file="QCard/Actions" />

Below are some of the custom alignments that you can use for the actions through the `align` property:

<doc-example title="Aligning actions" file="QCard/ActionsAlignment" />

### Media content
<doc-example title="Cards with media content" file="QCard/Media" />

<doc-example title="Card with video" file="QCard/Video" />

<doc-example title="Card with parallax" file="QCard/Parallax" />

### Horizontal

On the examples below, notice the QCardSection with `horizontal` prop on it that wraps other QCardSections. Also note that you can directly use `col-*` classes on children of horizontal QCardSection in order to control the size.

It's recommended that you use QImg component instead of native `<img>` when dealing with horizontal QCardSections.

<doc-example title="Basic horizontal" file="QCard/HorizontalBasic" />

<doc-example title="More involved examples" file="QCard/HorizontalMoreInvolved" />

### Various content
<doc-example title="Various content" file="QCard/VariousContent" />

<doc-example title="表格" file="QCard/Table" /> ###各种内容

<doc-example title="标签" file="QCard/Tabs" />

### 可扩展

在下面的示例中，点击右下角的圆形按钮可以看到扩展的动作。

<doc-example title="可扩展" file="QCard/Expandable" /> ###可扩展
