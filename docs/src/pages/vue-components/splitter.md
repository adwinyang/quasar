---
title: QSplitter
desc: QSplitter Vue组件允许容器通过一个可拖动的分隔条进行垂直和/或水平分割。
keys: QSplitter
related:
  - /vue-components/expansion-item
  - /vue-components/slide-item
  - /vue-components/separator
---

QSplitter组件允许容器通过一个可拖动的分隔条进行垂直和/或水平分割。


## QSplitter API

<doc-api file="QSplitter" />

## 使用方法

::: warning
需要使用`before`和`after`槽。
:::

点击并拖动分割器分隔条，即可看到结果。

# # # 基本

<doc-example title="基本" file="QSplitter/Basic" />

### 水平型

<doc-example title="水平" file="QSplitter/Horizontal" /> ### 水平型

### 自定义拖动限制

<doc-example title="自定义拖动限制 (50-100)" file="QSplitter/Limits" /> ###自定义拖动限制

### 模型单位

默认情况下，使用的CSS `单位'是'%'(百分比)。但是你也可以使用'px'(像素)，就像下面的示例一样。

<doc-example title="像素的模型" file="QSplitter/PixelModel" />

### 反转模型

默认情况下，模型与`before`槽的大小相连。但是你可以反过来，让它连接到 "after "槽，就像下面的示例。如果你的`单位'被设置为像素，而你想控制`后'槽，这个功能就会变得特别有用。

<doc-example title="反转模型" file="QSplitter/ReverseModel" />

### 为分离器添加内容

::: tip
如果你使用图片作为分隔槽的内容，你可能想给它们添加`draggable="false"`，否则本地浏览器的行为可能会以负面的方式进行干扰。
:::

<doc-example title="添加到分离器" file="QSplitter/SeparatorSlot" />

### 深色设计

<doc-example title="在深色背景下的自定义分离器" file="QSplitter/CustomizedSeparator" dark />

### 嵌入

一个QSplitter可以被嵌入到另一个QSplitter的`before`和/或`after`槽中，如下面的示例所示。

<doc-example title="嵌入式" file="QSplitter/Embedded" />

### 有趣的示例

<doc-example title="图像乐趣" file="QSplitter/ImageFun" /> ### 乐趣实例

<doc-example title="反应式图像" file="QSplitter/ReactiveImages" /> ###有趣的示例
