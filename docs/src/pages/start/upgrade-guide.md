---
title: 升级指南
desc: 如何将 Quasar 从旧版本升级到最新版本。
components:
  - upgrade-guide/UpgradeVideoLink
---

::: danger Quasar UI v2
*为了支持Node 13+(以及许多其他好处)，我们已经**将Webpack从v4升级到v5**。你可能需要相应地升级你安装的webpack插件。
* 没有对IE11的支持，因为Vue 3也不(也不会)支持它。
* 可能有一些应用扩展尚未移植到Vue 3和Quasar v2。
:::

::: tip Composition and Options API
你会注意到，我们所有的文档实例都是使用Vue 3的Composition API。这并不意味着你不能使用传统的Options API。恰恰相反，维护Options API实际上会在你的升级道路上帮助你，让你更轻松。在升级完成后，我们确实建议切换到Composition API，但绝不是要求你这样做。
:::

### 视频指南

<q-badge align="top" color="brand-primary" label="New" />

点击下面的海报将打开一个Youtube播放列表，介绍将 Quasar CLI 项目从Quasar v1升级到Quasar v2的过程。 随着Quasar v2的进展，它可能会变得不同步，但它可能有助于你开始。

<upgrade-video-link />

## 旧的v2到最新的v2

### 使用UMD
只需将所有引用 Quasar 的CSS和JS标签中的版本字符串替换为较新的版本。

### 使用Quasar CLI

```bash
# 在 Quasar UI v2 项目
# 里面运行这些命令

# check for upgradable packages
$ quasar upgrade

# 进行实际升级
$ quasar upgrade --install
```

::: warning 代码编辑器终端注意事项
如果你使用的是代码编辑器终端，而不是外部终端，并且你运行`quasar upgrade'并得到错误 *Command not found* 或 *@quasar/cli* 版本似乎是 *undefined*，你将需要进入你的代码编辑器终端的设置，取消勾选选项(或其等价物) *Add 'node_modules/.bin' from the project root to %PATH%*，然后重新启动你的代码编辑器。
:::

### 使用Quasar Vite插件

```bash
$ yarn upgrade quasar
```

另外，你可能还想确保你有最新的`@quasar/vit-plugin`包。

强烈建议你也保持`@quasar/extras`软件包的更新。

```bash
# optional, but recommended
$ yarn add @quasar/extras@latest
```

### 使用Vue CLI

```bash
$ yarn upgrade quasar
```

另外，你可能还想确保你有最新的`vue-cli-plugin-quasar`包。

强烈建议你把`@quasar/extras`包也保持在最新状态。

```bash
# optional, but recommended
$ yarn add @quasar/extras@latest
```

## 从v1迁移到v2

**本指南指的是 Quasar CLI 和UMD项目**，但这里的信息也可以用于Vue CLI。对于已经在项目中使用Vue CLI的开发者，你可以查看如何安装[vue-cli-plugin-quasar](/start/vue-cli-plugin) 包，它可以与Quasar v2一起使用。 你还需要对你的main.js做一些修改。 js(同时升级你的Vue CLI项目以支持Vue 3)(目前最好的方法是为Vue 3生成一个新的Vue CLI项目，然后按照vue-cli-plugin的[安装步骤](/start/vue-cli-plugin#add-vue-cli-quasar-plugin) 进行安装，检查该/src文件夹发生的变化，然后对你目前的Vue CLI项目应用同样的原则)。

### 介绍

我们做了大量的工作，所以从Quasar v1到v2的过渡是尽可能的无痛。不要因为这个页面的长度而感到害怕，因为它并没有反映出你需要为升级你的应用程序到Quasar v2所付出的努力(我们只是试图让它尽可能的完整)。Quasar组件、指令和插件的API有细微的变化，但我们把破坏性的变化控制在最低限度。我们还为一些组件添加了一些新的很酷的功能。

Quasar UI v2是基于Vue 3的，而之前的版本是基于Vue 2的。这意味着你的应用程序代码(Vue组件、指令等)也应该符合Vue 3，而不仅仅是Quasar UI的源代码。如果你在你的应用程序中使用其他库，请确保你使用的是Vue 3版本。

Quasar UI v2不仅仅是对Vue 3和Composition API的移植。__在 Quasar 的算法中也有很多显著的性能提升！__你会喜欢它的

::: warning 重点!
* 不支持IE11 - Vue 3也不支持IE11。如果您的项目必须支持IE11，那么请继续使用Quasar UI v1。
* 为了支持Node 13+(以及其他许多好处)，我们已经**将Webpack从v4升级到v5**。你可能需要相应地升级你的webpack插件。
* Quasar Stylus变量不再可用(只有Sass/SCSS)。但这并不意味着你不能再使用Stylus。
* 并非所有的官方应用扩展都与Quasar UI v2兼容，我们正在努力为它们发布新的兼容版本。
* Node v10已经达到了它的生命末期，所以对它的支持已经被放弃。请务必更新Node(至少更新到v12.22.1)和npm/yarn，以适应新的版本，其中包括对最新安全问题的修复。这个Node版本还包括对ESM模块的支持，这将有助于我们在Quasar v2的生命周期内进一步实现 Quasar 代码库的现代化，而不会出现破坏性的变化。
:::

在你开始这个将你的项目从v1升级到v2的旅程之前，你应该知道一些额外的事情。
1) 在 Discord 服务器或论坛上提问之前，先阅读文档。
2) 准备好CodePen，如果你认为你发现了一个问题，工作人员可以帮助你。
3) 深入研究[Quasar源代码](https://github.com/quasarframework/quasar/tree/dev) (它将帮助你理解框架，并教你使用Vue编程的最佳实践)。
4) 除非有必要，否则不要使用框架组件作为混杂物(如果需要的话，请将它们封装起来)。
5)除非绝对必要，不要用CSS选择器来定位内部组件的东西。
6) 我们尽可能地推荐`yarn`，因为它的速度和使用效率。然而，当使用globals时，我们仍然建议使用`npm`，特别是当你使用`nvm`(Node版本管理器)时。
7) 使用`git`进行版本库管理，并定期提交，这就像在过程中做笔记一样，让你在遇到困难时恢复到以前的状态。
8) 使用 Quasar 启动文件，用于任何预挂载的应用程序例程。
9) 最后，成为[支持者/赞助者](https://donate.quasar.dev) ，可以进入特殊的Discord支持聊天室，获得优先支持。这也有助于项目的生存。

如果你被卡住了，请查看论坛或访问我们的Discord服务器，以获得帮助，这不仅来自工作人员，也来自社区。

::: warning 信息
应该指出的是，我们已经尽最大努力确保升级文件中的所有内容都是正确的。然而，由于这是一个手工过程，很可能存在错误。如果你发现了任何错误，不要害怕做一个PR，并提出修改意见来进行纠正。
:::



### 初始步骤

你有两条路可以走。它们描述如下。选择最适合你需要的途径。然而，我们推荐第一个选项。

#### 选项1：转换一个项目

::: danger 重点!
本指南假设你目前正在使用`@quasar/app` v2项目。
:::

在开始之前，强烈建议复制你当前的工作项目或用git创建一个新的分支。

1) **与Stylus有关的**。你在使用Stylus和Quasar Stylus的变量吗？那么在做任何事情之前，请将所有这些文件转换为Sass/SCSS(包括 src/css/app.styl -> src/css/app.sass 或 app.scss)。如果你仍然想在你的项目中使用Stylus(没有Quasar Stylus变量)，那么你还需要安装Stylus相关的软件包(这些软件包不再由"@quasar/app"开箱提供)。
```bash
# 只有当你仍然想使用Stylus时(但没有Quasar Stylus变量)
$ yarn add --dev stylus stylus-loader
```
2) **升级** Node至少到12.22.1版本，npm至少到6.14.12版本，yarn至少到1.17.3版本。
```bash
# 如果你已经在使用lts/erbium版本(例如12.14.0)，请注意它的版本，它应该被列在"lts/erbium"行中
$ nvm list

