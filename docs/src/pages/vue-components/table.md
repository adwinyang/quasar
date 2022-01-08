---
title: 表
desc: QTable Vue组件允许你以表格的方式来显示数据，它包含了很多相关的功能。它一般被称为数据表。
keys: QTable,QTh,QTr,QTd
related:
  - /vue-components/markup-table
  - /vue-components/pagination
---

QTable是一个允许你以表格的方式显示数据的组件。它通常被称为数据表。它包含了以下主要功能。

* 筛选
* 排序
* 单行/多行选择与自定义选择动作
* 分页(如果需要，包括服务器端)。
* 网格模式(你可以使用例如QCards以非表格的方式显示数据)
* 通过范围槽对行和单元格进行完全定制
* 能够在数据行的顶部或底部添加额外的行。
* 列选取器(通过其中一节描述的QTableColumns组件)。
* 自定义顶部和/或底部的表格控件
* 响应式设计

::: tip
如果你不需要分页、排序、过滤以及QTable的所有其他功能，那么你可能想看看[QMarkupTable](/vue-components/markup-table)组件来代替。
:::

## QTable API
<doc-api file="QTable" />

## QTh API
<doc-api file="QTh" />

## QTr API
<doc-api file="QTr" /> ## QTd API

## QTd API
<doc-api file="QTd" />

## 定义列

让我们举一个配置 "columns "属性的示例。我们要告诉QTable，"row-key "是 "name"，它***必须是唯一的。如果这是从数据库中获取的数据，我们可能会使用行的**id**。

```js
columns: [ // array of Objects
  // 列 对象定义
  {
    // 唯一标识
    // 识别列
    // (由pagination.sortBy, "body-cell-[name]" slot, ...使用)
    name: 'desc',

    // 标题的标签
    label: 'Dessert (100g serving)',

    // 确定此列值的行对象属性
    field: 'name',
    // 或字段：row => row.some.nested.prop,

    // (可选)如果我们使用可见列，这个列将始终是可见的。
    required: true,

    // (可选)对齐
    align: 'left',

    // (可选)告诉QTable你想让这一列可排序。
    sortable: true,

    // (可选)比较函数，如果你有
    // 一些自定义的数据，或者想用一种特定的方式来比较两行
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    // 函数的返回值。
    //   *小于0，则将a排序到比b低的索引，即a在前。
    //   *为0，那么让a和b相互之间保持不变，但对所有不同的元素进行排序
    //   *大于0，则将b排序到比a低的索引，即b排在前面。

    // (可选)覆盖'column-sort-order'属性。
    // 设置列的排序顺序。'ad'(升序-降序)或'da'(降序-升序)。
    sortOrder: 'ad', // or 'da'

    // (可选)，你可以用一个函数来格式化数据
    format: (val, row) => `${val}%`,
    // 再举一个格式的示例。
    // 格式: val => val
    //   ? /* 勾选Unicode复选标记 */ "\u2611"
    //   : /*Unicode复选标记未被选中 */ "\u2610",

    // body td:
    style: 'width: 500px',
    // 或作为Function --> style: row => ... (返回字符串/数组/对象)
    classes: 'my-special-class',
    // 或作为Function --> classes: row => ... (返回字符串)

    // 头部th。
    headerStyle: 'width: 500px',
    headerClasses: 'my-special-class'
  },
  { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]
```

### 基本的用法

<doc-example title="基本" file="QTable/Basic" />

<doc-example title="黑暗" file="QTable/Dark" />

<doc-example title="密集型" file="QTable/Dense" />

::: tip
你可以使用`dense`属性和`$q.screen`来创建一个响应行为。例如：`:dense="$q.screen.lt.md"`。更多信息。[屏幕插件](/options/screen-plugin)。
:::

## 省略列的定义

你可以省略对`columns`的指定。QTable将从数据的第一行的属性中推断出列。请注意，标签是大写的，而且排序是启用的。

<doc-example title="从数据推断列" file="QTable/InferColumns" />

## 粘性标题/列

