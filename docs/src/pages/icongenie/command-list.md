---
title: Icon Genie CLI 命令列表
desc: Icon Genie CLI 的命令列表。
---

熟悉 Quasar 项目文件夹中可用的 Icon Genie CLI 命令列表：

```bash
$ icongenie

  使用示例
    $ icongenie <command> <options>

  命令帮助
    $ icongenie <command> --help
    $ icongenie <command> -h

  选项
    --version, -v 打印 Quasar Icon Genie CLI 版本

  命令
    generate, g   产成 App 图标 & 启动屏图像
    verify, v     验证 Quasar app 图标 & 启动屏图像
    profile, p    创建 Icon Genie 配置文件
    help, h       显示帮助
```

获取任一命令的帮助：

```bash
$ icongenie [command_name] --help
```

## 生成

`generate` 命令用于生成 App 图标和启动屏幕图像。 它是在 Icon Genie 的核心，因为它负责繁重的工作。

请看下面的用法和一些示例。 最重要的参数是` --icon`(或`-i`)，它将透明的png作为 App图标和启动屏幕图像的输入。 PNG 的最小尺寸为 64 x 64px，但强烈建议超过 1024 x 1024px 。

对于启动屏幕图像，如果您希望将图标放在背景之上，则可能需要将其与`--background`(或`-b`)结合使用。

您可能还想使用`--profile`(或`-p`)参数，该参数可以运行一个或多个 Icon Genie [配置文件文件](/icongenie/profile-files) 。

```bash
$ icongenie generate -h

  描述
    生成 App 图标和启动屏幕图像

  用法
    $ icongenie generate [options]

    # 为所有已安装的 Quasar 模式生成图标
    $ icongenie generate -i /path/to/icon.png
    $ icongenie g -i /path/to/icon.png

    # 仅为(例如)PWA 模式生成
    $ icongenie generate -m pwa --icon /path/to/icon.png

    # 仅为(例如)Cordova & Capacitor 模式生成
    $ icongenie g -m cordova,capacitor -i
         /path/to/icon.png -b /path/to/background.png

    # 使用配置文件生成
    $ icongenie generate -p ./icongenie-profile.json

    # 使用批量配置文件生成
    $ icongenie generate -p ./folder-containing-profile-files

  选择
    --icon, -i            必须;
                          图标的源文件路径；必须是图标的源文件路径；必须是:
                            - 一个 .png 文件
                            - 最小分辨率: 64 x 64 px (越高越好!!)
                            - 透明的
                          最佳效果是使用方形图像(高度=宽度)
                          图像将自动修剪
                            (另请参考 "skip-trim" 和 "padding" 参数)
                          路径可以是绝对路径, 可以是相对于 Quasar 项目的
                            根目录路径
                          推荐最小尺寸: 1024x1024 px

    --background, -b      可选背景源文件的路径(用于启动画面);
                          必需是:
                            - 一个 .png 文件
                            - 最小分辨率:  128x128 px (越高越好!!)
                            - 透明度是可选的(但如果你将其与 splashscreen-color
                              参数结合使用，则推荐使用透明度)
                          路径可以是绝对路径, 可以是相对于 Quasar 项目的
                            根目录路径
                          推荐最小尺寸: 1024x1024 px

    --mode, -m            为哪种  Quasar 模式生成资产(assets);
                          默认: all
                            [all|spa|pwa|ssr|bex|cordova|capacitor|electron]
                          可以指定多个，以“，”分隔:
                            spa,cordova

    --filter, -f          筛选可用的生成器； 当使用时，它可以
                          只生成一种类型的资产(asset)而不是所有
                            [png|ico|icns|splashscreen|svg]

    --quality             文件质量 [1 - 12] (默认: 5)
                            - 高质量 --> 文件越大，创建速度越慢
                            - 低质量  --> 文件越小，创建速度越快

    --skip-trim           不要修剪图标源文件

    --padding            在修剪后对图标应用固定的填充;
                          语法: <horiz: number>,<vert: number>
                          默认: 0,0
                          示例: "--padding 10,5" 表示将填充顶部 10px, 底部 10px，左侧 5px，右侧 5px

    --theme-color         主题颜色，用于所有需要颜色的生成器；
                          如果还指定了任何生成器颜色，它将被覆盖;
                          颜色必须为十六进制格式(非十六进制)，且不带前导字符
                          '#' 。 不允许有透明度.
                          示例: 1976D2, eee

    --svg-color           生成的单色svgs要使用到的颜色；
                          默认 (如果没有指定 theme-color 参数): 1976D2
                          颜色必须为十六进制格式(非十六进制)，且不带前导字符
                          '#' 。 不允许有透明度.
                          示例: 1976D2, eee

    --png-color           png生成器的背景颜色，当资产(asset)中定义为
                          "background: true" (类似 cordova/capacitor iOS 图标);
                          默认 (如果没有指定 theme-color 参数): fff
                          颜色必须为十六进制格式(非十六进制)，且不带前导字符
                          '#' 。 不允许有透明度.
                          示例: 1976D2, eee

    --splashscreen-color  用于生成启动屏幕图像的背景颜色，
                          默认 (如果没有指定 theme-color 参数): fff
                          颜色必须为十六进制格式(非十六进制)，且不带前导字符
                          '#' 。 不允许有透明度.
                          示例: 1976D2, eee

    --splashscreen-icon-ratio  图标大小与生成的启动屏幕图像的宽度或高度(以较小者为准)的比率；
                               表示百分比; 有效值: 0 - 100
                               如果是0，则不添加背景顶部的图标
                               默认: 40

    --profile, -p         使用JSON格式的配置文件:
                            - 文件夹路径(绝对或相对于当前文件夹)
                              包含 JSON 配置文件 (icongenie-*.json)
                            - 单个 *.json 配置文件的路径(绝对或相对于当前文件夹)
                         一个 JSON 配置文件结构如:
                            {
                              "params": {
                                "include": [ ... ], /* 可选 */
                                ...
                              },
                              "assets": [ /* 自定义的静态资原(assets)列表 */ ]
                            }

    --help, -h           显示帮助
```

