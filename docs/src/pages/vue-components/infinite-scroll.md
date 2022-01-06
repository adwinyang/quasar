---
title: 无限卷轴
desc: QInfiniteScroll Vue组件允许你在用户滚动页面时加载新内容。
keys: QInfiniteScroll
related:
  - /vue-components/spinners
  - /vue-components/pull-to-refresh
  - /vue-components/intersection
  - /vue-components/virtual-scroll
---

QInfiniteScroll组件允许你在用户滚动页面时加载新内容。

## QInfiniteScroll API

<doc-api file="QInfiniteScroll" />

## 使用方法

::: tip
当剩余的像素小于`offset`(默认=500)时，无限滚动会提前加载项目。如果你获取的内容在屏幕上的高度小于滚动目标容器的高度，那么Infinite Scroll将继续加载更多的内容。所以要确保你加载足够的内容。
:::

::: tip
在你的`@load`函数中，别忘了在你完成加载更多的数据时调用传入的`done()`函数。
:::

滚动到底部可以看到QInfiniteScroll的操作。

<doc-example title="基本" file="QInfiniteScroll/Basic" 可滚动 />

<doc-example title="自定义滚动目标容器" file="QInfiniteScroll/Container" />

<doc-example title="反转(Messenger风格)" file="QInfiniteScroll/Reverse" scrollable />

### 提示

::: tip Scrolling container
请阅读[这里](/vue-components/scroll-observer#determining-scrolling-container)关于Quasar如何确定将滚动事件附加到的容器。
:::

* 当作为渲染你的页面的Vue组件的直接子代时，效果最好。
* 如果你改变了这个组件的父级，别忘了在QInfiniteScroll Vue引用上调用`updateScrollTarget()`。
* 如果你需要指定滚动目标的内部元素(因为自动检测的元素不是你想要的)，在`scroll-target`属性中传递一个CSS选择器(作为字符串)或DOM元素。

::: warning
如果你用`scroll-target`属性传递一个自定义的滚动目标容器，你必须确保该元素的存在，并且它可以被溢出(它必须有一个最大高度和一个允许滚动的溢出)。

如果滚动目标容器不能被溢出，你会得到一个永远加载的情况。
:::

<doc-example title="QMenu中的用法" file="QInfiniteScroll/Menu" />
