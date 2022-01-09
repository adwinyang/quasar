---
title: useMeta 可组合性
desc: Quasar 的 useMeta() 可组合性是什么以及如何使用它
keys: useMeta
related:
  - /quasar-plugins/meta
---

useMeta是[Quasar Meta Plugin](/quasar-plugins/meta)的一部分。如果你现在还没有深入了解它，请先阅读一下那里。

## 语法

对于静态元配置(非反应式)：

```js
import { useMeta } from 'quasar'

setup () {
  useMeta({ /* meta config */ })
}
```

对于动态元配置(反应式)。

```js
import { useMeta } from 'quasar'

setup () {
  // 本质上是作为一个计算属性的作用
  useMeta(() => {
    // 计算或引用其他东西
    // 在你的组件中
    // 然后返回。
    return { /* meta config */ }
  })
}
```

## 实例

```html
<script>
import { useMeta } from 'quasar'

export default {
  setup () {
    const title = ref('Some title') // 我们定义 "title" 属性

    // 注意，这里的参数是一个函数
    // 在底层，它被转换为一个Vue计算的属性，以获得反应性
    useMeta(() => {
      return {
        // 只要上面的 "标题 "发生变化，你的元就会自动更新。
        title: title.value
      }
    })

    function setAnotherTitle () {
      title.value = 'Another title' // 由于绑定，将自动触发 Meta 更新
    }

    return {
      setAnotherTitle
    }
  }
}
</script>
```
