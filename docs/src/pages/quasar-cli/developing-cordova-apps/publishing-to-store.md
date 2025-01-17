---
title: 发布到商店
desc: 如何用 Cordova 发布 Quasar 混合移动应用程序到Google Play Store和Apple App Store。
---

所以，你已经完成了你的移动应用程序的工作。现在是时候部署它了。让我们来学习一下。

## Android 发布
要为Android生成一个发布版本，我们可以使用以下 Quasar CLI 命令。

```bash
$ quasar build -m cordova -T android
# or the short form:
$ quasar build -m android
```

这将根据你的`/src-cordova/config.xml`中的设置生成一个发布版构建。

接下来，我们可以在"/src-cordova/platforms/android/app/build/outputs/apk/release "或同等路径(写在终端的输出中)找到我们的无签名APK文件。文件名通常以"-release-unsigned.apk "结束。现在，我们需要对未签名的APK进行签名，并对其运行一个对齐工具，以优化它并为应用商店做准备。如果你已经有一个签名密钥，请跳过这些步骤，用它代替。

让我们使用JDK附带的keytool命令生成我们的私钥。如果没有找到这个工具，请参考安装指南。

```bash
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 20000
```

首先，你会被提示为钥匙库创建一个密码。然后，回答好工具的其他问题，当它全部完成后，你应该在当前目录下创建一个名为my-release-key.keystore的文件。

::: danger
请确保将此文件保存在安全的地方，如果你丢失了它，你将无法提交你的应用程序的更新。
:::

要签署未签名的APK，请运行JDK中包含的jarsigner工具。

```bash
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore <path-to-unsigned-apk-file> alias_name
```

这就把apk签在了原地。最后，我们需要运行zip对齐工具来优化APK。zipalign工具可以在`/path/to/Android/sdk/build-tools/VERSION/zipalign`中找到。例如，在安装了Android Studio的OS X上，zipalign在`~/Library/Android/sdk/build-tools/VERSION/zipalign`中。

```bash
$ zipalign -v 4 <path-to-same-apk-file> HelloWorld.apk
```

现在我们有了最终的发布二进制文件，名为HelloWorld.apk，我们可以在Google Play Store上发布，让全世界的人都能享受到这一服务

(还有一些其他的方法来签署APKs。更多信息请参考官方Android应用签名文档)。

### Google Play Store
现在我们已经为Google Play Store准备好了我们的发布APK，我们可以创建一个Play Store列表并上传我们的APK。

