---
title: 浮动的行动按钮
desc: 如何使用QFab组件。为你的 Quasar 应用程序提供浮动的动作按钮。
keys: QFab
related:
  - /layout/layout
  - /layout/page
---

浮动动作按钮(FAB)代表了一个页面中的主要动作。但是，它并不局限于一个单一的动作。它也可以包含任何数量的子行动。更重要的是，它也可以在你的页面或布局中在线使用。

注意，你不需要一个QLayout来使用FABs。

## QFab API

<doc-api file="QFab" />

## QFabAction API

<doc-api file="QFabAction" /> ## QFabAction API

## 使用方法
有两种类型的FABs：可扩展(有子行动)和不可扩展。

::: tip
关于详尽的选项清单，请阅读API卡(在本页面顶部)。
:::

### 不可扩展
如果你想要一个不可展开的FAB，你只需要一个圆形的按钮--如果在QLayout上使用，则用QPageSticky包装。

<doc-example title="不可扩展" file="QFab/NonExpandable" />

### 可扩展

<doc-example title="可扩展" file="QFab/Expandable" /> ###可扩展。

### 内部标签

<doc-example title="内部标签" file="QFab/InternalLabel" /> ###内部标签

<doc-example title="切换内部标签" file="QFab/InternalLabelToggling" /> ###内部标签

当标签是内部的，并且你的QFab是垂直打开的(向上或向下)，那么你也可以选择如何垂直对齐子操作。

<doc-example title="垂直动作对齐" file="QFab/VerticalActionsAlignment" />

### 外部标签

默认情况下，当标签在主QFab(而不是子操作)上是外部的，它只在QFab被打开时显示。但是，你可以通过为`hide-label`属性设置一个布尔值来覆盖这一点。

<doc-example title="外部标签" file="QFab/ExternalLabel" />

<doc-example title="自定义风格的外部标签" file="QFab/ExternalLabelStyled" />

<doc-example title="切换外部标签" file="QFab/ExternalLabelToggling" />

### 隐藏图标

如果我们隐藏图标(通过特定的属性)，我们至少应该使用一个内部标签。

<doc-example title="隐藏图标" file="QFab/HideIcon" />

### 填充

QFab的默认padding是 "md"，QFabAction的padding是 "sm"。然而，你可以使用`padding`属性来定制它(也接受CSS单位)。

<doc-example title="使用padding" file="QFab/Padding" />

### 方形样式

<doc-example title="方形样式" file="QFab/SquareStyle" /> ###方形样式

### 槽 <q-badge align="top" color="brand-primary" label="v2.4+" />

注意下面QFab的插槽和QFabAction的插槽。

<doc-example title="插槽：图标、活动图标和标签" file="QFab/FabSlots" />

### 使用QPageSticky

<doc-example title="使用QPageSticky" file="QFab/PageSticky" /> ### 使用QPageSticky

### 可拖动的

下面是一个使用[TouchPan](/vue-directives/touch-pan)使QFab在屏幕上可拖动的好示例。

<doc-example title="Draggable" file="QFab/Draggable" />
