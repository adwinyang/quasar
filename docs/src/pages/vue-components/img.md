---
title: 图像
desc: QImg Vue组件使响应式图片的工作变得简单，还为它们添加了一个漂亮的加载效果，以及许多其他功能，如自定义长宽比和标题。
keys: QImg
related:
  - /vue-components/spinners
  - /options/transitions
---
QImg组件使处理图片(任何图片格式)变得简单，并且还为它增加了一个漂亮的加载效果以及许多其他功能(例如：能够设置长宽比)。

## QImg API

<doc-api file="QImg" />

## 使用方法

### 基础

<doc-example title="基础" file="QImg/Basic" />

### 纵横比

<doc-example title="自定义长宽比" file="QImg/Ratio" />

### 标题

<doc-example title="标题" file="QImg/Caption" />

### 图像样式

在下面的例子中，我们添加了模糊和棕褐色的效果。此外，我们还使用了 "圆形边框 "的CSS辅助类。

<doc-example title="自定义图像样式" file="QImg/CustomImageStyle" />

### 适合模式

有多种方式可以通过`fit`属性来显示图像：'覆盖'、'填充'(默认)、'包含'、'无'、'缩小'。它基本上与CSS属性中的[object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)相同。

有些模式会导致图像之外的空隙(水平或垂直)。

你也可以通过 "position "属性来配置位置，它相当于CSS中的[object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)属性。它的默认值是 "50% 50%"。

<doc-example title="适合模式" file="QImg/FitModes" />

### 加载状态

<doc-example title="加载状态" file="QImg/LoadingState" />

当你有大尺寸的图片时，你可以使用一个占位符图片(建议用base64编码指定)，就像下面的例子。该占位符将被显示，直到目标图像被加载。我们正在切换QImg标签，这样你就可以看到占位符图像的作用。

<doc-example title="占位符来源" file="QImg/PlaceholderSrc" />

<doc-example title="错误状态" file="QImg/ErrorState" />

### 响应式

::: warning
要掌握`sizes`和`srcset`属性，请阅读关于[响应式图像](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Why_responsive_images)的本地支持，因为**QImg完全依赖于此。
:::

<doc-example title="响应式" file="QImg/Responsive" />

::: tip
关于 "尺寸 "属性，请阅读关于分辨率切换：[不同尺寸](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Different_sizes)。
:::

::: tip
关于 "srcset "属性，请阅读 "分辨率切换：[相同尺寸，不同分辨率]"(https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Same_size_different_resolutions)。
:::

### 按需渲染

对于原生支持[loading="lazy" DOM属性](https://caniuse.com/loading-lazy-attr)的浏览器，你可以利用它的优势。Quasar将使用它，并告诉浏览器请求图片，只有当图片当前在屏幕上显示时(或当它被滚动到屏幕上时)，才会渲染它。

一种替代方法是使用[QIntersection](/vue-components/intersection)组件作为封装器或[Intersection](/vue-directives/intersection)指令。

<doc-example title="本地懒加载" file="QImg/LoadingLazy" />

### 没有本地上下文菜单

在下面的例子中，我们禁用了图像上的本地上下文菜单。

::: warning
当你使用这个选项时，一定要注意将`default'或`error'槽的内容包裹在`div'元素中，或者在元素上添加`all-pointer-events'类。
:::

<doc-example title="本地上下文菜单" file="QImg/ContextMenu" />
