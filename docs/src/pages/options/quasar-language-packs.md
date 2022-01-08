---
title: Quasar 语言包
desc: 如何在 Quasar 应用程序中配置 Quasar 语言包。
related:
  - /options/rtl-support
  - /options/app-internationalization
---
 Quasar 语言包指的是 Quasar 自身组件的国际化，其中一些组件有标签。

::: warning
需要注意的是，下面所描述的只是 Quasar 组件的国际化。如果你需要对自己的组件进行国际化，请阅读[App Internationalization](/options/app-internationalization)文档页。
:::

如上所述，一些 Quasar 组件有自己的标签。当涉及到国际化时，一种选择是通过 Quasar 组件(如QTable)的每个实例的标签属性来配置标签。这样你就可以自定义文本以匹配所选语言。然而，这需要时间并给你的网站/应用程序增加不必要的复杂性。**相反，你可以使用 Quasar 语言包，它为你翻译了许多标准标签定义，如 "取消"、"清除"、"选择"、"更新 "等。不需要再翻译这些内容了! 而且它是开箱即用的。

::: tip
关于可用的 Quasar 语言的完整列表，请查看[GitHub上的 Quasar 语言](https://github.com/quasarframework/quasar/tree/dev/ui/lang) 。
<br><br>**如果您想要的语言不在该列表中**，请随时提交 PR 以添加它。最多需要 5 到 10 分钟。我们欢迎任何语言！
:::

## 配置默认的语言包

除非另有配置(见下文)，Quasar 默认使用 "en-US "语言包。

### 硬编码
如果默认的 Quasar 语言包不是动态确定的(例如不依赖于cookies)，那么你可以：

#### Quasar CLI
编辑`/quasar.conf.js`：

```js
framework: {
  lang: 'de'
}
```

#### Quasar Vite 插件
编辑你的`main.js`:

```js
// ...
import { Quasar } from 'quasar'
// ...
import langDe from 'quasar/lang/de'
// ...
app.use( Quasar , {
  // ... ,
  lang: langDe
})
```

#### CLI视图
编辑你的`main.js`：

```js
// ...
import { Quasar } from 'quasar'
// ...
import langDe from 'quasar/lang/de'
// ...
app.use( Quasar , {
  // ... ,
  lang: langDe
})
```

#### Quasar UMD
包括你的 Quasar 版本的语言包JS标签，同时告诉 Quasar 使用它。例如：

```html
<!-- include this after Quasar JS tag -->
<script src="https://cdn.jsdelivr.net/npm/quasar@2/dist/lang/de.umd.prod.js"></script>
<script>
  Quasar.lang.set(Quasar.lang.de)
</script>
```

在[UMD / Standalone](/start/umd)页面上查看你的HTML文件中需要包含哪些标签。

### 动态(非SSR)
Quasar CLI: 如果您所需要的 Quasar 语言包必须是动态选择的(例如：取决于cookie)，那么您需要创建一个启动文件。`$ quasar new boot quasar-lang-pack [-format ts]`。这将创建`/src/boot/quasar-lang-pack.js`文件。把它编辑成：

```js
import { Quasar } from 'quasar'

export default async () => {
  const langIso = 'de' // ... some logic to determine it (use Cookies Plugin?)

  try {
    await import(
      /* webpackInclude: /(de|en-US)\.js$/ */
      'quasar/lang/' + langIso
      )
      .then(lang => {
        Quasar.lang.set(lang.default)
      })
  }
  catch (err) {
    // 要求的 Quasar 语言包不存在。
    // 让我们不要破坏应用程序，所以捕捉错误
  }
}
```

然后将这个启动文件注册到`/quasar.conf.js`中：

```js
boot: [
  'quasar-lang-pack'
]
```

::: warning 始终限制动态导入
注意使用[Webpack 魔术注释](https://webpack.js.org/api/module-methods/#magic-comments) - `webpackInclude`。否则，将捆绑所有可用的语言包，导致编译时间和包的大小增加。参见[动态导入的注意事项](https://quasar.dev/quasar-cli/lazy-loading#Caveat-for-dynamic-imports)
:::

### 动态的(SSR)
在处理SSR时，我们不能使用单例对象，因为那会污染会话。因此，相对于上面的动态示例(先读一下！)，你还必须从你的启动文件中指定`ssrContext`。

```js
import { Quasar } from 'quasar'

// ! 注意 ssrContext 参数。
export default async ({ ssrContext }) => {
  const langIso = 'de' // ... some logic to determine it (use Cookies Plugin?)

  try {
    await import(
      /* webpackInclude: /(de|en-US)\.js$/ */
      'quasar/lang/' + langIso
      )
      .then(lang => {
        // ! 注意 ssrContext 参数。
        Quasar.lang.set(lang.default, ssrContext)
      })
  }
  catch (err) {
    // 要求的 Quasar 语言包不存在。
    // 让我们不要破坏应用程序，所以捕捉错误
  }
}
```

## 在运行时改变 Quasar 语言包
使用 QSelect 动态改变 Quasar 组件语言的示例：

```html
<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    label="Quasar Language"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
</template>

<script>
import { useQuasar } from 'quasar'
import languages from 'quasar/lang/index.json'
import { ref, watch } from 'vue'

const appLanguages = languages.filter(lang =>
  [ 'de', 'en-US' ].includes(lang.isoName)
)

const langOptions = appLanguages.map(lang => ({
  label: lang.nativeName, value: lang.isoName
}))

export default {
  setup () {
    const $q = useQuasar()
    const lang = ref($q.lang.isoName)

    watch(lang, val => {
      // 动态导入，所以只按需加载
      import(
        /* webpackInclude: /(de|en-US)\.js$/ */
        'quasar/lang/' + val
        ).then(lang => {
          $q.lang.set(lang.default)
        })
    })

    return {
      lang,
      langOptions
    }
  }
}
</script>
```

## 在应用程序空间中使用 Quasar 语言包
尽管 Quasar 语言包**只为 Quasar 组件的内部使用而设计**，但你仍然可以将其标签用于你自己的网站/应用程序组件。

```html
"Close" label in current Quasar Language Pack is:
{{ $q.lang.label.close }}
```

查看[GitHub](https://github.com/quasarframework/quasar/tree/dev/ui/lang) 上的 Quasar 语言包，可以看到`$q.lang`的结构。

## 检测地区设置
 Quasar 还提供了一种方法来确定用户的地域性，这种方法是开箱即用的。

```js
// 在Vue文件之外
import { Quasar } from 'quasar'
Quasar.lang.getLocale() // returns a string

// 在一个Vue文件中
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  $q.lang.getLocale() // returns a string
}
```
