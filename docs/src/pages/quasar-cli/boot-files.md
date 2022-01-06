---
title: 启动文件
desc: 在Quasar应用程序中管理你的启动代码。
related:
  - /quasar-cli/quasar-conf-js
---

Quasar 应用程序的一个常见用例是**在实例化根Vue应用程序实例之前运行代码**，例如注入和初始化您自己的依赖项(示例：Vue组件、库…)或者简单地配置一些应用程序的启动代码。

由于你无法访问任何`/main.js`文件(以便Quasar CLI可以无缝地初始化和构建SPA/PWA/SSR/Cordova/Electron的相同代码库)，Quasar通过允许用户定义所谓的启动文件为这个问题提供了一个优雅的解决方案。

在早期的Quasar版本中，为了在根Vue实例实例化之前运行代码，你可以改变`/src/main.js`文件并添加任何你需要执行的代码。

这种方法有一个很大的问题：随着项目的发展，你的`main.js`文件很可能变得杂乱无章，维护起来也很困难，这就违背了Quasar鼓励开发者编写可维护的、优雅的跨平台应用程序的理念。

有了启动文件，就可以将你的每个依赖关系分割成独立的、易于维护的文件。通过`quasar.conf.js`的配置，禁用任何一个引导文件，甚至在上下文中决定哪些引导文件可以进入构建，也是非常简单的。

## 启动文件的剖析

启动文件是一个简单的JavaScript文件，可以选择导出一个函数。Quasar在启动应用程序时将调用导出的函数，并向该函数传递带有以下属性的***对象。

| Prop name | Description |
| `app` | Vue应用实例 |
| `router` | 来自'src/router/index.js'的Vue Router实例。
| `store` | 应用程序Vuex商店的实例 - **store只有在你的项目使用Vuex时才会被传递(你有src/store)**。
| `ssrContext` | 仅在服务器端可用，如果为SSR构建。[更多信息](/quasar-cli/developing-ssr/ssr-context) | `urlPath` !
| `urlPath` | URL的路径名(路径+搜索)部分。它在客户端也包含哈希值。|
| `publicPath` | 配置的公共路径。|
| `redirect` | 调用函数来重定向到另一个URL。接受字符串(完整的URL)或Vue Router位置字符串或对象。|


```js
export default ({ app, router, store }) => {
  // 有事可做
}
```

启动文件也可以是异步的。

```js
export default async ({ app, router, store }) => {
  // 有事可做
  await something()
}
```

你可以用`boot`帮助器来包装返回的函数，以获得更好的IDE自动完成体验(通过Typescript)。

```js
import { boot } from 'quasar/wrappers'

export default boot(async ({ app, router, store }) => {
  // 有事可做
  await something()
})
```

注意我们使用的是[ES6结构化赋值](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)。只赋值你实际需要/使用的东西。

你可能会问自己为什么我们需要导出一个函数。这实际上是可选的，但在你决定删除默认导出之前，你需要了解你什么时候需要它。

```js
// 在默认出口之外。
//  - 这里的代码会被立即执行。
//  - 进口声明的好地方。
//  - 无法访问路由器、Vuex商店，...

export default async ({ app, router, store }) => {
  // 这里的代码可以访问上面的Object param，连接到
  // 与你的应用程序的其他部分。

  // 这里的代码可以是异步的(使用async/await或者直接返回一个Promise)。

  // 这里的代码会在应用程序生命周期中的正确时间由Quasar CLI执行。
  //  - 我们有一个实例化的Router。
  //  - 我们已经将可选的Vuex存储实例化了。
  //  - 我们有根应用程序的组件[Object param中的 "app "prop]Object与
  //      Quasar将对Vue应用程序进行实例化。
  //      ("new Vue(app)" -- 不要自己调用这个)。
  //  - ...
}
```

## 何时使用引导文件
::: warning
请确保你了解启动文件解决了什么问题，什么时候使用它们是合适的，以避免在不需要它们的情况下应用它们。
:::

启动文件满足了一个特殊的目的：它们在App的Vue根组件实例化之前**运行代码，同时允许你访问某些变量，如果你需要初始化一个库、干扰Vue Router、注入Vue原型或注入Vue应用的根实例，就需要这样做。

### 适当使用引导文件的示例

