---
title: 按钮切换
desc: QBtnToggle Vue组件是一个用于用户输入的基本元素，类似于QRadio，但有按钮。
keys: QBtnToggle
related:
  - /vue-components/button
  - /vue-components/tabs
  - /vue-components/option-group
  - /vue-components/radio
  - /vue-components/checkbox
  - /vue-components/toggle
---
QBtnToggle组件是另一个用于用户输入的基本元素，类似于QRadio，但有按钮。你可以用它来为用户提供一种方法，让他们从多个选择中挑选一个选项。

## QBtnToggle API

<doc-api file="QBtnToggle" />

## 用法

### 基础

<doc-example title="基础" file="QBtnToggle/Basic" />

### 设计

::: tip
由于QBtnToggle使用了QBtn，你可以使用QBtn的相关设计属性来设计这个组件。
:::

<doc-example title="一些设计实例" file="QBtnToggle/Design" />

<doc-example title="水平传播" file="QBtnToggle/Spread" />

<doc-example title="在深色背景下" file="QBtnToggle/Dark" dark />

### 自定义内容

下面的第一个QBtnToggle在每个按钮上都有工具提示。第二个QBtnToggle有自定义内容。注意`options`对象定义中的`slot`属性。当你使用这个`slot'属性时，你就不需要`options'中的`label'/`icon'属性了。

<doc-example title="自定义按钮内容" file="QBtnToggle/CustomContent" />

### 禁用和只读

<doc-example title="禁用和只读" file="QBtnToggle/DisableReadonly" />

### 本地表单提交

当处理一个有 `action`和`method`的本地表单时(例如，当使用Quasar和ASP.NET控制器时)，你需要在QBtnToggle上指定`name`属性，否则formData将不包含它(如果它应该包含的话)--所有的值都被转换为字符串(本地行为，所以不要使用Object值)。

<doc-example title="本地表单" file="QBtnToggle/NativeForm" />
