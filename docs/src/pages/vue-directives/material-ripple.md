---
title: 材料波纹
desc: Vue指令可以轻松地将材质波纹添加到你的组件和DOM元素中。
keys: material-ripple
---
材料波纹效果可以通过`v-ripple` Quasar指令轻松添加到任何DOM元素(或组件)。

::: danger
不要在已经有材料波纹的组件上使用这个指令(例如：`QBtn`)。而是通过这些组件的`ripple`属性来配置内部波纹。
:::

## Ripple API

<doc-api file="Ripple" />

## 使用方法

::: warning
确保你的DOM元素或组件有CSS`position: relative`或Quasar CSS 辅助类 `relative-position`连接。
:::

### 基础

<doc-example title="基础" file="Ripple/Basic" />

### 着色

Material Ripple默认采用文本的CSS颜色，但你可以对其进行配置。

<doc-example title="有颜色" file="Ripple/Colored" />

### 定位

你也可以配置波纹是否应该总是从中心开始，无论触摸点在哪里。

<doc-example title="定位" file="Ripple/Positioning" />

### 早期触发

默认情况下，Ripple指令是在点击或按键时触发的。然而，你可以改变这一点，让它提前触发，在第一次用户交互(mousedown、touchstart、keydown)时触发。请注意，在大多数情况下，事件集可能会重叠(第一次和最后一次用户交互之间有小的延迟)，用户的感觉没有什么不同，但在某些情况下，它可能会导致误导用户。

这在触摸屏上尤其明显，如果用户在触摸开始后不小心移动了手指，有时会被理解为一个非常小的滚动事件，而不是点击，所以点击事件没有被触发，但仍然有一个波纹。

<doc-example title="立即触发" file="Ripple/Early" />

### 禁用

如果由于某些原因，你有一个需要禁用波纹的场景，那么你可以为指令指定一个布尔值。

<doc-example title="禁用" file="Ripple/Disable" />
