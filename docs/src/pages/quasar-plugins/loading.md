---
title: 加载插件
desc: 一个Quasar插件，可以通过一个带有旋转器和信息的覆盖物来显示你的应用程序的加载状态。
keys: Loading
related:
  - /vue-components/linear-progress
  - /vue-components/circular-progress
  - /vue-components/inner-loading
  - /vue-components/spinners
  - /vue-components/skeleton
  - /quasar-plugins/loading-bar
  - /vue-components/ajax-bar
---
加载是一个功能，你可以用来在你的应用程序的内容上面显示一个带有旋转器的覆盖物，以通知用户正在进行一个后台操作。不需要在你的页面中为全局背景操作添加复杂的逻辑。

## 加载API

<doc-api file="Loading" />

## 安装

<doc-installation plugins="Loading" config="Loading" />

## 用法
Loading使用一个延迟(500ms)来显示自己，这样快速的操作就不会使屏幕闪烁。这是通过显示然后迅速隐藏进度旋钮来实现的，用户没有机会看到发生了什么。显示之前的延迟消除了混乱。

在一个Vue组件内。

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.loading.show({
    delay: 400 // ms
  })

  $q.loading.hide()
}
```

在Vue组件的外面。

```js
import {
  Loading,

  // 可选！，例如以下
  // 带有定制的旋转器
  QSpinnerGears
} from 'quasar'

// 默认选项
Loading.show()

// 完全可定制的
Loading.show({
  spinner: QSpinnerGears,
  // 其他属性
})

Loading.hide()
```

<doc-example title="默认选项" file="Loading/Default" />

<doc-example title="有消息" file="Loading/WithMessage" />

<doc-example title="使用自定义的盒子" file="Loading/WithBox" />

<doc-example title="有不安全的信息，但经过消毒处理" file="Loading/WithMessageSanitized" />

<doc-example title="定制的" file="Loading/Customized" />

<doc-example title="显示和更改" file="Loading/ShowAndChange" />

### 设置默认值
如果你想设置一些默认值，而不是每次都指定它们，你可以通过使用quasar.conf.js > framework > config > loading来实现。{...}或通过调用`Loading.setDefaults({...})`或`$q.loading.setDefaults({...})`。
