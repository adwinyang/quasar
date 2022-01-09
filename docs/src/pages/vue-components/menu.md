---
title: 菜单
desc: QMenu Vue组件是一种显示菜单的便捷方式。
keys: QMenu
related:
  - /vue-directives/close-popup
  - /options/transitions
  - /vue-components/popup-proxy
components:
  - menu/MenuPositioning
---

QMenu组件是一种显示菜单的便捷方式。与[QList](/vue-components/list-and-list-items)作为下拉内容搭配得非常好，但它绝不仅限于此。

## QMenu API

<doc-api file="QMenu" />

## 使用方法

QMenu的想法是将它放在你的DOM元素/组件内，你希望它作为直接的子元素被触发。不要担心QMenu的内容会继承容器中的CSS，因为QMenu会通过Quasar Portal作为`<body>`的直接子节点被注入。

::: tip
如果你想让菜单自动关闭，别忘了在你的可点击菜单项中使用指令`v-close-popup`。
另外，你可以使用QMenu的属性`auto-close`或者通过它的v-model自己处理关闭菜单。
:::

### 基础

<doc-example title="基础" file="QMenu/Basic" />

<doc-example title="内容的想法" file="QMenu/VariousContent" />

<doc-example title="通过v-model进行切换" file="QMenu/VModel" />

### 子菜单

<doc-example title="菜单中的菜单" file="QMenu/MenuInMenu" />

### 尺寸和样式

<doc-example title="尺寸" file="QMenu/Sizing" />

<doc-example title="风格" file="QMenu/Style" />

### 上下文菜单

你也可以将QMenu设置为上下文菜单。在桌面上，你需要右击父目标来触发它，而在移动设备上，长时间的点击就可以完成这个工作。

<doc-example title="上下文菜单" file="QMenu/ContextMenu" />

### 持久性

如果你想让QMenu在应用程序路线改变或按下ESCAPE键或点击/敲击菜单外的地方时不关闭，那么使用`persistent`属性。

<doc-example title="持久性" file="QMenu/Persistent" />

### 过渡

在下面的例子中，我们展示了一些过渡。关于可用的过渡的完整列表，请访问[过渡](/options/transitions)。

<doc-example title="转换实例" file="QMenu/Transitions" />

### 可重复使用

下面的例子显示了如何创建一个可重复使用的菜单，可以与不同的目标共享。

<doc-example title="使用目标" file="QMenu/Target" />

### 定位

<doc-example title="定位示例" file="QMenu/Positions" />

QMenu的位置可以被定制。它考虑到了 "anchor" 和 "self"这两个可选属性。
QMenu弹出窗口的最终位置会被计算出来，使其显示在可用的屏幕空间内，必要时切换到右侧和/或顶部。

对于水平定位，你可以使用`start`和`end`，当你想自动考虑RTL或非RTL时。`start`和`end`意味着非RTL的 "左"和RTL的 "右"。

<menu-positioning />
