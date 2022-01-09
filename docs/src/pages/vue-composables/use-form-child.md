---
title: useFormChild 可组合性
desc: 什么是 Quasar 的 useFormChild() 可组合性，以及如何使用它
keys: useFormChild
related:
  - /vue-components/form
---

这个可组合是指 [QForm](/vue-components/form) 包装您自己想要与之通信的自定义组件。

## 语法

```js
import { useFormChild } from 'quasar'

setup () {
  // 函数 validate() { ... }
  // 函数 resetValidation() { ... }

  useFormChild({
    validate, // 函数; 可以是异步的;
              // 应该返回一个布尔值(或一个解析为布尔值的承诺)。
    resetValidation,    // 用于重置验证的可选函数
    requiresQForm: true // 如果没有找到父QForm，是否应该出错？
  })
}
```