::: warning
粘性标题和列是通过CSS的`position: sticky`实现的。这不是所有的浏览器都支持的。在使用这种技术之前，请检查[caniuse.com](https://caniuse.com/#search=sticky)。
:::

<doc-example title="粘性标题" file="QTable/StickyHeader" />

<doc-example title="粘性列" file="QTable/StickyColumn" />

<doc-example title="粘性表头和表列" file="QTable/StickyHeaderAndColumn" />

## 分隔符

<doc-example title="分隔符" file="QTable/Separators" /> ##分隔符

## 样式设计

<doc-example title="自定义列" file="QTable/CustomColumn" /> ##样式设计

<doc-example title="自定义着色" file="QTable/CustomColor" /> ## 自定义颜色

<doc-example title="没有页眉/页脚" file="QTable/NoHeaderFooter" />

## 虚拟滚动

注意，当启用虚拟滚动时，你需要指定`table-style`(有最大高度)属性。在下面的示例中，我们还强制QTable一次显示所有的行(注意使用`pagination`和`rows-per-page-options`属性)。

<doc-example title="基本虚拟滚动" file="QTable/VirtscrollBasic" />

你可以在滚动到达终点时动态地加载新行。

<doc-example title="动态加载虚拟卷轴" file="QTable/VirtscrollDynamic" />

你可以同时拥有虚拟滚动和分页。

<doc-example title="虚拟滚动和分页" file="QTable/VirtscrollPagination" />

下面的示例显示了如何将虚拟滚动与粘性标题一起使用。注意`virtual-scroll-sticky-start`属性，它被设置为标题的高度。

<doc-example title="虚拟滚动与粘性标题" file="QTable/VirtscrollSticky" />

有2个实用的CSS类来控制VirtualScroll的尺寸计算。

* 在VirtualScroll渲染的元素上使用`q-virtual-scroll--with-prev`类，表示该元素应该与前一个元素组合在一起(主要用例是由同一行数据生成的多个表格行)。
* 在VirtualScroll渲染的元素上使用`q-virtual-scroll--skip`类，表示在计算尺寸时应忽略该元素的尺寸。

<doc-example title="一个数据行的多行虚拟滚动" file="QTable/VirtscrollMultipleRows" />

## 选择

::: warning
为了使选择正常工作，必须设置属性`行键'。
:::

<doc-example title="单一选择" file="QTable/SingleSelection" />

<doc-example title="多重选择" file="QTable/MultipleSelection" />

<doc-example title="选择单元格插槽" file="QTable/SelectionSlots" />

<doc-example title="自定义多重选择" file="QTable/CustomSelection" />

## 可见列，自定义顶部，全屏

请注意，被标记为 "必需 "的列(在列的定义中)不能被切换，总是可见的。

<doc-example title="可见的列，自定义顶部和全屏" file="QTable/VisibleColumns" />

<doc-example title="可见的列" file="QTable/VisibleColumns2" />

## 弹出式编辑

::: tip
下面是一个示例，用户可以在**QPopupEdit**组件的帮助下 "就地 "编辑。请注意，我们使用的是 "body "范围的槽。**QPopupEdit**不会在单元格范围内工作。
:::

<doc-example title="弹出式编辑" file="QTable/PopupEditing" />

## 网格风格

::: tip
你可以使用`grid`属性和`$q.screen`来创建一个响应式的行为。例如：`:grid="$q.screen.lt.md"`。更多信息。[屏幕插件](/options/screen-plugin)。
:::

在下面的示例中，我们让QTable来处理显示网格模式(不使用具体的槽)。

<doc-example title="网格风格" file="QTable/GridStyle" />

<doc-example title="带有页眉的网格" file="QTable/GridHeader" />

<doc-example title="彩色的网格风格" file="QTable/GridStyleColored" />

<doc-example title="类似砖石的网格" file="QTable/GridMasonry" />

然而，如果你想完全自定义内容，请查看下面的示例，其中。

* 我们使用Vue的一个叫`item`的范围槽来定义每条记录(相当于非网格模式下的一行)的外观。这允许你完全自由。
* 我们正在使用多重选择。

<doc-example title="带槽的网格风格" file="QTable/GridStyleSlot" />

## 展开行数

::: warning
如果你从数据中的一行生成多个QTr，在QTr上添加唯一(不同)的`key`。
:::

<doc-example title="内部扩展模型" file="QTable/ExpandedRowInternal" />

也可以使用一个外部扩展模型。

<doc-example title="外部扩展模型" file="QTable/ExpandedRowExternal" />

如果你使用QTable的虚拟滚动，你应该知道有2个实用的CSS类来控制VirtualScroll的大小计算。
* 在虚拟卷轴渲染的元素上使用`q-virtual-scroll--with-prev`类，表示该元素应与前一个元素分组(主要用例是由同一行数据生成的多个表格行)。
* 在VirtualScroll渲染的元素上使用`q-virtual-scroll--skip`类，表示在计算尺寸时应忽略该元素的尺寸。

<doc-example title="具有扩展模型的虚拟卷轴" file="QTable/VirtscrollExpandedRow" />

## 前/后槽

<doc-example title="前/后槽(页眉/页脚)" file="QTable/BeforeAfterHeaderFooter" /> ## 分页方式

## 分页

::: tip
当 "分页 "有一个名为 "rowsNumber "的属性时，这意味着你将为**服务器**方的分页(以及排序和过滤)配置Table。参见*"服务器端分页、过滤和排序 "*部分。
:::

下面是两个处理分页的示例(以及每页的排序和行数)。

第一个示例强调了如何配置初始分页。

<doc-example title="初始分页" file="QTable/PaginationInitial" />

第二个示例使用了 "v-model:pagination "指令，因为我们想在任何时候访问其当前值。下面这个技术的一个用例可以是在QTable之外控制分页。

<doc-example title="同步分页" file="QTable/PaginationSync" />

## 分页槽

为了学习，我们将用默认的控件来定制分页控件，以便帮助你开始使用你自己的控件。

<doc-example title="分页槽" file="QTable/PaginationSlot" />

## 加载状态

<doc-example title="默认加载" file="QTable/Loading" /> ##加载状态

<doc-example title="自定义加载状态" file="QTable/CustomLoading" /> ## 自定义顶部加载状态

## 自定义顶部

<doc-example title="自定义顶部与添加/删除行" file="QTable/CustomTop" /> ##自定义顶部

## 主体槽

下面的示例显示了你如何使用槽来定制整个行。

<doc-example title="主体槽" file="QTable/SlotBody" />

下面，我们使用一个槽，它被应用于每个体单元。

<doc-example title="体细胞槽" file="QTable/SlotBodyCell" />

我们也可以只定制一个特定的列。这个槽的语法是`body-cell-[name]`，其中`[name]`应该由作为行键的每一行的属性代替。

<doc-example title="body-cell-[name] slot" file="QTable/SlotBodyCellName" />

## 标题槽

下面的示例显示了你如何使用槽来定制整个标题行。

<doc-example title="页眉槽" file="QTable/SlotHeader" />

下面，我们使用一个槽，它被应用到每个标题单元。

<doc-example title="页眉单元格插槽" file="QTable/SlotHeaderCell" />

我们也可以只定制一个特定的标题单元。这个槽的语法是`header-cell-[name]`，其中`[name]`应该被用作行键的每一行的属性所代替。

<doc-example title="Header-cell-[name] slot" file="QTable/SlotHeaderCellName" />

## 没有数据

<doc-example title="无数据标签" file="QTable/NoData" /> ##无数据

还有一个 "无数据 "的范围槽(见下文)，你也可以自定义过滤器没有返回任何结果或表没有数据可显示时的信息。也可以在 "搜索 "输入中键入一些内容。

<doc-example title="无数据槽" file="QTable/NoDataSlot" />

## 处理底层

有几个属性可以用来隐藏底层或它的特定部分。你可以在下面玩一下。

<doc-example title="隐藏底层" file="QTable/HideBottom" />

## 自定义排序

<doc-example title="自定义排序" file="QTable/CustomSorting" /> ##自定义排序

## 响应式表格

为了创建响应式表格，我们有两个工具可以使用。`密集'和`网格'属性。我们可以用`$q.screen`来连接这些。更多信息。[屏幕插件](/options/screen-plugin)。

下面的第一个示例使用`$q.screen.lt.md`(用于启用密集模式)，第二个示例使用`$q.screen.xs`来启用网格模式，所以要玩玩浏览器的宽度来看看它们的作用。

<doc-example title="使用密集属性" file="QTable/ResponsiveDense" />

<doc-example title="使用网格属性" file="QTable/ResponsiveGrid" />

## 服务器端的分页、过滤和排序

当你的数据库包含大量的表的行时，由于多种原因(内存、UI渲染性能......)，将它们全部加载显然是不可行的。相反，你可以只加载一个表页。每当用户想浏览另一个表页，或想按列排序，或想过滤表时，就会向**服务器发送一个**请求，以获取部分分页的数据。

1. 启用这一行为的第一步是指定`pagination`属性，其中必须包含`rowsNumber`。QTable需要知道可用的总行数，以便正确呈现分页链接。如果过滤导致`rowsNumber`改变，那么它必须被动态修改。

2. 第二步是监听QTable上的`@request`事件。当需要从**服务器上获取数据时，这个事件就会被触发，因为页码、排序或过滤发生了变化。

3. 你最好同时指定`loading`属性，以便通知用户一个后台进程正在进行。

::: tip
在下面的示例中，已经采取了一些步骤来模拟对服务器的ajax调用。虽然概念是相似的，但如果你使用这段代码，你将需要做适当的修改以连接到你自己的数据源。
:::

<doc-example title="与服务器同步" file="QTable/Synchronizing" />

## 导出数据

下面是一个天真的csv编码的示例，然后通过使用[exportFile](/quasar-utils/other-utils#export-file) Quasar 工具导出表格数据。浏览器应该会触发一个文件下载。对于更专业的编码方法，我们确实推荐使用[csv-parse](https://csv.js.org/parse/)和[csv-stringify](https://csv.js.org/stringify/)软件包。

::: tip
如果你想导出用户过滤+排序的数据，你也可以利用QTable的`filteredSortedRows`内部计算属性。
:::

<doc-example title="导出到csv" file="QTable/ExportCsv" />

## 键盘导航

下面是一个使用选定行在表中进行键盘导航的示例。使用`ArrowUp`、`ArrowDown`、`PageUp`、`PageDown`、`Home`和`End`键来导航。

<doc-example title="键盘导航" file="QTable/KeyboardNavigation" />
