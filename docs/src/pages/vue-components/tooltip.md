---
title: 工具提示
desc: QTooltip Vue组件是当你想为用户提供关于你的应用程序中某个区域的更多信息时使用的。当把鼠标悬停在目标元素上时(或在移动平台上短暂触摸并保持)，工具提示就会出现。
keys: QTooltip
related:
  - /vue-components/menu
components:
  - tooltip/TooltipPositioning
---
当你想为用户提供关于你的应用程序中某一区域的更多信息时，可以使用QTooltip组件。当把鼠标悬停在目标元素上时(或在移动平台上快速点击)，工具提示将出现。

## QTooltip API

<doc-api file="QTooltip" />

## 使用方法
QTooltip的想法是把它放在你想成为触发器的DOM元素/组件里面，作为直接的孩子。不要担心QTooltip的内容会从容器中继承CSS，因为QTooltip将通过Quasar Portal作为`<body>`的直接子节点被注入。

<doc-example title="基础" file="QTooltip/Basic" />

<doc-example title="通过v-model切换" file="QTooltip/VModel" />

### 自定义

<doc-example title="自定义" file="QTooltip/Coloring" />

<doc-example title="自定义延迟(1秒)" file="QTooltip/OneSecond" />

<doc-example title="带有偏移" file="QTooltip/Offset" />

### 转变

在下面的例子中，有几个过渡的展示。对于可用的过渡的完整列表，请访问[过渡](/options/transitions)。

<doc-example title="自定义过渡" file="QTooltip/CustomTransition" />

### 可重复使用

下面的例子显示了如何创建一个可重复使用的菜单，可以与不同的目标共享。

<doc-example title="使用目标" file="QTooltip/Target" />

### 定位
QTooltip的位置可以被定制。它考虑到了 "anchor "和 "self "的可选属性。
QTooltip弹出窗口的最终位置是经过计算的，因此它将显示在可用的屏幕空间上，必要时切换到右侧或顶部。

对于水平定位，你可以使用`start`和`end`，当你想自动考虑RTL或非RTL时。`start`和`end`意味着非RTL的"左"和RTL的"右"。

<tooltip-positioning />
