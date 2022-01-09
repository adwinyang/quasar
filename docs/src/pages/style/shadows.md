---
title: CSS阴影(海拔)
desc: Quasar提供的CSS类的列表，用于定义DOM元素上的标高。
---
简单而有效的方法来添加阴影，以创造深度/高度效果。
阴影符合Material Design规范(24级深度)。

## 用法

| CSS类名称 | 说明 |
| --- | --- |
| `no-shadow` | 删除任何阴影 |
| `inset-shadow` | 在顶部设置一个嵌套阴影
| `inset-shadow-down` | 在底部设置一个嵌入的阴影
| `shadow-1` | 设置深度为1 |
| `shadow-2` | 设置深度为2 |
| `shadow-N` | 其中`N`是1到24的整数。|
| `shadow-transition` | 在阴影上应用默认的CSS过渡效果 |

<doc-example title="标准阴影" file="shadows/Standard" scrollable />

上面的阴影指向了元素的底部。如果你想让它们指向元素的顶部，请在数字前加上`up'：

| CSS类名称 | 说明 |
| --- | --- |
| `shadow-up-1` | 设置深度为1
| `shadow-up-2` | 设置深度为2
| `shadow-up-N` | 其中`N`是1到24的整数。|

<doc-example title="阴影朝上" file="shadows/PointingUp" scrollable />

<doc-example title="嵌入式阴影" file="shadows/Inset" />


