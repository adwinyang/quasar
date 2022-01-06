---
title: 色调
desc: 如何使用和定制Quasar调色板。
components:
  - color-palette/BrandColors
  - color-palette/ColorList
related:
  - quasar-utils/color-utils
---
Quasar框架开箱即提供了大量的颜色选择。你可以在你的CSS代码中作为Sass/SCSS变量使用它们，也可以在你的HTML模板中直接作为CSS类使用。

## 品牌颜色
Quasar组件使用的大多数颜色都与这三种颜色密切相关，你可以改变它们。选择这些颜色是区分应用程序设计时应该采取的第一步。在改变它们的默认值后，你会立即注意到Quasar组件遵循这些颜色作为指导原则。

<brand-colors />

::: tip TIPS
还可以查看[Theme Builder](/style/theme-builder)，了解关于定制网站/应用程序的品牌颜色的工具。
:::

## 颜色列表

这里是开箱即用的颜色列表。在你的应用程序的`*.vue`文件中，你可以将它们作为CSS类(在HTML模板中)或作为[Sass/SCSS变量](/style/sass-scss-variables)在`<style lang="...">`标签中使用。

<color-list />

## 作为CSS类使用
使用`text-`或`bg-`前缀作为类名来改变文本的颜色或背景的颜色。

```html
<!-- changing text color -->
<p class="text-primary">....</p>

<!-- changing background color -->
<p class="bg-positive">...</p>
```

## 使用Sass/SCSS变量

在你的应用程序的`*.vue`文件中，你可以使用颜色作为`$primary`，`$red-1`，等等。

```html
<!-- Notice lang="sass" -->
<style lang="sass">
div
  color: $red-1
  background-color: $grey-5
</style>
```

```html
<!-- Notice lang="scss" -->
<style lang="scss">
div {
  color: $red-1;
  background-color: $grey-5;
}
</style>
```

## 添加你自己的颜色
如果你想为你的组件使用你自己的颜色(比方说，我们要添加一种名为 "品牌 "的颜色)，你所需要做的就是在你的应用程序中添加以下CSS。

```css
.text-brand {
  color: #a2aa33 !important;
}
.bg-brand {
  background: #a2aa33 !important;
}
```

现在我们可以将这种颜色用于Quasar 组件。
```html
<q-btn color="brand" ... />
```

你可以通过[getPaletteColor](/quasar-utils/color-utils#helper-getpalettecolor)工具在JS上下文中访问自定义颜色值(十六进制字符串)。

## 品牌颜色的动态变化(动态主题颜色)

### 它是如何工作的

你可以在运行时动态地定制品牌颜色："主要"、"次要"、"中心"、"黑暗"、"正面"、"负面"、"信息"、"警告"。这意味着你可以用一个默认的颜色主题来构建你的应用程序，但用运行时选择的颜色主题来显示它。

主要的颜色配置是通过CSS自定义属性完成的，存储在根元素(`:root`)上。每个属性都有一个`--q-${name}`的名字(例如：`--q-primary`, `--q-secondary`)，并且应该有一个有效的CSS颜色作为值。

CSS自定义属性使用与普通CSS相同的继承规则，所以你只能重新定义你想要的颜色，其余的将从父元素中继承下来。

推荐的工作流程是在`html`(`document.documentElement`)或`body`(`document.body`)元素上设置你的自定义颜色属性。这将允许你通过删除你的自定义颜色而恢复到默认颜色。

更多关于CSS自定义属性(变量)的信息，请访问[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)。

### Util: setCssVar

Quasar提供了一个用于设置Quasar CSS变量的辅助函数，也可用于品牌颜色：`setCssVar(colorName, colorValue[, element])`。

| 参数 | 类型 | 要求 | 描述 |
| `colorName` | String | *Yes* | `primary`, `secondary`, `accent`, `dark`, `positive`, `negative`, `info`, `warning`之一
| `colorValue` | String | *Yes* | 有效的CSS颜色值 |
| `element` | 元素 | - | (默认: `document.body`) 将设置自定义属性的元素。|
使用帮助器设置品牌颜色的示例。



```js
import { setCssVar } from 'quasar'

setCssVar('light', '#DDD')
setCssVar('primary', '#33F')
setCssVar('primary', '#F33', document.getElementById('rebranded-section-id'))
```

使用帮助器设置品牌颜色的示例。

```js
// 相当于原始Javascript中的setCssVar('primary')。
document.body.style.setProperty('--q-primary', '#0273d4')
```

### Util: getCssVar

Quasar提供了一个获取Quasar CSS变量值的辅助函数，它也可以用于品牌颜色：`getCssVar(colorName[, element])`。

| 参数 | 类型 | 要求 | 描述 |
| `colorName` | String | *Yes* | `primary`, `secondary`, `accent`, `dark`, `positive`, `negative`, `info`, `warning`之一
| `element` | Element | - | (默认: `document.body`) 读取自定义属性的元素。|
使用帮助器获取品牌颜色的示例。



```js
import { getCssVar } from 'quasar'

getCssVar('primary') // '#33F'
getCssVar('primary', document.getElementById('rebranded-section-id'))
```

这个助手所做的是包装原始的Javascript `getPropertyValue()`，它的作用是方便使用。下面是一个等价的vanilla Javascript的示例。

```js
// 相当于原始Javascript中的getCssVar('primary')。
getComputedStyle(document.documentElement)
  .getPropertyValue('--q-primary') // #0273d4
```

### 更多的颜色实用程序

除了上面的实用程序，我们在文档中还有一个专门的章节用于处理颜色，你可能会感兴趣。[颜色工具](/quasar-utils/color-utils)。

```js
import { colors, setCssVar } from 'quasar'

const { lighten } = colors

const newPrimaryColor = '#933'
setCssVar('primary', newPrimaryColor)
setCssVar('primary-darkened', lighten(newPrimaryColor, -10))
```

## 设置默认值

这就是你如何在不篡改Sass变量的情况下设置一些品牌颜色。

```js
// Quasar CLI - quasar.conf.js
return {
  framework: {
    config: {
      brand: {
        primary: '#ff0000',
        // ...
      }
    }
  }
}
```

或者用[引导文件](/quasar-cli/boot-files)。

```js
// 对于Quasar CLI
// 不要在SSR模式下运行这个引导文件

import { setCssVar } from 'quasar'

export default () => {
  setCssVar('primary', '#ff0000')
}
```

如果您使用的是Quasar UMD版本或Quasar Vite插件或Vue CLI。

```js
// UMD或Quasar Vite插件或Vue CLI
app.use(Quasar, {
  brand: {
    primary: '#ff0000',
    // ...
  }
})
```
