---
title: ssrContext对象
desc: Quasar SSR中的ssrContext对象
---

`ssrContext`对象是SSR上下文，所有应用程序的Vue组件都是用它来渲染的。

## 用法

::: warning
`ssrContext`对象只在SSR构建中可用，在服务器端编译(当`process.env.SERVER == true`)。
:::

在其他地方，它作为参数提供给[boot files](/quasar-cli/boot-files) 、[Vuex store](/quasar-cli/vuex-store) 和[Vue Router](/quasar-cli/routing) 初始化函数，以及[preFetch](/quasar-cli/refetch-feature) 方法。

```js
// 一个启动文件
export default ({ ..., ssrContext }) => { /* ... */ }

// src/router/index.[js|ts]
export default ({ ..., ssrContext }) { /* ... */ }

// src/store/index.[js|ts]
export default ({ ..., ssrContext }) { /* ... */ }

// 与preFetch。
preFetch ({ ..., ssrContext }) { /* ... */ }
```

你也可以在你的Vue组件中访问ssrContext。下面是两个示例，一个用组合式 API，一个用选项式 API：

```js
// 组成API
import { useSSRContext } from 'vue'

export default {
  // ...
  setup () {
    // 我们需要保护它，并且只在SSR服务器端调用它。
    const ssrContext = process.env.SERVER ? useSSRContext() : null
    // ...用它做一些事情
  }
}
```

```js
// 选项式 API
export default {
  // ...
  created () { // can be any other Vue component lifecycle hook
    this.ssrContext
  }
}
```

## 对ssrContext的剖析

```js
ssrContext: {
  req,        // Express.js object
  res,        // Express.js object
  $q,         // The Quasar's $q Object
  state,      // The Vuex state (ONLY if using the Vuex store)

  nonce,      // (optional to set it yourself)
              // 要使用的全局 "nonce "属性

  onRendered, // Registers a function to be executed server-side after
              // 应用程序已经用Vue渲染。你可能需要这个
              // 在ssrContext被完全处理后再次访问它。
              // 示例: ssrContext.onRendered(() => { /* ... */ })

  rendered    // (optional to set it yourself)
              // 将此设置为一个将在服务器端执行的函数
              // 在应用程序用Vue渲染之后。
              // 我们建议使用 "onRendered "来代替。
              //
              // 目的：向后兼容Vue生态系统的软件包
              // (如@vue/apollo-ssr)
              // 示例：ssrContext.rendered = () => { /* ...。*/ }
}
```

关于 "nonce "属性的目的的更多信息可以在[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce)上找到。

`req`和`res`是Express.js对当前服务器客户端的对象。`req`的一个用例是访问`req.url`以获得客户端正在请求的URL。

::: tip
你也可以将自己的东西注入到ssrContext中，但不要篡改任何私有属性(以下划线开头的属性，例如`_someProp`)。
:::
