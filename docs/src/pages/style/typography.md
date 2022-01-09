---
title: 排版
desc: Quasar应用程序的排版和其辅助CSS类。
components:
  - typography/TypographyHeadings
  - typography/TypographyWeights
related:
  - /style/visibility
  - /style/positioning
  - /style/spacing
---
我们将在下面的章节中处理 Quasar 提供的排版。

## 标题
<typography-headings />

## 字体权重
<typography-weights />

## CSS帮助类
| 类名 | 说明 |
| --- | --- |
| `text-right` | 将文本向右对齐 |
| `text-left` | 将文本向左对齐 |
| `text-center` | 将文本居中对齐 |
|`text-justify` | 将文本居中对齐 |
| `text-bold` | 文本将以粗体形式出现 |
| `text-italic` | 文本将是斜体的 |
| `text-no-wrap` | 不可包裹的文本(应用`white-space: nowrap`) |
| `text-strike` | 应用`text-decoration: line-through` |
| `text-uppercase` | 将文本转换为大写字母 |
| `text-lowercase` | 将文本转化为小写字母 |
| `text-capitalize` | 将文本的第一个字母大写 |

## 默认字体
嵌入的默认网络字体是[Roboto](https://fonts.google.com/specimen/Roboto) 。**但这不是必须的**。你可以使用你喜欢的任何字体。

Roboto有5种不同的字体重量，你可以使用。100, 300, 400, 500, 700.

这是Roboto字体默认嵌入的地方，如果你想删除它。

```js
// 文件：/quasar.conf.js
extras: [
  'roboto-font'
]
```

## 添加自定义字体
也可以包括其他字体，在应用程序中使用它们。以下是一种方法。

1. 将你的新网络字体`[customfont].woff`(或它的任何扩展名；推荐使用`woff`以兼容所有浏览器)复制到你选择的目录，例如：`./src/css/fonts/[customfont.woff]`。
2. 在`./src/css/app.{css|sass|scss|styl}`中声明你的字体(或在任何你认为合适的地方，但要正确更新网络字体文件的相对路径)：

```css
@font-face {
  font-family: customfont;
  src: url(./fonts/customfont.woff);
}

// 声明一个应用它的类
.my-font {
  font-family: 'customfont';
}
```

3. 然后在你需要的地方使用该类。
