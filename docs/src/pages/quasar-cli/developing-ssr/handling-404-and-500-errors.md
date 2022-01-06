---
title: SSR对404和500错误的处理
desc: 在Quasar服务器端渲染的应用程序中管理常见的404和500 HTTP错误。
---

在SSR上对404和500错误的处理与其他模式(如SPA)有点不同。如果你查看`/src-ssr/middlewares/render.js`，你会发现以下部分。

```js
export default ({ app, resolve, render, serve }) => {
  // 我们捕获任何其他快递路线并将其交给
  // 转到Vue和Vue Router来渲染我们的页面
  app.get(resolve.urlPath('*'), (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    render({ req, res })
      .then(html => {
        // 现在让我们把渲染好的html发送到客户端
        res.send(html)
      })
      .catch(err => {
        // 哎呀，我们在渲染页面时出现了一个错误

        // 我们被告知要重定向到另一个URL
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url)
          }
          else {
            res.redirect(err.url)
          }
        }
        // 嗯，Vue Router找不到请求的路由
        else if (err.code === 404) {
          // 只有在没有 "总括 "路线的情况下，才应到达这里。
          // 是在/src/routes中定义的。
          res.status(404).send('404 | Page Not Found')
        }
        // 那么，我们把任何其他代码都视为错误。
        // 如果我们是在开发模式下，那么我们可以使用Quasar CLI
        // 以显示一个漂亮的错误页面，其中包含堆栈
        // 和其他有用的信息
        else if (process.env.DEV) {
          // service.error仅在dev上可用
          serve.error({ err, req, res })
        }
        // 我们在生产中，所以我们应该有另一种方法
        // 当我们遇到错误时，向客户端显示一些东西
        // (出于安全原因，显示相同的财富是不可以的。
        // 的信息，正如我们在开发中所做的那样)
        else {
          // 在生产过程中呈现错误页面或
          // 为错误页面创建一个路由(/src/routes)并重定向到它
          res.status(500).send('500 | Internal Server Error')
        }
      })
  })
}
```

上面的部分是在捕捉到其他可能的请求(如对/public文件夹、manifest.json和service worker等)后写的。这就是我们用Vue和Vue Router渲染页面的地方。

## 需要注意的事项

我们将讨论一些你需要注意的架构决定。选择任何最适合你的应用的方式。

### 错误404

如果你在Vue Router的`/src/router/routes.js`文件中定义了一个等价的404路由(如下图)，那么上面示例中的`if (err.code === 404) {`部分将永远不会是`true`，因为Vue Router已经处理了它。

```js
// 用Vue Router抓取404的路由实例
{ path: '/:catchAll(.*)*', component: () => import('pages/Error404.vue') }
```

### 错误500

在页面顶部的`/src-ssr/middlewares/render.js`示例中，注意到如果webserver遇到任何渲染错误，我们会发送一个简单的字符串回给客户端('500 | 内部服务器错误')。如果你想显示一个漂亮的页面，你可以这样做。

1. 在`/src/router/routes.js`中添加一个特定的路由，比如。
```js
{ path: 'error500', component: () => import('pages/Error500.vue') }
```
2. 编写Vue组件来处理这个页面。在这个示例中，我们创建`/src/pages/Error500.vue`。
3. 然后在`/src-ssr/middlewares/render.js`。
```js
if (err.url) { ... }
else if (err.code === 404) { ... }
else {
// 我们在这里得到一个500错误。
// 我们重定向到我们在步骤1中新定义的 "error500 "路由。
res.redirect(resolve.urlPath('error500')) // 保持对publicPath的考虑!
}
```

::: danger
唯一需要注意的是，你需要确保在渲染'/error500'路线时，你不会得到另一个500错误，这将使你的应用程序进入一个无限循环！"。
:::

一个完美的方法是直接从`/src-ssr/middlewares/render.js`返回错误500页面的HTML(作为字符串)。

```js
res.status(500).send(`<html>....</html>`)
```
