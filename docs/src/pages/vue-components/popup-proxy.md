---
title: 弹出代理
desc: QPopupProxy是一个Vue组件，当你需要显示QMenu或QDialog(在较小的屏幕上)时，应该使用它。
keys: QPopupProxy
related:
  - /vue-components/menu
  - /vue-components/dialog
  - /vue-directives/close-popup
---

当你需要显示[QMenu](/vue-components/menu)(在大屏幕上)或[QDialog](/vue-components/dialog)(在小屏幕上)时，应该使用QPopupProxy。它充当一个代理，从这两个组件中挑选一个来使用。QPopupProxy也处理上下文菜单。

## QPopupProxy API

<doc-api file="QPopupProxy" />

## 用法
::: tip
使用你的浏览器开发工具在移动或桌面之间切换设备(每次改变后都要刷新浏览器)，或者，在点击/点击其容器之前，物理地调整浏览器的窗口大小，观察QPopupProxy组件在QMenu或QDialog之间的切换。默认的断点被设置为450px。
:::

### 标准

<doc-example title="标准" file="QPopupProxy/Standard" />

### 上下文菜单

<doc-example title="上下文菜单(右击/长击)" file="QPopupProxy/ContextMenu" />

### 断点

在下面的例子中，点击输入中的图标。

<doc-example title="突破点 @600px" file="QPopupProxy/Breakpoint" />

### 穿越属性
请记住，所有来自[QMenu](/vue-components/menu)和[QDialog](/vue-components/dialog)的属性都通过这个组件传递。所以像 "offset "或 "transition-show"(仅仅是一个例子)这样的属性可以和QPopupProxy一起使用。

<doc-example title="来自QMenu或QDialog的props" file="QPopupProxy/Passthrough" />

::: warning
QPopupProxy将一些组件([QDate](/vue-components/date), [QTime](/vue-components/time), [QCarousel](/vue-components/carousel) 和 [QColor](/vue-components/color-picker))视为特殊组件，强制对其进行`cover: true`和`maxHeight: '99vh'`。如果你不想要这种行为，只需将一个`div'作为QPopupProxy的第一层子节点。
:::
