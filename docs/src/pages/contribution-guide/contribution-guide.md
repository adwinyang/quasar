---
title: 贡献指南
desc: 如何为 Quasar 框架做出贡献。
---

本指南涵盖了您可以成为 Quasar 持续发展的一部分的方式。

但是，在我们开始之前，首先要注意的是。每个在 Quasar 上互动的人都要遵守[Quasar行为准则](https://github.com/quasarframework/quasar/blob/dev/.github/CODE_OF_CONDUCT.md) 。

现在我们已经解决了这个问题，让我们开始吧！

阅读本指南后，您会了解：

* 如何使用 github 来报告问题。
* 如何克隆 master 并运行测试套件。
* 如何帮忙解决存在的问题。
* 如何为 Quasar 文档做出贡献。
* 如何创建 Quasar App Extension。
* 如何贡献 Quasar 代码 代码。

 Quasar 不是“别人的框架”。许多人为 Quasar 作出了贡献，从单个角色到大规模的架构变化或重大文件 -- 所有这些都是为了让 Quasar 更好地为服务于每个人。即使您还不能胜任编写代码或文档，您也可以通过各种方式做出贡献，在报告问题到测试修补程序。

## 帮助支持

其中一个最简单的贡献方式是回答不同问答系统中的问题。通过回答你知道答案的问题，甚至通过添加你的最佳猜测，成为 Quasar 社区中一个支持和积极的成员。参加这样的讨论也可以是一次很好的学习经历。这是双赢的！

以下是我们的讨论/问答场所：

* [论坛](https://forum.quasar.dev/) ：提出问题的最佳地点并获得关于 Quasar 及其生态系统的答案。
* [聊天](https://chat.quasar.dev/) ：Quasar Devs 满足实时聊天的地方。

## 分享(并构建)您的体验

除了在论坛和聊天中的回答问题和共享资源外，还有其他一些不太明显的方式分享和扩展你所知道的东西：

* **开发学习资料**。经常说，学习的最佳方式是教。如果您有一些有趣的东西，您可以通过 Quasar 进行，通过撰写博客文章，开发研讨会，甚至发布您在社交媒体上分享的GIST来加强您的专业知识。
* **分享您的技术堆栈**。展示其他技术经过良好的技术，可以与按 Quasar 集成。推广您的项目和[填写您最喜欢的基于准堆栈](https://stackshare.io/tool/quasar-framework/decisions) 。请务必提及@quasarframework和所有其他相关技术。
* **观看您关心的回购**。这将在该存储库中的活动时发送通知，为您提供关于正在进行的讨论和即将到来的功能的内幕知识。这是建立专业知识的绝佳方式，以便您最终能够帮助解决问题和拉拔请求。

## 报告一个问题

* [github](https://github.com/quasarframework/quasar/issues) ：如果您有一个错误来报告或要求的功能，那就是Github问题所适用的。确保您指定您的错误与准v2相关。

::: danger Reporting a vulnerability
请不要将安全漏洞公布在 github 问题列表中。 请遵循安全问题的[报告漏洞步骤](/security/report-a-vulnerability) 。
:::

如果您在 Quasar 中发现了一个不存在安全风险的问题，请在GitHub上的[Issues]下搜索(https://github.com/quasarframework/quasar/issues)检查它是否已在开发分支(`dev`)中得到响应或修复。

- [主存储库](https://github.com/quasarframework/quasar) 的问题列表是 **专用** 用于错误报告和功能请求。。不符合要求的问题将立即关闭。

  - 对于简单的初学者问题，您可以从[Quasar Discord chat](https://chat.quasar.dev) 获得快速答案。

  - 对于更复杂的问题，您可以使用[官方论坛](https://forum.quasar-framework.org/category/11/help) 。询问您的问题时，请务必提供足够的信息 -- 这使得其他人可以更轻松地帮助您！

- 检查问题是否与最新稳定版的 Quasar 版本可重复。如果您使用的是预发布，请说明您使用的特定版本。

- 所需**您清楚地描述了重现您运行的问题所需的步骤。虽然我们很乐意尽可能地帮助我们的用户，但诊断没有明确的再生步骤的问题是非常耗时的，并且根本不可持续。

- 仅使用再现意外行为所需的最小代码。一个好的错误报告应该隔离有意外行为的特定方法，并准确地定义了如何违反期望。您希望做些什么方法或方法，以及观察到的行为如何不同？更准确的是你隔离问题，我们可以调查速度越快。

- 没有明确的复制步骤的问题将不会被交。如果标记为“需要重新repro”的问题没有从发行作者中进一步输入超过5天，则将关闭。

- 如果您的问题已得到解决，但仍然是开放的，请随时关闭它。如果您自己找到了解决方案，请解释您的修复方式可能会有所帮助。

- 我们最重要的是，我们求耐心：团队必须平衡您的要求，以解决许多其他职责 - 修复其他错误，回答其他问题，新功能，新文档等。问题列表不是支付支持，我们无法保证如何保证快速您的问题可以解决，虽然我们做得最好。

## 帮助解决现有问题

作为一个超出报告问题的下一步，您可以通过提供关于它们的反馈来帮助Quasar Team解决现有的团队。如果您是新的标准开发，那可能是走第一步的好方法，您将熟悉代码库和流程。

如果您在[github问题](https://github.com/quasarframework/quasar/issues) 中查看问题列表，您会发现很多经需要关注的问题。你能为这些做点什么呢？实际上很多：

#### 验证错误报告

对于初学者，它有助于验证错误报告。您可以在自己的计算机上重现报告的问题吗？如果是这样，您可以向问题添加评论，说您正在看到同样的事情。

如果一个问题非常含糊，你可以帮助将其缩小到更具体的东西吗？也许您可以提供其他信息来帮助重现错误，或通过消除不需要展示问题的不必要步骤来帮助。

您可以做的任何事情都可以做出错误报告更加简洁或更容易重现帮助人们试图编写代码来修复这些错误 - 无论您最终还是自己编写代码。

#### 测试补丁

您还可以通过审查通过Github提交给 Quasar 的拉出请求来帮助解决。要应用某人的更改，您需要首先创建一个专用分支：
```bash
$ git checkout -b testing_branch
```

然后，您可以使用他们的远程分支来更新代码库。 例如，假设Github用户Johnsmith已被叉，并推送到位于https://github.com/johnsmith/quasar的主题分支“橙色”。
```bash
$ git remote add JohnSmith https://github.com/JohnSmith/quasar.git
$ git pull JohnSmith orange
```

在申请他们的分支后，测试它！ 以下是一些要思考的东西：

* 改变实际上是否有效？
* 它是否具有适当的文档覆盖范围？ 应该在其他地方进行文件吗？
* 您喜欢执行吗？ 你能想到更好或更快的方式来实现他们改变的一部分吗？

一旦你很高兴拉扯请求包含一个良好的变化，请评论指示您批准的GitHub问题。 您的评论应该表明您喜欢更改和您喜欢的内容。 就像是：

::: tip Example pull request comment
我喜欢你在卡中重组的代码的方式。 文档也更新。
:::

如果您的评论只是写简单写了 “+1”，那么其他评论者不会太认真对待它。 需表明您花了时间审核拉取请求。

## 为 Quasar 文档做贡献

您可以通过使其更加连贯，一致性或可读，添加缺少的信息，纠正事实错误，修复故意错误，或将其与最新的Edge Qualar更新。

::: tip Typos or small changes can be fixed directly from the documentation
在每个文档页面的右上角使用铅笔图标。 编辑源文件，预览更改，添加更改的描述，然后命中“提出文件更改”和“下一个屏幕”“创建拉请求”。
:::

对于较大的编辑，更改标准源文件(位于[这里](https://github.com/quasarframework/quasarframework/quasar/tree/dev/docs/src/pages)) 。

### 文档最佳实践

随着时间的推移，我们整合了一组规则，遵循这些规则将加速合并过程：
- 大写标题，见[如何使用我的标题大写](https://capitalizemytitle.com/) 。
- 使用现在的时态。
- 简明扼要，避免文本/代码复制。
- 链接到用作主信息源的外部源，通常更频繁地更新，如[Mozilla MDN](https://developer.mozilla.org/en-us/docs/web/javascript)，[Vue。 JS API](https://v3.vuejs.org/api/) 而不是编译的教程很快就会过时。
- 打开PR之前进行校对
- 不要从其他来源重复文本，但只保留相关的东西，这些内容在上下文特定功能中
- 使用官方名称。例如，使用`firebase`而不是`firebase`
- 从 PR 中排除所有草稿和未完成的页面

#### 分支

导航到 Quasar [github存储库](https://github.com/quasarframework/quasar) ，然后按右上角的“fork”。

::: warning Select dev branch
确保选择了`dev`分支，所有工作都在这里完成。
:::

#### 克隆分支的存储库
为了能够更改文档，您需要克隆分支存储库：

```bash
$ git clone https://github.com/your-user-name/quasar.git
$ git checkout dev
```

#### 安装依赖项

安装所需的依赖项。
```bash
$ cd quasar/docs
$ yarn # or npm install
```

#### 针对本地存储库运行文档

```bash
$ quasar dev
```

文档运行针对本地克隆的存储库。

#### 在本地编辑和测试您的更改

#### 提交更改

当您对计算机上的更改感到满意时，您需要将更改提交到 Git 上：

```bash
$ git commit -a
```

这将启的编辑器来提交消息。 完成后，保存并关闭以继续。

#### 更新您的本地存储库

在你工作的时候，很可能对掌握的其他变化发生了。 去找它们。

1. 添加一个远程 Quasar 存储库作为上游

```bash
$ git remote add upstream https://github.com/quasarframework/quasar.git
```

2. 查看您的 fork 本地 `dev` 分支。

```bash
$ git checkout dev
> Switched to branch 'dev'
```

3.将`upstream/ dev` 的更改合并到您本地的 `DEV` 分支中。 这将您的 fork 的`dev`分支与上游存储库同步，而不会丢失本地的更改。

```bash
$ git merge upstream/dev
```

有冲突没有？测试通过了？改变似乎对你来说似乎是合理的吗？然后继续开启并打开Pull请求以将更改应用于MainQuasar存储库中的 dev 分支。

#### 发出拉取请求

导航到您的存储库，您只推向(例如https://github.com/your-user-name/quasar)，然后单击左上面板中看到的“新拉索请求”。

确保包含您介绍的更改集。填写有关您潜在补丁的一些细节，包括有意义的标题。完成后，按单击“创建拉请求”。将通知Quasar Core团队对您的提交。

## 写下你的故事

我们一直在寻找伟大的笔记本，即如何使用 Quasar 或者您与 Quasar 的伟大经历。如果您编写文章，我们将在我们的中型出版渠道上发布它，我们还将确保您的文章引起了我们的社交媒体存在的关注。如果您有兴趣，请联系博客(at)quasar.dev。我们很乐意听取您的意见！

## 创建新的 Quasar 应用程序扩展

开始为准贡献的简单方法是概括您在项目上创建的代码，并将其发布为 Quasar 应用程序扩展名。遵循本指南有关如何 [创建新的扩展](/app-extensions/development-guide/introduction) 。

完成后，提交[Quasar Awesome](https://github.com/quasarframework/quasar-awesome/blob/master/readme.md#community-app-extensions) ，通过[Quasar Forum]共享您的成就( https://forum.quasar-framework.org/category/15/v1-app-extensions) 。

## 为Quasar UI源代码贡献

与任何项目一样，有贡献的规则。我们在这里写的，请仔细阅读。之后，阅读[Quasar行为准则](https://github.com/quasarframework/quasar/blob/dev/.github/code_of_conemon.md) ，您将准备好为 Quasar 的核心存储库做出贡献。

文章[查看源代码](https://medium.com/quasar-framework/wip-look-at-the-source-code-please-1b905ea4906) 将帮助您熟悉标准代码库。

#### 拉请求指南

 - 从相关分支中结帐，例如： `dev`(qv2)或`v1`(qv1)，并合并回到该分支。

 -  **不要**在提交中检查 `dist`。

 - 在PR上工作时，可以让多个小型提交 - 我们将让GitHub在合并之前自动挤压它。

 - 如果添加新功能：
  * 提供令人信服的原因来添加此功能。理想情况下，您应该首先打开一个建议问题，并在处理它之前将其绿色绿色。

 - 如果修复错误：
  * 如果要解决特殊问题，请添加`(fix：#xxxx [，#xxx])`(#xxxx是您的PR标题中的发布ID)，以获得更好的发布日志，例如， `fix：更新编码/解码的实体(fix #3899)`。
  * 提供PR中的错误的详细描述。实时演示首选。

#### 开发设置

您需要[node.js](http://nodejs.org)版本** 12.22.1 + **沿 [yarn](https://yarnpkg.com/) 或 [npm](https://docs.npmjs.com/getting-started/installing-node) 。读取`package.json`并注意您可以使用的脚本。

克隆存储库后运行：

```bash
$ cd ui
$ yarn # or: npm install
```

#### 常用的NPM脚本

```bash
# 用一个演示应用程序启动开发服务器。这个应用直接链接了 Quasar 的源代码，所以任何改变都会在开发服务器上触发HMR(Hot Module Reload)。
# 每个功能都有一个部分，在那里进行测试。
$ yarn dev # or: npm run dev

# 构建所有的dist文件，包括npm包
$ yarn build      # or: npm run build
# 仅构建 js dist 文件
$ yarn build js   # or: npm run build js
# 仅构建 css dist 文件
$ yarn build css  # or: npm run build css

# lint sources
$ yarn lint # or: npm run lint
```

#### 项目结构(/ UI)

- `build` - 包含与构建相关的配置文件。在大多数情况下，您不需要触摸它们。

- `src` - 包含源代码，显然。 CodeBase是用ES2015编写的。

  - `components` - JS，SASS和JSON(API)文件用于准vue组件

  - `composables` - “ Quasar 的兼容”组成API

  - `directives` - “ Quasar 提供的Vue指令

  - `plugins` - “ Quasar 插件”

  - `CSS` - 标准主题的SASS定义和核心代码

  - `ults`  - 框架使用的实用程序并导出到公共API

- `lang` -  Quasar Language Packs

- `icon-set` -  Quasar图标集

- `dist`  - 包含用于分发的内置文件(仅在构建后)。注意此目录仅在发布发生时更新;他们没有反映发展分支机构的最新变化。

 - `dev`  - 应用程序与标准源直接用于测试目的。每个功能/组件都有自己的`* .vue`文件。添加新文件会自动为其创建路由，并将其添加到“主页”列表(基于文件名)。

#### Quasar(/ui) 的 dev服务器

运行`yarn dev`(或`npm run dev`)会启动一个使用HMR(Hot Module Reload)作为 Quasar 源代码的开发服务器。您可以通过对 `/dev` `*.vue` 文件进行必要的更改来轻松测试您的更改。

## Quasar 贡献者

感谢所有为[Quasar作出贡献的人](https://github.com/quasarframework/quasar/graphs/contributors) ！
