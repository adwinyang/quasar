---
title: 底层表单插件
desc: 一个Quasar插件，用于显示一个从应用窗口底部边缘滑上的用户操作列表。
keys: BottomSheet
related:
  - /quasar-plugins/dialog
  - /vue-components/dialog
---

底部表格从设备屏幕的底部边缘向上滑动，显示一组选项，并能确认或取消一项行动。底部工作表有时可以作为菜单的替代品，但是，它们不应该被用于导航。

底部工作表总是出现在页面上的任何其他组件之上，并且必须被驳回才能与底层内容进行互动。当它被触发时，页面的其他部分会变暗，以使底部表单的选项得到更多关注。

底层表单可以以列表或网格的形式显示，可以用图标或头像显示。它们既可以作为Vue文件模板中的一个组件，也可以作为一个全局可用的方法。

## BottomSheet API

<doc-api file="BottomSheet" />

## 安装

<doc-installation plugins="BottomSheet" />

## 使用方法

```js
// 在Vue文件之外
import { BottomSheet } from 'quasar'
BottomSheet.create({ ... }) // returns Object

// 在一个Vue文件中
import { useQuasar } from 'quasar'
setup () {
  const $q = useQuasar()
  $q.bottomSheet({ ... }) // returns Object
}
```

::: tip
当用户点击手机/平板电脑的返回键(仅适用于Cordova应用程序)，Action Sheet将被自动关闭。

另外，当在桌面浏览器上，点击`ESCAPE`键也会关闭Action Sheet。
:::

<doc-example title="列表和网格" file="BottomSheet/Basic" />

<doc-example title="黑暗模式" file="BottomSheet/Dark" />

::: tip
关于详尽的选项清单，请查看API部分。
:::
