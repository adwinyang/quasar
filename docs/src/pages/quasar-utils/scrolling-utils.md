---
title: 滚动利用
desc: 一组与滚动有关的 Quasar 方法，如获取滚动目标或改变页面的滚动位置。
keys: getScrollTarget,getVerticalScrollPosition,setVerticalScrollPosition,getHorizontalScrollPosition,setHorizontalScrollPosition,getScrollHeight,getScrollWidth,getScrollbarWidth
---

::: tip
关于UMD构建的用法，见[here](/start/umd#quasar-global-object)。
:::

## 确定滚动的容器
可能值得一读的是如何做到这一点[这里](/vue-components/scroll-observer#determining-scrolling-container)。

```js
import { scroll } from 'quasar'
const { getScrollTarget } = scroll

// 获取处理页面滚动的父DomNode
// 通常情况下，这个元素的类名是".layout-view "或 "window"。
getScrollTarget(DomElement) // returns a DOM Element (or window Object)
```

该方法搜索一个父DOM元素，该元素有一个`scroll'或`overflow-auto'的Quasar CSS帮助类附加在它身上。如果没有找到，那么它就认为滚动发生在文档本身。

请注意，简单地将`scroll`CSS类附加到DOM元素或Vue组件上，如果相应的元素没有被溢出，则不会有任何效果(例如，用。CSS `overflow: hidden`和高度小于其内部内容高度)。

好的容器的示例。

```html
<!--
  Quasar CSS helper 'overflow-hidden' is
  equivalent to style="overflow: hidden"
-->
<div class="scroll overflow-hidden" style="height: 100px">
  ...content expanding over the 100px height from container...
</div>
```

## 获取/设置滚动位置
垂直方向。

```js
import { scroll } from 'quasar'
const { getVerticalScrollPosition, setVerticalScrollPosition } = scroll

// 获取一个元素或页面的滚动位置。
// 与 "getScrollTarget() "结合使用。
getVerticalScrollPosition(scrollTargetDomElement) // returns a Number (pixels)

// 设置一个元素或页面的滚动位置。
setVerticalScrollPosition (scrollTargetElement, offset[, duration])
// 如果指定了 "持续时间"，那么它将对滚动进行动画处理。
```

水平方向。

```js
import { scroll } from 'quasar'
const { getHorizontalScrollPosition, setHorizontalScrollPosition } = scroll

// 获取一个元素或页面的滚动位置。
// 与 "getScrollTarget() "结合使用。
getHorizontalScrollPosition(scrollTargetDomElement) // returns a Number (pixels)

// 设置一个元素或页面的滚动位置。
setHorizontalScrollPosition (scrollTargetElement, offset[, duration])
// 如果指定了 "持续时间"，那么它将对滚动进行动画处理。
```

### 滚动到一个元素
下面是一个使用滚动工具滚动到其容器中的一个元素的示例。它没有考虑到容器是否在屏幕上或更复杂的情况。

```js
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

// 接受一个元素对象
function scrollToElement (el) {
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  const duration = 1000
  setVerticalScrollPosition(target, offset, duration)
}
```

## 确定卷轴大小
垂直方向。

```js
import { scroll } from 'quasar'
const { getScrollHeight } = scroll

// 获得滚动容器的内部高度
getScrollHeight(scrollTargetDomElement) // returns a Number

console.log( getScrollHeight(el) )
// 824 (它总是以像素为单位)
```

水平方向。

```js
import { scroll } from 'quasar'
const { getScrollWidth } = scroll

// 获得滚动容器的内部高度
getScrollWidth(scrollTargetDomElement) // returns a Number

console.log( getScrollWidth(el) )
// 824 (它总是以像素为单位)
```

## 确定滚动条的宽度
计算滚动条的宽度，单位为像素。

```js
import { scroll } from 'quasar'
const { getScrollbarWidth } = scroll

console.log(getScrollbarWidth()) // 16 (it's in pixels)
```
