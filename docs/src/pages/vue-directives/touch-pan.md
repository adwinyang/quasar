---
title: 触摸盘指令
desc: Vue指令，当用户在一个组件或元素上拖动手指或鼠标时，会触发一个事件。
keys: touch-pan
related:
  - /vue-directives/touch-swipe
  - /vue-directives/touch-hold
---
Quasar提供了全功能的Vue指令，可以完全取代Hammerjs等库：`v-touch-pan`, `v-touch-swipe`, `v-touch-hold`甚至`v-touch-repeat`。

> **这些指令也适用于鼠标事件，而不仅仅是触摸事件**，所以你也能够在桌面上为你的应用程序建立很酷的功能。

我们将在下面的行中描述`v-touch-pan`。

## TouchPan API

<doc-api file="TouchPan" />

## 使用方法
在下面的区域点击然后用你的鼠标向一个方向平移，看看它的作用。
页面滚动是被阻止的，但是如果你愿意，你可以选择退出。

::: tip
如果你的内容也有图片，你可能想给它们添加`draggable="false"`，否则本地浏览器的行为可能会产生负面的干扰。
:::

<doc-example title="所有方向" file="TouchPan/Basic" />

平移既可以用鼠标也可以用本地的触摸动作。
你也可以只捕捉某些方向(任何方向)的平移，你将在下面看到。

只捕获水平平移的示例。
注意，在具有触摸功能的设备上，滚动不会被阻止，因为我们只捕捉水平方向。

<doc-example title="水平" file="TouchPan/Horizontal" />

关于只捕获垂直平移的示例。页面滚动被阻止了，但是如果你愿意，你可以选择退出。

<doc-example title="垂直" file="TouchPan/Vertical" />

关于捕捉自定义方向上的平移的示例。为此，使用修改器：`向上`、`向下`、`向左`、`向右`。页面滚动是被阻止的，但如果你愿意，你可以选择退出。

<doc-example title="自定义方向" file="TouchPan/Custom" />

### 处理鼠标事件
当你也想处理鼠标事件时，使用`mouse`修改器。

```html
<!--
  directive will also be triggered by mouse actions
-->
<div v-touch-pan.mouse="userHasPanned">...</div>
```

### 阻止滚动(在具有触摸功能的设备上)
默认情况下，该指令不会阻止页面滚动。如果你想阻止滚动，那么请使用`prevent`修饰语。

```html
<div v-touch-pan.prevent="userHasPanned">...</div>
```

### 抑制TouchPan
当你想抑制TouchPan时，你可以通过停止传播内部内容的`touchstart`/`mousedown`事件来实现。

```html
<div v-touch-pan.mouse="userHasHold">
  <!-- ...content -->
  <div @touchstart.stop @mousedown.stop>
    <!--
      TouchPan will not apply here because
      we are calling stopPropagation() on touchstart
      and mousedown events
    -->
  </div>
  <!-- ...content -->
</div>
```

然而，如果你使用`capture`或`mouseCapture`修改器，那么事件将首先到达TouchPan指令，然后是内部内容，所以TouchPan仍然会触发。

## 使用FAB的示例

下面是一个在QFab上使用TouchPan的好示例。你可以在屏幕上拖动它。

<doc-example title="Draggable" file="QFab/Draggable" />

## 关于HMR的说明
由于性能原因，不是所有的修改器都是反应式的。有些需要窗口/页面/组件的刷新来获得更新。请查看API卡，看看那些没有被标记为反应式的修改器。
