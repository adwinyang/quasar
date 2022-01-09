---
title: 命令列表
desc:  Quasar CLI 命令的全部列表。
---

熟悉 Quasar 项目内部的可用命令列表：

```bash
$ quasar

  ___
 / _ \ _   _  __ _ ___  __ _ _ __
| | | | | | |/ _` / __|/ _` | '__|
| |_| | |_| | (_| \__ \ (_| | |
 \__\_\\__,_|\__,_|___/\__,_|_|

  用法示例
    $ quasar <command> <options>

  命令帮助
    $ quasar <command> --help
    $ quasar <command> -h

  选项
    --version, -v 打印 Quasar App CLI 版本

  命令
    dev, d        为你的应用服务器启动开发服务器
    build, b      构建用于生产的应用程序
    clean, c      清除所有构建工件
    new, n        快速脚手架页面/布局/组件/... vue 文件
    mode, m       为你的应用添加/删除类 Quasar 模式
    inspect       检查生成的 Webpack 配置
    ext, e        管理 Quasar App 扩展
    run, r        运行由已安装的提供的特定命令
                     Quasar 应用扩展
    describe      描述一个 Quasar API（组件）
    test, t       运行@quasar/testing App Extension 命令
                    - 需要安装@quasar/testing App Extension
                    - 为方便起见，这是一个别名命令
    info, i       显示有关您的计算机和应用程序的信息
    help, h       显示帮助信息

  如果没有找到指定的命令，则“quasar run”
  将使用提供的参数执行。

  @quasar/cli 全局安装提供的命令：

    upgrade       检查（可选）升级Quasar软件包
                     从 Quasar 项目文件夹
    serve         在应用程序的可分发文件上创建一个临时服务器
```

查看任何命令的帮助：
```bash
$ quasar [command name] --help
```

## 创建

创建一个带有初始项目模板的App文件夹。

```bash
## Quasar UI v2
$ quasar create <folder_name>
```

该命令默认使用Quasar App Starter Kit，但你可以通过`--kit`选项指定一个不同的工具包。

`quasar create --kit ui`和`quasar create --kit app-extension`将为你生成应用扩展模板：前者是指扩展要提供UI组件，后者是指所有其他情况。

你可以使用存储在你的机器上的启动工具包，提供一个**本地路径**的文件夹(例如：`quasar create --kit ./my-custom-starter-kit`)。

你可以使用存储在任何可公开访问的Git仓库中的启动工具包，只需提供一个遵循此模式的参考。
- GitHub - `github:owner/name`或简单的`owner/name`。
- GitLab - `gitlab:owner/name`。
- Bitbucket - `bitbucket:owner/name`。

`master`分支将被默认签出，但你可以通过`--branch <branch name>`指定你喜欢的分支(例如：`quasar create --kit owner/name --branch my-branch`)。

::: warning
在 Quasar 生态系统中构建可重复使用的代码和用户界面组件的首选方式是应用扩展。只有当你真的知道自己在做什么的时候，才可以使用自定义的启动工具包，并且要注意这将使 Quasar 团队更难以为你提供帮助。
:::

## 升级

从 Quasar 项目文件夹中检查(也可以选择)升级 Quasar 软件包。

```bash
# 查看所有选项：
$ quasar upgrade -h

# 检查不间断的更改升级并显示它们，
# 但不会进行安装
$ quasar upgrade

# 检查预发布版本（alpha/beta）：
$ quasar upgrade -p

# 检查主要的新版本（包括重大更改）：
$ quasar upgrade -m

# 执行实际升级，
# 结合上面的任何参数并添加“-i”（或“--install”）：
$ quasar upgrade -i
```

::: warning 代码编辑器终端注意事项
如果你使用的是代码编辑器终端，而不是真正的终端，你运行`quasar upgrade`并得到一个错误 *Command not found* 或 *@quasar/cli* 版本似乎是*undefined*，你将需要进入你的代码编辑器终端的设置，取消勾选选项(或其等同物) *Add 'node_modules/.bin' from the project root to %PATH%* 然后重新启动你的代码编辑器。
:::

## 信息
 Quasar CLI 配备了多个NPM构建包(Webpack、Vue等)的稳定组合，经过大量测试后，这些构建包会经常更新。

为了让你看到Node、NPM、Quasar CLI、Quasar、Vue、Webpack、 Cordova、Babel等的版本，请在 Quasar 项目文件夹下发布此命令：
```bash
$ quasar info
```

## Dev

