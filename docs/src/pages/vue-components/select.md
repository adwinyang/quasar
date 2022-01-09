---
title: 选择框
desc: QSelect Vue组件有两种类型的选择--单一或多个。这个组件为选择列表和操作打开了一个菜单。一个过滤器也可以用于较长的列表。
keys: QSelect
---

QSelect 组件有两种选择：单选或多选。该组件为选择列表和操作打开一个菜单。过滤器也可用于更长的列表。

如果你正在寻找一个下拉 "按钮" 而不是 "输入"，请使用[Button Dropdown](/vue-components/button-dropdown)代替。

## QSelect API

<doc-api file="QSelect" />

## 设计

### 概述

::: warning
对于你的 QSelect，你只能使用一个主要的设计(`filled`, `outlined`, `standout`, `borderless`)("填充"，"轮廓"，"突出"，"无边框")。你不能使用多种设计，因为它们是互斥的。
:::

<doc-example title="设计概述" file="QSelect/DesignOverview" />

### 装饰器

<doc-example title="装饰器" file="QSelect/Decorators" />

### 着色

<doc-example title="着色" file="QSelect/Coloring" />

### 可清除
作为一个辅助工具，你可以使用`clearable`属性，这样用户可以通过一个附加的图标将模型重置为`null`。下面例子中的第二个QSelect相当于使用`clearable`。

<doc-example title="可清除" file="QSelect/Clearable" />

### 禁用和只读

<doc-example title="禁用和只读" file="QSelect/DisableReadonly" />

### QBtn 类型为"submit"的插槽

::: warning
当把类型为 "submit" 的 QBtn 放在 QField、QInput 或 QSelect 的 "before"、"after"、"prepend" 或 "append" 槽中时，你还应该在相关的 QBtn 上添加一个`@click`监听器。这个监听器应该调用提交表单的方法。所有在这些槽中的 "点击" 事件都不会传播到它们的父元素。
:::

### 菜单过渡

::: warning
请注意，当使用`options-cover`属性时，过渡功能不起作用。
:::

在下面的例子中，有几个过渡的展示。对于可用的过渡的完整列表，请到[过渡](/options/transitions)。

<doc-example title="菜单过渡" file="QSelect/MenuTransitions" />

### 选项列表显示模式
默认情况下，QSelect在桌面上以菜单的形式显示选项列表，在手机上以对话框的形式显示。你可以通过使用`behavior`属性来强制执行一种行为。

::: warning
请注意，在iOS上，菜单行为可能会产生问题，特别是当与`use-input`属性结合使用时。你可以使用一个有条件的`behavior`属性，比如`:behavior="$q.platform.is.ios ==true ? 'dialog' : 'menu'"`来只在iOS上使用对话模式。
:::

<doc-example title="在菜单中显示选项" file="QSelect/BehaviorMenu" />

<doc-example title="在对话框中显示选项" file="QSelect/BehaviorDialog" />

## 模型

::: danger
单一选择的模型可以是任何东西(String, Object, ...)，而多重选择的模型必须是一个数组。
:::

<doc-example title="单选与多选" file="QSelect/ModelSingleMultiple" />

<doc-example title="多重选择、计数器和最大值" file="QSelect/ModelMultipleCounter" />

模型的内容可以被`emit-value`属性影响，你将在下面的 "选项" 部分了解到这一点。

## 选项

### 选项类型

<doc-example title="字符串选项" file="QSelect/OptionString" />

<doc-example title="对象选项" file="QSelect/OptionObject" />

### 影响模型

当使用 `emit-value` 时，模型成为指定的所选选项的确定的 `value`。默认情况是发出整个选项。只有当选项是对象形式的时候，使用它才有意义。

<doc-example title="Emit-value" file="QSelect/OptionEmitValue" />

当使用 `map-options` 时，模型可以只包含 `value`，它将被映射到选项中以确定其标签。这涉及到性能方面的问题，所以只有在绝对必要的情况下才使用它。例如，如果模型包含整个对象(所以包含标签属性)，就不需要它。

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

这里是另一个例子，我们为每个选项添加一个QToggle。这种可能性是无穷无尽的。

<doc-example title="对象选项" file="QSelect/OptionQToggle" />

默认情况下，当没有选项时，菜单不会出现。但是你可以自定义这种情况，并指定菜单应该显示什么。

