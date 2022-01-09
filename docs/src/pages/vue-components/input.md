---
title: 输入框
desc: QInput Vue组件用于捕捉用户的文本输入。
keys: QInput
---

QInput组件用于从用户那里获取文本输入。它使用`v-model`，类似于普通的输入。它支持错误和验证，并且有各种风格、颜色和类型。

## QInput API

<doc-api file="QInput" />

## 设计

::: warning
对于你的QInput，你只能使用其中一个主要的设计("填充"、"轮廓"、"突出"、"无边界")。你不能使用多种设计，因为它们都是自我排斥的。
:::

<doc-example title="设计概述" file="QInput/DesignOverview" />

### 着色

<doc-example title="着色" file="QInput/Coloring" />

### 标准
<doc-example title="标准" file="QInput/DesignStandard" />

### 填充型
<doc-example title="填充 "file="QInput/DesignFilled" />

### 勾画
<doc-example title="轮廓线 "file="QInput/DesignOutlined" />

### 突出显示
<doc-example title="突出 "file="QInput/DesignStandout" />

Standout设计最合适的使用情况之一是在QToolbar中。

<doc-example title="QToolbar中的Standout "file="QInput/StandoutToolbar" />

### 无边界
`无边界(borderless)`设计允许你将你的QInput无缝地集成到其他组件中，而不需要QInput在自己周围画一个边界或改变其背景颜色。

<doc-example title="无边界" file="QInput/Borderless" />

### 圆形设计

`Rounded` 属性只与Filled、Outlined和Standout设计一起使用，正如下面的例子所展示的：

<doc-example title="圆形" file="QInput/Rounded" />

### 方形边框

方形 "属性只对填充式、轮廓式和突出式设计有意义，正如下面的例子所展示的那样：

<doc-example title="方形边框" file="QInput/SquareBorders" />

### 深色背景

<doc-example title="暗色" file="QInput/Dark" dark />

## 基本特征

### 本地属性

所有在 "QInput "上设置的属性，如果不在**API**的 "props" 列表中，将被传递给本地字段("input "或 "textarea")。一些例子：自动完成，占位符。

请查看这些资源以了解更多关于本地属性的信息(对于输入，也请查看每种类型的具体属性)。

