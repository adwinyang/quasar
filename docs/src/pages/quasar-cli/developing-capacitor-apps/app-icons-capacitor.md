---
title: Capacitor 的应用程序图标
desc: 如何用Capacitor管理 Quasar 混合移动应用程序的图标。
---


就图标而言，Capacitor是所有构建目标中最复杂的一个，因为你不仅需要把图标放在特定的文件夹中，还需要在两个平台(Android、iOS)的配置文件中注册它们。

如果你发现有一个文件是新的或丢失的，请[打开一个问题](https://github.com/quasarframework/quasar/issues) 。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px; padding-top:40px" />

## Icon Genie CLI

::: tip
我们强烈建议使用[Icon Genie CLI](/icongenie/introduction)，因为它可以使用一个源图标，并自动克隆、缩放、最小化，并为你把图标放到适当的目录中。需要时，它还会告诉你需要在你的/src/index.template.html文件中添加哪些标签。
:::

用 Icon Genie CLI 快速启动必要的图像。有关完整的选项清单，请访问[Icon Genie CLI](/icongenie/command-list)命令清单页面。

```bash
$ icongenie generate -m capacitor -i /path/to/source/icon.png [-b /path/to/background.png]
```

根据将使用的打包程序(electron-packager或electron-builder)，请查看他们关于如何挂接图标的文档。

## 手册说明

除非你使用的是Icon Genie应用扩展，否则这些是你需要替换的文件。

```
.
├── android
│     └── app
│           └── src
│               └── main
│                     └── res
│                         ├── drawable
│                         │     └── splash.png
│                         ├── drawable-land-hdpi
│                         │     └── splash.png
│                         ├── drawable-land-mdpi
│                         │     └── splash.png
│                         ├── drawable-land-xhdpi
│                         │     └── splash.png
│                         ├── drawable-land-xxhdpi
│                         │     └── splash.png
│                         ├── drawable-land-xxxhdpi
│                         │     └── splash.png
│                         ├── drawable-port-hdpi
│                         │     └── splash.png
│                         ├── drawable-port-mdpi
│                         │     └── splash.png
│                         ├── drawable-port-xhdpi
│                         │     └── splash.png
│                         ├── drawable-port-xxhdpi
│                         │     └── splash.png
│                         ├── drawable-port-xxxhdpi
│                         │     └── splash.png
│                         ├── mipmap-hdpi
│                         │     ├── ic_launcher.png
│                         │     ├── ic_launcher_foreground.png
│                         │     └── ic_launcher_round.png
│                         ├── mipmap-mdpi
│                         │     ├── ic_launcher.png
│                         │     ├── ic_launcher_foreground.png
│                         │     └── ic_launcher_round.png
│                         ├── mipmap-xhdpi
│                         │     ├── ic_launcher.png
│                         │     ├── ic_launcher_foreground.png
│                         │     └── ic_launcher_round.png
│                         ├── mipmap-xxhdpi
│                         │     ├── ic_launcher.png
│                         │     ├── ic_launcher_foreground.png
│                         │     └── ic_launcher_round.png
│                         └── mipmap-xxxhdpi
│                               ├── ic_launcher.png
│                               ├── ic_launcher_foreground.png
│                               └── ic_launcher_round.png
└── ios
    └── App
          └── App
                └── Assets.xcassets
                      ├── AppIcon.appiconset
                      │     ├── AppIcon-20x20@1x.png
                      │     ├── AppIcon-20x20@2x-1.png
                      │     ├── AppIcon-20x20@2x.png
                      │     ├── AppIcon-20x20@3x.png
                      │     ├── AppIcon-29x29@1x.png
                      │     ├── AppIcon-29x29@2x-1.png
                      │     ├── AppIcon-29x29@2x.png
                      │     ├── AppIcon-29x29@3x.png
                      │     ├── AppIcon-40x40@1x.png
                      │     ├── AppIcon-40x40@2x-1.png
                      │     ├── AppIcon-40x40@2x.png
                      │     ├── AppIcon-40x40@3x.png
                      │     ├── AppIcon-512@2x.png
                      │     ├── AppIcon-60x60@2x.png
                      │     ├── AppIcon-60x60@3x.png
                      │     ├── AppIcon-76x76@1x.png
                      │     ├── AppIcon-76x76@2x.png
                      │     └── AppIcon-83.5x83.5@2x.png
                      └── Splash.imageset
                          ├── splash-2732x2732-1.png
                          ├── splash-2732x2732-2.png
                          └── splash-2732x2732.png
```
