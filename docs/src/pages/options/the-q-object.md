---
title: $q对象
desc: Quasar中的$q对象。为什么以及如何使用它。
related:
  - /vue-composables/use-quasar
---

 Quasar 提供了一个`$q`对象，你可以用于各种用途。你会在整个文档中注意到它。

| Prop name | Type | Description |
| --- | --- | --- |
| `$q.version` | String | Quasar版本。|
| `$q.platform` | Object | 与[Platform](/options/platform-detection) 相同的对象，从 Quasar 导入。|
| `$q.screen` | 对象 | 由[Screen Plugin](/options/screen-plugin) 提供的对象。|
| `$q.lang` | 对象 | Quasar语言包管理，包含标签等([lang文件](https://github.com/quasarframework/quasar/tree/dev/ui/lang) 之一)。专为 Quasar 组件设计，但你也可以在你的应用程序组件中使用它。更多信息：[Quasar语言包](/options/quasar-language-packs) 。|
| `$q.iconSet` | 对象 | Quasar图标集管理([图标集文件](https://github.com/quasarframework/quasar/tree/dev/ui/icon-set) 之一。专为 Quasar 组件设计，但你也可以在你的应用程序组件中使用它。更多信息：[Quasar图标集](/options/quasar-icon-sets) 。|
| `$q.cordova` | Object | 对 Cordova 全局对象的引用。只在 Cordova 应用程序下运行时可用。|
| `$q.capacitor` | Object | 对Capacitor全局对象的引用。只有在Capacitor应用程序下运行时才可用。|

## 使用方法

下面几节将教你如何在.vue文件(包括Composition API和Options API)中和在它们之外使用它。

### 组合式 API

下面是一个.vue文件：

```html
<template>
  <div>
    <div v-if="$q.platform.is.ios">
      Gets rendered only on iOS platform.
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    console.log($q.platform.is.ios)

    // 显示一个方法的示例，但
    // 可以是Vue脚本的任何部分
    function show () {
      // 打印出 Quasar 的版本
      console.log($q.version)
    }

    return {
      show
    }
  }
}
</script>
```

### 选项式 API

以下是一个.vue文件:

```html
<template>
  <div>
    <div v-if="$q.platform.is.ios">
      仅在iOS平台上渲染。
    </div>
  </div>
</template>

<script>
// 此处在导出之外不可用


export default {
  // 在Vue组件的脚本中
  ...,

  // 显示一个方法的示例，但
  // 可以是Vue脚本的任何部分
  methods: {
    show () {
      // 打印出 Quasar 的版本
      console.log(this.$q.version)
    }
  }
}
</script>
```

### 在一个vue文件的外面

```js
import { Quasar } from 'quasar'

console.log(Quasar.platform.is.ios)
```
