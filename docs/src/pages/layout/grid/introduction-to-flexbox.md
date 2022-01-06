---
title: Flexbox 简介
desc: Flexbox CSS是什么以及如何在标准应用中使用它。
related:
  - /style/spacing
  - /style/visibility
  - /layout/grid/column
  - /layout/grid/gutter
  - /layout/grid/flex-playground
---

Quasar提供了许多CSS类，以帮助您在 [FlexBox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 的帮助下轻松构建UI。将其视为使用具有许多选项的行和列进行操作。

Flexbox(Quasar Flex CSS类的基础)模块旨在提供一种更有效的方式来布局、对齐和分配容器中的元素之间的空间，即使它们的大小未知或动态的(因此称为“Flex”)。

::: tip
此页面介绍了 Quasar Flex CSS 类的基本原理，并为[Grid Row](/layout/grid/row)、[Grid Column](/layout/grid/column)、[Grid Gutter](/layout/grid/gutter) 的深入了解做好准备。
:::

## 关键概念
Quasar Flex CSS类适用于容器(父级)或容器的项目(子级)。

![Flexbox 容器](https://cdn.quasar.dev/img/flexbox-container.svg)
![Flexbox 项目](https://cdn.quasar.dev/img/flexbox-items.svg)

## 管理父项

### 设置方向
父级必须使用以下 CSS 类之一，以便对子级上的 CSS 类(在下一节中描述)产生任何影响。

![Flexbox方向](https://cdn.quasar.dev/img/flexbox-direction.svg)

| 类名称 | 描述 |
| --- | --- |
| `row` | Flex 行|
| `row inline` | 内联 Flex 行 |
| `列` | Flex 列 |
| `column inline` | 内联 Flex 列 |
| `row reverse` |  Flex 行的`flex-direction` 设置为 `row-reverse` |
| `column reverse` | Flex 列的`flex-direction` 设置为 `column-reverse` |

示例：
```html
<div class="row">
  <div>First column</div>
  <div>Second column</div>
  <div>Third column</div>
</div>
```

## 默认情况下的包装
默认情况下，所有行和列都包含其内容。

![Flexbox方向](https://cdn.quasar.dev/img/flexbox-wrap.svg)

但是，如果您明确不想换行并且希望将所有内容都放在一行中，那么添加 `no-wrap` CSS 辅助类。

此外，如果要按相反顺序换行，则可以使用`reverse-wrap`。

| 类名称 | 描述 |
| --- | --- |
| `wrap` | 必要时换行(默认为“on”，无需指定) |
| `no-wrap` | 即使有必要也不要换行 |
| `reverse-wrap` | 如有必要，反向换行 |

### 对齐

**用于沿主轴对齐**，请使用下面的类。它有助于在线路上的所有Flex项目处于不灵活的所有Flex项目时，可帮助左侧分发，或者是灵活的，但已达到其最大尺寸。它还在溢出线路时对物品的对齐进行了一些控制。

![FlexBox证明内容](https://cdn.quasar.dev/img/flexbox-main-axis-------2.svg)

**对于垂直于主轴的对齐**，请使用以下类。这定义了如何沿着当前行上横轴布置Flex项目的默认行为。将其视为横轴的水平*版本(垂直于主轴)。

![Flexbox项目对齐](https://cdn.quasar.dev/img/flexbox-cross-axis-align.svg)

下一类**当横轴中存在额外的空间时，将Flex容器的线**对齐，类似于水平 -  *如何对齐主轴内的单个项目。

![Flexbox内容对齐](https://cdn.quasar.dev/img/flexbox-content-align.svg)

## 管理子项

### 大小分布
Quasar 使用 12 点列系统来分布子项的大小。下面是一些可用的 CSS 辅助类示例：

```html
<div class="row">
  <div class="col-8">三分之二</div>
  <div class="col-2">六分之一</div>
  <div class="col-auto">根据内容和可用空间自动调整大小</div>
  <div class="col">f填充剩余的可用空间</div>
</div>
```


在上面的示例中，`col-8`填充了行宽度的三分之二(2/3)，因为8/12 = 2/3 = 66％，而`col-2`占据了六分之一(2/12 = 1 / 6〜16.67％)。

CSS 辅助类 `col-auto` 使单元格只填充它需要渲染的空间。另一方面，`col` 尝试填充所有可用空间，同时在需要时缩小。

CSS 辅助类 `col-grow` 使单元格至少填充它需要渲染的空间，并在有更多可用空间时增长。

CSS 辅助类 `col-shrink` 使单元格最多填充它需要渲染的空间，当没有足够的可用空间时可能会缩小。

它的另一个示例是下面的可视化表示：
```html
<div class="row">
  <div class="col">1</div>
  <div class="col">1</div>
  <div class="col">1</div>
  <!--
     我们有 3 个子项，所以相当于
     等同上面的做法，是在每个子项上使用 `col-4`
  -->
</div>


<div class="row">
  <div class="col-3">1</div>
  <div class="col-6">2</div>
  <div class="col-3">1</div>
</div>
```
![Flexbox Grow](https://cdn.quasar.dev/img/flexbox-grow.svg)

也可以偏移一个单元格。例如：`offset-4` 偏移了三分之一的空间(4/12 = 1/3 = 33%)。

### 包装
包装是理解 Flex CSS 类的一个关键特性。您不必每行恰好使用 12 个点。您可以使用更少甚至更多。

这使您可以在较小的屏幕上动态地垂直堆叠行，同时在较大的屏幕上将它们显示在一行上。请阅读“响应式设计” 部分。

```html
<div class="row">
  <div class="col-2">...</div>

  <!-- 2 + 6 < 12, so next element is placed on same line -->
  <div class="col-6">...</div>

  <!-- 2 + 6 + 10 > 12, so next element wraps to next line -->
  <div class="col-10">...</div>

  <!--
    10 + 3 > 12, so next element wraps to next line.
    Note that we take into consideration the current line only
    (with col-10 only, since it was wrapped to its own line).
  -->
  <div class="col-3">...</div>
</div>
```

> 请注意，行默认情况下是可换行的。如果您希望禁用此功能，请使用 `no-wrap` CSS 帮助器类。

### 自对齐
**一个项目可以覆盖父级指定的对齐**。这允许覆盖单个 flex 项目的对齐方式。请参阅`管理父级`中的`对齐`说明以了解可用值(`self-start`、`self-center`、`self-baseline`、`self-end`、`self-stretch`)。

![Flexbox Self](https://cdn.quasar.dev/img/flexbox.cnsvg)

### 顺序
**您可以使用 `order-first` 和 `order-last` CSS 辅助类来设置子元素的顺序**。

默认情况下，flex项目是按源顺序排列的。然而，order属性控制它们在flex容器中出现的顺序。如果需要更细的控制粒度，请使用`order`CSS属性并指定所需的值。

示例：
```html
<div class="row">
  <div style="order: 2">Second column</div>
  <div class="order-last">Third column</div>
  <div class="order-first">First column</div>
</div>
```

以下是CSS`order`属性的工作原理：

![`Flexbox 顺序](https://cdn.quasar.dev/img/flexbox-order.svg)

## 响应式设计
可以基于屏幕的宽度来应用Quasar Flex CSS类，以帮助您制作响应式 UI。 12点网格的灵感来自Bootstrap的，所以有很多相似之处。

到目前为止，我们了解到的是，例如，我们可以调整列的大小，而不考虑窗口的宽度。如果我们要创建一个响应的UI，我们需要在考虑窗口宽度的同时动态改变大小。首先，让我们了解一些您可以在`col-*`、`offset-*`和`col-auto` 帮助类中间插入的标记(请参阅下表中的标记)。

| 标记  | 最大窗口宽度 | 描述/适用时机 |
| --- | --- | --- |
| `xs` | 599px | 超小尺寸窗口 |
| `sm` | 1023px | 小尺寸窗口 |
| `md` | 1439px | 中等尺寸窗口 |
| `lg` | 1919px | 大尺寸窗口 |
| `xl` | Infinite | 超大尺寸窗口 |

示例：`col-md-7`，`offset-lg-3`，`col-xs-auto`。

一个完整的示例：假设我们有三个子项的行。在超小尺寸窗口中，我们需要垂直堆叠子项，在小尺寸窗口中，我们需要并排显示它们(每个具有相同的宽度)，并从中等尺寸窗口开始，我们应该在同一行中显示它们：

```html
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-4">
    col
  </div>
  <div class="col-xs-12 col-sm-6 col-md-4">
    col
  </div>
  <div class="col-xs-12 col-sm-6 col-md-4">
    col
  </div>
</div>
```

请注意，在上面的示例中，我们使用了'col-xs-12'(12/12=行的100%，因此每个子级将占据容器的整个宽度，使所有子级垂直堆叠，因为默认情况下行会包裹内容)，'col-sm-6'(6/12=行的50%)和'col-md-4'(4/12=行的33%)。

与前面提到的一样，默认情况下，行包装内容，因此当一行使用12个(或更多)网格点时，内容包装到下一行。如果我们有两个`<div>`， 并且两个都使用`col-8`，它们也会叠加，因为8+8=16，我们只能在一条线上显示12个点。

```html
<div class="row">
  <!--
    超过12个网格点加在一起，
    所以第二个 <div> 将在换行至下一行
  -->
  <div class="col-8">col</div>
  <div class="col-8">col</div>
</div>
```

还可以查看[Visibility](/style/Visibility#window width related)样式页面，查看窗口宽度上的阈值以及这些单独用于隐藏或显示DOM元素的标记(xs、sm、md、lg、xl)。

## Flex 插件.

启用后(通过`quasar.conf > framework > cssAddon：true`), 它为所有与Flex(和显示)相关的CSS类提供断点感知版本。

::: warning
请注意，启用它时，CSS 占用空间会出现明显的凹凸。所以只有在你真的需要它时才这样做。了
:::

```
.flex-<bp>-(block|inline)
.(row|column|flex)-<bp>(|-inline)
.reverse-<bp>
.(wrap|no-wrap|reverse-wrap)-<bp>
.order-<bp>-(first|last|none)
.justify-<bp>-(start|end|center|between|around|evenly)
.items-<bp>-(start|end|center|baseline|stretch)
.content-<bp>-(start|end|center|between|around)
.self-<bp>-(start|end|center|baseline|stretch)
.flex-<bp>-center
.gutter-<bp>(|-x|-y)-(xs|sm|md|lg|xl)
.(col|offset)-<bp>(|0..12)
```

对于间距，也有响应类，包括填充和边距：

```
.q-(p|m)(t|r|b|l|a|x|y)-<bp>-(none|auto|xs|sm|md|lg|xl)
.q-my-<bp>-form
```

示例：`row-md`，`items-lg-end`，`q-pa-xs q-pa-sm-sm q-px-md-lg q-py-md-md`

## Flex Playground.
要查看Flex的运行情况，您可以使用 Flex Playground 以交互方式了解更多。

<q-btn push color="brand-primary" icon-right="launch" label="Flex Playground" to="/layout/grid/flex-playground" />
