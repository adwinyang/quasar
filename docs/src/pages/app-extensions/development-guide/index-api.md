---
title: 应用程序扩展 API 索引
desc: Quasar 应用扩展 API 的索引脚本。提供访问 Quasar 上下文、注册新的CLI命令、扩展 Webpack 更多的配置。
---

本页引用到 `src/index.js` 文件，它使用 `quasar dev` 和 `quasar build`  执行。这是你可以修改构建以满足应用程序扩展需求的主要过程。
例如，注册一个启动文件，修改 webpack 进程，注册 CSS，注册一个 UI 组件，注册一个 Quasar CLI 命令等。

文件的基本结构示例:

```js
module.exports = function (api) {
  // "api " 对象的属性和方法描述如下
}
```

## api.ctx
与`/quasar.conf.js`中的`ctx`相同。帮助你根据 `quasar dev` 或 `quasar build` 的运行环境做出决定。

例如, 如果仅在 Electron 模式中运行，你可能需要使用其中的一个 api 方法。

```js
if (api.ctx.dev ==true && api.ctx.mode =='electron') {
  api.beforeDev((api) => {
    // 运行 quasar dev 和 Eelectron 模式中时做些什么...
  })
}
```

## api.extId
该应用扩展中(App Extension)包含的`ext-id'(String)。

## api.prompts
是一个对象，该对象具有安装此应用扩展时的提示答案。 有关提示的更多信息，请查看 [Prompts API](/app-extensions/development-guide/prompts-api) 。

## api.resolve
解析运行此应用扩展所在的应用程序中的路径。无需自行导入`path`和解析路径。

```js
// 解析为 app 的 root 目录 (根目录)
api.resolve.app('src/my-file.js')

// 解析为 app 的 root/src 目录
api.resolve.src('my-file.js')

// 解析为 app 的 root/src-pwa  目录
api.resolve.pwa('some-file.js')

//  解析为 app 的 root/src-ssr  目录
api.resolve.ssr('some-file.js')

// 解析为 app 的 roo/src-cordova  目录
api.resolve.cordova('config.xml')

// 解析为 app 的 roo/electron 目录
api.resolve.electron('some-file.js')
```

## api.appDir
运行该应用扩展的 app 根目录的完整路径(String)。

## api.compatibleWith

通过 semver 条件确保应用扩展(App Extension)与主机应用中安装的软件包兼容。

如果不满足 semver 条件，那么 @quasar/app 就会出错并停止执行。

semver 条件示例：`'1.x || >=2.5.0 || 5.0.0 - 7.2.3'。

```js
/**
 * @param {string} packageName
 * @param {string} semverCondition
 */
api.compatibleWith('@quasar/app', '1.x')
```

## api.hasPackage

通过 semver 条件确定主机应用程序中是否安装了某些包。

semver条件示例：`'1.x || >=2.5.0 || 5.0.0 - 7.2.3'。

```js
/**
 * @param {string} packageName
 * @param {string} (optional) semverCondition
 * @return {boolean} 包已安装并满足可选的semver条件
 */
if (api.hasPackage('vuelidate')) {
  // 嘿，这个应用程序有它(任意版本)。
}
if (api.hasPackage('quasar', '^1.0.0')) {
  // 嘿，这个应用程序已经安装了v1版本
}
```

## api.hasExtension
检查另一个应用扩展是否已安装 npm，并且 Quasar CLI 已调用它。

```js
/**
 * 检查是否安装了另一个应用扩展
 *
 * @param {string} extId
 * @return {boolean} 是否安装并调用了该扩展？
 */
if (api.hasExtension(extId)) {
  // 嘿，我们有它了
}
```

## api.getPackageVersion

获取主机应用程序包的版本。

```js
/**
*param {string} packageName
* @return {string|undefined}应用程序包的版本
  */
  console.log( api.getPackageVersion(packageName) )
  // 输出示例。
  // 1.1.3
  // 未定义 (当软件包未找到时)
```

## api.extendQuasarConf

扩展 quasar.conf.js

```js
/**
 * @param {function} fn
 * (cfg: Object, ctx: Object) => undefined
 */
