---
title: 应用程序国际化(i18n)
desc: 如何在 Quasar 应用程序中使用 vue-i18n。
related:
  - /options/rtl-support
  - /options/quasar-language-packs
---

国际化是一个设计过程，它确保产品(网站或应用程序)可以适应不同的语言和地区，而无需对源代码进行工程更改。将国际化视为本地化的准备。

::: tip
处理网站/应用程序的推荐包是 [vue-i18n](https://github.com/intlify/vue-i18n-next) 。这个软件包应该通过[Boot File](/quasar-cli/boot-files)添加。在Boot File文档页面，你可以看到一个插入 vue-i18n 的具体示例。
:::

::: warning
 Quasar 文档假定你已经熟悉了[vue-i18n](https://github.com/intlify/vue-i18n-next) 。下面我们只描述了如何在 Quasar CLI 项目中使用它的基本情况。对于其功能的完整列表，请访问 [Vue I18n documentation](https://vue-i18n.intlify.dev) 。
:::

## 手动设置

如果你在 `quasar create` 向导中错过了启用 i18n，以下介绍如何手动设置。

1. 在你的应用程序中安装 `vue-i18n` 依赖项。

```bash
$ yarn add vue-i18n@next
// 或:
$ npm install vue-i18n@next
```

2. 创建一个`src/boot/i18n.js`文件，内容如下:

```js
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

export default ({ app }) => {
  // 创建 i18n 实例
  const i18n = createI18n({
    locale: 'en-US',
    messages
  })

  // 告诉应用程序使用I18n实例
  app.use(i18n)
}
```

3. 在你的应用程序中创建一个文件夹(/src/i18n/)，该文件夹将存放你将支持的每种语言的定义。例如：[src/i18n](https://github.com/quasarframework/quasar-starter-kit/tree/master/template/src/i18n) 。注意第2步中的 "从'src/i18n'导入消息"。这一步是你编写被导入内容的地方。

4. 现在在`quasar.config.js`中的`boot`部分引用这个文件。

```js
// quasar.conf.js
return {
  boot: [
    // ...
    'i18n'
  ],

  // ...
}
```

现在你已经准备好在你的页面中使用它了。

## 在你的SFC中设置翻译块

如果我们想在 Quasar CLI 项目中的SFC(单一文件组件)内添加对`<i18n>`标签的支持，那么我们需要修改现有的配置。

我们首先安装`@intlify/vue-i18n-loader`包。

```bash
$ yarn add --dev @intlify/vue-i18n-loader
# or
$ npm i --save-dev @intlify/vue-i18n-loader
```

然后我们在项目的根部编辑`quasar.conf.js`。我们必须包括以下内容。

```js
// quasar.conf.js

const path = require('path')

build: {
  chainWebpack: chain => {
    chain.module
      .rule('i18n-resource')
        .test(/\.(json5?|ya?ml)$/)
          .include.add(path.resolve(__dirname, './src/i18n'))
          .end()
        .type('javascript/auto')
        .use('i18n-resource')
          .loader('@intlify/vue-i18n-loader')
    chain.module
      .rule('i18n')
        .resourceQuery(/blockType=i18n/)
        .type('javascript/auto')
        .use('i18n')
          .loader('@intlify/vue-i18n-loader')
  }
}
```

## 如何使用

有3种主要情况:

``` html
<template>
  <q-page>
    <q-btn :label="$t('mykey2')">
    {{ $t('mykey1') }}
    <span v-html="content"></span>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      content: this.$t('mykey3')
    }
  }
}
</script>
```

1. `mykey1`在HTML正文中
2. `mykey2`在属性中
3. `mykey3`程序化

## 添加新的语言

假设你想添加新的德语。

1. 创建新文件`src/i18n/de/index.js`并将文件`src/i18n/en-US/index.js`的内容复制到那里，然后对语言字符串进行修改。
2. 现在改变`src/i18n/index.js`并在那里添加新的`de`语言。

```js
import enUS from './en-US'
import de from './de'

export default {
  'en-US': enUS,
  de: de
}
```

## 创建语言切换器

```html
<!-- some .vue file -->

<template>
  <!-- ...... -->
  <q-select
    v-model="locale"
    :options="localeOptions"
    label="Quasar Language"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
  <!-- ...... -->
</template>

<script>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'de', label: 'German' }
      ]
    }
  }
}
</script>
```

## 大写字母
许多语言，如希腊语、德语和荷兰语对大写字母的显示有非直观的规则，有一种边缘情况你应该注意。

QBtn组件会使用CSS的`text-transform: uppercase`规则来自动将其标签变成大写字母。根据[MDN webdocs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) ，"语言是由lang HTML属性或xml:lang XML属性定义的。" 不幸的是，这在各浏览器中的实施情况不尽相同，2017年ISO标准中的大写德语eszett `ß`还没有真正进入正典。目前，你有两个选择：

1.在你的标签中使用 `no-caps` 这个属性，并按照字符串的样子来写。
2. 在你的标签中使用 `no-caps` 属性，并使用 `$q.lang.getLocale()` 检测到的语言环境，用[toLocaleUpperCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase) 重写该字符串。

## 检测语言环境
还有一种确定用户地域的开箱即用的方法，由 Quasar 提供：

```js
// 在Vue文件之外
import { Quasar } from 'quasar'
Quasar.lang.getLocale() // returns a string

// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  $q.lang.getLocale() // 返回一个字符串
}
```

::: warning
如果你使用 Quasar 的设置方法(`$q.lang.set()`)，这将不会反映在上面的 Quasar 的 getLocale 中。原因是`getLocale()`将总是返回*用户*的语言环境设置(基于浏览器的设置)。`set()`方法是指 Quasar s内部的设置，用来决定使用哪种语言文件。如果你想看看`set()`设置的语言环境，可以使用`$q.lang.isoName`。
:::
