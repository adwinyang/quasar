---
title: 形状
desc: QForm Vue组件渲染了一个表单，并允许轻松验证子表单组件，如QInput, QSelect或QField。
keys: QForm
related:
  - /vue-components/input
  - /vue-components/select
  - /vue-components/field
  - /vue-composables/use-form-child
---

QForm组件渲染了一个`<form>`DOM元素，并允许你轻松地验证子表单组件(如[QInput](/vue-components/input#Internal-validation)、[QSelect](/vue-components/select)或你的[QField](/vue-components/field)包装组件)，这些组件具有**内部验证**(不是外部验证)，通过与它们相关的`rules'。

## QForm API

<doc-api file="QForm" />

## 使用方法

::: warning
请注意以下几点。
* QForm连接了QInput、QSelect或QField包装的组件。
* QInput, QSelect或QField包装的组件必须使用内部验证(而不是外部验证)。
* 如果你想利用 "重置 "功能，那么一定要在QForm上捕获"@reset "事件，并使其处理程序重置所有被包装的组件模型。
:::

<doc-example title="基本" file="QForm/Basic" />

为了让用户能够激活表单上的"@submit "或"@reset "事件，创建一个QBtn，将 "type "设置为 "submit "或 "reset"。

```html
<div>
  <q-btn label="Submit" type="submit" color="primary"/>
  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
</div>
```

另外，你可以给QForm一个Vue ref name，并直接调用`validate`和`resetValidation`函数。

```js
// 组合式 API 变体

// <q-表单 ref="myForm">

setup () {
  const myForm = ref(null)

  function validate () {
    myForm.value.validate().then(success => {
      if (success) {
        // 是的，模型是正确的
      }
      else {
        // 哦，不，用户已经填写了
        // 至少有一个无效的值
      }
    })
  }

  // 来重置验证。
  function reset () {
    myForm.value.resetValidation()
  }

  return {
    myForm,
    // ...
  }
}
```

```js
// 选项式 API 变体

// <q-表单 ref="myForm">

this.$refs.myForm.validate().then(success => {
  if (success) {
    // 是的，模型是正确的
  }
  else {
    // 哦，不，用户已经填写了
    // 至少有一个无效的值
  }
})

// 来重置验证。
this.$refs.myForm.resetValidation()
```

## 关闭自动补全功能
如果你想关闭某些浏览器对你的表单的所有输入元素使用自动更正或拼写检查的方式，你也可以在QForm组件中添加这些纯HTML属性。

```html
autocorrect="off"
autocapitalize="off"
autocomplete="off"
spellcheck="false"
```

## 提交到一个URL(本地表单提交)
如果你在QForm上使用本地的`action`和`method`属性，请记得在每个 Quasar 表单组件上使用`name`属性，这样发送的formData才能真正包含用户填写的内容。

```html
<q-form action="https://some-url.com" method="post">
  <q-input name="firstname" ...>
  <!-- ... -->
</q-form>
```

* 通过设置QForm的`action`、`method`、`enctype`和`target`属性来控制表单的提交方式。
* 如果QForm上没有`@submit`的监听器，那么如果验证成功，表单将被提交。
* 如果QForm上有`@submit`的监听器，那么如果验证成功，该监听器将被调用。在这种情况下，为了做一个本地提交。

```html
<q-form action="https://some-url.com" method="post" @submit.prevent="onSubmit">
  <q-input name="firstname" ...>
  <!-- ... -->
</q-form>
```

```js
methods: {
  onSubmit (evt) {
    console.log('@submit - do something here', evt)
    evt.target.submit()
  }
}
```

## 子实体通信

默认情况下，所有的 Quasar 表单组件都与父代QForm实例进行通信。如果由于某种原因，你正在创建你自己的表单组件(**没有包裹 Quasar 表单组件**)，那么你可以通过使用以下方法使QForm知道它。

```js
// 组合式 API 变体

import { useFormChild } from 'quasar'

setup () {
  // 函数validate() { ... }

  useFormChild({
    validate, // Function; Can be async;
              // 应该返回一个布尔值(或一个解析为布尔值的承诺)。
    resetValidation,    // Optional function which resets validation
    requiresQForm: true // should it error out if no parent QForm is found?
  })
}
```

```js
// 选项式 API 变体

import { QFormChildMixin } from 'quasar'

// 某些组件
export default {
  mixins: [ QFormChildMixin ],

  methods: {
    // 要求！应该返回一个布尔值
    // 或一个可解析为布尔值的Promise
    validate () {
      console.log('called my-comp.validate()')
      return true
    },

    // 可选功能
    resetValidation () {
      // ...
    }
  },

  // ...
}
```
