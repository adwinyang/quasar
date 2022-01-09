---
title: 旋钮
desc: QKnob Vue组件用于通过鼠标或触摸平移来获取数字输入。
keys: QKnob
related:
  - /vue-components/circular-progress
---

QKnob组件用于通过鼠标/触摸平移从用户那里获取数字输入。它基于[QCircularProgress](/vue-components/circular-progress)并继承了它的所有属性和行为。

## QKnob API

<doc-api file="QKnob" />

## 使用方法

默认情况下，QKnob继承了当前文本颜色(作为圆弧进度颜色和内部标签颜色)和当前字体大小(作为组件大小)。对于自定义，你可以使用尺寸和颜色相关的属性。

### 基础

<doc-example title="基础" file="QKnob/Basic" />

### 显示值

在下面的例子中，`show-value`属性也启用了默认槽，所以你可以用自定义的内容填充它，甚至像QAvatar或QTooltip。`font-size`属性指的是内部标签的字体大小。

<doc-example title="显示值" file="QKnob/ShowValue" />

### 最小和最大

<doc-example title="自定义最小/最大" file="QKnob/MinMax" />

### 自定义步骤

<doc-example title="自定义步长" file="QKnob/Step" />

### 偏移角度

<doc-example title="偏移角度" file="QKnob/Angle" />

### 禁用和只读

<doc-example title="禁用和只读" file="QKnob/DisableReadonly" />

### 本地表单提交

当处理一个有 `action` 和 `method`的本地表单时(例如，当使用Quasar和ASP.NET控制器时)，你需要在QKnob上指定 `name` 属性，否则formData将不包含它(如果它应该包含)。

<doc-example title="本地表单" file="QKnob/NativeForm" />
