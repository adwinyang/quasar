---
title: 构建命令
desc:  Quasar CLI 用于开发和构建 Quasar 应用程序的命令列表。
---
我们将涵盖开发和生产构建命令。

::: tip
 Quasar CLI 命令的完整列表。[Commands List](/quasar-cli/commands-list) 。
:::

### 开发
启动一个Node.js本地开发服务器。

```bash
# run development server (with default theme)
$ quasar dev

# on specific port
$ quasar dev -p 9090

# SSR
$ quasar dev -m ssr

# PWA
$ quasar dev -m pwa

# Mobile App
$ quasar dev -m cordova -T [android|ios]
# or the shorter form:
$ quasar dev -m [android|ios]

# Electron App
$ quasar dev -m electron

# passing extra parameters and/or options to
# underlying "cordova" or "electron" executables:
$ quasar dev -m ios -- some params --and options --here
$ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
# when on Windows and using Powershell:
$ quasar dev -m ios '--' some params --and options --here
$ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox
```

### 生产
为生产建立资产。

```bash
# build for production
$ quasar build

# SSR
$ quasar build -m ssr

# PWA
$ quasar build -m pwa

# Mobile App
$ quasar build -m cordova -T [android|ios]
# or the short form:
$ quasar build -m [android|ios]

# passing extra parameters and/or options to
# underlying "cordova" executable:
$ quasar build -m ios -- some params --and options --here
# when on Windows and using Powershell:
$ quasar build -m ios '--' some params --and options --here

# Electron App
$ quasar build -m electron
```
