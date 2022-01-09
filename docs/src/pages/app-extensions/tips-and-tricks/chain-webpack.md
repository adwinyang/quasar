---
title: 链式Webpack
desc: 关于如何使用 Quasar App Extension 来配置主机应用程序使用 Webpack 加载器的技巧和窍门。
---

本指南适用于你希望确保将 [Webpack Loader](https://webpack.js.org/loaders/) 链接到托管应用程序的情况，因为你要依赖它来让自己App Extension(应用扩展)正常工作。

::: tip
为了创建一个App Extension项目文件夹，请先阅读[开发指南>简介](/app-extensions/development-guide/introduction) 。
:::

:::tip Full Example
要看我们要建立的示例，请转到[完整示例](https://github.com/quasarframework/app-extension-examples/tree/v2/chain-webpack) ，这是一个包含此内容的 GitHub 存储库应用扩展。。
:::

我们只需要`/index.js`脚本，因为我们可以使用[Index API](/app-extensions/development-guide/index-api) 来配置主机应用中的quasar.conf.js，以包括我们的Webpack链。

```bash
.
├── package.json
└── src
└── index.js # 在Index API中描述的内容
```

`/index.js`看起来像这样:

```js
//文件：/index.js
module.exports = function (api) {
  // (可选！)。
  // Quasar兼容性检查；你可能需要
  // 硬性依赖，如最小版本的 "quasar"
  // 或最低版本的"@quasar/app" CLI。
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  // Webpack 链
  api.chainWebpack((chain) => chainWebpack(api.ctx, chain))
}
```

我们的 "chainWebpack"方法，与上述文件相同：

```js
//文件: /index.js
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

const chainWebpack = function (ctx, chain) {
const rule = chain.module.rule('md')
  .test(/\.md$/)
  .pre()

rule.use('v-loader')
  .loader('vue-loader')
  .options({
    productionMode: ctx.prod,
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      img: 'src',
      image: 'xlink:href'
    }
})

rule.use('ware-loader')
  .loader('ware-loader')
  .options({
    raw: true,
    middleware: function (source) {
      // 使用 markdown-it 将 markdown 文件渲染成html，
      // 然后用 Vue 模板语法包装该输出，所以它可以被 "vue-loader "处理。
      return `<template><div>${md.render(source)}</div></template>`
    }
  })
}
```


