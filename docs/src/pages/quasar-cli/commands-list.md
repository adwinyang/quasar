---
title: 命令列表
desc: Quasar CLI命令的全部列表。
---

熟悉Quasar项目内部的可用命令列表。

```bash
$ quasar

  ___
 / _ \ _   _  __ _ ___  __ _ _ __
| | | | | | |/ _` / __|/ _` | '__|
| |_| | |_| | (_| \__ \ (_| | |
 \__\_\\__,_|\__,_|___/\__,_|_|

  Example usage
    $ quasar <command> <options>

  Help for a command
    $ quasar <command> --help
    $ quasar <command> -h

  Options
    --version, -v Print Quasar App CLI version

  Commands
    dev, d        Start a dev server for your App
    build, b      Build your app for production
    clean, c      Clean all build artifacts
    new, n        Quickly scaffold page/layout/component/... vue file
    mode, m       Add/remove Quasar Modes for your App
    inspect       Inspect generated Webpack config
    ext, e        Manage Quasar App Extensions
    run, r        Run specific command provided by an installed
                    Quasar App Extension
    describe      Describe a Quasar API (component)
    test, t       Run @quasar/testing App Extension command
                    - requires @quasar/testing App Extension to be installed
                    - this is an alias command for convenience purposes
    info, i       Display info about your machine and your App
    help, h       Displays this message

  If the specified command is not found, then "quasar run"
  will be executed with the provided arguments.

  Commands supplied by @quasar/cli global installation:

    upgrade       Check (and optionally) upgrade Quasar packages
                    from a Quasar project folder
    serve         Create an ad-hoc server on App's distributables
```

见任何命令的帮助。
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
在Quasar生态系统中构建可重复使用的代码和用户界面组件的首选方式是应用扩展。只有当你真的知道自己在做什么的时候，才可以使用自定义的启动工具包，并且要注意这将使Quasar团队更难以为你提供帮助。
:::

## 升级

从Quasar项目文件夹中检查(也可以选择)升级Quasar软件包。

```bash
# view all options:
$ quasar upgrade -h

# checks for non-breaking change upgrades and displays them,
# but will not carry out the install
$ quasar upgrade

# checks for pre-releases (alpha/beta):
$ quasar upgrade -p

# checks for major new releases (includes breaking changes):
$ quasar upgrade -m

# to perform the actual upgrade,
# combine any of the params above and add "-i" (or "--install"):
$ quasar upgrade -i
```

::: warning Note for code editor terminals
如果你使用的是代码编辑器终端，而不是真正的终端，你运行`quasar upgrade`并得到一个错误 *Command not found* 或 *@quasar/cli* 版本似乎是*undefined*，你将需要进入你的代码编辑器终端的设置，取消勾选选项(或其等同物) *Add 'node_modules/.bin' from the project root to %PATH%* 然后重新启动你的代码编辑器。
:::

## 信息
Quasar CLI配备了多个NPM构建包(Webpack、Vue等)的稳定组合，经过大量测试后，这些构建包会经常更新。

为了让你看到Node、NPM、Quasar CLI、Quasar、Vue、Webpack、Cordova、Babel等的版本，请在Quasar项目文件夹下发布此命令。
```bash
$ quasar info
```

## Dev

