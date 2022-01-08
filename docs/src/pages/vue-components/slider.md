---
title: 滑块
desc: QSlider Vue组件是一种很好的方式，用户可以在最小值和最大值之间指定一个数字值，有效值之间可以选择阶梯。
keys: QSlider
related:
  - /vue-components/range
  - /vue-components/field
---
QSlider是一种很好的方式，用户可以在最小值和最大值之间指定一个数字值，有效值之间可以选择阶梯。该滑块也有一个焦点指示器(高亮的滑块按钮)，它允许用键盘调整滑块。

也可以查看它的 "兄弟姐妹"，[QRange](/vue-components/range) 组件。

## QSlider API

<doc-api file="QSlider" />

## 使用方法

::: warning
您有责任在QSlider周围留出空间，使标签和标记标签不会与您页面上的其他内容重叠。您可以使用CSS margin或padding来达到这个目的。
:::

### 标准

<doc-example title="标准" file="QSlider/Standard" />

### 垂直方向

<doc-example title="垂直方向" file="QSlider/Vertical" /> ### 垂直方向

### 带有内部最小/最大值 <q-badge align="top" color="brand-primary" label="v2.4+" />

有时你需要将模型值限制在轨道长度内的一个区间。为此，使用`inner-min`和`inner-max`属性。第一个属性需要高于或等于`min`属性，而后者则需要低于或等于`max`属性。

<doc-example title="内部最小/最大" file="QSlider/InnerMinMax" />

### 带步骤

<doc-example title="有步骤" file="QSlider/Step" /> ###有步骤

阶梯 "属性也可以是浮点数(如果你需要无限的精度，也可以是数字 "0")。

<doc-example title="浮点" file="QSlider/FloatingPoint" />

<doc-example title="抓取到步骤" file="QSlider/Snap" />

### 带标签

在下面的示例中，移动滑块可以看到标签。

<doc-example title="有标签" file="QSlider/Label" />

<doc-example title="总是显示标签" file="QSlider/LabelAlways" />

<doc-example title="自定义标签值" file="QSlider/LabelValue" />

下面的示例更好地强调了QSlider如何处理标签的定位，使其始终保持在QSlider的水平方向上的框内。

<doc-example title="长标签" file="QSlider/LabelLong" />

### 标记

<doc-example title="标记" file="QSlider/Markers" /> ### 标记标签

### 标记标签 <q-badge align="top" color="brand-primary" label="v2.4+"

<doc-example title="标记标签" file="QSlider/MarkerLabels" /> ###标记标签

::: tip TIP on slots
为了使用标记标签槽(见下文)，你必须通过使用`标记-标签'属性来启用它们。
:::

<doc-example title="标记标签插槽" file="QSlider/MarkerLabelSlots" />

### 其他定制 <q-badge align="top" color="brand-primary" label="v2.4+"

<doc-example title="颜色定制" file="QSlider/SliderColoring" /> ###其他定制。

<doc-example title="隐藏选择栏" file="QSlider/NoSelection" />

<doc-example title="自定义轨迹图像" file="QSlider/TrackImages" />

<doc-example title="轨道和拇指大小" file="QSlider/SliderSizes" />

### 懒惰的输入

<doc-example title="懒人输入" file="QSlider/Lazy" /> ###懒人输入

### 空值

<doc-example title="空值" file="QSlider/Null" /> ### 空值

### 反向

<doc-example title="反转" file="QSlider/Reverse" /> ### 反转?

### 黑暗、只读、禁用

<doc-example title="黑暗" file="QSlider/Dark" dark /> ###黑暗、只读、禁用

<doc-example title="只读" file="QSlider/Readonly" /> ###暗部、只读、禁用

<doc-example title="禁用" file="QSlider/Disable" />

### 使用QItem

<doc-example title="使用QItem" file="QSlider/List" /> ### 使用QItem

### 本地表单提交

当处理一个有 "action "和 "method "的本地表单时(例如，当使用 Quasar 和ASP.NET控制器时)，你需要指定QSlider的 "name "属性，否则formData将不包含它(如果它应该包含)。

<doc-example title="本地表单" file="QSlider/NativeForm" />
