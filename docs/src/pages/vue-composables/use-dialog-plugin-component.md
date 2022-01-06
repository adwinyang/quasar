---
title: useDialogPluginComponent可组成的
desc: Quasar的useDialogPluginComponent()的可组合性是什么，以及你如何使用它
keys: useDialogPluginComponent
related:
  - /quasar-plugins/dialog
---

::: tip
useDialogPluginComponent是[Quasar Dialog Plugin](/quasar-plugins/dialog#invoking-custom-component)(调用自定义组件)的一部分。如果你现在还没有深入研究，请先阅读一下那里。
:::

这个可组合的组件将被用于调用Dialog插件的自定义组件上。它将引导组件与插件之间的所有必要通信。

## 语法

```js
import { useDialogPluginComponent } from 'quasar'

setup () {
  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

  // dialogRef - 应用于QDialog的Vue ref值
  // onDialogHide - 用于处理QDialog上的@hide的函数。
  // onDialogOK - 调用函数，以解决对话框的 "OK "结果。
  //                    示例：onDialogOK() - 没有有效载荷
  //                    例如：onDialogOK({ /*.../* })--带有效载荷
  // onDialogCancel - 用 "取消 "的结果来结算对话框的函数。

  return {
    dialogRef,
    onDialogHide
  }
}
```

## 完整的示例

```html
<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    // ...你的定制属性
  },

  emits: [
    // 必须的；需要指定一些事件，你的
    // 组件将通过useDialogPluginComponent()发出。
    ...useDialogPluginComponent.emits
  ],

  setup () {
    // 必需的；必须在setup()中调用。
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    // dialogRef - 应用于QDialog的Vue ref值
    // onDialogHide - 用于处理QDialog上的@hide的函数。
    // onDialogOK - 调用函数，以解决对话框的 "OK "结果。
    //                    示例：onDialogOK() - 没有有效载荷
    //                    例如：onDialogOK({ /*.../* })--带有效载荷
    // onDialogCancel - 用 "取消 "的结果来结算对话框的函数。

    return {
      // 这是必须的。
      // 需要注入这些(从useDialogPluginComponent()调用)。
      // 进入vue范围，用于vue html模板
      dialogRef,
      onDialogHide,

      // 我们在vue html模板中使用的其他方法。
      // 这些是我们示例的一部分(所以不是必须的)。
      onOKClick () {
        // 在确定的情况下，它必须是
        // 调用onDialogOK(带可选的有效载荷)。
        onDialogOK()
        // 或带有有效载荷：onDialogOK({ ... })
        // ...它也会自动隐藏该对话框
      },

      // 我们可以直接通过onDialogCancel。
      onCancelClick: onDialogCancel
    }
  }
}
</script>
```
