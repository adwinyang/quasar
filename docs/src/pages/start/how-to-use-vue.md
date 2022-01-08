---
title: 如何使用Vue
desc: 关于Vue原则以及如何将其用于 Quasar 的快速教程。
---
在你开始使用 Quasar 之前，最好先熟悉ES6并对Vue 3的工作原理有相当的了解。([ES6快速概述](https://github.com/lukehoban/es6features)和[ES6完整功能列表](http://es6-features.org/#Constants) -- 别担心，你不需要了解ES6的全部内容)。对于有反应式UI经验的开发者来说，[Vue 3文档](https://v3.vuejs.org/)本身最多需要半天时间从上到下阅读，它将帮助你了解如何使用和配置 Quasar 组件。

::: tip
如果你是Vue和反应式UI库的完全初学者，想要一个好的教程，我们推荐你看一下[Vue和 Quasar 视频教程](/video-tutorials)。
:::

在阅读完Vue文档后，让我们来理清一些最常见的问题，比如*"我如何使用 Quasar 组件、Vue属性、方法和事件 "*。

## Vue单文件组件(SFC)

你将使用包含多个部分的`*.vue`文件来构建你的 Quasar 应用程序。`template`(HTML)，`script`(Javascript)和`style`(CSS/SASS/SCSS/Stylus/Less)都在同一个文件中。

```html
<template>
  <!-- you define your Vue template here -->
</template>

<script>
// 这是你的Javascript的去处
// 来定义你的Vue组件，其中
// 可以是一个布局，一个页面或你自己的
// 整个应用程序中使用的组件。

export default {
  //
}
</script>

<style>
/* This is where your CSS goes */
</style>
```

### CSS预处理程序
对于`<style>`标签，你也可以使用任何你想要的CSS预处理器。[Sass/SCSS](https://sass-lang.com)(推荐)是开箱即用。

你可以指定你希望你选择的预处理器来处理你所写的CSS代码。

```html
<!-- notice lang="sass" -->
<style lang="sass">
.some-div
  font-size: 15px
</style>

<!-- notice lang="scss" -->
<style lang="scss">
.some-div {
  font-size: 15px;
}
</style>
```

## 使用 Quasar 指令

 Quasar 带有一些自定义的[Vue Directives](https://v3.vuejs.org/guide/custom-directive.html)。这些指令几乎可以应用于任何DOM元素或组件。

 Quasar 指令的示例。

```html
<div v-ripple>Click Me</div>
```

> 注意Ripple在HTML模板中是如何使用`v-ripple`的。Vue指令的前缀是`v-`。

```html
<div v-touch-pan="handler">...</div>
<div v-touch-swipe="handler">...</div>
<div v-ripple>Click me. I got ripples.</div>
```

## 使用 Quasar 组件
 Quasar 组件的名字以 "Q "开头，如 "QBtn "或 "QElementResizeObserver"。为了使用它们，你需要在`/quasar.conf.js`中添加一个对它们的引用。

让我们以QBtn和QIcon为例，然后看看如何将这些组件嵌入我们的应用程序中。

```html
<div>
  <q-btn @click="doSomething" label="Do something" />
  <q-icon name="alarm" />
</div>
```

> 注意QBtn在Vue的HTML模板中是如何被用作`<q-btn>`的。如果我们导入QElementResizeObserver，那么我们就可以在模板中以`<q-element-resize-observer>`的方式使用它。

## 使用 Quasar 插件
 Quasar 插件是你可以在Vue文件中以及在文件之外使用的功能，比如Notify, BottomSheet, AppVisibility等等。

::: warning
**在你的应用程序中使用它们之前，你需要在`/quasar.conf.js`中添加对它们的引用(如下所示)。
:::

```js
framework: {
  plugins: [ 'Notify', 'BottomSheet' ]
}
```

让我们以Notify为例，看看我们接下来如何使用它。在一个Vue文件中，你可以这样写(组成API)。

```html
<template>
  <div>
    <q-btn
      @click="$q.notify('My message')"
      color="primary"
      label="Show a notification"
    />

    <q-btn
      @click="showNotification"
      color="primary"
      label="Show another notification"
    />
  </div>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    function showNotification () {
      $q.notify('Some other message')
    }

    return {
      showNotification
    }
  }
}
</script>
```

> 注意在模板区我们使用的是`$q.<plugin-name>`。

在Options API中的一个相等的脚本部分。

```js
export default {
  methods: {
    showNotification () {
      this.$q.notify('Some other message')
    }
  }
}
```

现在让我们看看Notify在Vue文件之外被使用的一个示例。

```js
import { Notify } from 'quasar'

// ...
Notify.create('My message')
```

### 自闭症标签

::: danger
当你使用**Quasar UMD版本时，请不要使用自闭标签形式。在Vue解析你的DOM元素之前，你的浏览器正在解释HTML，所以你的HTML语法必须是正确的。未知的标签(如Vue组件)不能是自闭的，因为你的浏览器会把这些标签解释为你在打开一个标签，但从未关闭它。
:::

一些 Quasar 组件不需要你在它们里面包含HTML内容。在这种情况下，你可以把它们作为自闭标签使用。下面是一个使用QIcon的示例。

```html
<q-icon name="cloud" />
```

自闭意味着上述模板等同于。

```html
<q-icon name="cloud"></q-icon>
```

这两种形式都是有效的，都可以使用，除了UMD，你必须明确关闭标签。它与普通DOM元素的工作原理相同。

```html
<div class="col" />
<!-- equivalent to: -->
<div class="col"></div>
```

一些eslint-plugin-vue的linting规则实际上是强制使用自我封闭的语法。

## 处理Vue属性
让我们用一个支持以下属性的假 Quasar 组件(我们称之为QBogus)来举一些示例。我们将在下面的章节中讨论Vue属性的每一种类型。

| Vue属性|类型|描述|
| `infinite` | Boolean | 无限滑动滚动 |
| `size` | String | 加载条的厚度。|
| `speed` | 数字 | 加载条的更新速度(以毫秒为单位)。|
| `columns` | 对象 | 定义列的对象(见下面的 "列的定义")。|
| `offset` | 数组 | 有两个数字的数组。水平和垂直方向上的偏移(单位：像素)。|
### 布尔属性

一个布尔属性意味着它只接受一个严格意义上的布尔值。这些值不会被转换为布尔值，所以你必须确保你使用的是一个真正的布尔值。


::: tip
在 Quasar 中，所有布尔属性都有`false`作为默认值。因此，你不需要明确地给它们分配 "false "值。
:::

如果你想控制该属性并在运行时动态地改变它，那么就把它绑定到你的作用域中的一个变量。

```html
<template>
  <q-bogus :infinite="myInfiniteVariable" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const myInfiniteVariable = ref(false)
    return {
      myInfiniteVariable
    }
  }
}
</script>
```

另一方面，如果你知道这个布尔值不会改变，你可以像组件属性一样使用变量的速记版本，只需指定它。换句话说，如果你不把这个变量绑定到组件范围内的一个变量上，因为它将永远是`true'。

```html
<template>
  <q-bogus infinite />

  <!--
    the following is perfectly valid,
    but it's a longer version
  -->
  <q-bogus :infinite="true" />
</template>
```

### 字符串属性
正如你所想象的，字符串需要作为这种类型的属性的值。

```html
<template>
  <!--
    direct assignment, no need for
    a variable in our scope
  -->
  <q-bogus size="24px" />

  <!--
    we can also bind it to a variable
    in our scope so we can dynamically
    change it
  -->
  <q-bogus :size="mySize" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    // 注意字符串为值
    const mySize = ref('16px')
    return {
      mySize
    }
  }
}
</script>
```

### 号码属性

```html
<template>
  <!--
    Case 1. Direct assignment.
    Notice the colon (":") before property name.
  -->
  <q-bogus :speed="50" />

  <!-- Case 2. Assignment through a scope variable -->
  <q-bogus :speed="myNumber" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    // 通知号为值
    const myNumber = ref(50)
    return {
      myNumber
    }
  }
}
</script>
```

### 对象属性

```html
<template>
  <!-- Case 1. Direct assignment. -->
  <q-bogus :columns="{key: 'value', anotherKey: 'another value'}" />
  <!-- or a more elegant way for Case 1: -->
  <q-bogus
    :columns="{
      key: 'value',
      anotherKey: 'another value'
    }"
  />

  <!-- Case 2. Assignment through a scope variable -->
  <q-bogus :columns="myColumns" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const myColumns = ref({
      key: 'value',
      anotherKey: 'another value'
    })

    return { myColumns }
  }
}
</script>
```

### 阵列属性

```html
<template>
  <!-- Case 1. Direct assignment. -->
  <q-bogus :offset="[10, 20]" />

  <!-- Case 2. Assignment through a scope variable -->
  <q-bogus :offset="myOffset" />
