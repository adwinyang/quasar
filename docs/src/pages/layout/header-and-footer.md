---
title: 标题和页脚布局
desc: 如何使用 QHeader 和 QFooter 组件。 Quasar App 的顶部和底部栏。
keys: QHeader,QFooter
related:
  - /layout/layout
  - /layout/page
  - /vue-components/toolbar
  - /vue-components/breadcrumbs
  - /vue-components/tabs
  - /vue-components/bar
---

QLayout允许你将你的视图配置为3x3矩阵，包含一个可选的Header和/或Footer(主要用于导航条，但也可以是任何内容)。如果你还没有，请先阅读[QLayout](/layout/layout) 文档页。


## QHeader API.
<doc-api file="QHeader" />

## QFooter API.
<doc-api file="QFooter" />

## 布局构建器
单击下面的按钮，构建您的布局。

<q-btn push color="brand-primary" icon-right="launch" label="Layout Builder" href="layout-builder" target="_blank" rel="noopener noreferrer" />

## 用法
::: tip
由于页眉和页脚需要一个布局，默认情况下QLayout管理整个窗口，因此出于演示目的，我们将使用容器化QLayout。但请记住，决不要求您为QHeader或QFooter使用容器化QLayouts。
:::

<doc-example title="Basic" file="QHeader/Basic" />

您可以在页眉和页脚上使用工具栏上的`glossy`类。

<doc-example title="Glossy" file="QHeader/Glossy" />

### 各种内容

<doc-example title="Playing with QToolbar" file="QHeader/Extended" />

<doc-example title="Playing with QBreadcrumb" file="QHeader/Breadcrumbs" />

<doc-example title="Playing with QTabs" file="QHeader/Tabs" />

### 展示属性

在下面的示例中，滚动页面以查看QHeader和QFooter行为。

<doc-example title="Reveal" file="QHeader/Reveal" />

### iOS 外观和感观
在下面的示例中，您可以使用 Ionicons 图标(v4)与 QTabs 的`ion-ios-`前缀，这将完全匹配iOS外观和感观。

<doc-example title="iOS-like" file="QHeader/LookingIOS" />

### 桌面应用程序的外观
下面的示例特别有用，如果构建 Electron App 并隐藏默认应用框架。

<doc-example title="Desktop app-like" file="QHeader/AppLike" />
