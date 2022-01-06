---
title: 卷轴观察家
desc: 每当用户滚动页面或父级可滚动容器时，QScrollObserver Vue组件会发出一个事件。
keys: QScrollObserver
related:
  - /vue-components/resize-observer
---
QScrollObserver是一个Quasar组件，每当用户滚动页面或溢出的容器上应用了`.scroll`CSS类时，就会发出`scroll`事件。

## QScrollObserver API

<doc-api file="QScrollObserver" />

## 使用方法
滚动这个页面，看看下面的示例是如何操作的。

<doc-example title="基本" file="QScrollObserver/Basic" /> ##使用方法

## 确定滚动容器
Quasar中的所有组件或指令都有一个简单的算法来确定支持滚动的容器。
- 如果组件上有一个 "scroll-target "属性，那么它就会尝试使用它作为滚动容器。
- 然后搜索一个父DOM元素，该元素上有`scroll`、`scroll-y`或`overflow-auto` Quasar CSS辅助类。
- 如果没有找到，那么它就认为滚动是在文档本身发生的。

例如，像[QScrollArea](/vue-components/scroll-area)这样的组件尊重这种设计，并将`scroll`类嵌入其中，这样QScrollObservable(或任何其他滚动组件或指令)就可以成功地检测到它，并将必要的事件处理程序附加到它。

请注意，简单地将`scroll`CSS类附加到DOM元素或Vue组件上，如果相应的元素没有被溢出，则不会有任何效果(例如，用。CSS `overflow: hidden`和高度小于其内部内容高度)。

好的容器的示例。

```html
<!--
  Quasar CSS helper 'overflow-hidden' is
  equivalent to style="overflow: hidden"
-->
<div class="scroll overflow-hidden" style="height: 100px">
  ...content expanding over the 100px height from container...
  <q-scroll-observer @scroll="scrollHandler" />

  <!-- example with `v-scroll` directive -->
  <div v-scroll="scrollHandler">...</div>
</div>
```

还有一个使用QScrollArea的示例。

```html
<q-scroll-area style="width: 400px; height: 500px;" class="bg-yellow">
  ...content expanding over the 500px height from container...
  <q-scroll-observer @scroll="scrollHandler" />
</q-scroll-area>
```

## 水平
对于捕捉水平滚动，使用`axis="horizontal"`属性。

```html
<q-scroll-observer axis="horizontal" @scroll="scrollHandler" />
```

## 布局滚动
当在一个带有页面的Layout上滚动时，你可以利用[QLayout](/layout/layout)的"@scroll "事件，而不是注入一个QScrollObservable(并通过这样做注册额外的滚动事件)，直接在你定义Layout的组件上使用。

```html
<q-layout @scroll="scrollHandler">...</q-layout>
```
