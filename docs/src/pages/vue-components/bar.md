---
title: 栏
desc: QBar Vue 组件被用来在不同的平台上创建顶栏。
keys: QBar
related:
  - /quasar-cli/developing-electron-apps/frameless-electron-window
---

QBar是一个小型组件，用于在不同类型的移动或桌面网站/应用程序上创建顶栏。例如，在桌面应用程序中，QBar会有诸如关闭、最小化或最大化按钮以及其他应用程序的菜单控件。

QBar对于无框架的 Electron 应用程序特别有用，你可以把它集成到 QHeader 中。

## QBar API

<doc-api file="QBar" />

## 使用方法

::: tip
对于响应性，使用[Visibility](/style/visibility#Window-Width-Related) Quasar CSS Classes。对于更精细的调整，你可以去写你自己的CSS媒体断点，甚至可以使用[QResizeObserver](/vue-components/resize-observer)。
:::

### 风格设计

<doc-example title="MacOS风格" file="QBar/MacOS" no-edit />

<doc-example title="Windows风格" file="QBar/Windows" />

<doc-example title="iOS风格" file="QBar/iOS" no-edit />

<doc-example title="安卓风格" file="QBar/Android" />

### 与其他组件

<doc-example title="QMenu" file="QBar/Menu" />

<doc-example title="QDialog" file="QBar/Dialog" />

<doc-example title="带有QToolbar的QHeader" file="QBar/Header" />

### 无框 Electron 窗
在开发Electron应用程序时，QBar组件可以派上用场，特别是当你选择使用无框架的窗口时。

阅读更多关于[无框 Electron 窗](/quasar-cli/developing-electron-apps/frameless-electron-window)页面。
