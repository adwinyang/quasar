---
title: 管理 Google 分析
desc: 如何在使用 Cordova 的 Quasar 混合移动应用中使用分析技术。
---
了解你的用户和测量用户行为是App开发中的一个重要步骤。不幸的是，在用 Cordova 包装你的移动应用程序后，要让Google Analytics发挥作用，需要做一些非标准的工作。在纯网络应用中设置Google Analytics是很容易的，但 Cordova 不知为何会阻止页面浏览和事件被发送到Google Analytics。

按照这个指南，在你的由 Cordova 驱动的Quasar App中实施Google Analytics。

你可能还想阅读这些伟大的教程。
- [SPA网站的 Google 标签管理器和分析设置](https://jannerantala.com/tutorials/quasar-framework-google-tag-manager-and-analytics-setup-for-an-spa-website/)
- [Google 分析设置为一个 Cordova 应用程序](https://jannerantala.com/tutorials/quasar-framework-google-analytics-setup-for-cordova-app/)

::: warning
你需要在`/src/index.template.html`中加入 Google 提供的`<script>`标签，这将使你的应用程序依赖于互联网连接！"。
:::

## 先决条件

* 确保你所有的路由都有一个指定的名称和路径参数。否则，它们不能被发布到`ga.logPage`函数中。请参考[Routing](/quasar-cli/routing) 了解更多关于路由的信息。
* 具备 Google 分析的基本知识

## 准备工作
在我们开始在你的应用程序中实施 Google Analytics之前，你需要一个[Google Analytics](https://analytics.google.com)和[Google Tagmanager](https://tagmanager.google.com/) 的账户。所以让我们先做这个。当你有了这些账户，是时候配置Tag manager了。按照这个[多元思维文章](https://www.multiminds.eu/blog/2016/12/google-analytics-and-tag-manager-with-ionic-and-cordova-apps/) 中的步骤来做。

## 将其落实到应用程序中
> 在本指南中，我们将假设你有一个固定 的sessionId，并将其发送给Google Analytics。Google Analytics 使用 sessionId 来区分不同的用户。如果你想创建一个匿名的 sessionId，请参阅[Analytics Documentation on user id](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id) 。

将 Tag Manager 片段放到你的`index.html`文件的头部(如果你关注过[多元思维文章](http://www.multiminds.eu/2016/12/06/google-analytics-tag-manager-ionic-cordova/) ，你已经有了这个。) 在你的代码库中创建一个名为 `analytics.js` 的新文件，内容如下。

```javascript
export default {
  logEvent(category, action, label, sessionId = null) {
    window.dataLayer.push({
      appEventCategory: category,
      appEventAction: action,
      appEventLabel: label,
      sessionId: sessionId
    })
    window.dataLayer.push({ 'event': 'appEvent' })
  },

  logPage(path, name, sessionId = null) {
    window.dataLayer.push({
      screenPath: path,
      screenName: name,
      sessionId: sessionId
    })
    window.dataLayer.push({ 'event': 'appScreenView' })
  }
}
```

为了确保你的应用程序中的所有页面都自动发布到 Google 分析，我们创建了一个应用程序启动文件:

```bash
$ quasar new boot google-analytics [--format ts]
```

然后我们编辑新创建的文件。`/src/boot/google-analytics.js`：

```js
import ga from 'analytics.js'

export default ({ router }) => {
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name, sessionId)
  })
}
```

最后我们在`/quasar.conf.js`中注册应用启动文件。如果我们愿意的话，我们可以只对 Cordova 包装的应用程序这样做：

```js
boot: [
  ctx.mode.cordova ? 'google-analytics' : ''
]
```

关于事件的更多信息可以在[Analytics documentation on events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events) 中找到。

当你运行你的应用程序时，你会看到事件和页面浏览量的到来。在实时视图中，通常需要5到10秒的时间来注册一个页面浏览。
