---
title: 全屏插件
desc: 一个 Quasar 插件，通过Web Fullscreen API切换你的应用程序的全屏状态。
keys: AppFullScreen
---
有些时候，你希望你的网站或应用程序能以全屏方式运行。
 Quasar 通过封装[Web Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)使之变得简单。

::: warning
请注意，由于Web Fullscreen API还没有一个固定的Web标准，代码运行在哪个平台上，行为就会不同。
:::

## AppFullscreen API

<doc-api file="AppFullscreen" />

## 安装
<doc-installation plugins="AppFullscreen" /> ##安装

## 使用方法
::: tip
关于属性和方法的详尽列表，请查看API部分。
:::

```js
// 在Vue文件之外
import { AppFullscreen } from 'quasar'

// 要求全屏模式。
AppFullscreen.request()
  .then(() => {
    // 成功!
  })
  .catch(err => {
    // 哦，不！！！
  })

// 退出全屏模式。
AppFullscreen.exit()
  .then(() => {
    // 成功!
  })
  .catch(err => {
    // 哦，不！！！
  })
```

```js
// 在一个Vue文件中

import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  // 要求全屏模式。
  $q.fullscreen.request()
    .then(() => {
      // 成功!
    })
    .catch(err => {
      // 哦，不！！！
    })

  // 退出全屏模式。
  $q.fullscreen.exit()
    .then(() => {
      // 成功!
    })
    .catch(err => {
      // 哦，不！！！
    })
}
```

<doc-example title="基本" file="AppFullscreen/Basic" />

<doc-example title="在自定义元素上" file="AppFullscreen/Targeted" />

::: warning
在一些手机上，这将没有什么影响。
* 例如，在三星S4上，当应用程序进入全屏时，顶部栏会向上滑动，但仍留在屏幕上。
* 另一方面，在Nexus手机上，比如Nexus 5，安卓导航按钮和顶栏会完全消失。

这完全取决于代码所运行的平台的Web全屏API支持。
:::

## 观察全屏的变化

```vue
<template>...</template>

<script>
import { useQuasar } from 'quasar'
import { watch } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    watch(() => $q.fullscreen.isActive, val => {
      console.log(val ? 'In fullscreen now' : 'Exited fullscreen')
    })
  }
}
</script>
```
