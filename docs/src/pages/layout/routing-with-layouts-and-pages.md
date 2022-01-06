---
title: 使用布局和页面路由
desc: 如何将 Vue Router 与您的 Quasar 布局和页面连接起来。
---
您可以在使用 Quasar Layout 构建路由的同时受益于 Vue Router 的功能。以下信息只是建议，并非必须遵守。 Quasar 为您提供充分的自由。仅以下面几行为例。

[QLayout](/layout/layout)是用来封装页面的组件，让多个页面共享同一个页眉、抽屉等。但是，您也可以按页眉/页脚/抽屉进行配置，但它们都必须是 QLayout 组件的子项。为了理解这是如何工作的，您需要阅读一些关于 [Vue Router 嵌套路由](http://router.vuejs.org/en/essentials/nested-routes.html) 的内容。

要使它更加清晰，让我们举个示例。我们有一个布局('user')和两页('user-feed'和'user-profile')。我们要配置这样的网站/App路由：`/user/feed`和`/user/profile`。

## 创建文件

**Quasar 不强制执行特定的文件夹结构**。下面只是一个示例。您可以将布局和页面放在一个文件夹中，或者将页面放在您选择的特定文件夹结构中，或者创建您自己的布局和页面文件夹。对 Quasar 来说无关紧要。重要的是你在`/src/router/routes.js` 中正确引用它们。

让我们创建布局和页面文件。您可以使用Quasar CLI的一个辅助命令，或者干脆自己创建。

```bash
$ quasar new layout User
 app:new Generated layout: src/layouts/User.vue +0ms
 app:new Make sure to reference it in src/router/routes.js +2ms

$ quasar new page Profile Posts
 app:new Generated page: src/pages/Profile.vue +0ms
 app:new Make sure to reference it in src/router/routes.js +2ms

 app:new Generated page: src/pages/Posts.vue +1ms
 app:new Make sure to reference it in src/router/routes.js +0ms
```

上面的命令创建以下文件夹结构：
```bash
src/
├── layouts
│   └── User.vue         # 我们的 QLayout 定义
└── pages
    ├── Posts.vue        # 页面: /user/feed route
    └── Profile.vue      # 页面： /user/profile route
```

## 定义路由
你的页面(`/src/pages`)和布局(`/src/layouts`)通过 `/src/router/routes.js` 中的 Vue Router 注入你的网站/应用程序(并进行管理)。每个页面和布局都需要在那里引用。

`routes.js` 的示例：
```js
// 我们在此文件中定义我们的路由

import LandingPage from 'pages/Landing'

const routes = [
  {
    path: '/',
    component: LandingPage
  }
]

export default routes
```

使用 延迟加载/按需加载 (Lazy-Loading/on-demand) 的`routes.js`的示例：

```js
// 我们在此文件中定义我们的路由

const routes = [
  {
    path: '/',
    component: () => import('pages/Landing')
  }
]

export default routes
```

::: tip
更深入地分析[延迟加载/代码分块]( quasar-cli/lazy-loading)。
:::

::: tip
配置要使用布局和页面的路由基本上由正确嵌套路由组成，因为我们将在下一节中看到。
:::

## 嵌套路由
真正的 App UI 通常由嵌套在多个层次的组件组成。 一个 URL的片段对应于某个嵌套组件的结构也很常见，例如：

```
/user/profile                   /user/posts
+------------------+            +-----------------+
| User             |            | User            |
| +--------------+ |            | +-------------+ |
| | Profile      | |  +------>  | | Posts       | |
| |              | |            | |             | |
| +--------------+ |            | +-------------+ |
+------------------+            +-----------------+
```

使用 Vue Router，使用嵌套路由配置来表达这种关系非常简单。我们注意到一些事情：两个页面都需要由 User 组件包装。嘿，User 组件就是一个布局！

因为用户布局包装了内部页面，所以它们需要一个注入点。这是由 `<router-view>` 组件提供的：

```html
<!-- /src/layouts/User.vue -->
<template>
  <q-layout>
    ...

    <!-- 这是注入页面的地方 -->
    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    ...
  </q-layout>
</template>
```

```html
<!-- /src/pages/Profile.vue or Posts.vue -->
<template>
  <q-page>
    ...页面内容...
  </q-page>
</template>
````

我们的示例指定了一些路由(/user/profile和/user/posts)**那么我们现在怎么才能把所有的东西都放在一起呢？**我们编辑路由文件。在这里，我们将配置路由，告知哪些组件是布局，哪些是页面，并将它们引用/导入到我们的应用程序中：

```js
// src /路由器/ routes.js

import User from 'layouts/User'
import Profile from 'pages/Profile'
import Posts from 'pages/Posts'

const routes = [
  {
    path: '/user',

    //我们使用上面导入的组件: /src/layouts/User
    component: User,

    // 嘿，它有子路由, 其中 User 有 <router-view>;
    // 那么它就是一个真正的布局！
    children: [
      // 个人资料页
      {
        path: 'profile', // here it is, route /user/profile
        component: Profile // we reference /src/pages/Profile.vue imported above
      },

      // 帖子页面
      {
        path: 'posts', // here it is, route /user/posts
        component: Posts // we reference /src/pages/Posts.vue imported above
      }
    ]
  }
]

export default routes
```

::: warning
请注意，嵌套路径以`/`开头的路径将被视为根路径。 这允许您利用组件嵌套，而不必使用嵌套的 URL。
:::

我们的路由配置(`/src/router/routes.js`)应该如下所示：

```js
export default [
  {
    path: '/user',

    // 我们将它指向我们的组件
    // 我们定义了 QLayout
    component: () => import('layouts/user'),

    // 现在我们定义子路由。
    // 这些被注入到
    // 布局(从上面)自动注入
    // 通过使用<router-view> 占位符来实现
    // (需要在布局中指定它)
    children: [
      {
        path: 'feed',
        component: () => import('pages/user-feed')
      },
      {
        path: 'profile',
        component: () => import('pages/user-profile')
      }
    ]
  }
]
```

请注意以下几点：

* 我们使用的是布局和页面的延迟加载(`() => import (<path>)`)。如果您的网站/App 很小，那么您可以跳过懒加载，因为它们会增加更多的开销：
  ```js
  import UserLayout from 'layouts/user'
  import UserFeed from 'pages/user-feed'
  import UserProfile from 'pages/user-profile'

  export default [
    path: '/user',
    component: UserLayout,
    children: [
      { path: 'feed', component: UserFeed },
      { path: 'profile', component: UserProfile }
    ]
  ]
  ```
* Quasar 提供了一些开箱即用的 Webpack 别名('layouts'指向'/src/layouts'，'pages'指向'/src/pages')，它们在上面的示例中使用。
* 布局的页面在 Vue Router 配置中被声明为它的子元素，以便 `<router-view/>` 知道要注入哪个页面组件。请记住，只要您的布局(Layout)中附带有页面，就始终使用此 Vue 组件。

  ```html
  <q-layout>
    ......
    <q-page-container>
      <--
        这是将页面注入布局(Layout)的地方
       -->

      <router-view/>
    </ q-page-container>
    ......
  </ q-layout>
  ```

<q-separator class="q-mt-xl" />

::: tip
请查看 [Vue Router](http://router.vuejs.org/) 文档以充分理解上述示例以及如何为您的应用配置路由器及其路由。
:::
