---
title: 抽屉布局
desc: 如何使用 QDrawer 组件。 Quasar App 的侧边栏。
keys: QDrawer
related:
  - /layout/layout
  - /vue-components/list-and-list-items
---

QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧抽屉。请先阅读[QLayout](/layout/layout)文档页面。

QDrawer 是 QLayout 的侧边栏部分。

## QDrawer API.
<doc-api file="QDrawer" />

## 布局构建器
单击下面的按钮，构建您的布局。

<q-btn push color="brand-primary" icon-right="launch" label="Layout Builder" href="layout-builder" target="_blank" rel="noopener noreferrer" />

## 用法
::: tip
* 由于 QDrawer 需要布局并且 QLayout 默认管理整个窗口，因此出于演示目的，我们将使用容器化 QLayout。但请记住，您绝不需要为 QDrawer 使用容器化的 QLayouts。
* 如果 QDrawer 内容也有图像并且您想使用触摸操作来关闭它，您可能需要向它们添加 `draggable="false"`，否则本机浏览器行为可能会产生负面影响。
:::

::: danger
默认情况下，QDrawer附带了触摸操作。如果这会干扰抽屉内容组件，请通过指定`no-swipe-close` Boolean 属性来禁用它。
:::

::: warning
当QDrawer被设置为叠加模式时，**它将强制进入固定位置**，无论QLayout的 “view” 属性配置为“L / R”或“L / R”。 此外，**如果在IOS平台和QLayout容器化**，则由于无法克服的平台限制，固定位置也会强加至 QDrawer 上。
:::

### 基础

<doc-example title="Basic" file="QDrawer/Basic" />

考虑使用下面的路由属性的QItems(如`to`)。 为了演示目的，这些属性尚未添加，因为它会破坏UMD版本。

<doc-example title="With navigation menu" file="QDrawer/Menu" />

<doc-example title="Seamless menu" file="QDrawer/MenuSeamless" />

<doc-example title="Header Picture" file="QDrawer/HeaderPicture" />

### 迷你模式

抽屉可以用两种模式运行：'normal' 和 'mini'，您可以通过在 QLayoutDrawer 上使用`mini` Boolean 属性在它们之间切换。

::: warning
请注意，**`mini`模式**在**移动**行为中不适用。
:::

有一些CSS类可以帮助您在处理“mini”模式时自定义抽屉。这些非常有用，特别是在使用“click”触发时：

| CSS类  | 描述 |
| --- | --- |
| `q-mini-watcher-hide` | 隐藏抽屉处于“mini”模式时。 |
| `q-mini-watcher-oply` | 仅在抽屉处于“mini”模式时显示。 |

您还可以根据 QLayoutDrawer 在“normal”模式下具有 `q-drawer--standard` CSS 类而在“mini”模式下具有 `q-drawer--mini` 的事实编写自己的 CSS 类。此外，当抽屉处于“移动”行为时，它有 `q-drawer--mobile` CSS 类。

#### Mouseover/mouseout 触发器

考虑使用下面的路由属性(如`to`)的 QItems。为了演示目的，这些属性尚未添加，因为它会破坏UMD版本。

<doc-example title="Mini-mode with mouseover/mouseout trigger" file="QDrawer/MiniMouseEvents" />

#### mini覆盖

`mini-to-overlay` Boolean 属性始终将抽屉设置为固定位置，而不管您在 `view` 属性中的配置如何，都只会在布局上占据与处于mini模式时一样宽的空间。

<doc-example title="Mini to overlay" file="QDrawer/MiniToOverlay" />

#### 单击触发器
在下面的示例中，在“mini”模式下，如果用户点击抽屉，则我们切换到正常模式。

考虑使用下面的路由属性(如`to`)的QItems。为了演示目的，这些属性尚未添加，因为它会破坏UMD版本。

<doc-example title="Mini-mode with click trigger" file="QDrawer/MiniClickEvent" />

#### 插槽
默认情况下，在“mini”模式下，Quasar CSS隐藏了一些DOM元素以提供整洁的窄抽屉。但肯定可能是使用深度调整的情况。您可以使用 QLayoutDrawer 的“mini”Vue槽。此插槽的内容将在“mini”模式下替换您的抽屉的默认内容。

<doc-example title="Mini-mode with slot" file="QDrawer/MiniSlot" />

### 叠加模式
叠加模式可以防止抽屉占据布局上的空间，而是将鼠标悬停在页面上。这始终将您的抽屉设置为固定位置，而不管您在 `view` 属性中的配置如何。

在下面的示例中，单击菜单图标以查看正在运行的抽屉。最好在桌面上至少有500px宽的窗口(这是本演示中设置的断点)查看。

<doc-example title="Overlay mode" file="QDrawer/OverlayMode" />
