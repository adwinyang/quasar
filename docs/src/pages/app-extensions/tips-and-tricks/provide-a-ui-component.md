---
title: 提供一个UI组件
desc: 关于如何向Quasar应用扩展的主机应用提供Vue组件的技巧和窍门。
---

本指南适用于您想要创建新的 UI 组件并通过 App Extension 提供它的情况，该 App Extension 会将其注入到宿主应用程序中(托管应用程序中)。

::: tip
要创建一个App Extension项目文件夹，请先阅读[开发指南>简介](/app-extensions/development-guide/introduction)。
:::

::: tip Full Example
要查看我们将构建的示例，请转到 [MyComponent 完整示例](https://github.com/quasarframework/app-extension-examples/tree/v2/my-component)，这是一个 GitHub 存储库这个应用扩展。
:::

创建一个文件夹结构，以保持你的代码模块化和结构化。例如，对于一个 UI 组件，创建一个看起来像这样的结构：

```bash
.
├── package.json
└── src
    └── boot # 包含 "启动 "代码的文件夹
    │ └── register-my-component.js # 组件的启动文件
    ├── component # 包含组件的文件夹
    │ └──MyComponent.vue # 组件文件(可以是.vue，也可以是.js)。
    │ └──MyComponent.sass # 组件的sass文件(或.scss/.css，或任何你需要的)。
    └── index.js # 索引API中描述的内容
```

现在，你需要处理注册你的组件。你用 `/index.js` 文件(在[Index API](/app-extensions/development-guide/index-api)中描述)来做，这个文件是在你设置新的App Extension时创建的。

让我们分解一下。

```js
// file: /index.js
module.exports = function (api) {
  // (可选！)。
  // Quasar兼容性检查；你可能需要
  // 硬性依赖，如最小版本的 "quasar"
  // 或最低版本的 "@quasar/app" CLI。
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  // 这里我们扩展了/quasar.conf.js，所以我们可以添加
  // 一个启动文件，该文件注册了我们的新UI组件。
  // "extendConf" 将在下面定义(继续阅读教程)
  api.extendQuasarConf(extendConf)
}
```

第一组做了与 Quasar 的兼容性检查(这是可选的，但建议使用)。如果你的组件使用的Quasar功能是在某个版本之后才有的，你可以确保安装的Quasar版本是正确的。

:: tip
你不仅可以做 `api.compatibleWith()` 来检查Quasar软件包，还可以检查任何其他可用的软件包(你没有通过你的App Extension自己提供)。请阅读App Extension Development Guide > Introduction页面中的[Handling package-dependencies](/app-extensions/development-guide/introduction#handling-package-dependencies)部分以了解更多信息。
:::

第二组告诉Quasar在 `extendQuasarConf` CLI 生命周期钩子被调用时调用我们的自定义函数。它看起来会像这样:

```js
//文件: /index.js
function extendConf (conf) {
  // 确保我的组件的启动文件被注册了
  conf.boot.push('~quasar-app-extension-my-component/src/boot/register-my-component.js')

  // 确保启动和组件文件被转译
  conf.build.transpileDependencies.push(/quasar-app-extension-my-component[/\/]src/)

  // 确保 my-component 的 css 通过 webpack，以避免ssr问题
  conf.css.push('~quasar-app-extension-my-component/src/component/MyComponent.sass')
}
```

最后，让我们看看启动文件会是什么样子。请确保你先阅读[Boot files](/quasar-cli/boot-files)文档，了解什么是 Boot 文件。

```js
// file: /src/boot/register-my-component.js
import MyComponent from '../component/MyComponent.vue'

// 我们在全局范围内向Vue注册我们的组件
export default ({ app }) => {
  app.component('my-component', MyComponent)
}
```
