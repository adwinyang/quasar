---
title: 地址栏颜色插件
desc: 一个Quasar插件，用于在较新的移动浏览器上改变地址栏颜色。
keys: AddressbarColor
---
较新的移动浏览器能够为地址栏指定一种颜色，就像下面的图片。

::: warning
* 目前还没有一个网络标准，所以它不会对所有的移动浏览器起作用。
* 这只适用于建立网站时。对于在移动应用程序(用Cordova模式构建)上着色的顶栏，请参考[cordova-plugin-statusbar](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-statusbar/)。
:::

![移动地址栏着色](https://cdn.quasar.dev/img/mobile-address-bar-colors.jpg "移动地址栏着色")

## AddressbarColor API

<doc-api file="AddressbarColor" />

## 安装

<doc-installation plugins="AddressbarColor" /> ## Installation

## 使用方法

我们创建启动文件来初始化其使用。`$ quasar new boot addressbar-color [--format ts]`。一个文件被创建(`/src/boot/addressbar-color.js`)。我们编辑它。

```js
// 文件。/src/boot/addressbar-color.js
import { AddressbarColor } from 'quasar'

export default () => {
  AddressbarColor.set('#a2e3fa')
}
```

然后我们要告诉quasar使用我们刚刚创建的这个启动文件。要做到这一点，我们要编辑quasar配置中的启动部分。
```js
// 文件：/quasar.conf.js
return {
  boot: [
    'addressbar-color'
  ]
}
```

它的作用是在运行时将一些`<meta>`标签注入到你的`index.html`。

因为元标签直到运行时才被注入，你可以根据用户所在的页面，多次动态地改变这个颜色(通过调用相应页面的`created()`生命周期钩子中的`set`方法)。


```js
// 一个代表页面的.vue文件

import { useQuasar } from 'quasar'

export default {
  setup () {
    // 相当于在创建组件时调用这个
    const $q = useQuasar()
    $q.addressbarColor.set('#a2e3fa')
  }
}
```

::: tip
调用没有参数的`set()`将使用主色。
:::
