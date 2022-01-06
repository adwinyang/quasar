---
title: 带排版的电子版
desc: 如何在Quasar中使用Electron的类型脚本
---

为了用Typescript支持Electron，你需要：1:

1. 确保你正在使用`@quasar/app` v3.0.0-beta.8+。
2. 编辑quasar.conf.js > supportTS。将其设置为`true`或使用Object形式。
3. 将/src-electron中的文件扩展名从`.js`改为`.ts`，并进行必要的TS代码修改。

::: tip
`electron-packager`和`electron-builder`从它们自己的软件包中导出它们的配置类型。
由于自动完成到`quasar.conf.js`依赖于这些类型，属性`electron.packager`和`electron.builder`只有在各自的软件包安装后才会被完全输入。
你可以通过在Electron模式下运行构建命令来强制安装选定的捆绑器(取决于你的`electron.bundler`选项)。`quasar build -m electron`。
:::

更多信息。[支持TS](/quasar-cli/supporting-ts)
