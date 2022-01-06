---
title: 标签面板
desc: QTabPanel Vue组件是一种使用较少的窗口空间来显示更多信息的方式。
keys: QTabPanel,QTabPanels
related:
  - /vue-components/tabs
---
标签面板是一种利用较少的窗口空间来显示更多信息的方式。

::: tip
与[QTabs](/vue-components/tabs)一起使用非常好，但不需要与它一起使用。
:::

## QTabPanels API

<doc-api file="QTabPanels" />

## QTabPanel API

<doc-api file="QTabPanel" />

## 用法

::: tip
* 与[QTabs](/vue-components/tabs)一起使用非常好，这个组件提供了一个很好的方法来选择要显示的活动标签面板。
* 如果QTabpanel的内容也有图片，并且你想使用滑动动作来导航，你可能想给它们添加`draggable="false"`，否则本地浏览器的行为可能会以消极的方式干扰。
:::

::: warning IMPORTANT
不要被 "QTabPanels "组件的名字所误导。面板不需要QTabs。它们也可以作为独立的东西使用。
:::

::: danger Keep Alive
* 如果你需要这种行为，请注意QTabPanels的布尔值`keep-alive`属性。请不要在QTabPanel上使用Vue的本地`<keep-alive>`组件。
* 如果你需要`keep-alive-include`或`keep-alive-exclude`属性，那么QTabPanel的`name`s必须是有效的Vue组件名称(不允许有空格，不要以数字开头等)。
:::

### 基本

<doc-example title="基本" file="QTabPanels/Basic" />

### 使用QTabs

::: tip
QTabPanels也可以作为独立的使用。它们不依赖于QTabs的存在。而且，它们可以被放置在页面的任何地方，而不仅仅是靠近QTabs。
:::

<doc-example title="使用QTabs" file="QTabPanels/WithQTabs" />

<doc-example title="一个更复杂的示例" file="QTabPanels/WithNestedQTabs" />

### 着色

<doc-example title="着色" file="QTabPanels/Coloring" /> ###着色

### 使用垂直的QTabs和QSplitter

<doc-example title="有垂直的QTabs和QSplitter" file="QTabs/Vertical" /> ###有垂直的QTabs和QSplitter。

关于过渡的完整列表，请查看[过渡](/options/transitions)。

### 自定义转场

<doc-example title="自定义过渡实例" file="QTabPanels/Transition" />

在下面的示例中，用你的鼠标在面板中滑动，或者，如果在一个有触摸功能的设备上，用你的手指来滑动。

### 可滑动和无限的

<doc-example title="可滑动和无限" file="QTabPanels/Swipeable" />

### 可垂直刷卡和无限刷卡

<doc-example title="垂直刷卡和无限刷卡" file="QTabPanels/VerticalSwipeable" /> ### 垂直刷卡和无限刷卡
