---
title: Quasar 图标集
desc: 如何为 Quasar 组件配置图标集。
related:
  - /options/installing-icon-libraries
  - /vue-components/icon
---

Quasar 组件有它们自己的图标。Quasar不是强迫你使用一个特定的图标库(以便它们能够正确显示)，而是让你选择**它应该为其组件使用哪些图标**。这被称为 `Quasar图标集`。

你可以安装多个图标库，但你仅能选择一个用于 Quasar 的组件。

 Quasar 目前支持。[Material Icons](https://material.io/icons/) , [Font Awesome](http://fontawesome.io/icons/), [Ionicons](http://ionicons.com/), [MDI](https://materialdesignicons.com/), [Eva Icons](https://akveo.github.io/eva-icons), [Themify Icons](https://themify.me/themify-icons), [Line Awesome](https://icons8.com/line-awesome) 和 [Bootstrap Icons](https://icons.getbootstrap.com/) 。

你也可以在任何 Quasar 组件中使用你自己的图标(作为自定义的svgs或任何格式的图像)，参见[QIcon](/vue-components/icon#image-icons) 页面以了解更多相关信息。

::: tip
相关页面。[安装图标库](/options/installing-icon-libraries)和[QIcon组件](/vue-components/icon) 。
:::

## 配置默认的图标集
**有两种类型的 Quasar 图标集：基于web字体和基于svg。

除非另有配置，Quasar使用Material Icons网页字体作为其组件的图标集。但是你可以告诉 Quasar 使用其他的图标集，但是如果是基于webfont的图标集，那么一定要在你的网站/应用程序中包含它的图标库(见[安装图标库](/options/installing-icon-libraries) )。

### 硬编码
如果默认的 Quasar 图标集不是动态确定的(例如，不依赖于cookies)，那么你可以。

####  Quasar CLI 方式
我们再次编辑`/quasar.conf.js`:

```js
framework: {
  // 基于网络字体的示例
  iconSet: 'mdi-v6'
}
```

```js
framework: {
  // 基于svg的示例
  iconSet: 'svg-mdi-v6'
}
```

对于所有可用的选项，请访问[GitHub](https://github.com/quasarframework/quasar/tree/dev/ui/icon-set) 仓库。

包括MDI和Fontawesome并告诉 Quasar 在其组件中使用Fontawesome的完整示例。

```js
extras: [
  'mdi-v6',
  'fontawesome-v5'
],
framework: {
  iconSet: 'fontawesome-v5'
}
```

这将使你能够在你的应用程序中同时使用MDI和Fontawesome网页字体，而且所有 Quasar 组件都将显示Fontawesome图标。

#### UMD方式
包括你的 Quasar 版本的 Quasar 图标集标签，同时告诉 Quasar 使用它。例如:

```html
<!-- 在 Quasar JS 标签之后加上这个 -->
<script src="https://cdn.jsdelivr.net/npm/quasar@v2/dist/icon-set/fontawesome-v5.umd.prod.js"></script>
<script>
  Quasar.iconSet.set(Quasar.iconSet.fontawesomeV5)
</script>
```

在[UMD / Standalone](/start/umd) 页面查看你需要在HTML文件中包含哪些标签。

#### Quasar Vite 插件方式
我们编辑你的`main.js`。

```js
// ...
import { Quasar } from 'quasar'
// ...
import iconSet from 'quasar/icon-set/fontawesome-v5'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
// ...
app.use( Quasar , {
  // ... ,
  iconSet: iconSet
})
```

#### Vue CLI 方式
我们编辑你的`main.js`：

```js
import iconSet from 'quasar/icon-set/fontawesome-v5'
// ...
import { Quasar } from 'quasar'
// ...
app.use( Quasar , {
  // ... ,
  iconSet: iconSet
})
```

### 动态的(非SSR)
Quasar CLI: 如果您所需要的 Quasar 图标集必须是动态选择的(例如：取决于cookie)，那么您需要创建一个启动文件。`$ quasar new boot quasar-icon-set [-format ts]`。这将创建`/src/boot/quasar-icon-set.js`文件。把它编辑成:

```js
import { Quasar } from 'quasar'

export default async () => {
  const iconSetName = 'mdi-v6' // ... 确定它的一些逻辑（使用Cookies插件？）

  try {
    await import(
      /* webpackInclude: /(mdi-v6|fontawesome-v5)\.js$/ */
      'quasar/icon-set/' + iconSetName
      )
      .then(setDefinition => {
        Quasar.iconSet.set(setDefinition.default)
      })
  }
  catch (err) {
    // 要求的 Quasar 图标集不存在。
    // 让我们不要破坏应用程序，所以捕捉错误
  }
}
```

然后将这个启动文件注册到`/quasar.conf.js`中。

```js
boot: [
  'quasar-icon-set'
]
```

::: warning 始终限制动态导入
注意使用[Webpack magic comment](https://webpack.js.org/api/module-methods/#magic-comments) - `webpackInclude`。否则所有可用的图标集文件都会被捆绑，导致编译时间和捆绑大小的增加。参见[动态导入的注意事项](https://quasar.dev/quasar-cli/lazy-loading#Caveat-for-dynamic-imports)
:::

### 动态的(SSR)
在处理SSR的时，我们不能使用单例对象，因为这会污染会话。因此，相对于上面的动态示例(先读一下！)，你还必须从你的启动文件中指定`ssrContext`:

```js
import { Quasar } from 'quasar'

// ! 请注意 ssrContext 参数。
export default async ({ ssrContext }) => {
  const iconSetName = 'mdi-v6' // ... 确定它的一些逻辑（使用Cookies插件？）

  try {
    await import(
      /* webpackInclude: /(mdi-v6|fontawesome-v5)\.js$/ */
      'quasar/icon-set/' + iconSetName
      )
      .then(setDefinition => {
        // ! 注意 ssrContext 参数。
        Quasar.iconSet.set(setDefinition.default, ssrContext)
      })
  }
  catch (err) {
    // 要求的 Quasar 图标集不存在。
    // 让我们不要破坏应用程序，所以捕捉错误
  }
}
```

## 在运行时改变 Quasar 图标集

#### 动态地改变图标集
Quasar Icon Set是反应式的，所以如果你改变了$q.iconSet对象，所有的组件都会正常更新。下面是一个示例：

```js
// 组合式 API 变体
import { useQuasar } from 'quasar'
import mdiIconSet from 'quasar/icon-set/mdi-v6.js'

setup () {
  const $q = useQuasar()

  function changeIconSetToMdiIconSet () {
    $q.iconSet.set(mdiIconSet)
  }

  return {
    changeIconSetToMdiIconSet
  }
}
```

```js
// 选项式 API 变体
import mdiIconSet from 'quasar/icon-set/mdi-v6.js'

methods: {
  changeIconSetToMdiIconSet () {
    this.$q.iconSet.set(mdiIconSet)
  }
}
```

#### 动态地改变一个特定的图标
如果你想把一个特定的图标换成另一个，你可以。下面是一个示例：

```js
// 组合式 API 变体
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  function changeQEditorHeaderIcon () {
    $q.iconSet.editor.header1 = 'fas fa-font'
  }

  return { changeQEditorHeaderIcon }
}
```

```js
// 选项式 API 变体
methods: {
  changeQEditorHeaderIcon () {
    this.$q.iconSet.editor.header1 = 'fas fa-font'
  }
}
```
