---
title: SSR常见问题
desc: Quasar服务器端渲染应用程序的技巧和窍门。
---

## 我为什么会出现激活错误？
请看我们的[客户端激活](/quasar-cli/developing-ssr/client-side-hydration)页面。当你得到激活错误时，这意味着在服务器上渲染的HTML与在客户端渲染的等效HTML不一致。这个错误只在开发时出现(而不是在生产时)，在你发布你的网站之前，它肯定需要被解决。是否有一些内容你只能在客户端生成？那就使用[QNoSsr](/vue-components/no-ssr)。

## 为什么导入Platform和Cookies不起作用？
当为SSR构建时，只使用`$q.platform`/`$q.cookies`形式。如果你需要使用`import { Platform, Cookies } from 'quasar'`(在服务器端时)，那么你需要这样做：

```js
// 与平台的示例；对Cookies也是如此
import { Platform } from 'quasar'

// 你需要访问`ssrContext`。
function (ssrContext) {
  const platform = process.env.SERVER
    ? Platform.parseSSR(ssrContext)
    : Platform // otherwise we're on client

  // 平台等同于非SSR构建中的全局导入
}
```

`ssrContext`在[Boot Files](/quasar-cli/boot-files) 或[PreFetch Feature](/quasar-cli/prefetch-feature) 中可用，它是作为一个参数提供。

这是有原因的。在一个纯客户端的应用中，每个用户都会在他们的浏览器中使用一个新的应用实例。对于服务器端的渲染，我们也想要同样的东西。每个请求都应该有一个新鲜的、孤立的应用程序实例，这样就不会有跨请求的状态污染。所以[Platform](/options/platform-detection) 和[Cookies](/quasar-plugins/cookies) 需要分别绑定到每个请求。

另外一个好主意是阅读[Writing Universal Code](/quasar-cli/developing-ssr/writing-universal-code) 文档页面。

## 为什么LocalStorage和SessionStorage不工作？
当在服务器端运行代码时，存储设施不能工作。网络存储是一个仅适用于浏览器的API。
