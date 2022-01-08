---
title: 范围
desc: QRange Vue组件为用户提供了一种方法，可以从一个最大值和最大值之间的子范围中进行选择，并可以选择步骤。
keys: QRange
related:
  - /vue-components/slider
  - /vue-components/field
---
QRange组件是一个很好的方法，可以为用户提供一个最小值和最大值之间的子范围的选择，并可以选择这些值的步骤。Range组件的一个使用案例是提供一个价格范围的选择。

还可以看看它的 "兄弟姐妹"，[QSlider](/vue-components/slider)组件。

## QRange API

<doc-api file="QRange" />

## 使用方法

注意，我们正在使用一个对象来进行选择，它持有所选范围的低值--`rangeValues.min`和高值--`rangeValues.max`的值。

### 标准

::: warning
您有责任在QSlider周围留出空间，使标签和标记标签不会与您页面上的其他内容重叠。您可以使用CSS margin或padding来达到这个目的。
:::

<doc-example title="标准" file="QRange/Standard" />

### 垂直方向

<doc-example title="垂直方向" file="QRange/Vertical" /> ###垂直方向

### 带有内部最小/最大值 <q-badge align="top" color="brand-primary" label="v2.4+" />

有时你需要将模型值限制在轨道长度内的一个区间。为此，使用`inner-min`和`inner-max`属性。第一个属性需要高于或等于`min`属性，而后者则需要低于或等于`max`属性。

<doc-example title="内部最小/最大" file="QRange/InnerMinMax" />

### 带步骤

<doc-example title="有步骤" file="QRange/Step" /> ###有步骤

阶梯 "属性也可以是一个浮点数(如果你需要无限的精度，也可以是数字 "0")。

<doc-example title="浮点" file="QRange/FloatingPoint" />

<doc-example title="抓取到步骤" file="QRange/Snap" />

### 带标签

在下面的示例中，移动滑块可以看到标签。

<doc-example title="有标签" file="QRange/Label" />

<doc-example title="总是显示标签" file="QRange/LabelAlways" />

<doc-example title="自定义标签值" file="QRange/LabelValue" />

下面的示例更好地强调了QRange是如何处理标签定位的，以便它总是在水平方向上停留在QRange的盒子里。

<doc-example title="长标签" file="QRange/LabelLong" />

### 标记

<doc-example title="标记" file="QRange/Markers" /> ### 标记标签

### 标记标签 <q-badge align="top" color="brand-primary" label="v2.4+" />

<doc-example title="标记标签" file="QRange/MarkerLabels" /> ###标记标签

::: tip TIP on slots
为了使用标记标签槽(见下文)，你必须通过使用`标记-标签'属性来启用它们。
:::

<doc-example title="标记标签插槽" file="QRange/MarkerLabelSlots" />

### 其他定制 <q-badge align="top" color="brand-primary" label="v2.4+" />

<doc-example title="颜色定制" file="QRange/RangeColoring" /> ###其他定制。

<doc-example title="隐藏选择栏" file="QRange/NoSelection" />

<doc-example title="自定义轨道图像" file="QRange/TrackImages" />

<doc-example title="轨道和拇指大小" file="QRange/RangeSizes" />

### 拖动范围

使用`drag-range`或`drag-only-range`属性，允许用户移动选定的范围或只移动预先确定的整体范围。

<doc-example title="拖动范围" file="QRange/Drag" />

<doc-example title="拖动范围+抓取到步骤" file="QRange/DragSnap" />

<doc-example title="只拖动范围(固定间隔)" file="QRange/DragOnly" />

### 懒惰的输入

<doc-example title="懒人输入" file="QRange/Lazy" /> ###懒人输入

### 空值

<doc-example title="空值" file="QRange/Null" /> ### 空值

### 反向

<doc-example title="反转" file="QRange/Reverse" /> ### 反转？

### 黑暗、只读、禁用

<doc-example title="黑暗" file="QRange/Dark" dark /> ###黑暗、只读、禁用

<doc-example title="只读" file="QRange/Readonly" /> ###黑暗、只读、禁用

<doc-example title="禁用" file="QRange/Disable" />

### 使用QItem

<doc-example title="使用QItem" file="QRange/List" /> ### 使用QItem

### 本地表单提交

当处理一个有 "action "和 "method "的本地表单时(例如，当使用 Quasar 和ASP.NET控制器时)，你需要指定QRange上的 "name "属性，否则formData将不包含它(如果它应该包含)。

<doc-example title="本地表单" file="QRange/NativeForm" />