* [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
* [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)

### 可清除

作为一个辅助工具，你可以使用`clearable`属性，这样用户可以通过一个附加的图标将模型重置为`null`。下面例子中的第二个QInput相当于使用`clearable`。

<doc-example title="可清除" file="QInput/Clearable" />

### 输入类型

下面的QInputs使用了`type`属性，以便在其内部呈现本地等价的`<input type="...">`。

::: warning
支持和行为完全是渲染页面的浏览器的主题，而不是Quasar的核心代码。
:::

<doc-example title="输入类型" file="QInput/InputTypes" />

::: tip
一些输入类型(如`日期`或`时间`)总是渲染一些控件，所以你如果使用`标签`，那么你可能想把它和`堆栈-标签`一起设置，否则标签将与本地浏览器控件重叠。
:::

#### 数字类型的输入

你将使用`v-model.number`(注意`number`修饰语)和`type="number"`属性。

<doc-example title="数字类型的输入" file="QInput/InputTypeNumber" />

#### 文件类型的输入

::: tip ALTERNATIVES
**不要使用`type="file"`的QInput，你可能想用[QFile](/vue-components/file-picker) picker代替，甚至用[QUploader](/vue-components/uploader) **。然而，如果你希望使用QInput，请阅读下面的警告。
:::

::: warning
当QInput是`type="file"`时，不要使用`v-model`。浏览器的安全策略不允许为这样的输入设置一个值。因此，你只能读取它(附加一个`@update:model-value`事件)，但不能写入它。
:::

<doc-example title="文件类型的输入" file="QInput/InputTypeFile" />

### Textarea

<doc-example title="Textarea" file="QInput/Textarea" />

当你需要QInput与它的内容一起增长时，请使用`autogrow`属性，如下面的例子。

<doc-example title="Autogrow" file="QInput/Autogrow" />

### 前缀和后缀

<doc-example title="前缀和后缀" file="QInput/PrefixSuffix" />

### 自定义标签

使用`label`槽，你可以自定义标签的方面，或者作为`QTooltip`添加特殊功能。

::: tip
不要忘记设置`label-slot`属性。

如果你想与标签的内容(QTooltip)互动，在槽内的元素上添加`all-pointer-events`类。
:::

<doc-example title="自定义标签" file="QInput/CustomLabel" />

### 阴影文本

<doc-example title="阴影文本" file="QInput/ShadowText" />

### 带有QBtn类型 "提交 "的插槽

::: warning
当把类型为 "submit "的QBtn放在QField、QInput或QSelect的 "before"、"after"、"prepend "或 "append "槽中时，你还应该在相关的QBtn上添加一个`@click`监听器。这个监听器应该调用提交表单的方法。所有在这些槽中的 "点击 "事件都不会传播到它们的父元素。
:::

### 放弃模型

调试的作用是当你观察模型并对其进行昂贵的操作时。所以你想在触发模型更新之前先让用户打出，而不是在每个按键上更新模型。

<doc-example title="退避模型" file="QInput/Debouncing" />

### 加载状态

<doc-example title="加载状态" file="QInput/LoadingState" />

## 掩码

你可以在`mask'属性的帮助下强制/帮助用户输入一个特定的格式。

::: warning
只有当 "类型 "是 "文本"(默认)、"搜索"、"网址"、"电话 "或 "密码 "之一时，掩码才可用。
:::

下面是掩码标记：

| 代号 | 描述 |
| --- | --- |
| `#` | 数字 |
| `S` | 字母，从a到z，不区分大小写 |
| `N` | 字母数字，对字母不区分大小写。|
| `A` | 字母，转换为大写字母 |
| `a` | 字母，转换为小写字母 |
| `X` | 字母数字，转化为大写的字母。 |
| `x` | 字母数字，转换为小写的字母。|

对于QInput `mask`属性，有**的帮助。[完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/input/use-mask.js#L6)。你可以为了方便而使用这些(例子："电话"、"卡")，或者写出指定你的自定义需求的字符串。

<doc-example title="基础" file="QInput/MaskBasic" />

<doc-example title="填充掩码" file="QInput/MaskFill" />

如果你想强制用户输入某种格式，但你想让模型包含原始值，那么 `unmasked-value` 就很有用。

<doc-example title="未屏蔽的模型" file="QInput/MaskUnmaskedModel" />

如果你想强迫用户从头到尾填写掩码，并允许非固定长度的输入，那么 `reverse-fill-mask` 就很有用。

<doc-example title="反向填充掩码" file="QInput/MaskFillReverse" />

### 使用第三方掩码处理器

你可以通过对你的QInput做一些小的调整，轻松地使用任何第三方掩码处理器。

从这样的一个QInput开始。

```html
<q-input
  filled
  v-model="price"
  label="Price with 2 decimals"
  mask="#.##"
  fill-mask="#"
  reverse-fill-mask
  hint="Mask: #.00"
  input-class="text-right"
/>
```

你可以使用v-money指令。

```html
<q-field
  filled
  v-model="price"
  label="Price with v-money directive"
  hint="Mask: $ #,###.00 #"
>
  <template v-slot:control="{ id, floatingLabel, value, emitValue }">
    <input :id="id" class="q-field__input text-right" :model-value="value" @change="e => emitValue(e.target.value)" v-money="moneyFormatForDirective" v-show="floatingLabel">
  </template>
</q-field>
```

```javascript
moneyFormatForDirective: {
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  suffix: ' #',
  precision: 2,
  masked: false /* doesn't work with directive */
}
```

或者你可以使用货币组件：

```html
<q-field
  filled
  v-model="price"
  label="Price with v-money component"
  hint="Mask: $ #,###.00 #"
>
  <template v-slot:control="{ id, floatingLabel, value, emitValue }">
    <money :id="id" class="q-field__input text-right" :model-value="value" @update:model-value="emitValue" v-bind="moneyFormatForComponent" v-show="floatingLabel" />
  </template>
</q-field>
```

```javascript
moneyFormatForComponent: {
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  suffix: ' #',
  precision: 2,
  masked: true
}
```

## 验证

### 内部验证

你可以用`:rules`属性来验证QInput组件。指定嵌入式规则的数组或你自己的验证器。你的自定义验证器将是一个函数，如果验证器成功，则返回 "true"，如果不成功，则返回 "String "和错误信息。

::: tip
缺省情况下，出于完善的原因，规则的改变不会触发新的验证，直到模型改变。为了在规则改变时触发验证，可以使用`reactive-rules`布尔属性。缺点是会影响性能(所以只在你真正需要的时候使用！)，可以通过使用计算属性作为规则的值来稍微缓解(而不是在vue模板中指定它们)。
:::

这是为了让你能写出方便的形状规则，比如。

```js
value => condition || errorMessage
 ```
For example:
 ```js
value => value.includes('Hello') || 'Field must contain word Hello'
```

你可以通过调用QInput的`resetValidation()`方法来重置验证。

对于QInput的 "规则 "属性有**的帮助。[完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js) 。你可以为了方便而使用这些(例子："date"、"time"、"hexColor"、"rgbOrRgbaColor"、"anyColor")，或者编写字符串，指定你的自定义需求。

<doc-example title="基础" file="QInput/ValidationRequired" />

<doc-example title="最大长度" file="QInput/ValidationMaxLength" />

如果你设置了`lazy-rules`，验证在第一次模糊后开始。如果`lazy-rules`被设置为`ondemand`字符串，那么只有当组件的validate()方法被手动调用或当包装的QForm自己提交时，验证才会被触发。

<doc-example title="懒惰规则" file="QInput/ValidationLazy" />

<doc-example title="表单验证" file="QInput/ValidationForm" />

#### 异步规则
规则也可以是异步的，通过使用async/await或直接返回一个Promise。

::: tip
考虑将异步规则与`debounce`属性耦合，以避免在每次击键时立即调用异步规则，这可能不利于性能。
:::

<doc-example title="异步规则" file="QInput/ValidationAsync" />

### 外部验证

你也可以使用外部验证，只传递`error`和`error-message`(启用`bottom-slots`来显示这个错误信息)。

::: tip
根据你的需要，你可以将[Vuelidate](https://vuelidate.netlify.com/)(我们推荐的方法)或其他一些验证库连接到QInput。
:::

<doc-example title="外部" file="QInput/ValidationExternal" />

你也可以为错误信息定制槽。

<doc-example title="错误信息槽" file="QInput/ValidationSlots" /> 你也可以为错误信息定制槽。

## 本地表单提交

当处理一个有 `action` 和 `method` 的本地表单时(例如，当使用Quasar和ASP.NET控制器时)，你需要在QInput上指定`name`属性，否则formData将不包含它(如果它应该包含)。

<doc-example title="本地表单" file="QInput/NativeForm" />
