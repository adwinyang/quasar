---
title: 处理Webpack
desc: 如何在Quasar应用程序中管理Webpack。
related:
  - /quasar-cli/quasar-conf-js
---
构建系统使用Webpack来创建你的网站/应用程序。如果你不熟悉Webpack，也不用担心。开箱后，你不需要对它进行配置，因为它已经设置好了一切。

## 使用quasar.conf.js的用法
如果你需要调整默认的Webpack配置，你可以通过编辑`/quasar.conf.js`和配置`build > extendWebpack (cfg)`方法或`build > chainWebpack (chain)`来实现。

在Webpack中添加ESLint加载器的示例(假设你已经安装了它)。

```js
// quasar.conf.js
build: {
  extendWebpack (cfg, { isServer, isClient }) {
    cfg.module.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules|quasar)/
    })
  }
}
```

注意，你不需要返回任何东西。extendWebpack(cfg)的参数是由Quasar为你生成的Webpack配置对象。你可以在其中添加/删除/替换任何东西，前提是你真的知道自己在做什么。

相当于chainWebpack()的quasar.conf。

```js
// quasar.conf.js
build: {
  chainWebpack (chain, { isServer, isClient }) {
    chain.module.rule('eslint')
      .test(/\.(js|vue)$/)
      .enforce('pre')
      .exclude
        .add((/[\\/]node_modules[\\/]/))
        .end()
      .use('eslint-loader')
        .loader('eslint-loader')
  }
}
```