```bash
$ quasar dev -h

  Description
    Starts the app in development mode (hot-code reloading, error
    reporting, etc)

  Usage
    $ quasar dev
    $ quasar dev -p <port number>

    $ quasar dev -m ssr

    # alias for "quasar dev -m cordova -T ios"
    $ quasar dev -m ios

    # alias for "quasar dev -m cordova -T android"
    $ quasar dev -m android

    # passing extra parameters and/or options to
    # underlying "cordova" or "electron" executables:
    $ quasar dev -m ios -- some params --and options --here
    $ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
    # when on Windows and using Powershell:
    $ quasar dev -m ios '--' some params --and options --here
    $ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox

  Options
    --mode, -m       App mode [spa|ssr|pwa|bex|cordova|capacitor|electron] (default: spa)
    --port, -p       A port number on which to start the application
    --hostname, -H   A hostname to use for serving the application
    --help, -h       Displays this message

    Only for Cordova mode:
    --target, -T     (required) App target
                        [android|ios]
    --emulator, -e   (optional) Emulator name
                        Examples: iPhone-7, iPhone-X
                        iPhone-X,com.apple.CoreSimulator.SimRuntime.iOS-12-2
    --ide, -i        Open IDE (Android Studio / XCode) instead of letting Cordova
                        booting up the emulator, in which case the "--emulator"
                        param will have no effect

    --devtools, -d   Open remote Vue Devtools

    Only for Capacitor mode:
    --target, -T     (required) App target
                        [android|ios]
```

Quasar开发服务器允许你通过在内存中编译和维护代码来开发你的应用程序。网络服务器将为你的App提供服务，同时提供开箱即用的热重载。当你改变你的代码时，在内存中运行提供更快的重建。

> 热重载不仅仅是在代码改变时刷新你的浏览器。它跳过刷新，并在飞行中更新你的代码，同时保持你的应用程序的状态(如你的Vue的模型数据)。请注意，在某些情况下这是不可能的，所以开发网络服务器将简单地刷新你的浏览器。(一定要确保你在同一时间只运行一个Quasar CLI实例，否则Hot-Reload和其他东西会被破坏！)

根据你想开发的内容，你可以通过使用 "quasar dev "命令来启动开发服务器，如下所示。

```bash
# Developing a SPA
$ quasar dev
# ...or
$ quasar dev -m spa

# Developing for SSR
$ quasar dev -m ssr

# Developing a PWA
$ quasar dev -m pwa

# Developing a BEX for production
$ quasar dev -m bex

# Developing a Mobile App (through Cordova)
$ quasar dev -m cordova -T [android|ios]
# or the short form:
$ quasar dev -m [android|ios]

# Developing an Electron App
$ quasar dev -m electron

# passing extra parameters and/or options to
# underlying "cordova" or "electron" executables:
$ quasar dev -m ios -- some params --and options --here
$ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
# when on Windows and using Powershell:
$ quasar dev -m ios '--' some params --and options --here
$ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox
```

如果你想改变为你的应用程序服务的主机名或端口，你有三个选择。
* 编辑"/quasar.conf.js"。
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

## 建立

```bash
$ quasar build -h

  Description
    Builds distributables of your app.

  Usage
    $ quasar build
    $ quasar build -p <port number>

    $ quasar build -m ssr

    # alias for "quasar build -m cordova -T ios"
    $ quasar build -m ios

    # alias for "quasar build -m cordova -T android"
    $ quasar build -m android

    # passing extra parameters and/or options to
    # underlying "cordova" executable:
    $ quasar build -m ios -- some params --and options --here
    # when on Windows and using Powershell:
    $ quasar build -m ios '--' some params --and options --here

  Options
    --mode, -m      App mode [spa|ssr|pwa|bex|cordova|capacitor|electron] (default: spa)
    --target, -T    App target
                      - Cordova (default: all installed)
                        [android|ios]
                      - Capacitor
                        [android|ios]
                      - Electron with default "electron-packager" bundler (default: yours)
                        [darwin|win32|linux|mas|all]
                      - Electron with "electron-builder" bundler (default: yours)
                        [darwin|mac|win32|win|linux|all]
    --publish, -P   Also trigger publishing hooks (if any are specified)
                      - Has special meaning when building with Electron mode and using
                        electron-builder as bundler
    --debug, -d     Build for debugging purposes
    --skip-pkg, -s  Build only UI (skips creating Cordova/Capacitor/Electron executables)
                      - Cordova (it only fills in /src/cordova/www folder with the UI code)
                      - Capacitor (it only fills in /src/capacitor/www folder with the UI code)
                      - Electron (it only creates the /dist/electron/UnPackaged folder)
    --help, -h      Displays this message

    ONLY for Cordova and Capacitor mode:
    --ide, -i       Open IDE (Android Studio / XCode) instead of finalizing with a
                    terminal/console-only build

    ONLY for Electron mode:
    --bundler, -b   Bundler (electron-packager or electron-builder)
                      [packager|builder]
    --arch, -A      App architecture (default: yours)
                      - with default "electron-packager" bundler:
                          [ia32|x64|armv7l|arm64|mips64el|all]
                      - with "electron-builder" bundler:
                          [ia32|x64|armv7l|arm64|all]

    ONLY for electron-builder (when using "publish" parameter):
    --publish, -P  Publish options [onTag|onTagOrDraft|always|never]
                     - see https://www.electron.build/configuration/publish
```

