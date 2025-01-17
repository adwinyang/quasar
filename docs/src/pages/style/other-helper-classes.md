---
title: 其他CSS辅助类
desc: 由 Quasar 提供的鼠标、大小、方向和边框的CSS辅助类的列表。
---
有很多CSS类，你可以在编写Vue模板时使用。这对缓解你的VueModels和模板的复杂性非常方便。

下面的列表并不完整。也可以查看其他的CSS文档页面，如排版、可见性、阴影、定位。

## 鼠标相关

| 类名 | 说明 |
| --- | --- |
| `non-selectable` | 用户不能选择DOM节点和它的文本。 |
| `no-pointer-events` | DOM元素不会成为鼠标事件的目标--点击、悬停等。 |
| `all-pointer-events` | 与`没有指针事件'正好相反 |
| `cursor-pointer` | 将鼠标指针放在DOM元素上，看起来就像放在一个可点击的链接上。 |
| `cursor-not-allowed` | 改变鼠标指针在DOM元素上的位置，使其看起来像是不会被执行的动作。 |
| `cursor-inherit` | 在DOM元素上改变鼠标指针，使其看起来与父选项相同。 |
| `cursor-none` | 不呈现鼠标指针。 |

## 滚动相关

| 类名 | 说明 |
| --- | --- |
| `scroll` | 应用CSS调整，使滚动在所有平台上都能发挥其最佳效果。|
| `no-scroll` | 隐藏DOM节点上的滚动条。 |
| `overflow-auto` | 设置溢出为自动 |
| `overflow-hidden` | 设置溢出为隐藏状态 |
| `overflow-hidden-y` | 设置溢出在Y轴上隐藏。 |
| `hide-scrollbar` | 移除滚动条 |

## 大小相关
| 类别名称 | 描述 |
| --- | --- |
| `fit` | 宽度和高度被设置为100% |
| `full-height` | 高度被设置为100%。 |
| `full-width` | 宽度被设置为100% |
| `window-height` | 高度设置为100vh，上下边距为0。 |
| `window-width` |宽度设置为100vw，左右边距为0。|
| `block` | 将`display`属性设置为`block`。 |

## 方向相关
| 类别名称 | 说明 |
| --- | --- |
| `rotate-45` | 旋转45度 |
| `rotate-90` | 旋转90度 |
| `rotate-135` | 旋转135度 |
| `rotate-180` | 旋转180度 |
| `rotate-225` | 旋转225度 |
| `rotate-270` | 旋转270度 |
| `rotate-315` | 旋转315度 |
| `flip-horizontal` | 水平翻转DOM元素 |
| `flip-vertical` | 垂直翻转DOM元素 |

## 边界相关
| 类别名称 | 说明 |
| --- | --- |
| `no-border` | 移除任何边框 |
| `no-border-radius` | 移除边框可能具有的任何半径。 |
| `no-box-shadow` | 删除任何应用的箱形阴影。 |
| `no-outline` | 删除任何应用在边框上的轮廓线。|
| `rounded-borders` | 应用一般的边框半径 |
| `border-radius-inherit` | 继承父元素的边框半径。|



