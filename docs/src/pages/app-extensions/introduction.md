---
title: 应用扩展
desc: Quasar 应用扩展是什么，它们如何帮助你和社区。
---

App Extensions 是一种轻松注入具有各种依赖项、启动文件、模板和自定义逻辑的复杂(或简单)库的方法。他们可以扩展 webpack、`quasar.conf.js`，将外部 UI 组件紧密耦合到核心，甚至可以使用 Quasar CLI 注册新命令。它们可以与 `quasar dev` 一起运行，并且可以完全访问当前实时的 `ctx`(上下文)。

这些开发模式为Quasar打开了闸门，使其成为最具扩展性和最强大的框架之一 -- 现在只受限于你的想象力和创新。本页将向您介绍App Extensions的用法。

::: warning
应用程序扩展是专门为**Quasar CLI设计的**。这意味着您将无法通过 Quasar Vite 插件或 Vue CLI 或 UMD 环境来安装或运行它们。
:::

## 应用程序扩展可以做什么？

1. 用新的命令增强CLI行为
2. 制作一个Quasar UI插件
3. 安装一个配套的应用程序
4. 创建并分享一个自定义组件
5. 创建并分享添加到框架或其他应用程序的功能
6. 建立、启动和控制一个API服务器
7. 钩住、组合和扩展Quasar核心组件
8. 根据Quasar环境之外的动态变化的值来修改代码
9. 9.创建和管理平台特定接口的抽象概念
10. ...还有更多

应用扩展**取代了创建自定义启动包的需要**。 你在官方启动包上添加的任何东西都可以以应用扩展的形式出现。这也消除了保持非官方启动包与官方启动包同步的维护费用，因此我们可以确保每个开发者都能获得最新、最棒的Quasar规格。

## App Extension ext-id
所有的应用程序扩展必须在其名称前加上 "quasar-app-extension-"。这个前缀之后的所有内容都被认为是它的简短别名。我们在整个文档中称其为`ext-id'。

示例：
* `quasar-app-extension-awesomeness`的ext-id是`awesomeness`。
* `@some-npm-org/quasar-app-extension-awesomeness`的外部id是`@some-npm-org/awesomeness`。

这种命名方案的好处之一是，它使 Quasar 应用扩展在搜索其 npm 包时易于发现。[App Extension - Discover](/app-extensions/discover)。

## 剖析应用扩展
应用扩展可以被安装、执行，也可以被卸载。下面的指南以抽象的方式进行讨论。关于各个扩展的细节以及如何使用它们，请查阅它们各自的仓库。

### 安装一个应用程序扩展

```bash
$ quasar ext add <ext-id>.
```

这个命令将找到并安装扩展的模块。安装完成后，可能会有一个或多个提示，要求你做出选择或添加扩展所需的信息。安装结束后，你将返回到命令行。

### 列出已安装的应用程序扩展

有几种方法可以 "发现" 已经安装了哪些应用扩展。

```bash
$ quasar ext
$ quasar info
$ cat quasar.extensions.json
```

### "运行"应用程序扩展
运行应用扩展的方法并不单一，因为有些应用扩展甚至可能没有任何代码可供运行(即仅仅是复制到项目中特定文件夹的模板文件)，而有些应用扩展可能仅仅是安装助手，有些则可能选择在Quasar CLI中添加一个新命令。

尽管如此，每一个应用扩展都将在`quasar dev`和`quasar build`中被初始化。

### 更新一个应用程序扩展
你可能需要更新你的扩展，这可以通过与安装相同的命令完成。

```bash
$ quasar ext add <ext-id>.
```

::: warning
重新安装扩展可能会覆盖你修改过的文件。你将会看到覆盖检测到的文件的选项。
:::

### 删除一个应用程序扩展
您可以通过运行这个命令从Quasar CLI中删除一个应用扩展的链接。根据作者和扩展本身的情况，你可能需要手动清理文件。

```bash
$ quasar ext remove <ext-id>.
```

## 官方应用程序扩展列表
请查看 [Discover App Extensions](/app-extensions/discover) 页面。
