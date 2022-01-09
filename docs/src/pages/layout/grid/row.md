---
title: 网格行
desc: 如何使用 Quasar 的网格行。
related:
  - /layout/grid/introduction-to-flexbox
  - /layout/grid/column
  - /layout/grid/gutter
  - /layout/grid/flex-playground
---

希望您之前读过[FlexBox简介](/layout/grid/introduction-to-flexbox) 理论，让我们深入了解行。

对等宽列使用断点特定的列类。为每个需要的断点添加任意数量的无单元类，每个列的宽度都相同。

## 等宽

例如，这是两个网格布局，适用于每个设备和视口，从xs到xl。

<doc-example title="Equal Width Example" file="grid/RowEqualWidth" />

## 设置一个列宽度
Flexbox网格列的自动布局也意味着你可以设置一列的宽度，其他的会围绕它自动调整大小。你可以使用预定义的网格类(如下图所示)或内联宽度。注意，无论中心列的宽度如何，其他列都会调整大小。

<doc-example title="Setting one column width" file="grid/RowColumnWidth" />

## 可变宽度的内容
使用`col-{breakpoint}-auto`类，列可以根据其内容的自然宽度来确定自己的大小。这对于单行内容，如输入、数字等，是非常方便的(见本页最后一个示例)。这一点与水平对齐类结合起来，对于在视口宽度变化时将列的大小不均匀的布局居中非常有用。

<doc-example title="Variable width content" file="grid/RowVariableWidth" />

## 响应式类

该网格包括五个层次的预定义类，用于构建复杂的响应布局。在超小、小、中、大或超大型设备上自定义您认为合适的列的大小。

### 所有断点
对于从最小设备到最大设备都相同的网格，请使用 `.col` 和 `.col-*` 类。当你需要一个特别大小的列时，指定一个编号的类；否则，请坚持使用 .col。

<doc-example title="All breakpoints" file="grid/RowAllBreakpoints" />

### 水平堆放
使用`.col-12`和`.col-md-*`类的组合，你可以创建一个基本的网格系统，在小型设备上开始是堆叠的，在桌面(中型)设备上变成水平的。

<doc-example标题=“堆叠到水平”文件=“grid / towstackedtohorizo​​thontal”/>

### 混搭
不想让列简单地堆叠在某些网格层中吗？根据需要为每一层使用不同类的组合。请参阅下面的示例，以更好地了解其工作原理。

<doc-example title="混搭(Mix and match)" file="grid/RowMixAndMatch" />

### 对齐
使用Flexbox对齐实用程序垂直和水平对齐列。

<doc-example标题=“垂直对齐”文件=“网格/ rowverticalAlignment”/>

<doc-example标题=“水平对齐”文件=“网格/ rowhorizo​​Ntalalignment”/>

### 列包装
如果一行中放置的列超过12列，则每组额外列将作为一个单元换行。

<doc-example title="Column wrapping" file="grid/RowColumnWrapping" />

### 重新排列

<doc-example title="Reverse" file="grid/RowReverse" />

<doc-example title="Flex order" file="grid/RowFlexOrder" />

### 偏移列
使用`.offset-md-*` 类向右移动列。这些类将列的左边距增加 * 列。例如，`.offset-md-4` 将 `.col-md-4` 移动到四列。

<doc-example title="偏移列(Offsetting columns)" file="grid/RowOffsettingColumns" />

### 嵌套
要用默认网格嵌套你的内容，在现有的`.col-sm-*`列中添加一个新的 .row 和一组`.col-sm-*`列。嵌套的行应该包括一组加起来为12或更少的列(不不要求使用所有12个可用列)。

<doc-example title="Nesting" file="grid/RowNesting" />

## Flex Playground.
要查看Flex的运行情况，您可以使用Flex Playground以交互式了解更多。

<q-btn push color="brand-primary" icon-right="launch" label="Flex Playground" to="/layout/grid/flex-playground" />