</template>

<script>
export default {
  setup () {
    return {
      myOffset: [10, 20]
    }
  }
}
</script>
```

## 处理Vue方法
你会注意到在整个文档中，一些 Quasar 组件有可以被调用的方法。例如：

| Vue方法 | 描述 |
| `next()` | 转到下一张幻灯片。|
| `previous(doneFn)` | 转到上一张幻灯片。|
| `toggleFullscreen()` | 切换全屏模式。|
为了让你访问这些方法，你需要先在组件上设置一个Vue引用。下面是一个使用Composition API的示例。



```html
<template>
  <!--
    Notice ref="myRef". We will use the name
    assigned to "ref" in the script part below
  -->
  <q-bogus ref="myRef" />
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup () {
    const myRef = ref(null)

    // 在组件安装到DOM之后。
    onMounted(() => {
      // 我们调用我们组件的 "next() "方法
      myRef.value.next()
    })
    // 在挂载点之前调用可能会导致错误
    // 因为Vue还没有准备好Vue的引用

    // 我们将myRef暴露在范围内，所以Vue
    // 也可以在模板中使用它
    return { myRef }
  }
}
</script>
```

这里是同样的示例，但有选项式 API。

```html
<template>
  <!--
    Notice ref="myRef". We will use the name
    assigned to "ref" in the script part below
  -->
  <q-bogus ref="myRef" />
</template>

<script>
export default {
  // 我们现在可以访问`this.$refs.myRef`。
  // 一个关于mounted()Vue组件钩的示例
  mounted () {
    // 调用 "next() "方法。
    this.$refs.myRef.next()
  }
  // 在挂载点之前调用可能会导致错误
  // 因为Vue还没有准备好Vue的引用
}
</script>
```

## 处理Vue事件
你会注意到在整个文档中，一些 Quasar 组件有一个部分叫做 "Vue事件"。

"Vue事件 "的示例。

| 事件名称 | 描述 |
| `@show` | 模态显示后立即触发。|
| `@hide` | 在隐藏模态后立即触发。|
为了捕捉这些事件，当它们被触发时，你将需要在HTML模板中为组件本身添加监听器。下面是一个示例：



```html
<template>
  <q-bogus @show="doSomething" @hide="doSomethingElse" />
</template>

<script>
export default {
  setup () {
    function doSomething () {
      // 此方法已被调用(在此情况下)。
      // 因为@显示事件是由QBogus组件触发的
    }

    function doSomethingElse () {
      // 此方法已被调用(在此情况下)。
      // 因为@hide事件是由QBogus组件触发的
    }

    return {
      doSomething,
      doSomethingElse
    }
  }
}
</script>
```
