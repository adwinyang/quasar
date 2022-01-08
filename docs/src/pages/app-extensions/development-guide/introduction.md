---
title: 应用扩展开发
desc: 如何为 Quasar 应用扩展开发(App Extension Development)设置计算机，并快速入门。
---

本节文档涉及如何创建自己的应用扩展。

假设你已经安装了一个官方的应用扩展。当您开始创建自己的应用扩展时，拥有这些经验将是非常有价值的。如果你遇到问题，请访问我们的 Discord 服务器的 `#app-extensions`。

## 开始

一个**应用扩展**是一个 npm 包。有两个用于创建**应用扩展**的官方工具包。官方的 "应用扩展" 入门工具包应用于创建不带 UI 的应用扩展，如组件或指令，
除非目的是将第三方库安装到Vue中。第二个官方工具包是 "UI" 工具包。它有一个用于创建组件/指令的`ui`文件夹，一个 `ui/dev` Quasar应用程序
用于单独测试你的组件/指令，还有一个`app-extension`文件夹用于创建应用程序扩展，通过 Quasar CLI 将你的组件/指令注入到 Quasar 应用程序。
UI工具包也可使你自定义的组件/指令 与 Quasar Vite 插件或 Vue CLI 或 UMD 一起使用。

```bash
$ quasar create my-ext --kit app-extension
# 或
$ quasar create my-ui --kit ui
```

它会提示您具体的需求。您是否需要安装脚本、卸载脚本，您是否会向用户提示一些问题？只选择您将要使用的内容。如果您另有决定，可以在以后手动添加这些。

在本文档页面中，让我们假设我们用`my-ext` 来回答应用扩展`ext-id`的问题(关于上述内容)。请记住，应用扩展源文件夹的文件夹名称可以与实际的`ext-id`不同。
最后，我们将发布我们的新 npm 包(`quasar-app-extension-my-ext`)。

根据你的回答，Quasar CLI 将为你的应用扩展的源代码创建一个文件夹，其结构如下。

```bash
# app-extension kit
.
├── package.json
└── src
    ├── index.js # 在Index API中描述的。
    ├── install.js # 在 Install API 中描述。
    ├── prompts.js # 在 Prompts API 中描述的。
    └── uninstall.js # 在 Uninstall API 中描述的。

# ui kit
.
├────app-extension
│ └── package.json
│ └── src
│ ├── index.js # 在 Index API 中描述的
│ ├── install.js # 在Install API中描述。
│ ├── prompts.js # 在 Prompts API 中描述的内容
│ └── uninstall.js # 在 Uninstall API 中描述的。
└── ui
    ├── package.json
    ├── build # 构建脚本
    ├── dev # 用于测试组件/指令的 Quasar 应用程序
    └── src
        ├── components # (可选)，用于存放你的组件的文件夹
        │ ├──Component.js # (可选) 组件的代码
        │ └──Component.sass # (可选) 用于组件的 Sass 代码
        ├── directives # (可选) directive的文件夹
        │ └── Directive.js # (可选) Directive的代码
        │ └── Directive.sass # (可选) 用于指令的 Sass 代码
        └── mixins # (optional) 放置 mixin 源的地方
        └── index.js # 輸出與 Vue 注入
        └── index.sass # Sass导入
```

除了`src/index.js`(来自`app-extension`工具包)或`app-extension/src/index.js`(来自`ui`工具包)，其他文件都是可选的。你可以在任何时候手动添加或删除它们。

当使用`UI`工具包时，你将有两个npm包；一个用于App Extension，一个用于UI模块。对于使用`dev`应用程序的测试，从`ui`文件夹中输入`yarn dev`。
在`dev`文件夹中创建用于测试的页面，它们将自动被注入到测试应用程序中。另外，查看`package.json`中的`scripts`部分，看看你有什么可用的东西。
当你执行`yarn build`命令时，将创建一个`dist`文件夹并创建各种类型的包(common, esm, and umd)。


## 应用扩展脚本描述

| 名称 | 描述 |
| ------------------ | --------------------------------------------------------- |
| `src/prompts.js` | 处理安装应用扩展时的提示信息 |
| `src/install.js` | 扩展应用扩展的安装程序。|
| `src/index.js` | 在`quasar dev`和`quasar build`中执行。|
| `src/uninstall.js` | 扩展应用的卸载程序。 |

## 处理软件包的依赖性

如果你的应用扩展需要依赖某些软件包才能运行(Quasar CLI 提供的软件包除外，如 "quasar"、"@quasar/extras"、"@quasar/app" -- 你应该在/install.js和/index.js中调用 "api.compatibleWith()" -- 检查[Install API](/app-extensions/development-guide/install-api)和[Index API](/app-extensions/development-guide/index-api))，然后使用 yarn/npm 将它们安装到你的App Extension文件夹中，并提拱给托管应用程序。

例如: 你正在创建一个依赖 "my-table" npm包的UI组件(假设的名字，仅作为示例)，那么你应该把 "my-table" 安装到你的App Extension文件夹中。

:: 警告
千万不要用 yarn/npm 安装由 Quasar CLI 提供的软件包，因为App Extensions不应该如此具有侵入性，强迫用户使用某个 Quasar 版本。相反，对这些包要使用 "api.compatibleWith()"，这相当于轻声说 "对不起，如果你想利用我的应用扩展，你需要安装这个版本的 Quasar "。
:::

## 手动测试

