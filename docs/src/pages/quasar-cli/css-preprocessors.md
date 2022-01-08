---
title: CSS预处理程序
desc: Sass/SCSS是 Quasar 中开箱即用的css预处理程序。
related:
  - /style/sass-scss-variables
---

**Sass**或**SCSS**(推荐这两种风格中的任何一种)是 Quasar CLI 支持的开箱即用的css预处理器，如果你想使用它们。

你不需要安装任何额外的软件包或扩展Webpack的配置。

## 如何
你的Vue文件可以通过`<style>`标签包含Sass/SCSS代码。

```html
<!-- 注意 lang="sass" -->
<style lang="sass">
div
  color: #444
  background-color: #dadada
</style>
```

```html
<!-- 注意 lang="scss" -->
<style lang="scss">
div {
  color: #444;
  background-color: #dadada;
}
</style>
```

当然，也支持标准的CSS：

```html
<style>
div {
  color: #444;
  background-color: #dadada;
}
</style>
```

## 变量
 Quasar 也提供变量(`$primary`, `$grey-3`, ...等等)，你可以直接使用它们。阅读更多关于[Sass/SCSS变量](/style/sass-scss-variables)。
