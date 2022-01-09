---
title: 时间选择器
desc: QTime组件提供了一个输入时间的方法。
keys: QTime
related:
  - /vue-components/date
  - /quasar-utils/date-utils
  - /vue-components/field
---

QTime组件提供了一个输入时间的方法。

::: tip
对于处理日期和/或时间，也可以查看[Quasar Date Utils](/quasar-utils/dateutils)。
:::

## QTime API

<doc-api file="QTime" />

## 使用方法

注意，该模型只是一个字符串。

### 基础

<doc-example title="基础" file="QTime/Basic" overflow />

<doc-example title="景观" file="QTime/Landscape" overflow />

::: tip
对于横向模式，你可以和`$q.screen`一起使用，使QTime具有响应性。例如：`:landscape="$q.screen.gt.xs"`。更多信息：[Quasar Screen Plugin](/options/screen-plugin)。
:::

### 功能

24小时格式的应用取决于你所设置的[Quasar语言包](/options/quasar-language-packs)，但你也可以强制它，就像下面的例子。

<doc-example title="24h格式" file="QTime/Format24h" overflow />

点击 "现在 "按钮将时间设置为当前用户时间。

<doc-example title="现在按钮" file="QTime/NowBtn" overflow />

<doc-example title="禁用和只读" file="QTime/DisableReadonly" overflow />

### 模型掩码

默认的模型掩码是`HH:mm`(或者当使用`with-seconds`属性时是`HH:mm:ss`)，然而你也可以使用自定义掩码。

`mask`属性标记可以在[Quasar Utils > Date utils](/quasar-utils/dateutils#format-for-display)找到。

::: warning Note on SSR
在掩码中使用`x`或`X`(时间戳)可能会导致客户端的水合错误，因为模型字符串的解码必须用`new Date()`来完成，它需要考虑到当地的时区。因此，如果服务器与客户端处于不同的时区，那么服务器的渲染输出将与客户端的输出不同，所以水化将失败。
:::

::: danger Note on persian calendar
当使用波斯历时，QTime的掩码被强制为`H:mm`或`H:mm:ss`(如果指定`with-seconds`)。
:::

<doc-example title="简单掩码" file="QTime/MaskSimple" overflow />

如果你想在你的掩码中插入字符串，请确保用`[`和``]`包围它们，否则这些字符可能被解释为格式标记。

<doc-example title="带有转义字符的掩码" file="QTime/MaskEscape" overflow />

使用掩码将[QDate](/vue-components/date)和QTime连接到同一个模型。

<doc-example title="同一模型上的QDate和QTime" file="QTime/MaskDateTime" overflow />

### 自定义特定的区域设置

如果由于某种原因，你需要使用一个自定义的特定语言，而不是当前已经设置的Quasar语言包，你可以使用`locale`属性。

<doc-example title="自定义特定地区语言" file="QTime/CustomLocale" overflow />

### 着色

<doc-example title="着色" file="QTime/Color" overflow />

<doc-example title="黑暗" file="QTime/Dark" 溢出 dark />

### 限制性选项

* 你可以使用`hour-options`、`minute-options`和`second-options`属性来限制用户选择某些时间。
* 另外，为了更深入地限制选项，你也可以为`options-fn`属性提供一个函数(下面第二个例子)。

<doc-example title="选项" file="QTime/Options" overflow />

### 使用QInput

<doc-example title="输入" file="QTime/Input" overflow />

在一个QInput上用相同的模型连接一个QDate和QTime。

<doc-example title="用QInput连接QDate和QTime" file="QTime/InputFull" overflow /> 溢出。

下面是QInput `mask`和`rules`属性的**帮助。你可以使用这些以获得便利，或者写下指定你的[自定义需求]的字符串(/vue-components/input#mask)。

* 属性`mask`帮助器。[完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/input/use-mask.js#L6)。
* Property `rules` helpers: [完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js)。

示例："date", "time", "fulltime".

更多信息：[QInput](/vue-components/input)。

### 带附加按钮

你可以使用默认槽来添加按钮。

<doc-example title="有附加按钮" file="QTime/AdditionalButtons" overflow />

### 本地表单提交

当处理一个有`action`和`method`的本地表单时(例如在ASP.NET控制器中使用Quasar)，你需要在QTime上指定`name`属性，否则formData将不包含它(如果它应该包含)。

<doc-example title="本地表单" file="QTime/NativeForm" />
