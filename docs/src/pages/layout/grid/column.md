---
title: 网格列
desc: 如何使用 Quasar 的网格列。
related:
  - /layout/grid/introduction-to-flexbox
  - /layout/grid/row
  - /layout/grid/gutter
  - /layout/grid/flex-playground
---

在此之前请先阅读[Flexbox简介](/layout/grid/introduction-to-flexbox)，让我们深入了解一下"列"。

利用特定断点的行类来实现等高的行。为你需要的每个断点添加任意数量的无单元类，每一行都将是相同的高度。

## 等高度

例如，这有两个网格布局，适用于从 xs 至 xl 的每个设备和视口。

<doc-example title="Equal Height Example" file="grid/ColumnEqualWidth" />

## 设置一行高度
Flexbox网格行的自动布局也意味着您可以设置一行的高度，其他人将自动调整其周围。您可以使用预定义的网格类(如下所示)或内联高度。请注意，无论中心行高度，其他行都会调整大小。

<doc-example title="Setting one row height" file="grid/ColumnRowWidth" />

## 可变高度内容
使用“col- {断点} -auto`类，行基于其内容的自然高度可以大小。这是Super Symery，单行内容如输入，数字等。这与水平对齐类相结合，对于以观点高度的变化为居中核心的布局非常有用。

<doc-example title="Variable height content" file="grid/ColumnVariableWidth" />

## 响应类

该网格包括五层预定义的类，用于构建复杂的响应布局。在超细，小型，大型，大型或超大设备上自定义行的大小，但您认为适合。

### 所有断点
对于与最小的设备相同的网格，最大，使用“.col`和`.col- *`类。在需要一个特别大小的行时指定一个编号的类;否则，请随时坚持.COL。

<doc-example title="All breakpoints" file="grid/ColumnAllBreakpoints" />

### 混搭
不想让你的行简单地堆在一些网格层中？根据需要，为每个层使用不同的类的组合。请看下面的例子，以更好地了解这一切是如何运作的。

<doc-example title="Mix and match" file="grid/ColumnMixAndMatch" />

### 对齐
使用flexbox对齐工具来垂直和水平地对齐列。

<doc-example title="Horizontal alignment" file="grid/ColumnHorizontalAlignment" />

<doc-example title="Vertical alignment" file="grid/ColumnVerticalAlignment" />

### 包装
如果在单行内放置超过12列，则每组额外列将作为一个单位包装到新行上。

<doc-example title="Wrapping" file="grid/ColumnRowWrapping" />

### 重新排序

<doc-example title="Reverse" file="grid/ColumnReverse" />

<doc-example title="Flex order" file="grid/ColumnFlexOrder" />

### 嵌套
要使用默认网格嵌套您的内容，请在现有的`.col-sm-*`列中添加新的`.col-sm-*`列。嵌套的行应包括一组列最多12个或更少的列(不需要使用所有12列)。

<doc-example title="Nesting" file="grid/ColumnNesting" />

## Flex网格游乐场
要查看 Flex 的动行情况，您可以使用 Flex Playground 以交互方式了解更多信息。

<q-btn push color="brand-primary" icon-right="launch" label="Flex Playground" to="/layout/grid/flex-playground" />
