---
title: 处理 process.env
desc: 如何在 Quasar 应用程序中根据process.env来区分运行时程序。
---

访问`process.env`可以在很多方面帮助你。
  * 根据 Quasar 模式(SPA/PWA/Cordova/Electron)区分运行程序。
  * 根据运行的是开发还是生产版本来区分运行过程
  * 在构建时根据终端环境变量添加标志。

## 由 Quasar CLI 提供的值

| 名称 | 类型 | 意义 |
| --- | --- | --- |
| `process.env.DEV` | Boolean | 代码在开发模式下运行 |
| `process.env.PROD` | Boolean | 代码在生产模式下运行 |
| `process.env.DEBUGGING` | Boolean | 代码在开发模式下运行或为生产模式设置了`--调试`标志 |
| `process.env.CLIENT` | Boolean | 代码在客户端运行(不在服务器上)。 |
| `process.env.SERVER` | Boolean | 代码在服务器上运行(而不是在客户端)。 |
| `process.env.MODE` | String |  Quasar CLI 模式(`spa`, `pwa`, ...) |
| `process.env.NODE_ENV` | String | 有两个可能的值。有两个可能的值："生产 "或 "开发"。 |

## 示例

```js
if (process.env.DEV) {
  console.log(`I'm on a development build`)
}

// process.env.MODE为<mode>中的<mode>。
// "quasar dev/build -m <mode>"
// (如果没有指定-m参数，则默认为'spa')。
if (process.env.MODE === 'electron') {
  const { BrowserWindow } = require('@electron/remote')
  const win = BrowserWindow.getFocusedWindow()

  if (win.isMaximized()) {
    win.unmaximize()
  }
  else {
    win.maximize()
  }
}
```

## 剥离代码

当编译你的网站/应用程序时，取决于process.env的`if()`分支会被评估，如果表达式是`false`，那么它们会被从文件中剥离出来。例如：

```js
if (process.env.DEV) {
  console.log('dev')
}
else {
  console.log('build')
}

// 用 "quasar dev "运行将导致。
console.log('dev')
// 而用 "quasar build "运行将导致。
console.log('build')
```

请注意，上面的'if'是经过计算的，并且在编译时被完全剥离，从而生成一个更小的包。

## 基于 process.env 的导入

你可以把你在上面一节学到的东西和动态导入结合起来。

```js
if (process.env.MODE === 'electron') {
  import('my-fancy-npm-package').then(package => {
    // 请注意下面的 "默认"，这是一个属性，它的作用是
    // 你可以访问你的npm导入包所导出的内容
    package.default.doSomething()
  })
}
```

## 添加到 process.env 中

你可以通过`/quasar.conf.js`文件向`process.env`添加自己的定义。

但首先，这里有两个概念需要理解。来自终端的环境变量在`/quasar.conf.js`文件本身中可用，以及你传递给你的UI代码的环境变量。

```js
// quasar.conf.js

// 访问终端变量
console.log(process.env)

module.exports = function (ctx) {
  return {
    // ...

    build: {
      // 从quasar.conf.js传递到用户界面代码
      env: {
        API: ctx.dev
          ? 'https://dev.api.com'
          : 'https://prod.api.com'
      }
    }
  }
}
```

然后在你的网站/应用程序中，你可以访问`process.env.API`，它将根据开发或生产构建类型，指向上述两个链接之一。

你甚至可以再往前走一步。给它提供从`quasar dev/build`环境变量中提取的值。

```
# we set an env variable in terminal
$ MY_API=api.com quasar build

# then we pick it up in /quasar.conf.js
build: {
  env: {
    API: ctx.dev
      ? 'https://dev.' + process.env.MY_API
      : 'https://prod.' + process.env.MY_API
  }
}
```

#### 使用 .env

如果你想使用`.env`文件，你甚至可以使用[dotenv](https://www.npmjs.com/package/dotenv)包。下面只是一个示例，它将env变量从终端传递到你的UI应用代码中。

```bash
$ yarn add --dev dotenv
```

然后在你的 `/quasar.conf.js`中。

```
build: {
  env: require('dotenv').config().parsed
}
```

请务必阅读[dotenv文档](https://www.npmjs.com/package/dotenv)并在 Quasar CLI 项目的根目录下创建必要的.env文件。

## 注意事项

1. 不要使用 "console.log(process) "或 "console.log(process.env)"，出于安全考虑，这将会出错。
2. 另外，假设你定义了

   ```js
   env: {
     my: { prop: 'value' }
   }
   ```

  ...那么`console.log(process.env.my)`也会出错。只有你的定义(`process.env.my.prop`)的 "full path" 会在你的代码中被替换。
