---
title: SSR 生产导出
desc: 为不同平台配置 Quasar SSR 网络服务器，包括无服务器架构。
---

::: danger
* 你需要运行在 "@quasar/app" v3.2以上才能使用这个功能。
* 这个文件只用于你的生产构建，而不是在开发时使用。
:::

注意你生成的`/src-ssr`包含一个名为`production-export.js`的文件。这个文件定义了如何为你的SSR webserver提供服务。你可以开始监听一个端口，或者为你的无服务器基础设施提供一个处理程序来使用。这由你决定。

> 无论这个函数返回什么(如果有的话)，都将从你建立的`dist/ssr/index.js`中导出。

## 剖析

`/src-ssr/production-export.[js|ts]`文件是一个简单的JavaScript文件，用于启动SSR webserver并定义webserver的输出内容(如果有输出的话)。

```js
// 在这里导入一些东西(无服务器包？)

export default ({
  app, port, isReady, ssrHandler,
  resolve, publicPath, folders, render, serve
}) => {
  // 与服务器 "应用程序 "有关的东西
  // 返回你希望你的网络服务器输出的任何东西(无服务器功能的处理程序？)
}
```

::: tip
记住，无论这个函数返回什么(如果有的话)，都将从你建立的`dist/ssr/index.js`中导出。
:::

你可以用`ssrProductionExport`帮助器包装返回的函数，以获得更好的IDE自动完成体验(需要Quasar v2.3.1+)。

```js
import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({
  app, port, isReady, ssrHandler,
  resolve, publicPath, folders, render, serve
}) => {
  // 与服务器 "应用程序 "有关的东西
  // 返回你想让你的webserver输出的任何东西(无服务器的处理程序？)
})
```

## 参数

我们在这里指的是生产-输出文件的默认输出函数所接收的作为参数的对象。

```js
export default ({
  app, port, isReady, ssrHandler,
  resolve, publicPath, folders, render, serve
}) => {
```

详述对象。

```js
{
  app,     // Expressjs app instance

  port,    // process.env.PORT or quasar.conf > ssr > prodPort

  isReady, // Function to call returning a Promise
           // 当应用程序准备好为客户服务时

  ssrHandler, // Prebuilt app handler if your serverless service
              // 并不要求以特定的方式来提供它。
              // 表格：ssrHandler (req, res, next)
              // 提示：它在引擎盖下已经使用了isReady()。

  // 下列各项都是
  // 为SSR中间件(查看其文档页面)。
  // 通常情况下，你在这里不需要这些
  // (使用真正的SSR中间件代替)
  resolve: {
    urlPath(path)
    root(arg1, arg2),
    public(arg1, arg2)
  },
  publicPath, // String
  folders: {
    root,     // String
    public    // String
  },
  render(ssrContext),
  serve: {
    static(path, opts),
    error({ err, req, res })
  }
}
```

## 默认内容

以下是在 Quasar CLI 项目中添加SSR支持时`/src-ssr/production-export.js`的默认内容。

```js
import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ app, port, isReady }) => {
  return isReady().then(() => {
    app.listen(port, () => {
      console.log('Server listening at port ' + port)
    })
  })
})
```

## 用法

::: warning
* 如果你从node_modules中导入任何东西，那么请确保该软件包在package.json > "dependencies "中指定，而不是在 "devDependencies "中。
* 这里通常不是添加中间件的地方(但你可以这样做)。通过使用[SSR Middlewares](/quasar-cli/developing-ssr/ssr-middleware)来添加中间件。你也可以将SSR中间件配置为只为开发或只为生产运行。
:::

### 在一个端口上收听

这是你在 Quasar CLI 项目中添加SSR支持时得到的默认选项。它开始监听配置的端口(process.env.PORT或quasar.conf > ssr > prodPort)。

```js
// src-ssr/production-export.[js|ts]

import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ app, port, isReady }) => {
  // 我们等待应用程序准备就绪(包括运行所有SSR中间件)。
  return isReady().then(() => {
    // 然后我们开始在一个端口上监听
    app.listen(port, () => {
      // 我们已准备好为客户服务
      console.log('Server listening at port ' + port)
    })
  })
})
```

### 无服务器

如果你有一个无服务器的基础设施，那么你一般需要导出一个处理程序，而不是开始监听一个端口。

比方说，你的无服务器服务需要你。

```js
module.exports.handler = __your_handler__
```

那么你需要做的是：

```js
// src-ssr/production-export.[js|ts]

import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ ssrHandler }) => {
  // "ssrHandler "是一个预先构建的处理程序，它已经
  // 在为客户提供服务之前，等待所有中间程序的运行。

  // 无论你在这里返回什么，都等同于module.exports.<key> = <value>。
  return { handler: ssrHandler }
})
```

请注意，提供的`ssrHandler'是一个形式的函数。`(req, res, next) => void`。
如果你需要输出一个"(event, context, callback) => void "形式的处理程序，那么你很可能需要使用 "serverless-http "包(见下文)。

#### 示例：serverless-http

```js
// src-ssr/production-export.[js|ts]

import serverless from 'serverless-http'
import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ ssrHandler }) => {
  return { handler: serverless(ssrHandler) }
})
```

#### 示例。Firebase函数

```js
// src-ssr/production-export.[js|ts]

import * as functions from 'firebase-functions'
import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ ssrHandler }) => {
  return {
    handler: functions.https.onRequest(ssrHandler)
  }
})
```