```bash
$ quasar dev -h

  描述
    在开发模式下启动应用程序（热代码重新加载，错误
    报告等）

  用法
    $ quasar dev
    $ quasar dev -p <port number>

    $ quasar dev -m ssr

    # “quasar dev -m cordova -T ios” 的别名
    $ quasar dev -m ios

    # "quasar dev -m cordova -T android" 的别名
    $ quasar dev -m android

    # 传递额外的参数和/或选项到
    # 底层的“cordova”或“electron”可执行文件：
    $ quasar dev -m ios -- some params --and options --here
    $ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
    # 在 Windows 上使用 Powershell 时：
    $ quasar dev -m ios '--' some params --and options --here
    $ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox

  选项
    --mode, -m       App 模式 [spa|ssr|pwa|bex|cordova|capacitor|electron] (default: spa)
    --port, -p       启动应用程序的端口
    --hostname, -H   用于为应用程序提供服务的主机名
    --help, -h       显示帮助信息

    仅用于 Cordova 模式:
    --target, -T     (必须) App 目标平台
                        [android|ios]
    --emulator, -e   (可选) 模拟器名称
                        示例: iPhone-7, iPhone-X
                        iPhone-X,com.apple.CoreSimulator.SimRuntime.iOS-12-2
    --ide, -i        打开 IDE (Android Studio / XCode) 而不是让 Cordova
                        启动模拟器，在这种情况下“--emulator”
                        参数将不起作用

    --devtools, -d   打开远程 Vue Devtools

    仅用于 Capacitor 模式:
    --target, -T     (必须) App 目标平台
                        [android|ios]
```

 Quasar 开发服务器允许你通过在内存中编译和维护代码来开发你的应用程序。网络服务器将为你的App提供服务，同时提供开箱即用的热重载。当你改变你的代码时，在内存中运行提供更快的重建。

> 热重载不仅仅是在代码改变时刷新你的浏览器。它跳过刷新，并在飞行中更新你的代码，同时保持你的应用程序的状态(如你的Vue的模型数据)。请注意，在某些情况下这是不可能的，所以开发网络服务器将简单地刷新你的浏览器。(一定要确保你在同一时间只运行一个 Quasar CLI 实例，否则Hot-Reload和其他东西会被破坏！)

根据你想开发的内容，你可以通过使用 "quasar dev" 命令来启动开发服务器，如下所示：

```bash
# 开发 SPA
$ quasar dev
# ...或
$ quasar dev -m spa

# 开发 SSR
$ quasar dev -m ssr

# 开发 PWA
$ quasar dev -m pwa

# 开发用于生产的 BEX
$ quasar dev -m bex

# 开发移动端 App (通过 Cordova)
$ quasar dev -m cordova -T [android|ios]
# 或更短的形式:
$ quasar dev -m [android|ios]

# 开发 Electron App
$ quasar dev -m electron

# 传递额外的参数和/或选项到
# 底层的“cordova”或“electron”可执行文件：
$ quasar dev -m ios -- some params --and options --here
$ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
# 在 Windows 上使用 Powershell 时：
$ quasar dev -m ios '--' some params --and options --here
$ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox
```

如果你想改变为你的应用程序服务的主机名或端口，你有三个选择。
* 编辑"/quasar.conf.js"：
```js
devServer: {
host: '...',
端口: ...
}
```
* 通过'-H'(主机名)和'-p'(端口)命令选项。
* 如果这是一次性的，可以指定主机名和/或端口作为环境变量。
```bash
$ PORT=3000 quasar dev
$ HOSTNAME=1.1.1.14 quasar dev
```

如果出现了热重载的问题，你可以尝试两种修复方法。
* 用以下方法改变项目文件夹的权限

```bash
sudo chown -R username: .
```
* 或者以root权限运行开发服务器

```bash
sudo quasar dev
```

## 构建

