---
title: 预取功能
desc: 如何在Quasar应用中预取数据并初始化你的Vuex商店，验证路由并重定向到另一个页面。
related:
  - /quasar-cli/quasar-conf-js
---

PreFetch是一项功能(**只在使用Quasar CLI时可用)，它允许Vue Router(定义在`/src/router/routes.js`)拾取的组件。

* 预先获取数据
* 验证路由
* 当某些条件不满足时(如用户没有登录)，重定向到另一个路由。
*可以帮助初始化商店的状态

所有上述内容将在实际路由组件呈现之前运行。

**它被设计用于所有Quasar模式**(SPA、PWA、SSR、Cordova、Electron)，但它对SSR的构建特别有用。

## 安装

```js
// quasar.conf.js
return {
  preFetch: true
}
```

::: warning
当你使用它来预取数据时，你需要使用Vuex存储，所以当你创建项目时，请确保你的项目文件夹中有`/src/store`文件夹，否则就生成一个新项目，并将store文件夹内容复制到你当前的项目中。
:::

## PreFetch如何帮助SSR模式
这个功能对SSR模式特别有用(但不只限于此)。在SSR期间，我们基本上是在渲染我们的应用程序的 "快照"，所以如果应用程序依赖于一些异步数据，**那么这些数据需要在我们开始渲染过程之前被预取和解决**。

另一个问题是，在客户端，同样的数据需要在我们挂载客户端应用程序之前可用--否则，客户端应用程序将使用不同的状态进行渲染，水合就会失败。

为了解决这个问题，获取的数据需要存在于视图组件之外，在一个专门的数据存储或 "状态容器 "中。在服务器上，我们可以在渲染前预取并将数据填充到存储中。在我们加载应用程序之前，客户端的存储将直接获取服务器的状态。

## 当PreFetch被激活时
`preFetch`钩子(在接下来的章节中描述)是由访问的路由决定的--这也决定了哪些组件被渲染。事实上，一个给定的路由所需要的数据也是在该路由渲染的组件所需要的数据。**所以很自然地(也是必须的)将钩子逻辑只放在路由组件内。**这包括`/src/App.vue`，在这种情况下，它只在应用程序启动时运行一次。

让我们举个示例，以了解钩子何时被调用。假设我们有这些路由，并且我们为所有这些组件写了`preFetch`钩子。

```js
// 航线
[
  {
    path: '/',
    component: LandingPage
  },
  {
    path: '/shop',
    component: ShopLayout,
    children: [
      {
        path: 'all',
        component: ShopAll
      },
      {
        path: 'new',
        component: ShopNew
      },
      {
        path: 'product/:name',
        component: ShopProduct,
        children: [{
          path: 'overview',
          component: ShopProductOverview
        }]
      }
    ]
  }
]
```

现在，让我们看看当用户按照下面指定的顺序访问这些路线时，钩子是如何被调用的，一个接一个。

| 被访问的路线 | 钩子被调用的情况 | 观察结果 |
| --- | --- | --- |
| `/` | App.vue then LandingPage | App.vue钩子从我们的应用启动后就被调用了。|
| `/shop/all` | ShopLayout then ShopAll | - - |
| `/shop/new` | ShopNew | ShopNew是ShopLayout的一个子节点，而ShopLayout已经被渲染了，所以ShopLayout不会被再次调用。|
| `/shop/product/pyjamas` | ShopProduct | - |
| `/shop/product/shoes` | ShopProduct | Quasar注意到同一个组件已经被渲染了，但是路由已经被更新，而且它有路由参数，所以它再次调用钩子。|
| `/shop/product/shoes/overview` | ShopProduct then ShopProductOverview | ShopProduct有路由参数，所以它被调用，尽管它已经被渲染了。|
| `/` | LandingPage | - |

## 使用方法
这个钩子被定义为我们路由组件上的一个自定义静态函数，叫做`preFetch`。注意，因为这个函数将在组件实例化之前被调用，所以它不能访问`this`。

```html
<!-- some .vue component used as route -->
<template>
  <div>{{ item.title }}</div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  // 我们的钩子在这里
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    // 获取数据，验证路线，并可选择重定向到其他路线...

    // ssrContext只在SSR模式下的服务器端可用。

    // 这里没有访问 "这个 "的权限

    // 如果你正在运行一个异步作业，返回一个Promise。
    // 示例。
    return store.dispatch('fetchItem', currentRoute.params.id)
  },

  setup () {
    const $store = useStore()

    // 从商店状态显示项目。
    const item = computed(() => $store.state.items[this.$route.params.id])

    return { item }
  }
}
</script>
```

如果你使用的是`<script setup>`，那么就在它之外添加一个`<script>`部分，它只是用preFetch()方法返回一个对象。

```html
<script>
export default {
  preFetch () {
    console.log('running preFetch')
  }
}
</script>


<script setup>....</script>
```

