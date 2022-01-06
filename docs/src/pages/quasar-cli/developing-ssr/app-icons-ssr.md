---
title: SSR的应用程序图标
desc: 如何管理Quasar服务器端渲染的应用程序的图标。
---

这个构建目标包括各种用于个别浏览器和操作系统的特殊图标。你需要所有这些图标--如果你发现一个新的或丢失的图标，请[打开一个问题](https://github.com/quasarframework/quasar/issues)。


<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px; padding-top:40px" />

## Icon Genie CLI

::: tip
我们强烈建议使用[Icon Genie CLI](/icongenie/introduction)，因为它可以使用一个源图标，并自动克隆、缩放、最小化，并为你把图标放到适当的目录中。需要时，它还会告诉你需要在你的/src/index.template.html文件中添加哪些标签。
:::

用Icon Genie CLI快速启动必要的图像。有关完整的选项清单，请访问[Icon Genie CLI](/icongenie/command-list)命令清单页面。

```bash
# SSR only:
$ icongenie generate -m ssr -i /path/to/source/icon.png

# SSR + PWA:
$ icongenie generate -m ssr,pwa -i /path/to/source/icon.png [-b /path/to/background.png]
```

## ##手册说明

```
public/
   favicon.ico
   icons/
      favicon-128x128.png
      favicon-96x96.png
      favicon-32x32.png
      favicon-16x16.png
```

进入`/src/index.template.html`的所需HTML代码，以引用上述文件。

```html
<link rel="icon" type="image/ico" href="favicon.ico">
<link rel="icon" type="image/png" sizes="128x128" href="icons/favicon-128x128.png">
<link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png">
```

然而，如果你是用SSR+PWA模式开发，那么你也需要PWA资产。

```
public/
   icons/
      icon-128x128.png # for the PWA manifest
      icon-192x192.png # for the PWA manifest
      icon-256x256.png # for the PWA manifest
      icon-384x384.png # for the PWA manifest
      icon-512x512.png # for the PWA manifest
      ms-icon-144x144.png
      safari-pinned-tab.svg
      apple-icon-120x120.png
      apple-icon-152x152.png
      apple-icon-167x167.png
      apple-icon-180x180.png
      apple-launch-828x1792.png
      apple-launch-1125x2436.png
      apple-launch-1242x2688.png
      apple-launch-750x1334.png
      apple-launch-1242x2208.png
      apple-launch-640x1136.png
      apple-launch-1536x2048.png
      apple-launch-1668x2224.png
      apple-launch-1668x2388.png
      apple-launch-2048x2732.png
```

并将相应的HTML代码放入`/src/index.template.html`文件(注意不是所有的文件都需要手动引用，因为Quasar CLI会自动注入其他文件)。

```html
<!-- iPhone XR -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-828x1792.png">
<!-- iPhone X, XS -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="icons/apple-launch-1125x2436.png">
<!-- iPhone XS Max -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="icons/apple-launch-1242x2688.png">
<!-- iPhone 8, 7, 6s, 6 -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-750x1334.png">
<!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="icons/apple-launch-1242x2208.png">
<!-- iPhone 5 -->
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-640x1136.png">
<!-- iPad Mini, Air, 9.7" -->
<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-1536x2048.png">
<!-- iPad Pro 10.5" -->
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-1668x2224.png">
<!-- iPad Pro 11" -->
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-1668x2388.png">
<!-- iPad Pro 12.9" -->
<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-2048x2732.png">
```
