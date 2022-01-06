---
title: 屏幕插件
desc: Quasar插件，有助于通过Javascript代码编写动态和响应式UI。
---
Quasar Screen插件允许你在处理Javascript代码时拥有一个动态的、响应式的用户界面。在可能的情况下，出于性能的考虑，建议使用[响应式CSS类](/style/visibility#window-width-related)代替。

## 安装
你不需要做任何事情。屏幕插件会自动安装。

## 使用方法
注意下面的`$q.screen`。这只是一个简单的使用示例。

```html
<q-list :dense="$q.screen.lt.md">
  <q-item>
    <q-item-section>John Doe</q-item-section>
  </q-item>

  <q-item>
    <q-item-section>Jane Doe</q-item-section>
  </q-item>
</q-list>
```

```js
// Vue组件的脚本部分
import { useQuasar } from 'quasar'
import { computed } from 'vue'

export default {
  setup () {
    const $q = useQuasar()
    const buttonColor = computed(() => {
      return $q.screen.lt.md
        ? 'primary'
        : 'secondary'
    })

    return { buttonColor }
  }
}
```

我们也可以在Vue组件之外使用Screen插件。

```js
import { Screen } from 'quasar'

// Screen.gt.md
// Screen.md
// 屏幕.名称('xs', 'sm', ...)。
```

## 身体类

**如果你启用它(见下面示例后的操作方法)**，你还可以根据应用于document.body的一组特定的CSS类来设计你的内容：`screen-xs`, `screen-sm`, ..., `screen-xl`。

```css
body.screen--xs {
  .my-div {
    color: #000;
  }
}

body.screen--sm {
  .my-div {
    color: #fff;
  }
}
```

或者在Sass中的一个性感的变体。

```sass
.my-div
  body.screen--xs &
    color: #000
  body.screen--sm &
    color: #fff
```

### 如何启用主体类

为了启用上述行为，请像下面这样编辑你的/quasar.conf.js文件。请注意，这将使 "第一次有意义的绘画 "的时间稍有增加。

```js
// 文件：/quasar.conf.js

framework: {
  config: {
    screen: {
      bodyClasses: true // <<< add this
    }
  }
}
```

## 配置
有几种方法可以用来调整屏幕插件的工作方式。

| 方法 | 描述 | 示例 |
| --- | --- | --- |
| setSizes(Object) | 改变窗口断点；不改变CSS断点。| setSizes({ lg: 1024, xl: 2000 }) |
| setDebounce(Number) | 将默认的100ms去重改为其他值。| setDebounce(500) // 500ms |

示例：

```js
// 在一个Vue组件内：
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 })
}

// 在Vue组件之外：
import { Screen } from 'quasar'
Screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 })
```

## API
<doc-api file="Screen" />