## 验证

`verify`命令确认您已在正确的位置中拥有所有必需的应用图标和启动屏幕图像，并且每个文件都有正确的像素分辨率。

```bash
$ icongenie -h

  描述
    验证 Quasar App 图标和启动屏幕图像
    适用于所有安装模式。

  Usage
    $ icongenie verify [options]

    # 验证所有 Quasar 模式
    $ icongenie verify

    # 验证指定的模式
    $ icongenie verify -m spa

    # 指定一个过滤器来验证
    $ icongenie verify -f ico

    # 指定一个配置文件来验证
    $ icongenie verify -p ./icongenie-profile.json

    # 指定批量的配置文件来验证
    $ icongenie verify -p ./folder-containing-profile-files

  选项
    --mode, -m      为哪种 Quasar 模式验证资产(assets);
                    默认: all
                      [all|spa|pwa|ssr|bex|cordova|capacitor|electron]
                    可以指定多个，以“，”分隔:
                      spa,cordova,capacitor

    --filter, -f    筛选可用的生成器； 当使用时，它可以
                    只验证一种类型的资产(asset)而不是所有
                      [png|ico|icns|splashscreen|svg]


    --profile       使用 JSON 配置文件来提取资产(asset)清单来进行验证：
                      - 文件夹路径(绝对或相对于当前文件夹)
                         包含 JSON 配置文件 (icongenie-*.json)
                      - 单个 *.json 配置文件的路径(绝对或相对于当前文件夹)
                    一个 JSON 配置文件结构如:
                       {
                            "params": {
                            "include": [ ... ], /* 可选 */
                                ...
                            },
                            "assets": [ /* 自定义的静态资原(assets)列表 */ ]
                       }

    --help, -h      显示帮助
```

## 配置

Icon Genie 还支持配置文件。 这些文件以JSON格式为单位，并告诉Icon Genie哪些图像生成和如何生成它们。 `profile`命令是一个帮助工具，用于构建这些配置文件。如果需要，它们对自动化非常有用。

JSON 配置文件文件的通用形式为：

```json
{
  "params": { },
  "assets": [ ]
}
```

您还可以生成多个配置文件(具有不同的 params/settings)。 有关更多信息，请返回[配置文件文件](/icongenie/profile-files) 页面。