api.extendQuasarConf ((conf, api) => {
  // 对 quasar.conf.js 做一些事情：
  // 添加、更改任何内容
})
```

### 注册引导文件和css文件

```js
module.exports = function (api, ctx) {
  api.extendQuasarConf((conf, api) => {
    // 确保我的启动文件被注册了
    conf.boot.push('~quasar-app-extension-my-ext/src/boot/my-ext-bootfile.js')

    // 确保启动文件可以转存
    conf.build.transpileDependencies.push(/quasar-app-extension-my-ext[/\/]src[/\/]boot/)
    // 如果 boot 文件导入了任何内容，请确保
    // 上面的正则表达式也匹配这些文件！

    //  确保my-ext css 能通过webpack
    conf.css.push('~quasar-app-extension-my-ext/src/component/my-ext.sass')
  })
}
```

::: tip
注意路径前面的波浪号(`~`)。这告诉 Quasar CLI ，该路径是来自node_modules的依赖关系，而不是应用扩展(App Extension)索引脚本文件的相对路径。
:::

## api.chainWebpack

链式 webpack 配置

```js
/**
 * @param {function} fn
 * (chain: ChainObject, invoke: Object {isClient, isServer}) => undefined
 */
api.chainWebpack((chain, { isClient, isServer }, api) => {
  // 添加/删除/更改链(Webpack链对象)
})
```

该配置是一个 Webpack 链对象。它的API在 [webpack-chain](https://github.com/neutrinojs/webpack-chain) 文档中有描述。

## api.extendWebpack
扩展 webpack 配置

```js
/**
 * @param {function} fn
 *   (cfg: Object, invoke: Object {isClient, isServer}) => undefined
 */
api.extendWebpack((cfg, { isClient, isServer }, api) => {
  // 增加/删除/变更 cfg (Webpack 配置对象)
})
```

## api.chainWebpackMainElectronProcess

Chain webpack config of the main electron process
在 Electron 主进程中进行链式 webpack 配置

```js
/**
 * @param {function} fn
 *   (chain: ChainObject) => undefined
 */
api.chainWebpackMainElectronProcess((chain, { isClient, isServer }, api) => {
  // 增加/删除/变更 cfg (Webpack 配置对象)
})
```

## api.extendWebpackMainElectronProcess
在 Electron 主进程中进行扩展 webpack 配置

```js
/**
 * @param {function} fn
 *   (cfg: Object) => undefined
 */
api.extendWebpackMainElectronProcess((cfg, { isClient, isServer }, api) => {
  // 增加/删除/变更 cfg (Webpack 配置对象)
})
```

## api.chainWebpackPreloadElectronProcess

在 Electron 预加载进程中进行链式 webpack 配置

```js
/**
 * @param {function} fn
 *   (chain: ChainObject) => undefined
 */
api.chainWebpackPreloadElectronProcess((chain, { isClient, isServer }, api) => {
  // 增加/删除/变更 cfg (Webpack 配置对象)
})
```

## api.extendWebpackPreloadElectronProcess

在 Electron 预加载进程中进行扩展 webpack 配置

```js
/**
 * @param {function} fn
 *   (cfg: Object) => undefined
 */
api.extendWebpackPreloadElectronProcess((cfg, { isClient, isServer }, api) => {
  // 增加/删除/变更 cfg (Webpack 配置对象)
})
```

## api.chainWebpackWebserver

SSR 服务端进行链式 Webpack 配置 (包括来自 /src-ssr/middleware 的 SRR 中间件)

```js
/**
 * @param {function} fn
 *   (chain: ChainObject) => undefined
 */
api.chainWebpackWebserver ((chain, { isClient, isServer }, api) => {
  // 增加/删除/变更 cfg (Webpack 配置对象)
  // isClient 总是 "false", isServer 总是 "true"
})
```

## api.extendWebpackWebserver

Extend webpack config Object of SSR webserver (includes the SSR middlewares from /src-ssr/middlewares)
扩展 SSR webserver的webpack配置对象(包括来自 /src-ssr/middleware 的 SRR 中间件)

```js
/**
 * @param {function} fn
 *   (cfg: Object) => undefined
 */
api.extendWebpackWebserver((cfg, { isClient, isServer }, api) => {
  // 增加/删除/变更 cfg (Webpack 配置对象)
  // isClient 总是 "false", isServer 总是 "true"
})
```

## api.chainWebpackCustomSW

使用 InjectManifest 时自定义 Service Worker 的链式 webpack 配置(/src-pwa/custom-service-worker.js 的内容)：

```js
/**
 * @param {function} fn
 *   (cfg: ChainObject) => undefined
 */
api.chainWebpackCustomSW ((cfg, { isClient, isServer }, api) => {
  // 增加/删除/变更 cfg (Webpack 配置对象)
})
```

## api.extendWebpackCustomSW
使用 InjectManifest 时为自定义 service worker 扩展 webpack 配置对象(/src-pwa/custom-service-worker.js 的内容)：

```js
/**
 * @param {function} fn
 *   (chain: Object) => undefined
 */
