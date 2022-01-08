---
title: 用于 Quasar 的Vite插件
desc: 如何将 Quasar 嵌入到Vite应用程序中。
components:
  - vite-plugin/VitePluginUsage
---

如果你想把 Quasar 嵌入到你现有的[Vite](https://vitejs.dev)项目中，那么请按照这个指南来安装和使用`@quasar/vit-plugin`。
我们的Vite插件所提供的是 Quasar 的树形抖动和Quasar Sass变量的整合。

::: warning Warning! Current limitation:
目前还不支持带有Quasar Vite插件的SSR构建。
:::

> Vite的跨平台支持是由社区插件处理的。这些插件没有像 Quasar CLI 那样与 Quasar 紧密结合，可能会有问题。这就是为什么我们建议使用 Quasar CLI ，以获得最佳的开发体验。此外，我们还计划发布一个** Quasar CLI ，在引擎盖下使用Vite**而不是Webpack。

## 创建一个Vite项目

```bash
# yarn
$ yarn create vite my-vue-app --template vue

# or npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm init vite@latest my-vue-app -- --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

对于官方(和完整的)指南，请访问[Vite指南的脚手架](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)一个Vite项目。**在询问时选择 "Vue "**。

## 安装

导航到你的Vite项目文件夹并安装必要的软件包。

::: tip
* 注意，`@quasar/extras`是可选的。
* 另外，只有当你想使用Quasar Sass/SCSS的变量时，才添加`sass@1.32.0`(注意是销号的)。
:::

```bash
$ yarn add quasar @quasar/extras
$ yarn add -D @quasar/vite-plugin sass@1.32.0

# or
$ npm install quasar @quasar/extras
$ npm install -D @quasar/vite-plugin sass@1.32.0

# or
$ pnpm add quasar @quasar/extras
$ pnpm add quasar -D @quasar/vite-plugin sass@1.32.0
```

## 使用 Quasar

我们已经建立了一个配置器来帮助你尽快开始使用。

<vite-plugin-usage />

## RTL支持

如果要启用，请查看我们的[RTL支持](/options/rtl-support)页面并按照说明操作。

## 为生产而构建时的警告

当为生产构建时，你可能会注意到下面的警告。你可以安全地忽略它。这是一个已知的[Vite问题](https://github.com/vitejs/vite/issues/4625)。

```
warnings when minifying css:
 > <stdin>:32:0: warning: "@charset" must be the first rule in the file
    32 │ @charset "UTF-8";
       ╵ ~~~~~~~~
   <stdin>:9:0: note: This rule cannot come before a "@charset" rule
     9 │ .material-icons {
```