Quasar CLI可以将所有东西打包，并为生产优化你的应用程序。它简化了源代码，提取了供应商的组件，利用了浏览器的缓存等等。

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

# passing extra parameters and/or options to
# underlying "cordova" executable:
$ quasar build -m ios -- some params --and options --here
# when on Windows and using Powershell:
$ quasar build -m ios '--' some params --and options --here

# Create a production build with ability to debug it
# (has source-maps and code is NOT minified)
$ quasar build -d [-m <mode>]
```

## 清理
清理所有的构建资产。

```bash
$ quasar clean
```

## 新
生成组件、页面、布局、Vuex商店。

::: tip
这个命令只是一个辅助工具，为了快速搭建一个页面/布局/组件/vuex存储模块。你不需要使用它，但可以在你不知道如何开始时帮助你。
:::

```bash
$ quasar new -h

  Description
    Quickly scaffold a page/layout/component/store module.

  Usage
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

  Options
    --help, -h            Displays this message

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

  Description
    Add/Remove support for PWA / BEX / Cordova / Capacitor / Electron modes.

  Usage
    $ quasar mode [add|remove] [pwa|ssr|bex|cordova|capacitor|electron] [--yes]

    # determine what modes are currently installed:
    $ quasar mode

  Options
    --yes, -y     Skips the "Are you sure?" question
                  when removing a Quasar mode
    --help, -h    Displays this message
```

当你用CLI初始化一个项目时，你可以构建SPA(单页网站/应用程序)、SSR(服务器端渲染网站/应用程序，可选择PWA客户端接管)、PWA(渐进式Web应用程序)、移动应用程序(通过Cordova)和/或Electron应用程序。当你为SSR、PWA、Cordova或Electron开发时，你需要安装这些模式。如果你发布 "quasar dev "或 "quasar build"，它们将被自动安装。

这些模式将在你的项目中添加一个 "src-*"文件夹，其中有非常具体的代码。

| 文件夹 | 模式 | 描述 |
| src-ssr | ssr | 包含生产Node服务器文件。|
| src-pwa | pwa | 包含你可以调整的服务工作器文件。|
| src-cordova | cordova | 是一个Cordova项目文件夹，将使用你的'src'作为内容。从这个文件夹中调整Cordova配置，添加/删除平台、启动画面、Cordova插件等。但不要碰 "src-cordova/www "文件夹，因为它将在每次构建时被覆盖。|
| src-electron | electron | 拥有Electron主线程的代码。渲染器线程将是你在 "src "中的应用程序。|
| src-bex | bex | 包含浏览器扩展模式的特定文件。|
如果因为某些原因你决定不需要某个模式，你可以将其删除。**这将永久地删除**相应的 "src-*"文件夹。



```bash
$ quasar mode remove pwa
```

## Describe
这个命令对于描述你的项目所使用的任何Quasar组件/指令/插件的API非常有用。**它与你的项目文件夹中安装的Quasar版本有关。

示例。`$ quasar describe QIcon`, `$ quasar describe TouchPan`, `$ quasar describe Cookies`.

```bash
$ quasar describe -h

  Description
    Describes a component API for project's Quasar version being used

  Usage
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

  Options
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
    --help, -h            Displays this message
