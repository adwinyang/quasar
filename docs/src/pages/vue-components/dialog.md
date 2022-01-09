---
title: 对话框
desc: QDialog组件为模版提供了一个用户界面，具有定位、造型、最大化等功能。
keys: QDialog
related:
  - /quasar-plugins/dialog
  - /vue-directives/close-popup
  - /vue-components/card
  - /vue-components/popup-proxy
---

QDialog组件是为用户提供选择特定行动或行动列表的能力的好方法。它们也可以为用户提供重要的信息，或者要求他们做出一个决定(或多个决定)。

从UI的角度来看，你可以把Dialogs看作是一种浮动模式，它只覆盖屏幕的一部分。这意味着Dialogs应该只用于用户的快速操作，如验证密码、获得简短的App通知或快速选择一个或多个选项。

::: tip
对话框也可以作为全局可用的方法，用于更多的基本用例，如本地JS的alert()、prompt()等。对于后者的行为，请访问[对话插件](/quasar-plugins/dialog)页面。
:::

::: warning Masterclass TIP
与其用QDialogs混淆你的.vue模板，不如为你的对话框编写一个组件，并使用[Dialog Plugin](/quasar-plugins/dialog#invoking-custom-component)从你的应用程序的任何地方调用它。
:::

## QDialog API

<doc-api file="QDialog" />

## 使用方法

::: warning Note
It's best that your QDialog main content is a QCard. However, if you are planning on using any other component (like QForm) or tag, make sure that the direct child of QDialog is rendered with a `<div>` tag (or wrap it with one yourself).
:::

### 基础

<doc-example title="基础" file="QDialog/Basic" />

### 风格

<doc-example title="样式" file="QDialog/Style" />

### 定位
<doc-example title="位置" file="QDialog/Positioning" />

::: tip
不要把 "位置 "属性和显示/隐藏动画搞错。如果你想要一个自定义的动画，你应该使用`transition-show`和`transition-hide`，无论 "位置 "或 "最大化 "都可以应用。
:::

<doc-example title="最大化" file="QDialog/Maximized" />

### 各种内容
对话框可以包含任何内容。一些例子。

<doc-example title="各种内容" file="QDialog/VariousContent" />

<doc-example title="使用容器化的QLayout" file="QDialog/Layout" />

::: tip
如果你要使用容器化的QLayout，你需要在你的QDialog上放一个宽度，如果使用左/右位置，或者一个高度，如果使用顶/底位置。你可以使用vw和vh单位。
:::

### 处理滚动
<doc-example title="可滚动的对话框" file="QDialog/Scrollable" />

### 不同的模式
用户不能通过按ESCAPE键或点击/敲击对话框的背景来解散对话框。

<doc-example title="持久化" file="QDialog/Persistent" />

对话框也可以成为页面的一部分，而不需要立即关注。这就是 "无缝 "模式开始发挥作用的地方。

<doc-example title="无缝" file="QDialog/Seamless" />

### 对话框中的对话
你能够在其他对话框的上面打开对话框，并且有无限多的深度级别。

<doc-example title="Inception" file="QDialog/Inception" />

### 尺寸
你可以自定义对话框的大小。注意，我们要么篡改内容的样式，要么使用`full-width`或`full-height`属性。

<doc-example title="尺寸例子" file="QDialog/Sizing" />

## Cordova/Capacitor的返回按钮
Quasar默认为你处理后退按钮，所以它可以隐藏任何打开的对话框，而不是默认行为，即返回到上一页(这不是一个好的用户体验)。

然而，如果你想禁用这一行为，请编辑你的/quasar.conf.js文件。

```js
// quasar.conf.js;
// 仅适用于 Cordova。
return {
  framework: {
    config: {
      cordova: {
        // Quasar处理手机后退按钮的应用退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 另一方面，以下是完全
        // 禁用Quasar的返回按钮管理。
        backButton: true/false
      }
    }
  }
}

// quasar.conf.js;
// 用于 Capacitor (仅适用于！)。
return {
  framework: {
    config: {
      capacitor: {
        // Quasar处理手机后退按钮的应用退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 另一方面，以下是完全
        // 禁用Quasar的返回按钮管理。
        backButton: true/false
      }
    }
  }
}
```
