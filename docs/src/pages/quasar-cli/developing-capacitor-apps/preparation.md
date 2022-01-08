---
title:  Capacitor 应用的准备
desc: 在使用 Capacitor 开发 Quasar 混合移动应用程序之前您需要做什么。
---

在我们深入到实际的开发中去之前，我们需要做一些准备工作。

## 1. 安装

### Android设置

* 你将需要在你的机器上安装Android Studio和Android平台的SDK。你可以[在这里下载Android Studio](https://developer.android.com/studio/index.html) ，之后按照这些[安装步骤](https://developer.android.com/studio/install.html) 进行。

* 确保在你安装了Android SDK之后，你再接受其许可证。打开终端，进入安装SDK的文件夹，在tools/bin中，调用`sdkmanager --licenses`。

::: warning
环境变量`ANDROID_HOME`已被废弃，取而代之的是`ANDROID_SDK_ROOT`。根据你的Android Studio的版本，你可能需要一个或另一个。两者都设置也无妨。
:::

* 在你的路径中添加Android安装。

#### Unix (macOS, linux)

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
PATH=$PATH:$ANDROID_SDK_ROOT/tools; PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

> 请注意，有时`/Android/Sdk`文件夹会被添加到你的用户文件夹内的`/Library/`中。检查你的用户文件夹，如果`/Android/`文件夹只在`/Library/`内，请执行：`export ANDROID_SDK_ROOT="$HOME/Library/Android/Sdk"`或`export ANDROID_HOME="$HOME/Library/Android/Sdk"`代替。

#### Windows

```bash
setx ANDROID_HOME "%USERPROFILE%\AppData\Local\Android\Sdk"
setx ANDROID_SDK_ROOT "%USERPROFILE%\AppData\Local\Android\Sdk"
setx path "%path%;%ANDROID_SDK_ROOT%\tools;%ANDROID_SDK_ROOT%\platform-tools"
```

- 启动Android studio(在你安装它的文件夹中检查可执行文件)。下一步是安装各个SDK。

- 打开窗口底部的 "配置 "菜单。

  ![SDK管理器](https://cdn.quasar.dev/img/Android-Studio-SDK-Menu.png 'SDK管理器')

- 选择所需的SDK并点击 "应用 "来安装SDK。

  ![SDK选择](https://cdn.quasar.dev/img/Android-Studio-SDK-selection.png 'SDK选择')

### iOS设置

你将需要一个安装有[Xcode](https://developer.apple.com/xcode/)的macOS。在你安装完之后，打开Xcode以获得许可提示。接受许可，然后你可以关闭它。

## 2. 添加 Capacitor Quasar 模式

为了开发/构建一个移动应用程序，我们需要在我们的 Quasar 项目中添加Capacitor模式。这将使用Capacitor CLI在`/src-capacitor`文件夹中生成一个Capacitor项目。

```bash
$ quasar mode add capacitor
```

## 3. 开始开发

要用HMR启动一个开发服务器，运行下面的命令。

```bash
$ quasar dev -m capacitor -T [android|ios]
```

一旦开发服务器准备就绪，你的IDE将打开(Android Studio或Xcode)，从那里你可以手动选择模拟器(或同时选择多个！)并在它/他们身上安装开发应用程序。你也可以在连接的移动/平板电脑设备上运行开发应用程序。

::: warning
在Android Studio中，你会看到一条信息，建议升级 Gradle 版本。**不要升级 Gradle**，因为这将破坏Capacitor项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle升级" class="q-my-md fit rounded-borders" style="max-width: 350px">。

如果你遇到任何IDE错误，那么请点击文件>无效缓存并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::
