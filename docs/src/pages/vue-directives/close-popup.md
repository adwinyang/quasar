---
title: 关闭弹出式窗口指令
desc: 在使用QDialog或QMenu时，帮助Vue指令。
keys: close-popup
related:
  - /vue-components/dialog
  - /vue-components/menu
---

当处理[QDialog](/vue-components/dialog)和[QMenu](/vue-components/menu)组件时，这个指令是一个帮助工具。当连接到一个DOM元素或组件时，当点击/点击时，该组件将关闭QDialog或QMenu(无论哪个是第一父级)。

## ClosePopup API

<doc-api file="ClosePopup" />

## 用法

### 基本

<doc-example title="使用QMenu" file="ClosePopup/Menu" />

<doc-example title="使用QDialog" file="ClosePopup/Dialog" /> ##基本用法

### 关闭多层次

你也可以通过给指令提供一个级别号来关闭多个级别的弹出窗口。

```html
<... v-close-popup="3">
```

* 如果值为0或布尔值`false`，则指令被禁用。
* 如果值小于0，那么它将关闭所有的弹出式窗口。
* 如果值是1或布尔值`true`或未定义，那么它只关闭父弹出窗口。
* 如果值大于1，它将关闭连锁中指定数量的父弹出窗口(注意连锁的QMenus只被认为是一个弹出窗口，QPopupProxy将连锁的菜单分开)。

请注意，连锁的QMenus(一个直接放在另一个下面)不需要你指定多个级别。当`v-close-popup`被用于链式QMenu时，它认为所有直接链式的QMenus只是一个级别。

<doc-example title="菜单树" file="ClosePopup/MenuTree" />

在下面的示例中，菜单使用了2层，这意味着它也将关闭对话框，因为对话框是它的父级。

<doc-example title="带有菜单的对话框" file="ClosePopup/DialogMenu" />

注意下面的内容，内部对话框是主对话框的一个子程序。这是`v-close-popup`能够在使用多层次时关闭两个对话框的唯一方法。否则，如果对话框是兄弟姐妹(或任何其他类似情况，一个对话框不是另一个的孩子)，你将不得不在对话框上使用v-models，并自己处理两个对话框的关闭。

<doc-example title="Dialog in Dialog" file="ClosePopup/DialogInDialog" />