<doc-example title="没有选项槽" file="QSelect/OptionNoneSlot" />

### 延迟加载

以下示例展示了如何使用延迟加载选项。这意味着，与许多其他事情一起，第一次渲染时不需要 `options` 属性。

<doc-example title="延迟加载选项" file="QSelect/OptionLazyLoad" />

你可以在滚动到最后时动态地加载新的选项。

<doc-example title="动态加载选项" file="QSelect/OptionsDynamic" />

### 覆盖模式

<doc-example title="菜单覆盖组件" file="QSelect/OptionCover" />

## 显示值

<doc-example title="自定义显示值" file="QSelect/DisplayCustomValue" />

<doc-example title="碎片作为显示值" file="QSelect/DisplayChips" />

<doc-example title="选定的项目槽" file="QSelect/DisplaySelectedItemSlot" />

## 筛选和自动完成

### `use-input` 本地属性

所有在QSelect上设置的属性，如果不在API的props列表中，将被传递到所使用的本地输入字段(请先查看`use-input`属性描述以了解它的作用)，用于过滤/自动完成/添加新值。一些例子：自动完成，占位符。

更多信息：[本地输入属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)。

<doc-example title="过滤选项" file="QSelect/InputFilterOptions" />

<doc-example title="基本过滤" file="QSelect/BasicFiltering" />

<doc-example title="对超过2个字符的过滤" file="QSelect/InputFilterMin" />

<doc-example title="文本自动完成" file="QSelect/TextAutocomplete" />

<doc-example title="延迟过滤" file="QSelect/InputFilterLazy" />

<doc-example title="过滤后选择选项" file="QSelect/InputFilterAfter" />

## 创建新的值

::: tip
以下只是几个例子，让你开始制作自己的QSelect行为。这并不是QSelect所提供的全部可能性的清单。

将此功能与 "使用输入 "属性一起使用是有意义的。
:::

为了实现新值的创建，你需要**指定**"new-value-mode "属性**和/或**监听"@new-value "事件。如果你同时使用这两种方法，那么监听`@new-value`的目的只是为了在你的自定义场景中覆盖`new-value-mode`。

### new-value-mode属性
`new-value-mode`属性值指定了值的添加方式：`add`(添加一个值，即使是重复的)，`add-unique`(只在不重复的情况下添加)或者`toggle`(如果模型中没有这个值，就添加，否则就删除)。

通过使用这个属性，你不需要同时监听`@new-value`事件，除非你有一些特定的场景，你想覆盖这个行为。

<doc-example title="新值模式" file="QSelect/CreateNewValueMode" />

### @new-value事件
`@new-value`事件是带着要添加的值和`done`回调发出的。`done`回调有两个**可选的**参数。
  - 要添加的值
  - 行为(与`new-value-mode`属性的值相同，当它被指定时，它会覆盖该属性--如果它被使用的话)--默认行为(如果不使用`new-value-mode`)是添加该值，即使它是一个重复的。

调用没有参数的`done()`只是清空输入框的值，而不会以任何方式篡改模型。

<doc-example title="监听@new-value" file="QSelect/CreateListener" />

<doc-example title="只添加唯一值" file="QSelect/CreateListenerUnique" />

### 使用菜单和过滤
筛选并将新的值添加到菜单中。

<doc-example title="过滤并添加到菜单" file="QSelect/FilteringAddsToMenu" />

过滤新值(在下面的例子中，要添加的值需要至少3个字符才能通过)，并且不添加到菜单中。

<doc-example title="过滤不加入菜单" file="QSelect/FilteringNoAddToMenu" />

从输入中生成多个值。

<doc-example title="生成多个值" file="QSelect/FilteringAddMultiple" /> 从输入中生成多个值： <doc-example title="生成多个值" file="QSelect/FilteringAddMultiple" /> 从输入中生成多个值

## 净化处理

**默认情况下，所有的选项(包括选择的选项)都是经过净化处理的**。这意味着以HTML格式显示它们的功能被禁用。然而，如果你需要在你的选项上显示HTML并且你相信它们的内容，那么有几种方法可以做到这一点。

你可以通过以下方式强制显示菜单选项的HTML形式。
  - 将受信任选项的`html`键设置为`true`(对于特定的受信任选项)。
  - 或者通过设置QSelect的`options-html`属性(适用于所有选项)。

