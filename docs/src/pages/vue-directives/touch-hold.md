---
title: 触摸保持指令
desc: Vue指令，当用户触摸并保持在一个组件或元素上一定时间时，会触发一个事件。
keys: touch-hold
related:
  - /vue-directives/touch-pan
  - /vue-directives/touch-swipe
---
 Quasar 提供了全功能的Vue指令，可以完全取代Hammerjs等库：`v-touch-pan`, `v-touch-swipe`, `v-touch-hold`甚至`v-touch-repeat`。

> **这些指令也适用于鼠标事件，而不仅仅是触摸事件**，所以你也能够在桌面上为你的应用程序建立很酷的功能。

我们将在下面几行中描述`v-touch-hold`指令。

## TouchHold API

<doc-api file="TouchHold" />

## 使用方法

<doc-example title="基本" file="TouchHold/Basic" /> ##使用方法

默认的等待时间是600ms，但你可以改变它。

<doc-example title="自定义等待时间" file="TouchHold/CustomTimer" /> ##使用方法

::: tip
TouchHold对触摸事件的默认灵敏度为5px，对鼠标事件的默认灵敏度为7px，这意味着它允许手指或鼠标的轻微移动而不中止，改善了用户体验。
:::

然而，你也可以改变这个灵敏度(注意下面的指令参数--`600:12:15`--600ms的等待时间，对触摸事件的12px灵敏度，对鼠标事件的15px灵敏度)。

<doc-example title="自定义灵敏度" file="TouchHold/CustomSensitivity" />

### 处理鼠标事件
当你也想处理鼠标事件时，使用`mouse`修改器。

```html
<div v-touch-hold.mouse="userHasHold">...</div>
```

### 抑制TouchHold
当你想抑制TouchHold时，你可以通过停止传播内部内容的`touchstart`/`mousedown`事件来实现。

```html
<div v-touch-hold.mouse="userHasHold">
  <!-- ...content -->
  <div @touchstart.stop @mousedown.stop>
    <!--
      TouchHold will not apply here because
      we are calling stopPropagation() on touchstart
      and mousedown events
    -->
  </div>
  <!-- ...content -->
</div>
```

### 抑制TouchHold

当你想抑制TouchHold时，你可以通过停止传播内部内容的`touchstart`/`mousedown`事件来实现。