```bash
$ quasar build -h

  说明
    Builds distributables of your app.

  用法
    $ quasar build
    $ quasar build -p <port number>

    $ quasar build -m ssr

    # alias for "quasar build -m cordova -T ios"
    $ quasar build -m ios

    # alias for "quasar build -m cordova -T android"
    $ quasar build -m android

    # 传递额外的参数和/或选项到
    # 底层的“cordova”可执行文件：
    $ quasar build -m ios -- some params --and options --here
    # 在 Windows 上使用 Powershell 时：
    $ quasar build -m ios '--' some params --and options --here

  选项
    --mode, -m      App 模式 [spa|ssr|pwa|bex|cordova|capacitor|electron] (默认: spa)
    --target, -T    App 目标平台
                      - Cordova (默认: 安装所有)
                        [android|ios]
                      - Capacitor
                        [android|ios]
                      - Electron with default "electron-packager" bundler (默认: yours)
                        [darwin|win32|linux|mas|all]
                      - Electron with "electron-builder" bundler (默认: yours)
                        [darwin|mac|win32|win|linux|all]
    --publish, -P   还触发发布钩子（如果有指定）
                      - 使用 Electron 模式构建和使用时具有特殊意义
                         作为捆绑器的 electron-builder
    --debug, -d     为调试目的而构建
    --skip-pkg, -s  仅构建 UI（跳过创建 Cordova/Capacitor/Electron 可执行文件）
                       - Cordova（它只用 UI 代码填充 /src/cordova/www 文件夹）
                       - Capacitor（它只用UI代码填充/src/capacitor/www文件夹）
                       - Electron（它只创建 /dist/electron/UnPackaged 文件夹）
    --help, -h      显示帮助

    以下仅用于 Cordova 和 Capacitor 模式:
    --ide, -i      打开 IDE (Android Studio / XCode) 而不是用
                        仅终端/控制台构建

    以下仅用于 Electron 模式:
    --bundler, -b   捆绑器 (electron-packager or electron-builder)
                      [packager|builder]
    --arch, -A      App 架构 (默认: yours)
                      - 带默认 "electron-packager" 捆绑器:
                          [ia32|x64|armv7l|arm64|mips64el|all]
                      - 带 "electron-builder" 捆绑器:
                          [ia32|x64|armv7l|arm64|all]

    以下仅用于 electron-builder (当使用 "publish" 参数时):
    --publish, -P  发布选项 [onTag|onTagOrDraft|always|never]
                     - 请参考 https://www.electron.build/configuration/publish
```

 Quasar CLI 可以将所有东西打包，并为生产优化你的应用程序。它简化了源代码，提取了供应商的组件，利用了浏览器的缓存等等。

```bash
# Build a SPA for production
$ quasar build
# ...or
$ quasar build -m spa

# Build a SSR for production
$ quasar build -m ssr

# Build a PWA for production
$ quasar build -m pwa

# Build a BEX for production
$ quasar build -m bex

# Build a Mobile App (through Cordova)
$ quasar build -m cordova -T [android|ios]
# or the short form:
$ quasar build -m [android|ios]

# Build an Electron App for production
$ quasar build -m electron

# 传递额外的参数和/或选项到
# 底层的“cordova”可执行文件：
$ quasar build -m ios -- some params --and options --here
# 在 Windows 上使用 Powershell 时：
$ quasar build -m ios '--' some params --and options --here

# 创建一个具有调试能力的生产版本
#（有源映射和代码没有被缩小）
$ quasar build -d [-m <mode>]
```

## 清理
清理所有的构建资产：

```bash
$ quasar clean
```

## 新的
生成组件、页面、布局、Vuex 商店。

::: tip
这个命令只是一个辅助工具，为了快速搭建一个页面/布局/组件/vuex存储模块。你不需要使用它，但可以在你不知道如何开始时帮助你。
:::

```bash
$ quasar new -h

  描述
    Quickly scaffold a page/layout/component/store module.

  用法
    $ quasar new <p|page> [-f <option>] <page_file_name>
    $ quasar new <l|layout> [-f <option>] <layout_file_name>
    $ quasar new <c|component> [-f <option>] <component_file_name>
    $ quasar new <b|boot> [-f ts] <boot_name>
    $ quasar new <s|store> [-f ts] <store_module_name>

    # Examples:

    # Create src/pages/MyNewPage.vue:
    $ quasar new p MyNewPage

    # Create src/pages/MyNewPage.vue and src/pages/OtherPage.vue:
    $ quasar new p MyNewPage OtherPage

    # Create src/layouts/shop/Checkout.vue
    $ quasar new layout shop/Checkout.vue

    # Create src/layouts/shop/Checkout.vue with TypeScript options API
    $ quasar new layout -f ts-options shop/Checkout.vue

    # Create a store with TypeScript support
    $ quasar new store -f ts myStore

  选项
    --help, -h            显示帮助

    --format -f <option>  (optional) Use a supported format for the template
                          Option can be:
                             * ts-options - TS options API
                             * ts-composition - TS composition API
                             * ts-class - [DEPRECATED] TS class style syntax
                             * ts - use for TS boot file and store modules only
```

## 模式

