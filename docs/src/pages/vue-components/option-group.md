---
title: 选项组
desc: QOptionGroup Vue组件允许你更好地控制二进制表单输入组件的分组，如复选框、收音机或切换。
keys: QOptionGroup
related:
  - /vue-components/radio
  - /vue-components/checkbox
  - /vue-components/toggle
  - /vue-components/button-toggle
---

QOptionGroup组件是一个辅助组件，它允许你更好地控制二进制(开或关，真或假，1或0)表单输入组件的分组，如复选框、收音机或切换。这个组件的一个很好的用途是提供一组可以打开和关闭的选项或设置。

## QOptionGroup API

<doc-api file="QOptionGroup" />

## 用法

### 标准

<doc-example title="标准" file="QOptionGroup/Standard" />

### 使用QCheckbox或QToggle

<doc-example title="使用复选框" file="QOptionGroup/Checkbox" /> ###使用QCheckbox或QToggle

::: warning
复选框/切换器的模型必须是一个数组。
:::

<doc-example title="使用切换器" file="QOptionGroup/Toggle" />

### 使用标签槽 <q-badge align="top" color="brand-primary" label="v2.2+" />

有两种类型的槽。一种是通用的(`label`)，适用于所有的选项，除非使用一种更具体的基于索引的(`label-N`，其中N是选项的0基索引)。这两种类型的槽都接收各自的选项作为参数。

注意我们是如何为第一个选项(索引为0的选项)使用特定的标签槽的，我们还添加了一个QTooltip。

<doc-example title="标签槽" file="QOptionGroup/LabelSlots" />

### 在左边有标签

<doc-example title="在左边有选项标签" file="QOptionGroup/Label" />

### 内联

<doc-example title="内联" file="QOptionGroup/Inline" /> ### 内联

### 密集型

<doc-example title="密集和内联" file="QOptionGroup/DenseInline" /> ###密集型

### 禁用

<doc-example title="禁用" file="QOptionGroup/Disable" /> ###禁用

::: tip
`options`数组中的对象可以持有QToggle、QCheckbox或QRadio中的任何属性，例如`disable`或`leftLabel`。请看下面的示例。
:::

### 禁用某些选项

<doc-example title="禁用某些选项" file="QOptionGroup/DisableCertainOptions" />

### 深色

<doc-example title="在黑暗的背景下" file="QOptionGroup/Dark" dark />

### 本地表单提交

当处理一个有 "action "和 "method "的本地表单时(例如，当使用Quasar和ASP.NET控制器时)，你需要在QOptionGroup上指定 "name "属性，否则formData将不包含它(如果它应该包含的话)--所有的值都被转换为字符串(本地行为，所以不要使用Object值)。

<doc-example title="本地表单" file="QOptionGroup/NativeForm" />
