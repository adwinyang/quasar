---
title: 测试与审计
desc: 如何对 Quasar 应用程序进行单元和端到端测试，以及如何对质量和安全进行审计。
---

你的 Quasar 项目有能力添加单元和e2e测试线束。本介绍将不涉及如何编写和使用测试的细节，为此请查阅[GitHub上的测试 repo](https://github.com/quasarframework/quasar-testing/tree/next) 中专门编写和维护的文档。如果你是一个初学者，可以考虑阅读 "进一步阅读" 部分中的书籍。

## 高级概述

你可以通过运行一个简单的命令来为你现有的 Quasar 应用程序安装多个预操纵的测试线束。这个命令将拉动并安装一个节点模块(含依赖关系)到你的项目的`package.json`中，适当地放置必要的配置文件，如果你选择的话，它还将添加脚本命令，暴露各自线束的一些功能。你可以添加多个线束，甚至将它们用于你的持续集成管道--视情况而定。

测试本身并不难。最复杂的部分是设置测试线束。诀窍在于知道要测试什么。如果你是测试的新手，绝对有必要让自己熟悉一些概念和模式。在本文档页面的末尾，有一些进一步阅读的链接。

## 测试文档

一些与Qv2兼容的测试AE目前处于alpha或beta阶段，现有的文档网站 (https://testing.quasar.dev) 仍然参考 Qv1 AEs。
你可以在quasar-testing repo的`next`分支中找到更新的文档。

<q-btn color="brand-primary" label="Testing repo @next branch" ic-right=" launch" no-caps href="https://github.com/quasarframework/quasar-testing/tree/next" target="_blank" />

## 安装

```bash
$ cd your-quasar-project
$ quasar ext add @quasar/testing
```

轻量级扩展安装程序会问你想安装哪些测试线束。然后它将为这些线束安装各自的扩展，你可以根据自己的需要进行配置。这就是在一个 Quasar 项目中管理多个测试线束的理想方式。

它将为你提供一个新的`quasar run`命令，你可以用它来执行测试运行器--甚至同时执行你的HMR开发环境。例如，如果你需要将quasar.ctx传递给测试运行器，这种方法会很有帮助...

```bash
# 以 pwa 模式运行 jest && dev 服务器的示例
$ quasar test --unit jest --dev="-m pwa"
```

如果你需要审查你的选择，你可以看一下`quasar.extensions.json`。

如果你不想安装基本软件包，你不需要这样做。你可以单独安装每个测试线束应用程序扩展。它们是完全独立的，但你不会有与`quasar test`命令功能的紧密结合。

## 进一步阅读

### 书籍
- [测试 Vue.js 应用程序](https://www.manning.com/books/testing-vue-js-applications) ，作者是Edd Yerburgh，`@vue/test-utils` repo的作者。
- [免费Vue测试手册](https://lmiller1990.github.io/vue-testing-handbook/)

### 教程
- [用Jest对Vue Router进行单元测试](https://medium.com/js-dojo/unit-testing-vue-router-1d091241312)
- ...在这里添加你的建议

### 文档
- [@vue/test-utils](https://vue-test-utils.vuejs.org)
- [jest 24](https://facebook.github.io/jest/)
- [cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Is-Simple)
- [lighthouse](https://developers.google.com/web/tools/lighthouse/#cli)
- [snyk](https://snyk.io/test)
- [nlf](https://www.npmjs.com/package/nlf)
- [Chai](http://www.chaijs.com/)
- [istanbul](https://istanbul.js.org/)
