---
title: 扩展项目
desc: QExpansionItem Vue组件允许像手风琴一样进行可见性切换。
keys: QExpansionItem
related:
  - /vue-components/list-and-list-items
  - /vue-components/slide-item
  - /vue-components/slide-transition
---

QExpansionItem组件允许隐藏那些与用户没有直接关系的内容。可以把它们想象成手风琴元素，在点击时展开。它也被称为可折叠的。

它们基本上是[QItem](/vue-components/list-and-list-items)组件，用额外的功能进行包装。所以它们可以被包含在QLists中，并继承QItem组件的属性。

## QExpansionItem API

<doc-api file="QExpansionItem" />

## 使用方法

### 基础

<doc-example title="基础" file="QExpansionItem/Basic" />

### 控制扩展状态

<doc-example title="控制扩展状态" file="QExpansionItem/ControlExpansionState" />

### 风格

<doc-example title="密集" file="QExpansionItem/Dense" />

<doc-example title="在深色背景上" file="QExpansionItem/Dark" dark />

### 选项

<doc-example title="切换切换面" file="QExpansionItem/SwitchToggleSide" />

<doc-example title="头槽" file="QExpansionItem/HeaderSlot" />

<doc-example title="处理事件" file="QExpansionItem/HandlingEvents" />

在处理嵌套级别时，一般的经验法则是，`header-inset-level`为标题添加左填充，而对内容不做任何处理，而`content-inset-level`为内容添加左填充。

<doc-example title="玩转嵌入级别" file="QExpansionItem/InsetLevels" />

### 行为

::: tip
当QExpansionItem的标题上附加了一个路由时，下面这种只通过展开图标进行切换的行为就特别有用。这样一来，点击页眉就能激活路由，点击展开图标就能展开内容。显然，你不能把这两个动作都附加到整个标题上。
:::

<doc-example title="仅通过扩展图标进行切换" file="QExpansionItem/IconToggle" />

<doc-example title="Accordion模式" file="QExpansionItem/Accordion" />

<doc-example title="弹出模式" file="QExpansionItem/Popup" />
