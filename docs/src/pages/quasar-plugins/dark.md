---
title: 黑暗插件
desc: 一个Quasar插件，用于切换或配置你的应用程序的黑暗模式状态。
keys: Dark
related:
  - /style/dark-mode
  - /style/theme-builder
---

::: tip
为了更好地了解这个Quasar插件，请前往风格和身份[黑暗模式](/style/dark-mode)页面。
:::

## Dark API

<doc-api file="Dark" />

## 安装
这个插件是自动安装的。不需要做任何事情，直接使用它。

## 使用方法

::: warning
不要从下面手动给`isActive`或`mode`赋值。相反，使用`set(val)`方法。
:::

### 在一个Vue文件中

```js
import { useQuasar } from 'quasar'
setup () {
  const $q = useQuasar()

  // 获取状态
  console.log($q.dark.isActive) // true, false

  // 获取配置的状态
  console.log($q.dark.mode) // "auto", true, false

  // 设置状态
  $q.dark.set(true) // or false or "auto"

  // 拨动
  $q.dark.toggle()
}
```

在**SSR构建中，你可能想从你的`/src/App.vue`中设置这个。

```js
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    // 在此调用；相当于组件创建时
    $q.dark.set(true)
  }
}
```

### 在Vue文件之外

```js
// 警告! 这种方法不会
// 在SSR构建上的工作。

import { Dark } from 'quasar'

// 获取状态
console.log(Dark.isActive)

// 获取配置的状态
console.log(Dark.mode) // "auto", true, false

// 设置状态
Dark.set(true) // or false or "auto"

// 拨动
Dark.toggle()
```

### 通过quasar.conf.js

你也可以使用`/quasar.conf.js`来设置黑暗模式的状态。

```js
framework: {
  config: {
    dark: 'auto' // or Boolean true/false
  }
}
```

## 关于SSR的说明

当在SSR构建时。

* `import { Dark } from 'quasar'`使用Dark模式的方法不会出错，但它不会工作(不会做任何事情)。但是你可以使用其他两种方法(见上一节)。我们通过quasar.conf.js推荐。
* 对于SSR构建，最好避免将黑暗模式设置为 "自动"。这是因为不能推断出客户端的黑暗模式偏好，所以SSR将始终以光明模式渲染，然后当客户端接管时，它将切换到黑暗模式(如果它将是这种情况)。因此，屏幕会发生快速闪烁。

## 观察状态变化

```vue
<template>...</template>

<script>
import { useQuasar } from 'quasar'
import { watch } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    watch(() => $q.dark.isActive, val => {
      console.log(val ? 'On dark mode' : 'On light mode')
    })
  }
}
</script>
```
