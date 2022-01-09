---
title: 配置 Electron
desc: 如何用 Quasar CLI 管理你的 Electron 应用程序。
related:
  - /quasar-cli/quasar-conf-js
---
我们将使用 Quasar CLI 来开发和构建一个Electron App。构建SPA、PWA、移动应用或Electron应用之间的区别只是由 "quasar dev "和 "quasar build "命令中的 "mode "参数决定。

但首先，让我们学习一下如何配置Electron构建。

## Quasar.conf.js
你可能会注意到，`/quasar.conf.js`包含一个名为 `Electron` 的属性。

```js
// 如果你想改变默认文件
// (注意到没有扩展名，所以它可以解析为.js和.ts)
sourceFiles: {
  electronMain: 'src-electron/electron-main',
  electronPreload: 'src-electron/electron-preload'
},

//  Electron 配置
electron: {
  bundler: 'packager', // or 'builder'

  //  Electron 包装器选项
  // https://electron.github.io/electron-packager/master/
  packager: {
    //...
  },

  //  Electron 构建器选项
  // https://www.electron.build/configuration/configuration
  builder: {
    //...
  },

  // 在yarn/npm安装时指定额外参数
  // 捆绑前，在未打包的文件夹中，与以下任何一种文件捆绑在一起
  //  Electron 包装师或 Electron 建造师。
  // 示例：['--ignore-optional', '--some-other-param' ]
  unPackagedInstallParams: [],

  // 可选；添加/删除/更改属性
  // 生产中生成的软件包.json的
  extendPackageJson (pkg) {
    // 直接改变属性的包。
    // 不需要归还任何东西
  },

  // 可选的；webpack的配置对象
  // 只有主进程(/src-electron/main-process/electron-main.js)。
  extendWebpackMain (cfg) {
    // 直接改变cfg的props。
    // 不需要归还任何东西
  },

  // optional; 等同于extendWebpackMain()，但使用webpack-chain。
  // 仅用于主进程(/src-electron/main-process/electron-main.js)。
  chainWebpackMain (chain) {
    // 链是一个webpack-chain实例
    // 的Webpack配置

    // 示例：
    // chain.plugin('eslint-webpack-plugin')
    //   .use(ESLintPlugin, [{ extensions: [ 'js' ] }] )
  },

  // 可选的；webpack的配置对象
  // 只有预加载过程(/src-electron/main-process/electron-preload.js)。
  extendWebpackPreload (cfg) {
    // 直接改变cfg的props。
    // 不需要归还任何东西
  },

  // optional; 等同于extendWebpackPreload()，但使用webpack-chain。
  // 仅用于预加载过程(/src-electron/main-process/electron-preload.js)。
  chainWebpackPreload (chain) {
    // 链是一个webpack-chain实例
    // 的Webpack配置

    // 示例：
    // chain.plugin('eslint-webpack-plugin')
    //   .use(ESLintPlugin, [{ extensions: [ 'js' ] }] )
  }
}
```

"packager" 属性指的是[electron-packager 选项](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options) 。`dir`和`out`属性会被 Quasar CLI 覆盖以确保最佳效果。

builder "属性指的是[electron-builder 选项](https://www.electron.build/configuration/configuration)。

## 打包者与构建者
你必须选择使用打包器或构建器。它们都是优秀的开源项目，但是它们的需求略有不同。使用packager，你将能够从一台机器上为所有主要的平台构建未签署的项目(有限制)。虽然这很好，但如果你只是想做一些快速和肮脏的事情，在构建器中有更多的平台粒度(和一般抛光)。在一台电脑上交叉编译你的二进制文件，在builder中并不奏效(或者我们还没有找到配方......)。
