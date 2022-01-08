---
title: 移动应用程序构建命令
desc: 在用 Cordova 开发或构建混合移动应用时的 Quasar CLI 命令列表。
---
[Quasar CLI](/quasar-cli/installation) 使得从你的源代码中开发或构建最终的可分发程序变得异常简单。

在我们深入研究之前，请确保你已经安装了Cordova CLI。

```bash
$ npm install -g cordova
```

## 开发
```bash
$ quasar dev -m [ios|android]

# ..或显示形式:
$ quasar dev -m cordova -T [ios|android]

# ..或更长的形式:
$ quasar dev --mode cordova --target [ios|android]

# 使用特定的模拟器（-emulator，-e）
$ quasar dev -m ios -e iPhone-7
# 或
$ quasar dev -m ios -e iPhone-X,com.apple.CoreSimulator.SimRuntime.iOS-12-2

# 将额外参数和/或选项传递给
# 底层 “cordova” 可执行文件：
$ quasar dev -m ios -- some params --and options --here
# 在 Windows 上使用 Powershell 时：
$ quasar dev -m ios '--' some params --and options --here
```

然而，如果你希望打开 IDE(Android Studio / Xcode)，并从中手动选择模拟器(或同时选择多个模拟器！)，在它/他们的上面运行开发应用(或在真正的移动/平板设备上运行开发应用), 请执行以下操作：

```bash
$ quasar dev -m [ios|android] --ide
```

::: warning
在Android Studio中，你会看到一条信息，建议升级 Gradle 版本。**不要升级 Gradle**，因为这将破坏 Cordova 项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle升级" class="q-my-md fit rounded-borders" style="max-width: 350px">。

如果你遇到任何IDE错误，那么请点击 文件(File) > 无效缓存(Invalidate) 并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::

为了使你能够在设备模拟器上或直接在手机上开发(包括热模块重装)，Quasar CLI 遵循以下步骤。
1. 检测你的机器的外部IP地址。如果检测到有多个这样的IP，那么它会要求你选择一个。如果你将使用手机进行开发，那么选择你的机器的IP地址，该地址可以从手机/平板电脑上ping到。
2. 它在你的机器上启动了一个开发服务器。
3. 它暂时改变`/src-cordova/config.xml`中的`<content/>`标签，指向之前检测到的IP。这允许应用程序连接到开发服务器。
3. 它推迟到Cordova CLI，用临时改变的config.xml建立一个本地应用程序。
4. Cordova CLI检查是否有手机/平板电脑连接到你的开发机器。如果有，它就在上面安装开发应用程序。如果没有，它就启动一个模拟器并运行开发应用程序。
5. 最后，它恢复对`/src-cordova/config.xml`的临时修改。

::: danger
如果在手机/平板电脑上开发，非常重要的一点是，你的构建机器的外部IP地址可以从手机/平板电脑上访问，否则你会得到一个只有白屏的开发应用。还要检查你的机器的防火墙是否允许连接到开发选择的端口。
:::

### 启用iOS现代构建

默认情况下，由于 Cordova 问题，iOS 的 Xcode 现代构建(modern build)被禁用。然而，如果你知道你在做什么，并且你想启用它，可以从`/quasar.conf.js`中这样做。

```js
cordova: {
  noIosLegacyBuildFlag: true
}
```

如果你想在 "build.json" 中指定构建类型，上述内容也适用。

## 为生产而构建
```bash
$ quasar build -m [android|ios]

# ..或者显示指定:
$ quasar build -m cordova -T [ios|android]

# ..或更长的开式:
$ quasar build --mode cordova --target [ios|android]

# 这会跳过 .app 或 .apk 创建并只填写 /src-cordova/www
$ quasar build -m [ios|android] --skip-pkg

# 传递额外的参数和/或选项到
# 底层 “cordova” 可执行文件：
$ quasar build -m ios -- some params --and options --here
```

* 这些命令解析并建立你的`/src`文件夹，然后覆盖`/src-cordova/www`，然后交由Cordova CLI来触发实际的本地应用创建。

* 除非另有配置，否则构建的软件包将位于`/dist/cordova`中。

* 如果你希望跳过Cordova CLI打包步骤，只填充`/src-cordova/www`文件夹。

```bash
$ quasar build -m [ios|android] --skip-pkg
```

* 如果你希望使用IDE(Android Studio / Xcode)手动构建最终资产，而不是做终端构建，那么。

```bash
$ quasar build -m [ios|android] --ide
```

::: warning
在Android Studio中，你会看到一条信息，建议升级 Gradle 版本。**不要升级 Gradle**，因为这将破坏 Cordova 项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle升级" class="q-my-md fit rounded-borders" style="max-width: 350px">。

如果你遇到任何IDE错误，那么请点击文件>无效缓存并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::

如果你想在生产构建中启用UI代码的调试功能。

```bash
$ quasar build -m [ios|android] -d

# ..或更长的形式
$ quasar build -m [ios|android] --debug
```
