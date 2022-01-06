---
title: 饼干
desc: 一个Quasar插件，它通过标准化的 "document.cookie "管理浏览器的cookie，即使使用SSR应用程序也能轻松读写cookie。
keys: Cookies
---
这是对标准化的`document.cookie'的包装。

::: tip NOTE
除了处理cookie的标准方式外，通过Cookie Plugin，你可以使用JSON对象读写cookie。它还可以管理来自SSR的cookies。
:::

## Cookies API

<doc-api file="Cookies" />

::: tip
在Electron版本>= v1.12.2的情况下，Cookie插件在Electron环境中没有任何功能。你可能想查一下[Electron Cookies](https://www.electronjs.org/docs/api/cookies)的文档。
:::

## 安装

<doc-installation plugins="Cookies" />

## 关于SSR的说明
当为SSR构建时，只使用`$q.cookies`形式。如果你需要使用`import { Cookies } from 'quasar'`，那么你就需要这样做。

```js
import { Cookies } from 'quasar'

// 你需要访问`ssrContext`。
function (ssrContext) {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  // "cookies "等同于非SSR构建中的全局导入
}
```

`ssrContext`在[boot files](/quasar-cli/boot-files)或[preFetch feature](/quasar-cli/prefetch-feature)中可用，它被作为参数提供。

这样做的原因是，在一个纯客户端的应用中，每个用户都会在他们的浏览器中使用一个新的应用实例。对于服务器端的渲染，我们也希望如此：每个请求都应该有一个新鲜的、孤立的应用程序实例，这样就不会有跨请求的状态污染。因此，Cookies需要分别与每个请求绑定。


## 读取一个Cookie

```js
// 在Vue文件之外
import { Cookies } from 'quasar'
const value = Cookies.get('cookie_name')
```

如果没有设置cookie，返回值为 "空"。

```js
// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  const value = $q.cookies.get('cookie_name')
}
```

## 阅读所有Cookie

```js
// 在Vue文件之外
import { Cookies } from 'quasar'
const cookies = Cookies.getAll()
```

`cookies'变量将是一个具有键值对的对象(cookie_name : cookie_value)。

```js
// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  const allCookies = $q.cookies.getAll()
}
```

## 验证Cookie是否已设置

```js
// 在Vue文件之外
import { Cookies } from 'quasar'
Cookies.has('cookie_name') // Boolean
```

```js
// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  const hasIt = $q.cookies.has('cookie_name')
}
```

## 写一个Cookie

```js
// 在Vue文件之外
import { Cookies } from 'quasar'

Cookies.set('cookie_name', cookie_value)

// 或在选项中也传递。
Cookies.set('cookie_name', cookie_value, options)
```

```js
// 在Vue文件之外
import { Cookies } from 'quasar'

Cookies.set('quasar', 'framework', {
  secure: true
})
```

```js
// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.cookies.set('cookie_name', cookie_value)
  // 或在选项中也传递。
  $q.cookies.set('cookie_name', cookie_value, options)
}
```

参数(可选)`options`是一个对象，下面将逐一解释其属性。

### 选项: 过期

```js
expires: 10 // in 10 days
expires: -1 // yesterday
expires: 'Mon, 06 Jan 2020 12:52:55 GMT'
expires: new Date() // some JS Date Object
expires: '1d 3h 5m' // in 1 day, 3 hours, 5 minutes
expires: '2d' // in 2 days
expires: '15m 10s' // in 15 minutes, 10 seconds
```

定义cookie的寿命。值可以是一个数字，它将被解释为从创建时间开始的天数，或者是一个日期对象，或者是一个原始的字符串化的日期("Mon, 06 Jan 2020 12:52:55 GMT")或一个特殊的字符串格式("1d", "15m", "13d", "1d 15m", "1d 3h 5m 3s")。如果省略，cookie将成为一个会话cookie。

### 选项: path

```js
path: '/'
```

定义cookie的有效路径。默认情况下，cookie的路径是创建cookie的页面的路径(标准浏览器行为)。如果你想让它在整个域内可用，则使用路径：'/'。默认情况下：创建cookie的页面的路径。

### 选项：域

```js
domain: 'quasar.dev'
```

定义cookie的有效域。默认：创建cookie的页面的域。

### 选项：同一站点

```js
sameSite: 'Strict'
// 或
sameSite: 'Lax'
```

同网站cookie让服务器要求在跨网站(其中网站由可注册的域定义)请求中不应该发送cookie，这对跨网站请求伪造攻击(CSRF)提供了一些保护。

**严格** - 如果同网站的cookie有这个属性，浏览器将只在请求来自设置cookie的网站时发送cookie。如果请求来自于与当前位置的URL不同的URL，那么被标记为严格属性的cookie将不会被包括在内。

**Lax** - 如果该属性被设置为Lax，在跨网站的子请求中，如加载图像或框架的调用，同网站的cookies将被扣留，但当用户从外部网站导航到该URL时，例如通过链接，将被发送。

关于`same-site`设置的更多信息，请点击[这里](https://web.dev/samesite-cookies-explained/)。

### 选项: httpOnly

```js
httpOnly: true
```

为了帮助减轻跨站脚本(XSS)攻击，HttpOnly cookies对于JavaScript的Document.cookie API来说是不可访问的；它们只被发送到服务器。例如，持续服务器端会话的cookie不需要对JavaScript可用，HttpOnly标志应该被设置。

### 选项：安全

```js
secure: true
```

如果为真，cookie的传输需要安全协议(HTTPS)，不会通过HTTP发送。默认值是`false`。

::: tip
如果使用Quasar CLI和[在开发模式下](/quasar-cli/quasar-conf-js#Property%3A-devServer)，你可以通过quasar.conf.js > devServer > https: true启用HTTPS。
:::

### 选项：其他

```js
other: 'SomeNewProp'
```

其他cookie选项的原始字符串。作为最后的手段，用于目前Quasar中尚未实现的可能的较新属性。

## 移除一个cookie
```js
// 在Vue文件之外
import { Cookies } from 'quasar'

Cookies.remove('cookie_name')

// 如果cookie被设置为特定的选项，如路径和/或域名
// 那么你在删除时也需要提供它们。
Cookies.remove('cookie_name', options)
```

```js
// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.cookies.remove('cookie_name')

  // 如果cookie被设置为特定的选项，如路径和/或域名
  // 那么你在删除时也需要提供它们。
  $q.cookies.remove('cookie_name', options)
}
```

::: warning
当一个cookie先前被设置了特定的`path`和/或`domain`时，只有当相同的属性通过`options`参数传递给remove()时，它才能被成功删除。这符合RFC6265的规定。
:::
