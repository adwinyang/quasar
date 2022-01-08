---
title: 用于开发的API代理
desc: 如何在 Quasar 开发服务器上使用API代理。
related:
  - /quasar-cli/quasar-conf-js
---
当把一个项目文件夹(由 Quasar CLI 创建)与现有的后端集成时，一个常见的需求是在使用开发服务器时访问后端API。为了达到这个目的，我们可以同时运行开发服务器和API后端(或远程)，并让开发服务器代理所有的API请求到实际的后端。

如果你在API请求中访问相对路径，这很有用。很明显，这些相对路径在你开发的时候可能不会起作用。为了创建一个类似于你部署的网站/应用所使用的环境，你可以代理你的API请求。

为了配置代理规则，编辑`/quasar.conf.js`中的`devServer.proxy`。你应该参考[Webpack Dev Server Proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) docs以了解详细的用法。但这里有一个简单的示例。

```js
// quasar.conf.js

devServer: {
  proxy: {
    // 代理所有以/api开头的请求到jsonplaceholder。
    '/api': {
      target: 'http://some.api.target.com:7070',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
```

上面的示例将代理请求`/api/posts/1`到`http://some.api.target.com:7070/posts/1`。
