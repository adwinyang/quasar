---
title: 配置BEX
desc: 如何用 Quasar CLI 管理您的浏览器扩展。
---

在配置任何东西之前，我们需要了解BEX是如何结构的。一个BEX可以是以下的一个(或多个)。

1. 在浏览器中以自己的标签运行
2. 在[开发工具](https://developer.chrome.com/extensions/devtools) 窗口中运行。
3. 在[弹出](https://developer.chrome.com/extensions/user_interface#popup) 窗口中运行。
4. 以[选项](https://developer.chrome.com/extensions/options) 窗口运行。
5. 在网页的背景下运行(注入网站)。

您不需要为上述每一种BEX类型开发新的 Quasar 应用程序，因为一个 Quasar 应用程序可以在上述**的所有实例中运行。你可以在[类型部分](/quasar-cli/developing-browser-extensions/types-of-bex)中了解更多信息。

## Manifest.json

你的BEX最重要的配置文件是`/src-bex/manifest.json`。建议你在开始你的项目之前[阅读一下这个文件](https://developer.chrome.com/extensions/manifest)。

当您创建Quasar BEX时，清单文件已经被配置为添加您运行BEX所需的基本属性。这包括默认的后台脚本、内容脚本和一个css文件，该文件被注入到BEX运行的网页环境中。

::: tip
请注意，manifest.json文件在构建时被修改，以便自动注入所需的JavaScript文件。
:::

## 后台和内容脚本

每个BEX的背后都有一个[内容脚本](https://developer.chrome.com/extensions/content_scripts) 和一个[后台脚本](https://developer.chrome.com/extensions/background_pages) 。在编写你的第一个BEX之前，最好先了解这些脚本的内容。

总的来说：

**后台脚本** - 在BEX本身的上下文中运行，可以监听所有可用的浏览器扩展事件。*每个BEX*只能有一个后台脚本的实例。
**内容脚本** - 在网页的上下文中运行。每个运行扩展的标签将有一个新的内容脚本实例。

::: tip
鉴于内容脚本在网页上下文中运行，这意味着只有与网页交互的BEX才能使用内容脚本。弹出窗口、选项和开发工具**不会有一个*内容脚本*在它们后面运行。然而，它们都会有一个*后台脚本*。
:::

## CSS

任何你想提供给你的网页(而不是你的 Quasar 应用程序)的样式都应该包含在`src-bex/css/content-css.css`中，因为这个文件会自动注入`manifest.json`文件。

::: warning
这必须是本地CSS，因为它没有通过Sass进行预处理。
:::

## 钩子文件

在Quasar BEX中，你会得到`background-hook.js`, `content-hook.js`和`dom-hook.js`。这些文件被设计成可以让你访问一座桥梁，它缩小了与BEX各层之间的通信差距。我们将在[下一节](/quasar-cli/developing-browser-extensions/bex-communication)中更详细地探讨它们。
