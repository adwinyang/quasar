---
title: 文件选择器
desc: QFile Vue组件被用作一个文件选择器。
keys: QFile
related:
  - /vue-components/uploader
  - /vue-components/input
---

QFile是一个处理用户互动的组件，用于挑选文件。

::: tip
如果你也希望有一个组件为你处理上传，请考虑使用[QUploader](/vue-components/uploader)代替。
:::

## QFile API

<doc-api file="QFile" />

## 设计

::: warning
对于你的Q文件，你只能使用其中一个主要的设计("填充"、"轮廓"、"突出"、"无边界")。你不能使用多种设计，因为它们都是自我排斥的。
:::

<doc-example title="设计概述" file="QFile/DesignOverview" />

### 装饰器

<doc-example title="装饰器" file="QFile/Decorators" />

### 着色

<doc-example title="着色" file="QFile/Coloring" />

### Clearable
作为一个辅助工具，你可以使用`clearable`属性，这样用户就可以通过一个附加的图标将模型重置为`null`。下面例子中的第二个QFile相当于使用`clearable'。

<doc-example title="可清除" file="QFile/Clearable" />

### 禁用和只读

<doc-example title="禁用和只读" file="QFile/DisableReadonly" />

## 使用方法

::: warning
在底层，QFile 使用原生输入。由于浏览器安全策略，不允许以编程方式使用值填充此类输入。结果，即使您从一开始就将 v-model 设置为一个值，组件也会显示这些文件，但输入标签本身不会填充该值。为了让本机输入包含它们，绝对需要用户交互（单击/点击/<kbd>ENTER</kbd> 键/<kbd>SPACE</kbd> 键）。最好始终将模型的初始值设置为 `null` 或 `undefined/void 0`。
:::

### 基础

<doc-example title="单个文件" file="QFile/BasicSingle" />

<doc-example title="多个文件" file="QFile/BasicMultiple" />

### 添加文件

默认情况下，每当用户通过弹出窗口选择任何文件时，QFile 都会替换模型。然而，当你接受多个文件时(`multiple`属性)，你可以改变这种行为，将新的选择附加到模型上，而不是替换其旧值。

下面你可以多次挑选文件，而 QFile 会不断地将它们追加到模型中。

<doc-example title="追加文件" file="QFile/AppendingFiles" />

### 计数器

<doc-example title="基本计数器" file="QFile/CounterBasic" />

<doc-example title="计数器的标签" file="QFile/CounterLabel" />

### 使用碎片

<doc-example title="使用碎片" file="QFile/WithChips" />

### 使用文件槽

下面的例子强调了你如何能够定制每个文件的显示，甚至纳入一个可能的上传进度指示器。

<doc-example title="有进度指示器" file="QFile/WithProgress" />

### 限制文件

<doc-example title="基本限制" file="QFile/RestrictionBasic" />

你甚至可以把上面的限制结合起来。

::: tip
在上面的例子中，我们使用`accept`属性。它的值必须是一个逗号分隔的唯一文件类型指定器的列表。映射到本地输入type=file元素的'accept'属性。[更多信息](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers) 。
:::

::: warning
建议 "接受"属性的格式为"<中间类型>/<扩展>"。例如："image/png", "image/png". QFile 在引擎下使用了一个`<input type="file">`，它完全依赖于主机浏览器来触发文件选取器。如果 `accept` 属性 (被应用于输入) 不正确，屏幕上将不会出现文件选取器，或者它将出现，但它将接受所有的文件类型。
:::

你也可以应用自定义过滤器(在用户挑选文件后执行)。

<doc-example title="过滤器" file="QFile/RestrictionFilter" />


### 本地表单提交

当处理一个有 `action`和`method`的本地表单时(例如，当使用Quasar和ASP.NET控制器时)，你需要指定QFile的 "name "属性，否则formData将不包含它(如果它应该包含)。

<doc-example title="本地表单" file="QFile/NativeForm" />
