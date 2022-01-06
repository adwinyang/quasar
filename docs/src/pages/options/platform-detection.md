---
title: 平台检测
desc: 如何检测Quasar应用程序的运行平台。
---

帮助程序内置于 Quasar 中，用于检测代码运行环境中的平台(及其能力)。

::: tip
根据你的需要，你可能还想看看[Style & Identity &gt; Visibility](/style/visibility)页面，看看你如何单独使用CSS达到同样的效果。虽然后一种方法会渲染你的DOM元素或组件，而不考虑平台，所以在你想如何处理你的应用程序的性能上要明智地选择。
:::

## 用法
在Vue组件的JS中使用。

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.platform.is.mobile
}
```

在Vue组件模板内使用。

```js
$q.platform.is.cordova
```

当你在Vue组件外使用它时，你必须导入它:

```js
import { Platform } from 'quasar'
```

`Platform.is`本身会返回一个包含当前平台详细信息的对象。例如，当在MacOS台式机上运行Chrome时，`Platform.is`会返回类似的内容:

```js
{
  chrome: true,
  desktop: true,
  mac: true,
  name: "chrome",
  platform: "mac",
  version: "70.0.3538.110",
  versionNumber: 70,
  webkit: true
}
```

现在，假设我们想根据代码运行的平台来呈现不同的组件或DOM元素。我们想在桌面上显示一些东西，而在手机上显示另一些东西。我们将这样做:

```html
<div v-if="$q.platform.is.desktop">
  I'm only rendered on desktop!
</div>

<div v-if="$q.platform.is.mobile">
  I'm only rendered on mobile!
</div>

<div v-if="$q.platform.is.electron">
  I'm only rendered on Electron!
</div>
```

<doc-example title="你的设备" file="Platform/Basic" />

## 属性

以下是Platform对象可用的属性。但这并不是一个详尽的列表。请看下面的API部分以了解更多细节：

| 属性 | 类型 | 含义 |
| --- | --- | --- |
| `Platform.is.mobile` | Boolean | 代码是否在移动设备上运行？               |
| `Platform.is.cordova` | Boolean | 代码是否在Cordova内运行？                   |
| `Platform.is.capacitor` | Boolean | 代码是在Capacitor中运行吗？|
| `Platform.is.electron` | Boolean | 代码是否在Electron内运行？                  |
| `Platform.is.desktop` | Boolean | 代码是否在桌面浏览器上运行？             |
| `Platform.is.bex` | Boolean | 代码是在浏览器扩展中运行吗？|
| `Platform.is.android` | Boolean | 应用程序是否在Android设备上运行？              |
| `Platform.is.blackberry` | Boolean | 该应用程序是否在黑莓设备上运行？|
| `Platform.is.cros` | Boolean | 该应用程序是否在使用Chrome OS操作系统的设备上运行？|
| `Platform.is.ios` | Boolean | 该应用程序是否在iOS设备上运行？|
| `Platform.is.ipad` | Boolean | 该应用程序是否在iPad上运行？|
| `Platform.is.iphone` | Boolean | 该应用程序是否在iPhone上运行？|
| `Platform.is.ipod` | Boolean | 该应用程序是否在iPod上运行？|
| `Platform.is.kindle` | Boolean | 该应用程序是否在Kindle设备上运行？|
| `Platform.is.linux` | Boolean | 该代码是否运行在Linux操作系统的设备上？|
| `Platform.is.mac` | Boolean | 代码是否在使用MacOS操作系统的设备上运行？|
| `Platform.is.win` | Boolean | 代码是否在使用Windows操作系统的设备上运行？|
| `Platform.is.winphone` | Boolean | 代码是否在Windows Phone设备上运行？|
| `Platform.is.playbook` | Boolean | 代码是否在黑莓Playbook设备上运行？|
| `Platform.is.silk` | Boolean | 代码是否运行于Kindle Silk浏览器？|
| `Platform.is.chrome` | Boolean | 代码是否在Google Chrome浏览器中运行？|
| `Platform.is.Opera` | Boolean | 代码是否在Opera浏览器中运行？|
| `Platform.is.safari` | Boolean | 代码是否在Apple Safari浏览器中运行？|
| `Platform.is.edge` | Boolean | 代码是否在Microsoft Edge浏览器中运行？|
| `Platform.is.ie` | Boolean | 代码是否在微软的Internet Explorer浏览器中运行？|
| `Platform.has.touch` | Boolean | 代码是否在有触摸功能的屏幕上运行？        |
| `Platform.within.iframe` | Boolean | 应用程序是否在IFRAME中运行？                  |

::: tip
在移动端运行意味着你可以让这段代码在移动设备(手机或平板电脑)上运行，但要用浏览器，而不是在Cordova包装器内。
:::

## SSR 注意事项
构建SSR时，只使用`$q.platform`形式。如果你需要使用`import { Platform } from 'quasar'`(在服务器端时)，那么你就需要这样做：

```js
import { Platform } from 'quasar'

// 你需要访问`ssrContext`。
function (ssrContext) {
  const platform = process.env.SERVER
    ? Platform.parseSSR(ssrContext)
    : Platform // otherwise we're on client

  // 平台等同于非SSR构建中的全局导入
}
```

`ssrContext`在[boot files](/quasar-cli/boot-files)中可用。还有在[preFetch](/quasar-cli/prefetch-feature)功能中，它被作为一个参数提供。

这一切的原因是，在一个纯客户端的应用程序中，每个用户将在他们的浏览器中使用一个新的应用程序实例。对于服务器端的渲染，我们也希望如此：每个请求都应该有一个新鲜的、孤立的应用程序实例，这样就不会有跨请求的状态污染。所以平台需要分别与每个请求绑定。

## API
<doc-api file="Platform" />
