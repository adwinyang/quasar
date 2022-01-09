---
title: 配置SSR
desc: 如何用 Quasar CLI 管理你的服务器端渲染的应用程序。
related:
  - /quasar-cli/quasar-conf-js
---

## Quasar.conf.js

这是你可以配置一些SSR选项的地方。比如你想让客户端以SPA(单页应用--默认行为)或PWA(渐进式Web应用)的形式接管。

```js
return {
  // ...
  ssr: {
    pwa: true/false, // 应该由PWA接管（默认值：false），还是仅由SPA接管 ？

    manualStoreHydration: true/false,
        // 手动给商店补充水分。
        // 这一点将在下面的小节中详细说明

    manualPostHydrationTrigger: true/false,
        // 在客户端手动触发激活后逻辑。
        // 这一点将在下面的小节中详细说明

    prodPort: 3000, // 生产服务器应该使用的默认端口
                    // (如果在运行时指定process.env.PORT，则会被取代)

    maxAge: 1000 * 60 * 60 * 24 * 30,
        // 告诉浏览器服务器上的文件何时应从缓存中过期
        // (默认值，单位为ms)
        // 只有在使用server.static()时才有效。

    // SSR中间件文件的列表(src-ssr/middlewares/*)。顺序很重要。
    middlewares: [
      // ...
      'render' // 不应缺失，且应位于列表的最后。
    ],

    // 可选；添加/删除/更改属性
    // 生产中生成的软件包.json的
    extendPackageJson (pkg) {
      // 直接改变属性的包。
      // 不需要归还任何东西
    },

    // 可选。
    // 处理Webserver webpack config ONLY
    // 其中包括SSR中间件
    extendWebpackWebserver (cfg) {
      // 直接改变cfg的props。
      // 不需要归还任何东西
    },

    // 可选；等同于extendWebpack()，但使用webpack-chain。
    // 处理Webserver webpack config ONLY
    // 其中包括SSR中间件
    chainWebpackWebserver (chain) {
      // 链是一个webpack-chain实例
      // 的Webpack配置
    }
  }
}
```

> 如果你决定采用PWA客户端接管(**这是个杀手锏)，Quasar CLI PWA模式也将被安装。你可能也想看看[Quasar PWA](/quasar-cli/developing-pwa/introduction) 指南。但最重要的是，确保你阅读[带PWA的SSR](/quasar-cli/developing-ssr/ssr-with-pwa) 页面。

在构建时，`extendWebpack()`和`chainWebpack()`会多收到一个参数(Object)，目前包含`isServer`或`isClient`的布尔属性，因为会有两个Webpack的构建(一个用于服务器端，一个用于客户端)。

```js
// quasar.conf.js
build: {
  extendWebpack(cfg, { isServer, isClient }) { ... }
}
```

如果你想了解更多信息，请看这个页面，它详细介绍了`quasar.conf.js`文件中的[处理webpack](/quasar-cli/handling-webpack) 。

### 手动触发商店激活

默认情况下， Quasar CLI 会在客户端对Vuex商店(如果你使用它)进行激活。

然而，如果你希望自己手动进行激活，你需要设置quasar.conf.js > ssr > manualStoreHydration: true。然后你需要自己调用`store.replaceState(window.__INITIAL_STATE__)`。一个很好的示例是在[启动文件](/quasar-cli/boot-files)中进行。

```js
// Some_boot_file
// 请确保配置这个启动文件
// 只在客户端运行

export default ({ store }) => {
  store.replaceState(window.__INITIAL_STATE__)
}
```

### 手动触发后激活

默认情况下， Quasar CLI 会包装你的App组件，并在这个包装组件被安装时在客户端调用`$q.onSSRHydrated()`。这就是客户端接管的时刻。你不需要配置任何东西来实现这一目标。

然而，如果你想覆盖这一时刻的发生，你需要设置quasar.conf.js > ssr > manualPostHydrationTrigger: true。不管你的原因是什么(非常自定义的用例)，这是一个手动触发后激活的示例：

