---
title: 配置电容
desc: 如何用Quasar CLI来管理你的Capacitor应用程序。
related:
  - /quasar-cli/quasar-conf-js
---

我们将使用Quasar CLI来开发和构建一个移动应用程序。构建SPA、PWA、Electron App或移动App之间的区别只是由 "quasar dev "和 "quasar build "命令中的 "mode "参数决定。

有两个配置文件对你的移动应用程序非常重要。我们将分别介绍一下。

## capacitor.config.json
对你的移动应用程序来说，最重要的配置文件是`/src-capacitor/capacitor.config.json`。`/src-capacitor`文件夹是一个Capacitor项目，所以请参考[Capacitor文档](https://capacitor.ionicframework.com)，以了解那里的每个文件的作用。但是现在，请花点时间阅读一下[capacitor.config.json](https://capacitor.ionicframework.com/docs/basics/configuring-your-app/)。

这个文件中的一些属性将被覆盖，我们将在下一节看到。

## quasar.conf.js
在`/quasar.conf.js`中，有两个地方你可以为电容配置Quasar的特定功能。

```js
return {
  capacitor: {
    // (可选！)
    hideSplashscreen: false, // disables auto-hiding the Splashscreen by Quasar CLI

    // (可选！)
    capacitorCliPreparationParams: [ 'sync', ctx.targetName ],

    // (可选)如果不存在，将寻找package.json > name
    appName: '...', // string
    // (可选)如果不存在，将寻找package.json > 版本
    version: '...', // string
    // (可选)如果不存在，将寻找package.json > description
    description: '...', // string
  }
}
```

而且你还可以进行配置。

```js
return {
  framework: {
    config: {
      capacitor: {
        iosStatusBarPadding: true/false, // add the dynamic top padding on iOS mobile devices
      }
    }
  }
}
```

最后，你还可以禁用或配置返回按钮钩(用于对话框)。

```js
return {
  framework: {
    config: {
      capacitor: {
        // Quasar处理手机后退按钮的应用退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 另一方面，以下是完全
        // 禁用Quasar的返回按钮管理。
        backButton: true/false
      }
    }
  }
}
```
