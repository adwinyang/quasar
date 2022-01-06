---
title: 为Cordova应用程序做准备
desc: 在用Cordova开发Quasar混合移动应用之前，你需要做什么。
---
在我们深入到实际的开发中去之前，我们需要做一些准备工作。

## 1. 安装
第一步是确保你安装了Cordova CLI和必要的SDK。

```bash
$ npm install -g cordova
```

::: warning
根据你的Android Studio的版本，你可能需要重新启用 "Android SDK工具"。你可以通过以下方式来完成这项工作
到 "工具 > SDK管理器 > SDK工具"，然后取消勾选 "隐藏过时的软件包"，并勾选 "Android SDK工具(过时)"。
**下面的说明是假设已经完成了这项工作。
:::

::: warning
环境变量`ANDROID_HOME`已被废弃，取而代之的是`ANDROID_SDK_ROOT`。根据你的Android Studio的版本，你可能需要一个或另一个。两者都设置也无妨。
:::

### 安卓设置

*在这一步之后，你将需要在你的机器上安装Android平台的SDK。你可以[在这里下载Android Studio](https://developer.android.com/studio/index.html)，之后按照这些[安装步骤](https://developer.android.com/studio/install.html)进行。

*确保在你安装了Android SDK之后，你再接受其许可证。打开终端，进入安装SDK的文件夹，在tools/bin中，调用`sdkmanager --licenses`。

* 在你的路径中添加Android安装。

#### Unix (macOS, linux)

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export PATH=$PATH:$ANDROID_SDK_ROOT/tools; PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

> 请注意，有时`/Android/Sdk`文件夹会被添加到你的用户文件夹内的`/Library/`中。检查你的用户文件夹，如果`/Android/`文件夹只在`/Library/`内，请执行：`export ANDROID_SDK_ROOT="$HOME/Library/Android/Sdk"`或`export ANDROID_HOME="$HOME/Library/Android/Sdk"`代替。

#### Windows

安装完Android Studio后，你还需要安装两个软件。
* 来自Oracle的JDK。它可以在[这里]找到(https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* Gradle。它曾经可以从Android Studio中使用，但现在你必须单独安装它。cordova需要一个非常特殊的版本。你可以下载它[这里](https://downloads.gradle-dn.com/distributions/gradle-4.10.3-all.zip)

然后，你将不得不设置环境变量。你将需要设置以下变量。Cordova已经有一个很好的指南。它可以找到[这里](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#setting-environment-variables)。你需要。
* 添加ANDROID_SDK_ROOT。它可以安全地被设置为。"%USERPROFILE%AppData\Local\Android\Sdk"
* 在你的路径中添加两个ANDROID_SDK_ROOT目录：%ANDROID_SDK_ROOT%\tools;%ANDROID_SDK_ROOT%\platform-tools
*将Gradle添加到你的路径中。注意，gradle没有安装程序。你只要把二进制文件放在你想要的地方，然后把bin目录添加到你的路径中。

如果你有一个命令提示符或Powershell的init脚本，你可以试试这个。
```bash
setx ANDROID_HOME "%USERPROFILE%\AppData\Local\Android\Sdk"
setx ANDROID_SDK_ROOT "%USERPROFILE%\AppData\Local\Android\Sdk"
setx path "%path%;%ANDROID_SDK_ROOT%\tools;%ANDROID_SDK_ROOT%\platform-tools;<gradle_path>\bin;"
```

工具安装完毕后，用正确的SDK设置Android Studio并创建一个虚拟机。

* 启动Android studio(在你安装它的文件夹中检查可执行文件)。下一步是安装各个SDK。

* 打开窗口底部的 "配置 "菜单。

![SDK管理器](https://cdn.quasar.dev/img/Android-Studio-SDK-Menu.png "SDK管理器")

* 选择所需的SDK。根据2019年12月，Cordova需要android-28(Android 9.0 - Pie)，所以一定要包括它。点击 "应用 "来安装SDK。

![SDK选择](https://cdn.quasar.dev/img/Android-Studio-SDK-selection.png "SDK选择")

### iOS设置

你将需要一个安装有[Xcode](https://developer.apple.com/xcode/)的macOS。安装完毕后，打开Xcode以获得许可证提示。接受许可，然后你可以关闭它。

## 2. 添加Cordova Quasar模式
为了开发/构建一个移动应用程序，我们需要添加Cordova模式到我们的Quasar项目。这样做的目的是，它使用Cordova CLI在`/src-cordova`文件夹中生成一个Cordova项目。`/src-cordova/www`文件夹将在你每次构建时被覆盖。

```bash
$ quasar mode add cordova
```

## 3. 添加平台
要切换到cordova项目，请输入。

```bash
$ cd src-cordova
```

目标平台由Quasar CLI按需安装。然而，如果你想手动添加一个平台，请输入。

```bash
$ cordova platform add [android|ios]
```

要验证一切是否正常，请输入。

```bash
$ cordova requirements
```

> 在一些较新的基于Debian的操作系统上，当运行`cordova requirements`时，你可能会面临一个非常持久的问题。请参阅["安装后未找到Android SDK"](/quasar-cli/developing-cordova-apps/troubleshooting-and-tips#Android-SDK-not-found-after-installation-the-SDK)部分寻求帮助。

### 切换到iOS WkWebView

强烈建议切换到WKWebView(但也是可选的！)，因为UIWebView在iOS 12.0中已经被废弃了，这在Cordova的博客文章中有所描述。[https://cordova.apache.org/news/2018/08/01/future-cordova-ios-webview.html](https://cordova.apache.org/news/2018/08/01/future-cordova-ios-webview.html)。

**不过，如果你想取代默认的webview，请明智地选择。每个人都有自己的注意事项。**请确保你访问上面的链接。

#### 选项1：Ionic Webview Plugin

1. 安装Ionic Webview Plugin

```bash
# from /src-cordova
$ cordova plugin add cordova-plugin-ionic-webview
```

2. 在Config.xml中添加ScrollEnabled首选项。

```xml
<platform name="ios">
  <preference name="ScrollEnabled" value="true" />
</platform>
```

3. 有关WkWebViewPlugin的注意事项，请参考Ionic文档。
* [https://beta.ionicframework.com/docs/building/webview](https://beta.ionicframework.com/docs/building/webview)
* [https://github.com/ionic-team/cordova-plugin-ionic-webview](https://github.com/ionic-team/cordova-plugin-ionic-webview)

#### 选项2：Cordova WkWebviewEngine Plugin

1. 安装科多瓦WkWebviewEngine插件

```bash
# from /src-cordova
$ cordova plugin add cordova-plugin-wkwebview-engine
```

2. 有关注意事项和更多信息，请访问。[https://github.com/apache/cordova-plugin-wkwebview-engine](https://github.com/apache/cordova-plugin-wkwebview-engine)

## 4. 开始开发
如果你想直接进入并开始开发，你可以跳过第2和第3步命令，发出下面的一个命令。如果你有一个移动/平板设备连接到你的机器上，你也可以在上面运行开发应用程序，而不是在模拟器上。

```bash
$ quasar dev -m cordova -T [android|ios]

# passing extra parameters and/or options to
# underlying "cordova" executable:
$ quasar dev -m ios -- some params --and options --here
# when on Windows and using Powershell:
$ quasar dev -m ios '--' some params --and options --here
```

这将自动添加Cordova模式和项目，如果它是缺失的。

然而，如果你希望打开IDE(Android Studio / Xcode)，并从那里手动选择模拟器(或同时选择多个模拟器！)，在它/他们身上运行开发应用程序。

```bash
$ quasar dev -m [ios|android] --ide
```

::: warning
在Android Studio中，你会看到一条信息，建议升级Gradle版本。**不要升级Gradle**，因为这将破坏Cordova项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle升级" class="q-my-md fit rounded-borders" style="max-width: 350px">。

如果你遇到任何IDE错误，那么请点击文件>无效缓存并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::
