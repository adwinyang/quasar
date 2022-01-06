---
title: Sass/SCSS变量
desc: 如何使用由Quasar定义的Sass/SCSS变量。
components:
  - style/SassVariables
related:
  - /quasar-cli/css-preprocessors
---

Quasar中内置有Sass/SCSS变量，如果你愿意，你可以在devland中改变和/或使用。

::: warning
这仅适用于Quasar CLI管理的应用程序。
:::

## 用法
在你的应用程序的`*.vue`文件或.sass/.scss文件中，你可以使用任何Quasar Sass/SCSS变量(示例：`$primary`, `$red-1`)，以及任何其他你在使用Quasar CLI时在`/src/css/quasar.variables.sass`或完全等同的`/src/css/quasar.variables.scss`(取决于你喜欢的Sass风味)声明的Sass/SCSS的变量。

```html
<!-- Notice lang="sass" -->
<style lang="sass">
div
  color: $red-1
  background-color: $grey-5
</style>

<!-- Notice lang="scss" -->
<style lang="scss">
div {
  color: $red-1;
  background-color: $grey-5;
}
</style>
```

::: tip
如果你想访问Quasar Sass/SCSS变量，你不需要一定要有`src/css/quasar.variables.sass`或`src/css/quasar.variables.scss`文件。只有当你想定制变量时才创建其中一个。
:::

::: danger
当创建或删除任何`src/css/quasar.variables.*`文件时，你将需要重新启动你的开发服务器，以使其生效。然而，当你改变这些文件的内容时，就没有必要再重启了。
:::

## 注意事项

Quasar CLI会检测文件是否至少包含一个'$'字符，如果是，它会自动导入Quasar Sass/SCSS的变量。

然而，如果你有一个嵌套的导入语句，而你要导入的文件不包含任何'$'字符，这将无法工作。在这种情况下，你需要添加一个简单的注释(`// $`)，这样Quasar就能检测到至少一个'$'字符。

```html
<style lang="sass">
// $

@import 'some-file.sass'
// 现在some-file.sass可以受益
// 也来自Quasar Sass的变量
// 由于上述评论
</style>
```

对于从quasar.conf.js > css中包含的.sass/.scss文件也是如此。

## 自定义
如果你想自定义变量(或添加自己的变量)，而你的项目还没有`src/css/quasar.variables.sass`(或`src/css/quasar.variables.scss`)文件，请自己创建一个。如果你选择.sass或.scss作为这个文件的扩展名并不重要。**拥有其中一个文件将为你所有的.sass和.scss项目文件提供变量(包括在.vue文件中)**。

你可以在这些文件中自由覆盖Quasar的任何变量(见下一节)。为了方便起见，如果你在创建Quasar项目文件夹时选择了Sass或SCSS，这些文件最初只包含与品牌颜色有关的变量。

::: tip
Quasar非常容易定制，不需要篡改Sass/SCSS的变量，所以要确保你真的需要这样做。没有这两个文件中的一个，实际上会加快你的构建速度，而默认的变量仍然会提供给.sass/.scss/.vue文件。
:::

## Quasar的CSS
Quasar自己的CSS是使用变量文件来编译的(如果它存在的话)，但有多种形式(sass, scss)。所以Quasar CLI必须有一个优先列表。

* `src/css/quasar.variables.scss`是否存在？使用它。
* 如果没有，那么`src/css/quasar.variables.sass`是否存在？使用那个。
* 如果没有，则使用预先编译的Quasar CSS。

## 变量列表

<sass-variables />