# 如果你在Linux上使用`nvm`帮助器(https://github.com/nvm-sh/nvm)
$ nvm install 12.22.1 && nvm alias default lts/erbium && nvm use default
# 如果你在Windows上使用`nvm`帮助器(https://github.com/coreybutler/nvm-windows)
$ nvm install 12.22.1 && nvm use 12.22.1

# 卸载以前的"lts/erbium"版本，我们假设在我们的示例中已经安装了 12.14.0
nvm卸载12.14.0
```
3) **删除**文件夹`.quasar`、`node_modules`和`package-lock.json`或`yarn.lock`文件。这通常是不需要的，但在某些情况下，为了本指南的目的，它将避免yarn/npm升级软件包的麻烦。
4) **安装**。`@quasar/app` v3和`quasar` v2软件包。
```bash
$ yarn add --dev @quasar/app@3
$ yarn add quasar@2
```
5) **删除** `.quasar`和`node_modules`文件夹，以及`package-lock.json`/`yarn.lock`文件，然后运行`npm install`/`yarn install`来重新生成锁文件。这将强制升级整个依赖关系图(包括深度依赖)，并避免不匹配的软件包的麻烦，特别是webpack 5相关的软件包。
6) 如果你正在使用ESLint，那么编辑`/.eslintrc.js`。
 ```js
  // 老方法
  parserOptions: {
    parser: 'babel-eslint
  },
  extends: [
    'plugin:vue/essential' // 或等同于
  ]

  // 新方式
  parserOptions: {
    parser: '@babel/eslint-parser'.
  },
  extends: [
    'plugin:vue/vue3-essential' // 或等同于
  ]
  ```

  同时升级ESLint deps。例如：

  ```js
 "@babel/eslint-parser":"^7.0.0", // 取代 babel-eslint !
 "eslint":"^7.14.0",
 "eslint-config-standard":"^16.0.2",
 "eslint-plugin-import":"^2.19.1",
 "eslint-plugin-node":"^11.0.0",
 "eslint-plugin-promise":"^5.1.0",
 "eslint-plugin-quasar":"^1.0.0",
 "eslint-plugin-vue":"^7.0.0",
 "eslint-webpack-plugin":"^2.4.0"
