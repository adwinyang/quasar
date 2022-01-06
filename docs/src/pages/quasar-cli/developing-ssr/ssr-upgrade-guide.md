---
title: SSR的升级指南
desc: 处理SSR时从Quasar v1升级到v2的说明。
related:
  - /quasar-cli/developing-ssr/configuring-ssr
  - /quasar-cli/developing-ssr/ssr-context
  - /quasar-cli/developing-ssr/ssr-middleware
  - /quasar-cli/developing-ssr/ssr-production-export
---

本页仅指将Quasar UI v1(使用Vue 2)的应用程序升级为Quasar UI v2(使用Vue 3)。
## 从Quasar v1升级到Quasar v2

Quasar v2的SSR模式几乎完全颠覆了之前的版本，大大改善了开发者的体验。由于Vue 3的架构要求，其中一些变化是必须的。

请注意，目前唯一支持Nodejs的服务器是[Expressjs](https://expressjs.com/)。

### 改进的高度概述

* 引入了[SSR中间件](/quasar-cli/developing-ssr/ssr-middleware)文件的概念，这也允许在开发时为它们提供HMR。这取代了旧的`index.js`和`extension.js`。
* 完全相同的中间件现在可以在开发和生产构建中运行，而不仅仅是旧的 "SSR扩展"。
* 你也可以为SSR中间件启用提示功能。
* 由于Vue 3的架构，你现在可以(而且需要！)为你的每个自定义Vue指令定义一个SSR转换(Quasar提供的Vue指令不在此范围内)。
**对Typescript的开箱支持**。`src-ssr`下的所有js文件现在可以改写成.ts。请务必阅读 [SSR with Typescript](/quasar-cli/developing-ssr/ssr-with-typescript) 以了解更多信息。

### /src-ssr文件夹

```bash
# old structure
.
└── src-ssr/
    ├── index.js      # Production Node webserver serving the app
    └── extension.js  # Common code for production & development server

# NEW structure
.
└── src-ssr/
    ├── middlewares/  # SSR middleware files
    ├── directives/   # SSR transformations for Vue directives
    └── production-export.js # SSR webserver production export
```

### 执行升级

旧的`index.js`和`extension.js`已经被优秀的SSR中间件文件所取代。在进一步深入研究之前，最好是[阅读一下SSR中间件](/quasar-cli/developing-ssr/ssr-middleware)。

那么我们开始吧。
1. 我们建议你把你当前的`src-ssr`文件夹的内容保存在其他地方。
2. 2. 删除并重新添加Quasar SSR模式(`$ quasar mode remove ssr`, `$quasar mode add ssr`)。
3. 3. 在quasar.conf.js > ssr > middlewares下声明中间件文件。[]. 数组应该看起来像这样。
```js
middlewares。[
ctx.prod ? '压缩' : ''。
'render' // 应该始终把这个作为最后一个。
]
```
4. 然后你将不得不通过使用SSR中间件文件来移植旧的逻辑，这应该非常容易(因为你最终会把大部分旧的代码复制到中间件文件中)。
5. 5. 查看quasar.conf.js > ssr属性。大多数旧属性已经被删除，并被[新属性]取代(/quasar-cli/developing-ssr/configuring-ssr#quasar-conf-js)。

还要记住，你在`src-ssr/middlewares`文件夹中创建的文件也需要在quasar.conf.js > ssr > middlewares下声明。这是因为它们的顺序很重要，就像应用任何Expressjs中间件的顺序也很重要。你可以使用`$ quasar new ssrmiddleware <name>`命令来加快进度。

始终保持原始的`render`中间件在列表的最后一个。

### 提示

* 你可能想看看[新配置](/quasar-cli/developing-ssr/configuring-ssr)的属性，可通过quasar.conf.js > ssr获得。
* 你可能想看看[ssrContext](/quasar-cli/developing-ssr/ssr-context)页面，它详细描述了你可以从中使用哪些属性。
* 你可能想看看 [SSR Production Export](/quasar-cli/developing-ssr/ssr-production-export) 页面，它详细描述了production-export.js/ts可以为你做什么。
