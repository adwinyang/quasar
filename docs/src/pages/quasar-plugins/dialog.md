---
title: 对话框插件
desc: 一个 Quasar 插件，它提供了一种简单的方法，以对话框的形式显示提示、选择、确认或警告。
keys: Dialog
related:
  - /vue-components/dialog
  - /quasar-plugins/bottom-sheet
  - /vue-composables/use-dialog-plugin-component
---

 Quasar 对话是为用户提供选择特定行动或行动列表的能力的一个好方法。它们也可以为用户提供重要的信息，或者要求他们做出一个决定(或多个决定)。

从UI的角度来看，你可以把Dialogs看作是一种浮动模式，它只覆盖屏幕的一部分。这意味着Dialogs应该只用于用户的快速操作。

::: tip
对话框也可以在你的Vue文件模板中作为一个组件使用(用于复杂的使用情况，如特定的表单组件，可选择的选项等)。为此，请访问[QDialog](/vue-components/dialog) 页面。
:::

相对于QDialog组件，将Dialogs作为Quasar Plugins使用的好处是，该插件也可以从Vue空间之外调用，不需要你管理它们的模板。但结果是，它们的定制不能与对应的组件相比。

然而，**你也可以为对话框插件提供一个组件来渲染**(见 "调用自定义组件 "一节)，这是一个避免用内联对话框弄乱你的Vue模板的好方法(而且它还可以帮助你更好地组织你的项目文件，还可以重复使用对话框)。

通过QDialog插件，你可以通过编程建立三种类型的对话框，其表单内容如下。
1. 一个提示对话框--要求用户在一个输入字段中填写某种数据。
2. 一组选项，供用户使用单选按钮或切换按钮(仅单选)或复选框(用于多选)进行选择。
3. 一个简单的确认对话框，用户可以取消或给她一个特定的动作或输入的 "OK"。

为了创建 #1，提示输入表单，你在`opts`对象中有`prompt`属性。

为了创建 #2，选项选择表单, 你在`opts`对象中有`options`属性.

## Dialog API
<doc-api file="Dialog" />

## 安装

<doc-installation plugins="Dialog" />

## 使用方法

```js
// 在Vue文件之外
import { Dialog } from 'quasar'
(Object) Dialog.create({ ... })

// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  $q.dialog({ ... }) // returns Object
}
```

请检查API卡，看看返回的对象是什么。

### 预定义的

::: tip
对于下面所有的示例，在你检查的时候也可以看到浏览器的控制台。
:::

::: warning
这并不是一个详尽的清单，你可以用对话框作为 Quasar 插件做什么。要进一步探索，请查看API部分。
:::

<doc-example title="Basic" file="Dialog/Basic" />

<doc-example title="Dark mode" file="Dialog/Dark" />

<doc-example title="Radios, Checkboxes, Toggles" file="Dialog/Pickers" />

<doc-example title="Other options" file="Dialog/OtherOptions" />

### 基础验证

您可以使用一个基本的验证系统，以便用户在填写预期值之前无法提交对话框（单击/点击“确定”或按<kbd>ENTER</kbd>）。

<doc-example title="Prompt with validation" file="Dialog/ValidationPrompt" />

<doc-example title="Options with validation" file="Dialog/ValidationOptions" />

### 进度条

<doc-example title="Showing progress" file="Dialog/Progress" />

### 使用 HTML
如果您指定 `html: true` 属性，则可以在标题和消息上使用 HTML。 **请注意，这可能会导致 XSS 攻击**，因此请确保已对消息进行了清理。

<doc-example title="Unsafe HTML message" file="Dialog/UnsafeHtml" />

### 调用自定义组件

您还可以调用自己的自定义组件，而不是依赖 Dialog 插件自带的默认组件。但在这种情况下，您将负责处理所有事情（包括您自己的组件道具）。

这个功能实际上是对话框插件的 "面包和黄油"。它通过分离和重复使用对话框的功能，帮助你保持其他vue组件html模板的整洁。

```js
import { useQuasar } from 'quasar'
import CustomComponent from '..path.to.component..'

setup () {
  const $q = useQuasar()

  $q.dialog({
    component: CustomComponent,

    // 转发到你的自定义组件的属性
    componentProps: {
      text: 'something',
      // ...更多...属性...
    }
  }).onOk(() => {
    console.log('OK')
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}
```

上述与Options API等效的方法是直接使用`this.$q.dialog({ ... })`。

::: warning
然而，你的自定义组件必须遵循下面描述的接口，以便完美地与对话框插件挂钩。**注意"必须"的注释**，并按原样接受它--只是一个赤裸裸的示例，仅此而已。
:::

#### 组合式 API 的变体

我们将使用 [useDialogPluginComponent](/vue-composables/use-dialog-plugin-component) 组合。

```html
<template>
  <!-- 注意这儿的 dialogRef  -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...内容
        ... 使用 q-card-section 吗?
      -->

      <!-- 按钮示例 -->
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

如果你想以对象形式定义`emits`，那么(需要Quasar v2.2.5+)：

```
emits: {
  // 必须的；需要指定一些事件，你的
  // 组件将通过useDialogPluginComponent()发出。
  ...useDialogPluginComponent.emitsObject,

  // ......你自己的定义
]
```

#### 选项式 API 变体

```html
<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...内容
        ... 使用 q-card-section 吗?
      -->

      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    // ...你的定制属性
  },

  emits: [
    // 必需的
    'ok', 'hide'
  ],

  methods: {
    // 以下方法是必须的
    // (不要改变它的名字-->"展示")
    show () {
      this.$refs.dialog.show()
    },

    // 以下方法是必须的
    // (不要改变它的名字-->"隐藏")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // 需要排放的气体
      // 当QDialog发出 "隐藏 "事件时
      this.$emit('hide')
    },

    onOKClick () {
      // 在确定的情况下，它必须是
      // 发出 "ok "事件(有可选的有效载荷)。
      // 在隐藏QDialog之前
      this.$emit('ok')
      // 或带有有效载荷： this.$emit('ok', { ... })

      // 然后隐藏对话
      this.hide()
    },

    onCancelClick () {
      // 我们只需要隐藏对话框
      this.hide()
    }
  }
}
</script>
```
## Cordova/Capacitor 后退按钮
 Quasar 默认为你处理后退按钮，所以它可以隐藏任何打开的对话框，而不是默认的行为，即返回到前一页(这不是一个好的用户体验)。

然而，如果你想禁用这种行为，请编辑你的/quasar.conf.js文件：

```js
// quasar.conf.js;
// 仅适用于 Cordova
return {
  framework: {
    config: {
      cordova: {
        // Quasar 在手机后退按钮上处理应用程序退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 另一方面，以下是完全地
        // 禁用 Quasar 的后退按钮管理。
        backButton: true/false
      }
    }
  }
}

// quasar.conf.js;
// 仅适用用于 Capacitor
return {
  framework: {
    config: {
      capacitor: {
        // Quasar 在手机后退按钮上处理应用程序退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 另一方面，以下是完全地
        // 禁用 Quasar 的后退按钮管理。
        backButton: true/false
      }
    }
  }
}
```
