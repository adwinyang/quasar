---
title: Quasar CLI
desc: 如何使用Quasar CLI，免费的高级开发者体验。
---

Quasar CLI是Quasar框架的骄傲。你可以无缝地构建。

* 一个SPA(单页应用程序/网站)。
* SSR(服务器端渲染的应用程序/网站)。
* PWA(渐进式网络应用程序)。
* BEX(浏览器扩展)。
* 一个移动应用程序(通过Cordova)。
* 一个Electron App

...在同一个项目文件夹中，确保你**遵循最好的Quasar实践，同时所有的东西都能开箱即用**。

<q-btn push no-caps color="brand-primary" ic-right=" launch" label="Install Quasar CLI" to="/quasar-cli/installation" class="q-mt-md" />

## 包括哪些内容

在使用开发服务器(`$ quasar dev`)进行开发时。

* Babel，因此你可以编写ES6代码
* Webpack + vue-loader用于Vue SFC(单文件组件)。
* 保存状态的热重载
* 保留状态的编译错误覆盖
* 带有ESLint的Lint-on-save
* 源地图
* 如果你的目标是移动应用程序，可以在设备模拟器(或连接到你的机器上的真实手机)上直接开发。
* 如果你的目标是一个Electron应用程序，可以在一个带有开发工具的Electron窗口上直接开发。
* ...更多

为生产开发(`$ quasar build`)。

* 用[UglifyJS](https://github.com/mishoo/UglifyJS2)对Javascript进行最小化。
* 用[html-minifier](https://github.com/kangax/html-minifier)对HTML进行压缩
* 所有组件的CSS都被提取(并自动添加前缀)到一个文件中，并用[cssnano](https://github.com/ben-eb/cssnano)进行粉碎。
* 所有的静态资产都是用版本哈希值编译的，以便进行有效的长期缓存，并且自动生成index.html，并为这些生成的资产提供适当的URL。
* ...更多

请注意你的项目文件夹根部的`/quasar.conf.js`文件。这个文件帮助你快速配置你的网站/应用程序的工作方式。我们将在[配置](/quasar-cli/quasar-conf-js)部分对其进行介绍。
