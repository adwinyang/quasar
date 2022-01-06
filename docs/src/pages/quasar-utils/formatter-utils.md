---
title: 格式化工具
desc: 一组用于格式化数值的Quasar方法。大写、填充、正常化等等。
keys: capitalize,humanStorageSize,between,normalizeToInterval,pad
---

### 帮助树状抖动
你会注意到所有的示例都从Quasar导入了`format`对象。然而，如果你只需要其中的一个格式化方法，那么你可以使用ES6结构化来帮助Tree Shaking只嵌入该方法而不是所有的`format`。

示例。
```js
// 我们导入所有的 "format"。
import { format } from 'quasar'
// 解构，只保留需要的东西
const { capitalize, humanStorageSize } = format

console.log( capitalize('some text') )
// 一些文本
console.log( humanStorageSize(13087) )
// 12.8kB
```

你也可以导入所有的格式化器，像这样使用你需要的任何东西(但注意你的捆绑包也可能包含未使用的方法)。
```js
import { format } from 'quasar'

console.log( format.capitalize('some text') )
console.log( format.humanStorageSize(13087) )
```

::: tip
关于UMD构建的用法，见[here](/start/umd#quasar-global-object)。
:::

## 大写
```js
import { format } from 'quasar'
const { capitalize } = format

console.log( capitalize('some text') )
// 一些文本
```

## 格式化为人类可读的大小
```js
import { format } from 'quasar'
const { humanStorageSize } = format

console.log( humanStorageSize(13087) )
// 12.8kB
```

## 将数字归一到区间

```js
import { format } from 'quasar'
const { between } = format

// (Number) between(Number, Number min, Number max)
console.log( between(50, 10, 20) )
// 20
```

```js
import { format } from 'quasar'
const { normalizeToInterval } = format

// (Number) normalizeToInterval(Number, Number lower_margin, Number upper_margin)

console.log( normalizeToInterval(21, 10, 20) ) // 10
console.log( normalizeToInterval(33, 10, 20) ) // 11
console.log( normalizeToInterval(52, 10, 20) ) // 19
console.log( normalizeToInterval(5, 10, 16) ) // 12
```

## Pad String
```js
import { format } from 'quasar'
const { pad } = format

// (String) pad(String toPad, Number length, String paddingCharacter)
// 长度默认为2
// paddingCharacter是默认的'0'。
console.log( pad('2', 4) )
// '0002'
```
