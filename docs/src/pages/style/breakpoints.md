---
title: 断点
desc: Quasar的CSS中断点列表。
related:
  - /style/spacing
---

 Quasar 使用了以下CSS断点。

| 窗口大小 | 名称 | 断点空间(像素) |
| --- | --- | --- |
| 超小 | `xs` | 最大 599px |
| 小号 | `sm` | 600px 至 1023px |
| 中型 | `md` | 1024px 至 1439px |
| 大号 | `lg` | 1440px 至 1919px |
| 特大号 | `xl` | 大于1920px |

要了解如何使用它们，请访问[Visibility](/style/visibility)页面。

你可能还想看看 "响应式设计 "部分的[Flexbox简介](/layout/grid/introduction-to-flexbox#responsive-design)。

### Sass

你也可以使用Sass中的断点。

```sass
@media (max-width: $breakpoint-xs-max)
  font-size: 10px
```

这些变量的语法如下，其中`<breakpoint>`要用 "xs"、"sm"、"md"、"lg "或 "xl "代替。

```
$breakpoint-<breakpoint>-min
$breakpoint-<breakpoint>-max
```

还有：

```
$sizes.<breakpoint>
// 用xs、sm、md、lg或xl替换<breakpoint>。
```

[如果启用(仅)](/options/screen-plugin#how-to-enable-body-classes)，你也可以根据应用于document.body的一组特定的CSS类来设计你的内容：`screen-xs`, `screen-sm`, ..., `screen-xl`。

```sass
.my-div
  body.screen--xs &
    color: #000
  body.screen--sm &
    color: #fff
```
