---
title: 什么是科多瓦
desc: 介绍Quasar混合移动应用程序背后的一项技术。
---
Apache Cordova是一个移动应用开发框架，最初由Nitobi创建。Adobe Systems在2011年收购了Nitobi，将其重新命名为PhoneGap，后来又发布了该软件的开源版本，称为Apache Cordova。

[Apache Cordova](https://cordova.apache.org/)使软件程序员能够使用CSS3、HTML5和JavaScript为移动设备构建应用程序，而不是依赖像Android、iOS或Windows Phone中的特定平台API。它可以根据设备的平台来包装CSS、HTML和JavaScript代码。它扩展了HTML和JavaScript的功能，以便与设备一起工作。由此产生的应用程序是混合型的，这意味着它们既不是真正的本地移动应用程序(因为所有的布局渲染都是通过Web视图而不是平台的本地UI框架完成的)，也不是纯粹的基于Web的(因为它们不仅仅是Web应用程序，而是被打包成应用程序进行发布，并且可以访问本地设备API)。

你可以通过使用[Cordova Plugins](/quasar-cli/developing-cordova-apps/cordova-plugins)来钩住本地设备API。
