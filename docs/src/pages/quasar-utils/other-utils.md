---
title: 其他工具
desc: 一组杂七杂八的 Quasar 方法，用于调试或节流功能、深度复制对象、跨平台URL打开或处理 DOM 事件。
keys: openURL,copyToClipboard,exportFile,debounce,frameDebounce,throttle,extend,uid,event
---

::: tip
关于UMD构建的用法，见[here](/start/umd#quasar-global-object) 。
:::

## 打开外部URL

```js
import { openURL } from 'quasar'

openURL('http://...')

// 完整的语法：
openURL(
  String url,
  Function rejectFn, // 可选的；如果窗口不能被打开，则调用
  Object windowFeatures // 为新窗口请求的可选功能
)
```

它将处理在 Cordova 、Electron 或浏览器上运行时涉及的古怪问题，包括通知用户他/她必须确认打开弹出窗口。

当用 Cordova (或Capacitor)包装时，最好(但不是 "必须做")是[InAppBrowser](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/) Cordova 插件也被安装，这样openURL就可以连接它。

如果在iOS上运行，并且安装了[cordova-plugin-safariviewcontroller](https://github.com/EddyVerbruggen/cordova-plugin-safariviewcontroller) ，那么openURL将首先尝试挂接到它。

可选的`windowFeatures`参数应该是一个对象，其键值来自[window.open() windowFeatures](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 和布尔值(如下面的示例所述)。请注意，当openURL没有默认使用`window.open()`时，这些特征将不会被考虑。

```js
// openURL()与windowFeatures的示例：

openURL(
  'http://...',
  null, // 在本示例中，我们不关心 rejectFn()

  // 这是 windowFeatures 对象的参数：
  {
    noopener: true, // 这是出于安全目的默认设置的
                    // 但如果用一个布尔假值来指定，它可以被禁用。
    menubar: true,
    toolbar: true,
    noreferrer: true,
    // .....任何其他窗口功能
  }
)
```

::: tip
如果你想在 Cordova 应用程序中打开电话拨号器，不要使用`openURL()`。相反，你应该直接使用`<a href="tel:123456789">`标签或`<QBtn href="tel:123456789">`。
:::

## 复制到剪贴板

下面是一个将一些文本复制到剪贴板的辅助工具。该方法返回一个Promise。

```js
import { copyToClipboard } from 'quasar'

copyToClipboard('some text')
  .then(() => {
    // 成功!
  })
  .catch(() => {
    // 失败
  })
```

## 导出文件

下面是一个帮助程序，用于触发浏览器开始下载一个具有指定内容的文件：

```js
/**
 * 强制浏览器下载包含指定内容的文件
 *
 * @param {*} fileName - String
 * @param {*} rawData - String | ArrayBuffer | ArrayBufferView | Blob
 * @param {*} opts - String (mimeType) or Object
 *                   Object 形式: { mimeType?: String, byteOrderMark?: String | Uint8Array, encoding?: String }
 * @returns Boolean | Error
 */
```

参数`opts`是可选的，可以是一个字符串(mimeType)或一个对象，其形式如下：

 * **mimeType** (可选)

    示例：'application/octect-stream'(默认)，'text/plain'，'application/json'，'text/plain;charset=UTF-8'，'video/mp4'，'image/png'，'application/pdf'
    [https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

 * **byteOrderMark** (可选)

    (BOM) 例如：'\uFEFF'
    [https://en.wikipedia.org/wiki/Byte_order_mark](https://en.wikipedia. org/wiki/Byte_order_mark)

* **encoding** (可选)

    在rawData上执行TextEncoder.encode()。
    例如：'windows-1252' (ANSI，ISO-8859-1的一个子集)
    [https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)

示例：

```js
import { exportFile } from 'quasar'

const status = exportFile('important.txt', 'some content')

if (status === true) {
  // 浏览器允许它
}
else {
  // 浏览器拒绝了它
  console.log('Error: ' + status)
}
```

```js
import { exportFile } from 'quasar'

const status = exportFile('file.csv', 'éà; ça; 12\nà@€; çï; 13', {
  encoding: 'windows-1252',
  mimeType: 'text/csv;charset=windows-1252;'
})

if (status === true) {
  // 浏览器允许它
}
else {
  // 浏览器拒绝了它
  console.error('Error: ' + status)
}
```

## 防抖功能
如果你的应用程序使用JavaScript来完成繁重的任务，那么debounce函数对于确保一个特定的任务不至于频繁启动而影响浏览器的性能是至关重要的。放弃一个函数限制了该函数的启动速度。

防抖函数要求在一定时间内没有被调用之前，不能再次调用某个函数。就像 "只有在100毫秒没有被调用的情况下才执行这个函数"。

一个简单的示例：你在窗口上有一个调整大小的监听器，它做一些元素的尺寸计算，并(可能)调整一些元素的位置。这本身并不是一个繁重的任务，但在多次调整大小后被反复触发，会使你的应用程序变得非常慢。那么，为什么不限制这个函数的启动速度呢？

```js
// 返回一个函数，只要它继续被调用，就不会被触发。
// 该函数将在停止调用 N 毫秒后被调用。如果传递了 `immediate`，
// 则在前沿触发函数，
// 而不是在尾部触发。
import { debounce } from 'quasar'

(防抖 Function) debounce(Function 要调用的函数, Number 等待毫秒数, Boolean 是否执行)

// 示例：
window.addEventListener(
  'resize',
  debounce(function() {
    // .... things to do ...
  }, 300 /*ms to wait*/)
)
```

或者在.vue文件中作为一个方法调用：

```js
methods: {
  myMethod () { .... }
},

created () {
  this.myMethod = debounce(this.myMethod, 500)
}
```

::: warning
使用`myMethod: debounce(function () { // Code }, 500)`这样的方法声明来调试你的函数，将意味着被调试的方法将在这个组件的*所有*渲染实例之间共享，所以调试也是共享的。此外，`this.myMethod.cancel()`不会起作用，因为Vue用另一个函数包装每个方法，以确保正确的`this`绑定。按照上面的代码片断，应该可以避免这种情况。
:::

还有一个`frameDebounce`可用，它可以推迟调用你的函数，直到下一个浏览器帧被安排运行(阅读`requestAnimationFrame`)。

```js
import { frameDebounce } from 'quasar'

(Debounced Function) frameDebounce(Function fn)

// 示例：
window.addEventListener(
  'resize',
  frameDebounce(function() {
    .... things to do ...
  })
)
```

## 节流功能
节流执行了一个函数在一段时间内可以被调用的最大次数。如 "每隔X毫秒最多执行一次此函数"。

```js
import { throttle } from 'quasar'

(Throttled Function) throttle(Function fn, Number limit_in_milliseconds)

// 示例：
window.addEventListener(
  'resize',
  throttle(function() {
    .... things to do ...
  }, 300 /* 每0.3秒最多执行一次 */)
)
```

或者在.vue文件中作为一个方法调用：

```js
methods: {
  myMethod () { .... }
},

created () {
  this.myMethod = throttle(this.myMethod, 500)
}
```

::: warning
使用`myMethod: throttle(function () { // Code }, 500)`这样的方法声明来节制你的函数，将意味着被节制的方法将在这个组件的*所有*渲染实例之间共享，所以节制也是共享的。这应该通过遵循上面的代码片断来避免。
:::

## (深度)复制对象
`jQuery.extend()'的一个基本重生。采取相同的参数：

```js
import { extend } from 'quasar'

let newObject = extend([Boolean deepCopy], targetObj, obj, ...)
```

注意对象内的方法。

## 生成UID
生成唯一的标识符。

```js
import { uid } from 'quasar'

let uid = uid()
// 例如：501e7ae1-7e6f-b923-3e84-4e946bff31a8
```

## 在 DOM 事件处理程序上处理事件
它是跨浏览器的。

```js
import { event } from 'quasar'

node.addEventListener('click', evt => {
  // 左键点击？
  (Boolean) event.leftClick(evt)

  // 中间点击了？
  (Boolean) event.middleClick(evt)

  // 右键点击？
  (Boolean) event.rightClick(evt)

  // 数字格式的键
  (Number) event.getEventKey(evt)

  // 鼠标滚轮距离(单位：像素)
  (Object {x, y}) event.getMouseWheelDistance(evt)

  // 在视口上的位置
  // 对鼠标和触摸事件都有效!
  (Object {top, left}) event.position(evt)

  // 获取鼠标或触摸的目标 DOM 元素
  // 事件已在
  ( DOM  Element) event.targetElement(evt)

  // 调用stopPropagation和preventDefault
  event.stopAndPrevent(evt)
})
```
