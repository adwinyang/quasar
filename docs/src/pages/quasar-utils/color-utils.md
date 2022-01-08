---
title: 颜色利用
desc: 一组 Quasar 方法，用于改变应用程序的品牌颜色和操作颜色字符串。
keys: rgbToHex,rgbToHsv,hexToRgb,textToRgb,hsvToRgb,lighten,luminosity,brightness,blend,changeAlpha,getPaletteColor
related:
  - style/color-palette
---

 Quasar 提供了一套有用的函数，可以在大多数使用情况下轻松地操作颜色，而不需要集成专用库的高额额外费用。

::: tip
关于UMD构建的用法，见[here](/start/umd#quasar-global-object)。
:::

## 颜色转换
这些函数将一个颜色作为字符串或对象，并将其转换为另一种格式。

| 功能 | 源格式 | 目标格式 | 描述 |
| `rgbToHex` | Object | String | 将一个RGB/A颜色对象(`{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>})转换为其HEX/A表示为字符串(`#RRGGBB<AA>`)。如果Alpha通道存在于原始对象中，它也将存在于输出中。|
| 将一个RGB/A颜色的对象(`{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>})转换为HSV/A的对象(`{ h: [0-360], s: [0-100], v: [0-100}, a: [0-100]} )。如果Alpha通道存在于原始对象中，它也将存在于输出中。|
| 将一个HEX/A颜色的字符串("#RRGGBB<AA>")转换为RGB/A的对象("{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>})。如果Alpha通道存在于原始对象中，它也将存在于输出中。|
| 将HEX/A颜色字符串(`#RRGGBB<AA>`)或RGB/A颜色字符串(`rgb(R, G, B<, A>)`)转换为RGB/A表示的对象(`{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>})。如果Alpha通道存在于原始对象中，它也将存在于输出中。|
| 将一个HSV/A颜色对象(`{ h: [0-360], s: [0-100], v: [0-100}, a: [0-100]}`)转换为RGB/A的对象(`{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>})。如果Alpha通道存在于原始对象中，它也将存在于输出中。|
## 颜色处理

这些函数对颜色进行改变或提取特定信息。
### lighten (color, percent)

使 "颜色 "变亮(如果 "百分比 "为正)或变暗(如果 "百分比 "为负)。
接受一个HEX/A字符串或RGB/A字符串作为`color'，以及要应用于`color'的变亮/变暗的`percent'(0到100或-100到0)。

返回计算出的 "颜色 "的HEX字符串表示。
### luminosity (color)

计算 "颜色 "的[相对亮度](http://www.w3.org/TR/WCAG20/#relativeluminancedef)。
接受一个HEX/A字符串、一个RGB/A字符串或一个RGB/A对象作为`color'。

返回一个在0和1之间的值。
### 亮度 (color)

计算`color'的[color contrast](https://www.w3.org/TR/AERT/#color-contrast)。
接受一个HEX/A字符串、一个RGB/A字符串或一个RGB/A对象作为`color'。

返回一个0到255之间的值。< 128的值将被认为是一种深色。
### blend (fgColor, bgColor)

计算两种颜色的[混合](https://www.w3.org/TR/compositing-1/#simplealphacompositing)。

接受一个HEX/A字符串或一个RGB/A对象作为`fgColor`/`bgColor`。

如果 "fgColor "的alpha通道是完全不透明的，那么结果将是 "fgColor"。
如果`bgColor`的alpha通道是完全不透明的，那么产生的混合颜色也将是不透明的。
返回与fgColor的输入相同的类型。
### changeAlpha (color, offset)

增加或减少字符串颜色的alpha。

接受一个HEX/A字符串作为 "color"，一个在-1到1之间的数字(包括边缘)作为 "offset"。

使用负数来减少，使用正数来增加(例如：`changeAlpha('#ff0000', -0.1)`使alpha减少10%)。
返回HEX/A字符串。
## 帮助工具 - getPaletteColor

你可以在JS上下文中查询任何品牌颜色、调色板颜色或自定义颜色，以获得其十六进制字符串值。需要注意的是，下面这个方法的运行成本并不低，所以要谨慎使用。



```js
import { colors } from 'quasar'

const { getPaletteColor } = colors

console.log(getPaletteColor('primary')) // '#1976d2'
console.log(getPaletteColor('red-2')) // '#ffcdd2'
```

假设你已经创建了[自定义颜色](/style/color-palette#adding-your-own-colors)并将其命名为 "my-color"，那么你可以在JS中提取其值。

```js
console.log(getPaletteColor('my-color')) // '#...'
```
