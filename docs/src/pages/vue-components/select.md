---
title: 选择
desc: QSelect Vue组件有两种类型的选择--单一或多个。这个组件为选择列表和操作打开了一个菜单。一个过滤器也可以用于较长的列表。
keys: QSelect
---

QSelect组件有两种类型的选择：单一或多个。该组件为选择列表和操作打开了一个菜单。一个过滤器也可以用于较长的列表。

如果你正在寻找一个下拉 "按钮 "而不是 "输入"，请使用[Button Dropdown](/vue-components/button-dropdown)代替。

## QSelect API

<doc-api file="QSelect" />

## 设计

### 概述

::: warning
对于你的QS选择，你只能使用一个主要的设计("填充"，"轮廓"，"突出"，"无边框")。你不能使用多种设计，因为它们是自我排斥的。
:::

<doc-example title="设计概述" file="QSelect/DesignOverview" />

### 装饰器

<doc-example title="装饰器" file="QSelect/Decorators" /> ### 装饰器

### 着色

<doc-example title="着色" file="QSelect/Coloring" /> ###着色器

### Clearable
作为一个辅助工具，你可以使用`clearable`属性，这样用户可以通过一个附加的图标将模型重置为`null'。下面示例中的第二个QSelect相当于使用`clearable'。

<doc-example title="可清除" file="QSelect/Clearable" />

### 禁用和只读

<doc-example title="禁用和只读" file="QSelect/DisableReadonly" /> ### 禁用和只读。

### 带有QBtn类型 "提交 "的槽位

::: warning
当把类型为 "submit "的QBtn放在QField、QInput或QSelect的 "before"、"after"、"prepend "或 "append "槽中时，你还应该在相关的QBtn上添加一个`@click`监听器。这个监听器应该调用提交表单的方法。所有在这些槽中的 "点击 "事件都不会传播到它们的父元素。
:::

### 转场菜单

::: warning
请注意，当使用`options-cover`属性时，过渡不工作。
:::

在下面的示例中，有几个转场的展示。对于可用的过渡的完整列表，请到[过渡](/options/transitions)。

<doc-example title="菜单转换" file="QSelect/MenuTransitions" />

### 选项列表显示模式
默认情况下，QSelect在桌面上以菜单的形式显示选项列表，在手机上以对话框的形式显示。你可以通过使用`behavior`属性来强制执行一种行为。

::: warning
请注意，在iOS上，菜单行为可能会产生问题，特别是当与`use-input`属性结合使用时。你可以使用一个有条件的`behavior`属性，比如`:behavior="$q.platform.is.ios ==true ? 'dialog' : 'menu'"`来只在iOS上使用对话模式。
:::

<doc-example title="在菜单中显示选项" file="QSelect/BehaviorMenu" />

<doc-example title="在对话框中显示选项" file="QSelect/BehaviorDialog" />

## 该模型

::: danger
单一选择的模型可以是任何东西(String, Object, ...)，而多重选择的模型必须是一个数组。
:::

<doc-example title="单选与多选" file="QSelect/ModelSingleMultiple" />

<doc-example title="多重选择、计数器和最大值" file="QSelect/ModelMultipleCounter" />

模型的内容可以被`emit-value`属性影响，你会在下面的 "选项 "部分学到。

## 选项

### 选项类型

<doc-example title="字符串选项" file="QSelect/OptionString" />

<doc-example title="对象选项" file="QSelect/OptionObject" />

### 影响模型

当使用 "emit-value "时，模型成为指定的所选选项的确定的 "value"。默认情况是发射整个选项。只有当选项是对象形式的时候，使用它才有意义。

<doc-example title="Emit-value" file="QSelect/OptionEmitValue" />

当使用 "map-options "时，模型可以只包含 "value"，它将被映射到选项中以确定其标签。这涉及到性能方面的问题，所以只有在绝对必要的情况下才使用它。例如，如果模型包含整个对象(所以包含标签属性)，就不需要它。

<doc-example title="地图选项" file="QSelect/OptionMapOptions" />

### 自定义属性名称

默认情况下，QSelect从选项数组对象中查看每个选项的`label`、`value`、`disable`和`sanitize`属性。但是你可以重写这些。

::: warning
如果你对自定义属性使用函数，一定要检查该选项是否为空。这些函数既用于列表中的选项，也用于选定的选项。
:::

<doc-example title="自定义标签、值和禁用属性" file="QSelect/OptionCustomProps" />

