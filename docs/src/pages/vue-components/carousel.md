---
title: 走马灯
desc: QCarousel Vue组件允许你显示一系列的幻灯片，对向导或图片库很有用。
keys: QCarousel
---

QCarousel组件允许你用更少的空间显示更多的信息，使用幻灯片。对于创建向导或图片库也很有用。

## QCarousel API

<doc-api file="QCarousel" />

## QCarouselControl API

<doc-api file="QCarouselControl" />

## QCarouselSlide API

<doc-api file="QCarouselSlide" />

## 使用方法

::: tip
如果QCarouselSlide的内容也有图片，并且你想使用滑动动作来导航，你可能想给它们添加`draggable="false"`，否则本地浏览器的行为可能会以负面的方式进行干扰。
:::

::: danger Keep Alive
* 如果你需要这种行为，请注意QCarousel的布尔值`keep-alive`属性。不要在QCarouselSlide上使用Vue的本地`<keep-alive>`组件。
* 如果你需要`keep-alive-include`或`keep-alive-exclude`属性，那么QCarouselSlide的`name`s必须是有效的Vue组件名称(不允许有空格，不要以数字开头等等)。
:::

### 基础

下面是一个几乎精简的基本走马灯(它只是动画，只指定了自定义过渡)，没有嵌入导航。出于这个原因，我们通过模型来控制当前的滑动。

<doc-example title="基础" file="QCarousel/Basic" />

### 过渡

在下面的例子中：

* 这里只是演示了几个过渡。对于完整的转换列表，请前往[Transitions](/options/transitions)页面。
* 你也可以用手指轻扫(或用鼠标轻扫--点击并快速向左/右拖动，然后松开)。

<doc-example title="过渡、底部导航、箭头和自动填充" file="QCarousel/Transitions" />

### 垂直方向

<doc-example title="垂直模式" file="QCarousel/Vertical" />

### 控制类型

这里的 "控制" 的概念是指箭头和导航按钮。由于它们是按钮，你也可以选择它们的类型以更好地配合你的设计。你还可以从`control-color`和`control-text-color`属性中受益。

<doc-example title="控制类型" file="QCarousel/ControlType" />

### 导航位置

<doc-example title="导航位置" file="QCarousel/NavigationPosition" />

### 自定义导航

关于 "导航图标 "槽的全部属性列表，请查阅API卡。

<doc-example title="自定义导航" file="QCarousel/CustomNavigation" />

### 自动填充

下面是一个例子，你可以用不同的QCarousel设置来玩，这样你就可以看到填充(或不填充)的作用。

<doc-example title="填充" file="QCarousel/AutoPadding" />

### 媒体内容

<doc-example title="图像幻灯片" file="QCarousel/ImageSlides" />

<doc-example title="多图像幻灯片" file="QCarousel/MultiImageSlides" />

<doc-example title="标题" file="QCarousel/Captions" />

<doc-example title="视频幻灯片" file="QCarousel/VideoSlides" />

在下面的例子中，有缩略图被自动生成。缩略图只适用于图像幻灯片。

<doc-example title="缩略图" file="QCarousel/Thumbnails" />

::: tip
不要在使用属性`navigation`的同时使用`thumbnails`，因为前者优先于后者，所以缩略图不会被显示。
:::

### 无限和自动播放

你可以在指针位于旋转木马上方或感兴趣的区域上方时暂停自动播放。

<doc-example title="自动播放" file="QCarousel/InfiniteAutoplay" />

### 控制

<doc-example title="控件" file="QCarousel/Controls" />

### 使用QScrollArea

请注意[QScrollArea](/vue-components/scroll-area)是如何在下面的两个例子中使用。还请注意第二个例子中的`q-carousel--padding`CSS辅助类。

<doc-example title="使用QScrollArea和padding" file="QCarousel/WithScrollareaPadding" />

<doc-example title="在整个幻灯片上使用QScrollArea" file="QCarousel/WithScrollareaFull" />

### 全屏

<doc-example title="全屏" file="QCarousel/Fullscreen" />
