---
title: 网格间隔(Gutter)
desc: 如何使用 Quasar 网格进行空间隔离。
related:
  - /layout/grid/introduction-to-flexbox
  - /layout/grid/row
  - /layout/grid/column
  - /layout/grid/flex-playground
---

希望您之前读过[FlexBox简介](/layout/grid/introduction-to-flexbox) 理论，让我们深入了解Gutter。

Gutter Quasar CSS 类提供了一种简单的方法来将元素(特别是在[Grid Row](/layout/grid/row) 中)以相等的距离彼此隔开。

## 类型
根据您的用例，有两种主要类型的Gutter：`q-gutter-{size}`和`q-col-gutter-{size}`。第一种方法是在要彼此隔开的元素不使用指定宽度的`col-*`或`offset-*`类时使用，第二种方法是在元素具有指定宽度的`col-*`或`offset-*`类时使用。

::: tip
后缀(`-none`、`-xs`、`-sm`、`-md`、`-lg`、`-xl`)不是指设备屏幕大小，而是指元素之间的间距大小。
:::

## 类“q-gutter- {size}”

::: warning
`q-gutter-*`类将**负的顶部和左侧边距**应用于父级，将**正的顶部和左侧边距**应用于子级。在使用其他[Spacing classes](/style/spacing) 时要考虑到这一点，以免破坏 Gutter 的css。
:::

当直接子级没有指定宽度的`col-*`或`offset-*`类时，将使用这些类。

<doc-example title="Sizes for q-gutter" file="grid/GutterSize" />

还有上面的示例中没有包含的 `q-gutter-none` 类(相当于：没有应用 gutter)。

<doc-example title="Horizontal only q-gutter" file="grid/GutterHorizontal" />

<doc-example title="Vertical only q-gutter" file="grid/GutterVertical" />

<doc-example title="Mixed horizontal and vertical q-gutter" file="grid/GutterMixed" />

## 类 “q-col-gutter-{size}”

::: warning
`q-col-gutter-*`类将**负的顶部和左侧边距**应用于父级，将**正的顶部和左侧填充**应用于子级。在使用其他[Spacing classes](/style/Spacing) 时要考虑到这一点，以免破坏 Gutter 的 css。
:::

当直接子级没有指定宽度的`col-*`或`offset-*`类时，将使用这些类

<doc-example title="Sizes for q-col-gutter" file="grid/ColGutterSize" />

<doc-example title="Horizontal only q-col-gutter" file="grid/ColGutterHorizontal" />

<doc-example title="Vertical only q-col-gutter" file="grid/ColGutterVertical" />

<doc-example title="Mixed horizontal and vertical q-col-gutter" file="grid/ColGutterMixed" />

## 优点、缺点和解决问题的方法 - “q-ground-{size}” 与 “q-col-ground-{size}”

两组类各有利弊。

::: warning
因为`q-ground-*`和`q-col-ground-*`类都将**负的顶部和左侧边距**应用于父级，所以不应在父级上应用针对背景、边距或与边框相关的属性的样式。

相反，您需要将它们包装在容器中，在容器上应用样式，并**在容器**上添加`overflow-auto`或`row`类
:::

<doc-example title="Parent styling" file="grid/ParentStyling" />

::: tip
`q-gutter-*` 类**不改变**子元素的内部尺寸，因此您可以直接在子元素上使用 `background` 或 `border`。
:::

::: warning
`q-gutter-*` 类**会改变**子元素的外部尺寸，因此您不能再使用 `col-*` 或 `offset-*` 类来指定子元素的宽度。
:::

<doc-example title="Children size compare" file="grid/ChildrenSizeCompare" />

::: warning
因为`q-col-gutter-*`类对子项应用**负的顶部和左侧填充**，所以不应该对子项应用针对背景、填充或边框相关属性的样式。相反，您需要将样式化的元素放在子元素中，并在该元素上应用样式。
:::

<doc-example title="Children size compare" file="grid/ChildrenSizeCompare" />

## Flex Grid Playground
要查看 Flex 的运行情况，您可以使用 Flex Playground 以交互方式了解更多信息。

<q-btn push color="brand-primary" icon-right="launch" label="Flex Playground" to="/layout/grid/flex-playground" />