```

```bash
$ quasar describe QIcon

 Describing QIcon component API
 Description is based on your project's Quasar version

 Properties

   name (String)
     Description: Name of the icon, following Quasar convention
     Examples:
       map
       ion-add

   color (String)
     Description: Color name for component from the Quasar Color Palette
     Examples:
       primary
       teal-10

   size (String)
     Description: Size in CSS units, including unit name
     Examples:
       16px
       2rem

   left (Boolean)
     Description: Apply a standard margin on the left side. Useful if icon is on the right side of something.

   right (Boolean)
     Description: Apply a standard margin on the right side. Useful if icon is on the left side of something.

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
这个命令可以用来检查Quasar CLI生成的Webpack配置。

```bash
$ quasar inspect -h

  Description
    Inspect Quasar generated Webpack config

  Usage
    $ quasar inspect
    $ quasar inspect -c build
    $ quasar inspect -m electron -p 'module.rules'

  Options
    --cmd, -c        Quasar command [dev|build] (default: dev)
    --mode, -m       App mode [spa|ssr|pwa|bex|cordova|electron] (default: spa)
    --depth, -d      Number of levels deep (default: 5)
    --path, -p       Path of config in dot notation
                        Examples:
                          -p module.rules
                          -p plugins
    --help, -h       Displays this message
```

## Ext
该命令用于管理[App Extensions](/app-extensions/introduction)。

```bash
$ quasar ext -h

  Description
    Manage Quasar App Extensions

  Usage
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

  Options
    --help, -h       Displays this message
```

## 运行
该命令用于运行你已经安装到项目文件夹中的[App Extensions](/app-extensions/introduction)提供的命令。

```bash
$ quasar run -h

  Description
    Run app extension provided commands

  Usage
    $ quasar run <extension-id> <cmd> [args, params]
    $ quasar <extension-id> <cmd> [args, params]

    $ quasar run iconify create pic -s --mark some_file
    $ quasar iconify create pic -s --mark some_file
        # Note: "iconify" is an example and not a real extension.
        # Looks for installed extension called "iconify"
        # (quasar-app-extension-iconify extension package)
        # and runs its custom defined "create" command
        # with "pic" argument and "-s --mark some_file" params

  Options
    --help, -h       Displays this message
```

## Serve
这个命令也可以在生产中使用，它由`@quasar/cli`包的全局安装提供。

```bash
$ quasar serve -h

  Description
    Start a HTTP(S) server on a folder.

  Usage
    $ quasar serve [path]
    $ quasar serve . # serve current folder

    If you serve a SSR folder built with the CLI then
    control is yielded to /index.js and params have no effect.

  Options
    --port, -p              Port to use (default: 4000)
    --hostname, -H          Address to use (default: 0.0.0.0)
    --gzip, -g              Compress content (default: true)
    --silent, -s            Suppress log message
    --colors                Log messages with colors (default: true)
    --open, -o              Open browser window after starting
    --cache, -c <number>    Cache time (max-age) in seconds;
                            Does not apply to /service-worker.js
                            (default: 86400 - 24 hours)
    --micro, -m <seconds>   Use micro-cache (default: 1 second)

    --history               Use history api fallback;
                              All requests fallback to /index.html,
                              unless using "--index" parameter
    --index, -i <file>      History mode (only!) index url path
                              (default: index.html)

    --https                 Enable HTTPS
    --cert, -C [path]       Path to SSL cert file (Optional)
    --key, -K [path]        Path to SSL key file (Optional)
    --proxy <file.js>       Proxy specific requests defined in file;
                            File must export Array ({ path, rule })
                            See example below. "rule" is defined at:
                            https://github.com/chimurai/http-proxy-middleware
    --cors                  Enable CORS for all requests
    --help, -h              Displays this message

  Proxy file example
    module.exports = [
      {
        path: '/api',
        rule: { target: 'http://www.example.org' }
      }
    ]
    --> will be transformed into app.use(path, httpProxyMiddleware(rule))
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

最后，运行这些文件中的一个。

```bash
$ node my-server.js
```
