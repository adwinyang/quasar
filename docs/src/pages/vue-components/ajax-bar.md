---
title: Ajax 状态栏
desc: QAjaxBar Vue 组件在 Ajax 请求或调用时显示一个加载进度条。
keys: QAjaxBar
related:
  - /quasar-plugins/loading
  - /quasar-plugins/loading-bar
  - /quasar-cli/ajax-requests
---

在大多数移动应用程序，甚至一些桌面应用程序中，你很可能会有一些API通过[Ajax调用](https://en.wikipedia.org/wiki/Ajax_(programming) )与服务器通信。由于这些调用可能需要超过一两秒钟的时间，所以当这样的API调用正在进行时，为用户提供反馈是很好的用户体验。这就是QAjaxBar可以帮助你的地方。

QAjaxBar是一个组件，当一个Ajax调用(不管使用的是什么Ajax库)正在进行时，它会显示一个加载条(像Youtube)。它也可以被手动触发。

::: tip
如果你想用**种更简单、更方便的方式**向你的用户提供 Ajax 栏，请看一下[加载栏插件](/quasar-plugins/loading-bar)，这实际上是种**推荐的方式**。
:::

## QAjaxBar API

<doc-api file="QAjaxBar" />

## 使用方法
QAjaxBar组件会自动捕捉Ajax调用(除非被告知不要这样做)。

下面的示例是手动触发事件，仅用于演示目的。这个被设置为出现在页面的底部(有多个位置可用！)，尺寸为10px(默认是不同的)，并使用自定义的颜色。

<doc-example title="基础" file="QAjaxBar/Basic" />

请查看API部分，了解你可以使用的所有属性。

## 提示

* 如果多个事件同时被Ajax Bar捕获，`@start`和`@stop`仍然只被触发一次：当Bar开始显示和当它变成隐藏时。
* 每个Ajax调用在被触发时都会进行`start()`调用。当它结束时，它会调用`stop()`。所以是的，如果你也手动触发QAjaxBar，你必须在每次新事件开始时调用`start()`，在每次事件结束时调用`stop()`。QAjaxBar知道要同时处理多个事件。
