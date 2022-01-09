---
title: 布局页面
desc: 如何使用 QPageContainer 和 QPage 组件。 它们定义了 Quasar App 页面的内容。
keys: QPage
related:
  - /layout/layout
---

我们将谈论在 QLayout 中的封装页面。 如果您还没有，请先阅读[QLayout](/loayout/layout) 文档页面。

## QPageContainer API
<doc-api file=`QPageContainer`/>

## QPage API.
<doc-api file=`QPage`/>

## 布局构建器
单击下面的按钮，构建您的布局。

<q-btn push color="brand-primary" icon-right="launch" label="Layout Builder" href="layout-builder" target="_blank" rel="noopener noreferrer" />

## 用法

QPage 必须由 QPageContainer 封装，而 QPageContainer 又必须是 QLayout 的子级。

```html
<q-layout>
  ...
  <q-page-container>
    <q-page>
      <!-- 页面内容 -->
    </q-page>
  </q-page-container>
  ...
</q-layout>
```

通常，QPageContainer 是布局模板的一部分(其中仅包含`<router view/>`子元素)，其内容放入`/src/pages` 下的单独 vue 文件中。如果还没有，请阅读[Routing with Layouts and Pages](/layout/routing-with-layouts-and-pages) 。

```html
<!-- 用于布局的 vue 文件: -->
<q-layout>
  ...
  <q-page-container>
    <router-view />
  </q-page-container>
  ...
</q-layout>

<!-- 含有一个页面的 vue 文件: -->
<q-page padding>
  <!-- 页面内容 -->
</q-page>
```

### 示例
::: tip
由于 QPageContainer 和 QPage 需要布局并且 QLayout 默认管理整个窗口，因此出于演示目的，我们将使用容器化的 QLayout。但请记住，您绝不需要为 QPageContainer 和 QPage 使用容器化的 QLayout。
:::

<doc-example title="Basic" file="QPage/Basic" />

### Style-fn
QPage 需要 QLayout，因为 QLayout 控制页面的所有偏移量，根据其 `view` 属性配置，考虑页眉/页脚/抽屉使用的空间。默认情况下，您的 QPage 组件将设置一个 `min-height` CSS 属性，以确保内容始终填满屏幕，即使内容只有几行。

如果你想调整，甚至删除这个属性，你可以使用 `style-fn` 属性来实现：

```html
<template>
  <q-page :style-fn="myTweak">...</q-page>
</template>

<script>
export default {
  // ......
  methods: {
    myTweak (offset) {
      //“offset”是指总计的数字(像素)
      //标题+页脚的高度，占用屏幕，
      //基于QLayout“View”的Prop配置

      //这实际上是默认的样式 -  FN在 Quasar 中所做的
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
    }
  }
}
</script>
```
