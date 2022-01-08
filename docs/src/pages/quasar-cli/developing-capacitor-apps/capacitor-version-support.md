---
title:  Capacitor 版本
desc: Quasar中支持的 Capacitor 版本。如何升级到较新的 Capacitor 版本。
---

官方支持的Capacitor版本是v1、v2和v3。

## Upgrading Capacitor

如果你以前使用的是较低版本的Capacitor，而你想升级到较新的版本，那么。

1. 删除/src-capacitor/ios和/src-capacitor/android文件夹，但要确保你知道你在这些文件夹中做的任何修改，因为在第4步之后你必须重做。
2. 修改/src-capacitor/package.json，以反映正确的Capacitor依赖版本(你可以在下一个与你所需的Capacitor版本相关的适当部分阅读它们)。
3. 删除yarn.lock/package-lock.json，然后在/src-capacitor中运行`yarn`/`npm install`。
4.  在这一点上，你将安装好Capacitor。现在你可以运行`quasar dev -m capacitor -T [ios|android]`或者`quasar build -m capacitor -T [ios|android]`，它将添加升级的iOS/Android平台，与你的Capacitor版本相对应。

检查一下Capacitor本身的更新日志，看看它有哪些突破性的变化，也是明智之举。

## Capacitor v3

::: tip
你需要`quasar` v2.0.0-beta.8+和`@quasar/app` v3.0.0-beta.8+。
:::

::: warning Known issue
HTTPS devserver(通过 quasar.conf.js > devServer > https: true)目前还**不**支持。如果你正在使用依赖它的Capacitor插件，最好暂时保持使用Capacitor v2。
:::

假设你已经安装了Capacitor模式，你在/src-capacitor/package.json中的依赖项应该是这样的。

```
dependencies: {
  "@capacitor/app": "^1.0.0",
  "@capacitor/cli": "^3.0.0",
  "@capacitor/core": "^3.0.0",
  "@capacitor/splash-screen": "^1.0.0"
}
```

`@capacitor/app`和`@capacitor/splash-screen`是可选的，但如果安装了它们，可以帮助 Quasar 实现一些UI功能。

## Capacitor v2

假设你已经安装了Capacitor模式，你在/src-capacitor/package.json中的依赖项应该是这样的。

```
dependencies: {
  "@capacitor/cli": "^2.0.0",
  "@capacitor/core": "^2.0.0"
}
```

## Capacitor v1

假设你已经安装了Capacitor模式，你在/src-capacitor/package.json中的依赖项应该是这样的。

```
dependencies: {
  "@capacitor/cli": "^1.0.0",
  "@capacitor/core": "^1.0.0"
}
```
