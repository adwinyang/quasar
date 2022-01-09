---
title: 装载条
desc: 一个 Quasar 插件，它包装了 QAjaxBar 组件，以最简单的方式在应用程序中显示这样一个加载指标。
keys: LoadingBar
related:
  - /vue-components/ajax-bar
  - /vue-components/linear-progress
  - /vue-components/skeleton
---
Quasar LoadingBar插件提供了一个简单的方法来为你的应用程序设置一个[QAjaxBar](/vue-components/ajax-bar) ，以防你不想自己处理一个 QAjaxBar 组件。

关于演示，请访问 QAjaxBar 文档页面。

## LoadingBar API

<doc-api file="LoadingBar" />

## 安装

<doc-installation plugins="LoadingBar" config="loadingBar" />

LoadingBar的选项与配置[QAjaxBar](/vue-components/ajax-bar) 时相同。

::: warning
当使用UMD版本的 Quasar 时，所有的组件、指令和插件都是默认安装的。这包括LoadingBar。如果你想禁用它，请指定`loadingBar: { skipHijack: true }`(它关闭了对Ajax流量的监听)。
:::

## 用法

在Vue组件内：

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.loadingBar.start()
  $q.loadingBar.stop()
  $q.loadingBar.increment(value)
}
```

在Vue组件之外：

```js
import { LoadingBar } from 'quasar'

LoadingBar.start()
LoadingBar.stop()
LoadingBar.increment(value)
```

### 设置默认值

如果你想设置一些默认值，而不是每次都指定它们，你可以通过使用quasar.conf.js > framework > config > loadingBar: {...}或者调用`LoadingBar.setDefaults({...})`或`$q.loadingBar.setDefaults({...})`。支持所有[QAjaxBar](/vue-components/ajax-bar) 属性。

在Vue组件内：

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.loadingBar.setDefaults({
    color: 'purple',
    size: '15px',
    position: 'bottom'
  })
}
```

在Vue组件之外：

```js
import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  color: 'purple',
  size: '15px',
  position: 'bottom'
})
```
