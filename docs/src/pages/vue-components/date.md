---
title: 日期选择器
desc: QDate Vue 组件提供了一种方法来输入公历或波斯历的日期。
keys: QDate
related:
  - /vue-components/time
  - /quasar-utils/date-utils
  - /vue-components/field
---

QDate组件提供了一个输入日期的方法。目前它支持公历(默认)和波斯历。

::: tip
对于处理日期和/或时间，也可以查看[Quasar Date Utils](/quasar-utils/dateutils)。
:::

## QDate API

<doc-api file="QDate" />

## 用法

::: warning
请注意，该模型的实际日期都是字符串格式。
:::

### 基础

<doc-example title="基础" file="QDate/Basic" overflow />

::: tip
对于横向模式，你可以和`$q.screen`一起使用，使QDate具有响应性。例如：`:landscape="$q.screen.gt.xs"`。更多信息：[Quasar Screen Plugin](/options/screen-plugin)。
:::

<doc-example title="景观" file="QDate/Landscape" overflow />

### 多重选择

请注意，下面的模型是一个数组，我们指定了 "多重 "属性。

点击一个已经选择的日子将取消选择。

<doc-example title="多天" file="QDate/SelectionMultiple" overflow />

### 范围选择

注意在下面的例子中，模型是一个对象(单选)或一个对象的数组(多选)。

::: tip TIPS
* 点击一个已经选择的日子将取消选择它。
* 用户的当前编辑范围也可以通过`setEditingRange`方法进行编程设置(查看API卡)。
* 关于当前的编辑范围，有两个有用的事件：`range-start`和`range-end`(查看API卡)。
:::

::: warning
范围 "属性只与 "选项 "属性部分兼容：选择的范围也可能包括 "不可选择" 的日子。
:::

<doc-example title="单一范围" file="QDate/SelectionRange" overflow />

<doc-example title="多个范围" file="QDate/SelectionRangeMultiple" overflow />

### 自定义标题和副标题

当不在 "最小 "模式时，QDate有一个计算的标题和副标题。你可以覆盖它，就像下面的例子。

当点击标题时，QDate的视图就会变成日历，而当点击副标题时，视图就会切换到年份选择。

<doc-example title="自定义标题和副标题" file="QDate/CustomTitleSubtitle" overflow />

### 功能

