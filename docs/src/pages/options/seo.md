---
title: 用 Quasar 进行搜索引擎优化
desc: 管理 Quasar 应用中的搜索引擎优化。
---

SEO一词指的是搜索引擎优化。Quasar通过[Quasar Meta Plugin](/quasar-plugins/meta)也涵盖了这个方面。

## Quasar Meta Plugin

Quasar Meta Plugin](/quasar-plugins/meta)可以动态改变页面标题，管理`<meta>`标签，管理`<html>`和`<body>` DOM元素属性，添加/删除/改变文档头部的`<style>`和`<script>`标签(对CDN样式表或js-ld标记等很有用)，或管理`<noscript>`标签。

通过使用**Quasar CLI**，特别是**的SSR(服务器端渲染)构建，充分利用这一功能。将其用于SPA(单页应用程序)不太合理，因为这种情况下的元信息将在运行时添加，而不是由Web服务器直接提供(如SSR构建)。

::: tip
这个 Quasar 插件与 Quasar 的整合最为紧密，因此与其他类似的解决方案相比，它的性能最好。
:::