```
7) 如果你使用Vuex，你将需要手动安装它：
  ```bash
  $ yarn add vuex@4
  # 或者
  $ npm install vuex@4
  ```

8) 编辑quasar.conf.js > framework > lang。它将在本页面的"Quasar 语言包" 部分进行解释。
  ```js
  // 老方法
  framework: {
    lang: 'en-us
  }

  // 新方法
  framework: {
    lang: 'en-US
  }
```
9) 检查你所有手动安装的webpack插件是否与Webpack 5兼容(绝大部分应该已经兼容)。同时更新quasar.conf.js > [devServer config](/quasar-cli/quasar-conf-js#property-devserver) 以匹配[webpack-dev-server v4](https://github.com/webpack/webpack-dev-server) 。
10) 按照指南的其余部分进行。你需要适应新版本的Vue 3、Vue Router 4、Vuex 4、Vue-i18n 9和你正在使用的任何其他vue插件的突破性变化。
11) 升级你的其他项目依赖(特别是ESLint相关的)。

#### 选项2：创建一个项目

第二个选项是创建一个新的项目，然后一点一点地移植到它。我们认为这个方案是最坏的情况(你遇到的是Vue 3和Vue Router v4的问题，而不是 Quasar 本身的问题)，我们只是为了本指南的完整性而提到它。

你可以生成一个新的Quasar v2项目，如下图所示，然后你就可以把你的应用程序移植到它上面。

```bash
# Quasar UI v2 project
$ quasar create <folder_name>
```

### Webpack v5

为了支持Node 13+(以及其他许多好处)，我们已经将Webpack从v4升级到v5**。你可能需要相应地升级你的Webpack插件。

#### Nodejs polyfills
Webpack v5删除了用于网络客户端构建的 Nodejs polyfills。如果你在网络客户端使用依赖Nodejs API的包(它们不应该这样做！)，你会得到一些包丢失的错误提示。例如：缓冲区"、"加密"、"os"、"路径"。

这些需要由包的所有者来解决。但是如果你不想等待，只想运行你的应用程序/网站(有一点风险)，那么你可以手动安装[node-polyfill-webpack-plugin](https://www.npmjs.com/package/node-polyfill-webpack-plugin) (`yarn add --dev node-polyfill-webpack-plugin`)，然后在quasar.conf.js > build > chainWebpack中引用它。例如：

```
// quasar.conf.js
build: {
  chainWebpack (chain) {
    const nodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')
    chain.plugin('node-polyfill').use(nodePolyfillWebpackPlugin)
  }
}
```

#### Webpack devserver
作为升级到Webpack 5的一部分， Quasar CLI 现在提供了[webpack-dev-server v4](https://github.com/webpack/webpack-dev-server) 和[webpack-dev-middleware v4](https://github.com/webpack/webpack-dev-middleware) ，它们都带有各自的突破性变化。这影响了 quasar.conf.js > devServer 选项。下面是一些最常用的属性

|属性名称 | 类型 | 描述 |
| --- | --- | --- |
| devMiddleware | Object | 提供给webpack-dev-middleware v4的配置 |
| https | Boolean/Object | 与之前的webpack 4相同 |
| onBeforeSetupMiddleware | Function | 替换"before" |
| onAfterSetupMiddleware | Function | 替换"after" |
| proxy | Object/Array | 与之前的webpack 4相同 |

::: tip
如果你修改了 quasar.conf.js > [devServer](/quasar-cli/quasar-conf-js#property-devserver) ，那么你可能会对 webpack-dev-server v4 提出的所有突破性变化清单感兴趣：[发布说明](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md) 。检查是否有适用于你的。
:::

#### webpack-chain

::: warning
在写这几行字的时候，[webpack-chain](https://github.com/neutrinojs/webpack-chain) 还没有被更新为完全支持Webpack 5。这对所有 quasar.conf.js > chainWebpack{...} 方法都有影响。虽然这些方法仍然可以使用，但Webpack 5中引入的较新的配置部分(目前)还不能使用。对于这些部分，应该使用`extendWebpack*`方法，直到 webpack-chain 完全兼容 Webpack 5。
:::

### App.vue

你需要编辑 src/App.vue 并删除包装器`<div id="q-app">`。你不再需要(也不应该)它了。

```html
<!-- 老的方式 -->
<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<!-- 新的方式 -->
<template>
  <router-view />
