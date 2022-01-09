---
title: 颜色选择器
desc: QColorPicker Vue组件为用户提供了一种输入颜色的方式。
keys: QColorPicker
related:
  - /quasar-utils/color-utils
---

QColor 组件提供了一个输入颜色的方法。

::: tip
对于处理颜色，也可以查看[Quasar 颜色工具](/quasar-utils/color-utils)。
:::


## QColor API

<doc-api file="QColor" />

## 使用方法

### 基础

<doc-example title="基础" file="QColor/Basic" />

### 使用QInput

<doc-example title="输入" file="QColor/Input" />

有**帮助**QInput的`规则`属性。[完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js) 。你可以为了方便而使用这些，或者写下指定你的[自定义需求](/vue-components/input#internal-validation) 的字符串。

例子。"hexColor", "rgbOrRgbaColor", "anyColor"。

更多信息：[QInput](/vue-components/input)。

### 没有页眉或页脚

你可以选择是否不渲染页眉和/或页脚，就像下面的例子。

<doc-example title="没有页眉/页脚" file="QColor/NoHeaderFooter" />

### 自定义默认视图

你也可以选择默认视图，就像下面的例子一样，我们还指定不要渲染页眉和页脚。最终的结果是生成一个漂亮的调色板，用户可以从中挑选。

<doc-example title="自定义默认视图" file="QColor/CustomDefaultView" />

### 自定义调色板

<doc-example title="自定义调色板" file="QColor/CustomPalette" />

### 黑暗模式

<doc-example title="暗色版本" file="QColor/Dark" />

### 默认值

<doc-example title="默认值" file="QColor/DefaultValue" />

### 懒惰的更新

<doc-example title="懒惰模型" file="QColor/LazyModel" />

### 禁用和只读

<doc-example title="禁用和只读" file="QColor/DisableReadonly" />

### 本地表单提交

当处理一个有 `action`和`method`的本地表单时(例如，当使用Quasar和ASP.NET控制器时)，你需要指定QColor的 "name "属性，否则formData将不包含它(如果它应该包含的话)。

<doc-example title="本地表单" file="QColor/NativeForm" />
