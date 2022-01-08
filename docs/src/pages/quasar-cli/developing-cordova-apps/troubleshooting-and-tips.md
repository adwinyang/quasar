---
title: 可多瓦的故障排除和提示
desc: 使用 Cordova 的 Quasar 混合移动应用程序的技巧和窍门。
---

## $q.cordova
当你用 Cordova 模式开发一个移动应用程序时，你可以在你的Vue文件中访问`$q.cordova`。这是对全局的`cordova`对象的别名。

## Android提示

### Android远程调试
如果你正在调试Android应用程序，你可以通过连接到Android手机/平板电脑的USB线，使用 Google 浏览器[远程调试](https://developers.google.com/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging?hl=en)。它也可以用于仿真器。

这样，你就可以直接使用Chrome开发工具，在模拟器/手机/平板电脑上运行你的应用程序。检查元素，检查控制台输出，等等。

![安卓远程调试](https://cdn.quasar.dev/img/remote-debug.png "Android远程调试")
![Android远程调试](https://cdn.quasar.dev/img/remote-debug-2.png "Android远程调试")

### 接受许可证
如果你在让Android构建完成时遇到问题，并且看到类似的信息：

```
> Failed to install the following Android SDK packages as some licenses have not been accepted.
```

如果是这种情况，你需要接受所有的许可证。值得庆幸的是，有一个工具可以做到这一点。

- Linux：`sdkmanager --licenses`。
- macOS: `~ Library/Android/sdk/tools/bin/sdkmanager --licenses`。
- Windows: `%ANDROID_SDK_ROOT%/tools/bin/sdkmanager --licenses`.

### 安装SDK后未找到 Android SDK

::: warning
环境变量`ANDROID_HOME`已被废弃，取而代之的是`ANDROID_SDK_ROOT`。根据你的Android Studio的版本，你可能需要一个或另一个。两者都设置也无妨。
:::

一些较新的基于Debian的操作系统(如ubuntu，elementary OS)在你安装并(正确)配置了环境后，可能会让你看到 "找不到Android SDK"。其输出结果可能与此类似。

```bash
$ cordova requirements

Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: installed true
Android target: not installed
Android SDK not found. Make sure that it is installed. If it is not at the default location, set the ANDROID_HOME (or ANDROID_SDK_ROOT) environment variable.
Gradle: not installed
Could not find gradle wrapper within Android SDK. Might need to update your Android SDK.
Looked here: /home/your_user/Android/Sdk/tools/templates/gradle/wrapper
Error: Some of requirements check failed
```

这可能有两个不同的原因。通常情况下，路径的配置是不正确的。第一步是验证你的路径是否设置正确。这可以通过运行以下命令来完成：

```bash
$ echo $ANDROID_HOME

# or

$ echo $ANDROID_SDK_ROOT
```

预期的输出应该是一个类似于这个`$HOME/Android/Sdk'的路径。这样运行之后。


```bash
$ ls -la $ANDROID_HOME

# or

$ ls -la $ANDROID_SDK_ROOT
```

要确保该文件夹包含SDK。预期的输出应该包含像 "工具"、"来源"、"平台-工具 "等文件夹。

```bash
$ echo $PATH
```

输出应该包含Android SDK的 "工具 "文件夹和 "平台工具 "的每一个条目。这可能看起来像这样：

```bash
/home/your_user/bin:/home/your_user/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/home/your_user/Android/Sdk/tools:/home/your_user/Android/Sdk/platform-tools
```

> 如果你确保了你的路径设置正确，但仍然在 `cordova 需求` 上得到错误，你可以尝试以下修复。[手动替换Android Studio的 "工具 "文件夹](https://github.com/meteor/meteor/issues/8464#issuecomment-288112504)

### Android Studio

在Android Studio中(如果你在`/src-cordova/platforms/android`上打开它)，你会看到一条信息，建议升级 Gradle 版本。**不要升级 Gradle**，因为这将破坏 Cordova 项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle升级" class="q-mb-md fit rounded-borders" style="max-width: 350px">。

如果你遇到任何IDE错误，那么请点击文件>无效缓存并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="fit rounded-borders" style="max-width: 350px">

### 在Linux上设置设备

当你试图在Android手机/平板电脑上直接运行你的应用程序时，可能会遇到`?????? no permissions`的问题。

以下是你如何解决这个问题。

```bash
# 创建 .rules 文件并插入内容
# 从下面这个例子
sudo vim /etc/udev/rules.d/51-android.rules
sudo chmod 644   /etc/udev/rules.d/51-android.rules
sudo chown root. /etc/udev/rules.d/51-android.rules
sudo service udev restart
sudo killall adb
```

`51-android.rules`的内容。
```
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0e79", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0502", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0b05", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="413c", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0489", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="091e", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="18d1", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="12d1", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="24e3", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2116", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0482", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="17ef", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1004", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="22b8", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0409", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2080", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0955", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2257", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="10a9", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1d4d", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0471", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04da", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="05c6", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1f53", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04e8", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04dd", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fce", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0930", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="19d2", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1bbb", MODE="0666"
```

现在运行`adb devices`应该可以发现你的设备。

### 构建后的调试
在`quasar dev`和发布一个完整的应用程序之间，有一些中间状态可以帮助调试。如果你的应用程序在`quasar dev`上运行正常，但在`quasar build`后不能正常运行，你有两个选择。

* 进入你的`src-cordova`目录，`cordova run [platform]`。
* 你将运行最终构建，但你仍然可以通过有线连接使用Chrome DevTools远程调试(见上文)，以检查内部网络的内部结构。在运行.apk文件时，您不能这样做。
* 如需了解更多细节，请阅读Cordova [平台指南](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#using-buildjson) 和 [CLI参考](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html)
* 打开Android Studio，观看Logcat
* 在这里你可以观看与应用程序有关的一切，以及它与底层Android操作系统的互动。在Android Studio中打开你的 Cordova 项目后，从顶部菜单进入`Run`...`Debug`。Android Studio将要求你确认设备或模拟器，然后将部署应用程序。在底部窗口，选择`Logcat`你可能想使用过滤器来减少信息量。你应该看到`[你的应用程序ID].MainActivity.onCreate()`标志着应用程序的启动，然后是与你的应用程序功能相关的各种信息。
* 注意：这应该只适用于有经验的Android开发者。如果你的应用程序不能正常运行，更有可能是`quasar dev`或`cordova run`可以揭示问题。

::: danger Important!
如果你用上述方法发现一个错误，不要直接编辑输出文件(可能是`www`文件夹)，因为它们很快就会被覆盖。回到你的quasar源文件，修复这个错误，然后重新运行`quasar build`。
:::

## ###iOS提示

### 未找到设备类型
如果你在运行 `$ quasar dev -m cordova -T ios` 时遇到这个错误：

```
No target specified for emulator. Deploying to undefined simulator
Device type "com.apple.CoreSimulator.SimDeviceType.undefined" could not be found.
```

那么这意味着你需要指定一个模拟器。根据你的 Cordova CLI 版本，这里有一些示例。

```bash
$ quasar dev -m cordova -T ios -e iPhone-X,12.2
# 或者在计算机上安装旧版本的Cordova CLI时：
$ quasar dev -m cordova -T ios -e iPhone-X,com.apple.CoreSimulator.SimRuntime.iOS-12-2
```

### 启用现代构建
默认情况下，由于 Cordova 问题，iOS的Xcode现代构建被禁用。然而，如果你知道你在做什么，并且你想启用它，可以从`/quasar.conf.js`中这样做。

```js
cordova: {
  noIosLegacyBuildFlag: true
}
```

如果你想在你的 "build.json" 中指定构建类型，上述内容也适用。

### iOS远程调试
如果你正在调试iOS应用程序，你可以使用Safari开发者工具，通过连接到iOS手机/平板电脑的USB线进行远程调试。它也可以用于仿真器。

这样你就可以直接使用Safari开发者工具来调试你在模拟器/手机/平板上运行的应用程序。检查元素，检查控制台输出，等等，等等。

首先在Safari的设置中启用 "开发者 "菜单选项。然后，如果你导航到 "开发者 "菜单选项，你会看到你的模拟器或连接的设备列在靠近顶部的位置。从这里你可以打开开发者工具。

### 状态栏和凹槽安全区域
由于手机有状态栏和/或凹槽，在 Cordova 上构建时，你的应用程序的风格可能需要一些调整。为了防止你的应用程序的部分内容进入状态栏后面，有一个全局CSS变量可以用来创建一个 "安全区域"。这个变量可以应用在你的应用程序的顶部和底部的padding或margin。

 Quasar 在QHeader/QFooter和Notify中默认支持这些CSS安全区域。然而，重要的是要经常在几个模型上检查你的 Cordova 构建，看看你的应用程序的所有情况是否正确处理了安全区域。

如果你需要手动调整你的CSS，你可以用。

```css
/* 用于应用程序的页眉 */
padding-top: constant(safe-area-inset-top); // for iOS 11.0
padding-top: env(safe-area-inset-top); // for iOS 11.2 +
/* 用于应用程序的页脚 */
padding-bottom: constant(safe-area-inset-bottom);
padding-bottom: env(safe-area-inset-bottom);
```

当然，你也可以根据你的应用，用`margin`代替`padding`来使用上述示例。

为了确保这些内容只有在通过 Cordova 构建在移动端打开时才会被添加，你可以检查CSS类`.cordova`，它是由 Quasar 自动添加到主体中的。例如：

```css
body.cordova .my-selector {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
```

### 禁用iOS的橡皮筋效果
当用 Cordova 构建一个 iOS 应用程序时，如果你想[禁用橡皮筋效应](https://www.youtube.com/watch?v=UjuNGpU29Mk) ，请在你的`/src-cordova/config.xml`中添加这个：

```xml
<preference name="DisallowOverscroll" value="true" />
```
