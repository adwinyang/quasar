---
title: CSS可见性
desc: 由 Quasar 提供的CSS类列表，用于管理组件和DOM元素的响应性和可见性。
related:
  - /style/typography
  - /style/positioning
  - /style/spacing
---
有一些CSS类，你可以使用开箱即用的普通功能。

| 类的名称 | 说明 |
| --- | --- |
| `disabled` | 光标被改变为通知 "禁用"，不透明度被设置为较低的值。|
| `hidden` | 将`display`设置为`none`。与下面的比较 - `hidden`类意味着该元素将不显示_并且_不会在布局中占用空间。|
| `invisible` | 设置`visibility`为`hidden`。与上面比较 - `invisible`类意味着该元素将不显示，但仍会在布局中占用空间。|
| `transparent` | 背景颜色是透明的。|
| `dimmed` | 在你的元素上面应用深色的透明覆盖层。不要在已经有**:after**伪元素的元素上使用。|
| `light-dimmed` | 在你的元素上应用白色的透明覆盖层。不要用在已经有**:after**假元素的元素上。|
| `ellipsis` | 当没有足够的空间时，会截断文本并显示省略号。|
| `ellipsis-2-lines` | 当两行没有足够的空间时，截断文本并显示省略号(仅适用于Webkit浏览器)。|
| `ellipsis-3-lines` | 当三行没有足够的空间时，会截断文本并显示省略号(仅适用于Webkit浏览器)。|
| `z-top` | 将你的元素放置在任何其他组件的顶部，但在弹出窗口、工具提示、通知的后面。|
| `z-max` | 将您的元素放在任何其他组件的顶部(包括抽屉、模版、通知、布局头/页脚，...)。

## 窗口宽度相关
首先，让我们定义一下断点是什么。

| 窗口尺寸 | 前缀 | 断点空间(像素) |
| --- | --- | --- |
| 特小 | xs | 最大599px |
| 小型 | sm | 600px至1023px |
| 中型 | md | 1024px至1439px |
| 大号 | lg | 1440px到1919px |
| 特大号 | xl | 大于1920px |

现在来看看与窗口宽度有关的CSS类。

| 类的名称 | 说明 |
| --- | --- |
| `xs` | 只在超小的窗口显示 |
| `sm` | 只在小窗口上显示
| `md` | 只在中等大小的窗口上显示
| `lg` | 只在大窗口上显示
| `xl` | 只在超大的窗口显示

你也可以显示一些DOM元素或组件，**如果它低于其中一个尺寸**。**大于其中一个尺寸的也是如此**。只需附加`lt-`或`gt-`前缀，这来自于 "低于 "和 "大于"。例如：`lt-md`(仅在xs和sm上显示)，`lt-xl`(仅在xs、sm、md和lg窗口上显示)，`gt-md`(在大于中型窗口上显示：lg和xl)。

::: tip
You can combine the visibility classes with the `inline` class for inline-blocks.

Example: `<span class="gt-sm inline">...</span>`
:::

::: tip
如果你想例如根据JavaScript属性显示隐藏，你可以使用[屏幕插件](/options/screen-plugin)。
:::

## 平台相关
仅在下列情况下可见。

| 类别名称 | 描述 |
| --- | --- |
| `只在台式机上看到` | 只在台式机上可见
| `mobile-only` | 仅在手机上可见。
| `native-mobile-only` | 仅在 Cordova /Capacitor上可见
| `cordova-only` | 仅在 Cordova 包装的应用程序上可见。
| `capacitor-only` | 仅在Capacitor包装的应用程序上可见。
| `electron-only` | 仅在Electron包装的应用程序上可见。
| `touch-only` | 仅在具有触摸功能的平台上可见。
| `platform-ios-only` | 仅在iOS平台上可见。
| `platform-android-only` | 仅在安卓平台上可见。
| `within-iframe-only` | 只有在整个网站处于IFRAME标签下时才可见。

隐藏在:

| 类别名称 | 描述 |
| --- | --- |
| `desktop-hide` | 隐藏在桌面上 |
| `mobile-hide` | 在手机上隐藏 |
| `native-mobile-hide` | 隐藏在 Cordova /Capacitor上 |
| `cordova-hide` | 隐藏在 Cordova 包装的应用程序上 |
| `capacitor-hide` | 隐藏在Capacitor包装的应用程序中
| `electron-hide` | 隐藏在Electron包装的应用程序上
| `touch-hide` | 隐藏在具有触摸功能的平台上
| `platform-ios-hide` | 隐藏在iOS平台上 |
| `platform-android-hide` | 隐藏在Android平台上 |
| `within-iframe-hide` | 只在整个网站处于IFRAME标签下时才隐藏。

::: tip
根据你的需要，你可能还想看看[平台检测](/options/platform-detection)页面，看看你如何用Javascript达到同样的效果。后一种方法允许你甚至不渲染一个DOM元素或组件。当渲染过程很昂贵时，它是很有用的。
:::

## 定向相关
| 类别名称 | 说明 |
| --- | --- |
| `orientation-portrait` | 仅在屏幕方向为*Portrait*时可见。
| `orientation-landscape` | 仅在屏幕方向为*Landscape*时可见。

## 打印相关
| 类别名称 | 描述 |
| --- | --- |
| `print-only` | 仅在打印介质上可见，在*屏幕*介质上隐藏
| `print-hide` | 在*屏幕*媒体上可见，在*打印*媒体上隐藏。
