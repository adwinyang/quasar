---
title: QPageScroller 布局
desc: 如何使用 QPageScroller 组件。 放置用户滚动页面后将出现在屏幕上的组件。
keys: QPageScroller
related:
  - /layout/layout
  - /layout/page
---

QPageScroller 组件有助于将它包裹的 DOM 元素/组件放置到 QPage 内容区域内的静态位置，无论用户在哪里滚动。

这样做的最大好处是，由该组件包裹的元素永远不会与布局页眉、页脚或抽屉重叠，即使这些元素没有配置为固定的。在后一种情况下，位置将被偏移，以便不会发生重叠。
例如，尝试使用非固定页脚。当用户到达屏幕底部并且页脚进入视图时，组件将向上移动，因此它不会与页脚重叠。

本质上，QPageScroller 与 QPageSticky 非常相似。 QPageSticky 组件始终可见，而 QPageScroller 组件仅在达到 `scroll-offset`(属性)后才会出现。一旦可见，用户可以点击它通过`duration`属性快速返回页面顶部。

## QPageScroller API
<doc-api file=`QPageScroller`/>

## 用法
::: tip
由于 QPageScroller 需要一个布局并且 QLayout 默认管理整个窗口，因此出于演示目的，我们将使用容器化的 QLayout。但请记住，您绝不需要为 QPageScroller 使用容器化的 QLayouts。
:::

::: warning
* 为了使 QPageScroller 能正常工作，必须将其放在 QLayout 组件中。
* QPageScroller 必须是其父级中的最后一个子元素，因此它可以显示在其他内容之上
:::

### 基础

<doc-example title="Basic" file="QPageScroller/Basic" />

### 扩展

<doc-example title="Expanded" file="QPageScroller/Expanded" />

### 反向

<doc-example title="Reverse" file="QPageScroller/Reverse" />
