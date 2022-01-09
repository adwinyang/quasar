---
title: 时间轴
desc: QTimeline Vue组件按时间顺序显示事件的列表。它通常是一个图形设计，显示一个标有日期的长条，旁边是自己和通常的事件。
keys: QTimeline,QTimelineEntry
---
QTimeline组件按时间顺序显示事件的列表。它通常是一个图形设计，显示一个标有日期的长条，旁边是自己和通常的事件。时间线可以使用任何时间尺度，这取决于主题和数据。

QTimeline有3种布局。

* `dense` (默认)是在时间线的**时间指定的一侧**显示标题、题目、字幕和内容(默认在右边)。
* `comfortable` 是在时间线的**时间线指定的一侧**(默认在右侧)显示标题、题目和内容，而在另一侧显示字幕。
* `loose` **在时间线的入口**指定的一侧显示标题和内容(默认在右侧)，另一侧显示字幕。

## QTimeline API
<doc-api file="QTimeline" />

## QTimelineEntry API
<doc-api file="QTimelineEntry" />

## 使用方法

### 基础

<doc-example title="基础" file="QTimeline/Basic" rollable />

### 只使用属性

下面是同样的例子，但只使用QTimelineEntry属性而不是默认的槽。

<doc-example title="只使用属性" file="QTimeline/PropsOnly" scrollable />

### 只使用槽

下面又是同一个例子，但只使用QTimelineEntry槽。

<doc-example title="只使用槽" file="QTimeline/SlotsOnly" scrollable />

### 在深色背景上

<doc-example title="在黑暗的背景上" file="QTimeline/Dark" dark scrollable />

### 布局和侧面选择

::: warning
如果QTimeline有 `loose`(宽松) 的布局，QTimelineEntry 只考虑其 `side` 属性。
:::

<doc-example title="布局和侧面选择" file="QTimeline/Layouts" scrollable />

### 响应式

::: tip
下面的例子使用`$q.screen`来检测窗口大小的变化，可以看到所有3种布局的运行情况。
:::

<doc-example title="响应式布局" file="QTimeline/Responsive" scrollable />
