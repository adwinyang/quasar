---
title: Body 类
desc: Quasar的辅助类会被添加到document.body中。
---

 Quasar 为document.body附加了一些非常有用的辅助CSS类，你可以利用它们。

| 名称 | 描述 |
| --- | --- |
| body--dark | 当处于[黑暗模式](/style/dark-mode)时 |
| body--light | 当不在[黑暗模式](/style/dark-mode)时 |
|台式机 | 当客户端在台式机上时 |
| 手机 | 当客户端在移动设备上时 |
| 触摸 | 当客户端有触摸支持时 |
| 当客户端不支持触摸的时候 | 无触摸 | 当客户端不支持触摸的时候 |
| platform-android | 当客户端是在安卓设备上时 |
| platform-ios | 当客户端在一个iOS设备上时 |
| native-mobile | 当客户端在[Cordova](/quasar-cli/developing-cordova-apps/introduction)或[Capacitor](/quasar-cli/developing-capacitor-apps/introduction)应用程序上 |
| electron | 当客户端在[Electron](/quasar-cli/developing-electron-apps/introduction)应用上时 |
| bex | 当应用程序从浏览器扩展运行时 |
| in-iframe | 当应用程序从iframe中运行时 |
| `screen--*` | 如果[启用(仅)](/options/screen-plugin#how-to-enable-body-classes)，告诉当前窗口断点(`screen--xs`, `screen--sm`, ..., `screen--xl`)|