```js
// App.vue - 组合式 API

import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
export default {
  // ....
  setup () {
    // ...
    const $q = useQuasar()
    onMounted(() => {
      $q.onSSRHydrated()
    })
  }
}
```

```js
// App.vue - API选项
export default {
  mounted () {
    this.$q.onSSRHydrated()
  }
}
```

## Nodejs 服务器

将SSR模式添加到 Quasar 项目中意味着将创建一个新的文件夹。`/src-ssr`，其中包含SSR特定的文件：

```bash
.
└── src-ssr/
    ├── middlewares/  # SSR middleware files
    ├── directives/   # SSR transformations for Vue directives
    └── production-export.js # SSR webserver production export
```

你可以自由编辑这些文件。这两个文件夹中的每一个都在自己的文档页面中详细说明(查看左侧菜单)。

注意几件事。

1. 这些文件在Node上下文中运行(它们不被Babel转译)，所以只使用你的Node版本所支持的ES6特性。(https://node.green/)

2. 如果你从node_modules中导入任何东西，那么请确保该包在package.json > "dependencies "中指定，而不是在 "devDependencies "中。

3. `/src-ssr/middlewares`是通过一个单独的Webpack配置建立的。**当Quasar App CLI构建你的应用程序时，你会看到它被标记为 "Webserver"。** 你可以通过quasar.conf.js连锁/扩展这些文件的Webpack配置：

```js
return {
  // ...
  ssr: {
    // ...

    // 可选的；webpack的配置对象
    // 只有Webserver部分(/src-ssr/)。
    // 这是为生产而调用的(不是为开发而调用)。
    extendWebpackWebserver (cfg) {
      // 直接改变cfg的props。
      // 不需要归还任何东西
    },

    // 可选；等同于extendWebpack()，但使用webpack-chain。
    // 只有Webserver部分(/src-ssr/)。
    // 这是为生产而调用的(不是为开发而调用)。
    chainWebpackWebserver (chain) {
      // 链是一个webpack-chain实例
      // 的Webpack配置
    }
  }
}
```

4. `/src-ssr/production-export.js`文件详见[SSR Production Export](/quasar-cli/developing-ssr/ssr-production-export) 页面。如果你需要支持无服务器功能，请特别阅读它。

## 有助于SEO

当你开发SSR而不是SPA时，其中一个主要原因是为了照顾到SEO。通过使用[Quasar Meta Plugin](/quasar-plugins/meta) 来管理搜索引擎所需的动态HTML标记，可以大大改善SEO。

## 启动文件

当在SSR模式下运行时，你的应用程序代码需要是同构的或 "通用的"，这意味着它必须在Node上下文和浏览器中运行。这也适用于你的[启动文件](/quasar-cli/boot-files) 。

然而，在有些情况下，你只想让某些引导文件只在服务器上或只在客户端运行。你可以通过指定来实现这一点：

```js
// quasar.conf.js
return {
  // ...
  boot: [
    'some-boot-file', // 运行在服务器端和客户端
    { path: 'some-other', server: false } // 此引导文件仅嵌入在客户端
    { path: 'third', client: false } // 此引导文件仅嵌入在服务器端
  ]
}
```

不过，只要确保你的应用程序是一致的。

当启动文件在服务器上运行时，你将可以在默认导出的函数上多获得一个参数(称为[ssrContext](/quasar-cli/developing-ssr/ssr-context)) :

```js
// 一些引导文件
export default ({ app, ..., ssrContext }) => {
  // 你可以向ssrContext添加props，然后在src/index.template.html中使用它们。
  // 示例 - 假设我们ssrContext.someProp = 'some value'，那么在索引模板中我们可以引用它。
  // {{有些作物}}
}
```

当你在你的`src/index.template.html`中添加这样的引用(上面的示例中用括号包围的`someProp`)时，确保你告诉 Quasar 它只对SSR构建有效：

```html
<!-- index.template.html -->
<% if (ctx.mode.ssr) { %>{{ someProp }} <% } %>
```
