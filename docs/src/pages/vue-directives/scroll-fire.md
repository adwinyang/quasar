---
title: 滚动触发指令
desc: Vue 指令，当用户滚动并将一个组件带入视图时，会触发一个事件。
keys: scroll-fire
related:
  - /vue-directives/scroll
  - /vue-directives/intersection
---

"Scroll Fire" 是一个指令，它使一个方法在用户滚动当前页面和它所应用的DOM元素(或组件)进入视口时被调用(一次且仅一次)。

::: tip
还有一个[滚动](/vue-directives/scroll) 指令，每当用户滚动页面时就会启动。
:::

## ScrollFire API

<doc-api file="ScrollFire" />

## 用法

::: tip Scrolling container
请阅读[这里](/vue-components/scroll-observer#determining-scrolling-container)关于 Quasar 如何确定将滚动事件附加到的容器。
:::

<doc-example title="基础" file="ScrollFire/Basic" scrollable />

::: warning 重点
出于性能方面的考虑，注入的滚动监听器函数默认为50ms的防抖。
:::
