---
title: 滚动区域
desc: QScrollArea Vue组件提供了一种为所有桌面浏览器定制滚动条的方法。
keys: QScrollArea
related:
  - /layout/drawer
---

QScrollArea组件通过封装你的内容提供了一个定制滚动条的好方法。你可以把它想象成一个具有"overflow: auto"的DOM元素，但它有你自己的自定义风格的滚动条，而不是浏览器的默认滚动条，而且还有一些很好的功能在上面。

## QScrollArea API

<doc-api file="QScrollArea" />

## 使用方法

下面的例子最好在桌面上看，因为它们在移动设备上的意义太小。

::: tip
你也可以看看[Layout Drawer](/layout/drawer)，看看它的一些更多的实际例子。
:::

### 基础

<doc-example title="垂直内容" file="QScrollArea/Vertical" />

<doc-example title="水平内容" file="QScrollArea/Horizontal" />

<doc-example title="垂直和水平内容" file="QScrollArea/VertHoriz" />

### 风格化的

<doc-example title="样式化的拇指和条形图" file="QScrollArea/StyledBar" />

<doc-example title="风格化的" file="QScrollArea/Styled" />

### 黑暗

<doc-example title="黑暗" file="QScrollArea/Dark" />

### 控制滚动条的可见性

当使用`visible`布尔属性时，默认的鼠标移过/离开行为被禁用，使你可以完全控制滚动条的可见性。

<doc-example title="控制滚动条的可见性" file="QScrollArea/ScrollbarVisibility" />

### 延迟

当内容发生变化时，滚动条会出现，然后再消失。你可以在滚动条再次消失之前设置一定的延迟(以毫秒为单位)(如果组件没有被悬停)。

<doc-example title="延迟" file="QScrollArea/Delay" />

### 滚动位置

<doc-example title="滚动位置" file="QScrollArea/ScrollPosition" />

### 滚动事件

下面是一个使用`@scroll`事件来同步两个容器之间的滚动的例子。

<doc-example title="同步化" file="QScrollArea/Synchronized" />
