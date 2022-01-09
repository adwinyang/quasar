---
title: 切换开关
desc: QToggle组件是一个用户输入的基本元素。你可以用它来打开和关闭设置、功能或真/假输入。
keys: QToggle
related:
  - /vue-components/checkbox
  - /vue-components/option-group
  - /vue-components/radio
  - /vue-components/button-toggle
---
QToggle组件是另一个用于用户输入的基本元素。你可以用它来打开和关闭设置、功能或真/假输入。

::: tip
关于创建复选框组的其他可能性，也请参考[QOptionGroup](/vue-components/option-group) 。
:::

## QToggle API

<doc-api file="QToggle" />

## 使用方法

### 基础

使用`color`属性来控制toggle的颜色。

<doc-example title="基础" file="QToggle/Standard" />

### 带有标签

<doc-example title="有标签" file="QToggle/Labels" />

### 保持颜色

<doc-example title="保留颜色" file="QToggle/KeepColor" />

### 有图标

<doc-example title="图标" file="QToggle/Icons" />

### 自定义模型值

你可以使用自定义的值，而不是默认的`true`/`false`值。

<doc-example title="自定义模型值" file="QToggle/CustomValues" />

### 不确定的状态

在下面的例子中，一旦你点击第一个QToggle，它就开始在真/假之间切换。另一方面，第二个QToggle在`toggle-indeterminate`的帮助下，在三种状态(不定/真/假)之间切换。你可以选择设置属性`indeterminate-value`，否则不确定的值将被视为`null`。

<doc-example title="不确定的状态" file="QToggle/IndeterminateState" />

### 切换顺序

默认情况下，QToggle在切换时遵循这样的链条：不定状态->选中->未选中。然而，你可以通过`toggle-order`属性改变这一行为。这个属性决定了状态的顺序，可以是`tf`(默认)或`ft`(`t`代表true/checked状态，`f`代表false/unchecked状态)。

切换的顺序是。

* 如果`toggle-indetinate`为`true`，那么：不确定 -> 第一状态 -> 第二状态 -> indet (并重复)
* 否则(没有切换"不确定")：indet -> 第一状态 -> 第二状态 -> 第一状态 -> 第二状态 -> ...

<doc-example title="切换顺序" file="QToggle/ToggleOrder" />

### 数组模型

如果你为一个选择有许多切换，可以使用一个数组作为所有这些切换的模型，并在每个切换上指定`val`属性。如果切换器被勾选，它的`val`将被插入数组中，反之亦然。

<doc-example title="阵列模型" file="QToggle/ArrayValue" />

### 黑暗和禁用

<doc-example title="在黑暗的背景下" file="QToggle/DarkBackground" dark />

<doc-example title="禁用的状态" file="QToggle/Disabled" />

### 尺寸

除了下面的标准尺寸外，你可以通过`size`属性定义你自己的尺寸(最后一个是自定义尺寸)。

<doc-example title="标准尺寸" file="QToggle/StandardSizes" />

### 使用QOptionGroup

::: tip
你也可以使用[QOptionGroup](/vue-components/option-group)，当你有成组的切换器时，它可以简化使用，就像下面的例子。
:::

<doc-example title="使用QOptionGroup" file="QToggle/OptionGroup" />

### 使用QItem

<doc-example title="使用QItem" file="QToggle/List" />

### 本地表单提交

当处理一个有 `action`和`method`的本地表单时(例如，当使用Quasar和ASP.NET控制器时)，你需要在QToggle上指定`name`属性，否则formData将不包含它(如果它应该包含的话)--所有的值都被转换为字符串(本地行为，所以不要使用Object值)。

<doc-example title="本地表单" file="QToggle/NativeForm" />