### 自定义菜单选项

::: warning
选项列表是使用虚拟滚动渲染的，所以如果你为一个选项渲染了多个元素，你必须在所有元素上设置`q-virtual-scroll--with-prev`类，除了第一个元素。
:::

<doc-example title="选项插槽" file="QSelect/OptionSlot" />

这里是另一个示例，我们为每个选项添加一个QToggle。这种可能性是无穷无尽的。

<doc-example title="对象选项" file="QSelect/OptionQToggle" />

默认情况下，当没有选项时，菜单不会出现。但是你可以自定义这种情况，并指定菜单应该显示什么。

<doc-example title="没有选项槽" file="QSelect/OptionNoneSlot" />

### 懒惰的加载

下面的示例展示了你如何玩转懒人加载选项的一瞥。这意味着，和其他许多事情一样，`options`属性在第一次渲染时是不需要的。

<doc-example title="懒加载选项" file="QSelect/OptionLazyLoad" />

你可以在滚动到最后时动态地加载新的选项。

<doc-example title="动态加载选项" file="QSelect/OptionsDynamic" />

### 覆盖模式

<doc-example title="菜单覆盖组件" file="QSelect/OptionCover" /> ###覆盖模式

## 显示值

<doc-example title="自定义显示值" file="QSelect/DisplayCustomValue" /> ## 显示值

<doc-example title="芯片作为显示值" file="QSelect/DisplayChips" /> ## 显示值是什么？

<doc-example title="选定的项目槽" file="QSelect/DisplaySelectedItemSlot" />

## 筛选和自动完成

### 带有 "使用输入 "的本地属性

所有在QSelect上设置的属性，如果不在API的props列表中，将被传递到所使用的本地输入字段(请先查看`use-input`属性描述以了解它的作用)，用于过滤/自动完成/添加新值。一些示例：自动完成，占位符。

更多信息。[本地输入属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)。

<doc-example title="过滤选项" file="QSelect/InputFilterOptions" />

<doc-example title="基本过滤" file="QSelect/BasicFiltering" />

<doc-example title="对超过2个字符的过滤" file="QSelect/InputFilterMin" />

<doc-example title="文本自动完成" file="QSelect/TextAutocomplete" />

<doc-example title="延迟过滤" file="QSelect/InputFilterLazy" />

<doc-example title="过滤后选择选项" file="QSelect/InputFilterAfter" />

## 创建新的值

::: tip
以下只是几个示例，让你开始制作自己的QSelect行为。这并不是QSelect所提供的全部可能性的清单。

将此功能与 "使用输入 "属性一起使用是有意义的。
:::

为了实现新值的创建，你需要**指定**"new-value-mode "属性**和/或**监听"@new-value "事件。如果你同时使用这两种方法，那么监听`@new-value`的目的只是为了在你的自定义场景中覆盖`new-value-mode`。

### new-value-mode属性
`new-value-mode`属性值指定了值的添加方式：`add`(添加一个值，即使是重复的)，`add-unique`(只在不重复的情况下添加)或者`toggle`(如果模型中没有这个值，就添加，否则就删除)。

通过使用这个属性，你不需要同时监听`@new-value`事件，除非你有一些特定的场景，你想覆盖这个行为。

<doc-example title="新值模式" file="QSelect/CreateNewValueMode" />

