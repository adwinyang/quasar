---
title:  Capacitor 的故障排除和提示
desc: 使用Capacitor的 Quasar 混合移动应用程序的技巧和窍门。
---

## $q.capacitor
当你用 Capacitor 模式开发移动应用程序时，你可以在你的Vue文件中访问`$q.capacitor`。这是对全局的`Capacitor`对象的别名。

## Android提示

### Android远程调试

如果你正在调试安卓应用程序，你可以通过连接到安卓手机/平板电脑的USB线使用 Google 浏览器[远程调试](https://developers.google.com/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging?hl=en)。它也可以用于仿真器。

这样，你就可以直接使用Chrome开发工具，在模拟器/手机/平板电脑上运行你的应用程序。检查元素，检查控制台输出，等等，等等。

![安卓远程调试](https://cdn.quasar.dev/img/remote-debug.png 'Android Remote Debugging')
![Android远程调试](https://cdn.quasar.dev/img/remote-debug-2.png 'Android远程调试')

### 接受许可证

如果你在让Android构建完成时遇到问题，并且看到类似的信息。

```
> Failed to install the following Android SDK packages as some licenses have not been accepted. (由于某些许可未被接受，因此无法安装以下 Android SDK 包。)
```

如果是这种情况，你需要接受所有的许可证。值得庆幸的是，有一个工具可以做到这一点。

- Linux：`sdkmanager --licenses`。
- macOS: `~ Library/Android/sdk/tools/bin/sdkmanager --licenses`。
- Windows: `%ANDROID_SDK_ROOT%/tools/bin/sdkmanager --licenses`.

### 安装SDK后未找到Android SDK

::: warning
环境变量`ANDROID_HOME`已被废弃，取而代之的是`ANDROID_SDK_ROOT`。根据你的Android Studio的版本，你可能需要一个或另一个。两者都设置也无妨。
:::

一些较新的基于Debian的操作系统(例如ubuntu，elementary OS)在你安装并(正确)配置了环境后，可能会让你看到 "找不到Android SDK"。

这可能有两个不同的原因。通常情况下，路径配置不正确。第一步是验证你的路径设置是否正确。这可以通过运行以下命令来完成。

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

输出应该包含Android SDK的 "工具 "文件夹和 "平台工具 "的每一个条目。这可能看起来像这样。

```bash
/home/your_user/bin:/home/your_user/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/home/your_user/Android/Sdk/tools:/home/your_user/Android/Sdk/platform-tools
```

> 如果你确保了你的路径设置正确，但仍然得到了错误，你可以尝试以下修复。[手动替换Android Studio的 "工具 "文件夹](https://github.com/meteor/meteor/issues/8464#issuecomment-288112504)

### Android Studio

在Android Studio中(如果你在`/src-capacitor/android`上打开它)，你会看到一条信息，建议升级 Gradle 版本。**不要升级 Gradle**，因为这将破坏Capacitor项目。其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle升级" class="q-mb-md fit rounded-borders" style="max-width: 350px">。

如果你遇到任何IDE错误，那么请点击文件>无效缓存并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="fit rounded-borders" style="max-width: 350px">

### 在Linux上设置设备

当你试图在Android手机/平板电脑上直接运行你的应用程序时，可能会遇到`?????? no permissions`的问题。

以下是你如何解决这个问题。

```bash
# create the .rules file and insert the content
# from below this example
sudo vim /etc/udev/rules.d/51-android.rules
sudo chmod 644   /etc/udev/rules.d/51-android.rules
sudo chown root. /etc/udev/rules.d/51-android.rules
sudo service udev restart
sudo killall adb
```

`51-android.rules` 的内容：

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

## iOS提示

### iOS远程调试

如果你正在调试iOS应用程序，你可以使用Safari开发者工具，通过连接到iOS手机/平板电脑的USB线进行远程调试。它也可以用于仿真器。

这样你就可以直接使用Safari开发者工具来调试你在模拟器/手机/平板上运行的应用程序。检查元素，检查控制台输出，等等等等。

首先在Safari的设置中启用 "开发者 "菜单选项。然后，如果你导航到 "开发者 "菜单选项，你会看到你的模拟器或连接的设备列在靠近顶部的位置。从这里你可以打开开发者工具。

### 状态栏和凹槽安全区域

由于手机有状态栏和/或凹槽，在Capacitor上开发时，你的应用程序的风格可能需要进行一些调整。为了防止你的应用程序的部分内容进入状态栏后面，有一个全局CSS变量可以用来创建一个 "安全区域"。这个变量可以应用于你的应用程序的顶部和底部的填充或边距。

 Quasar 在QHeader/QFooter和Notify中默认支持这些CSS安全区域。然而，重要的是要经常在几个模型上检查你的Capacitor构建，看看你的应用程序的所有情况是否都正确地处理了安全区域。

如果你需要手动调整你的CSS，你可以这样做。

```
// 为你的应用程序的标题
padding-top: constant(safe-area-inset-top) // for iOS 11.0
padding-top: env(safe-area-inset-top) // for iOS 11.2 +
// 用于你的应用程序的页脚
padding-bottom: constant(safe-area-inset-bottom)
padding-bottom: env(safe-area-inset-bottom)
```

当然，你也可以根据你的应用，用`margin`代替`padding`来使用上述示例。