```bash
$ quasar mode -h

  描述
    Add/Remove support for PWA / BEX / Cordova / Capacitor / Electron modes.

  用法
    $ quasar mode [add|remove] [pwa|ssr|bex|cordova|capacitor|electron] [--yes]

    # determine what modes are currently installed:
    $ quasar mode

  选项
    --yes, -y     Skips the "Are you sure?" question
                  when removing a Quasar mode
    --help, -h    显示帮助
```

当你用CLI初始化一个项目时，你可以构建SPA(单页网站/应用程序)、SSR(服务器端渲染网站/应用程序，可选择PWA客户端接管)、PWA(渐进式Web应用程序)、移动应用程序(通过 Cordova )和/或Electron应用程序。当你为SSR、PWA、 Cordova 或Electron开发时，你需要安装这些模式。如果你发布 "quasar dev "或 "quasar build"，它们将被自动安装。

这些模式将在你的项目中添加一个 "src-*"文件夹，其中有非常具体的代码。

| 文件夹 | 模式 | 描述 |
| src-ssr | ssr | 包含生产Node服务器文件。|
| src-pwa | pwa | 包含你可以调整的服务工作器文件。|
| src-cordova | cordova | 是一个 Cordova 项目文件夹，将使用你的'src'作为内容。从这个文件夹中调整 Cordova 配置，添加/删除平台、启动画面、 Cordova 插件等。但不要碰 "src-cordova/www "文件夹，因为它将在每次构建时被覆盖。|
| src-electron | electron | 拥有Electron主线程的代码。渲染器线程将是你在 "src "中的应用程序。|
| src-bex | bex | 包含浏览器扩展模式的特定文件。|
如果因为某些原因你决定不需要某个模式，你可以将其删除。**这将永久地删除**相应的 "src-*"文件夹。



```bash
$ quasar mode remove pwa
```

## Describe
这个命令对于描述你的项目所使用的任何 Quasar 组件/指令/插件的API非常有用。**它与你的项目文件夹中安装的 Quasar 版本有关。

示例。`$ quasar describe QIcon`, `$ quasar describe TouchPan`, `$ quasar describe Cookies`.

```bash
$ quasar describe -h

  描述
    Describes a component API for project's Quasar version being used

  用法
    $ quasar describe <component/directive/Quasar plugin>

    # display everything:
    $ quasar describe QIcon

    # displaying only props:
    $ quasar describe QIcon -p
    # displaying props and methods only:
    $ quasar describe QIcon -p -m
    # filtering by "si":
    $ quasar describe QIcon -f si
    # filtering only props by "co":
    $ quasar describe QIcon -p -f co

    # Open docs URL:
    $ quasar describe QIcon -d

  选项
    --filter, -f <filter> Filters the API
    --props, -p           Displays the API props
    --slots, -s           Displays the API slots
    --methods, -m         Displays the API methods
    --events, -e          Displays the API events
    --value, -v           Displays the API value
    --arg, -a             Displays the API arg
    --modifiers, -M       Displays the API modifiers
    --injection, -i       Displays the API injection
    --quasar, -q          Displays the API quasar conf options
    --help, -h            显示帮助
```

```bash
$ quasar describe QIcon

 Describing QIcon component API
 描述 is based on your project's Quasar version

 Properties

   name (String)
     描述: Name of the icon, following Quasar convention
     Examples:
       map
       ion-add

   color (String)
     描述: Color name for component from the Quasar Color Palette
     Examples:
       primary
       teal-10

   size (String)
     描述: Size in CSS units, including unit name
     Examples:
       16px
       2rem

   left (Boolean)
     描述: Apply a standard margin on the left side. Useful if icon is on the right side of something.

   right (Boolean)
     描述: Apply a standard margin on the right side. Useful if icon is on the left side of something.

 Slots

   default
     Suggestions: QTooltip or QMenu

 Scoped Slots

   *No scoped slots*

 Events

   *No events*

 Methods

   *No methods*
```

## 检查
这个命令可以用来检查 Quasar CLI 生成的Webpack配置。

```bash
$ quasar inspect -h

  描述
    Inspect Quasar generated Webpack config

  用法
    $ quasar inspect
    $ quasar inspect -c build
    $ quasar inspect -m electron -p 'module.rules'

  选项
    --cmd, -c        Quasar command [dev|build] (default: dev)
    --mode, -m       App mode [spa|ssr|pwa|bex|cordova|electron] (default: spa)
    --depth, -d      Number of levels deep (default: 5)
    --path, -p       Path of config in dot notation
                        Examples:
                          -p module.rules
                          -p plugins
    --help, -h       显示帮助
```

## Ext
该命令用于管理[App Extensions](/app-extensions/introduction) 。

