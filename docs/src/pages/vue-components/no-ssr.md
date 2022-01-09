---
title: 无SSR
desc: QNoSsr Vue组件使得区分服务器端和客户端的内容变得容易。
keys: QNoSsr
related:
  - /quasar-cli/developing-ssr/introduction
---
QNoSsr组件只有在你创建一个SSR网站/应用程序时才有意义。

它避免了在服务器上渲染其内容，而只留给了客户端。当你得到的代码不是同构的，只能在浏览器中的客户端运行时，它很有用。

另外，你也可以用它来只在服务器端渲染内容，如果它最终在客户端浏览器上运行，它会自动将其删除。

## QNoSsr API

<doc-api file="QNoSsr" />

## 使用方法

### 基础

```html
<q-no-ssr>
  <div>This won't be rendered on server</div>
</q-no-ssr>
```

### 多个客户节点

```html
<q-no-ssr>
  <div>This won't be rendered on server.</div>
  <div>This won't either.</div>
</q-no-ssr>
```

### 多个客户节点的标签属性

```html
<q-no-ssr tag="blockquote">
  <div>This won't be rendered on server.</div>
  <div>This won't either.</div>
</q-no-ssr>
```

### 占位符属性

```html
<q-no-ssr placeholder="Rendered on server">
  <div>This won't be rendered on server</div>
</q-no-ssr>
```

### 占位槽

```html
<q-no-ssr>
  <div>This won't be rendered on server</div>
  <template v-slot:placeholder>
    <div>Rendered on server</div>
  </template>
</q-no-ssr>
```

### 占位符插槽中的多个内容

```html
<q-no-ssr>
  <div>This won't be rendered on server</div>
  <template v-slot:placeholder>
    <div>Rendered on server (1/2)</div>
    <div>Rendered on server (2/2)</div>
  </template>
</q-no-ssr>
```

### 只有占位符插槽

```html
<q-no-ssr>
  <template v-slot:placeholder>
    <div>Rendered on server</div>
  </template>
</q-no-ssr>
```
