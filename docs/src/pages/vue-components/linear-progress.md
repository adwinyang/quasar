---
title: 线性进度条
desc: QLinearProgress Vue组件显示一个彩色的加载条。该条可以有一个确定的进度或一个不确定的动画。
keys: QLinearProgress
related:
  - /vue-components/circular-progress
  - /vue-components/inner-loading
  - /vue-components/spinners
  - /quasar-plugins/loading
  - /quasar-plugins/loading-bar
---

QLinearProgress组件显示一个彩色的加载条。该条可以有一个确定的进度或一个不确定的动画。它应该被用来通知用户，一个动作正在后台发生。

## QLinearProgress API

<doc-api file="QLinearProgress" />

## 用法

### 确定的状态
<doc-example title="已确定的状态" file="QLinearProgress/Determinate" />

### 不确定的状态
<doc-example title="不确定状态" file="QLinearProgress/Indeterminate" />

::: tip
对于不确定状态(上面)或查询状态(下面)，你不需要指定`value`属性。
:::

<doc-example title="查询状态" file="QLinearProgress/Query" />

### 反转

<doc-example title="反转进度方向" file="QLinearProgress/Reverse" />

### 风格

<doc-example title="自定义高度" file="QLinearProgress/CustomHeight" />

<doc-example title="标准尺寸" file="QLinearProgress/StandardSizes" />

<doc-example title="条纹" file="QLinearProgress/Stripe" />

<doc-example title="深色背景下" file="QLinearProgress/OnDarkBackground" dark />

### 缓冲区

<doc-example title="缓冲区" file="QLinearProgress/Buffering" />

### 带有标签

要给进度条添加一个标签，你可以使用默认的槽。请注意。
- 使用一个足够大的`尺寸`来显示该标签
- 为标签设置一个文本颜色，使其在填满和未填满的区域都能看到，或者使用文本阴影CSS，或者使用QBadge，如下例所示

<doc-example title="有一个标签" file="QLinearProgress/Label" />
