---
title: 阶梯式
desc: QStepper Vue组件通过一连串编号的步骤来传达进度。它也可以用于导航。当用户必须按照步骤来完成一个过程时，它通常是有用的，比如在一个向导中。
keys: QStepper,QStep,QStepperNavigation
related:
  - /options/transitions
---

步进器通过一连串的逻辑和编号的步骤显示进度。它们也可用于导航。
当用户必须按照步骤来完成一个过程时，它们通常很有用，比如在[向导](https://en.wikipedia.org/wiki/Wizard_(software))。

## QStepper API

<doc-api file="QStepper" />

## QStep API

<doc-api file="QStep" />

## QStepperNavigation API

这个组件允许你在`QStepper'或`QStep'中放置按钮来
在步骤中导航。这取决于你添加任何你需要的按钮。

::: tip
要使用全局导航，你必须把它添加到`QStepper`'导航'槽中。
:::

<doc-api file="QStepperNavigation" />

## 使用方法

::: tip
如果QStep的内容也有图片，并且你想使用滑动动作来导航，你可能想给它们添加`draggable="false"`，否则本地浏览器的行为可能会以消极的方式进行干扰。
:::

::: danger Keep Alive
* 如果你需要这种行为，请注意QStepper的布尔值`keep-alive`属性。不要在QStep上使用Vue的本地`<keep-alive>`组件。
* 如果你需要`keep-alive-include`或`keep-alive-exclude`属性，那么QStep的`名称`必须是有效的Vue组件名称(不允许有空格，不要以数字开头等)。
:::

### 水平

<doc-example title="水平" file="QStepper/TypeHorizontal" />

### 垂直的

<doc-example title="垂直" file="QStepper/TypeVertical" /> ### 垂直

### 头部导航

<doc-example title="非线性的标题导航" file="QStepper/NonLinearNavigation" /> ###标题导航

<doc-example title="线性标题导航" file="QStepper/LinearNavigation" /> ###标题选项

### 头部选项

<doc-example title="提示步骤错误" file="QStepper/StepError" /> ###标题选项

<doc-example title="替代标签" file="QStepper/AlternativeLabels" /> ###标题选项

::: tip
你也可以将`contracted'属性连接到`$q.screen'来创建一个响应行为，比如`:contracted="$q.screen.lt.md"`。
更多信息。[Quasar Screen Plugin](/options/screen-plugin)。
:::

<doc-example title="签约" file="QStepper/Contracted" />

### 风格

使用`*-icon`和`*-color`属性(在QStepper上或在特定的QStep上覆盖)来玩着色。

<doc-example title="着色" file="QStepper/Coloring" />

你也可以使用`prefix`属性(最多2个字符)来代替每个步骤的标题的图标。如果该步骤目前没有被编辑，并且没有被标记为错误或 "已完成"，这将被显示。

<doc-example title="步骤前缀" file="QStepper/Prefix" />

<doc-example title="黑暗" file="QStepper/Dark" />

你可以使用`header-class`属性来应用任何CSS类到标题上。在下面的示例中，我们正在应用加粗的文本。

<doc-example title="页眉类" file="QStepper/HeaderClass" />

### 信息槽

<doc-example title="具有固定高度步骤的消息槽" file="QStepper/MessageSlot" /> ###消息槽
