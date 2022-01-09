---
title: 弹出编辑
desc: QPopupEdit Vue组件可以用来 "就地"编辑一个值，例如在QTable的一个单元格上。
keys: QPopupEdit
related:
  - /vue-components/input
  - /vue-components/menu
---

QPopupEdit组件可以用来 "就地 "编辑一个值，比如说QTable中的一个单元格。默认情况下，一个单元格显示为一个字符串，如果你使用QPopupEdit，并且用户点击了该表的单元格，一个弹出窗口就会打开，用户可以使用一个文本框来编辑该值。

这个组件将一个[QMenu](/vue-components/menu)注入到它的父DOM元素中，并启用上述行为，所以**它可以在任何地方使用，而不仅仅是在QTable中。

## QPopupEdit API

<doc-api file="QPopupEdit" />

## 使用方法

::: warning
如果在一个QTable上使用，QPopupEdit将不能与单元格范围内的槽一起工作。
:::

### 单机版

<doc-example title="点击文本" file="QPopupEdit/Standalone" />

### 使用QTable
点击单元格可以看到弹出式编辑器。列 "姓名 "展示了 "标题 "属性。列 "卡路里 "显示了一个数值的用法。列 "Fat "也展示了 "disable "属性。如果你看一下源代码，你会发现 "脂肪 "单元格使用了QPopupEdit，然而当点击该单元格时，弹出窗口并没有显示。

<doc-example title="编辑第一列" file="QPopupEdit/WithTable" />

### 自定义

<doc-example title="自定义QPopupEdit" file="QPopupEdit/Customizing" />

### 持久性和带有按钮
你也可以用`buttons`属性添加两个按钮，"取消 "和 "设置"(默认标签)。这些按钮有助于控制用户的输入。除了 "按钮 "属性，你还有 "持久 "属性，它可以阻止用户用转义键关闭弹出窗口或在弹出窗口外点击/敲击。"persistent "属性在 "carbs "栏中展示。最后，你可以用`label-set`和`label-cancel`属性来控制两个按钮的标签，如 "Protein "一栏所示。注意 "保存 "代替了 "设置"，"关闭 "代替了 "取消"。

<doc-example title="持久化编辑，并带有按钮" file="QPopupEdit/WithButtons" />

### 默认槽
默认槽的参数是。

```js
{ initialValue, value, validate, set, cancel, updatePosition }
```

::: warning
不要破坏槽的参数结构，因为在直接使用`v-model'的`value'属性时，会产生linting错误。
:::

<doc-example title="默认插槽参数" file="QPopupEdit/DefaultSlotParameters" />

### 文本区/QEditor
由于QPopupEdit包装了QInput，你基本上可以使用任何类型的QInput。例如，你也可以使用一个文本区，如下图中的 "评论 "栏。

::: tip
当使用多行控件(textarea, QEditor)进行输入时，你还需要在组件上使用`@keyup.enter.stop`，以便阻止回车键关闭弹出窗口。你也需要添加控制弹出窗口的按钮。
:::

<doc-example title="QInput textarea" file="QPopupEdit/TextArea" />

<doc-example title="QEditor" file="QPopupEdit/PopupWithEditor" />

### 验证
QPopupEdit也允许对输入进行简单的验证。要使用它，你给它一个箭头函数形式的回调函数，它应该返回一个布尔值。`(value) => Boolean`。这在下面的 "卡路里 "一栏中**演示了。

::: tip Tip 1
注意，我们正在使用`hide`事件来重新验证输入。如果我们不这样做，QInput的错误属性就会 "挂 "在一个无效的状态。
:::

::: tip Tip 2
在这个例子中，我们使用了QInput的外部错误处理。我们也可以使用QInput的验证属性，并向QPopupEdit的验证属性发射值。同样的概念也可以在使用Vuelidate时实现。换句话说，给QPopupEdit的验证函数的值可以来自任何地方。
:::

<doc-example title="带验证的编辑" file="QPopupEdit/WithValidation" />
