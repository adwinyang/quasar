---
title: 电容器构建命令
desc: 使用Capacitor开发或建立混合移动应用程序时，Quasar CLI的命令列表。
---

[Quasar CLI](/quasar-cli/installation)使得从你的源代码中开发或构建最终的可分发文件变得异常简单。

## 开发

```bash
$ quasar dev -m capacitor -T [ios|android]

# ..or the longer form:
$ quasar dev --mode capacitor --target [ios|android]
```

它将打开IDE(Android Studio / Xcode)，从那里你可以手动选择模拟器(或同时选择多个模拟器！)，并在它/他们身上安装开发应用。你也可以在真正的移动/平板电脑设备上运行开发应用程序。

::: warning
在Android Studio中，你会看到一条信息，建议升级Gradle版本。**不要升级Gradle**，因为这将破坏Capacitor项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle升级" class="q-my-md fit rounded-borders" style="max-width: 350px">。

如果你遇到任何IDE错误，那么请点击文件>无效缓存并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::

为了使你能够在设备模拟器上或直接在手机上开发(包括热模块重装)，Quasar CLI遵循以下步骤。

1. 检测你的机器的外部IP地址。如果检测到有多个这样的IP，那么它会要求你选择一个。如果你将使用手机进行开发，那么选择你的机器的IP地址，该地址可以从手机/平板电脑上ping到。
2. 它在你的机器上启动了一个开发服务器。
3. 它告诉Capacitor使用之前检测到的IP。这样，应用程序就可以连接到开发服务器。
4. 它使用Capacitor CLI来更新你所有的插件。
5. 最后，它打开你的本地IDE。在这里运行你的应用程序，它将自动连接到开发服务器。

::: danger
如果在手机/平板电脑上开发，非常重要的一点是，你的构建机器的外部IP地址可以从手机/平板电脑上访问，否则你会得到一个只有白屏的开发应用。还要检查你的机器的防火墙是否允许连接到开发选择的端口。
:::

## 为生产而建

```bash
$ quasar build -m capacitor -T [ios|android]

# ..or the longer form:
$ quasar build --mode capacitor --target [ios|android]
```

* 这些命令解析并构建你的`/src`文件夹，然后覆盖`/src-capacitor/www`，然后使用Gradle/xcodebuild生成最终的资产，进入手机/平板电脑。

* 除非另有配置，否则构建的包将位于`/dist/capacitor`中。

* 如果你希望跳过Gradle/xcodebuild步骤，只填充`/src-capacitor/www`文件夹。

```bash
$ quasar build -m capacitor -T [ios|android] --skip-pkg
```

* 如果你希望使用IDE(Android Studio / Xcode)手动构建最终资产，而不是做终端构建，那么。

```bash
$ quasar build -m capacitor -T [ios|android] --ide
```

::: warning
在Android Studio中，你会看到一条信息，建议升级Gradle版本。**不要升级Gradle**，因为这将破坏Capacitor项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle升级" class="q-my-md fit rounded-borders" style="max-width: 350px">。

如果你遇到任何IDE错误，那么请点击文件>无效缓存并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::

如果你想在生产构建中启用UI代码的调试功能。

```bash
$ quasar build -m capacitor -T [ios|android] -d

# ..or the longer form
$ quasar build -m capacitor -T [ios|android] --debug
```
