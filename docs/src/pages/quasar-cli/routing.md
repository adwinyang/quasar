---
title: 应用程序路由
desc: 如何在Quasar应用程序中使用Vue Router。
---

你会注意到，你的Quasar项目包含一个`/src/router`文件夹。这里面有你的网站/应用程序的路由配置。

* "/src/router/index.js" 保存Vue Router的初始化代码
* "/src/router/routes.js "存放你的网站/应用程序的路由。

::: warning
Quasar文档假定你已经熟悉了[Vue Router](https://github.com/vuejs/vue-router-next)。下面我们只描述了如何在Quasar CLI项目中使用它的基本情况。对于其功能的完整列表，请访问[Vue Router 文档](https://next.router.vuejs.org/)。
:::

`/src/router/routes.js`需要导入你的网站/应用程序的页面和布局。阅读更多关于[Routing with Layouts and Pages](/layout/routing-with-layouts-and-pages)文档页面。

当使用Vuex时，商店不能直接从其他脚本中导入，但它被传递到`/src/router/index.js`的导出函数中，因此可以从那里访问它。例如，你可以使用`Router.beforeEach`方法来检查路由器中的认证。

```js
export default function ({ store /*, ssrContext */ }) {
  // ...
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth) && !store.getters['auth/isSignedIn']) {
      next({ name: 'account-signin', query: { next: to.fullPath } })
    } else {
      next()
    }
  })
  // ...
}
```

::: tip
如果你正在开发一个SSR应用程序，那么你可以看看[ssrContext](/quasar-cli/developing-ssr/ssr-context)对象，它被提供到服务器端。
:::
