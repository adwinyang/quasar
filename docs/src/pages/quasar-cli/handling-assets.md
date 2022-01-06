---
title: 应用程序处理资产
desc: 如何在Quasar应用中使用常规应用资产和静态资产。
---
你会注意到在项目结构中我们有两个资产目录：`/public/`和`/src/assets/`。它们之间有什么区别呢？有些是静态资产，而其他的是由构建系统处理和嵌入的。

所以让我们试着回答上面的问题。我们先说说使用常规资产，然后再看看静态资产有什么区别。

## 常规资产 - /src/assets
在`*.vue`组件中，你所有的模板和CSS都会被`vue-html-loader`和`css-loader`解析，以寻找资产URL。例如，在`<img src="./logo.png">`和`background: url(./logo.png)`中，`"./logo.png "是一个相对资产路径，将被Webpack解析为模块依赖。

因为`logo.png`不是JavaScript，当被当作模块依赖时，我们需要使用`url-loader`和`file-loader`来处理它。Quasar CLI已经为你配置了这些webpack加载器，所以你基本上可以免费获得文件名指纹和有条件的base64内联等功能，同时能够使用相对/模块路径而不用担心部署问题。

由于这些资产在构建过程中可能被内联/复制/重命名，它们基本上是你源代码的一部分。这就是为什么建议将Webpack处理的资产放在`/src/assets`中，与其他源文件一起。事实上，你甚至不需要把它们全部放在`/src/assets`中：你可以根据使用它们的模块/组件来组织它们。例如，你可以把每个组件放在它自己的目录中，其静态资产就在旁边。

### 资产解析规则

相对的URLs，例如`./assets/logo.png`将被解释为模块的依赖性。它们将被替换为基于你的Webpack输出配置的自动生成的URL。

以`~`为前缀的URL将被视为一个模块请求，类似于`require('some-module/image.png')`。如果你想利用Webpack的模块解析配置，你需要使用这个前缀。Quasar提供了`assets`Webpack别名，所以建议你像这样使用它。`<img src="~assets/logo.png">`。注意'assets'前面的'~'。

## 静态资产 - /public
与根相关的URL(例如`/logo.png`--其中'/'是你的publicPath)或`logo.png`完全不被处理。这应该被放在`public/`中。这些根本不会被Webpack处理。statics文件夹会被简单地复制到可分发的文件夹中。

Quasar在幕后有一些智能算法，确保无论你构建什么(SPA、PWA、Cordova、Electron)，你的静态文件都能被正确引用*当且仅当它们不使用相对路径。

```html
<!-- Good! -->
<img src="logo.png">

<!--
  BAD! Works until you change vue router
  mode (hash/history) or your public path.
  Don't!
-->
<img src="/logo.png">
```

::: tip Assets vs Statics
assets "文件夹中的文件只有在你的Vue文件中有字面引用时才会被包含在你的构建中。
"public "文件夹中的每个文件和文件夹都会按原样复制到你的生产构建中，不管是什么。
:::

::: danger
当不构建SPA/PWA/SSR时，`/public/icons/*`和`/public/favicon.ico`将不会被嵌入你的应用程序，因为它们没有任何作用。例如，Electron或Cordova应用程序就不需要这些文件。
:::

## Vue的绑定只需要statics
请注意，只要你将 "src "绑定到Vue作用域中的一个变量，它就必须是statics文件夹中的一个。原因很简单：URL是动态的，所以Webpack(在编译时打包资产)不知道你在运行时将引用哪个文件，所以它不会处理这个URL。

```html
<template>
  <!-- imageSrc MUST reference a file from /public -->
  <img :src="imageSrc">
</template>

<script>
export default {
  setup () {
    return {
      /*
        Referencing /public.
        Notice string doesn't start with a slash. (/)
      */
      imageSrc: 'logo.png'
    }
  }
}
</script>
```

你可以通过将`src`绑定到Vue的一个值来强制服务静态资产。使用`:src="path/to/image "而不是`:src="path/to/image""`或`:src="imageSrc"。请注意第二个代码示例中双引号内单引号的用法(为了在文档网站上直观地看到这一点，已经添加了空格--通常情况下，你不会有空格)。

## 在JavaScript中获取资产路径

为了让Webpack返回正确的资产路径，你需要使用`require('./relative/path/to/file.jpg')`，它将被`file-loader`处理并返回解析后的URL。比如说。

```js
computed: {
  background () {
    return require('./bgs/' + this.id + '.jpg')
  }
}
```

请注意，上面的示例将在最终构建中包括`./bgs/`下的每一个图片。这是因为Webpack无法猜测哪些图片会在运行时被使用，所以它包括了所有图片。
