---
title: 循环进步
desc: QCircularProgress Vue组件显示一个彩色的圆形加载指标。该条可以有一个确定的进度，也可以有一个不确定的动画。
keys: QCircularProgress
related:
  - /vue-components/linear-progress
  - /vue-components/inner-loading
  - /vue-components/spinners
  - /vue-components/skeleton
  - /quasar-plugins/loading
  - /quasar-plugins/loading-bar
---

QCircularProgress组件显示一个彩色的圆形进度。该条可以有一个确定的进度，也可以有一个不确定的动画。它应该被用来通知用户，一个动作正在后台发生。

## QCircularProgress API

<doc-api file="QCircularProgress" />

## 使用方法
默认情况下，QCircularProgress继承了当前文本颜色(作为弧形进度颜色和内部标签颜色)和当前字体大小(作为组件大小)。为了进行自定义，你可以使用与大小和颜色有关的属性。

<doc-example title="确定的状态" file="QCircularProgress/Determined" />

<doc-example title="确定状态和反向" file="QCircularProgress/Reverse" />

<doc-example title="偏移角度" file="QCircularProgress/Angle" />

<doc-example title="自定义最小/最大(同一模型)" file="QCircularProgress/CustomMinMax" />

在下面的示例中，`show-value`属性也启用了默认槽，所以你可以用自定义内容填充它，甚至像QAvatar或QTooltip。`字体大小`属性指的是内部标签的字体大小。

<doc-example title="显示值" file="QCircularProgress/ShowValue" />

<doc-example title="不确定的状态" file="QCircularProgress/Indeterminate" />

<doc-example title="标准尺寸" file="QCircularProgress/StandardSizes" />
