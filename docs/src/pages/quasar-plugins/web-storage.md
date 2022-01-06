---
title: 本地/会话存储插件
desc: 一个包裹本地/会话存储的Quasar插件，以其原始JS类型检索数据。
keys: LocalStorage,SessionStorage
---

Quasar提供了一个对[网络存储API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)的封装器。

::: tip
Web Storage API只检索字符串。**Quasar以其原始数据类型检索数据。**你告诉它存储一个数字，然后再检索它，它仍然是一个数字，而不是像Web Storage API那样以字符串表示数字。对于JSON、正则表达式、日期、布尔运算等也是如此。
:::

## LocalStorage API

<doc-api file="LocalStorage" />

## SessionStorage API

<doc-api file="SessionStorage" />

## 安装
<doc-installation :plugins="['LocalStorage', 'SessionStorage']" />

::: danger Note about SSR
当在SSR构建的服务器端运行代码时，这个功能无法工作。网络存储只是一个浏览器API。但是你可以通过SSR在客户端使用它。
:::

## 用法

```js
// 在Vue文件之外
import { LocalStorage, SessionStorage } from 'quasar'

LocalStorage.set(key, value)
let value = LocalStorage.getItem(key)

SessionStorage.set(key, value)
let value = SessionStorage.getItem(key)
```

```js
// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.localStorage.set(key, value)
  const value = $q.localStorage.getItem(key)

  $q.sessionStorage.set(key, value)
  const otherValue = $q.sessionStorage.getItem(key)
}
```

为了在设置数值时做到万无一失，最好还能抓住底层本地/会话存储网络API引发的任何潜在错误，比如超过配额时。

```js
try {
  $q.localStorage.set(key, value)
} catch (e) {
  // 数据没有成功保存，原因是
  // 一个网络存储API错误
}
```

::: tip
有关方法的详尽清单，请查看API部分。
:::

## 数据类型

Quasar Storage支持(但不限于)以下开箱即用的数据类型。如果你存储了这些类型中的一种，检索的数据将具有相同的数据类型。

* 日期
* 正则表达式
* 数字
* 布尔运算
* 字符串
* 普通的Javascript对象

如果你存储任何*其他*数据类型，返回值将是一个字符串。

所以你甚至可以存储函数，但要注意你需要评估()返回值(这是函数的一个字符串表示)。
