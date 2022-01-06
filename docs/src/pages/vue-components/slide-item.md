---
title: 幻灯片项目
desc: QSlideItem Vue组件本质上是一个有两个额外槽(左边和右边)的QItem，它允许用户将其拖到其中一边，以便应用一个特定的动作。
keys: QSlideItem
related:
  - /vue-components/list-and-list-items
  - /vue-components/expansion-item
---

QSlideItem组件本质上是一个[QItem](/vue-components/list-and-list-items)，有两个额外的槽(`left`和`right`)，允许用户将项目(通过鼠标或触摸设备上的手指)拖到其中一边，以应用一个特定的动作。

## QSlideItem API

<doc-api file="QSlideItem" />

## 使用方法
用鼠标拖动或用手指平移到左边或右边，看QSlideItem的动作。

::: tip
如果你的内容也有图片，你可能想给它们添加`draggable="false"`，否则本地浏览器的行为可能会产生负面的干扰。
:::

<doc-example title="基本" file="QSlideItem/Basic" />

<doc-example title="垂直" file="QSlideItem/Vertical" />

<doc-example title="自定义颜色" file="QSlideItem/CustomColors" />

<doc-example title="滑动时的自定义" file="QSlideItem/CustomizeSlide" />

<doc-example title="单面或无面" file="QSlideItem/OneSided" />