```bash
$ icongenie profile -h

  描述
    Helper command to easily bootstrap Icon Genie profile files.

  用未能
    $ icongenie profile -o <filename> [options]

    # 提供参数列表
    $ icongenie profile -o <filename> --include pwa,spa --quality 7

    # 根据 Icon Genie 的内部名单提供资产
    $ icongenie profile -o <filename> --assets spa,bex

  选项
    --output, -o          新的 Icon Genie 配置文件名

    --assets, -a          使用 Icon Genie's 预填充资产数组内部列表，基于您指定的模式;
                            [all|spa|pwa|ssr|bex|cordova|capacitor|electron]
                          可以指定多个，以“,”分隔:
                            spa,cordova

    --icon, -i            图标源文件的路径；必须是:
                            - 一个 .png 文件
                            - 最小分辨率: 64x64 px (越高越好!!)
                            - 透明的
                          最佳效果是使用方形图像(高度=宽度)
                          图像将自动修剪
                            (请参考 "skip-trim" 和 "padding" 参数)
                          路径可以是绝对的，也可以是相对于 Quasar 项目根路径
                          推荐最小尺寸: 1024x1024 px

    --background, -b      可选背景源文件的路径(用于启动屏幕图像);
                          必须是:
                            - 一个 .png 文件
                            - 最小分辨率: 128x128 px (越高越好!!)
                            - 透明度是可选的 (但是如果与 splashscreen-color 参数结合使用，则推荐使用透明度)
                          路径可以是绝对的，也可以是相对于 Quasar 项目根路径
                          推荐最小尺寸: 1024x1024 px

    --include             预填充 params.include 属性;
                            [all|spa|pwa|ssr|bex|cordova|capacitor|electron]
                          可以指定多个，以“,”分隔::
                            spa,cordova

    --filter, -f          预填充 params.filter 属性;
                            [png|ico|icns|splashscreen|svg]

    --quality             预填充 params.quality 属性;
                          文件质量 [1 - 12] (默认: 5)
                            - 高质量 --> 文件大，创建慢
                            - 低质量  --> 文件小，创建快

    --skip-trim           不裁剪图标源文件

    --padding             在修剪后对图标应用固定的填充;
                          语法: <horiz: number>,<vert: number>
                          默认: 0,0
                          示例: "--padding 10,5" 表示将填充顶部 10px, 底部 10px，左侧 5px，右侧 5px

    --theme-color         预填充 params.themeColor 属性;
                          用于所有需要颜色的生成器的主题颜色;
                          如果还指定了任何生成器颜色，它将被覆盖;
                          颜色必须为十六进制格式(非十六进制)，且不带前导字符
                          '#' 。 不允许有透明度.
                          示例: 1976D2, eee
    --svg-color           生成的单色svgs要使用到的颜色；
                          默认 (如果没有指定 theme-color 参数): 1976D2
                          颜色必须为十六进制格式(非十六进制)，且不带前导字符
                          '#' 。 不允许有透明度.
                          示例: 1976D2, eee

    --svg-color           预填充 params.svgColor 属性;
                          生成的单色svgs要使用到的颜色；
                          默认 (如果没有指定 theme-color 参数): 1976D2
                          颜色必须为十六进制格式(非十六进制)，且不带前导字符
                          '#' 。 不允许有透明度.
                          示例: 1976D2, eee

    --png-color           预填充 params.pngColor property;
                          png生成器的背景颜色，当资产(asset)中定义为
                          "background: true" (类似 cordova/capacitor iOS 图标);
                          默认 (如果没有指定 theme-color 参数): fff
                          颜色必须为十六进制格式(非十六进制)，且不带前导字符
                          '#' 。 不允许有透明度.
                          示例: 1976D2, eee


    --splashscreen-color  预填充 params.splashscreenColor 属性;
                          用于生成启动屏幕图像的背景颜色，
                          默认 (如果没有指定 theme-color 参数): fff
                          颜色必须为十六进制格式(非十六进制)，且不带前导字符
                          '#' 。 不允许有透明度.
                          示例: 1976D2, eee

    --splashscreen-icon-ratio  预填充 params.splashscreenIconRatio 属性;
                               图标大小与生成的启动屏幕图像的宽度或高度(以较小者为准)的比率；
                               表示百分比; 有效值: 0 - 100
                               如果是0，则不添加背景顶部的图标
                               默认: 40
```
