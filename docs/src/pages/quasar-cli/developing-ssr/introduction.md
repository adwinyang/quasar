---
title: 什么是SSR
desc: 介绍使用 Quasar CLI 进行服务器端渲染的应用程序。
---

 Quasar 和Vue.js是构建客户端应用程序的框架。默认情况下，Quasar Vue组件在浏览器中产生并操作DOM作为输出。然而，也可以在服务器上将同样的组件渲染成HTML字符串，直接发送到浏览器，最后在客户端将静态标记 "激活 "成一个完全交互的应用程序。

一个服务器渲染的 Quasar 应用程序也可以被认为是 "同构 "或 "通用 "的，也就是说，你的应用程序的大部分代码都在服务器和客户端运行。

## 为什么是SSR？
与传统的SPA(单页应用程序)相比，SSR的优势主要在于。

**更好的SEO**，因为搜索引擎爬虫会直接看到完全渲染的页面。
**更快的内容到达时间**，特别是在慢速网络或慢速设备上。服务器渲染的标记不需要等到所有的JavaScript被下载和执行后再显示，所以你的用户会更快地看到一个完全渲染的页面。这通常会带来更好的用户体验，而且对于内容到达时间与转换率直接相关的应用来说，这一点至关重要。

在使用SSR时，也有一些需要考虑的权衡因素。

**开发限制**。浏览器特定的代码只能在某些生命周期钩子内使用；一些外部库可能需要特殊处理才能在服务器渲染的应用程序中运行。
**更多的服务器端负载**。在Node.js中渲染一个完整的应用程序显然会比只提供静态文件更耗费CPU，所以如果你预计会有高流量，要为相应的服务器负载做好准备，并明智地采用缓存策略。

在为你的应用程序使用SSR之前，你应该问的第一个问题是你是否真的需要它。这主要取决于时间到内容对你的应用程序有多重要。例如，如果你正在建立一个内部仪表盘，在初始加载时多出几百毫秒并不重要，那么SSR将是一种多余的做法。然而，在内容到达时间绝对重要的情况下，SSR可以帮助你实现最佳的初始加载性能。

<q-separator class="q-mt-xl" />

> 本页部分内容摘自官方 [Vue.js SSR指南](https://ssr.vuejs.org/guide/universal.html#data-reactivity-on-the-server) 。
