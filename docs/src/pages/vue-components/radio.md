---
title: 电台
desc: QRadio Vue组件是一个用户输入的基本元素。它可以用来为用户提供一种方式，让他们从多个选择中挑选一个选项。
keys: QRadio
related:
  - /vue-components/option-group
  - /vue-components/button-toggle
  - /vue-components/checkbox
  - /vue-components/toggle
---

QRadio组件是另一个用于用户输入的基本元素。你可以用它来为用户提供一种方法，让他们从多个选择中挑选一个选项。

::: tip
也请参考[QOptionGroup](/vue-components/option-group)关于创建Radios组的其他可能性。
:::

## QRadio API

<doc-api file="QRadio" />

## 用法

### 标准

<doc-example title="标准" file="QLadio/Standard" />

### 密集型

<doc-example title="密集" file="QRadio/Dense" /> ###密集型

### 着色

在下面示例的第二行中，属性`keep-color`被用来在单选按钮不处于切换状态时保留传入的颜色。

<doc-example title="着色" file="QLadio/Coloring" />

### 深色和禁用

<doc-example title="在黑暗背景下" file="QRadio/OnDarkBackground" dark />

<doc-example title="禁用" file="QRadio/Disable" /> ### 左侧的标签

### 左侧的标签

<doc-example title="标签在左侧" file="QRadio/LabelPosition" /> ### 标签在左侧

### 尺寸

除了下面的标准尺寸外，你可以通过`size'属性定义你自己的尺寸(最后一个是自定义尺寸)。

<doc-example title="标准尺寸" file="QLadio/StandardSizes" />

### 使用QOptionGroup

::: tip
你也可以使用[QOptionGroup](/vue-components/option-group)，当你有一组收音机时，它可以简化使用，比如下面的示例。
:::

<doc-example title="Usage with QOptionGroup" file="QRadio/OptionGroup" />

### With QItem

In the example below, we are rendering a `<label>` tag (notice `tag="label"`) so the QRadio will respond to clicks on QItems to change toggle state.

<doc-example title="With QItem" file="QRadio/InaList" />

### Native form submit

When dealing with a native form which has an `action` and a `method` (eg. when using Quasar with ASP.NET controllers), you need to specify the `name` property on QRadio, otherwise formData will not contain it (if it should) - all value are converted to string (native behaviour, so do not use Object values):

<doc-example title="Native form" file="QRadio/NativeForm" />
