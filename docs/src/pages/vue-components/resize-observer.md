---
title: 调整大小监听器(针对元素)。
desc: 每当包裹的DOM元素的宽度或高度发生变化时，QResizeObserver Vue组件都会发出一个 'resize'(调整大小)事件。
keys: QResizeObserver
related:
  - /vue-components/scroll-observer
---
QResizeObserver是一个Quasar组件，当包裹的DOM元素/组件(定义为QResizeObserver的直接父级)改变其尺寸(宽度和/或高度)时，它就会发出一个`resize`事件。请注意，不涉及轮询，但是过度使用它性能消耗也很大。


## QResizeObserver API

<doc-api file="QResizeObserver" />

## 使用方法

<doc-example title="基础" file="QResizeObserver/Basic" />

请注意，QResizeObserver一旦被渲染并连接到DOM，就会发出一个事件，所以你可以得到容器的初始尺寸。
