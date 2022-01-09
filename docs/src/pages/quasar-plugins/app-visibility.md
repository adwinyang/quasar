---
title: 应用程序的可见性
desc: 一个 Quasar 插件，包装了页面可见性API，让你知道你的应用程序何时可见或处于焦点。
keys: AppVisibility
---
 Quasar 使用网络[页面可见性API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) ，它可以让你知道一个网站/应用程序何时可见或处于焦点。

## AppVisibility API

<doc-api file="AppVisibility" />

## 安装

<doc-installation plugins="AppVisibility" scrollable />

## 使用方法

```js
// 在Vue文件之外
import { AppVisibility } from 'quasar'
AppVisibility.appVisible // Boolean

// 在一个Vue文件中
import { useQuasar } from 'quasar'
setup () {
  const $q = useQuasar()
  // 现在使用$q.appVisible(布尔值)。
}
```

<doc-example title="AppVisibility" file="AppVisibility/Basic" />

## 观察状态变化

```vue
<template>...</template>

<script>
import { useQuasar } from 'quasar'
import { watch } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    watch(() => $q.appVisible, val => {
      console.log(val ? 'App became visible' : 'App went in the background')
    })
  }
}
</script>
```
