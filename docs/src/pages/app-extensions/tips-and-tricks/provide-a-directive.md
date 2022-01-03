---
title: 提供一个指令
desc: 关于如何向 Quasar应用扩展的主机应用提供 Vue 指令的技巧和窍门。
---

本指南适用于您希望创建新指令并通过应用扩展提供指令的情况，应用扩展会将指令注入宿主应用程序中(托管应用程序中)。

::: tip
要创建一个App Extension项目文件夹，请先阅读[开发指南>简介](/app-extensions/development-guide/introduction)。
:::

::: tip Full Example
要查看我们将构建的示例，请转到 [MyDirective 完整示例](https://github.com/quasarframework/app-extension-examples/tree/v2/my-directive)，这是一个 GitHub 存储库，含有这个应用扩展。
:::

创建一个文件夹结构，以保持你的代码模块化和结构化。例如，对于一个指令，创建一个像这样的结构：

```bash
.
├── package.json
└── src
    ├── boot # 包含 "启动" 代码的文件夹
    │ └── register-my-directive.js # 组件的启动文件
    ├── directive # 包含组件的文件夹
    │ └── MyDirective.js # 指令文件
    └── index.js # 在 Index API 中描述的内容
```

现在，你需要处理注册你的Vue指令。你可以通过`/index.js`文件(在[Index API](/app-extensions/development-guide/index-api)中描述)来完成，这个文件是在你设置新 App Extension 时创建的。

让我们分解一下：

```js
//文件。/index.js
module.exports = function (api) {
  // (可选！)。
  // Quasar兼容性检查；你可能需要
  // 硬性依赖，如最小版本的 "quasar"
  // 或最低版本的"@quasar/app" CLI。
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  // 这里我们扩展了 /quasar.conf.js，所以我们可以添加
  // 一个引导文件，它注册了我们新的Vue指令。
  // "extendConf "将被定义在下面(继续阅读教程)
  api.extendQuasarConf(extendConf)
}
```

第一组是做与Quasar的兼容性检查(可选，但推建)。如果你的组件使用的Quasar功能是在某个版本之后才有的，你可以确保安装的Quasar版本是正确的。

::: tip
你不仅可以做`api.compatibleWith()`来检查Quasar软件包，还可以检查任何其他可用的软件包(你没有通过你的App Extension自己提供)。请阅读App Extension Development Guide > Introduction页面中的[Handling package-dependencies](/app-extensions/development-guide/introduction#handling-package-dependencies)部分以了解更多信息。
:::

第二组告诉Quasar在 `extendQuasarConf` CLI生命周期钩子被调用时调用我们的自定义函数。它看起来会像这样。

```js
//文件: /index.js
function extendConf (conf) {
  // 确保my-directive引导文件已被注册
  conf.boot.push('~quasar-app-extension-my-directive/src/boot/register-my-directive.js')

  // 确保启动和其他文件被转译
  conf.build.transpileDependencies.push(/quasar-app-extension-my-directive[/\/]src/)
}
```

最后，让我们看看启动文件会是什么样子。请确保你先阅读[Boot files](/quasar-cli/boot-files)文档，了解什么是Boot文件。

```js
// file: /src/boot/my-directive.js
import MyDirective from '../directive/MyDirective.js'

// 我们向Vue全局注册我们的指令。
// 记住，Vue中的所有指令都以 "v-"开头。
// 但这不应该是你指令名称的一部分。
// https://v3.vuejs.org/guide/custom-directive.html#custom-directives
// 'my-directive'将被作为'v-my-directive'使用
export default ({ app }) => {
  app.directive('my-directive', MyDirective)
}
```
