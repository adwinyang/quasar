---
title: 编写通用代码
desc: 关于如何为 Quasar 服务器端渲染应用程序编写代码的指南。
---

编写 "通用 "代码(也称为 "同构")意味着编写在服务器和客户端都能运行的代码。由于使用情况和平台API的不同，我们的代码在不同环境下运行时的行为不会完全相同。这里我们将介绍一下你需要注意的关键事项。

! [Quasar SSR Build System](https://cdn.quasar.dev/img/ssr-build.png "Quasar SSR Build System")

## 服务器上的数据反应性
在一个纯客户端的应用中，每个用户都会在他们的浏览器中使用一个新的应用实例。对于服务器端的渲染，我们也希望如此：每个请求都应该有一个新鲜的、孤立的应用程序实例，这样就不会有跨请求的状态污染。

因为实际的渲染过程需要确定性，我们也将在服务器上 "预取 "数据--这意味着当我们开始渲染时，我们的应用状态已经被解决。这意味着数据反应性在服务器上是不必要的，所以它在默认情况下是禁用的。禁用数据反应性也避免了将数据转换为反应性对象的性能成本。

## 组件生命周期钩子
由于没有动态更新，在所有的Vue生命周期钩子中，只有`beforeCreate`和`created`会在SSR期间被调用。这意味着其他生命周期钩子里面的任何代码，如`beforeMount`或`mounted`将只在客户端执行。

另外需要注意的是，你应该避免在`beforeCreate`和`created`中产生全局副作用的代码，例如用`setInterval`设置计时器。在只有客户端的代码中，我们可以设置一个定时器，然后在`beforeUnmount`或`destroyed`中拆掉它。然而，由于销毁钩子不会在SSR期间被调用，定时器将永远留在身边。为了避免这种情况，把你的副作用代码移到`beforeMount`或`mounted`中去。

## 避免有状态的单例
在编写纯客户端代码时，我们已经习惯了每次都在一个新的上下文中评估我们的代码。然而，Node.js服务器是一个长期运行的进程。当我们的代码被要求进入进程时，它将被评估一次，然后它将留在内存中。这意味着如果你创建了一个单例对象，它将在每个传入的请求中被共享。

因此， Quasar CLI 为每个请求创建一个新的根Vue实例，并有一个新的Router和Vuex Store实例。这类似于每个用户将在自己的浏览器中使用一个新的应用实例。如果我们在多个请求中使用一个共享实例，将很容易导致跨请求的状态污染。

与其直接创建Router和Vuex Store实例，你将暴露一个工厂函数，可以重复执行，为每个请求创建新鲜的应用程序实例。

```js
// src/router/index.js
export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({...})
  return Router
}
```

```js
// src/store/index.js
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({...})
  return Store
}
```

如果你使用[Vuex modules](https://vuex.vuejs.org/guide/modules.html)，别忘了将状态导出为一个函数，否则将创建一个单例。
```js
// src/store/myModule/state.js
export default () => ({
  ...
})

```

## 访问特定平台的API
通用代码不能假定对特定平台API的访问，所以如果你的代码直接使用浏览器专用的globals，如`window`或`document`，它们在Node.js中执行时将会出现错误，反之亦然。

对于在服务器和客户端之间共享但使用不同平台API的任务，建议将特定平台的实现封装在一个通用API中，或者使用为你做这件事的库。例如，[Axios](https://github.com/axios/axios)是一个HTTP客户端，为服务器和客户端暴露了相同的API。

对于仅适用于浏览器的API，常见的方法是在仅适用于客户端的生命周期钩子中懒散地访问它们。

## 启动文件
请注意，如果第三方库的编写没有考虑到通用性，那么将其集成到服务器渲染的应用中可能会很麻烦。你可能*能够通过模拟一些球状物来让它工作，但这是很困难的，而且可能会干扰到其他库的环境检测代码。

当你把第三方库添加到你的项目中时(通过[Boot File](/quasar-cli/boot-files) )，要考虑到它是否可以在服务器和客户端上运行。如果它需要只在服务器上运行或只在客户端运行，那么请在quasar.conf.js中指定：

```js
// quasar.conf.js
return {
  // ...
  boot: [
    'some-boot-file', // runs on both server & client
    { path: 'some-other', server: false } // this boot file gets embedded only on client-side
    { path: 'third', client: false } // this boot file gets embedded only on server-side
  ]
}
```

## 数据预取和状态
在SSR过程中，我们基本上是在渲染我们的应用程序的 "快照"，所以如果应用程序依赖于一些异步数据，这些数据需要在我们开始渲染过程之前被预取和解决。

Quasar CLI [PreFetch Feature](/quasar-cli/prefetch-feature)就是为了解决这个问题。花点时间来阅读一下。

<q-separator class="q-mt-xl" />

> 本页部分内容摘自官方[Vue.js SSR指南](https://ssr.vuejs.org/guide/universal.html#data-reactivity-on-the-server)。