```bash
$ quasar ext -h

  描述
    Manage Quasar App Extensions

  用法
    # display list of installed extensions
    $ quasar ext

    # Add Quasar App Extension
    $ quasar ext add <ext-id>

    # Remove Quasar App Extension
    $ quasar ext remove <ext-id>

    # Add Quasar App Extension, but
    # skip installing the npm package
    # (assumes it's already installed)
    $ quasar ext invoke <ext-id>

    # Remove Quasar App Extension, but
    # skip uninstalling the npm package
    $ quasar ext uninvoke <ext-id>

  选项
    --help, -h       显示帮助
```

## 运行
该命令用于运行你已经安装到项目文件夹中的[App Extensions](/app-extensions/introduction)提供的命令。

```bash
$ quasar run -h

  描述
    运行应用扩展提供的命令

  用法
    $ quasar run <extension-id> <cmd> [args, params]
    $ quasar <extension-id> <cmd> [args, params]

    $ quasar run iconify create pic -s --mark some_file
    $ quasar iconify create pic -s --mark some_file
       # 注意：“iconify”只是一个例子，并不是真正的扩展。
       # 查找名为“iconify”的已安装扩展
       # (quasar-app-extension-iconify 扩展包)
       # 并运行其自定义定义的 “create” 命令
       # 使用“pic”参数和“-s --mark some_file”参数

  选项
    --help, -h       显示帮助
```

## Serve
这个命令也可以在生产中使用，它由`@quasar/cli`包的全局安装提供。

```bash
$ quasar serve -h

  描述
    在当前文件下，启动一个 HTTP(s) 服务器

  用法
    $ quasar serve [path]
    $ quasar serve . # 当前文件夹下启动服务

    如果您提供使用 CLI 构建的 SSR 文件夹，则
    控制权交给 /index.js 并且 params 无效。

  选项
    --port, -p              使用端口 (默认: 4000)
    --hostname, -H          使用地址/IP (默认: 0.0.0.0)
    --gzip, -g              压缩内容 (默认: true)
    --silent, -s            抑制日志消息
    --colors                日志消息输出时带有颜色（默认值：true）
    --open, -o              启动后打开浏览器窗口
    --cache, -c <number>    以秒为单位的缓存时间（max-age）；
                            不适用于 /service-worker.js
                           （默认：86400 - 24 小时）
    --micro, -m <seconds>   使用微缓存（默认：1 秒）

    --history               使用历史 API 回退；
                              所有请求回退到/index.html，
                              除非使用“--index”参数
    --index, -i <file>      History mode (only!) index url path
                              (default: index.html)

    --https                 开启HTTPS
    --cert, -C [path]       SSL 证书文件的路径（可选）
    --key, -K [path]        SSL 密钥文件的路径（可选）
    --proxy <file.js>       文件中定义的代理特定请求；
                            文件必须导出数组（{path，rule}）
                            请参阅下面的示例。 "rule" 定义于：
                            https://github.com/chimurai/http-proxy-middleware
    --cors                  为所有请求启用 CORS
    --help, -h              显示帮助

  代理文件示例
    module.exports = [
      {
        path: '/api',
        rule: { target: 'http://www.example.org' }
      }
    ]
    --> 将转化为 app.use(path, httpProxyMiddleware(rule))
```

### 自定义节点服务器
在构建SPA或PWA时，可分发的文件夹可以由任何静态网络服务器提供。为了测试它(假设你没有特定的publicPath或者没有使用Vue Router "历史 "模式)，你可以使用 "http-server "npm包。

或者你可以建立你自己的服务器。这里有一些示例。

```js
// 当使用默认的Vue Router "hash "模式时
const
  express = require('express'),
  serveStatic = require('serve-static'),
  port = process.env.PORT || 5000

const app = express()

app.use(serveStatic(...path-to-dist...))
app.listen(port)
```

```js
// 当使用Vue Router "历史 "模式时
const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000

const app = express()

app.use(history())
app.use(serveStatic(...path-to-dist...))
app.listen(port)
```

如果你需要重写API的URL，或者简单地说，你想代理你的API请求，那么你可以使用 "http-proxy-middleware "包。

```js
// 将此添加到前面两个示例中的一个。
const { createProxyMiddleware } = require('http-proxy-middleware')

// ...
app.use('/api', createProxyMiddleware({
    target: `http://my-api.com:5050`,
    pathRewrite: {"^/api" : ""}
  }))

// 那么app.listen(...)
```

最后，运行这些文件中的一个:

```bash
$ node my-server.js
```
