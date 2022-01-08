---
title:  Quasar CLI 安装
desc: 如何在你的开发机器上安装 Quasar CLI 。
---

确保你的机器上安装了Node >=12.22.1和NPM >=6.14.12。

::: warning
**不要使用不均衡的Node版本，如13、15等。**这些版本没有经过 Quasar 的测试，由于其实验性质，经常会出现问题。我们强烈建议始终使用Node的LTS版本。
:::

```bash
# Node.js >=12.22.1 is required.

$ yarn global add @quasar/cli
# or
$ npm install -g @quasar/cli
```

::: tip
如果你使用Yarn，确保Yarn [全局安装位置](https://yarnpkg.com/lang/en/docs/cli/global/)在你的PATH中。

```bash
# in ~/.bashrc or equivalent
export PATH="$(yarn global bin):$PATH"

# for fish-shell:
set -U fish_user_paths (yarn global bin) $fish_user_paths
```

在Windows下，修改用户的PATH环境变量。如果你使用yarn，那么添加`%LOCALAPPDATA%\yarn\bin`，否则如果你使用npm，那么添加`%APPDATA%\npm`。
:::

然后我们用 Quasar CLI 创建一个项目文件夹。

```bash
## Quasar UI v2
$ quasar create <folder_name>
```

::: tip
一些**先进的**情况需要使用自定义的启动套件(例如，测试或个人预设)。在这些**罕见的**情况下，你可以使用`--套件`选项。在[create command](/quasar-cli/commands-list#create)描述中阅读更多关于这个的信息。请记住，推荐的方法是通过编写 Quasar 应用扩展来实现。
:::

::: tip WSL2
微软推荐的【WSL2中的Nodejs开发环境设置】(https://docs.microsoft.com/en-us/windows/nodejs/setup-on-wsl2)。

当使用WSL2(Windows Subsystem for Linux)时，[微软建议](https://docs.microsoft.com/en-us/windows/wsl/compare-versions#performance-across-os-file-systems)将文件保留在linux文件系统中，以最大限度地提高性能。 如果项目文件在Windows上而不是在本地Linux文件系统上，项目的构建速度会慢3倍左右，而且HMR(热模块重载)将无法工作([没有黑客](/quasar-cli/quasar-conf-js#docker-and-wsl-issues-with-hmr))。 这在基于Windows的Docker开发环境中也是如此。
:::

注意，如果你想建立任何可用的平台，你不需要单独的项目。这一个项目可以无缝地处理所有的项目。

为了继续学习 Quasar ，你应该深入地熟悉 Quasar CLI ，因为你会经常使用它。

## 它是如何工作的

 Quasar CLI 是由两个包组成的。`@quasar/cli`和`@quasar/app`。第一个包是可选的，只允许你创建一个项目文件夹和全局运行 Quasar 命令。第二个包是它的核心，它被安装到每个 Quasar 项目文件夹中。

一旦项目文件夹被生成， Quasar CLI 将只帮助全局运行`@quasar/app`的命令。在这一点上，你不需要它做其他事情。为了确保完全独立于 Quasar CLI ，你可以编写npm脚本(在你的`package.json`中)来运行 Quasar 命令。`@quasar/app`(每个项目都有特定的)将运行所有的CLI命令。

在你的`package.json`中添加一些npm脚本的示例。

```js
// package.json
"scripts": {
  "dev": "quasar dev",
  "build": "quasar build",
  "build:pwa": "quasar build -m pwa"
}
```

如果你想这样做，上述做法将允许你运行`$ yarn dev`或`$ yarn build`，而不需要全局安装的`@quasar/cli`。

另外，你甚至可以使用[npx](https://github.com/npm/npx)来运行quasar命令而不需要全局安装的`@quasar/cli'。

```bash
$ npx quasar dev
```