### @new-value事件
`@new-value'事件是带着要添加的值和`done'回调发出的。done "回调有两个**可选择的参数。
- 要添加的值
- 行为(与`new-value-mode'属性的值相同，当它被指定时，它会覆盖该属性--如果它被使用的话)--默认行为(如果不使用`new-value-mode')是添加该值，即使它是一个重复的。

调用没有参数的`done()`只是清空输入框的值，而不会以任何方式篡改模型。

<doc-example title="监听@new-value" file="QSelect/CreateListener" />

<doc-example title="只添加唯一值" file="QSelect/CreateListenerUnique" />

### 使用菜单和过滤
筛选并将新的值添加到菜单中。

<doc-example title="过滤并添加到菜单" file="QSelect/FilteringAddsToMenu" />

过滤新值(在下面的示例中，要添加的值需要至少3个字符才能通过)，并且不添加到菜单中。

<doc-example title="过滤不加入菜单" file="QSelect/FilteringNoAddToMenu" />

从输入中生成多个值。

<doc-example title="生成多个值" file="QSelect/FilteringAddMultiple" /> 从输入中生成多个值： <doc-example title="生成多个值" file="QSelect/FilteringAddMultiple" /> 从输入中生成多个值

## 净化处理

**默认情况下，所有的选项(包括选择的选项)都是经过消毒处理的**。这意味着以HTML格式显示它们的功能被禁用。然而，如果你需要在你的选项上显示HTML并且你相信它们的内容，那么有几种方法可以做到这一点。

你可以通过以下方式强制显示菜单选项的HTML形式。
- 将受信任选项的`html`键设置为`true`(对于特定的受信任选项)。
- 或者通过设置QSelect的`options-html`属性(适用于所有选项)。

QSelect的显示值会以HTML形式显示，如果。
- QSelect的`display-value-html`属性被设置了
- 或者你没有使用`display-value`和
- QSelect的`options-html`属性已被设置
- 任何被选中的选项的`html`键被设置为`true'。

::: warning
如果你使用`selected`或`selected-item`槽，那么你要负责对显示值进行消毒。`display-value-html`属性将不适用。
:::

<doc-example title="HTML表单中的选项" file="QSelect/HtmlOptions" />

<doc-example title="HTML表单中的显示值" file="QSelect/HtmlDisplayValue" />

## 渲染性能

渲染性能不受选项数量的影响，除非`map-options`被用在一个大的集合上。
请注意，在用户滚动列表的过程中，无限滚动会呈现出更多的选项。

::: tip
* (Composition API) 为了在使用大量选项时获得最佳性能，不要用ref()/computed()/reactive()/etc.包裹你在`options`属性中传递的数组。这允许Vue跳过使列表对变化做出 "响应"。
* (Options API)为了在使用大量选项时获得最佳性能，使用`Object.freeze(items)`冻结你在`options`属性中传递的数组。这允许Vue跳过使列表 "响应 "变化的过程。
:::

<doc-example title="100k options" file="QSelect/RenderPerf" />

## Keyboard navigation

When QSelect is focused:
- pressing <kbd>ENTER</kbd>, <kbd>ARROW DOWN</kbd> (or <kbd>SPACE</kbd> if `use-input` is not set) will open the list of options
- if `use-chips` is set:
- pressing <kbd>SHIFT</kbd> + <kbd>TAB</kbd> will navigate backwards through the QChips (if a QChip is selected <kbd>TAB</kbd> will navigate forward through the QChips)
- pressing <kbd>ENTER</kbd> when a QChip is selected will remove that option from the selection
- pressing <kbd>BACKSPACE</kbd> will remove the last option from the selection (when `use-input` is set the input should be empty)
- pressing <kbd>TAB</kbd> (or <kbd>SHIFT</kbd> + <kbd>TAB</kbd> if `use-chips` is not set or the first QChip is selected) will navigate to the next or previous focusable element on page
- typing text (<kbd>0</kbd> - <kbd>9</kbd> or <kbd>A</kbd> - <kbd>Z</kbd>) if `use-input` is not set will:
- create a search buffer (will be reset when a new key is not typed for 1.5 seconds) that will be used to search in the options labels
- select the next option starting with that letter (after the current focused one) if the first key in buffer is typed multiple times
- select the next option (starting with the current focused one) that matches the typed text (the match is fuzzy - the option label should start with the first letter and contain all the letters)

When the list of options is opened:
- pressing <kbd>ARROW UP</kbd> or <kbd>ARROW DOWN</kbd> will navigate up or down in the list of options
- pressing <kbd>PAGE UP</kbd> or <kbd>PAGE DOWN</kbd> will navigate one page up or down in the list of options
- pressing <kbd>HOME</kbd> or <kbd>END</kbd> will navigate to the start or end of the list of options (only if you are not using `use-input`, or the input is empty)
- when navigating using arrow keys, navigation will wrap when reaching the start or end of the list
- pressing <kbd>ENTER</kbd> (or <kbd>SPACE</kbd> when `use-input` is not set, or <kbd>TAB</kbd> when `multiple` is not set) when an option is selected in the list will:
- select the option and close the list of options if `multiple` is not set
- toggle the option if `multiple` is set

## Native form submit

When dealing with a native form which has an `action` and a `method` (eg. when using Quasar with ASP.NET controllers), you need to specify the `name` property on QSelect, otherwise formData will not contain it (if it should) - all value are converted to string (native behaviour, so do not use Object values):

<doc-example title="本地表单" file="QSelect/NativeForm" />
