---
title: useFormChild可组成
desc: 什么是Quasar的useFormChild()可组合性，以及如何使用它
keys: useFormChild
related:
  - /vue-components/form
---

这个可组合指的是[QForm](/vue-components/form)包装你自己的自定义组件，你想与之沟通。

## 语法

```js
import { useFormChild } from 'quasar'

setup () {
  // 函数validate() { ... }
  // 函数resetValidation() { ... }

  useFormChild({
    validate, // Function; Can be async;
              // 应该返回一个布尔值(或一个解析为布尔值的承诺)。
    resetValidation,    // Optional function which resets validation
    requiresQForm: true // should it error out if no parent QForm is found?
  })
}
```
