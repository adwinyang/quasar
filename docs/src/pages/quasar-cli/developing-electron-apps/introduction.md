---
title: 什么是电子
desc: 关于Quasar桌面应用程序背后的技术介绍。
---
[Electron](https://electronjs.org/)(原名Atom Shell)是一个开源框架，由Cheng Zhao创建，现在由GitHub开发。**它允许使用最初为网络应用开发的前端和后端组件开发桌面GUI应用**。后台使用Node.js运行时间，前端使用Chromium。Electron是几个著名的开源项目背后的主要GUI框架，包括GitHub的Atom和微软的Visual Studio Code源代码编辑器、Tidal音乐流媒体服务桌面应用程序和Light Table IDE，此外还有Discord聊天服务的免费桌面客户端。

每个Electron应用程序都有两个线程：一个是主线程(处理应用程序窗口和启动)，一个是渲染器线程(基本上是你的UI网页代码)。还有一个预加载脚本来连接这两个 "世界"。

## 渲染器线程
Electron使用Chromium在一个单独的进程中显示网页，称为渲染进程。这个线程处理你在`/src`文件夹中的UI代码。你将无法在这里使用Node.js的力量，但预加载脚本将允许你将UI与Node.js连接起来。

## 主线程
在Electron中，运行package.json主脚本的进程被称为主进程。这是在主进程中运行的脚本，可以通过初始化渲染器线程来显示GUI。这个线程处理你在`/src-electron/electron-main.js`文件夹中的代码。

## 预加载脚本
预加载脚本](/quasar-cli/developing-electron-apps/electron-preload-script) (`/src-electron/electron-preload.[js|ts]`)是一种方式，让你通过在渲染器线程和用户界面之间使用一座桥梁，将Node.js的东西注入到渲染器线程。你可以公开API，然后从你的用户界面中调用。
