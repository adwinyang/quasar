---
title: BEX通信
desc: 如何在 Quasar 中的浏览器扩展(BEX)的不同部分之间进行通信。
---
允许 Quasar 应用程序与BEX的各个部分进行通信是至关重要的。Quasar使用一个 `bridge` 来填补这一空白。

在一个BEX中，有4个区域需要一个通信层：

1. Quasar应用程序本身--这适用于所有类型的BEX，如弹出窗口、选项页、开发工具或网页。
2. 后台脚本
3. 内容脚本
4. BEX所运行的网页

## 通信规则

在 Quasar 的通信桥梁中，有一条基本规则需要理解。

**并非所有的BEX类型都有内容脚本** - 只有在网页背景下运行的BEX才有内容脚本。这就是一般浏览器扩展的工作方式。这意味着如果你在内容脚本上添加一个事件监听器，并试图从作为开发工具、选项页或弹出式窗口运行的Quasar BEX中触发它--**它不会工作。

如果你想让你的开发工具、弹出窗口或选项页BEX与网页通信，你将需要使用后台脚本作为代理。你可以通过以下方式做到这一点。

1. 在后台脚本上添加一个监听器，反过来发射另一个事件。
2. 在网页上下文中运行的 Quasar 应用程序中添加一个监听器，监听后台脚本所发出的事件。
发出
2. 从你的开发工具、弹出窗口或选项页面向你的后台脚本发出事件。

一旦你理解了这个概念，BEX与每个部分的通信方式就没有限制了。

## 桥接器

桥接器是一个基于承诺的事件系统，在BEX的所有部分之间共享，因此允许你在 Quasar 应用程序中监听事件，从其他部分发出事件，反之亦然。这就是Quasar BEX模式的力量所在。

要从你的 Quasar 应用程序中访问该桥，你可以使用`$q.bex`。在其他地区，桥接是通过各自的钩子文件中的`bridge`参数来实现的。

让我们看看它是如何工作的。

### 触发一个事件并等待响应

```js
bridge.send('some.event', { someKey: 'aValue' }).then(response => {
  console.log('Some response from the other side')
})
```

### 监听一个事件并发送一个响应

```js
bridge.on('some.event', event => {
  console.log('Event Receieved, responding ...')
  bridge.send(event.eventResponseKey)
})
```

### 清理你的听众

```js
bridge.off('some.event', this.someFunction)
```

等等，什么是`bridge.send(event.eventResponseKey)`？

 Quasar 桥接器在幕后做了一些工作，将正常的基于事件的通信转换为承诺，因此，为了使承诺得到解决，我们需要发送一个*新*的事件，该事件被捕获并被承诺。

::: warning
如果你省略了 `bridge.send(event.eventResponseKey)`，`.send()` 上的 promise 将无法解析。
:::

::: tip
由于浏览器扩展 60mb 数据传输限制，桥接器还做了一些工作来拆分大数据，这些数据太大而无法一次性传输。为了实现这一点，有效载荷必须是一个数组。
:::
