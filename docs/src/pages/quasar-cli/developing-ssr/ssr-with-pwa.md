---
title: 带有PWA客户接管的SSR
desc: 如何配置你的Quasar服务器端渲染的应用程序，使之成为客户端的渐进式Web应用程序。
---
通过Quasar CLI，你可以用SSR+PWA的杀手锏来构建你的应用程序。为了在SSR构建中启用PWA，你需要首先编辑你的`/quasar.conf.js`。

```js
// quasar.conf.js
return {
  // ...
  ssr: {
    pwa: true
  }
}
```

一个**新的**客户端的第一个请求将由webserver提供(所以SSR提供初始页面内容)。PWA会被安装，然后它就会在客户端接管。所有进一步的请求将由缓存提供(除非你有一些自定义配置来改变)。

> 关于PWA的更多信息，请前往[PWA介绍](/quasar-cli/developing-pwa/introduction)并阅读整个PWA指南部分。
