---
title: 相当于入门套件
desc：关于如何使用Quasar应用程序扩展来创建相当于入门套件的技巧和窍门。
---

本指南适用于您想要创建本质上是 “入门工具包” 的内容，该工具包在官方入门工具包之上添加内容（/quasar.conf.js 配置、文件夹、文件、CLI 挂钩）。
这允许您让多个项目共享一个公共结构/逻辑（并且只有一个包来管理它们，而不必单独更改所有项目以匹配您的公共模式），并且还允许您与社区分享所有这些。

::: tip
要创建一个App Extension项目文件夹，请先阅读[开发指南>简介](/app-extensions/development-guide/introduction)。
:::

::: tip Full Example
要看我们要创建的示例，请到[MyStarterKit完整示例](https://github.com/quasarframework/app-extension-examples/tree/v2/my-starter-kit)，这是该App Extension的github repo。
:::

我们将创建一个应用扩展的示例，它的作用如下。

* 它提示用户希望这个App Extension安装哪些功能
* 根据他给出的答案，将文件渲染（复制）到托管文件夹中
* 它扩展了/quasar.conf.js
* 它扩展了Webpack的配置
* 它使用一个应用扩展钩子（onPublish）。
* 当应用扩展被卸载时，它将删除添加的文件
* 它使用提示语来定义App Extension的工作内容

## 结构

在这个例子中，我们将创建以下文件夹结构：

```bash
.
├── README.md
├── package.json
└── src
    ├── boot
    │ └── my-starter-kit-boot.js
    ├── templates
    │    ├── common-files
    │    │      ├── README.md
    │    │      │ └── some-folder
    │    │             └──tasks.md
    │    ├── serviceA
    │    │      └── src
    │    │           └──services
    │    │              └── serviceA.js
    │    └── serviceB
    │        └── src
    │            └── services
    │                └── serviceB.js
    ├── index.js
    ├── install.js
    ├── prompts.js
    └── uninstall.js
```

## 安装脚本

下面的安装脚本只是将文件渲染到托管应用程序中。注意上面的`src/templates`文件夹，我们决定把这些模板放在那里。

```js
// src/install.js

module.exports = function (api) {
  // （可选！）。
  // Quasar兼容性检查；你可能需要兼容性检查；你可能需要硬性依赖，如最小版本的 "quasar"
  // 或最低版本的"@quasar/app" CLI。
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  // 我们将一些文件渲染到托管项目中

  if (api.prompts.serviceA) {
    api.render('./templates/serviceA')
  }

  if (api.prompts.serviceB) {
    // 我们提供插值变量到模板中
    api.render('./templates/serviceB', {
      productName: api.prompts.productName
    })
  }

  // 我们总是渲染以下模板。
  api.render('./templates/common-files')
}
```

注意，我们使用提示来决定渲染到托管项目中的内容。此外，如果用户选择了 "服务B"，那么我们也会有一个 "productName"，我们可以在渲染服务B的文件时使用。

## 索引脚本

我们在 index 脚本中做了几件事，比如扩展/quasar.conf.js，钩住众多Index API钩子中的一个（在本例中是onPublish），并将Webpack配置链化。

```js
// src/index.js

module.exports = function (api) {
  // （可选！）。
  // Quasar兼容性检查；你可能需要 兼容性检查；
  // 你可能需要硬性依赖，如最小版本的 "quasar"
  // 或最低版本的"@quasar/app" CLI。
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  // 这里我们扩展/quasar.conf.js。
  // (extendQuasarConf()将在本教程后面定义，继续阅读)
  api.extendQuasarConf(extendQuasarConf)

  // 这里我们注册了onPublish钩子。
  // 只有当用户回答说他想使用发布服务时才会这样做
  if (api.prompts.publishService) {
    // onPublish()将在本教程的后面定义，请继续阅读
    api.onPublish(onPublish)
  }

  // 我们在Webpack配置中添加/改变/删除一些东西
  // (chainWebpack()将在本教程的后面定义，继续阅读)
  api.chainWebpack(chainWebpack)

  // 还有很多你可以使用的钩子......
}
```

下面是一个`extendQuasarConf`定义的例子。

```js
function extendQuasarConf (conf) {
  conf.extras.push('ionicons-v4')
  conf.framework.iconSet = 'ionicons-v4'.

  //
  // 我们注册一个启动文件。用户不需要对其进行篡改。
  // 所以我们把它保留在应用程序扩展代码中。
  //

  // 确保my-ext的启动文件被注册了
  conf.boot.push('~quasar-app-extension-my-starter-kit/src/boot/my-starter-kit-boot.js')

  // 确保启动文件被转译
  conf.build.transpileDependencies.push(/quasar-app-extension-my-starter-kit[/\/]src/)
}
```

`onPublish`函数。

```js
function onPublish (api, { arg, distDir }) {
  //当 "quasar build --publish "被调用时，这个钩子被调用。

  // 你的发布逻辑在这里...
  console.log('We should publish now. But maybe later?:) ')

  // 我们是要发布一个Cordova应用程序吗？
  if (api.ctx.modeName === 'cordova') {
    // 做点什么
  }
}
```

`chainWebpack`函数。

```js
function chainWebpack (cfg, { isClient, isServer }, api) {
// cfg是一个Webpack链对象。
// 关于如何使用它的文档：webpack-chain docs (https://github.com/neutrinojs/webpack-chain)
}
```

## 卸载脚本

当App Extension被卸载时，我们需要做一些清理工作。但要注意你从应用空间中删除的东西! 有些文件可能仍然需要。如果你决定有一个卸载脚本，那么要特别小心。

```js
//我们把它添加到我们的应用扩展中。
// 所以我们可以导入以下内容。
const rimraf = require('rimraf')

module.exports = function (api) {
  // 当你删除文件夹时要小心!
  // 你不希望删除项目仍然需要的文件。
  // 或者不属于这个应用扩展的文件。

  // 在这里，我们也可以完全删除/src/services文件夹。
  // 但如果用户在这个文件夹中添加了其他文件怎么办？

  if (api.prompts.serviceA) {
    // 我们在安装时添加了它，所以我们删除它
    rimraf.sync(api.resolve.src('services/serviceA.js'))
  }

  if (api.prompts.serviceB) {
    // 我们在安装时添加了它，所以我们删除它
    rimraf.sync(api.resolve.src('service/serviceB.js'))
  }

  // 我们在安装时添加了它，所以我们删除它
  rimraf.sync(api.resolve.app('some-folder'))
  // 警告...我们已经添加了这个文件夹，但是如果
  // 开发者在这个文件夹中添加了更多的文件呢？
}
```

注意，我们请求的是`rimraf` npm包。这意味着我们 yarn/npm 将其添加到我们的 App Extension 项目中。