::: tip
方法`chainWebpack()`提供一个[webpack-chain](https://github.com/neutrinojs/webpack-chain) 对象。你可能想看看它的文档页面。
:::

::: warning
`chainWebpack()`在`extendWebpack()`之前被执行**。

上面的两个示例是等同的。不要使用这两种方法来篡改同一件事!
:::

## 检查Webpack配置
Quasar CLI为此提供了一个有用的命令。

```bash
$ quasar inspect -h

  Description
    Inspect Quasar generated Webpack config

  Usage
    $ quasar inspect
    $ quasar inspect -c build
    $ quasar inspect -m electron -p 'module.rules'

  Options
    --cmd, -c        Quasar command [dev|build] (default: dev)
    --mode, -m       App mode [spa|ssr|pwa|cordova|electron] (default: spa)
    --depth, -d      Number of levels deep (default: 5)
    --path, -p       Path of config in dot notation
                        Examples:
                          -p module.rules
                          -p plugins
    --help, -h       Displays this message
```

## Webpack别名
Quasar预设了一堆有用的Webpack别名。你可以在项目的任何地方使用它们，webpack会解析出正确的路径。

| 别名 | 解析为 |
| `src` | /src
| `app` | / / |
| `components` | /src/components !
| `layouts` | /src/layouts !
| `pages` | /src/pages
| `资产` | /src/assets |
| `boot` | /src/boot !
此外，如果你配置为使用Vue编译器版本进行构建(quasar.conf > build > vueCompiler: true)，`vue$`会解析为`vue/dist/vue.esm.js`。

### 添加Webpack别名

要添加你自己的别名，你可以扩展webpack配置，并将其与现有的别名合并。

使用`path.resolve`帮助器来解析你想要的别名的路径。


```js
// quasar.conf.js
const path = require('path')

module.exports = function (ctx) {
  return {
    build: {
      extendWebpack (cfg, { isServer, isClient }) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          // 像这样添加你自己的别名
          myalias: path.resolve(__dirname, './src/somefolder'),
        }
      }
    }
  }
}
```

与 chainWebpack() 等同。

```js
// quasar.conf.js
const path = require('path')

module.exports = function (ctx) {
  return {
    build: {
      chainWebpack (chain, { isServer, isClient }) {
        chain.resolve.alias
          .set('myalias', path.resolve(__dirname, './src/somefolder'))
      }
    }
  }
}
```

## Webpack v5的兼容性问题

Quasar App CLI使用的是Webpack v5。如果你将现有项目从Webpack v4项目转移到Quasar，你可能会遇到一些与第三方库的兼容性问题。Webpack v5删除了用于网络客户端构建的Node.js polyfills。如果你在Web客户端上使用依赖Node.js API的包，你会得到一些包丢失的错误提示。例如：缓冲区"、"加密"、"os"、"path"、"stream"、"assert"。

这些问题需要由软件包的所有者来解决。但是如果你不想等待，只想运行你的应用程序/网站(有一点风险)，那么你可以手动安装`node-polyfill-webpack-plugin`(`yarn add --dev node-polyfill-webpack-plugin`)并在`quasar.conf.js > build > chainWebpack`中引用它。例如：

```js
// quasar.conf.js
build: {
  chainWebpack (chain) {
    const nodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')
    chain.plugin('node-polyfill').use(nodePolyfillWebpackPlugin)
  }
}
```

## Webpack加载器
构建系统使用Webpack，所以它依赖于使用Webpack加载器来处理不同类型的文件(js、css、styl、scss、json等等)。默认情况下，最常用的加载器是默认提供的。

### 安装加载器
让我们举个示例。你希望能够导入`.json`文件。**开箱即用，Quasar提供了对json的支持，所以你实际上不需要遵循这些步骤，但是为了演示如何添加一个加载器，我们将假装Quasar没有提供它。

所以，你需要一个加载器。你在谷歌上搜索，看看你需要什么webpack加载器。在这种情况下，它是 "json-loader"。我们首先安装它。

```bash
$ yarn add --dev json-loader
```

安装完新的加载器后，我们要告诉Webpack使用它。因此，我们编辑`/quasar.conf.js`并改变`build.extendWebpack()`，为这个新的加载器在`module/rules`中添加条目。

```js
// quasar.conf
build: {
  extendWebpack (cfg) {
    cfg.module.rules.push({
      test: /\.json$/,
      loader: 'json-loader'
    })
  }
}
```

与 chainWebpack() 等同。

```js
// quasar.conf
build: {
  chainWebpack (chain) {
    chain.module.rule('json')
      .test(/\.json$/)
      .use('json-loader')
        .loader('json-loader')
  }
}
```

然后你就完成了。

### PostCSS

`*.vue`文件中的样式(以及所有其他的样式文件)默认是通过PostCSS进行输送的，所以你不需要为它使用特定的加载器。

默认情况下，PostCSS被配置为使用Autoprefixer。看看`/.postcssrc.js`，如果你需要，你可以在那里进行调整。

### Pug
首先，你需要安装一些依赖项。

```bash
$ yarn add --dev pug pug-plain-loader
```

然后你需要通过quasar.conf.js来扩展webpack的配置。

```js
// quasar.conf.js
build: {
  extendWebpack (cfg) {
    cfg.module.rules.push({
      test: /\.pug$/,
      loader: 'pug-plain-loader'
    })
  }
}
```

与 chainWebpack() 等同。

```js
// quasar.conf.js
build: {
  chainWebpack (chain) {
    chain.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
  }
}
```

### Coffeescript
如果你使用Coffeescript，你需要禁用ESLint或者告诉ESLint哪些Vue组件使用Coffeescript。

注意，`vue-loader`使用`lang="coffee"`来识别使用Coffeescript的组件，但`lang="coffee"`对于ESLint来说是无法识别的。幸运的是，ESLint(遵循传统HTML)使用`type="xxx"`来识别脚本的类型。只要`<script>`标签的`类型`不是`javascript`，ESLint就会将该脚本标记为非javascript，并跳过对它的提示。Coffeescript的惯例是使用`type="text/coffeescript"`来标识自己。因此，在使用Coffeescript的Vue组件中，同时使用`lang`和`type`来避免ESLint的警告。

```html
<template>
  ...
</template>
<script lang="coffee" type="text/coffeescript">
  ...
</script>
```
