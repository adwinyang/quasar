---
title: 交叉口指令
desc: Vue指令使用Intersection Observer API，当用户滚动并将一个组件带入或带出视图时调用一个方法。
keys: intersection
related:
  - /vue-components/intersection
  - /vue-directives/scroll-fire
  - /vue-directives/scroll
  - /options/transitions
---

"交叉 "是一个Quasar指令，当用户滚动时，它所应用的DOM元素(或组件)进入或离开视口时，可以调用一个方法。

在引擎盖下，它使用[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)。

::: warning
并非所有的浏览器都支持交叉观察者API。大多数[现代浏览器](https://caniuse.com/#search=intersection)支持，但其他浏览器不支持。如果你需要支持旧的浏览器，你可以安装并导入(到一个引导文件中)官方的W3C [polyfill](https://github.com/w3c/IntersectionObserver)。
:::

## Intersection API

<doc-api file="Intersection" />

## 使用方法

首先阅读[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)会对你理解这个指令的工作方式有很大帮助。

Intersection指令要么接受一个处理函数作为参数，要么接受一个Object。对象的形式看起来像这样。

```js
{
  handler: /* Function */,
  cfg: {
    // "交叉口观察者选项 "中的任何选项
    // 关于https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    root: null, // DOM Element
    rootMargin: '0px',
    threshold: 0
  }
}
```

当使用对象形式时，只有 "handler "键是必须的。

处理程序函数需要一个参数，它是一个[IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)。

::: tip
在下面的示例中滚动，直到观察到的元素出现在视野中。然后再把它滚动到视野之外。
:::

### 基本

<doc-example title="基本" file="交叉点/基本" no-edit />

### 触发一次

该指令可与`once`修饰符一起使用(例如：`v-intersection.once`)。一旦被观察的元素进入视野，处理程序Function将被调用，观察将停止。如果你只需要在被观察的元素开始在屏幕上可见时得到通知，这允许你控制处理的开销。

<doc-example title="Once" file="Intersection/Once" no-edit />

### 使用一个对象

通过传入一个对象作为指令的值(而不是一个函数)，你可以控制交叉点观察员的所有选项(比如阈值)。

<doc-example title="提供配置对象" file="Intersection/ObjectForm" no-edit />

### 高级

下面是一个更高级的示例，说明你可以做什么。该代码利用了HTML的`data`属性。基本上，通过在一个循环中设置`data-id`与元素的索引，这可以通过传递给处理程序的`entry`作为`entry.target.dataset.id`来检索。如果你不熟悉`data`属性，你可以阅读更多关于使用`data`属性的信息[这里](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)。

<doc-example title="高级" file="交叉点/高级" no-edit />

在下面的示例中，我们显示了多张卡片，但只有可见的卡片会被渲染。秘密在于包装器，它有`v-intersection`附加在上面，并且有固定的高度和宽度(当内部内容没有被渲染时，它充当了必要的填充物--这样滚动时就不会有不规则的跳跃)。

> 下面的示例也可以通过使用[QIntersection](/vue-components/intersection)组件来编写，这使一切变得更加简单。

<doc-example title="滚动的卡片" file="Intersection/ScrollingCards" scrollable no-edit />

::: tip
在上面的示例中，我们使用了一个Quasar过渡。完整的列表，请前往[过渡](/options/transitions)页面。
:::
