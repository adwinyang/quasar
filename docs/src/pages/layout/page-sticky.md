---
title: QPageSticky 布局
desc: 如何使用 QPageSticky 组件。 静态地将组件放置在布局上而不与标题/页脚/侧栏重叠。
keys: QPageSticky
related:
  - /layout/layout
  - /layout/page
---

QPageSticky 组件有助于将其包裹的 DOM 元素/组件放置到 QPage 内容区域内的静态位置，无论用户滚动到何处。

这样做的最大好处是，由该组件包裹的元素永远不会与布局页眉、页脚或抽屉重叠，即使这些元素没有配置为固定的。在后一种情况下，位置将被偏移，以便不会发生重叠。
例如，尝试使用非固定页脚。当用户到达屏幕底部并且页脚进入视野时，组件将向上移动，因此它不会与页脚重叠。

## QPageSticky API
<doc-api file="QPageSticky" />

## 用法
::: tip
由于 QPageSticky 需要一个布局并且 QLayout 默认管理整个窗口，因此出于演示目的，我们将使用容器化的 QLayout。但请记住，您绝不需要为 QPageSticky 使用容器化的 QLayouts。
:::

::: warning
*为了使QPageSticky工作，必须将其放在QLayout组件中。
* QPageSticky必须是其父级中的最后一个子元素，因此它可以显示在其他内容之上
:::

### 基础
在下面的示例中，点击菜单按钮来显示/隐藏抽屉，滚动内页，调整浏览器窗口的大小，使包围的QLayout碰到抽屉的700px和500px断点。

<doc-example title="Basic" file="QPageSticky/Basic" />

### 扩展
在下面的示例中，单击菜单按钮以显示/隐藏抽屉、滚动内页并调整浏览器窗口的大小，以便封闭的 QLayout 命中抽屉的 700px 和 500px 断点。

例如，通过使用扩展的 QPageSticky，您可以拥有一个特定于页面的 QToolbar，如下所示。

<doc-example title="Expanded" file="QPageSticky/Expanded" />