::: tip
如果你正在开发一个SSR应用程序，那么你可以看看[ssrContext](/quasar-cli/developing-ssr/ssr-context)对象，它被提供到服务器端。
:::

```js
// 相关的行动为承诺的示例
// ...

actions: {
  fetchItem ({ commit }, id) {
    return axiosInstance.get(url, id).then(({ data }) => {
      commit('mutation', data)
    })
  }
}

// ...
```

### 重定向实例
下面是一个在某些情况下重定向用户的示例，比如当他们试图访问一个只有通过认证的用户才能看到的页面时。

```js
// 我们在这里假设我们已经写了认证逻辑
// 在Vuex商店中，所以只作为一个高层次的示例。
preFetch ({ store, redirect }) {
  if (!store.state.authenticated) {
    redirect({ path: '/login' })
  }
}
```

如果`redirect(false)`被调用(只在客户端支持！)，它将中止当前的路线导航。请注意，如果你在`src/App.vue`中这样使用它，它将停止应用程序的启动，这是不可取的。

`redirect()`方法需要一个Vue Router位置对象。

### 使用preFetch来初始化商店
`preFetch`钩子只运行一次，当应用程序启动时，所以你可以利用这个机会来初始化Vuex商店。

```js
// 呼叫中心
export default {
  // ...
  preFetch ({ store }) {
    // 在这里初始化存储的东西
  }
}
```

### 商店代码拆分
在一个大型的应用程序中，你的Vuex商店可能会被分割成多个模块。当然，也可以将这些模块的代码分割成相应的路由组件块。假设我们有以下的商店模块。

```js
// src/store/foo.js
// 我们已经把所有的东西都合并到一个文件里。
// 一个初始化的Quasar项目将Vuex模块的每一个组件分割开来
// 到不同的文件中，但为了这个示例的目的
// 在文档中，我们把这个模块显示为一个单独的文件

export default {
  namespaced: true,
  // 重要的是：状态必须是一个函数，这样模块就可以
  // 多次实例化
  state: () => ({
    count: 0
  }),
  actions: {
    inc: ({ commit }) => commit('inc')
  },
  mutations: {
    inc: state => state.count++
  }
}
```

现在，我们可以使用`store.registerModule()`在路由组件的`preFetch()`钩中懒散地注册这个模块。

```html
// 在一个路由组件内
<template>
  <div>{{ fooCount }}</div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, onUnmounted } from 'vue'

// 在这里导入模块，而不是在`src/store/index.js`中。
import fooStoreModule from 'store/foo'

export default {
  preFetch ({ store }) {
    store.registerModule('foo', fooStoreModule)
    return store.dispatch('foo/inc')
  },

  setup () {
    const $store = useStore()

    onMounted(() => {
      // 如果是从服务器上注入的，则保留之前的状态
      $store.registerModule('foo', fooStoreModule, { preserveState: true })
    })

    onUnmounted(() => {
      // 重要提示：避免在客户端重复注册模块。
      // 当路线被多次访问时。
      $store.unregisterModule('foo')
    })

    const fooCount = computed(() => {
      return $store.state.foo.count
    })

    return {
      fooCount
    }
  }
}
</script>
```

还要注意的是，由于该模块现在是路由组件的一个依赖项，它将被Webpack移到路由组件的异步块中。

::: warning
不要忘记为`registerModule`使用`preserveState: true`选项，这样我们就可以保留服务器注入的状态。
:::

### 使用TypeScript的用法

你可以使用`preFetch`帮助器来提示存储参数的类型(否则会有一个`any`类型)。

```js
import { preFetch } from 'quasar/wrappers'
import { Store } from 'vuex'

interface StateInterface {
  // ...
}

export default {
  preFetch: preFetch<StateInterface>(({ store }) => {
    // 对你新输入的商店参数做一些事情
  }),
}
```

::: tip
这只对键入`store`参数有用，其他参数即使在使用普通语法时也会自动键入。
:::

## 加载状态
一个好的用户体验包括在用户等待页面准备好的时候，通知他/她有东西正在后台处理。Quasar CLI为此提供了两个开箱即用的选项。

### LoadingBar
当你把Quasar [LoadingBar](/quasar-plugins/loading-bar)插件添加到你的应用程序中时，Quasar CLI将在运行preFetch钩子时默认使用它。

### 加载
也有可能使用Quasar [Loading](/quasar-plugins/loading)插件。下面是一个示例：

```js
// 路径.vue组件
import { Loading } from 'quasar'

export default {
  // ...
  preFetch ({ /* ... */ }) {
    Loading.show()

    return new Promise(resolve => {
      // 在这里做一些异步的事情
      // 然后调用 "resolve()"
    }).then(() => {
      Loading.hide()
    })
  }
}
```
