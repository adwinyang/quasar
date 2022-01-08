---
title: DOM利用
desc: 一组用于DOM元素的 Quasar 方法，帮助你检索屏幕视口上的偏移量，获取和设置样式，等待DOM准备好，并对DOM元素进行变形。
keys: offset,style,height,width,css,ready
---

### 帮助树状抖动
你会发现所有的示例都导入了 Quasar 的不同部分。然而，如果你只需要一个特定的util方法，那么你可以使用ES6的析构来帮助Tree Shaking只嵌入该方法，而不是在其周围。

使用`dom`utils的示例。
```js
import { dom } from 'quasar'
const { offset } = dom

// 屏幕上的偏移
console.log(offset(DomElement))
// { top: 10, left: 100 }
```

你也可以导入所有的dom utils，像这样使用你需要的任何东西(但注意你的bundle也会包含未使用的方法)。
```js
import { dom } from 'quasar'

// 屏幕上的偏移
console.log(dom.offset(DomElement))
// { top: 10, left: 100 }
```

::: tip
关于UMD构建的用法，见[here](/start/umd#quasar-global-object)。
:::

## 在屏幕视口上的偏移量
```js
import { dom } from 'quasar'
const { offset } = dom

// 屏幕上的偏移
console.log(offset(DomElement))
// { top: 10, left: 100 }
```

## 获取计算的样式
这只适用于DomElement是可见的情况! 它返回**计算的**浏览器样式，所以你所要求的属性不一定要应用在`style`属性中。

```js
import { dom } from 'quasar'
const { style } = dom

// 获取COMPUTED风格(当DomElement是可见的！)。
// 计算意味着一个DomElement可能没有设置 "高度 "CSS属性。
// 但这并不意味着它在显示时没有高度。
// 下面的方法是访问浏览器提供的计算的CSS。
console.log(style(DomElement, 'height'))
// '10px' <<<注意它返回一个以'px'结尾的字符串
```

## 获取高度/宽度
```js
import { dom } from 'quasar'
const { height, width } = dom


// 前面的方法对 "宽度 "和 "高度 "的一些别名，它们是
// 返回数字而不是字符串。
console.log(
  height(DomElement),
  width(DomElement)
)
// 10 100
```

## 在批处理中应用CSS属性
```js
import { dom } from 'quasar'
const { css } = dom

// 给DomNode应用一个CSS属性列表
css(DomElement, {
  height: '10px',
  display: 'flex'
})
```

## 当DOM准备好时执行
```js
import { dom } from 'quasar'
const { ready } = dom

// 当DOM准备好时执行一个函数。
ready(function () {
  // ....
})
```
