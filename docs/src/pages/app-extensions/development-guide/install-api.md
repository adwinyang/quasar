---
title: 应用扩展(App Extension)安装 API
desc: Quasar 应用扩展脚本 API。通过渲染或更改文件等来初始化应用程序空间。
---

此页面引用安装应用扩展时执行的 `src/install.js` 文件。并非所有应用扩展都需要安装 —— 这是一个可选步骤。

文件的基本结构示例：


```js
module.exports = function(api) {
  // “api” 对象的属性和方法，描述如下
}
```

## api.extId
该应用扩展中(App Extension)包含的`ext-id'(String)。

## api.prompts
是一个对象，该对象具有安装此应用扩展时的提示答案。有关提示的更多信息，请查看 [Prompts API](/app-extensions/development-guide/prompts-api)。

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
检查另一个应用扩展是否已安装npm，并且Quasar CLI已调用它。

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
````

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
`

## api.extendPackageJson
使用新属性(props) 扩展 package.json 的辅助方法。如果指定现有属性，**它将覆盖**它们。

```js
/**
 * @param {object|string} extPkg - 要扩展的对象或 JSON 文件的相对路径
 */
api.extendPackageJson({
  scripts: {
    'electron': 'quasar dev -m electron'
  }
})
```

上面的例子在应用程序的 package.json 中添加了一个 npm 脚本，这样你就可以执行 `yarn electron`(或等效的 `npm run electron`)。

## api.extendJsonFile
使用新属性扩展 JSON 文件(深度合并)。如果指定现有属性，它将覆盖它们。

```js
/**
 * @param {string} 文件(应用根文件夹的相对路径)
 * @param {object} newData(要合并的对象)
 */
api.extendJsonFile('src/some.json', {
  newProp: 'some-value'
})
```

## api.render
将应用扩展模板中的文件夹(您指定的任何文件夹)渲染(复制)到应用的根目录中。保持与模板文件夹相同的文件夹结构。

如果应用程序中已经存在某些文件，那么它会询问用户是否应该覆盖它们。

需要调用 render() 的文件所在文件夹的相对路径。

```js
/**
 * 将一个文件夹从扩展模板渲染到 devland
 * 需要一个相对于调用 render() 的文件路径的路径(到文件夹)
 *
 * @param {string} templatePath(要在应用程序中渲染的文件夹的相对路径)
 * @param {object} 范围(可选；渲染范围变量)
 */
api.render('./path/to/a/template/folder')
```

### 文件名边缘情况
如果要渲染以点开头的模板文件(即 .env)，则必须遵循特定的命名约定，因为在将插件发布到 npm 时会忽略点文件：

```bash
# 包含点文件的模板必须使用
# 下划线而不是名称中的点：

some-floder/_env

# 当调用 api.render('./some-folder') 时，将在项目文件夹中呈现为：

/.env
```

如果要渲染名称实际上以下划线开头的文件，那么文件名必须以`__`开头(两个下划线字符而不是一个)：

```bash
same-floder/__my.css

# 当调用 api.render('./template') 时， 将在项目文件夹中呈现为：

/_my.css
```

### 使用范围
您还可以通过使用 [lodash.template](https://www.npmjs.com/package/lodash.template) 语法插入一些决策代码到要渲染的文件中。

例子：

```js
// src/install.js
//(my-floder 位于与以下调用文件相同的文件夹中)
api.render('./my-folder', {
  prompts: api.prompts
})
```

假设我们也使用 [Prompts API](/app-extensions/development-guide/prompts-api) 文件。它询问用户是否需要“Feature X”并将答案存储在名为“featureX”的变量中。

在渲染过程中，我们可以对渲染的文件外观做出一些变更。这样就不需要创建两个文件夹，并根据某些决策来决定渲染哪个文件。

```js
// src/my-folder/some-file.js

<% if (prompts.featureX) { %>
const message = '这是 “Feature X” 存在时的内容'
<% } else { %>
const message = '这是我们没有 “Feautre X” 时的内容'
<%} %>
```

可能性仅受您的想象力的限制。

## api.renderFile

与 api.render() 类似，不同之处在于此方法渲染单个文件。

```js
/**
 * 将一个文件从扩展模板渲染成 devland
 * 需要一个相对于调用 renderFile() 的文件路径的路径(指向一个文件)
 *
 * @param {string} relativeSourcePath(相对于调用安装脚本的文件夹的文件路径)
 * @param {string} relativeTargetPath(相对于应用根目录的文件路径 —— 包括文件名！)
 * @param {object} 范围(可选；渲染范围变量)
 */
api.renderFile('./path/to/a/template/filename', 'path/relative/to/app/root/filename', {
  prompts：api.prompts
})

api.renderFile('./my-file.json', 'src/my-file.json')
```

## api.getPersistentConf

获取此扩展的内部持久化配置。如果没有，则返回空对象。

```js
/**
 * @return {object} cfg
 */
api.getPersistentConf()
```

## api.setPersistentConf

设置此扩展的内部持久化配置。如果它已经存在，则会被覆盖。

```js
/**
 * @param {object} cfg
 */
api.setPersistentConf({
  // ....
})
```

## api.mergePersistentConf

深入合并到此扩展的内部持久化配置中。如果扩展还没未进行任何配置，则相当于第一次设置它。

```js
/**
 * @param {object} cfg
 */
api.mergePersistentConf({
  // ....
})
```

## api.onExitLog
添加一条消息，在 App CLI 完成安装应用扩展并将退出后打印。可以多次调用以注册多个退出日志。

```js
/**
 * @param {string} msg
 */
api.onExitLog('感谢安装我 awesome 扩展')
```