我们需要创建一个 Quasar 项目文件夹，以便在开发应用扩展时能够对其进行测试。

```bash
$ quasar create test-app
```

### 安装和提示脚本

::: tip
了解更多关于[Prompts API](/app-extensions/development-guide/prompts-api)和[Install API](/app-extensions/development-guide/install-api)可以做什么。
:::

在测试 Quasar 项目文件夹内，我们手动添加我们的App Extension。注意，我们没有指定npm包的名称(它还没有发布！)，而是指定了我们开发的App Extension文件夹的路径，因为我们想测试未发布的工作。

```bash
$ yarn add --dev file://path/to/our/app/ext/root
# 或者
$ yarn add --dev link://path/to/our/app/ext/root
```

你需要弄清楚哪条命令最适合你的环境。

::: warning
有许多关于通过`file:`和`link:`链接的问题报告。这不在 Quasar 的范围之内，但可能与你的开发环境有关，也就是你在Windows下的里程会有所不同。
:::

然后我们调用它。调用过程假定App Extension的软件包已经安装了yarn/npm(我们之前已经安装了)，因此跳过了这一步。

```bash
# 我们的 <ext-id>将是 "my-ext"，所以:
$ quasar ext invoke my-ext
```

这将安装我们应用扩展的安装。每次做了改动并想测试它们时，都需要重做以上两个步骤。

此外，如果你想在开发应用扩展时，在你的测试应用程序中拥有HMR(热模块重载)功能，那么你的`quasar.conf.js > devServer > watchFiles`将看起来像这样：

```js
// quasar.conf.js
devServer: {
  // 请务必将下面的<myextid>改为你的应用程序扩展名。
  watchFiles: [
    '/node_modules/quasar-app-extension-<myextid>/*'
  ]
}
```

而你可能想扩展Webpack的配置。假设你使用的是[`chainWebpack`](/quasar-cli/handling-webpack#usage-with-quasar-conf-js)方法，你的`quasar.conf.js > build > chainWebpack`应该是这样的：

```js
chainWebpack (chain) {
  chain.merge({
    snapshot: {
      managedPaths: []
    }
  })
},
```

### 卸载脚本

::: tip
了解更多关于[Uninstall API](/app-extensions/development-guide/uninstall-api)可以做什么。
:::

假设你已经按照上面的部分安装了你的App Extension，我们现在可以测试卸载脚本(如果你有的话)。

```bash
$ quasar ext uninvoke my-ext
```

上述命令同样没有修改或删除 package.json 和 node_modules 中的 npm 包。它只是调用卸载脚本，将其从测试 Quasar 应用项目文件夹的注册/安装的应用扩展列表中删除。然而，你的最终用户将调用`$ quasar ext remove my-ext`来卸载它，这也会卸载 npm 包。

你需要重做这些安装步骤，并在每次你对卸载脚本进行修改并想测试时发出 uninvoke 命令。

### 索引脚本

在上面的章节中，我们描述了如何测试提示、安装和卸载脚本。现在是索引脚本的时间了，它是你的应用扩展的核心。

在这里你可以篡改所有的`quasar.config.js`选项，扩展Webpack配置，注册 Quasar CLI 命令，启动开发应用程序所需的外部服务等等。

因此，每次执行`$ quasar dev`和`$ quasar build`时，都会运行索引脚本。

为了测试索引脚本，你可以在每次改变App Extension脚本代码中的某些内容时，重复上述的卸载和安装程序。但这变得非常乏味。如果你在Unix操作系统(MacOS, Linux)上开发，你可以利用`yarn link`命令，从 Quasar 测试应用的node_modules文件夹创建一个[符号链接](https://en.wikipedia.org/wiki/Symbolic_link)到你的扩展文件夹中。

```bash
$ cd /path/to/app/extension/folder

# 我们通过yarn注册这个扩展
$ yarn link

$ cd /path/to/quasar/testing/app/folder

$ yarn link quasar-app-extension-<ext-id
# 在我们的演示案例中，它是这样的。
# $ yarn link quasar-app-extension-my-ext
```

记住，如果你需要`yarn/npm安装`任何依赖项到**你的**应用扩展中，那么你也必须卸载你的应用扩展并在你的测试应用中重新安装。

```bash
$ cd /path/to/app/extension/folder

# 运行yarn/npm命令(安装/卸载，等等)

# 然后

$ cd /path/to/quasar/testing/app/folder

# 卸载应用程序ext
$ quasar ext uninvoke my-ext

# 重新安装应用程序 ext
$ quasar ext invoke my-ext
```

你实际上只需要`quasar ext invoke my-ext`(安装)应用扩展就可以重新安装它。上面的信息是为了完整起见。

::: warning
有很多关于Windows上`yarn link`的问题报告。这不在 Quasar 的范围之内，但很可能与你的开发环境有关，也就是你在Windows上的里程数会有所不同。
:::

::: tip
了解更多关于你能用[索引API](/app-extensions/development-guide/index-api)做什么。
:::

## 发布

当你完成了你的App Extension并准备部署它时，你需要做的就是把它发布到npm仓库。

在你的App Extension文件夹中，运行[yarn publish](https://yarnpkg.com/lang/en/docs/cli/publish/)或[npm publish](https://docs.npmjs.com/cli/publish)。两者都做同样的事情。

::: warning
一定要记住不要把`quasar-app-extension-`前缀从扩展的`package.json`的`name`属性中剥离出来，否则 Quasar CLI 将无法识别它。
:::


