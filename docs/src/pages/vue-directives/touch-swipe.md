---
title: 触摸刷卡指令
desc: Vue指令，当用户用手指或鼠标在一个组件或元素上滑动时，会触发一个事件。
keys: touch-swipe
related:
  - /vue-directives/touch-pan
  - /vue-directives/touch-hold
---
 Quasar 提供了全功能的Vue指令，可以完全取代Hammerjs等库：`v-touch-pan`, `v-touch-swipe`, `v-touch-hold`甚至`v-touch-repeat`。

> **这些指令也适用于鼠标事件，而不仅仅是触摸事件**，所以你也能够在桌面上为你的应用程序建立很酷的功能。

我们将在下面的行中描述`v-touch-swipe`。

## TouchSwipe API

<doc-api file="TouchSwipe" />

## 使用方法
用你的鼠标在下面的区域刷一下，看看它的作用。如果使用鼠标，你需要快速完成。

::: tip
如果你的内容也有图片，你可能想给它们添加`draggable="false"`，否则本地浏览器的行为可能会产生负面的干扰。
:::

<doc-example title="所有方向" file="TouchSwipe/Basic" />

<doc-example title="只有一个方向" file="TouchSwipe/Right" />

<doc-example title="多个方向" file="TouchSwipe/UpOrLeft" />

### 处理鼠标事件
当你也想处理鼠标事件时，使用`mouse`修改器。

```html
<div v-touch-swipe.mouse="userHasSwiped">...</div>
```

### 抑制TouchSwipe
当你想抑制TouchSwipe时，你可以通过停止传播内部内容的`touchstart`/`mousedown`事件来实现。

```html
<div v-touch-swipe.mouse="userSwiped">
  <!-- ...content -->
  <div @touchstart.stop @mousedown.stop>
    <!--
      TouchSwipe will not apply here because
      we are calling stopPropagation() on touchstart
      and mousedown events
    -->
  </div>
  <!-- ...content -->
</div>
```

然而，如果你使用`capture`或`mouseCapture`修改器，那么事件将首先到达TouchHold指令，然后是内部内容，所以TouchSwipe仍然会触发。

## 关于HMR的说明
由于性能原因，不是所有的修改器都是反应式的。有些需要窗口/页面/组件的刷新来获得更新。请查看API卡，看看那些没有被标记为反应式的修改器。
