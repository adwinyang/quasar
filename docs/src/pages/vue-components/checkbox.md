---
title: 复选框
desc: QCheckbox Vue组件是一个具有着色、波纹和不确定状态等功能的检查框。
keys: QCheckbox
related:
  - /vue-components/toggle
  - /vue-components/option-group
  - /vue-components/radio
  - /vue-components/button-toggle
---

QCheckbox组件是另一个用于用户输入的基本元素。你可以用它来为用户提供一种切换选项的方法。

::: tip
关于创建复选框组的其他可能性，也请参考[QOptionGroup](/vue-components/option-group) 。
:::


## QCheckbox API

<doc-api file="QCheckbox" />

## 使用方法

### 标准

<doc-example title="标准" file="QCheckbox/Standard" />

### 标签

<doc-example title="标签" file="QCheckbox/Label" />

### 着色

在下面例子的第二行中，属性`keep-color`被用来在复选框不处于切换状态时保留传入的颜色。

<doc-example title="着色" file="QCheckbox/Coloring" />

### 浓密和黑暗

<doc-example title="浓密" file="QCheckbox/Dense" />

<doc-example title="深色背景下" file="QCheckbox/OnDarkBackground" dark />

### 尺寸

除了下面的标准尺寸外，你可以通过`size`属性定义你自己的尺寸(最后一个是自定义尺寸)。

<doc-example title="标准尺寸" file="QCheckbox/StandardSizes" />

### 不确定的状态

在下面的例子中，一旦你点击了第一个复选框，它就开始在真/假之间切换。另一方面，第二个复选框在 "toggle-indeterminate "的帮助下在三种状态(不定/真/假)之间切换。你可以选择设置属性`indeterminat-value`，否则，不确定的值将被视为`null`。

<doc-example title="不确定的状态" file="QCheckbox/IndeterminateState" />

### 切换顺序

默认情况下，QCheckbox在切换时遵循这个链条：不确定->选中->未选中。然而，你可以通过`toggle-order`属性改变这一行为。这个属性决定了状态的顺序，可以是`tf`(默认)或`ft`(`t`代表true/checked状态，`f`代表false/unchecked状态)。

切换的顺序是。

* 如果`toggle-indetinate`为真，那么：indet -> 第一个状态 -> 第二个状态 -> indet (并重复)
* 否则(没有切换不定)：indet -> 第一状态 -> 第二状态 -> 第一状态 -> 第二状态 -> ...

<doc-example title="切换顺序" file="QCheckbox/ToggleOrder" />

### 阵列模型

<doc-example title="数组作为模型" file="QCheckbox/ArrayAsModel" />

### 自定义模型值

<doc-example title="自定义模型值" file="QCheckbox/CustomModel" />

### 使用 QOptionGroup

::: tip
你也可以使用[QOptionGroup](/vue-components/option-group)，当你有一组复选框时，它可以简化使用，就像下面的例子。
:::

<doc-example title="Usage with QOptionGroup" file="QCheckbox/OptionGroup" />

### 使用 QItem

在下面的例子中，我们渲染了一个`<label>`标签(注意`tag="label"`)，所以QCheckbox会响应QItems的点击来改变切换状态。

<doc-example title="With QItem" file="QCheckbox/InaList" />

### 禁用

<doc-example title="Disable" file="QCheckbox/Disable" />

### Native form submit

### 本地表单提交

当处理一个有 `action`和`method`的本地表单时(例如，当使用Quasar和ASP.NET控制器时)，你需要在QCheckbox上指定`name`属性，否则formData将不包含它(如果它应该包含的话)--所有的值都被转换为字符串(本地行为，所以不要使用Object值)：

<doc-example title="Native form" file="QCheckbox/NativeForm" />
