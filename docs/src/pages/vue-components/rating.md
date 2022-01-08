---
title: 评价
desc: QRating Vue组件允许用户对物品进行评级。它通常被称为 "星级评定"。
keys: QRating
---

Quasar Rating是一个允许用户对物品进行评级的组件，通常被称为 "Star Rating"。

## QRating API

<doc-api file="QRating" />

## 使用方法

### 基本

<doc-example title="基本" file="QRating/Basic" />

<doc-example title="自定义选择数" file="QRating/Max" /> ## 使用方法

### 图标

<doc-example title="图像图标" file="QRating/Images" /> ###图标

在下面的示例中，当使用`icon-selected`属性时，注意我们仍然可以使用`icon`。当它们没有被选中时，后者会成为图标。

<doc-example title="选定时的不同图标" file="QRating/SelectedIcon" />

<doc-example title="每个评分的不同图标" file="QRating/ArrayIcon" />

### 颜色

当使用`color-selected`属性时，注意我们仍然可以使用`color`。后者成为图标未被选中时的颜色。

<doc-example title="每个评级的不同颜色" file="QRating/Colors" />

### 浮动数

<doc-example title="半选时不同的图标和颜色" file="QRating/HalfSelected" /> ###浮动数字

### 没有调光

<doc-example title="无调光" file="QRating/NoDimming" /> ###无调光

### 工具提示

注意我们如何在下面的示例中为每个图标添加工具提示。

<doc-example title="使用QTooltip" file="QRating/SlotTip" />

### 尺寸

除了下面的标准尺寸外，你可以通过`size`属性定义你自己的尺寸。

<doc-example title="标准尺寸" file="QRating/StandardSizes" />

### 只读和禁用

<doc-example title="只读和禁用" file="QRating/ReadonlyDisable" /> ### 只读和禁用

### 本地表单提交

当处理一个有`action`和`method`的本地表单时(例如，当使用 Quasar 和ASP.NET控制器时)，你需要在QRating上指定`name`属性，否则formData将不包含它(如果应该包含)。

<doc-example title="本地表单" file="QRating/NativeForm" />
