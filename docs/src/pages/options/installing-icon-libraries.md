---
title: 安装图标库
desc: 如何在 Quasar 应用程序中使用图标库。
related:
  - /options/quasar-icon-sets
  - /vue-components/icon
---

::: tip
**本页仅指使用[webfont icons](/vue-components/icon#webfont-icons)。** Svg图标不需要任何安装步骤。
:::

你很可能需要在你的网站/应用程序中使用图标，Quasar为以下图标库提供了一种简单的开箱即用的方式。[Material Icons](https://material.io/icons/) , [Font Awesome](http://fontawesome.io/icons/), [Ionicons](http://ionicons.com/), [MDI](https://materialdesignicons.com/), [Eva Icons](https://akveo.github.io/eva-icons), [Themify Icons](https://themify.me/themify-icons), [Line Awesome](https://icons8.com/line-awesome) 和 [Bootstrap Icons](https://icons.getbootstrap.com/) 。 但是你可以自己[添加对他人的支持](/vue-components/icon#custom-mapping)。

::: tip
关于网络字体图标，你可以选择安装一个或多个这样的图标库。
:::

## 安装 Webfonts(网络字体)
如果你只是建立一个网站，那么使用CDN(内容交付网络)的方法可以是你可以遵循的一个选择。然而，当你建立一个移动或Electron应用程序时，你很可能不想依赖互联网连接，Quasar为这个问题提供了解决方案。

编辑`/quasar.conf.js`。

```js
extras: [
  'material-icons'
]
```

Web字体的图标可以通过 [@quasar/extras](https://github.com/quasarframework/quasar/tree/dev/extras) 包获得。你不需要在你的应用程序中导入它，只需如上所述配置`/quasar.conf.js`。

添加不止一个集合。
```js
extras: [
  'material-icons',
  'mdi-v6',
  'ionicons-v4', //  webfont 有效的最后版本是 v4.6.3
  'eva-icons',
  'fontawesome-v5',
  'themify',
  'line-awesome',
  'bootstrap-icons'
]
```

关于所有可用的选项，请访问 [GitHub](https://github.com/quasarframework/quasar/tree/dev/extras#webfonts) 仓库。

你现在已经准备好使用[QIcon](/vue-components/icon)组件了。

## 使用 CDN 作为替代方案
如果你想使用CDN(内容交付网络)，你所需要做的就是在你的`index.template.html`中加入指向CDN URL的样式标签。

如果你遵循这个路径，不要在`/quasar.conf.js > extras`中也添加你想要的图标集。播放[UMD安装指南](/start/umd#installation)，并按照那里的描述编辑`index.template.html`。

## 使用 Fontawesome-Pro
如果你有一个Fontawesome 5 Pro的许可证，并想用它来代替Fontawesome免费版，请按照以下说明进行。

1. 打开Fontawesome的用户账户页面中的[链接账户部分](https://fontawesome.com/account) ，抓取npm TOKENID(如有必要，请登录)。
2. 创建或追加TOKENID到`.npmrc`文件中(文件路径与package.json相同)。
  ```
  @fortawesome:registry=https://npm.fontawesome.com/
  //npm.fontawesome.com/:_authToken=TOKENID
  ```
3. 安装 Fontawesome webfonts。
```bash
$ yarn add @fortawesome/fontawesome-pro
```
4. 创建新的启动文件。
```bash
$ quasar new boot fontawesome-pro [--format ts] 。
```
5. 编辑`/quasar.conf.js`。
  ```js
  boot: [
    ...
    'fontawesome-pro' // 添加启动文件
  ],
  extras: [
    // 'fontawesome' // 禁用免费版本!
  ],
  framework: {
    // 如果你想让 Quasar 的图标使用Fontawesome的话
    iconSet: 'fontawesome-v5-pro'.
  }
```
6. 编辑`/src/boot/fontawesome-pro.js`。
```js
// 需要
import '@fortawesome/fontawesome-pro/css/fontawesome.css'
import '@fortawesome/fontawesome-pro/css/light.css'
// 你也想要这些吗？
// import '@fortawesome/fontawesome-pro/css/brands.css'
// import '@fortawesome/fontawesome-pro/css/solid.css'
// import '@fortawesome/fontawesome-pro/css/regular.css'
```
7. (可选)覆盖默认图标。

由于fontawesome-pro的默认`font-weight`是`light`或`fal`，框架组件使用的一些图标可能不可取。处理这个问题的最好方法是在你创建的启动文件中覆盖它。

例如，要覆盖 "fal "版本的芯片关闭图标，要这样做。

_首先，在Quasar Fontawesome v5 Pro中找到用于芯片关闭的图标[icon-set source](https://github.com/quasarframework/quasar/blob/dev/ui/icon-set/fontawesome-v5-pro.js) 。

(或者，您可以检查要覆盖的组件的渲染函数内部。)

```js
// 示例
chip: {
  remove: 'fal fa-times-circle'
```

然后，在你的`/src/boot/fontawesome-pro.js`中覆盖它。

```js
import '@fortawesome/fontawesome-pro/css/fontawesome.min.css'
import '@fortawesome/fontawesome-pro/css/solid.min.css'
import '@fortawesome/fontawesome-pro/css/light.min.css'

// 示例
export default ({ app }) => {
  app.config.globalProperties.$q.iconSet.chip.remove = 'fas fa-times-circle'
}
```
