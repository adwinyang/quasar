---
title: Quasar Plugin CLI视图
desc: 如何将 Quasar 嵌入到Vue CLI应用中。
---

::: warning
Vue CLI的跨平台支持是由一些社区插件处理的。这意味着，将 Quasar 提供的开箱即用的功能放在一起将花费你额外的时间和精力，并不能保证你获得最好的体验，而且你将无法使用只有 Quasar CLI 才有的一些功能。Quasar也没有专门对这些插件进行测试，因此你有可能遇到问题。然而，这对任何组件库都是有效的，除非他们特别提到已经用第三方插件测试了他们的组件。

因此，在你开始使用 Quasar 进行开发的这条道路之前，我们希望你能理解以下几点。为了保证你在使用 Quasar 时有最好的开发者体验，我们强烈建议你使用 Quasar 的CLI，并用它来构建你的项目，因为你不会错过Vue CLI的任何功能。你会得到 Quasar 提供的全部功能，比如完全的跨平台构建支持(但这只是冰山一角)，而且你也可以做几乎所有你想用Vue做的事情，即通过 Quasar 的[Boot Files](/quasar-cli/boot-files#Anatomy-of-an-boot-file) 使用Vue插件。
:::

要通过Vue CLI插件与 Quasar 一起工作，你需要确保你在全局范围内安装了@vue/cli。为了确保你有正确的版本，请使用这个命令。

```bash
$ vue --version
```

如果你安装了Vue CLI 2.x.x.，你就需要用卸载它。

```bash
$ npm uninstall -g vue-cli
# or (depending with which you've installed it)
$ yarn global remove vue-cli
```

安装Vue CLI(v4.5.11以上)，如下所示。

```bash
$ npm install -g @vue/cli
```

如果你还没有用@vue/cli创建一个项目，那么就用下面的命令来做。**确保你在屏幕上出现的Vue CLI功能列表提示中勾选Babel**。

```bash
# 当被问及以下问题时，请确保选择Vue 3：
$ vue create my-app
```

## 添加Vue CLI Quasar插件
导航到新创建的项目文件夹并添加cli插件。在安装它之前，请确保提交你当前的修改，如果你想在以后恢复它们。

::: warning
Vue CLI的跨平台支持是由社区插件处理的。这些插件没有像 Quasar CLI 那样与 Quasar 紧密结合，可能会有问题。
:::

```bash
$ cd my-app
$ vue add quasar
```

CLI会问你是否希望该插件替换一些现有的文件。建议你这样做，如果你希望有一个示例，那么你可以快速开发你的应用程序。

你的Vue配置(在package.json或vue.config.js文件中，取决于你在创建vue应用时的选择)也将包含一个`quasar`对象，包含一些基本的 Quasar 配置。