</template>
```

### Vue 3

::: tip
对于 Quasar CLI 项目，你不需要手动安装/升级`vue`包，因为"@quasar/app" v3已经为你提供了正确版本的Vue。
:::

由于你也将切换到[Vue 3](https://v3.vuejs.org) ，你最好在读完本迁移指南后**看看其[迁移指南](https://v3.vuejs.org/guide/migration/introduction.html) 。

如果你使用.vue文件，你很可能会有一个相当容易的过渡，因为 1)vue-loader(由`@quasar/app`提供)是解析[SFC语法](https://v3.vuejs.org/guide/single-file-component.html) 和指示Vue 3做什么的人，2) 你仍然可以使用选项式 API(尽管我们建议你转换到更新更好的[组合式 API](https://v3.vuejs.org/guide/composition-api-introduction.html) )。

我们建议你首先将你的项目转换到Quasar v2，同时保留Options API(因为你的组件已经是选择式 API的形式，你可能想先确保一切正常)。在这个过渡期之后，你可以将你所有的Vue组件转换为组合式 API，但这绝不是一个要求。

伴随着Vue3，有一个新的主要版本[Vue Router v4](https://next.router.vuejs.org) ，它有自己的[中断性变化](https://next.router.vuejs.org/guide/migration/) ，你应该注意到。还有新的[Vuex v4](https://vuex.vuejs.org/) 也是如此。

#### Vue 3 中断性变化的示例

在处理 Vue 3 时，最重要的突破性变化之一是v-model的工作方式。它现在是`model-value`+`@update:model-value`组合的别名，而不是`value`+`@input`。这对所有使用v-model的 Quasar 组件都有影响。如果你在.vue文件中编写你的组件，那么你不需要担心这个问题，因为vue-loader会正确地为你翻译它。

此外，如果你从你的Vue组件中发出自定义事件，你将需要明确地指定它们，如下所示：

```html
<script>
// 你的Vue组件。
// 让我们假设我们发出了'ok'和'myEvent'事件
// 从这个组件

export default {
  // ...
  emits: [ 'ok', 'myEvent' ],
  // ...
}
</script>
```

### Vue.js Devtools
如果你想在Vue 3中使用Vue.js Devtools，你需要用[v6的](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg) 来替换你当前的浏览器扩展。

### Vue Router v4

::: tip
对于 Quasar CLI 项目，你不需要手动安装/升级`vue-router`包，因为"@quasar/app" v3已经为你提供了正确版本的Vue Router。
:::

这是一个Vue 3生态系统上游的中断性变化。更新 src/router 文件以匹配 Vue Router v4 的 API。Vue Router v4有它自己的[中断性变化](https://next.router.vuejs.org/guide/migration/index.html) 。特别注意下面我们是如何处理404错误的。

```js
// 默认 src/router/index.js 内容：

import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // 保持原样，在quasar.conf.js中进行修改。
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  return Router
}
```

```js
// 默认的src/router/routes.js内容。
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  // 始终将此作为最后一项。
  // 但你也可以删除它
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
```

如果你使用TypeScript，你必须用`RouteRecordRaw`替换`RouteConfig`接口的出现。

### Vuex v4

你需要做的第一步是，你需要手动安装Vuex到你的应用程序。

```bash
$ yarn add vuex@4
# or:
$ npm install vuex@4
```

这是一个Vue 3生态系统上游的突破性变化。你需要更新src/store文件以匹配Vuex v4的API。注意从vuex导入的"createStore"以及它在下面示例中的用法。以供参考。[Vuex从3.x迁移到4.0](https://next.vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html)

```js
// 默认 src/store/index.js 内容。
import { createStore } from 'vuex'
// 从'./module-example'导入example

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // 示例
    },

    // 启用严格模式(增加开销！)。
    // 仅适用于开发模式和-调试构建
    strict: process.env.DEBUGGING
  })

  return Store
}
```

### Vue-i18n v9

这是一个Vue 3生态系统的上游突破性变化。更新 src/boot/i18n.js 文件以匹配 Vue-i18n v9 的 API。Vue-i18n有自己的[中断性变化](https://vue-i18n-next.intlify.dev/guide/migration/breaking.html) 。

由于这个包不是由`@quasar/app`提供的，你必须通过`yarn add vue-i18n@next`更新你项目中的依赖关系。

```js
// 默认 src/boot/i18n.js 内容。

import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
// 你也需要创建 src/i18n/index.js/.ts 文件

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

