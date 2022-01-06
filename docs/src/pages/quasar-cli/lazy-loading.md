---
title: 懒惰加载/代码拆分
desc: 如何在Quasar应用程序中创建Webpack chunks。
---
当你的网站/应用程序很小的时候，你可以将所有的布局/页面/组件加载到初始的捆绑包中，并在启动时提供所有的服务。但是，当你的代码变得复杂，并且有许多布局/页面/组件时，这样做就不是最理想的，因为这将大大影响加载时间。幸运的是，有一种方法可以解决这个问题。

我们将介绍如何偷懒加载/编码分割你的应用程序的部分，以便它们只在需要时自动被请求。这是通过动态导入完成的。让我们从一个示例开始，然后转换它，使我们使用懒惰加载 -- 我们将这个示例集中在加载一个页面，但同样的原则可以应用于加载任何东西(资产，JSON，...)。

## 懒惰地加载路由器页面
使用Vue Router调用静态组件是很正常的，如下所示。

::: warning
Quasar文档假定你已经熟悉了[Vue Router](https://github.com/vuejs/vue-router-next)。下面我们只描述了如何在Quasar CLI项目中使用它的基本情况。对于其功能的完整列表，请访问[Vue Router 文档](https://next.router.vuejs.org/)。
:::

```js
import SomePage from 'pages/SomePage'

const routes = [
  {
    path: '/some-page',
    component: SomePage
  }
]
```

现在，让我们改变这一点，使用动态导入，使页面只在需要时加载。

```js
const routes = [
  {
    path: '/some-page',
    component: () => import('pages/SomePage')
  }
]
```

很简单，对吗？它的作用是为`/src/pages/SomePage.vue`创建一个单独的块，然后只在需要的时候加载。在这种情况下，当用户访问"/some-page "路线时。

## 懒惰地加载组件
通常，你会导入一个组件，然后将其注册到页面、布局或组件中。

```html
<script>
import SomeComponent from 'components/SomeComponent'

export default {
  components: {
    SomeComponent,
  }
}
</script>
```

现在让我们改变一下，使用动态导入，使该组件只在需要时加载。
```html
<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    SomeComponent: defineAsyncComponent(() => import('components/SomeComponent')),
  }
}
</script>
```

## 懒惰地加载在飞行中
正如你在上面注意到的，我们使用的是动态导入(`import('...resource.')`)而不是常规导入(`import Resource from './path/to/resource'`)。动态导入本质上是返回一个你可以使用的Promise。

```js
import('./categories.json')
  .then(categories => {
    // 嘿，我们已经懒得加载文件了
    // 而我们在 "类别 "中拥有其内容
  })
  .catch(() => {
    // 哎呀，出错了...
    // 无法加载该资源
  })
```

相对于常规导入，使用动态导入的一个好处是，可以在运行时确定导入路径。

```js
import('pages/' + pageName + '/' + 'id')
```

## 动态导入的注意事项
在使用动态导入时，有一个注意事项，就像前面的示例中的变量部分。当网站/应用程序被捆绑时，所以在编译时，我们没有办法知道运行时的确切导入路径是什么。因此，将为每个可能与变量路径相匹配的文件创建chunks。你可能会在构建日志中看到不需要的文件。

那么，在这种情况下，我们怎样才能限制创建的块的数量呢？我们的想法是尽可能地限制变量部分，使匹配的路径越少越好。
1. 添加文件扩展名，即使没有扩展名也可以工作。这将只为该文件类型创建分块。当该文件夹包含许多文件类型时，这很有用。
```js
//不好
import('./folder/' + pageName)

// 好得多
import('./folder/' + pageName + '.vue')
```
2. 尝试创建一个文件夹结构，以限制该变量路径中可用的文件。尽量使其具体化。
```js
//不好 -- 对./folder内的任何JSON进行分块(递归搜索)
const asset = 'my/jsons/categories.json'.
import('./folder/' + asset)

// 很好 -- 只为./folder/my/jsons内的JSON制作数据块
const asset = 'categories.json'
import('./folder/my/jsons/' + asset)
```
3. 尝试从只包含文件的文件夹导入。以前面的示例为例，设想./folder/my/jsons进一步包含子文件夹。我们通过指定更具体的路径使动态导入变得更好，但在这种情况下，它仍然不是最佳选择。最好是使用只包含文件的终端文件夹，所以我们限制了匹配路径的数量。

4. 使用[Webpack magic comments](https://webpack.js.org/api/module-methods/#magic-comments) `webpackInclude`和`webpackExclude`来用正则表达式约束捆绑的块，例如：
```js
await import(
/* webpackInclude: /(ar|en-US|ro)\.js$/ */
'quasar/lang/' + langIso
)
.then(lang => {
Quasar.lang.set(lang.default)
})
```
将导致只捆绑你的网站/应用程序需要的语言包，而不是捆绑所有的语言包(超过40个！)，这可能会妨碍`quasar dev`和`quasar build`命令的性能。

记住，匹配的路径数等于生成的块数。