要开始，你需要访问[Google Play Store开发者控制台](https://play.google.com/apps/publish) 并创建一个新的开发者账户。不幸的是，这并不是免费的。然而，与苹果的99美元相比，费用只有25美元。

一旦你有了开发者账户，你就可以继续点击 "在Google Play上发布Android应用程序"。

然后，你可以继续点击按钮，编辑商店列表(我们稍后将上传APK)。你要填写该应用程序的描述。

当你准备好后，上传发布构建的APK，并发布列表。耐心点，你的辛勤工作应该是在野外进行的!

### 更新你的应用程序
当你开发你的应用程序时，你会希望定期更新它。

为了让Google Play商店接受更新的APK，你需要提高应用程序的版本(从`/package.json`或从`/quasar.conf.js > cordova > version`，然后重新构建应用程序进行发布。

## iOS发布
首先，你需要注册[苹果开发者计划](https://developer.apple.com/programs/) 。和Google一样，如果你有一个苹果的个人账户，你可以为你的应用程序创建一个额外的账户。

### 将Xcode与您的开发者账户连接起来
在你收到你的开发者身份后，在你的Mac上打开Xcode并进入首选项>账户。通过点击左下角的 "+" 按钮将您的账户添加到Xcode中，并按照说明操作。

### 签名
现在您已经将Xcode与您的开发者账户连接起来了，进入Preferences > Accounts，在左侧选择您的Apple Id，然后点击上图中的 View Details 按钮。

点击iOS分布选项旁边的创建按钮。

你可以从官方文档中了解更多关于维护你的签名身份和证书的信息。

### 设置应用程序标识符
接下来，通过苹果开发者会员中心，我们将设置应用程序ID标识符的详细信息。标识符用于允许一个应用程序访问某些应用程序服务，例如Apple Pay。你可以用你的苹果ID和密码登录到苹果开发者会员中心。

一旦你登录，你应该选择证书、标识符和配置文件选项。同时选择iOS应用程序下的识别器选项。然后选择 "+"按钮，以添加一个新的iOS应用程序ID。

然后你必须设置你的应用程序的名称，使用Explicit App ID选项，并将Bundle ID设置为Cordova config.xml标签中的ID值。

此外，你还得选择任何需要启用的服务。例如，如果你在你的应用程序中使用Apple Pay或Wallet，你需要选择这些选项。

你可以从[官方文档](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingProfiles/MaintainingProfiles.html) 中了解更多关于注册应用标识符的信息。

### 创建应用程序列表
苹果使用 iTunes Connect 来管理应用程序的提交。登录后，你应该选择 "我的应用程序 "按钮，并在下一个屏幕上选择 "+" 按钮，就在iTunes Connect My Apps 标题的下方。

这将在一个下拉菜单中显示三个选项，你应该选择新的应用程序。之后会出现弹出窗口，你必须选择应用程序的名称、平台、主要语言、捆绑ID和SKU。

一旦你完成了，点击创建按钮，你会看到一个屏幕，你必须设置一些基本的选项，如隐私政策URL，类别和子类别。

现在，在我们填写列表中的所有内容之前，我们将建立我们的应用程序，并通过Xcode上传它。然后你再回来完成列表。

你可以从[官方文档](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/UsingiTunesConnect/UsingiTunesConnect.html) 中了解更多关于在 iTunes Connect 中管理你的应用。

### 构建用于生产的应用程序

```bash
$ quasar build -m cordova -T ios
# or the short form:
$ quasar build -m ios

# passing extra parameters and/or options to
# underlying "cordova" executable:
$ quasar build -m ios -- some params --and options --here
```

如果一切顺利，你会在控制台中看到 `BUILD SUCCEEDED` 输出。

### 在 Xcode 中打开该项目
现在，在Xcode中打开`/src-cordova/platforms/ios/<name>.xcodeproj`文件。如果下一步不成功，你可能需要改用`<name>.xcworkspace`。

一旦Xcode打开了这个项目，你应该在总视图中看到关于你的应用程序的细节。

你只需检查捆绑标识符的设置是否正确，使其与你先前在应用程序ID中指定的值相同。另外，确保版本和构建号是正确的。团队选项应该被设置为你的苹果开发者账户。在部署目标下，你可以选择你的应用程序将支持哪些设备。

### 创建应用程序的存档
在Xcode中，选择产品>方案>编辑方案来打开方案编辑器。接下来，从左侧的列表中选择存档。确保Build配置被设置为Release。

要创建一个存档，从项目编辑器的方案工具栏菜单中选择一个通用的iOS设备，或者你的设备，如果它连接到你的Mac(如果选择模拟器，你不能创建一个存档)。

接下来，选择 "产品">"归档"，"归档" 组织者就会出现并显示新的归档。(如果它反而产生错误，请回到上一步，打开`<名称>.xcworkspace`。)

在这一点上，你可以点击 "上传至App Store... "按钮，如果一切顺利，你将有一个上传的应用程序，唯一要做的是完成iTunes连接列表并提交审查

这时，你应该在上传存档后不久收到iTunes Connect的电子邮件，并附上内容。

### 完成应用程序列表过程
现在你应该回到iTunes Connect门户网站并登录。接下来，点击左侧APP STORE信息下的定价和可用性。

你不必担心忘记插入关于你的应用程序的任何关键和必要的信息，因为如果你在所有细节填写之前试图提交应用程序进行审查，你会被通知缺少什么以及需要添加/修改什么。

接下来，点击左侧的1.0准备提交按钮，如下图所示。当我们上传我们的档案时，iTunes Connect自动确定支持哪些设备尺寸。你需要为iTunes Connect检测到的各种应用尺寸至少上传一张屏幕截图图片。

接下来，你必须插入描述、关键词、支持网址和营销网址(可选)。

在 "构建" 部分，你必须点击 "+" 按钮，并选择在前面步骤中通过Xcode上传的构建。

接下来，你必须上传图标，编辑评级，并设置一些额外的信息，如版权和你的信息。注意，你在这里上传的图标的尺寸必须是1024×1024像素。幸好，你可以使用第二个教程中的splash.png。如果你是唯一的开发者，那么应用程序评论信息中的数据应该是你自己的。最后，作为最后一个选项，你可以保留默认勾选的选项，一旦你的应用程序被批准，它就会自动发布到App Store。

现在，我们已经完成了对应用程序列表的所有细节的添加，我们可以按 "保存"，然后提交审查。最后，你将会看到你必须填写的最后一张表格。

在你提交你的应用程序进行审查后，你会在我的应用程序中看到它的状态为等待审查，如下图所示。此外，在你提交你的应用程序进行审查后不久，你会从iTunes Connect收到一封确认电子邮件，说明你的应用程序正在审查中。

苹果为自己的人工审查过程感到自豪，这基本上意味着你的应用程序可能需要几天的时间来审查。你会被通知任何问题或更新你的应用程序的状态。

### 更新应用程序
由于你可能想在某些时候更新你的应用程序，你首先需要提升应用程序的版本(从`/package.json`或从`/quasar.conf.js > cordova > version`，然后重建应用程序以便发布。最后，你必须从Xcode中打开它，重新按照同样的步骤进行。

一旦你提交审查，你将不得不再次等待审查过程。
