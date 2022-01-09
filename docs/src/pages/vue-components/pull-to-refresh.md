---
title: 拉动刷新
desc: QPullToRefresh Vue组件允许用户下拉，以刷新或检索页面上的最新内容。
keys: QPullToRefresh
related:
  - /vue-components/infinite-scroll
  - /vue-components/intersection
  - /vue-components/icon
---

QPullToRefresh是一个允许用户下拉以刷新页面内容(或检索最新的内容)的组件。

## QPullToRefresh API

<doc-api file="QPullToRefresh" />

## 使用方法

### 基础

::: warning
在你的`@refresh`函数中，别忘了在你完成加载更多数据时调用传递的`done()`函数。
:::

要刷新，当内部滚动位置是顶部时，在下面的内容上向下拉(用鼠标或通过手指触摸)。

<doc-example title="基础" file="QPullToRefresh/Basic" />

### 自定义图标

<doc-example title="自定义图标" file="QPullToRefresh/Icon" />

### 自定义着色

<doc-example title="自定义着色" file="QPullToRefresh/CustomColoring" />

## 提示

::: tip Scrolling container
请阅读[这里](/vue-components/scroll-observer#determining-scrolling-container)关于Quasar如何确定将滚动事件附加到的容器。
:::

* 如果使用QLayout，那么建议你把QPullToRefresh作为QPage的直接子节点，并用它来包装你的页面内容。
* 如果你改变了这个组件的父级，别忘了在QPullToRefresh的Vue引用上调用`updateScrollTarget()`。
* QPullToRefresh也允许文本选择，所以如果你的内容也有图片，你可能想给它们加上`draggable="false"`，否则本地浏览器的行为可能会产生负面的干扰。
