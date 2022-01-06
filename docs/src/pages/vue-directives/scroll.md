---
title: 指令性的v-scroll
desc: Vue指令，当用户滚动时触发一个事件。
keys: scroll
related:
  - /vue-directives/scroll-fire
  - /vue-components/scroll-observer
---

这是一个Vue指令，它需要一个参数(一个函数)，并在用户滚动包含该DOM节点的页面时启动。

::: tip TIPS
* 使用这个指令的一个替代方法是在你的页面上放置一个[QScrollObserver](/vue-components/scroll-observer) 组件。
* 还有一个与滚动有关的指令叫做[Scroll Fire](/vue-directives/scroll-fire)。
:::

## Scroll API

<doc-api file="Scroll" />

## 用法

```vue
<template>
  ...
  <div v-scroll="onScroll">...</div>
  ...
</template>

<script>
export default {
  setup () {
    function onScroll (position) {
      // 当这个方法被调用时，意味着用户
      // 已将页面滚动到`位置`。
      //
      // `位置`是一个整数，指定当前的
      // 滚动位置，单位为像素。
    }

    return { onScroll }
  }
}
</script>
```

```js
import { debounce } from 'quasar'

export default {
  setup () {
    function onScroll (position) {
      // 当这个方法被调用时，意味着用户
      // 已将页面滚动到`位置`。
      //
      // `位置`是一个整数，指定当前的
      // 滚动位置，单位为像素。
    }

    return {
      onScroll: debounce(onScroll, 200) // debounce for 200ms
    }
  }
}
```

### 确定滚动容器
请阅读[这里](/vue-components/scroll-observer#determining-scrolling-container)关于Quasar如何确定将滚动事件附加到的容器。
