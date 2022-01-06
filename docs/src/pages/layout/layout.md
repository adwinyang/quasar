---
title: 布局
desc: 如何使用 QLayout 组件。 管理 Quasar App 的整个窗口。
keys: QLayout
related:
  - /layout/header-and-footer
  - /layout/drawer
  - /layout/page
  - /layout/page-sticky
  - /layout/page-scroller
  - /vue-components/floating-action-button
components:
  - layout/ViewProp
  - layout/ViewPlay
---
QLayout 是一个组件，旨在管理整个窗口并使用导航栏或抽屉等元素包装页面内容。多个页面可以共享同一个QLayout，所以代码是可复用的，这是它们的重点之一。

**QLayout不是强制性的**，但它确实可以帮助您更好地构建您的网站/应用程序。 它具有许多功能，可以在简化您的网站/应用程序的布局设计方面提供重大好处，且是开箱即用。

## QLayout API
<doc-api file="QLayout"/>

## 布局构建器
单击下面的按钮，构建您的布局。

::: warning
布局构建器可能会使用尚未插入 Quasar.conf.js 中定义的组件。

您可能需要以下组件 -  QLayout，QHeader，QToolbar，QToolbarTitle，QBtn，QAvatar，QTabs，QRouteTab，QDrawer，QPageContainer，QFooter。
:::

::: tip
请密切关注开发人员控制台，以找到那些正在使用但未在 quasar.conf.js 文件中声明的组件。
:::

<q-btn push color="brand-primary" icon-right="launch" label="Layout Builder" href="layout-builder" target="_blank" rel="noopener noreferrer" />

## 用法

::: warning Using margin CSS will break the layout
QLayout 依赖于占据整个屏幕，因此 QPageContainer、QHeader、QFooter 和 QLayoutDrawer 位置由它管理(通过 `view` 属性)。您**不能**在QLayout本身或上述任何QLayout组件上使用*CSS边距*作为样式。但是，您可以安全地使用 *CSS padding*。
:::

::: tip
如果您的布局使用 Vue Router 子路由(推荐)，那么使用 Vue 的 `<router-view />` 组件是有意义的，它只是一个注入子路由的占位符。更多信息请阅读【使用布局和页面路由】(/layout/routing-with-layouts-and-pages)。
:::

### 了解“view”属性
Quasar 引入了一个独特而优秀的布局概念，它允许您轻松地通过简单地更改短字符串符号以某种方式构建布局。

为了解释这是如何工作的，想象您的布局是一个3x3矩阵的容器(下面的蓝色描绘)。第一行容器将是标题，最后一行将是页脚。第一列容器将是“左”，最后一列将是“右”。矩阵下方的矩阵和页脚上方的中心将是页面或主要内容容器。

该容器或 “QLayout视图” 的矩阵可以由您应该向“QLayout的”view“属性提供的字符串表示。此字符串必须完全包含11个字符：

- 3个定义标题行
- 然后是一个空格
- 3个定义中间行
- 空格
- 然后3个定义页脚行

<view-prop />

上面显示的字母也区分大小写。例如，使用至少一个“L”(大写字符而不是小写)将使您的布局左侧(抽屉)处于固定位置。同样适用于“H”(标题)，“F”(页脚)和最后“R”(右侧/抽屉)。

<View-play />

例如，如果您希望将布局的右侧/抽屉放置在标题，页面和页脚的右侧，则会使用`hhr lpr ffr`。如果您想修复它，只需转换一个 `r` 字符为大写，如下所示：`hhr lpR ffr`，或 `hhR lpr ffr` 或 `hhr lpr ffR`。

这些设置完全取决于您的喜好。甚至可以用这样疯狂的设置：`lhh LpR ffr`。试试看！

<q-btn push color="red" icon-right="launch" label="Layout Builder" href="layout-builder" target="_blank" rel="noopener noreferrer" />

::: warning
* 即使您不使用它们，也必须指定 QLayout 的所有部分。 例如，即使您不使用页脚或右侧抽屉，仍然在您的QLayout的“视图”支架中指定它们。
* 当QDrawer设置为覆盖模式时，**它将强制其进入固定位置**，无论QLayout的“视图”属性配置为“l/r”还是“l/r”。此外，**如果在iOS平台上且QLayout是容器化的**，由于无法克服的平台限制，QDrawer也将强制固定位置。
:::

### 容器化 QLayout.
默认情况下，QLayout 管理整个窗口。但是，您也可以将 QLayout 用作容器(具有特定的高度和宽度)以将其隔离在页面中的某处。

::: warning
请注意，它**需要明确设置CSS高度(或最小高度:min-height)**，否则它无法工作。
:::

在下面的示例中，每侧有一个包含抽屉的容器化QLayout(左侧抽屉在左侧抽屉上的700px断点)。 断点不是指是窗口宽度，而是指QLayout容器的实际宽度。

<doc-example title="Containerized QLayout" file="QLayout/Container" />

<doc-example title="In a QDialog" file="QLayout/ContainerDialog" />
