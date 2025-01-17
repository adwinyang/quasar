---
title: 反应式
desc: QResponsive Vue组件强迫内容保持基于其宽度的长宽比。
keys: QResponsive
---

QResponsive是一个组件，它可以强制内容保持基于其宽度的长宽比。

## QResponsive API

<doc-api file="QResponsive" />

## 使用方法

::: tip TIPS
* 该组件可以与任何内容一起使用，只要您指定**一个直接子级**。如果您需要其中的多个元素，请将它们包装在 `<div>` 中。
* 您有责任确保您的内容不会溢出容器。
:::

::: warning
不要在已经有`ration`(比率)属性的Quasar组件上使用，如QImg或QVideo，或在有强制高度的组件上使用。
:::

### 基础

<doc-example title="基本用法" file="QResponsive/Basic" />

### 弹性行

请注意，我们使用的是垂直对齐(`items-start`)，而不是默认的(`stretch`)，这样，flexbox就不会在每个QResponsive组件上强制设置高度。

<doc-example title="基本用法" file="QResponsive/FlexRow" />

### 在某些组件上

下面只是几个例子。QResponsive并不只限于QCard和QCarousel。

<doc-example title="关于QCard" file="QResponsive/Card" />

<doc-example title="关于QCardSection" file="QResponsive/CardSection" />

<doc-example title="关于QTable" file="QResponsive/Table" />

请注意，当我们在QCarousel上使用QResponsive时，我们不会向QCarousel提供`height`属性，因为QResponsive会负责处理这个问题。

<doc-example title="在QCarousel上" file="QResponsive/Carousel" />

### 最大高度

通过CSS类或内联，直接在QResponsive组件上应用最大高度(或最大宽度，等等等等)。记住，确保内容不会溢出容器仍然是你的责任。

<doc-example title="QCard上" file="QResponsive/MaxHeight" />
