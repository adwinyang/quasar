---
title: 注入 Quasar 插件
desc：关于如何使用 Quasar 应用扩展来配置主机应用以使用 Quasar 插件的技巧和窍门。
---

本指南适用于当你想确保将[Quasar Plugin](/quasar-plugins)注入到托管应用程序的情况，因为依赖它来使你自己的应用扩展工作。

::: tip
要创建应用程序扩展项目文件夹，请先阅读[开发指南>简介]（/App extensions/Development Guide/Introduction）。
:::

::: tip Full Example
要查看我们构建的示例，请转到 [完整示例](https://github.com/quasarframework/app-extension-examples/v2/master/inject-quasar-plugin)，这是一个 GitHub 存储库，里面有这个应用扩展（App Extension)。
:::

我们只需要 /index.js 脚本，因为我们可以使用[Index API](/app-extensions/development-guide/index-api)配置主机应用中的 quasar.conf.js，
用来包含我们需要的 Quasar 插件。

```bash
.
├── package.json
└── src
└── index.js # 在 Index API 中描述的内容
```

/index.js 看起来像这样:

```js
// 文件： /index.js
module.exports = function (api) {
  // （可选！）。
  // Quasar兼容性检查；你可能需要
  // 硬性依赖，如最小版本的 "quasar"
  // 或最低版本的"@quasar/app" CLI。
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  // 这里我们扩展了 /quasar.conf.js，所以我们可以添加
  // 一个引导文件，它注册了我们新的Vue指令;
  // "extendConf "将被定义在下面（继续阅读此教程）
  api.extendQuasarConf(extendConf)
}
```

我们的 "extendConf "方法，在上述同一文件中:

```js
// 文件: /index.js
function extendConf (conf) {
  // 我们推送到 /quasar.conf.js > framework > plugins。
  conf.framework.plugins.push('AppVisibility')
}
```


