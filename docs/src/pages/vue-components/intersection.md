---
title: 交叉点
desc: QIntersection vue组件，是Quasar的Intersection指令的封装器。
keys: QIntersection
related:
  - /vue-directives/intersection
  - /options/transitions
---

QIntersection组件本质上是对[Intersection指令](/vue-directives/intersection)的封装，其额外的好处是它可以自己处理状态(不需要你手动添加和处理)，也可以选择有一个显示/隐藏过渡。

然而，使用QIntersection的主要好处是，DOM树中的隐藏节点被释放出来，从而尽可能地使用最小的RAM内存，使页面感觉非常敏捷。此外，你可以为包装元素指定`tag`属性，以满足你自己的需要，从而消除了另一个DOM节点。

在底层，它使用[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) 。

::: warning
并非所有的浏览器都支持交叉观察者API。大多数[现代浏览器](https://caniuse.com/#search=intersection) 支持，但其他浏览器不支持。如果你需要支持旧的浏览器，你可以安装并导入(到一个引导文件中)官方的W3C [polyfill](https://github.com/w3c/IntersectionObserver)。
:::

## QIntersection API

<doc-api file="QIntersection" />

## 使用方法

::: warning
在大多数情况下，需要对QIntersection元素应用CSS，以便在内部内容没有呈现时，它可以作为一个必要的填充物。这将使滚动体验更加顺畅，因为否则的话，滚动就会无规律地跳动。

这种所需的CSS的一个例子是，例如，一个固定的高度或至少一个最小高度(甚至可能是一个固定的宽度，如下面的例子，在同一行中可以显示多个QIntersection)。
:::

::: danger
如果使用 "transition "属性，要求内容被包裹在一个且只有一个元素中。
:::

::: tip
在一些边缘情况下，默认的视口是不起作用的。例如，当你的代码被托管在一个iframe中(如Codepen)。这时你需要使用`root`属性。它允许你定义一个替代视口的根(通过其DOM元素)。重要的是要记住，root需要是观察元素的祖先。
:::

### 基础

<doc-example title="基础" file="QIntersection/Basic" rollable no-edit />

### 有过渡的

在下面的例子中，我们使用了一个Quasar过渡。有关完整的列表，请前往[过渡](/options/transitions)页面。

<doc-example title="有过渡" file="QIntersection/Transition" scrollable no-edit />

<doc-example title="带过渡的列表" file="QIntersection/List" 可滚动，无编辑 />

### 只触发一次

然而，只触发一次意味着你失去了释放DOM树的好处。无论可见性如何，内容都将保留在DOM中。

<doc-example title="只触发一次" file="QIntersection/Once" scrollable no-edit />

下面的例子使用了`root` 属性，因此可以在Codepen中看到(它托管在一个iframe中)。

<doc-example title="根视口" file="QIntersection/Root" scrollable />
