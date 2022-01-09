---
title: 字段
desc: QField Vue 组件用于提供通用功能和方面来形成组件。
keys: QField
---

QField 组件被用来为表单组件提供通用的功能和方面。它使用`:model-value`(或者`v-model`，如果你想使用`clearable`属性)来了解里面的组件的模型。它支持标签、提示、错误、验证，并有多种风格和颜色。

QField允许你在它里面显示任何表单控件(或者几乎任何东西)。只要把你想要的内容放在`control`槽内即可。

::: danger
不要用QField包裹QInput、QFile或QSelect，因为这些组件已经继承了QField。
:::

## QField API

<doc-api file="QField" />

## 设计

::: tip
下面的例子使用哑巴内容(文本)只是为了向你展示QField可以使用的设计。要查看包裹真实组件的例子，请看 "基本功能 "部分。
:::

::: danger
QField不会(也不应该)管理你的`控制'槽，所以如果你使用`label'属性，最好同时指定`stack-label'，否则当QField不被关注时，它可能会与你的控制重叠。
:::

### 概述

对于你的QField，你只能使用其中一个主要的设计("填充"、"轮廓"、"突出"、"无边界")。你不能使用多种设计，因为它们是自我排斥的。

<doc-example title="设计概述" file="QField/DesignOverview" />

### 着色

<doc-example title="着色" file="QField/Coloring" />

### 标准
<doc-example title="标准" file="QField/DesignStandard" />

### 填充型
<doc-example title="填充 "file="QField/DesignFilled" />

### 勾画
<doc-example title="轮廓线 "file="QField/DesignOutlined" />

### 突出显示
<doc-example title="突出 "file="QField/DesignStandout" />

Standout设计最合适的使用情况之一是在QToolbar中。

<doc-example title="QToolbar中的Standout "file="QField/StandoutToolbar" />

### 无边界
无边界 "设计允许你将你的QField无缝地集成到其他组件中，而不需要QField在自己周围画一个边界或改变其背景颜色。

<doc-example title="无边界" file="QField/Borderless" />

### 圆形设计

Rounded "属性只与Filled、Outlined和Standout设计一起使用，正如下面的例子所展示的。

<doc-example title="圆形" file="QField/Rounded" />

### 正方形边框

方形 "属性只对填充式、轮廓式和突出式设计有意义，正如下面的例子所展示的那样。

<doc-example title="方形边框" file="QField/SquareBorders" />

### 深色背景

<doc-example title="暗色" file="QField/Dark" dark />

## 基本特征

### 可清除
作为一个辅助工具，你可以使用`clearable`属性，这样用户就可以通过附加的图标将模型重置为`null'。

::: warning
如果使用`clearable`，你必须使用`v-model`或监听`@update:model-value`并更新值。
:::

<doc-example title="可清除" file="QField/Clearable" />

### 控制类型

你放在`控制'槽内的任何东西都将被用作字段的内容。我们在下面提供一些控件的例子。

<doc-example title="控制类型" file="QField/ControlTypes" />

::: tip
大多数表单控件总是呈现一些可见的东西，所以你如果使用`label'，那么你可能想把它和`stack-label'一起设置，否则标签会与封闭的控件重叠。
:::

### 前缀和后缀

<doc-example title="前缀和后缀" file="QField/PrefixSuffix" />

### 自定义标签

使用`label`槽，你可以自定义标签的方面，或者作为`QTooltip`添加特殊功能。

::: tip
不要忘记设置`label-slot`属性。

如果你想与标签的内容(QTooltip)互动，在槽内的元素上添加`all-pointer-events`类。
:::

<doc-example title="自定义标签" file="QField/CustomLabel" />

### 带有QBtn类型 "提交 "的插槽

::: warning
当把类型为 "submit "的QBtn放在QField、QInput或QSelect的 "before"、"after"、"prepend "或 "append "槽中时，你还应该在相关的QBtn上添加一个`@click`监听器。这个监听器应该调用提交表单的方法。所有在这些槽中的 "点击 "事件都不会传播到它们的父元素。
:::

### 加载状态

<doc-example title="加载状态" file="QField/LoadingState" />

## 验证

### 内部验证

你可以用`:rules`属性来验证QField组件。指定嵌入式规则的数组或你自己的验证器。你的自定义验证器将是一个函数，如果验证器成功，则返回 "true"，如果不成功，则返回 "String "和错误信息。

::: tip
缺省情况下，出于完善的原因，规则的改变不会触发新的验证，直到模型改变。为了在规则改变时触发验证，可以使用`reactive-rules`布尔属性。缺点是会影响性能(所以只在你真正需要的时候使用！)，可以通过使用计算属性作为规则的值来稍微缓解(而不是在vue模板中指定它们)。
:::

这是为了让你能写出方便的形状规则，比如。

```js
value => condition || errorMessage
 ```
示例：
 ```js
value => value < 10 || 'Value should be lower'
```

你可以通过调用QField上的`resetValidation()`方法来重置验证。

<doc-example title="基础" file="QField/ValidationRequired" />

<doc-example title="最大值" file="QField/ValidationMaxValue" />

如果你设置了`lazy-rules`，验证会在第一次模糊后开始。如果`lazy-rules`被设置为`ondemand`字符串，那么只有当组件的validate()方法被手动调用或当包装的QForm自己提交时，验证才会被触发。

<doc-example title="懒惰规则" file="QField/ValidationLazy" />

#### 异步规则
规则也可以是异步的，通过使用async/await或直接返回一个Promise。

::: tip
考虑将异步规则与`debounce`属性耦合，以避免在每次击键时立即调用异步规则，这可能不利于性能。
:::

<doc-example title="异步规则" file="QField/ValidationAsync" />

### 外部验证

你也可以使用外部验证，只传递`error`和`error-message`(启用`bottom-slots`来显示这个错误信息)。

::: tip
根据你的需要，你可以将[Vuelidate](https://vuelidate.netlify.com/) (我们推荐的方法)或其他一些验证库连接到QField。
:::

<doc-example title="外部" file="QField/ValidationExternal" />

你也可以为错误信息定制槽。

<doc-example title="用于错误信息的槽" file="QField/ValidationSlots" />