如果你使用TypeScript，移除现有的'vue/types/vue'的增强功能，因为它已经被整合到上游包中。
如果你使用TypeScript和ESLint，由于一个[上游类型生成问题](https://github.com/intlify/vue-i18n-next/issues/324) ，`useI18n`组合式在用于解构`t'、`te`和类似方法时，会产生一个"@typescript-eslint/unbound-method"的linting警告。
在上游解决这个问题之前，我们建议在启动文件中创建你自己的`useI18n`帮助器

```js
export function useI18n() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { t, te, tm, rt, d, n, ...globalApi } = i18n.global;

  return {
    t: t.bind(i18n),
    te: te.bind(i18n),
    tm: tm.bind(i18n),
    rt: rt.bind(i18n),
    d: d.bind(i18n),
    n: n.bind(i18n),
    ...globalApi,
  };
}
```

### @vue/composition-api

如果你一直在使用Vue 2的Composition API包，你需要改变所有的导入，使之指向Vue包。

```js
// 旧的, @vue/composition-api  方式
import { ref } from '@vue/composition-api'.

// 新的Vue 3方式
import 'vue' from { ref }。
```

如果你使用的是被废弃的`context.root`对象，你必须重构你的代码以避免使用它，因为它已经不可用了。

删除`src/boot/composition-api`引导文件和`quasar.conf.js`的相应条目。然后卸载`@vue/composition-api`包。

```bash
$ yarn remove @vue/composition-api
```

如果你使用TypeScript，请准备多次重新加载VSCode，因为所有的升级都会导致typings缓存问题。

### Quasar组件

#### Vue 3和v-model

`v-model`现在是`model-value`+`@update:model-value`组合的别名，而不是`value`+`@input`。这对所有使用v-model的 Quasar 组件都有影响。如果你用.vue文件编写你的组件，那么你不需要担心这个问题，因为vue-loader会正确的为你翻译它。

建议：你可能想对`:value`和`@input`进行搜索和替换。请小心替换`:value`，因为有些组件(QLinearProgress, QCircularProgress)不与v-model绑定，仍然使用`value`作为属性。

#### Vue 3和作用域内的槽

所有的槽现在都以与Vue 2中的范围槽相同的方式行事。如果你使用选择式 API，那么你可以对`this.$scopedSlots`进行搜索和替换(用`this.$slots`替换)。

#### QDrawer/QDialog/QMenu/QTooltip

对上述 Quasar 组件使用"class"和"style"属性，而不是"content-class" /"content-style"属性。

#### QBtn/QItem/QBreadcrumbs/QRouteTab

新增属性：href、target。

对于QBtn，在使用`href`属性时不再需要指定`type="a"`。

如果你不同时注入Vue Router，`href`属性对UMD特别有用。

#### QBtn/QRouteTab

如果你在使用`to`属性并在你的`@click`处理程序中延迟导航：

```
// 老方法
function onClick (e, go) {
  e.navigate = false // <<<--- 这里变更
  // ...也许以后会调用go()？
}

// 新方法
function onClick (e, go) {
  e.preventDefault() // <<<--- 这介变更
  // ...也许以后会调用go()？
}
```

#### QBreadcrumbsEl

删除了"append"属性，因为Vue Router v4 [也放弃了它](https://next.router.vuejs.org/guide/migration/index.html#removal-of-append-prop-in-router-link) 。
添加了"tag"和"ripple"属性。

#### QCarousel

增加了"transition-duration" ("过渡-时间")属性。

#### QColor

增加了"no-header-tabs" 属性。

#### QChatMessage

现在默认情况下，"label"、"name"、"text"和"stamp" 都受到保护，不会受到XSS攻击。这意味着所有的"*-sanitize"属性都被放弃，因为这种行为现在已经成为 Quasar 的标准。如果你想为这些属性显示HTML内容，你现在需要通过新的布尔属性(`*-html`)明确指定它们。

| 移除的布尔型属性 | 新的相反的布尔型属性 |
| --- | --- |
| label-sanitize | label-html |
| name-sanitize | name-html |
| text-sanitize | text-html |
| stamp-sanitize | stamp-html |

#### QDate

当`@update:model-value`事件(相当于以前的`@input`)被触发时，第一个参数的内容不再包含(废弃的)`changed`属性。

### QDialog

增加了"no-shake","transition-duration"。
使用"class" 和"style" 属性而不是"content-class" /"content-style" 属性。

#### QExpansionItem

删除了"append" 属性，因为Vue Router v4 [也放弃了它](https://next.router.vuejs.org/guide/migration/index.html#removal-of-append-prop-in-router-link) 。

#### (新)连接到 QForm

如果你想创建自己的Vue组件，需要连接到父级QForm(用于验证目的)，我们已经为你提供了方便：

```js
// 组合式 API 变体

import { useFormChild } from 'quasar'

useFormChild ({
  validate,     // 返回布尔值（或解析为布尔值的 Promise）的函数
  resetValidation, // 用于重置验证的可选函数
  requiresQForm // Boolean -> 如果是"true" 和你的组件
                //   没有被QForm包起来，它就会显示
                //   一个错误信息
})

// 某些组件
export default {
  setup () {
    // 必须！应该返回一个布尔值
    function validate () {
      console.log('called my-comp.validate()')
      return true
    }

    function resetValidation () {
      // ...
    }

    useFormChild({ validate, resetValidation, requiresQForm: true })
  }
}
```

```js
// 选项式 API 变体

import { QFormChildMixin } from 'quasar'

// 某些组件
export default {
  mixins: [ QFormChildMixin ],

  methods: {
    // 要求！应该返回一个布尔值
    validate () {
      console.log('called my-comp.validate()')
      return true
    },

    // 可选
    resetValidation () {
      // ...
    }
  },

  // ...
}
```

### QInnerLoading

添加了 “label”、“label-class” 和 “label-style” 属性。

#### QImg

这个组件已经从头开始重新设计了。它现在使用了一个更现代的API。其直接效果是，它使用的RAM内存更少，运行时间更快。

添加了属性：“loading”、“crossorigin”、“fit”、“no-spinner”、“no-native-menu”、“no-transition”。
移除的属性：“transition”、“basic”（现在相当于“no-spinner”+“no-transition”）
将属性“no-default-spinner”更改为“no-spinner”。

详细的变化，请查看[QImg](/vue-components/img#qimg-api) 页面上的API卡。

#### QPopupEdit

在这个组件上已经做了一些性能改进，因此你现在需要使用默认的插槽。

```html
<!-- 旧的方法 -->
<q-popup-edit
  content-class="bg-primary text-white"
  buttons
  color="white"
  v-model="myModel"
>
  <q-input
    type="textarea"
    dark
    color="white"
    v-model="myModel"
    autofocus
  />
</q-popup-edit>
```

下面是新的方法。注意`v-slot="scope"`是直接应用在`<q-popup-edit>`上，并且使用`scope.value`而不是`myModel`作为内部`<q-input>`组件：

```html
<q-popup-edit
  class="bg-primary text-white"
  buttons
  color="white"
  v-model="myModel"
  v-slot="scope"
>
  <q-input
    type="textarea"
    dark
    color="white"
    v-model="scope.value"
    autofocus
    @keyup.enter="scope.set"
  />
</q-popup-edit>
```

关于更详细的用法，请阅读 [QPopupEdit](/vue-components/popup-edit) 的页面。

#### QLayout

`@scroll`事件参数现在的内容略有不同：

```js
{
  position, // Number (从顶部开始的像素)
  direction, // String ("top","bottom")
  directionChanged, // Boolean
  inflectionPoint, // 方向改变时的最后位置（从顶部开始）- Number（像素）
  delta // 自上次@scroll更新以来的差异 - Number (像素)
}
```

#### QOptionGroup

增加了"标签" 和"标签-N" 槽。

#### QRouteTab

增加了"ripple" 属性。

#### QScrollArea

QScrollArea已被重新设计，现在它同时支持垂直和水平滚动。

* 增加了属性："垂直-条形风格" 和"水平-条形风格" (在"条形风格"之上，它同时适用于垂直和水平滚动条)。
* 增加了属性："vertical-thumb-style"和"horizontal-thumb-style"(位于"thumb-style"的顶部，适用于垂直和水平滚动条的拇指)。
* 删除了属性。"horizontal"(现在已经过时了，因为QScrollArea同时支持垂直和水平滚动)。
* "getScrollPosition"方法现在返回一个形式为`{ top, left }`的对象(例如：`{ top: 5, left: 0 }`)。
* "setScrollPosition"和"setScrollPercentage"方法现在需要一个新的第一个参数(名为"axis"，其值为"水平"或"垂直")。(axis, offset[, duration])

#### QScrollObserver

用"axis"替换了属性"horizontal"(字符串："vertical"、"horizontal"、"both"；默认值："vertical")。

`@scroll`事件参数现在的内容略有不同：

```js
{
  position: {
    top, left // Numbers (pixels)
  },
  direction, // String ("top","right","bottom" or"left")
  directionChanged, // Boolean
  inflectionPoint: { // 方向改变时的最后位置
    top, left // Numbers (pixels)
  },
  delta: { // 自上次@scroll更新以来的差异
    top, left // Numbers (pixels)
  }
}
```

#### QSelect

* "itemEvents"属性已从"option"槽中删除。该信息现在被包含在"itemProps"中。这一变化是Vue 3对渲染函数的第二个参数进行扁平化的逻辑结果("on"、"props"等合并为一个对象)。
* 新的方法。"blur()"

### QSlider/QRange

新属性: track-size, thumb-size, marker-labels, marker-labels-class, switch-label-side, switch-marker-labels-side, inner-min, inner-max,
thumb-color, track-color, track-img, inner-track-color, inner-track-img, selection-color, selection-img。

新增QRange专用属性：left-thumb-color, right-thumb-colo

新的槽：marker-label, marker-label-group

#### QTable

将"data"属性重命名为"rows"(以解决"data"被错误地推断为Vue组件的"data()"方法的TS冲突问题)。

新的属性。"column-sort-order"。新的"columns"定义属性("sortOrder")，现在"style"和"classes"也可以是函数。

由于Vue 3的新v-model特性，它取代了".sync"修饰符，`:pagination.sync="..."`现在需要使用`v-model:pagination="..."`。

#### QTable/QTree

由于Vue 3的新v-model功能取代了".sync"修饰符，以下属性需要以不同方式使用。

| 旧方式 | 新方式 |
| --- | --- |
| pagination.sync="varName" | v-model:pagination="varName" |
| selected.sync="varName" | v-model:selected="varName" |
| expanded.sync="varName" | v-model:expanded="varName" |

#### QTabs

增加了"active-class"属性。

#### QTooltip/QMenu/QDialog/QStepper/QTabPanels

增加了"transition-duration"("过渡-时间")属性。

#### QSkeleton

增加了"animation-speed"属性。

#### QUploader

QUploaderBase 组件已被删除，转而使用[createUploaderComponent](/vue-components/uploader#supporting-other-services) 工具。

### Quasar指令

本节唯一的突破性变化是，**我们删除了GoBack指令**。使用路由器的引用来代替 push/replace/go(-1)。

```js
// 组合式 API 变体
import { useRouter } from 'vue-router'

setup () {
  const $router = useRouter()

  // 返回一条记录，与$router.back()相同。
  $router.go(-1)
}
```

```js
// 你的组件内的选项式 API 变体
this.$router.go(-1)
}
```

### Quasar插件

#### AppFullscreen插件

request()方法现在可以在全屏状态下接受另一个节点了。

#### 加载插件

* 增加了"boxClass"属性
* 默认情况下，信息是受保护的，不会受到XSS攻击。如果你想用"消息"属性显示HTML内容，你还应该指定"html: true"。这种行为与Quasar v1完全相反，在Quasar v1中，你可以使用"sanitize"属性(现在不可用了；现在默认启用)来不显示HTML。

#### Dialog插件
有几处变化。

1. 如果你使用带有自定义组件的Dialog插件，那么你现在必须在"componentProps"下提供组件属性：

  ```js
  // 旧的、废弃的v1方式
  const dialog = this.$q.dialog({ // or Dialog.create({...})
    component: MyVueComponent,
    someProp: someValue,
    // ...
  })

  // 新的v2方式(合成API)
  import { useQuasar } from 'quasar'

  setup () {
    const $q = useQuasar()
    // ...
    const dialog = $q.dialog({ // or Dialog.create({...})
    component: MyVueComponent,
    componentProps: {
      someProp: someValue,
      // ...
      }
    })
  }

  // 新的v2方式(选项式 API)
  const dialog = this.$q.dialog({ // or Dialog.create({...})
    component: MyVueComponent,
    componentProps: {
      someProp: someValue,
      // ...
    }
  })
  ```
2. `parent`和`root`属性已被删除。由于Vue 3的架构，我们不能再使用"父"组件来提供/注入功能。但你仍然能够在你的自定义组件中使用Vue Router/Vuex/等。
3. 如果用自定义组件调用Dialog插件，你需要添加`emits: ['ok', 'cancel']`到你的组件中，因为Vue 3现在需要一个组件可能发出的事件的明确列表。你也可以将该组件转换为Composition API。详细情况请见[调用自定义组件](/quasar-plugins/dialog#invoking-custom-component) 。
  ```js
  // 被调用组件的代码
  export default {
    // ...
    emits: ['ok', 'cancel'],
    // ...
  }
  ```

#### Meta 插件

```js
// v1方式(旧的，已废除)。
// 一些.vue文件
export default {
  meta: {
    // ...定义
  }
}
```

新的方式(组合式 API或选项式 API)。

```js
// 组合式 API 变体
// 为一些.vue文件
import { useMeta } from 'quasar'

export default {
  setup () {
    // 需要在setup()方法下直接调用!
    useMeta({
      // ...定义
    })
  }
}
```

```js
// 选项式 API 变体
// 为一些.vue文件
import { createMetaMixin } from 'quasar'

export default {
  mixins: [
    createMetaMixin({ /* ...definition */})
    // 或动态。
    createMetaMixin(function () {
      // 这里的"this"指的是vue组件。
      return {
        /* ...definition... */
      }
    })
  ]
}
```

详细信息请见[Meta Plugin](/quasar-plugins/meta#usage) 。

### Quasar 工具

#### date 工具
为 "addToDate" 和 "subtractFromDate" 方法提供的对象字面属性名称已被规范化。[#7414](https://github.com/quasarframework/quasar/issues/7414) 。

| 旧的 | 新的 | 改变了？|
| --- | --- | --- |
| year | years | **是** |
| month | months | **是** |
| days | days | - |
| hours | hours | - |
| minutes | minutes | - |
| seconds | seconds | - |
| milliseconds | milliseconds | - |

#### exportFile 工具

exportFile()工具(强制浏览器下载一个有你指定内容的文件)有了新的功能：你可以指定bom(字节顺序标记)和/或文本编码。[更多信息](/quasar-utils/other-utils#export-file) 。

#### scroll 工具

| 旧方法名称 | 新方法名称 |
| --- | --- |
| getScrollPosition | getVerticalScrollPosition |
| animScrollTo | animVerticalScrollTo |
| setScrollPosition | setVerticalScrollPosition |

#### color 工具

从颜色实用工具类中删除了"getBrand"和"setBrand"。它们被"getCssVar"和"setCssVar"取代。

```js
// 旧的、被废弃的V1方式：
import { colors } from 'quasar'

const { getBrand, setBrand } = colors
const primaryColor = getBrand('primary')
setBrand('primary', '#f3c')

// 新V2方式：
import { getCssVar, setCssVar } from 'quasar'

const primaryColor = getCssVar('primary')
setCssVar('primary', '#f3c')
```

### Quasar 语言包
我们改变了语言包的文件名以反映浏览器使用的标准命名。这将允许你在想动态导入 Quasar 语言包文件时使用`$q.lang.getLocale()`。

完整的变化列表。
| 旧名称 | 新名称 |
| --- | --- |
| en-us | en-US |
| en-gb | en-GB |
| az-latn | az-Latn |
| fa-ir | fa-IR |
| ko-kr | ko-KR |
| kur-CKB | kur-CKB |
| nb-no | nb-NO |
| pt-br | pt-BR |
| zh-hans | zh-CN |
| zh-hant | zh-TW |

如果你在 quasar.conf.js 中配置了一个默认的 Quasar 语言包，那么你需要编辑它：

```js
// 新的方式
framework: {
  lang: 'en-us'
}

// 新的方式
framework: {
  lang: 'en-US'
}
```

你还需要编辑所有来自`quasar/lang/`的动态导入，以匹配新的语法。

### Quasar CSS

颜色的CSS变量名称(所有与品牌有关的)已经改变：

```
// 旧
--q-color-primary, --q-color-secondary, ...

// 新
--q-primary, --q-secondary, ...
```

### Quasar UMD
* 由于新的Vue 3架构，启动应用程序的代码发生了变化，你需要[相应](/start/umd) 调整。
* 脚本和css标签的命名方案发生了变化，包括发行的类型。例如，最小化的资源文件名现在以`.prod.js`/`.prod.css`结束。这样做是为了配合Vue 3自己的文件命名方案。

::: tip
要深入了解必要的UMD脚本和标签，请使用我们的[生成器工具](/start/umd#installation) 。
:::

### Quasar App CLI

本节提及"@quasar/app" v3软件包，它支持Vue 3和Quasar UI v2。

* 放弃了对`src/css/quasar.variables.styl`的支持。此外，如果你仍然想使用Stylus作为预处理器(但没有Quasar Stylus变量)，那么你需要手动yarn/npm安装`stylus`和`stylus-loader`作为dev依赖到你的项目("@quasar/app"不再提供它们)。
* 新增 quasar.conf.js > build > vueLoaderOptions prop.
* 删除quasar.conf.js > framework > importStrategy。自动导入的效果非常好，现在被默认使用，并且是唯一的选择。
* url-loader的配置得到了增强，现在它也支持"ico"文件了。
* 如果你一直使用quasar.conf.js > build > rtl的形式，那么你现在必须匹配[这些选项](https://github.com/elchininet/postcss-rtlcss) ，因为我们已经从未维护的postcss-rtl切换到postcss-rtlcss包。

如果你有引导文件，你通过`Vue.prototype.$q`访问和改变`$q`对象，那么你需要适应这个。

```js
// 启动文件中的老方法
Vue.prototype.$q.iconSet.chip.remove = 'fas fa-times-circle'

// 新方法
export default ({ app }) => {
  app.config.globalProperties.$q.iconSet.chip.remove = 'fas fa-times-circle'
}
```

关于应用程序扩展的工作方式没有任何改变。请注意，并不是所有的应用扩展都与Quasar UI v2兼容，我们正在努力发布新的兼容版本。

#### TypeScript

更新`src/shims-vue.d.ts`以匹配[Vue3版本](https://github.com/quasarframework/quasar-starter-kit/blob/b206de59d87b8adcc25a8f7863cfe705bf6b3741/template/src/shims-vue.d.ts) 。

创建一个`src/quasar.d.ts`文件，将[这里]的内容复制到其中(https://github.com/quasarframework/quasar-starter-kit/blob/b206de59d87b8adcc25a8f7863cfe705bf6b3741/template/src/quasar.d.ts) 。

如果你使用ESLint，更新属性到`quasar.conf.js`。

```js
// 故道
supportTS: {
  tsCheckerConfig: { eslint: true },
},

// 新方法
supportTS: {
  tsCheckerConfig: {
    eslint: {
      enabled: true,
      files: './src/**/*.{ts,tsx,js,jsx,vue}',
    },
  },
},
```

这是由于上游对`fork-ts-checker-webpack-plugin`的破坏性修改。

### Quasar App CLI Electron模式

::: warning
如果你有一个使用Quasar Electron 模式的项目，那么阅读它自己的 [Electron 模式升级指南](/quasar-cli/developing-electron-apps/electron-upgrade-guide#Upgrading-from-Quasar-v1) 是很有必要的。
:::

开箱即用的 [对TS的支持](/quasar-cli/developing-electron-apps/electron-with-typescript) 现在可用。

你现在也可以为主线程和预加载脚本启用ESLint：

```js
electron: {
  chainWebpackMain (chain) {
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
  },

  chainWebpackPreload (chain) {
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
  }
}
```

### Quasar App CLI PWA 模式

如果你在InjectManifest模式下使用Workbox，那么知道`/src-pwa/custom-service-worker.[js|ts]`现在也被编译了是很有用的。这意味着，在你的代码中，你现在也可以用相对路径导入。

由于升级到Webpack 5，你还需要将`workbox-webpack-plugin`升级到v6+。

你现在也可以为自定义服务工作者启用ESLint。而且它 [支持TS](/quasar-cli/developing-pwa/pwa-with-typescript) 开箱即用(在这种情况下，将扩展名改为`.ts`)。

通过编辑quasar.conf.js，可以为自定义服务工作者启用ESLint：

```js
pwa: {
  chainWebpackCustomSW (chain) {
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
  }
}
```

### Quasar App CLI SSR模式

如果你有一个使用Quasar SSR模式的项目，那么阅读它自己的 [SSR模式升级指南](/quasar-cli/developing-ssr/ssr-upgrade-guide) 是必不可少的。

开箱即用的[对TS的支持](/quasar-cli/developing-ssr/ssr-with-typescript) 现在可用。

### Quasar Extras
没有变化。你可以像Quasar UI v1那样使用它。

### Quasar Icon Genie
没有任何变化。你可以像"@quasar/app"v1或v2项目一样使用它。
