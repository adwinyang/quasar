---
title: SSR中间件
desc: 在 Quasar 应用程序中管理SSR中间件。
related:
  - /quasar-cli/quasar-conf-js
---

SSR中间件文件实现了一个特殊的目的：它们为运行SSR应用程序的Nodejs服务器准备了额外的功能(兼容Expressjs的中间件)。

通过SSR中间件文件，可以将中间件逻辑分割成独立的、易于维护的文件。禁用任何SSR中间件文件，甚至通过`quasar.conf.js`配置来决定哪些SSR中间件文件进入构建，也是非常简单的。

::: tip
对于更高级的使用，你将需要熟悉[Expressjs API](https://expressjs.com/en/4x/api.html) 。
:::

::: warning
你将需要至少一个SSR中间件文件来处理用Vue渲染的页面(它应该被定位在中间件列表的最后一个)。当SSR模式被添加到你的 Quasar CLI 项目中时，它将被架设到`src-ssr/middlewares/render.js`。
:::

## 中间件文件的剖析

SSR中间件文件是一个简单的JavaScript文件，它导出了一个函数。Quasar在准备Nodejs服务器(Expressjs)应用程序时将调用导出的函数，并另外传递一个Object作为参数(将在下一节中详细说明)。

```js
// 在此输入一些东西

export default ({ app, resolve, publicPath, folders, render, serve }) => {
  // 与服务器 "应用程序 "有关的东西
}
```

SSR中间件文件也可以是异步的：

```js
// 在此输入一些东西

export default async ({ app, resolve, publicPath, folders, render, serve }) => {
  // 与服务器 "应用程序 "有关的东西
  await something()
}
```

你可以用`ssrMiddleware`帮助器包装返回的函数，以获得更好的IDE自动完成体验(通过Typescript)：

```js
import { ssrMiddleware } from 'quasar/wrappers'

export default ssrMiddleware(async ({ app, resolve, publicPath, folders, render, serve }) => {
  // 有事可做
  await something()
})
```

注意我们使用的是[ES6结构化赋值](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)。只赋值你实际需要/使用的东西。

## 中间件对象参数

我们在这里指的是由SSR中间件文件的默认导出函数作为参数接收的对象。

```js
export default ({ app, resolve, publicPath, folders, render, serve }) => {
```

详细说明对象：

```js
{
  app, // Expressjs app instance
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

#### 应用程序

这是Expressjs的应用实例。任何中间件的 "面包和黄油"，因为你将用它来配置网络服务器。

#### 解析

| 属性名 | 描述 |
| --- | --- |
| `urlPath(path)` 每当你定义一个路由(用app.use(), app.get(), app.post()等)，你应该使用`resolve.urlPath()`方法，这样你也会考虑到配置的publicPath(quasar.conf.js > build > publicPath)。|
| `root(path1[, path2, ...pathN])` | 解决文件夹路径到根(开发中的项目和生产中的可分发文件)。在系统内部，它做了一个`path.join()`。|
| `public(path1[, path2, ...pathN])` | 将文件夹路径解析到 "public "文件夹。在引擎中，它做了一个`path.join()`。|

#### publicPath

配置的 quasar.conf.js > build > publicPath

#### folders

有时需要使用`folders`，因为在生产构建中，根文件夹和公共文件夹的确切路径与开发构建中不同。所以通过使用`folders`，你就不需要在意这些了。

| 属性名 | 描述 |
| --- | --- |
| `root` | 根部的完整路径(开发中的项目和生产中的可分发文件)。|
| `public` | "public "文件夹的完整路径。|

#### 渲染

* 语法： `<Promise(String)> render.vue(ssrContext)`.
* 描述： 使用Vue和Vue Router来渲染请求的URL路径。返回渲染后的HTML字符串以返回给客户端。


#### service

service.static()。

* 语法：`<middlewareFn> serve.static(pathFromPublicFolder, opts)`。
* 描述：它本质上是对`express.static()`的一个封装，并做了一些方便的调整：
  * `pathFromPublicFolder`是一个解析到 "公共 "文件夹的路径。
  * `opts`与`express.static()`的相同。
  * `opts.maxAge`是默认使用的，考虑到quasar.conf.js > ssr > maxAge配置；这设置了相关文件在浏览器缓存中的生存时间

  ```js
  service.static('my-file.json')

  // 相当于：

  express.static(resolve.public('my-file.json'), {
    maxAge: ... // quasar.conf.js > ssr > maxAge
  })
  ```

serve.error()。
* 语法：`<void> render.error({ err, req, res })`。
* 描述：显示大量有用的调试信息(包括堆栈跟踪)。

* 它只在开发中可用，**不在生产中**。

## SSR中间件的使用

第一步是使用 Quasar CLI 生成一个新的SSR中间件文件。

```bash
$ quasar new ssrmiddleware <name>
```

其中`<name>`应该由你的SSR中间件文件的一个合适的名字来代替。

这个命令创建了一个新文件。`/src-ssr/middlewares/<name>.js`，内容如下：

```js
// 在此导入一些东西

// "async "是可选的!
// 不需要的时候就去掉它
export default async ({ app resolveUrlPath, publicPath, folders, render }) => {
  // 与服务器 "应用程序 "有关的东西
}
```

你也可以返回一个Promise:

```js
// 在此输入一些东西

export default ({ app, resolve, publicPath, folders, render, serve }) => {
  return new Promise((resolve, reject) => {
    // 与服务器 "应用程序 "有关的东西
  })
}
```

现在你可以根据你的SSR中间件文件的预期用途向该文件添加内容。

最后一步是告诉 Quasar 使用你的新SSR中间件文件。要做到这一点，你需要在`/quasar.conf.js`中添加该文件

```js
// quasar.conf.js

ssr: {
  middlewares: [
    // 参考 /src-ssr/middlewares/<name>.js
    '<name>'
  ]
}
```

当建立一个SSR应用时，你可能希望一些启动文件只在生产或只在开发上运行，在这种情况下，你可以像下面这样做：

```js
// quasar.conf.js

ssr: {
  middlewares: [
    ctx.prod ? '<name>' : '', // 我只在生产中运行！
    ctx.dev ? '<name>' : '' // 我只在开发中运行
  ]
}
```

如果你想从node_modules中指定SSR中间件文件，你可以通过在路径前加上`~`(tilde)字符来实现：

```js
// quasar.conf.js

ssr: {
  middlewares: [
    // 从一个npm包中启动文件
    '~my-npm-package/some/file'
  ]
}
```

::: warning
你指定SSR中间件的顺序很重要，因为它决定了中间件应用于Nodejs服务器的方式。因此，它们会影响它对客户端的响应方式。
:::

## ###SSR的渲染中间件

::: danger 重要!
在你的应用程序中所有可能的SSR中间件中，**这个是绝对需要的**，因为它用Vue处理实际的SSR渲染。
:::

在下面的示例中，我们强调这个中间件需要放在列表的最后。这是因为它也会向客户端响应(正如我们在下面的第二个代码示例中看到的那样)，提供页面的HTML。因此，任何后续的中间件都不能设置头文件。

```js
// quasar.conf.js

ssr: {
  middlewares: [
    // ..... 所有其他中间件

    'render' // references /src-ssr/middlewares/render.js;
             // 你可以随心所欲地为文件命名。
             // 只要确保它作为最后一个中间件运行就可以了
  ]
}
```

现在让我们看看它包含什么：

```js
// src-ssr/middlewares/render.js

// 这个中间件应该作为最后一个执行
// 因为它捕捉到了一切，并试图
// 用Vue渲染页面

export default ({ app, resolve, render, serve }) => {
  // 我们捕获任何其他快递路线并将其交给
  // 转到Vue和Vue Router来渲染我们的页面
  app.get(resolve.urlPath('*'), (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    render({ req, res })
      .then(html => {
        // 现在让我们把渲染好的html发送到客户端
        res.send(html)
      })
      .catch(err => {
        // 哎呀，我们在渲染页面时出现了一个错误

        // 我们被告知要重定向到另一个URL
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url)
          }
          else {
            res.redirect(err.url)
          }
        }
        // 嗯，Vue Router找不到请求的路由
        else if (err.code === 404) {
          // 只有在没有 "总括 "路线的情况下，才应到达这里。
          // 是在/src/routes中定义的。
          res.status(404).send('404 | Page Not Found')
        }
        // 那么，我们把任何其他代码都视为错误。
        // 如果我们是在开发模式下，那么我们可以使用Quasar CLI
        // 以显示一个漂亮的错误页面，其中包含堆栈
        // 和其他有用的信息
        else if (process.env.DEV) {
          // service.error仅在dev上可用
          serve.error({ err, req, res })
        }
        // 我们在生产中，所以我们应该有另一种方法
        // 当我们遇到错误时，向客户端显示一些东西
        // (出于安全原因，显示相同的财富是不可以的。
        // 的信息，正如我们在开发中所做的那样)
        else {
          // 在生产过程中呈现错误页面或
          // 为错误页面创建一个路由(/src/routes)并重定向到它
          res.status(500).send('500 | Internal Server Error')
        }
      })
  })
}
```

注意中间件的导出函数被调用的`render`参数(来自上面的代码样本)。这就是发生SSR渲染的地方。

## 热模块重新加载

在开发过程中，每当你改变SSR中间件中的任何内容，Quasar App CLI将自动触发客户端资源的重新编译，并将中间件的变化应用到Nodejs服务器(Expressjs)。

## SSR中间件的示例

::: tip
你可以使用任何兼容Expressjs的中间件。
:::

### 压缩

这个有意义，只用于生产。

```js
import compression from 'compression'

export default ({ app }) => {
  app.use(
    compression({ threshold: 0 })
  )
}
```

### 记录器/拦截器

应用SSR中间件的顺序很重要。因此，明智的做法是将下面这个设置为第一个(在quasar.conf.js > ssr > middlewares中)，这样它就能够拦截所有的客户端请求。

```js
export default ({ app, resolve }) => {
  app.all(resolve.urlPath('*'), (req, _, next) => {
    console.log('someone requested:', req.url)
    next()
  })
}
```
