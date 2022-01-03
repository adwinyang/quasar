---
title: 应用扩展卸载API
desc: Quasar 应用扩展的卸载脚本API。
---

本页面引用到`src/uninstall.js`文件，它在应用扩展卸载时被执行。不是所有的应用扩展都需要卸载 --- 这是一个可选的步骤。

该文件的基本结构示例。

```js
module.exports = function (api) {
  // "api "对象的属性和方法, 描述如下
}
```

## api.extId
包含这个应用扩展的`ext-id'(String)。

## api.prompts
是一个对象，该对象具有安装此应用扩展时的提示答案。关于提示的更多信息，请查看[Prompts API](/app-extensions/development-guide/prompts-api)。

## api.resolve
解析运行此应用扩展所在的应用程序中的路径。无需自行导入`path`和解析路径。

``` js
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
运行该应用扩展的 app 根目录的完整路径(String)。。

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
检查是否安装了另一个应用扩展。

```js
/**
 * 检查是否安装了另一个应用程序的扩展
 *
 * @param {string} extId
 * @return {boolean} 是否安装了该扩展。
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
* @return {string|undefined} 应用程序包的版本
  */
  console.log( api.getPackageVersion(packageName) )
  // 输出示例。
  // 1.1.3
  // 未定义 (当软件包未找到时)
```

## api.removePath
从App项目文件夹中删除一个文件或文件夹(App Extension已经安装，不再需要)。

要注意这一点，不要删除那些会破坏开发者的应用程序的文件。

文件或文件夹的路径需要是相对于项目根文件夹的。

```js
/**
  * @param {string} __path
  */
api.removePath('my-folder')
```

上面的例子从应用程序的根目录删除了 "my-folder"。

## api.getPersistentConf

获取该扩展的内部持久化配置。如果没有，则返回空对象。

```js
/**
* @return {object} cfg
  */
  api.getPersistentConf()
```

## api.onExitLog
添加一条信息，在App CLI完成卸载App Extension并即将退出时打印。可以多次调用以注册多个退出日志。

```js
/**
 * @param {string} msg
 */
api.onExitLog('感谢使用我的扩展程序')
```
