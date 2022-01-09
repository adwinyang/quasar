---
title: 动画
desc: Animate.css 为 Quasar App 提供的辅助 CSS 动画。
---

CSS 过渡(Transitions)可由 [Vue 过度组件](https://v3.vuejs.org/guide/transitions-overview.html) 处理。 过度用于进入(出现)或离开(消失)的动画。

然而，Quasar 提供一个大的的、可使用的 CSS 动画列表。 动画效果借鉴自 [Animate.css](https://animate.style/) 。 因此，有 80 多种动画类型可供您开箱即用。 请在 Animate.css 网站上或本页面的演示中查看该列表。

> 请参阅 [Vue](https:/v3.vuejs.org/api/built-in-components.html#transition) 文档，了解如何使用 Vue 提供的`<transition>` 组件。

## 安装
编辑 `/ quasar.conf.js`。
```js
// 嵌入所有动画
animations: 'all'

// 或只嵌入特定的动画
animations: [
  'bounceInLeft',
  'bounceOutRight'
]
```

如果您正在构建一个网站，您还可以跳过配置 quasar.conf.js 并使用指向 Animate.css 的 CDN 链接，如下所示(以下只是一个示例，请使用搜索引擎获取最新链接)。 请记住，这需要您的用户连接到 Internet，而不是在 quasar.conf.js 中捆绑。

```html
<!-- src/index.template.html -->
<head>
  ...

  <!-- Animate.css 的 CDN 示例 -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
  >
</head>
```

::: warning
需要注意的是，当你通过 `<link>` 标签导入 Animate.css 时，所有动画 CSS 类都必须以 `animate__` 为前缀。这是 Animate.css 从 v3 到 v4 迁移的重大变化。如果你想避免使用前缀，你可以导入[兼容版本](https://animate.style/#migration) 。但是，如果您使用的是 **Quasar CLI**，则无需进行其他更改。
:::

## 用法
注意实际动画名称前面的字符串“animated”。

```html
<!-- 仅包装一个DOM元素/组件的示例 -->
<transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <!-- 仅包装一个DOM元素，由QBtn定义 -->
  <q-btn
    color="secondary"
    icon="mail"
    label="Email"
  />
</transition>
```

### 包装多个元素
您还可以对过渡中的组件或DOM元素进行分组，以便对所有组件或DOM元素同时应用相同的效果。

```html
<!-- 包装多个DOM元素/组件的示例 -->
<transition-group
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <!-- 我们包装了一个“p”标签和一个 QBtn -->
  <p key="text">
     Lorem Ipsum
  </p>
  <q-btn
    key="email-button"
    color="secondary"
    icon="mail"
    label="Email"
  />
</transition-group>
```

请注意上面的示例中的几点：

1. 注意使用 `<transition-group>` 代替 `<transition>`。
2. 组件和DOM元素必须设置键，如上面示例中的 `key=“text”` 或`key=“email button”` 等。
3. 上面的两个示例都指定了 Boolean 属性 `appear`，这使得进入动画在组件渲染后立即生效。此属性是可选的。

