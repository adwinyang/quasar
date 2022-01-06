---
title: Electron构建命令
desc: 在开发或建立一个桌面应用程序时，Quasar CLI的命令列表。
---
[Quasar CLI](/start/quasar-cli)使得从你的源代码中开发或构建最终的可分发文件变得异常简单。

## 开发
```bash
$ quasar dev -m electron

# ..or the longer form:
$ quasar dev --mode electron

# passing extra parameters and/or options to
# underlying "electron" executable:
$ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
# when on Windows and using Powershell:
$ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox
```

It opens up an Electron window with dev-tools included. You have HMR for the renderer process and changes to main process are also picked up (but the latter restarts the Electron window on each change).

Check how you can tweak Webpack config Object for the Main Process and the Preload script on the [Configuring Electron](/quasar-cli/developing-electron-apps/configuring-electron) page.

### Chrome DevTools
While in dev mode, hit the following combination (while your app window has focus):
- macOS: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

### Vuejs Devtools
Should you want to also access Vue Devtools for the renderer thread:

```bash
$ quasar dev -m electron --devtools
```

## 为生产而建
```bash
$ quasar build -m electron

# ..or the longer form:
$ quasar build --mode electron
```

它为生产构建你的应用程序，然后使用electron-packager将其打包成可执行文件。在[Configuring Electron](/quasar-cli/developing-electron-apps/configuring-electron)页面查看如何进行配置。

如果你想在生产构建中启用UI代码的调试功能。

```bash
$ quasar build -m electron -d

# ..or the longer form
$ quasar build -m electron --debug
```

### 给非Windows用户的说明
如果你想使用非Windows平台为Windows构建一个自定义的图标，你必须安装[wine](https://www.winehq.org/)。[更多信息](https://github.com/electron-userland/electron-packager#building-windows-apps-from-non-windows-platforms)。

## 发布(仅适用于electron-builder)
```bash
$ quasar build -m electron -P always

# ..or the longer form:
$ quasar build --mode electron --publish always
```

你可以指定使用`electron-builder`来构建你的应用程序，可以直接在命令行(`--bundler builder`)或者在`electron.bundler`的`quasar.conf.js`中明确设置它。当使用`electron-packager`时，这个标志没有作用。

目前(2019年6月)支持的发布目的地包括GitHub、Bintray、S3、Digital Ocean Spaces或通用HTTPS服务器。更多信息，包括如何创建有效的发布指令，可以在[这里](https://www.electron.build/configuration/publish)找到。

`-P`的有效选项是 "onTag"、"onTagOrDraft"、"always "和 "never"，在上述链接中有解释。此外，你必须在你的`electron.builder`的`quasar.conf.js`中拥有有效的`publish`配置说明。

一个非常基本的配置是将Windows EXE设置文件发布到Amazon S3，可能看起来像这样。

```js
// quasar.conf.js

electron: {
  bundler: 'builder', // set here instead of using command line flag --bundler
  builder: {
    appId: 'com.electron.myelectronapp',
    win: {
      target: 'nsis'
    },
    publish: {
      'provider': 's3',
      'bucket': 'myS3bucket'
    }
  }
```
