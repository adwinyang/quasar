---
title: 标记表
desc: QMarkupTable Vue组件是一个辅助包装器，它可以为一个本地表提供样式。
keys: QMarkupTable
related:
  - /vue-components/table
---

QMarkupTable是一种方法，你可以简单地包装一个本地的`<table>`，以使它看起来像一个Material Design的表格。

::: tip
对于像分页、排序、过滤等高级功能，你可能想看看[QTable](/vue-components/table)组件来代替。
:::

## QMarkupTable API

<QMarkupTable>文件

## 用法

::: warning
请注意，`QMarkupTable`的内容反映了本地HTML`<table>`的准确标记表示，有`<thead>`和`<tbody>`来包裹标题和表体。这是必须的。
:::

::: warning UMD developers
这个组件在UMD版本的Quasar中是无法正常工作的。浏览器会在Vue启动和渲染之前解析模板HTML，所以标记需要正确。`<q-markup-table> <thead>`或`<q-markup-table> <tbody>`不是。解决方案是直接使用QMarkupTable Vue的渲染标签(`<table class="....`)。
:::

<doc-example title="基本" file="QMarkupTable/Basic" no-edit />

<doc-example title="分离器" file="QMarkupTable/Separators" no-edit />

<doc-example title="黑暗" file="QMarkupTable/Dark" no-edit />

<doc-example title="自定义" file="QMarkupTable/Customization" no-edit />

::: tip
如果你想移除某些行或某些单元格的悬停效果，可以给它们添加一个`q-tr-no-hover`或`q-td-no-hover`类。
:::