* 你的Vue插件有安装说明，比如需要对其调用`app.use()`。
* 你的Vue插件需要对添加到根实例的数据进行实例化 - 一个示例是[vue-i18n](https://github.com/kazupon/vue-i18n/)。
* 你想用`app.mixin()`添加一个全局混合器。
* 你想在Vue应用的globalProperties中添加一些东西以方便访问 - 一个示例是在你的Vue文件中方便地使用`this.$axios`(用于选项式 API)，而不是在每个文件中导入Axios。
* 你想干扰路由器 - 一个示例是使用`router.beforeEach`进行验证。
* 你想干扰Vuex存储实例 - 一个示例是使用`vuex-router-sync`包
* 配置库的各个方面 - 一个示例是用一个基本的URL创建Axios的实例；然后你可以把它注入Vue原型和/或导出它(所以你可以从你的应用程序的任何其他地方导入该实例)

### 不需要使用引导文件的示例
*对于像Lodash这样的普通JavaScript库，在使用前不需要任何初始化。例如，Lodash，只有当你想用它来注入Vue原型时，作为一个引导文件使用才有意义，比如可以在你的Vue文件中使用`this.$_`。

## 启动文件的用法
第一步是使用Quasar CLI生成一个新的启动文件。

```bash
$ quasar new boot <name> [--format ts]
```

其中`<name>`应该用一个合适的名字来代替你的引导文件。

这个命令创建了一个新的文件。`/src/boot/<name>.js`，内容如下。

```js
// 在此输入一些东西

// "async "是可选的!
// 不需要的时候就去掉它
export default async ({ /* app, router, store */ }) => {
  // 有事可做
}
```

你也可以返回一个Promise。

```js
// 在此输入一些东西

export default ({ /* app, router, store */ }) => {
  return new Promise((resolve, reject) => {
    // 做点什么
  })
}
```

::: tip
如果你不需要的话，默认导出可以不在启动文件中出现。这些是你不需要访问 "应用程序"、"路由器"、"商店 "等的情况。
:::

现在你可以根据你的引导文件的预期用途在该文件中添加内容。

> 不要忘记你的默认导出需要是一个函数。
> 然而，你可以有任意多的命名导出，如果引导文件为以后的使用暴露了一些东西。在这种情况下，你可以在你的应用程序中的任何地方导入任何这些命名的导出。

最后一步是告诉Quasar使用你的新引导文件。要做到这一点，你需要在`/quasar.conf.js`中添加这个文件

```js
boot: [
  // 参考 /src/boot/<name>.js
  '<name>'
]
```

当建立一个SSR应用程序时，你可能希望一些启动文件只在服务器上或只在客户端运行，在这种情况下，你可以像下面这样做。

```js
boot: [
  {
    server: false, // run on client-side only!
    path: '<name>' // references /src/boot/<name>.js
  },
  {
    client: false, // run on server-side only!
    path: '<name>' // references /src/boot/<name>.js
  }
]
```

如果你想从node_modules中指定启动文件，你可以通过在路径前加上`~`(tilde)字符来实现。

```js
boot: [
  // 从一个npm包中启动文件
  '~my-npm-package/some/file'
]
```

如果你想让一个引导文件只为特定的构建类型注入到你的应用程序中。

```js
boot: [
  ctx.mode.electron ? 'some-file' : ''
]
```

### 重定向到另一个页面

::: warning
在重定向时请注意，因为你可能会配置应用程序进入无限重定向循环。
:::

```js
export default ({ urlPath, redirect }) => {
  // ...
  const isAuthorized = // ...
  if (!isAuthorized && !urlPath.startsWith('/login')) {
    redirect({ path: '/login' })
    return
  }
  // ...
}
```

`redirect()`方法接受一个字符串(完整的URL)或一个Vue Router的位置字符串或对象。在SSR上，它可以接受第二个参数，它应该是一个数字，用于重定向浏览器的任何HTTP STATUS代码(3xx代码)。

```js
// 带有Vue Router位置的redirect()的示例。
redirect('/1') // Vue Router location as String
redirect({ path: '/1' }) // Vue Router location as Object

// 用一个URL重定向()的示例。
redirect('https://quasar.dev')
```

::: warning IMPORTANT!
The Vue Router location (in String or Object form) does not refer to URL path (and hash), but to the actual Vue Router routes that you have defined.
So **don't add the publicPath** to it and if you're using the Vue Router hash mode then don't add the hash to it.

<br>Let's say that we have this Vue Router route defined:<br><br>

```js
{
  path: '/one',
  component: PageOne
}
```

<br>Then **regardless of our publicPath** we can call `redirect()` like this:<br><br>

```js
// publicPath: /wiki; vueRouterMode: history
redirect('/one') // good way
redirect({ path: '/one' }) // good way
redirect('/wiki/one') // WRONG!

// publicPath: /wiki; vueRouterMode: hash
redirect('/one') // good way
redirect({ path: '/one' }) // good way
redirect('/wiki/#/one') // WRONG!

// no publicPath; vueRouterMode: hash
redirect('/one') // good way
redirect({ path: '/one' }) // good way
redirect('/#/one') // WRONG!
```
:::

正如在前面的章节中提到的，默认的引导文件的输出可以返回一个Promise。如果这个Promise被一个包含 "url "属性的对象拒绝，那么Quasar CLI将把用户重定向到那个URL。

```js
export default ({ urlPath }) => {
  return new Promise((resolve, reject) => {
    // ...
    const isAuthorized = // ...
    if (!isAuthorized && !urlPath.startsWith('/login')) {
      // 这里的 "url "参数是同一类型的
      // 至于上面的 "重定向 "问题
      reject({ url: '/login' })
      return
    }
    // ...
  })
}
```

或一个更简单的等价物。

```js
export default () => {
  // ...
  const isAuthorized = // ...
  if (!isAuthorized && !urlPath.startsWith('/login')) {
    return Promise.reject({ url: '/login' })
  }
  // ...
}
```

### Quasar应用程序流程
为了更好地理解启动文件的工作原理和作用，你需要了解你的网站/应用程序是如何启动的。

1. Quasar被初始化(组件、指令、插件、Quasar i18n、Quasar图标集)
2. 2.Quasar额外功能被导入(Roboto字体--如果使用的话，图标，动画，...)。
3. Quasar CSS和你的应用程序的全局CSS被导入。
4. App.vue被加载(尚未使用)。
5. 商店被导入(如果在 src/store 中使用 Vuex 商店)。
6. 路由器已被导入(在 src/router 中)。
7. 导入启动文件
8. 路由器默认导出功能被执行
9. 引导文件得到其默认导出功能的执行
10. (如果在Electron模式下)Electron被导入并注入到Vue原型中。
11. (如果在Cordova模式下)监听 "deviceready "事件，然后才继续以下步骤
12. 用根组件实例化Vue，并将其附加到DOM上

## 启动文件的示例

### Axios

```js
import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(({ app }) => {
  // 通过this.$axios和this.$api在Vue文件中使用(选项式 API)。

  app.config.globalProperties.$axios = axios
  // ^ ^ 这将允许你使用this.$axios(用于Vue Options API形式)。
  //       所以你不一定要在每个vue文件中导入axios。

  app.config.globalProperties.$api = api
  // ^ ^ 这将允许你使用this.$api(用于Vue选项式 API形式)。
  //       所以你可以轻松地对你的应用程序的API执行请求
})

export { axios, api }
```

### vue-i18n

```js
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

export default ({ app }) => {
  // 创建I18n实例
  const i18n = createI18n({
    locale: 'en-US',
    messages
  })

  // 告诉应用程序使用I18n实例
  app.use(i18n)
}
```

### 路由器认证
一些启动文件可能需要干扰Vue Router的配置。

```js
export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // 现在你需要在这里添加你的认证逻辑，比如调用一个API端点
  })
})
```

## 从引导文件中访问数据
有时你想在你不能访问根Vue实例的文件中访问你在引导文件中配置的数据。

幸运的是，因为引导文件只是普通的JavaScript文件，你可以在你的引导文件中添加任意多的命名导出。

让我们以Axios为例。有时你想在你的JavaScript文件中访问你的Axios实例，但你不能访问根Vue实例。为了解决这个问题，你可以在你的启动文件中导出Axios实例，并将其导入其他地方。

考虑下面这个axios的引导文件。

```js
// axios启动文件(src/boot/axios.js)。

import axios from 'axios'

// 我们创建自己的axios实例并设置一个自定义的基本URL。
// 注意，如果我们不在这里设置任何配置，我们就不需要
// 一个命名的导出，因为我们可以直接 "从'axios'导入axios"。
const api = axios.create({
  baseURL: 'https://api.example.com'
})

// 通过this.$axios和this.$api在Vue文件中使用。
// (仅在Vue Options API形式下)
export default ({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
}

// 在这里，我们定义了一个命名的出口
// 我们以后可以在.js文件中使用。
export { axios, api }
```

在任何JavaScript文件中，你都能像这样导入axios实例。

```js
// 我们从src/boot/axios.js中导入其中一个命名的导出项
import { api } from 'boot/axios'
```

关于语法的进一步阅读。[ES6 import](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import), [ES6 export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export).
