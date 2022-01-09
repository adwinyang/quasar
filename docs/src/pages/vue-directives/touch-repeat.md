---
title: 触摸重复指令
desc: Vue指令，当用户触摸并按住一个组件或元素时，在指定的时间间隔内触发一个事件。
keys: touch-repeat
---
 Quasar 提供了全功能的Vue指令，可以完全取代Hammerjs等库：`v-touch-pan`, `v-touch-swipe`, `v-touch-hold` 和 `v-touch-repeat`。

> **这些指令也适用于鼠标事件，而不仅仅是触摸事件**，所以你也能够在桌面上为你的应用程序建立很酷的功能。

我们将在下面的行中描述`v-touch-repeat`。

## TouchRepeat API

<doc-api file="TouchRepeat" />

## 使用方法
用你的鼠标在下面的区域点击并按住，看看它的操作情况。
注意，在具有触摸功能的设备上，滚动不会被阻止。

> 默认的重复模式是0:600:300(ms)。

<doc-example title="基本" file="TouchRepeat/Basic" />

下面是一个示例，配置成也对`SPACE`、`ENTER`和`h`键做出反应(**先关注它**)，重复模式为0:300:200(ms)。点击并按住按键，或点击/轻拍并按住。

<doc-example title="自定义按键" file="TouchRepeat/Keys" />

下面是一个将TouchRepeat应用于QBtn的示例。注意我们是如何玩弄指令参数的，以便使蓝色按钮的增量比红色按钮的增量慢。

<doc-example title="应用于QBtn" file="TouchRepeat/Buttons" />

### 处理鼠标事件
当你也想处理鼠标事件时，使用`mouse`修饰符。

```html
<div v-touch-repeat.mouse="myHandler">...</div>
```

### 处理按键事件
当你也想处理按键事件时，使用[keycodes](https://keycode.info/)作为修饰语。

```html
<div v-touch-repeat.65.70="myHandler">...</div>
```

有一些特殊的修饰语，你不需要写出相应的键码。`space`, `tab`, `enter`.

### 抑制 TouchRepeat
当你想抑制TouchRepeat时，你可以通过停止传播内部内容的`touchstart`/`mousedown`/`keydown`事件来实现。

```html
<div v-touch-repeat.mouse.enter="userHasHold">
  <!-- ...内容 -->
  <div @touchstart.stop @mousedown.stop @keydown.stop>
    <!--
      TouchRepeat 不适用于此处，因为
      我们在 touchstart 上调用 stopPropagation()，
      mousedown 和 keydown 事件    -->
  </div>
  <!-- ...内容 -->
</div>
```

然而，如果你使用`capture`，`mouseCapture`或`keyCapture`修饰符，那么事件将首先到达TouchRepeat 指令，然后是内部内容，所以 TouchRepeat 仍然会被触发。

## 关于HMR的说明
由于性能原因，不是所有的修饰符都是反应式的。有些需要窗口/页面/组件的刷新来获得更新。请查看API卡，看看那些没有被标记为反应式的修饰符。