QSelect的显示值会以HTML形式显示，如果。
  - QSelect的`display-value-html`属性被设置了
  - 或者你没有使用`display-value`和
  - QSelect的`options-html`属性已被设置
  - 任何被选中的选项的`html`键被设置为`true`。

::: warning
如果你使用`selected`或`selected-item`槽，那么你要负责对显示值时行清理。`display-value-html`属性将不适用。
:::

<doc-example title="HTML表单中的选项" file="QSelect/HtmlOptions" />

<doc-example title="HTML表单中的显示值" file="QSelect/HtmlDisplayValue" />

## 渲染性能

渲染性能不受选项数量的影响，除非`map-options`被用在一个大的集合上。
请注意，在用户滚动列表的过程中，无限滚动会呈现出更多的选项。

::: tip
* (组合式 API) 为了在使用大量选项时获得最佳性能，不要用ref()/computed()/reactive()/etc.包裹你在`options`属性中传递的数组。这允许Vue跳过使列表对变化做出 "响应"。
* (选项式 API)为了在使用大量选项时获得最佳性能，使用`Object.freeze(items)`冻结你在`options`属性中传递的数组。这允许Vue跳过使列表 "响应" 变化的过程。
:::

<doc-example title="100k options" file="QSelect/RenderPerf" />

## 键盘导航

当 QSelect 聚焦时：
  - 按 <kbd>ENTER</kbd>、<kbd>ARROW DOWN</kbd>（或 <kbd>SPACE</kbd>，如果未设置   `use-input`）将打开选项列表
  - 如果设置了“使用芯片”：
  - 按 <kbd>SHIFT</kbd> + <kbd>TAB</kbd> 将在 QChips 中向后导航（如果选择 QChip，  <kbd>TAB</kbd> 将在 QChips 中向前导航）
  - 选择 QChip 时按 <kbd>ENTER</kbd> 将从选择中删除该选项
  - 按 <kbd>BACKSPACE</kbd> 将从选择中删除最后一个选项（当设置 `use-input` 时，输入应  该为空）
  - 按 <kbd>TAB</kbd> （或 <kbd>SHIFT</kbd> + <kbd>TAB</kbd> 如果 `use-chips`   未设置或选择了第一个 QChip）将导航到下一个或页面上的前一个可聚焦元素
  - 如果 `use-input` 未设置，则键入文本（<kbd>0</kbd> - <kbd>9</kbd> 或   <kbd>A</kbd> - <kbd>Z</kbd>） ：
  - 创建一个搜索缓冲区（将在 1.5 秒内未键入新键时重置），用于在选项标签中搜索
  - 如果缓冲区中的第一个键被多次键入，则选择以该字母开头的下一个选项（在当前焦点之后）
  - 选择与键入的文本匹配的下一个选项（从当前焦点开始）（匹配是模糊的 - 选项标签应以第一个字母开始，并包含所有字母）

打开选项列表时：
  - 按 <kbd>ARROW UP</kbd> 或 <kbd>ARROW DOWN</kbd> 将在选项列表中向上或向下导航
  - 按 <kbd>PAGE UP</kbd> 或 <kbd>PAGE DOWN</kbd> 将在选项列表中向上或向下导航一页
  - 按 <kbd>HOME</kbd> 或 <kbd>END</kbd> 将导航到选项列表的开头或结尾（仅当您不使用   `use-input` 或输入为空时）
  - 使用箭头键导航时，导航将在到达列表的开头或结尾时换行
  - 按下 <kbd>ENTER</kbd>（或 <kbd>SPACE</kbd>，当 `use-input` 未设置时，或 <kbd>TAB</kbd> 时，`multiple` 未设置）当一个选项在列表中被选中将：
    - 如果未设置`multiple`，请选择选项并关闭选项列表
    - 如果设置了`multiple`，则切换选项

## 本地表单提交

当处理一个有`action`和`method`的本地表单时（例如，当使用Quasar和ASP.NET控制器时），你需要在QSelect上指定`name`属性，否则formData将不包含它（如果它应该包含的话）-- 所有的值都被转换为字符串（本地行为，所以不要使用Object值）：

<doc-example title="本地表单" file="QSelect/NativeForm" />
