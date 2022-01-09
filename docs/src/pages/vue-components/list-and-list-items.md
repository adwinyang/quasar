---
title: 列表和列表项
desc: 如何使用QList、QItem、QItemSection和QItemLabel Vue组件。
keys: QList,QItem,QItemSection,QItemLabel
related:
  - /vue-components/expansion-item
  - /vue-components/slide-item
  - /vue-components/separator
---

QList和QItem是一组组件，它们可以一起工作，将多个行项目垂直地呈现为一个连续的元素。它们最适合于显示类似数据类型的信息行，如联系人列表、播放列表或菜单。每一行被称为一个项目。QItem也可以在QList之外使用。

List可以封装Item或类似Item的组件，例如[QExpansionItem](/vue-components/expansion-item)或[QSlideItem](/vue-components/slide-item) 。此外，[QSeparator](/vue-components/separator)也可以在需要时用来分割部分。

列表项有以下预先建立的子组件：

**QItemSection** - 一个项目部分可以有几个特定内容的用途。它们通过`avatar'、`thumbnail`和`side`属性来控制。在没有属性的情况下，它将呈现你的QItem的主要部分(它的跨度是最大的可用空间)。
**QItemLabel** - 项目标签对于QItemSection中预定义的文本内容类型很有用，或者对于QList本身的标题式内容很有用。

## QList API
<doc-api file="QList" />

## QItem API
<doc-api file="QItem" />

## QItemSection API
<doc-api file="QItemSection" />

## QItemLabel API
<doc-api file="QItemLabel" />

## 使用方法

### 基础

<doc-example title="基础" file="QItem/Basic" />

<doc-example title="深色背景下" file="QItem/Dark" dark />

<doc-example title="密集" file="QItem/Dense" />

### QItemSection

<doc-example title="左侧头像/缩略图QItemSection" file="QItem/AvatarLeft" />

<doc-example title="右侧头像/缩略图QItemSection" file="QItem/AvatarRight" />

::: tip
当你有多行项目时，你可以使用QItemSection侧边/avatar上的`top`属性来将各部分对齐到顶部，覆盖默认的中间对齐。
:::

<doc-example title="侧面 QItemSection" file="QItem/SideSection" />

### 活动状态

<doc-example title="活动属性" file="QItem/ActiveState" />

### QItemLabel

::: warning
注意，你可以用`lines`属性处理标签溢出，告诉它可以跨多少行。但是，这个功能使用了Webkit的特定CSS，所以在IE/Edge中无法使用。
:::

<doc-example title="ItemLabel" file="QItem/ItemLabel" />

### 更多涉及的例子

<doc-example title="联系人列表" file="QItem/ExampleContacts" />

<doc-example title="设置" file="QItem/ExampleSettings" />

<doc-example title="电子邮件" file="QItem/ExampleEmails" />

<doc-example title="文件夹列表" file="QItem/ExampleFolders" />

在下面的例子中，为了演示的目的，我们使用`active`属性，而不是QItem的路由器属性(`to`, `exact`)。UMD没有Vue Router，所以你无法在Codepen/jsFiddle中使用它。

<doc-example title="菜单" file="QItem/ExampleMenu" />

::: tip
对于更复杂的菜单，也可以考虑使用[QExpansionItem](/vue-components/expansion-item)。
:::

### 连接到Vue Router
你可以通过`<router-link>`属性与Vue Router一起使用QItems。这些允许监听当前应用程序的路由，也可以在点击/触摸时触发一个路由。

```html
<q-item to="/inbox" exact>
  <q-item-section avatar>
    <q-icon name="inbox" />
  </q-item-section>

  <q-item-section>
    Inbox
  </q-item-section>
</q-item>
```
