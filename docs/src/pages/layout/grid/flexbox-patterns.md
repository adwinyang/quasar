---
title: Flexbox 模式
desc: 使用 Flexbox CSS 的常见方法, 以及如何在 Quasar App 中使用它。
related:
  - /layout/grid/introduction-to-flexbox
  - /layout/grid/row
  - /layout/grid/column
  - /layout/grid/gutter
  - /layout/grid/flex-playground
---

以下是使用[Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)的一些常见模式。 有些信息可以在[Tobias Ahlin 的博客](https://tobiasahlin.com/blog/)中找到。

## Flex行/列中断
您可以定义一个CSS类，该类将强制应用它的元素在 flex 布局中创建行/列分隔符

```sass
.flex-break
  flex: 1 0 100% !important
.row
  .flex-break
    height: 0 !important
.column
  .flex-break
    width: 0 !important
```
在定义Flex容器时，请注意不要使用`no-warp`，并在您需要的地方插入一个类为 `flex-break` 的 `div`

::: tip
可以在行分隔元素上使用`q-py-###`或在列分隔元素上使用`q-px-###`来增加空间。
:::

```html
<div class="row">
  <div>Col 1 / Row 1</div>
  <div>Col 2 / Row 1</div>
  <div class="flex-break"></div>
  <div>Col 1 / Row 2</div>
  <div class="flex-break q-py-md"></div>
  <div>Col 1 / Row 3</div>
  <div>Col 2 / Row 3</div>
  <div>Col 3 / Row 3</div>
</div>
```

<doc-example title="Row break" file="grid/BreakRow" />

::: warning
使用`column`类型 Flex 时，必须为容器定义高度。高度必须足够大，以容纳最长的一列。
:::

<doc-example title="Column break" file="grid/BreakColumn" />

## 砌体式布局
当将 `column` 类型的 flex 与多列一起使用时，元素的视觉顺序将是垂直列。有时，您希望顺序跟随布局中的行，为了实现这一点，您可以使用组合或自定义顺序CSS样式和分栏元素。

::: warning
您必须知道您想要用于布局的列数。 另外，对于最佳视觉方面，布局中的元素应靠近其他元素。
:::

`$x`列数的一般CSS公式是：

```scss
$x: 3;

@for $i from 1 through ($x - 1) {
  .item:nth-child(#{$x}n + #{$i}) {
    order: #{$i};
  }
}

.item:nth-child(#{$x}n) {
  order: #{$x};
}
```

示例，延长您想要4列布局：

```sass
.item:nth-child(4n+1)
  order: 1
.item:nth-child(4n+2)
  order: 2
.item:nth-child(4n+3)
  order: 3
.item:nth-child(4n)
  order: 4
```

对于HTML，有一些要求应遵循：
- Flex列容器必须定义高度
- 分栏元素必须放在开头
- 分栏元素必须与列数一样多
- 必须隐藏第一列分栏元素(类`hidden`或样式`display: none`)

例如，假设你想要一个 4 列的布局：

```html
<div class="column">
  <div class="flex-break hidden"></div>
  <div class="flex-break"></div>
  <div class="flex-break"></div>
  <div class="flex-break"></div>

  <div>Cell 1</div>
  <div>Cell 2</div>
  ...
  <div>Cell last</div>
</div>
```

<doc-example title="Masonry" file="grid/Masonry" />

## 使用伪选择器打断行/列的砌体
当不容易或不可能插入行/列分隔符元素，并且需要2或3行/列时，您可以使用伪（pseudo)选择器。

```sass
.container-class
  &--2-rows
    :before
      flex: 1 0 100% !important
      height: 0 !important
      order: 1
  &--2-columns
    :before
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3-rows
    :before,
    :after
      flex: 1 0 100% !important
      height: 0 !important
      order: 2
  &--3-columns
    :before,
    :after
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
```

<doc-example title="Masonry like table grid" file="grid/MasonryTableGrid" />