api.extendWebpackCustomSW((chain, { isClient, isServer }, api) => {
  // 增加/删除/变更 cfg (Webpack 配置对象)
})
```

## api.registerCommand
Register a command that will become available as `quasar run <ext-id> <cmd> [args]` (or the short form: `quasar <ext-id> <cmd> [args]`).
注册一个的命令，可以作为 `quasar run <ext-id> <cmd> [args]` 形式使用(或缩写形式：`quasar <ext-id> <cmd> [args]`)。

```js
/**
 * @param {string} commandName (命令名称)
 * @param {function} fn
 *   ({ args: [ string, ... ], params: {object} }) => ?Promise
 */
api.registerCommand('start', ({ args, params }) => {
  // 在这里做点什么

  // 这将注册“start”命令，并且在运行时执行此处理程序
  // $ quasar run <ext-id> start

})
```

## api.registerDescribeApi
Register an API file for `$ quasar describe` command.
为 `$quasar descripe` 命令注册一个API文件。

```js
/**
 * @param {string} name
 * @param {string} relativePath
 *   (从进行此调用的文件开始的相对路径)
 */
api.registerDescribeApi(
  'MyComponent',
  './relative/path/to/my/component/file.json'
)
```

上述内容将响应 `$ quasar describe MyComponent`.

关于这样的JSON文件的语法，请查看`/node_modules/quasar/dist/api`(在你的项目文件夹中)。请注意，你JSON文件必须包含一个 `type` 属性("component", "directive", "plugin")。例如：

```json
{
  "type": "component",
  "props": {
  },
  ...
}
```

::: tip
Always test with the `quasar describe` command to ensure you got the syntax right and there are no errors.
始终用 `quasar describe` 命令进行测试，以确保你的语法正确，并且没有错误。
:::

## api.getPersistentConf

获取该扩展的内部持久化配置。如果没有，则返回空对象。

```js
/**
 * @return {object} cfg
 */
api.getPersistentConf()
```

## api.setPersistentConf

设置该扩展的内部持久化配置。如果它已经存在，则会被覆盖。

```js
/**
 * @param {object} cfg
 */
api.setPersistentConf({
  // ....
})
```

## api.mergePersistentConf

深度合并到该扩展的内部持久性配置中。如果扩展还未进行任何配置，则基本上等同于第一次设置它。

```js
/**
 * @param {object} cfg
 */
api.mergePersistentConf({
  // ....
})
```

## api.beforeDev

在`$ quasar dev`命令运行前准备好一些外部服务，如启动一些后端或应用程序依赖的任何其他服务。

可以使用 async/await 或直接返回一个Promise。

```js
/**
 * @param {function} fn
 *   (api, { quasarConf }) => ?Promise
 */
api.beforeDev((api, { quasarConf }) => {
  // 在这做些什么
})
```

## api.afterDev

Quasar 开发服务器(dev server) 启动后运行的钩子(`$ quasar dev`)。在开发服务器已经启动后，如果想做点什么，则可以使用它。

可以使用 async/await 或直接返回一个Promise。

```js
/**
 * @param {function} fn
 *   (api, { quasarConf }) => ?Promise
 */
api.afterDev((api, { quasarConf }) => {
  // 在这做些什么
})
```

## api.beforeBuild

构建 Quasar 应用程序之前运行的钩子 (`$ quasar build`)，此时，distributables 文件夹还没有创建好。

可以使用 async/await 或直接返回一个Promise。

```js
/**
 * @param {function} fn
 *   (api, { quasarConf }) => ?Promise
 */
api.beforeBuild((api, { quasarConf }) => {
  // 在这做些什么
})
```

## api.afterBuild

构建 Quasar 应用程序之后运行的钩子 (`$ quasar build`)，此时，distributables 文件夹已创建好了，可以使用它进行某些操作。

可以使用 async/await 或直接返回一个Promise。

```js
/**
 * @param {function} fn
 *   (api, { quasarConf }) => ?Promise
 */
api.afterBuild((api, { quasarConf }) => {
  // 在这做些什么
})
```

## api.onPublish

如果需要发布(`$ quasar build -P`)，则在构建生产使用的 Quasar 应用程序和执行 afterBuild 钩子(如果指定)之后运行的钩子。

可以使用 async/await 或直接返回一个Promise。

```js
/**
 * @param {function} fn
 *   () => ?Promise
 * @param {object} opts
 *   * arg - 提供给 "--publish"/"-P" 的参数
 *   * distDir - 构建发行版的文件夹
 */
api.onPublish((api, opts) => {
  // 在这做些什么
})
```
