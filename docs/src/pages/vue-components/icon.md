---
title: 图标
desc: QIcon Vue组件允许你在其他组件或你页面的任何其他区域内插入图标。
keys: QIcon
related:
  - /options/installing-icon-libraries
  - /options/quasar-icon-sets
---

QIcon组件允许你轻松地在其他组件或页面的任何其他区域插入图标。
 Quasar 支持开箱即用。[Material Icons](https://material.io/icons/), [Font Awesome](http://fontawesome.io/icons/), [Ionicons](http://ionicons.com/), [MDI](https://materialdesignicons.com/), [Eva Icons](https://akveo.github.io/eva-icons), [Themify Icons](https://themify.me/themify-icons), [Line Awesome](https://icons8.com/line-awesome) 和 [Bootstrap Icons](https://icons.getbootstrap.com/) 。

此外，你可以为任何图标库[自行添加支持](/vue-components/icon#custom-mapping) 。

 Quasar 中有多种类型的图标：基于网页字体的、基于svg的和基于图像的。你不一定要在你的网站/应用程序中只使用一种类型。

::: tip
相关页面。[安装图标库](/options/installing-icon-libraries)和[Quasar图标集](/options/quasar-icon-sets)。
:::

## QIcon API

<doc-api file="QIcon" />

## 大小和颜色
QIcon的大小是由`font-size`CSS属性来操纵的。此外，QIcon还继承了当前使用的CSS文本`color`。为了便于使用，有了QIcon的`size`和`color`属性。

<doc-example title="基本" file="QIcon/Basic" />

对于不同 Quasar 组件上的`icon`属性，你不会有办法为每个平台指定一个图标，但你可以用以下方法达到同样的效果。

```html
<q-btn
  :icon="$q.platform.is.ios ? 'settings' : 'ion-ios-gear-outline'"
/>
```

<doc-example title="标准尺寸" file="QIcon/StandardSizes" />

## 网络字体图标

::: warning
如果你使用的是基于网络字体的图标，请确保你[安装了你所使用的图标库](/options/installing-icon-libraries)，否则它将不会显示出来!
:::

### 网络字体的使用

```html
<q-icon name="..." />
```

| Quasar IconSet name | Name prefix | Examples | Notes |
| --- | --- | --- | --- |
| material-icons | *None* | thumb_up | Notice the underline character instead of dash or space |
| material-icons-outlined | o_ | o_thumb_up | Notice the underline character instead of dash or space |
| material-icons-round | r_ | r_thumb_up | Notice the underline character instead of dash or space |
| material-icons-sharp | s_ | s_thumb_up | Notice the underline character instead of dash or space |
| ionicons-v4 | ion-, ion-md-, ion-ios-, ion-logo- | ion-heart, ion-logo-npm, ion-md-airplane | Use QIcon instead of `<ion-icon>` component; Logo icons require 'ion-logo-' prefix |
| ionicons-v5/v6 | ion- | ion-heart, ion-logo-npm, ion-airplane | Use QIcon instead of `<ion-icon>` component; Logo icons require 'ion-logo-' prefix |
| fontawesome-v5 | fa[s,r,l,d,b] fa- | "fas fa-ambulance" | QIcon "name" property is same as "class" attribute value in Fontawesome docs examples (where they show `<i>` tags) |
| mdi-v6/v5/v4/v3 | mdi- | mdi-alert-circle-outline | Notice the use of dash characters; Use only one of mdi-v6, mdi-v5, mdi-v4 or mdi-v3 |
| eva-icons | eva- | eva-shield-outline, eva-activity-outline | Notice the use of dash characters |
| themify | ti- | ti-hand-point-up | Notice the use of dash characters |
| line-awesome | la[s,r,l,d,b] la- | "las la-atom" | QIcon "name "属性与Line Awesome docs示例中的 "class "属性值相同(他们在这里显示了`<i>`标签)； **@quasar/extras v1.5+** |
| bootstrap-icons | bi- | bi-bug-fill | 注意使用破折号字符; **@quasar/extras v1.10+** |

### 命名规则

#### Material Icons (Google)

* 图标名称总是用蛇形大小写。
* 进入[Material Icons](https://material.io/icons/)，寻找你想要的图标。记住它的名字(例如："all_inbox")并使用它。

#### MDI (Material Design Icons)

* 图标的名字是用连字符分隔的，并且总是以 "mdi-"的前缀开始。
* 进入[MDI](https://materialdesignicons.com/)，寻找你想要的图标，点击它。会出现一个对话框。获取标题(例如："account-key")，用 "mdi-"开头，你就会得到结果(例如："mdi-account-key")。

#### Fontawesome

* 图标名称采用连字符大小写，并且总是以 "fas fa-"、"fab fa-"、"fal fa-"或 "far fa-"的前缀开始。
* 进入[FontAwesome](https://fontawesome.com/icons)，寻找你想要的图标，点击它。You'll get to its page. Below the icon name (as title), you will see something like `<i class="fas fa-air-freshener"></i>`. The result is `fas fa-air-freshener`.

#### Ionicons

* Icon names are in hyphen-separated case and always begin with "ion-", "ion-md-", "ion-ios-" or "ion-logo-" prefixes.
* Go to [Ionicons (v6)](https://ionicons.com/) or [Ionicons (v4)](https://ionicons.com/v4), look for your desired icon, click on it. At the bottom of the page there will appear a popup. Notice something like `<ion-icon name="square-outline"></ion-icon>`. Remember the name (eg. "square-outline"). Based on the variant that you want (auto-detect platform, material or iOS), you'd get the result: `ion-square-outline` or `ion-md-square-outline` or `ion-ios-square-outline`.
* **Note:** Starting with v5, Ionicons no longer supplies a webfont. Also,they no longer do Material or IOS variants.

#### Eva Icons

* Icon names are in hyphen-separated case and always begin with "eva-" prefix.
* Go to [Eva Icons](https://akveo.github.io/eva-icons), look for your desired icon, click on it. A dialog box will appear. Get the name from there (eg. "attach-outline"), prefix it with "eva" and the result is "eva-attach-outline".

#### Themify

* Icon names are in hyphen-separated case and always begin with "ti-" prefix.
* Go to [Themify](https://themify.me/themify-icons), look for your desired icon. Remember its name (eg. "ti-arrow-top-right") and use it.

#### Line Awesome

* Icon names are in hyphen-separated case and always begin with "la" prefix.
* Go to [Line Awesome](https://icons8.com/line-awesome), look for your desired icon, click on it. A dialog box will appear. You'll see something like `<i class="lab la-behance-square"></i>`. Remember its name (eg. "lab la-behance-square") and use it.

#### Bootstrap Icons

* Icon names are in hyphen-separated case and always begin with "bi-" prefix.
* Go to [Bootstrap Icons](https://icons.getbootstrap.com/), look for your desired icon. Remember its name (eg. "bi-bug-fill") and use it.

## Svg icons

There are many advantages of using only svg icons in your website/app:
* 更好的应用程序足迹 -- 只有使用过的图标才会被包含在最终的构建中(树形摇动的作用)。
* 质量更好的图标
* 不需要包括来自`@quasar/extras`或CDN的同等网络字体。

目前的缺点是，使用这些图标比使用对应的网络字体更繁琐。

### Svg的使用

注意在下面的示例中，我们想避免Vue的可观察包装，所以我们通过created()钩子在实例上注入图标。如果在data()中声明，它也可以工作，但...

```html
<template>
  <div>
    <q-icon :name="matMenu" />
    <q-icon :name="fasFont" />
    <q-btn :icon="mdiAbTesting" />
  </div>
</template>

<script>
import { matMenu } from '@quasar/extras/material-icons'
import { mdiAbTesting } from '@quasar/extras/mdi-v6'
import { fasFont } from '@quasar/extras/fontawesome-v5'

export default {
  // ...
  created () {
    this.matMenu = matMenu
    this.mdiAbTesting = mdiAbTesting
    this.fasFont = fasFont
  }
}
```

::: tip
如果你只使用svg图标(并且已经配置了[Quasar图标集](/options/quasar-icon-sets))，那么你根本不需要在你的应用程序中使用相当于webfont的字体。
:::

| 供应商 | Quasar IconSet名称 | 导入图标来自 | 要求 |
| 材料图标 (Google) | svg-material-icons | @quasar/extras/material-icons | | |
材料图标的轮廓 (Google) | svg-material-icons-outlined | @quasar/extras/material-icons-outlined | @quasar/extras v1.9+; | |
| 材料图标锐利 (Google) | svg-material-icons-sharp | @quasar/extras/material-icons-sharp | @quasar/extras v1.9+ |
| Material Icons Round (Google) | svg-material-icons-round | @quasar/extras/material-icons-round | @quasar/extras v1.9+ !
| MDI (Material Design Icons) (v3-v5) | svg-mdi-v5 | @quasar/extras/mdi-v5 | | |
| MDI (Material Design Icons) v6 | svg-mdi-v6 | @quasar/extras/mdi-v6 | @quasar/extras v1.11+ !
| Font Awesome | svg-fontawesome-v5 | @quasar/extras/fontawesome-v5 | | |
| Ionicons v6 | svg-ionicons-v6 | @quasar/extras/ionicons-v6 | @quasar/extras v1.12+ !
| Ionicons v5 | svg-ionicons-v5 | @quasar/extras/ionicons-v5 | @quasar/extras v1.7+ !
| Ionicons v4 | svg-ionicons-v4 | @quasar/extras/ionicons-v4 | |
| Eva图标 | svg-eva-icons | @quasar/extras/eva-icons | |
| Themify图标 | svg-themify | @quasar/extras/themify | |
| Line Awesome | svg-line-awesome | @quasar/extras/line-awesome | @quasar/extras v1.5+ !
| Bootstrap Icons | svg-bootstrap-icons | @quasar/extras/bootstrap-icons | @quasar/extras v1.10+ !

### 导入指南

Svg图标由`@quasar/extras`提供(尽管你也可以提供[你自己的svg图标](/vue-components/icon#svg-icon-format)！)。下面是导入语法的来龙去脉。

#### SVG Material Icons (Google)

* 图标名称采用骆驼字母大小写，并且总是以 "mat "为前缀开头。

* 进入[Material Icons](https://material.io/icons/)，寻找你想要的图标并记住它的名字(例如："all_inbox")，用 "mat "作为前缀，并将结果用骆驼大写字母表示(例如："matAllInbox")。
* 导入语句示例：`import { matAllInbox } from '@quasar/extras/material-icons'`。
#### SVG材料图标概述( Google )

* 图标名称采用骆驼字母大小写，并且总是以 "outlined "前缀开始。

* 进入[Material Icons](https://material.io/icons/)，寻找你想要的图标并记住它的名字(例如："all_inbox")，用 "outlined "作前缀，并将结果用骆驼大写字母表示(例如："outlinedAllInbox")。
* 导入语句示例：`import { outlinedAllInbox } from '@quasar/extras/material-icons-outlined'`。
#### SVG Material Icons Sharp (Google)

* 图标名称采用骆驼字母大小写，并且总是以 "sharp "前缀开始。

* 进入[Material Icons](https://material.io/icons/)，寻找你想要的图标并记住它的名字(例如："all_inbox")，用 "sharp "作为前缀，并对结果进行骆驼大写(例如："sharpAllInbox")。
* 导入语句的示例：`import { sharpAllInbox } from '@quasar/extras/material-icons-sharp'`。
#### SVG Material Icons Round (Google)

* 图标名称采用骆驼字母大小写，并且总是以 "圆形 "前缀开始。

* 进入[Material Icons](https://material.io/icons/)，寻找你想要的图标并记住它的名字(例如："all_inbox")，用 "round "作为前缀，并对结果进行骆驼大写(例如："roundAllInbox")。
* 导入语句示例：`import { roundAllInbox } from '@quasar/extras/material-icons-round'`。
#### SVG MDI (Material Design Icons)

* 图标名称采用骆驼字母大小写，并且总是以 "mdi "前缀开始。

* 进入[MDI](https://materialdesignicons.com/)，寻找你想要的图标，点击它。会出现一个对话框。获取标题(例如："account-key")，以 "mdi "开头，并将结果以骆驼字母大写(例如："mdiAccountKey")。
* Import statement example: `import { mdiAccountKey } from '@quasar/extras/mdi-v6'`.
#### SVG Fontawesome

* Icon names are in camel-case and always begin with "fas", "fab", "fal" or "far" prefixes.

* Go to [FontAwesome](https://fontawesome.com/icons), look for your desired icon, click on it. You'll get to its page. Below the icon name (as title), you will see something like `<i class="fas fa-air-freshener"></i>`. This would translate to `fasAirFreshner`. The prefix from the tag is important.
* Note that we cannot supply the "Pro" version of the icons in svg format because of the license.
* Import statement example: `import { fasAirFreshener } from '@quasar/extras/fontawesome-v5'`.
#### SVG Ionicons

* Ionicons v4: Icon names are in camel-case and always begin with "ionMd" or "ionIos" prefixes.

* Ionicons v5/v6: Icon names are in camel-case and always begin with "ion" prefix.
* Ionicons v4: Go to [Ionicons v4](https://ionicons.com/v4/), look for your desired icon, click on it. At the bottom of the page there will appear a popup. Notice something like `<ion-icon name="square-outline"></ion-icon>`. 记住这个名字(例如："square-outline")。驼峰大写这个名字，并在它前面加上 "ionMd"(用于材料变体)或 "ionIos"(用于iOS变体)。

* Ionicons v5/v6：进入[Ionicons v6](https://ionicons.com/)，寻找你想要的图标，点击它。在页面的底部，会出现一个弹出窗口。注意类似"<ion-icon name="square-outline"></ion-icon>"的东西。记住这个名字(例如："square-outline")。用 "ion "作为前缀，并将结果用骆驼字母大写(例如："ionSquareOutline")。
* Ionicons v4: 导入语句的示例: `import { ionMdSquareOutline } from '@quasar/extras/ionicons-v4'`.
* Ionicons v5/v6: 导入语句示例: `import { ionSquareOutline } from '@quasar/extras/ionicons-v5'`.

#### SVG Eva 图标

* 图标名称采用骆驼字母大小写，并且总是以 "eva "为前缀开头。
* 进入[Eva Icons](https://akveo.github.io/eva-icons)，寻找你想要的图标，点击它。会出现一个对话框。从那里获得名称(例如："attach-outline")，用 "eva "作前缀，然后用骆驼大写字母表示结果(例如："evaAttachOutline")。
* 导入语句的示例：`import { evaAttachOutline } from '@quasar/extras/eva-icons'`。

#### SVG Themify

* 图标名称采用骆驼字母大小写，并且总是以 "ti "为前缀开头。
* 进入[Themify](https://themify.me/themify-icons)，寻找你想要的图标。记住它的名字(例如："ti-arrow-top-right")，用 "ti "作前缀，并将结果用驼峰大写字母表示(例如："tiArrowTopRight")。
* Import statement example: `import { tiArrowTopRight } from '@quasar/extras/themify'`.

#### SVG Line Awesome

* Icon names are in camel-case and always begin with "la" prefix.
* Go to [Line Awesome](https://icons8.com/line-awesome), look for your desired icon, click on it. A dialog box will appear. You'll see something like `<i class="lab la-behance-square"></i>`. This would translate to: `laBehanceSquare`. There is a special case though (only for solid icons!): if the prefix before "la-" is "las" (eg. `<i class="las la-atom"></i>`), then you need to suffix "la-atom" with "-solid" and camel-case the result (eg. `laAtomSolid`).
* Import statement example: `import { laBehanceSquare } from '@quasar/extras/line-awesome'`.

#### SVG Bootstrap Icons

* Icon names are in camel-case and always begin with "bi" prefix.
* Go to [Bootstrap Icons](https://icons.getbootstrap.com/), look for your desired icon. Remember its name (eg. "bi-bug-fill"), camel-case the result (eg. "biBugFill").
* Import statement example: `import { biBugFill } from '@quasar/extras/bootstrap-icons'`.

### Svg图标格式

你也可以提供你自己的svg图标。一个svg图标本质上是一个字符串，语法如下。

```
Syntax: "<path>&&<path>&&...|<viewBox>"
           P       P             V
                (optional)   (optional)
                             (default: 0 0 24 24)

P is a path tag with following syntax (each are attributes):
        "<d>@@<style>@@<transform>"
        (required)
            (optional)
                     (optional)
```

示例。

```
// 最简单的("<路径>")。
  M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z

// 相当于。
<svg viewBox="0 0 24 24">
  <path d="M9 3L5 6.99h3V....."/>
</svg>
```

```
// 最简单的是使用自定义viewBox("<path>|<viewBox>")。
  M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z|0 0 104 104

// 相当于。
<svg viewBox="0 0 104 104">
  <path d="M9 3L5 6.99h3V....."/>
</svg>
```

```
// 具有自定义样式的路径("<path>@@<style>|<viewBox>")。
  M48,96L464,96 464,416 48,416z@@fill:none;stroke:currentColor.....|0 0 512 512

// 相当于。
<svg viewBox="0 0 512 512">
  <path d="M416,480,256,357....." style="fill:none;stroke:curren..." />
</svg>
```

```
// 具有自定义样式和变换的路径("<path>@@<style>@@transform")。
  M9 3L5 6.99h3V...@@fill:none;stroke:cu.....@@translate(10 1) rotate(180)

// 相当于。
<svg viewBox="0 0 24 24">
  <path
    d="M9 3L5 6.99h3V....."
    style="fill:none;stroke:curren..."
    transform="translate(10 1) rotate(180)"
  />
</svg>
```

```
// 具有自定义变换的路径("<path>@@@@transform")。
// (注意仍然指定了样式分离器)

  M9 3L5 6.99h3V...@@@@translate(2 4) rotate(180)

// 相当于。
<svg viewBox="0 0 24 24">
  <path
    d="M9 3L5 6.99h3V....."
    transform="translate(2 4) rotate(180)"
  />
</svg>
```

```
// 多路径 -- 任何数量的路径都是可能的("<路径>&&<路径>|<viewBox>")。
  M416,480,256,357.41,96,480V32H416Z&&M368,64L144 256 368 448 368 64z|0 0 512 512

// 相当于。
<svg viewBox="0 0 512 512">
  <path d="M416,480,256,357....." />
  <path d="M368,64L144 256 368...." />
</svg>
```

```
// 多路径，每个路径都有样式和转换("<路径>&&<路径>|<viewBox>")。
  M9 3L5 6.99h3V...@@stroke-width:5px@@rotate(45)&&M416,480,256,...@@stroke-width:2px@@rotate(15)&&M368,64L144 2...@@stroke-width:12px@@rotate(5)|0 0 512 512

// 相当于。
<svg viewBox="0 0 512 512">
  <path
    d="M9 3L5 6.99h3V....."
    style="stroke-width:5px"
    transform="rotate(45)"
  />
  <path
    d="M416,480,256,..."
    style="stroke-width:2px"
    transform="rotate(15)"
  />
  <path
    d="M368,64L144 2..."
    style="stroke-width:12px"
    transform="rotate(5)"
  />
</svg>
```

## SVG-使用方式

这个svg方法允许你把SVG文件作为静态资产来存储，并引用它们。

```html
// 文件：/public/icons.svg

<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon-1" viewBox="0 0 24 24">
    <path d="..."></path>
  </symbol>
  <symbol id="icon-2" viewBox="0 0 24 24">
     <path d="..."></path>
  </symbol>
</svg>
```

标准的HTML方式是包含文件，并使用`svg use`标签指定图标。

```html
<svg>
  <use xlink:href="icons.svg#icon-1"></use>
</svg>
```

要通过QIcon与 Quasar 一起使用这个文件(确保你从你的公共或静态文件夹中引用了正确的文件)。

```html
<q-icon name="svguse:icons.svg#icon-1">
<!-- or -->
<q-btn-dropdown label="Custom Content" dropdown-icon="svguse:icons.svg#icon-2" />
```

默认情况下，父svg的viewBox是 "0 0 24 24"。然而，你也可以指定一个自定义的。

```html
<q-icon name="svguse:icons.svg#icon-1|10 15 40 40" />
```

## 内嵌的svg

如果你不想使用上面的webfont或svg变体，请注意QIcon也支持一个内嵌的`<svg>`标签(svg的内容可以是任何东西，不仅仅是一个路径)。

为什么要在QIcon中使用`<svg>`的理由是，svg将通过其属性尊重任何QIcon的大小和颜色。如果没有这些功能，你最好在你的模板中内联svg，而不要用QIcon来包装。

```html
<q-icon color="accent" size="5rem">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
  </svg>
</q-icon>
```

一些限制。
* 不要在`<svg>`标签上使用 "高度"/"宽度 "属性(它将破坏QIcon处理尺寸的方式)。
* 所有的`<path>`s将默认应用 "fill: currentColor "CSS；如果你不希望这样，就在`<path>`标签上添加`fill="none"`。

## 图像图标
你也可以通过使用`img:`前缀，让图标指向一个图片URL，而不是依赖任何网络字体。

**所有与 Quasar 组件的图标相关的属性都可以使用这个功能**。

```html
<q-icon name="img:https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
<q-btn icon="img:https://cdn.quasar.dev/logo-v2/svg/logo.svg" ... />

<!-- reference from /public: -->
<q-icon name="img:my/path/to/some.svg" />
```

::: tip
记住，你也可以把图片放在你的`/public`文件夹中，并指向它们。你并不总是需要一个完整的URL。
:::

这并不只限于SVG。你可以使用任何你想要的图像类型(png，jpg，...)。

```html
<q-icon name="img:bla/bla/my.png" />
<q-btn icon="img:bla/bla/my.jpg" ... />
<q-input clearable clear-icon="img:bla/bla/my.gif" ... />
```

也可以内联图片(svg、png、jpeg、gif......)并动态改变其风格(svg)。

```html
<q-icon name="img:data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' height='140' width='500'><ellipse cx='200' cy='80' rx='100' ry='50' style='fill:yellow;stroke:purple;stroke-width:2' /></svg>" />
```

<doc-example title="动态SVG" file="QIcon/DynamicSvg" />

你也可以对一个图像进行base64编码并提供给它。下面的示例是关于QBtn的，但在处理任何图标属性或QIcon时也涉及同样的原则。

```html
<q-btn icon="
img:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" ... />
```

## 自定义映射

如果你愿意，你可以自定义图标名称的映射。这可以通过覆盖`$q.iconMapFn`来实现。建议在你的`/src/App.vue'组件的`created()'钩子中完成。

`$q.iconMapFn`的语法如下。

```js
/* Syntax */
iconMapFn (String: iconName) => Object / void 0 (undefined)

/*
 The returned Object (if any) must be one of the following forms:

 1. Defines how to interpret icon
 {
   cls: String // class name(s)
   content: String // optional, in case you are using a ligature font
                   // 并且你需要它作为QIcon的内容。
  }

  2. Acts essentially as a map to another icon
  {
    icon: String // the mapped icon String, which will be handled
                 // 被 Quasar 使用，就像原来的QIcon名称是这个值一样。
  }
*/
```

现在让我们来看看这两种情况。

#### 1. 对自定义图标库的支持

当你使用一个自定义的图标库(不是 Quasar 和它的`@quasar/extras`包自带的)时，这一点特别有用。

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  // 添加支持的示例
  // <q-icon name="app:...." />
  // 这包括对所有 "图标 "属性的支持
  // Quasar 组件的

  $q.iconMapFn = (iconName) => {
    // iconName是QIcon "name "属性的内容。

    // 你的自定义方法，以下是
    // 只是一个示例。
    if (iconName.startsWith('app:') === true) {
      // 我们把 "app: "的部分去掉
      const name = iconName.substring(4)

      return {
        cls: 'my-app-icon ' + name
      }
    }

    // 当我们没有从我们的
    // iconMapFn，默认的 Quasar 图标映射。
    // 接管
  }
}
```

注意在上面的示例中，我们返回了一个`my-app-icon`类，如果我们的图标以`app:`前缀开头，就会应用到QIcon。我们可以用它来定义QIcon应该如何对它作出反应，从CSS的角度来看。

让我们假设我们有自己的网络字体，叫做 "My App Icon"。

```css
/*
  For this example, we are creating:
  /src/css/my-app-icon.css
*/

.my-app-icon {
  font-family: 'My App Icon';
  font-weight: 400;
}

@font-face {
  font-family: 'My App Icon';
  font-style: normal; /* whatever is required for your */
  font-weight: 400;   /* webfont.... */
  src: url("./my-app-icon.woff2") format("woff2"), url("./my-app-icon.woff") format("woff");
}
```

然后我们应该编辑我们的`quasar.conf.js`(如果使用Quasar CLI)，将新创建的CSS文件添加到我们的应用程序。

```js
css: [
  // ....
  'my-app-icon.css'
]
```

还要把 "my-app-icon.woff2 "和 "my-app-icon.woff "文件添加到与 "my-app-icon.css "相同的文件夹中(或其他地方，但要编辑woff/woff2文件的相对路径(见上面的 "src："))。

#### 2. 简单地映射几个图标

```js
import { useQuasar } from 'quasar'

const myIcons = {
  'app:icon1': 'img:/path/to/icon1.svg',
  'app:icon2': 'img:/path/to/icon2.svg',
  'app:copy': 'fas fa-copy',
}

// ...
setup () {
  const $q = useQuasar()

  $q.iconMapFn = (iconName) => {
    const icon = myIcons[iconName]
    if (icon !== void 0) {
      return { icon: icon }
    }
  }
}
```

现在我们可以使用`<q-icon name="app:copy" />`或`<q-icon name="app:icon1" />`，QIcon会把 "app:copy "和 "app:icon1 "当作是 "fas fa-copy "和 "img:/path/to/icon1.svg"。
