---
title: 处理服务工作者
desc: 如何在Quasar Progressive Web App中配置服务工作者。
---
在这里，你将学习如何在你的网站/应用程序空间内与服务工作者互动。记住，**服务工作者必须通过HTTPS提供服务**。

值得注意的是，服务工作器(由Workbox自动生成--或者你已经将 Quasar CLI 配置为使用你的自定义服务工作器)在一个单独的线程中运行。然而，你可以从应用空间中的`/src-pwa/register-service-worker.js`文件中与它进行交互。

## 与服务工作者互动

注意[register-service-worker](https://github.com/yyx990803/register-service-worker) npm包，它与 Quasar CLI 一起开箱即用(所以不要自己安装)。

```js
// src-pwa/register-service-worker.js文件

import { register } from 'register-service-worker'

register(process.env.SERVICE_WORKER_FILE, {
  ready (registration) {
    console.log('Service worker is active.')
  },

  registered (registration) {
    console.log('Service worker has been registered.')
  },

  cached (registration) {
    console.log('Content has been cached for offline use.')
  },

  updatefound (registration) {
    console.log('New content is downloading.')
  },

  updated (registration) {
    console.log('New content is available; please refresh.')
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
```

::: tip
这个文件会被 Quasar CLI 自动捆绑到你的网站/应用程序中，因为它被认为是应用程序空间`/src`的一部分。这意味着你可以使用ES6，导入其他文件等。
:::

## SSL证书

你可能会注意到，在一些开发环境中，如果你没有使用HTTPS来提供服务，Workbox在`quasar dev`期间不会加载你的服务工作者，即使是在localhost上。你会看到有两个脚本无法加载。Chrome浏览器的控制台对这个问题相对保密，但Firefox告诉你发生了什么。你有三个选择：。
- 设置 quasar.conf.js > devServer > `https: true`。
- 设置一个从localhost到127.0.0.1的环路(但这并不是没有安全问题)。
- 通过ngrok为你的localhost服务，并使用ngrok提供的https地址。

当你在quasar.conf.js文件中设置`devServer > https: true`时，Quasar将为你自动生成一个SSL证书。然而，如果你想自己为你的本地主机创建一个，那么请查看[Filippo](https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/)的这篇博文。然后你的`quasar.conf.js > devServer > https`应该是这样的：

```js
// quasar.conf.js

devServer: {
  server: {
    type: 'https', // NECESSARY

    options: {
      // 使用ABSOLUTE路径或path.join(__dirname, 'root/relative/path')。
      key: "/path/to/server.key",
      pfx: "/path/to/server.pfx",
      cert: "/path/to/server.crt",
      ca: "/path/to/ca.pem",
      passphrase: 'webpack-dev-server' // do you need it?
    }
  }
}
```

## 重要的主机配置

重要的是，你不允许浏览器缓存`service-worker.js`文件。因为否则的话，这个文件或你的应用程序的更新可能会让那些从缓存中加载service-worker的浏览器漏掉。

这就是为什么你必须始终确保添加`"Cache-Control": "no-cache"`到`service-worker.js`文件的标题中，通过你的主机服务。

以Google Firebase为例，你可以在`firebase.json`配置中添加以下内容：

```json
{
  "hosting": {
    "headers": [
      { "source":"/service-worker.js", "headers": [{"key": "Cache-Control", "value": "no-cache"}] }
    ]
  }
}
```
