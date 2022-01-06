---
title: 应用程序Vuex商店
desc: 如何在Quasar应用程序中管理Vuex商店。
---
在大型应用中，由于多块状态散落在许多组件中以及它们之间的交互，状态管理往往变得复杂。人们常常忽略的是，Vue实例中的真相来源是原始数据对象--Vue实例只是代理了对它的访问。因此，如果你有一块应该被多个实例共享的状态，你应该避免重复它，而是通过身份来共享它。

如果你想让组件共享状态，推荐的方法是Vuex。在深入研究之前，先看看它的[文档](https://vuex.vuejs.org/)。当与[Vue dev-tools](https://github.com/vuejs/vue-devtools)浏览器扩展一起使用时，它有一个伟大的功能，如时间旅行调试。

由于Vuex有很好的文档，我们不会详细介绍如何配置或使用它。相反，我们将向你展示在Quasar项目中使用它时的文件夹结构。

```bash
.
└── src/
    └── store/               # Vuex Store
        ├── index.js         # Vuex Store definition
        ├── <folder>         # Vuex Store Module...
        └── <folder>         # Vuex Store Module...
```

默认情况下，如果你在用Quasar CLI创建项目文件夹时选择使用Vuex，它将为你设置使用Vuex模块。`/src/store`的每个子文件夹代表一个Vuex模块。

如果你在创建项目时没有选择Vuex选项，但想在以后添加它，那么你需要做的就是检查下一节，并创建`src/store/index.js`文件。

::: tip
如果Vuex模块对你的网站应用来说太多，你可以改变`/src/store/index.js`，避免导入任何模块。
:::

## 添加一个Vuex模块。
Quasar CLI通过`$ quasar new`命令使添加Vuex模块变得简单。

```bash
$ quasar new store <store_name>
```

它将在`/src/store`中创建一个文件夹，以上述命令中的 "store_name "命名。它将包含所有你需要的模板。

假设你想创建一个 "展示 "Vuex模块。你发出`$ quasar new store showcase`。然后你注意到新创建的`/src/store/showcase`文件夹，它包含以下文件。

```bash
.
└── src/
    └── store/
        ├── index.js         # Vuex Store definition
        └── showcase         # Module "showcase"
            ├── index.js     # Gluing the module together
            ├── actions.js   # Module actions
            ├── getters.js   # Module getters
            ├── mutations.js # Module mutations
            └── state.js     # Module state
```

我们已经创建了新的Vuex模块，但我们还没有通知Vuex使用它。所以我们编辑`/src/store/index.js`，并添加一个对它的引用。

```js
import { createStore } from 'vuex'
import showcase from './showcase'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      showcase
    },

    // 启用严格模式(增加开销！)。
    // 仅适用于开发模式和-调试构建
    strict: process.env.DEBUGGING
  })

  return Store
}
```

::: tip
如果你正在开发一个SSR应用程序，那么你可以看看[ssrContext](/quasar-cli/developing-ssr/ssr-context)对象，它被提供到服务器端。
:::

现在我们可以在我们的Vue文件中使用这个Vuex模块。下面是一个快速的示例。假设我们在状态中配置了`drawerState`并添加了`updateDrawerState`突变。

```js
// src/store/showcase/mutations.js
export const updateDrawerState = (state, opened) => {
  state.drawerState = opened
}

// src/store/showcase/state.js
// 如果你使用SSR，一定要使用一个函数来返回状态
export default function () {
  return {
    drawerState: true
  }
}
```

在一个Vue文件中。

```html
<template>
  <div>
    <q-toggle v-model="drawerState" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const $store = useStore()

    const drawerState = computed({
      get: () => $store.state.showcase.drawerState,
      set: val => {
        $store.commit('showcase/updateDrawerState', val)
      }
    })

    return {
      drawerState
    }
  }
}
</script>
```

## TypeScript支持

如果你在用Quasar CLI创建项目文件夹时选择使用Vuex和TypeScript，它将在`src/store/index.ts`中添加一些类型化代码。
为了在你的组件中获得一个类型化的Vuex商店，你将需要像这样修改你的Vue文件。

```html
<template>
  <!-- ... -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'src/store';

export default defineComponent({
  setup () {
    const $store = useStore()
    // 你可以使用$store，例如：$store.state.someStoreModule.someData
  }
})
</script>
```

## 存储代码拆分
你可以利用[PreFetch Feature](/quasar-cli/prefetch-feature#Store-Code-Splitting)对Vuex模块进行代码分割。
