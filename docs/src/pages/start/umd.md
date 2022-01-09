---
title: Quasar UMD - CDN安装
desc: 如何使用 Quasar 的统一模块定义形式。
components:
  - umd/UmdTags
---

如果你想把 Quasar 嵌入到你现有的网站项目中，以渐进的方式整合它，那么请选择UMD/Standalone(统一模块定义)版本。

## 安装
UMD是关于添加 Quasar 风格和javascript标签。请选择你要使用的内容，并查看它下面的输出。

<umd-tags />

::: warning
* 请注意文件开头的`<！DOCTYPE html>`。不要忘记添加它，否则一些浏览器(特别是Safari)会使用一些破坏灵活性的兼容模式。
* 如果你使用的是RTL Quasar语言包(例如希伯来语)，那么也要切换上面的 "RTL CSS支持"!
* 不要使用自我封闭的标签，如`<q-icon ... />`. 相反，要使用`<q-icon ...></q-icon>`。
:::

::: tip
所有组件、指令和 Quasar 插件都可以开箱即用。不需要额外的代码来安装它们。只要确保你不会使用自闭标签。
:::

## JsFiddle / Codepen
你也可以在GitHub上分叉并使用这些链接来报告问题。

| Supplier | URL |
| --- | --- |
| jsFiddle | [https://jsfiddle.quasar.dev](https://jsfiddle.quasar.dev) |
| Codepen | [https://codepen.quasar.dev](https://codepen.quasar.dev) |

这些链接(显然)使用的是Quasar UMD版本。

## Quasar全局对象
当你把Quasar UMD嵌入到一个网页中时，你会得到一个`Quasar`全局对象的注入。

```js
Quasar = {
  version, // Quasar version

  ...components,
  ...directives,
  ...plugins, // Quasar plugins
  ...utils, // Quasar utils

  // 如果你想改变当前的图标集或 Quasar 语言包
  // (必须包括CDN链接，以便它们首先可用！)
  lang,
  iconSet
}
```

一些使用实例：

```js
Quasar.QBtn
Quasar.getCssVar('primary')
Quasar.debounce(fn, 200)
Quasar.Notify.create('Hi and welcome!')
```

## Quasar 配置对象
有一些Quasar & Quasar插件的配置选项。

```js
app.use( Quasar , {
  config: {
    brand: {
      primary: '#e46262',
      // ...或所有其他品牌的颜色
    },
    notify: {...}, // Notify Quasar 插件的默认选项集
    loading: {...}, // Loading Quasar 插件的默认选项集
    loadingBar: { ... }, // LoadingBar Quasar 插件的默认选项集
    // ...还有更多
  }
})
```

## 用法
所以，在你想出需要嵌入到你的网页中的CDN链接后，现在是使用 Quasar 的时候了。

::: tip
你会注意到，所有的 Quasar 组件、 Quasar 指令和 Quasar 插件在其页面的顶部都有一个安装部分。
:::

通过使用UMD版本，你将有所有的组件、指令和 Quasar 插件已经为你安装。你只需要开始使用它们。

**在UMD版本中不要使用自闭标签：**。
你会注意到，你将不能使用任何组件的自我关闭标签形式。你必须关闭所有组件的标签。

```html
<!-- 不正确的用法：在文档中，但对于 Quasar CLI 用法 -->
<q-btn label="My Button" />
<!-- ^^^ 不能在 UMD 上这样使用它 -->

<!-- 正确用法：相反，也包括一个自闭合标签：-->
<q-btn label="My Button"></q-btn>
```

### Quasar 组件
一个示例。在UMD版本中不需要安装任何组件。

```html
<q-btn label="My Button"></q-btn>
```

### Quasar指令
一个示例。在UMD版本中不需要安装任何指令。

```html
<div v-ripple>...</div>
```

### Quasar Plugins
一个示例。在UMD版本中不需要安装任何插件。

```js
Quasar.BottomSheet.create({...})
```

### Quasar Utils
一个示例。

```js
Quasar.openURL('https://quasar.dev')
```

### 改变 Quasar 图标集
假设你已经包含了你最喜欢的 Quasar 图标集的CDN链接(除非你使用的是默认使用的Material Icons)，那么你就可以告诉 Quasar 使用它。

```js
Quasar.iconSet.set(Quasar.iconSet.fontawesomeV5)
```

可用的[Quasar图标集](/options/quasar-icon-sets) 列表可以在[GitHub](https://github.com/quasarframework/quasar/tree/dev/ui/icon-set) 上找到。

### 改变 Quasar 语言包
假设您已经包含了您想要的Quasar I18n语言的CDN链接(除非您想要默认使用的 "en-US "语言包)，您可以告诉 Quasar 使用它。

```js
// 示例设置德语。
// 使用ISO 2字母代码。
Quasar.lang.set(Quasar.lang.de)

// 示例设置葡萄牙语(巴西)语言。
Quasar.lang.set(Quasar.lang.ptBR)
```

可用的语言列表可以在[GitHub](https://github.com/quasarframework/quasar/tree/dev/ui/lang) 上找到。**如果你想要的语言包还没有，你可以通过提供一个PR来帮助我们**。我们欢迎任何语言!
