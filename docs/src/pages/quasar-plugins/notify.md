---
title: 通知
desc: 一个 Quasar 插件，用于向用户显示动画信息，如通知、祝酒词和点心条。
keys: Notify
---
Notify是一个 Quasar 插件，它可以以通知的形式向用户显示动画信息(漂浮在你的页面的一切之上)。它们对于提醒用户某个事件是很有用的，甚至可以通过行动来吸引用户。也被称为祝酒词或snackbar。

## Notify API

<doc-api file="Notify" />

## 安装

<doc-installation plugins="Notify" config="notify" /> ## Installation

## 使用方法

### 基本

```js
// 在Vue文件之外
import { Notify } from 'quasar'

Notify.create('Danger, Will Robinson! Danger!')
// 或用一个配置对象。
Notify.create({
  message: 'Danger, Will Robinson! Danger!'
})

// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.notify('Message')
  // 或用一个配置对象。
  $q.notify({...})
}
```

<doc-example title="基本" file="Notify/Basic" />

::: tip
如果你定义了任何行动，当用户选中它时，通知将自动被驳回。
:::

### 有字幕

<doc-example title="标题" file="通知/标题" />

### 带图标、头像或旋转器

<doc-example title="有图标 "file="Notify/Icon" /> ###有图标、头像或旋转器

<doc-example title="有头像" file="Notify/Avatar" /> ### 带图标、头像或旋转器

<doc-example title="有旋转器" file="Notify/Spinner" /> "有旋转器" file="Notify/Spinner" />

### 有行动

<doc-example title="有行动" file="Notify/Actions" /> ### 有行动

### 多线

<doc-example title="多线" file="Notify/Multiline" /> ### 多线操作

### 定位

<doc-example title="定位和不同选项" file="Notify/Positioning" /> ###定位

::: tip
有关选项的完整列表，请查看API部分。
:::

### 分组

每个通知都有一个独特的组，它是由消息+标题+多行+动作标签+位置计算出来的。当同一组的多个通知被触发时，不是显示所有的通知并淹没整个视图，而是只有第一个通知和一个徽章留在屏幕上。徽章的内容代表了自第一个通知出现在屏幕上以来，同一通知被触发的次数(以及相同的位置)。

然而，如果你想禁用这种行为，可以指定`group: false`。在下面的示例中，第一个按钮每次被点击都会触发相同的通知两次。第二个按钮的分组功能被禁用。然而，第三个按钮有一个自定义的组名，所以每一个后续的通知都会取代旧的通知并增加徽章的数量。

<doc-example title="分组" file="Notify/Grouping" />

<doc-example title="自定义徽章" file="Notify/GroupingCustomBadge" />

### 超时进度

如果你愿意，有一种方法可以告诉用户通知何时会从屏幕上消失。那是针对超时时间没有设置为0的情况。

<doc-example title="超时进程" file="Notify/TimeoutProgress" />

### 可更新的通知

如果你有一个正在进行的进程，并且你想通知用户它的进展，而不阻止他当前正在做的事情，那么你可以生成一个可更新的通知。在此过程中，显示一个旋转器也很有用。

请注意，在下面的示例中，我们明确设置了 "group: false"(因为只有非分组的通知可以被更新)和 "timeout: 0"(因为我们想完全控制通知何时被驳回)。

<doc-example title="可更新" file="Notify/Updatable" />

### 预定义类型

有四种开箱即用的预定义类型，你可以使用。"正面"、"负面"、"警告 "和 "信息"。

<doc-example title="开箱即用的类型" file="Notify/PredefinedTypesDefault" />

此外，你可以注册你自己的类型，甚至可以覆盖预定义的类型。这样做的最佳位置是在[引导文件](/quasar-cli/boot-files)中。

<doc-example title="自定义类型" file="Notify/PredefinedTypesCustom" />

```js
// 如何在引导文件中注册。

import { Notify } from 'quasar'

Notify.registerType('my-notif', {
  icon: 'announcement',
  progress: true,
  color: 'brown',
  textColor: 'white',
  classes: 'glossy'
})
```

### 使用HTML
如果你指定 "html: true "属性，你可以在消息中使用HTML。**请注意，这可能导致XSS攻击**，所以请确保你自己对消息进行消毒。

<doc-example title="不安全的HTML消息" file="Notify/UnsafeHtml" />

### 设置属性
你可以通过设置`attrs`对象属性，在通知本身或单个通知动作上设置自定义HTML属性。

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.notify({
    ...

    attrs: {
      // 为通知本身。
      role: 'alertdialog'
    },

    actions: [
      {
        icon: 'close',
        // 为个人行动(按钮)。
        attrs: {
          'aria-label': 'Dismiss'
        }
      }
    ]
  })
}
```

### 以程序方式关闭
通知的目的是只由用户来关闭，然而在特殊情况下，你可以通过编程来实现。当你设置无限期超时(0)时尤其有用。

```js
const dismiss = $q.notify({...})
...
dismiss()
```

### 设置默认值
有两种方法可以设置适用于所有通知的默认配置：通过quasar.conf.js > framework > config > notify Object(见安装部分)或以编程方式(见下文)。

我们将描述通过[boot file](/quasar-cli/boot-files)来设置默认配置(在你的代码中的任何地方工作都是一样的，但boot file可以确保在你的应用程序启动之前就运行)。

首先我们创建启动文件。让我们把它命名为 "notify-defaults.js"。

```bash
$ quasar new boot notify-defaults [--format ts]
```

将创建的notify-defaults.js文件添加到`quasar.conf.js`中的启动阵列。

```js
module.exports = function(ctx) {
  return {
    // ...
    boot: ['notify-defaults'],
    // ...
  }
```

然后我们编辑新创建的`/src/boot/notify-defaults.js`。

```js
import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})
```

::: warning
你只能通过这个方法设置默认的`行动'。在quasar.conf.js中用处理程序指定`actions`不能也不会起作用。
:::

我们也可以在一些Vue文件中设置默认值。

```js
// 在一个Vue组件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.notify.setDefaults({
    position: 'top-right',
    timeout: 2500,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }]
  })
}
```