当模型未被填充时(如`null', `void 0`/`undefined')，QDate仍然要显示一年中某个月的日历。你可以为此使用`default-year-month`属性，否则将显示该年的当前月份。

<doc-example title="默认年月" file="QDate/DefaultYearMonth" overflow />

可以改变默认视图。

<doc-example title="默认视图" file="QDate/DefaultView" overflow /> 默认视图可以改变。

每周第一天的应用取决于你所设置的[Quasar语言包](/options/quasar-language-packs)，但你也可以强制它，就像下面的例子。

<doc-example title="一周的第一天" file="QDate/FirstDayOfWeek" overflow />

点击 "今天 "按钮，将日期设置为当前用户日期。需要头，所以你不能和 "最小 "模式一起使用它。

<doc-example title="今天按钮" file="QDate/TodayBtn" overflow />

<doc-example title="禁用和只读" file="QDate/DisableReadonly" overflow />

### 模型掩码

默认的模型掩码是`YYYY/MM/DD`，然而你也可以使用自定义的。

`mask`属性标记可以在[Quasar Utils > Date utils](/quasar-utils/dateutils#format-for-display)找到。

::: warning Note on SSR
在掩码中使用`x`或`X`(时间戳)可能会导致客户端的水合错误，因为模型字符串的解码必须用`new Date()`来完成，它需要考虑到当地的时区。因此，如果服务器与客户端处于不同的时区，那么服务器的渲染输出将与客户端的输出不同，所以水化将失败。
:::

::: danger Note on persian calendar
当使用波斯历时，QDate的掩码被强制为`YYYY/MM/DD`。
:::

<doc-example title="简单掩码" file="QDate/MaskSimple" overflow />

如果你想在你的掩码中插入字符串，请确保用`[`和``]`包围它们，否则这些字符可能会被解释为格式标记。

<doc-example title="带有转义字符的掩码" file="QDate/MaskEscape" overflow />

使用掩码将QDate和[QTime](/vue-components/time)连接到同一个模型中。

<doc-example title="同一模型上的QDate和QTime" file="QDate/MaskDateTime" overflow />

::: tip
如果你想以编程方式设置QDate的值，你可以通过重新指定你传递的值来实现。然而，更新的值需要是一个与你的掩码格式相同的字符串。例如，如果你的掩码是`'ddd, MMM D, YYYY'`，传递`'2019/04/28'作为值是不行的，你需要传递`'Sunday, Apr 28, 2019'代替。
:::

### 自定义特定的语言环境

如果由于某种原因，你需要使用一个自定义的特定语言，而不是当前已经设置的Quasar语言包，你可以使用`locale`属性。

<doc-example title="自定义特定语言 "file="QDate/CustomLocale" overflow />。

### 着色

<doc-example title="着色" file="QDate/Color" overflow />

<doc-example title="黑暗 "file="QDate/Dark" overflow dark />

### 突出显示事件

第一个例子是使用一个数组，第二个例子是使用一个函数。

<doc-example title="事件" file="QDate/Events" 溢出 />

<doc-example title="事件颜色" file="QDate/EventColor" overflow />

### 限制性选项

* 你可以使用`options`属性来限制用户选择某些时间。
* 另外，为了更深入地限制选项，你也可以为`options-fn`属性提供一个函数(下面第二个和第三个例子)。

::: warning
`options`属性只与`range`属性部分兼容。范围可能包含 "不可选择的 "日子。
:::

<doc-example title="选项" file="QDate/Options" overflow />

### 应用导航边界

在下面的例子中，导航被限制在2020/07和2020/09之间。

<doc-example title="导航边界" file="QDate/NavigationBoundaries" overflow /> 溢出。

### 带附加按钮

你可以使用默认的槽来添加按钮。

<doc-example title="有了额外的按钮" file="QDate/AdditionalButtons" overflow />

### 使用QSplitter和QTabPanels

<doc-example title="使用QSplitter和QTabPanels" file="QDate/Splitter" />

更多信息：[QSplitter](/vue-components/splitter), [QTabPanels](/vue-components/tab-panels)。

### 使用QInput

<doc-example title="使用QInput" file="QDate/Input" />

在QInput上用相同的模型连接一个QDate和QTime。

<doc-example title="用QInput连接QDate和QTime" file="QDate/InputFull" overflow />

下面是QInput `mask`和`rules`属性的**帮助**。你可以使用这些以获得便利，或者写下指定你的[自定义需求]的字符串(/vue-components/input#mask)。

* 属性`mask`帮助器。[完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/input/use-mask.js#L6)。
* Property `rules` helpers: [完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js)。

示例："date", "time", "fulltime".

更多信息：[QInput](/vue-components/input)。

### 波斯日历
::: tip
你可以把它与Quasar[语言包](/options/quasar-language-packs)结合起来，如波斯语(Farsi, `fa-ir`)，使QDate字符串也得到翻译，以获得完整的体验。
:::

::: warning
当使用波斯历时，QDate的掩码被强制为`YYYY/MM/DD`。
:::

<q-btn href="https://codepen.io/rstoenescu/pen/MWKpbNa" target="_blank" label="查看示例" icon-right="启动" color="品牌主打" />

### 本地表单提交

当处理一个有 `action`和`method`的本地表单时(例如，当使用Quasar和ASP.NET控制器时)，你需要指定QDate的 "name "属性，否则formData将不包含它(如果它应该包含)。

<doc-example title="本地表单" file="QDate/NativeForm" />
