---
title: 入门 - 挑选一种 Quasar 风格
desc: “通过选择其中一种风格开始使用 Quasar：Quasar CLI、Vue CLI 或 UMD”
---

**如果你想了解更多关于为什么选择Quasar**，那么请阅读[Quasar简介](/introduction-to-quasar) 。否则，让我们从选择如何使用 Quasar 开始吧。

有三种使用 Quasar 的方式。选择最适合你的一种：

- [UMD/Standalone](/start/umd) (通过CDN嵌入到现有项目中，逐步整合)
- [Quasar CLI](/start/quasar-cli) (**高级开发者体验，强烈推荐**)
- [Quasar Vite插件](/start/vit-plugin)
- [Vue CLI插件](/start/vue-cli-plugin)

这里有一个快速的比较：

| 特点 | Quasar UMD | Quasar CLI | Quasar Vite 插件 | Vue CLI 插件 |
| --- | --- | --- | --- | --- |
| 嵌入现有项目的能力  | **是** | - | **是的，如果是Vite应用**   | **是的，如果是Vue CLI应用** |
| 逐步整合 Quasar | **是** | - | - | - |
| 包括公共CDN中的Quasar | **是** | - | - | - |
| 建立SPA、PWA | **是** | **是** | **是** | **是** |
| 构建SSR(+可选的PWA客户端接管) | - | **是** | - | 是(*) |
| 通过 Cordova 或Capacitor建立移动应用程序 | **是** | **是** | 是(*) | 是(*) |
| 用HMR直接在你的手机上开发移动应用程序 | - | **是** | 是(*) | 是(*) |
| 通过Electron建立桌面应用程序 | - | **是** | 是(*) | 是(*) |
| 构建浏览器扩展 | - | **是** | 是(*) | 是(*) |
| Quasar **应用扩展** | - | **是** | - | - |
| 通过[Icon Genie CLI](/icongenie/introduction) 轻松管理应用程序的图标和启动画面 | - | **是** | - | - |
| Quasar组件的动态RTL支持 | **是** | **是** | - | **是** |
| 由 Quasar 自动生成您自己的网站/应用程序的RTL等效CSS规则 | - | **是** | - | **是** |
| 使用最新最好的 Quasar 规格，**确保一切“开箱即用”** | - | **是** | - | - |
| **构建模式之间的紧密集成**，充分利用 Quasar 的所有功能。| - | **是** | - | - |
| 一个代码库创建SPA、PWA、SSR、移动应用、Electron应用和浏览器扩展 | - | **是** | - | - |
| 树状摇动（Tree Shaking）     | - | **是** | **是** | **是** |
| 支持SFC(单文件组件-适用于Vue) | - | **是** | **是** | **是** |
| 通过动态的quasar.conf.js进行高级配置 | - | **是** | - | - |
| 支持单元和端到端测试 | - | **是** | **是** | **是** |
| 支持TypeScript | - | **是** | **是** | **是** |
| **最佳和最受欢迎的选择！** | **是的！** |
| | Quasar UMD | Quasar CLI | Quasar Vite plugin | Vue CLI Plugin |


::: tip (*)重点!
尽管你可以通过Vue CLI和一些Vue社区构建的插件获得类似的多平台支持，但这些第三方支持的构建路径并没有与 Quasar 的组件紧密结合。因此，当你在使用这些第三方插件时遇到问题，你将不得不依赖各个插件开发者的支持。有了 Quasar ，如果出现任何问题，你就有了一个一站式的服务。此外， Quasar CLI 确保应用程序在性能、项目规模和最佳实践方面都能达到最佳标准。你在其他地方找不到这样的保证。
:::

因此，让我们用**Quasar的CLI**来帮助你吧! 你将在几分钟内启动并运行一个新的项目。

<q-btn push no-caps color="brand-primary" ic-right=" launch" label="Install Quasar CLI" to="/quasar-cli/installation" class="q-mt-sm q-mb-lg" />
