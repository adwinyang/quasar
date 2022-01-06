---
title: 配置quasar.conf.js
desc: 在Quasar应用中，你可以在哪里、如何以及配置什么。
---
Quasar在其引擎盖下使用了一些很棒的开发工具，如[Webpack](https://webpack.js.org/)。Quasar的优点之一是它为你处理了底层工具所需的大部分复杂配置。因此，你甚至不需要了解Webpack或其他任何开发工具，就可以使用Quasar。

那么，你可以通过`/quasar.conf.js`配置什么？

* 你将在你的网站/应用程序中使用的Quasar组件、指令和插件
* 默认的[Quasar语言包](/options/quasar-language-packs)
* 你希望使用的[图标库](/options/installing-icon-libraries)
* Quasar组件的默认[Quasar Icon Set](/options/quasar-icon-sets)
* 开发服务器端口、HTTPS模式、主机名等
* 你希望使用的[CSS动画](/options/animations)
* [Boot Files](/quasar-cli/boot-files) 列表(这也决定了执行的顺序)--这是`/src/boot`中的文件，告诉你的应用程序在安装根Vue组件之前是如何初始化的。
* 全局性的CSS/Sass/...文件将被包含在捆绑包中
* PWA [清单](/quasar-cli/developing-pwa/configuring-pwa#Configuring-Manifest-File) 和 [Workbox options](/quasar-cli/developing-pwa/configuring-pwa#Quasar.conf.js)
* [Electron Packager](/quasar-cli/developing-electron-apps/configuring-electron#Quasar.conf.js) 和/或 [Electron Builder](/quasar-cli/developing-electron-apps/configuring-electron#Quasar.conf.js)
* 扩展Webpack配置

::: tip
你会注意到，改变任何这些设置都不需要你手动重新加载开发服务器。Quasar会检测是否可以通过[Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)注入更改，如果不能，它将自动为你重新加载开发服务器。你不会失去你的开发流程，因为你可以坐下来，让Quasar CLI快速地重新加载更改后的代码，甚至保持当前状态。这为你节省了大量的时间!
:::

::: warning
`/quasar.conf.js`是由Quasar CLI构建系统运行的，所以这段代码直接在Node下运行，而不是在你的应用程序的上下文中。这意味着你可以要求像'fs'、'path'、'webpack'等模块。确保你想写的这个文件的ES6特性被你的Node的安装版本所支持(应该是>=10)。
:::

## 结构

### 基础知识

你会注意到`/quasar.conf.js`导出了一个函数，它接收一个`ctx`(上下文)参数并返回一个对象。这允许你根据这个上下文动态地改变你的网站/应用程序配置。

```js
module.exports = function (ctx) { // can be async too
  console.log(ctx)

  // 控制台上的输出示例。
  {
    dev: true,
    prod: false,
    mode: { spa: true },
    modeName: 'spa',
    target: {},
    targetName: undefined,
    arch: {},
    archName: undefined,
    debug: undefined
  }

  // 上下文是根据参数生成的
  // 你用它来运行 "quasar dev "或 "quasar build"。
}
```

这意味着，作为一个示例，你可以在为某种模式(如PWA)构建时加载一种字体，而为其他模式选择另一种。

```js
module.exports = function (ctx) {
  extras: [
    ctx.mode.pwa // we're adding only if working on a PWA
      ? 'roboto-font'
      : null
  ]
}
```

或者你可以为SPA模式使用一个全局CSS文件，为Cordova模式使用另一个，同时避免为其他模式加载任何此类文件。

```js
module.exports = function (ctx) {
  css: [
    ctx.mode.spa ? 'app-spa.sass' : null, // looks for /src/css/app-spa.sass
    ctx.mode.cordova ? 'app-cordova.sass' : null  // looks for /src/css/app-cordova.sass
  ]
}
```

或者你可以将开发服务器配置为SPA模式下运行在8000端口，PWA模式下运行在9000端口，或其他模式下运行在9090端口。

```js
module.exports = function (ctx) {
  devServer: {
    port: ctx.mode.spa
      ? 8000
      : (ctx.mode.pwa ? 9000 : 9090)
  }
}
```

你也可以在返回Quasar 配置之前做异步工作。

```js
module.exports = async function (ctx) {
  const data = await someAsyncFunction()
  return {
    // ... 使用 "数据"
  }
}

// 或：
module.exports = function (ctx) {
  return new Promise(resolve => {
    // 一些异步工作，然后。
    // 解决()与Quasar 配置
    resolve({
      //
    })
  })
}
```

这种可能性是无穷无尽的。

### IDE自动完成

你可以用`configure()`帮助器来包装返回的函数，以获得更好的IDE自动完成体验(通过Typescript)。

```js
const { configure } = require('quasar/wrappers')

module.exports = configure(function (ctx) {
  /* configuration options */
})
```

## 要配置的选项
让我们逐一来看看每个选项。

| 属性 | 类型 | 描述 |
| css | 阵列 | 全局CSS/Sass/...文件，来自`/src/css/`，除了主题文件，默认包含。|
| preFetch | Boolean | 启用[预取功能](/quasar-cli/prefetch-feature)。|
| extras | 数组 | 从[@quasar/extras](https://github.com/quasarframework/quasar/tree/dev/extras)包中导入什么。例如：_['material-icons', 'roboto-font', 'ionicons-v4']_ | |
| 厂商 | 对象 | 添加/删除文件/第三方库到/从厂商块中。{ add: [...], remove: [...] }. |
| supportTS | Boolean/Object | 添加对TypeScript的支持。[更多信息](/quasar-cli/supporting-ts) | |支持TS
| htmlVariables | Object | 添加可以在index.template.html中使用的变量。|
| 框架 | 对象/字符串 | 要导入哪些Quasar组件/指令/插件，要使用哪些Quasar语言包，要使用哪些Quasar组件的图标集。|
| animations | Object/String |导入什么[CSS动画](/options/animations)。例如：_['bounceInLeft', 'bounceOutRight']_ | _
| devServer | Object | Webpack devServer选项。有些属性会根据你所使用的Quasar模式而被覆盖，以确保配置正确。注意：如果你在代理开发服务器(即使用云IDE)，请将`public`设置为你的公共应用程序的URL。|
| 构建 | 对象 | 构建配置选项。|
| sourceFiles | Object | 更改你的应用程序部分的默认名称。|
| cordova | Object | Cordova specific [config](/quasar-cli/developing-cordova-apps/configuring-cordova) 。|
| capacitor | Object | Quasar CLI Capacitor specific [config](/quasar-cli/developing-capacitor-apps/configuring-capacitor) 。|
| pwa | Object | PWA specific [config](/quasar-cli/developing-pwa/configuring-pwa). |
| SSR | 对象 | SSR专用 [config](/quasar-cli/developing-ssr/configuring-ssr). |
| electron | Object | Electron specific [config](/quasar-cli/developing-electron-apps/configuring-electron). |
### 属性: css

全局性的CSS/Sass/...文件，来自`/src/css/`，除了主题文件，这些文件是默认包含的。


```js
// quasar.conf.js
return {
  css: [
    'app.sass', // referring to /src/css/app.sass
    '~some-library/style.css' // referring to node_modules/some-library/style.css
  ]
}
```

### 属性: vendor
默认情况下，出于性能和缓存的考虑，所有来自`node_modules`的东西都会被注入vendor chunk。然而，如果你想从这个特殊的块中添加或删除一些东西，你可以这样做。

```js
// quasar.conf.js
return {
  vendor: {
    /* optional;
       disables vendor chunk: */ disable: true,

    add: [ 'src/plugins/my-special-plugin' ],
    remove: ['axios', 'vue$']
  }
}
```

### 属性：框架
告诉CLI要导入哪些Quasar组件/指令/插件，使用哪些Quasar I18n语言包，为Quasar组件使用哪些图标集等等。

只有当 "所有 "被设置为 "false "时，才需要填写 "组件 "和 "指令"。

```js
// quasar.conf.js
return {
  // 一个包含所有选项的列表(所有选项都是可选的)
  framework: {
    // 是使用 "自动 "导入策略，你也可以进行配置。
    autoImportComponentCase: 'pascal', // or 'kebab' (default) or 'combined'

    // 对于自动导入可能产生影响的地方之外的特殊情况
    // (例如：用.js文件而不是.vue编写的vue组件)。
    // 你可以手动指定Quasar组件/指令，使其在任何地方都可用。
    //
    // 组件。[],
    // 指令。[],

    // Quasar插件
    plugins: ['Notify' /* ... */],

    // Quasar配置
    // 你会看到在使用它的组件/指令/插件中提到这一点
    config: { /* ... */ },

    iconSet: 'fontawesome-v5', // requires icon library to be specified in "extras" section too,
    lang: 'de', // Tell Quasar which language pack to use for its own components

    cssAddon: true // Adds the flex responsive++ CSS classes (noticeable bump in footprint)
  }
}
```

更多关于cssAddon的信息[这里](/layout/grid/introduction-to-flexbox#flex-addons)。

### 属性: devServer
**Webpack devServer选项**。请看一下选项的[完整列表](https://webpack.js.org/configuration/dev-server/)。Quasar CLI根据 "quasar dev "参数和Quasar模式覆盖了一些选项，以确保一切设置正确。注意：如果你代理开发服务器(即使用云IDE或本地隧道)，将`client'部分的`webSocketURL'设置为你的公共应用程序的URL，以允许像Live Reload和Hot Module Replacement这样的功能工作[这里描述](https://webpack.js.org/configuration/dev-server/#websocketurl)。

最常用的属性是。

| 属性 | 类型 | 描述 |
| 端口 | 数字 | 开发服务器的端口 |
| 主机 | 字符串 | 本地IP/主机，用于开发服务器。
| 除非设置为 "false"，否则Quasar会自动打开一个指向开发服务器地址的浏览器。适用于SPA、PWA和SSR模式。如果指定的是字符串，请看下面的解释。|
| 当你有一个独立的API后端开发服务器，而你想在同一个域名上发送API请求时，代理一些URL会很有用。|
| | devMiddleware | Object | 提供给webpack-dev-middleware v4的配置。
| server | Object | 这里你可以配置HTTPS而不是HTTP(见下文) |
| onBeforeSetupMiddleware | 函数 | 在webpack-dev-server应用自己的配置之前配置开发中间件。|
| onAfterSetupMiddleware | 功能 | 在webpack-dev-server应用自己的配置后配置开发中间件。|
使用`open`属性来打开一个特定的浏览器，而不是用你操作系统的默认浏览器(根据主机操作系统检查[supported values](https://github.com/sindresorhus/open/blob/master/test.js))。



```js
// quasar.conf.js

devServer: {
  open: 'firefox'
}
```

当你在quasar.conf.js文件中设置`devServer > https: true`时，Quasar将为你自动生成一个SSL证书。然而，如果你想自己为你的本地主机创建一个，那么请查看[Filippo](https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/)的这篇博文。然后你的`quasar.conf.js > devServer > https`应该是这样的。

```js
// quasar.conf.js

devServer: {
  server: {
    type: 'https', // NECESSARY (alternative is type 'http')

    options: {
      // 使用ABSOLUTE路径或path.join(__dirname, 'root/relative/path')。
      key: "/path/to/server.key",
      pfx: "/path/to/server.pfx",
      cert: "/path/to/server.crt",
      ca: "/path/to/ca.pem",
      passphrase: 'webpack-dev-server' // do you need it?
    }
  }
}
```

你也可以配置自动打开远程Vue Devtools。

```js
// quasar.conf.js

devServer: {
  vueDevtools: true
}
```
#### HMR的Docker和WSL问题
如果你正在使用Docker容器，你可能会发现HMR停止工作。HMR依靠操作系统来通知文件的变化，这可能对你的Docker容器不起作用。

一个权宜之计可以通过使用轮询模式来检查文件系统的变化来实现。
这可以通过以下方式启用。

```js
// quasar.conf.js

build: {
  // ...
  extendWebpack(cfg) {
    cfg.watchOptions = {
      aggregateTimeout: 200,
      poll: 1000,
    };
  },
// ...
```

### 属性: 建立
| 属性 | 类型 | 描述 |
| transpile | Boolean | 启用或禁用Babel转码。|
| 如果 "transpile "被设置为 "false"，则不适用。添加Babel转写的依赖项(来自node_modules，默认不转写)。例如：`[ /my-dependency/, ...]` | |
| showProgress | Boolean | 编译时显示一个进度条。|
| transformAssetUrls | Object | 增加对自定义标签属性的资产引用的支持。例如：`{ 'my-img-comp': 'src', 'my-avatar': ['src', 'placeholder-src' ]}` | |
| 扩展Webpack(cfg) | 函数 | 扩展由Quasar CLI生成的Webpack配置。相当于chainWebpack()，但你可以直接访问Webpack配置对象。|
| 函数 | 扩展由Quasar CLI生成的Webpack配置。相当于extendWebpack()，但使用[webpack-chain](https://github.com/neutrinojs/webpack-chain)代替。|
| beforeDev({ quasarConf }) | 功能 | 在`$ quasar dev`命令运行前准备好外部服务，如启动一些后端或应用程序依赖的任何其他服务。可以使用async/await或直接返回一个Promise。|
| afterDev({ quasarConf }) | 功能 | 在Quasar dev服务器启动后运行钩子(`$ quasar dev`)。此时，开发服务器已经启动，如果你想对它做一些事情，它是可用的。可以使用async/await或者直接返回一个Promise。|
| beforeBuild({ quasarConf }) | 函数 | 在Quasar为生产构建应用程序之前运行钩子(`$ quasar build`)。此时，distributables文件夹还没有被创建。可以使用async/await或直接返回一个Promise。|
| AfterBuild({ quasarConf }) | 函数 | 在Quasar为生产构建应用程序后运行钩子(`$ quasar build`)。此时，distributables文件夹已经创建，如果你想用它来做什么，就可以使用。可以使用async/await或直接返回一个Promise。|
| 如果要求发布(`$ quasar build -P`)，在Quasar为生产构建应用程序并执行afterBuild钩子(如果指定)后，运行钩子。可以使用async/await或直接返回一个Promise。`opts`是`{arg, distDir}`形式的对象，其中 "arg "是提供给-P参数的参数(如果有)。|
| publicPath | String | 你的应用程序的公共路径。默认情况下，它使用根目录。如果你的公共路径是其他的，比如"&lt;protocol&gt;://&lt;domain&gt;/some/nested/folder"，则使用它--在这种情况下，它意味着可分发文件在你的Webserver上的 "some/nested/folder"。|
| appBase | String | 强制使用你的自定义值的应用基础标签；只有当你***真的知道你在做什么时才配置，否则你很容易破坏你的应用。强烈建议让这个值由quasar/app来计算。|
| vueRouterBase | String | 用你的自定义值强制使用vue路由器基础；只有当你***真的知道你在做什么时才配置，否则你会很容易破坏你的应用程序。强烈建议让这个值由quasar/app来计算。|
| vueRouterMode | String | 设置[Vue Router模式](https://router.vuejs.org/en/essentials/history-mode.html)："散列 "或 "历史"。请明智地选择。历史模式也需要在你的部署网络服务器上进行配置。|
| htmlFilename | String | 默认为 "index.html"。|
| ssrPwaHtmlFilename | String | 用于SSR+PWA模式。默认为'offline.html'。|
| productName | String | 默认值取自package.json > productName字段。|
| distDir | String | Quasar CLI应该生成可分发文件的文件夹。项目根目录的相对路径。默认为 "dist/{ctx.modeName}"。适用于除Cordova以外的所有模式(Cordova会被强制放到`src-cordova/www`)。|
| ignorePublicFolder | Boolean | 忽略/public文件夹。如果你依赖一个静态文件夹，那么你将需要自己配置它(在Quasar之外或通过extendWebpack/chainWebpack)，所以请确保你知道你在做什么。|
| devtool | String | 要使用的源码图[策略](https://webpack.js.org/configuration/devtool/)。
| env | Object | 添加属性到`process.env`，你可以在网站/应用的JS代码中使用。|
| gzip | Boolean/Object | 对可分发文件进行压缩。当你提供内容的网络服务器没有gzip功能时很有用。如果作为对象使用，它代表压缩-webpack-plugin配置对象。|
| analyze | Boolean/Object | 用webpack-bundle-analyzer显示构建包的分析。如果作为对象使用，它代表webpack-bundle-analyzer配置对象。|
| vueCompiler | Boolean | 包括vue运行时间+编译器版本，而不是默认的仅有Vue运行时间的版本。
| uglifyOptions | Object | 最小化选项。[完整列表](https://github.com/webpack-contrib/terser-webpack-plugin/#minify)。|
| vueLoaderOptions | Object | [vue-loader]的选项(compilerOptions, compiler, transformAssetUrls, etc)(https://vue-loader.vuejs.org/options.html). |

| scssLoaderOptions | Object | 提供给`sass-loader`的`.scss`文件的选项。例如：scssLoaderOptions: { additionalData: '@import "src/css/abstracts/_mixins.scss"; ' } |
| sassLoaderOptions | Object | 为`.sass`文件提供给`sass-loader`的选项。|
| stylusLoaderOptions | Object | 提供给 "stylus-loader "的选项。|
| lessLoaderOptions | Object | 提供给 "less-loader "的选项。|

Quasar CLI会根据dev/build命令和Quasar模式自动配置`build`的下列属性。但是如果你想覆盖一些(请确保你知道你在做什么)，你可以这样做。

| 属性 | 类型 | 描述 |
| extractCSS | Boolean | 从Vue文件中提取CSS |
| sourceMap | Boolean | 使用源码地图 |
| minify | Boolean | 最小化代码(html, js, css) |
例如，如果你运行 "quasar build --debug"，无论你配置了什么，sourceMap和extractCSS都会被设置为 "true"。

### 属性: htmlVariables

你可以在`src/index.template.html`中定义然后引用变量，像这样。


```js
// quasar.conf.js
module.exports = function (ctx) {
  return {
    htmlVariables: {
      title: 'test name',
      some: {
        prop: 'my-prop'
      }
    }
```
然后(只是一个示例，告诉你如何引用上面定义的变量，在这里是`title')。
```html
<!-- src/index.template.html -->
<%= title %>
<%= some.prop %>
```

### 属性: sourceFiles
如果有必要，可以使用这个属性来改变你的网站/应用程序的一些文件的默认名称。所有的路径必须是相对于你的项目的根文件夹的。

```js
// 默认值。
sourceFiles: {
  rootComponent: 'src/App.vue',
  router: 'src/router',
  store: 'src/store',
  indexHtmlTemplate: 'src/index.template.html',
  registerServiceWorker: 'src-pwa/register-service-worker.js',
  serviceWorker: 'src-pwa/custom-service-worker.js',
  electronMain: 'src-electron/electron-main.js',
  electronPreload: 'src-electron/electron-preload.js'
}
```

### 为dev/build设置env的示例

请参考我们文档中的[Adding to process.env](/quasar-cli/handling-process-env#adding-to-process-env)部分。

### 处理Webpack配置
深入分析 [Handling Webpack](/quasar-cli/handling-webpack) 文档页面。
