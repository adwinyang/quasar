---
title: RTL支持
desc: 在 Quasar 应用程序中支持从右到左。
related:
  - /options/quasar-language-packs
  - /options/app-internationalization
---

RTL是指 "从右到左"的用户界面，用于需要它的语言。

## 启用RTL支持

### Quasar CLI
要启用它，你需要编辑`/quasar.conf.js`。

```js
build: {
  rtl: true
}
```

### Quasar Vite 插件 / Vue CLI 插件

你首先需要安装`postcss-rtlcss`包：

```bash
$ yarn add -D postcss-rtlcss
# or
$ npm install -D postcss-rtlcss
# or
$ pnpm add quasar -D postcss-rtlcss
```

然后创建`/postcss.config.js`文件，如果你还没有的话，把这个添加到里面：

```js
module.exports = {
  plugins: [
    require('postcss-rtlcss', {}) // <<<< in "plugins"
  ]
}
```

## 它是如何工作的
RTL与[Quasar语言包](/options/quasar-language-packs) 紧密相连。**当 Quasar 被设置为使用RTL语言**(语言包的 "rtl "属性设置为 "true")，并且**RTL支持被启用**(查看上面的 "启用RTL支持 "部分)，那么用户界面将动态地转换 Quasar 和你的网站/应用程序代码为RTL。

让我们来讨论一下这些要求中的每一项:

1. *Quasar需要被设置为使用一种RTL语言*。
请参阅[Quasar语言包](/options/quasar-language-packs) 了解如何设置语言。你可以将语言设置为默认语言或动态设置。

2.  *RTL支持需要被启用*。
请仔细检查上面的 "启用RTL支持 "部分。它的作用是为您的网站/应用程序代码和 Quasar 组件编译CSS，并自动添加相应的RTL CSS规则。由于增加了这些CSS规则，你的CSS包的大小将略有增加。

3. 可选的。*将devland源代码的CSS视为RTL*。
默认情况下，Quasar假定所有的样式都是以LTR方向编写的，并为它们生成相应的RTL样式。如果你想直接用RTL写你自己的css，那么你需要。
* (Quasar CLI) 设置 quasar.conf.js > "build" > rtl > "source" 为 `rtl`。
* (Quasar Vite 插件 / Vue CLI 插件) 在/postcss.config.js中设置`require('postcss-rtlcss', { source: 'rtl' })`。

## 配置

 Quasar CLI 使用了[postcss-rtlcss](https://github.com/elchininet/postcss-rtlcss)，所以如果你想通过quasar.conf.js > build > rtl来调整RTL设置，那么它必须符合[postcss-rtlcss options](https://github.com/elchininet/postcss-rtlcss#options) 。

## 需要记住的事情

* RTL和非RTL Quasar语言包将一起工作，并动态地切换到/从RTL。因此，只有选择一个RTL Quasar语言包才会为你触发RTL用户界面。你不需要单独构建你的应用程序(一个用于非RTL，一个用于仅有RTL)。RTL会自动为你动态地改变。
* 你可以通过查看布尔值`$q.lang.rtl`来动态地检测你是否处于RTL模式。关于[$q对象](/options/the-q-object) 的更多信息。
* 在编写你自己的CSS时，你需要小心。像上面提到的，如果启用了RTL支持，那么RTL(如果postcss-rtl配置的 "source "设置为 "ltr"，则为LTR)规则将根据你的CSS代码自动添加。所以写：

  ```css
  .my-class {
    margin-left: 10px;
    right：5px;
  }
  ```

  ...将为RTL添加这个规则：

  ```css
  [dir=rtl] .my-class {
    margin-right: 10px;
    left: 5px;
  }
  ```

  任何引用“左”或“右”的CSS规则都会自动触发要添加的等效RTL CSS规则。

### 将CSS规则标记为例外
如果你需要一个例外，这样你的CSS代码就不会添加相应的RTL规则，那么就添加这个注释:

```css
.my-class {
  margin-left: 10px /* rtl:ignore */;
}
```

...或SCSS的缩进形式:

```sass
.my-class
  margin-left: 10px #{"/* rtl:ignore */"}
```

...或默认的SCSS。

```sass
.my-class {
  margin-left: 10px #{"/* rtl:ignore */"};
}
```

现在RTL和非RTL的UI模式都会有`margin-left`属性。

有时你需要对整个DOM元素/组件进行例外处理。在这种情况下，将`dir="ltr"`或`dir="rtl"`HTML属性添加到最外层的DOM元素/组件模板:

```html
<div dir="rtl">
  <!--
    this DIV and all its content will use RTL mode
    regardless of Quasar language pack RTL settings
  -->
</div>
```

或者，如果你需要你的RTL用户界面对一个DOM元素/组件使用从左到右(ltr)的模式:
```html
<div dir="ltr">
  <!--
    此DIV及其所有内容将使用非RTL模式
    不考虑 Quasar 语言包RTL设置
  -->
</div>
```

## 处理 Quasar UMD
要在UMD中启用RTL UIs，你需要为你的 Quasar 版本包含RTL等效的CSS标签，同时还要打包Quasar RTL语言包(如希伯来语或波斯语)。例如：

```html
<html>
  <head>
    ...
    <!-- 用您的 Quasar 版本替换“2.0.0”（如下）。 -->
    <link href="https://cdn.jsdelivr.net/npm/quasar@2/dist/quasar.rtl.prod.css" rel="stylesheet" type="text/css">
  </head>

  <body>
    ...

    <!--
      我们还需要一个 RTL Quasar 语言包；我们以希伯来语为例；
      在 Quasar JS 标签之后包含它；
      用您的 Quasar 版本替换“2.0.0”（如下）。
    -->
    <script src="https://cdn.jsdelivr.net/npm/quasar@2/dist/lang/he.umd.prod.js"></script>
    <script>
      Quasar.lang.set(Quasar.lang.he)
    </script>
  </body>
</html>
```

通过使用我们的[UMD标签生成器](/start/umd) 检查你需要在你的HTML文件中包含哪些标签，并确保你勾选 "支持RTL CSS "复选框。
还要注意生成的HTML文件开头的`<html dir="rtl">`标签 -- 你也需要它。

::: warning CAVEAT
Quasar CLI 会自动为您的网站/应用程序代码添加等效的 RTL CSS 规则，但对于未使用 Quasar CLI 的 UMD，情况并非如此。您必须自己管理编写与您的网站/应用程序 CSS 代码等效的 RTL 代码。只有 Quasar 组件会自动处理这个问题。
:::
