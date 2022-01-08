---
title: 使用 Quasar 的可组合性
desc: 什么是useQuasar()的可组合性以及如何使用它
keys: useQuasar
related:
  - /options/the-q-object
---

为了获得对[$q对象](/options/the-q-object)的访问，可以使用useQuasar组合。

## 语法

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
}
```

## ###实例

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
