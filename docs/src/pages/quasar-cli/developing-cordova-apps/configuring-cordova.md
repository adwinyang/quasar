---
title: 配置 Cordova
desc: 如何用 Quasar CLI 管理你的 Cordova 应用程序。
related:
  - /quasar-cli/quasar-conf-js
---

我们将使用 Quasar CLI (和Cordova CLI)来开发和构建一个移动应用程序。构建SPA、PWA、Electron App或移动App之间的区别只是由 "quasar dev "和 "quasar build "命令中的 "mode "参数决定。

有两个配置文件对你的移动应用程序非常重要。我们将分别介绍一下。

## config.xml
对你的移动应用程序来说，最重要的配置文件是`/src-cordova/config.xml`。`/src-cordova`文件夹是一个 Cordova 项目，所以请参考[Cordova文档](https://cordova.apache.org/docs/en/latest/) ，以了解那里的每个文件的作用。但现在，请花些时间阅读一下[config.xml](https://cordova.apache.org/docs/en/latest/config_ref/) 。

这个文件中的一些属性将被覆盖，我们将在下一节看到。

## quasar.conf.js
 Quasar CLI 帮助你自动设置移动应用程序的一些属性(来自config.xml)：Cordova "id"，应用程序版本，描述和android-versionCode。这是为了方便，所以你可以在一个点上改变你的应用程序的版本，而不是同时接触多个文件，这样容易出错。

为了确定上述每个属性的值， Quasar CLI 。
1. 在`/quasar.conf.js`中寻找一个 "cordova "对象。它是否有 "版本"、"描述 "和/或 "androidVersionCode"？如果有，它将使用它们。
2. 如果没有，就在`/package.json`中寻找 "cordovaId"、"版本 "和 "描述 "字段。

```js
return {
  capacitor: {
    // 如果不存在，将寻找package.json > 版本
    version: '..', // string
    // 如果不存在，将寻找package.json > description
    description: '...', // string
    androidVersionCode: '..', // string

    /**
     * 即使在考虑 iOS-Cordava 问题后，也启用 Xcode 现代构建（modern build)。
     * 如果你知道自己在做什么，则可以启用它，
     * 例如，如果您想在 “build.json” 中指定构建类型
     *
     * 默认: false
     */
    noIosLegacyBuildFlag: true/false
  }
}
```

你可以配置的其他选项：

```js
return {
  framework: {
    config: {
      cordova: {
        // 在iOS移动设备上添加动态顶部填充物
        iosStatusBarPadding: true/false,

        // Quasar处理手机后退按钮的应用退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 另一方面，以下是完全
        // 禁用 Quasar 的返回按钮管理。
        backButton: true/false
      }
    }
  }
}
```
