---
title: 视差
desc: QParallax Vue组件可以很容易地将视差滚动效果嵌入到一个页面中。
keys: QParallax
related:
  - /vue-components/video
---

视差滚动是计算机图形学和网页设计中的一种技术，即背景图像在相机前的移动速度比前景图像慢，在二维场景中产生深度的错觉，增加了沉浸感。

QParallax处理了很多古怪的问题，包括图像/视频的大小实际上可以小于窗口的宽度/高度。

## QParallax API

<doc-api file="QParallax" />

## 使用方法

::: tip Scrolling container
请阅读[这里](/vue-components/scroll-observer#determining-scrolling-container)关于 Quasar 如何确定将滚动事件附加到的容器。
:::

### 图像背景

<doc-example title="图像背景" file="QParallax/Image" />

### 视频背景

::: warning
在一些iOS平台上，可能存在关于本地`<视频>`标签的自动播放功能的问题。[参考](https://webkit.org/blog/6784/new-video-policies-for-ios/)。QParallax和 Quasar 不会以任何方式干扰客户端浏览器对`<video>`标签的能力/限制。
:::

::: warning
当在QParallax中使用`video`标签时，你必须**提供`width`和`height`属性，以使QParallax正常工作，因为这种类型的媒体具有内在的尺寸调整能力。另外，请注意，实际的视频宽度和高度在视频的元数据被加载之前是不可用的。
:::

<doc-example title="自定义高度与视频背景" file="QParallax/Video" />

### 自定义速度

<doc-example title="自定义速度" file="QParallax/Speed" /> ###自定义速度

### 使用插槽

<doc-example title="使用槽" file="QParallax/ScopedSlot" /> ### 使用槽
