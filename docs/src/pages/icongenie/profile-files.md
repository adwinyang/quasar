---
title: Icon Genie配置文件文件
desc: 如何通过 Icon Genie CLI 使用配置文件。
---

如果您需要自动创建所有应用程序图标和Splash屏幕，则Icon Genie提供了可以批量运行的配置文件。

这些配置文件称为“配置文件文件”。 这些文件以JSON格式为单位，并告诉Icon Genie哪些图像生成和如何生成它们。 他们还饶有您必须记住整套Icon Genie命令和参数来生成您的资产。

## 文件结构

JSON配置文件文件的通用形式是：

```json
{
  "params": { },
  "assets": [ ]
}
```

我们将在下一节中讨论。

### Params.

来自JSON配置文件文件的`params`对象将与[生成](/icongenie/command-list#生成)命令参数(但是camelCased 而不是 CLI的 kebab-case)。有一个关键差异：而不是使用`mode`(例如：“spa，pwa”，“全部”)您将写出`compress`(示例：[spa“，”pwa“]，[全部”] )。

您可以为`PARAMS`对象编写的完整属性：

| 属性名 | 类型 | 描述 | 示例 |
| --- | --- | --- | --- |
| include  | Array  |  包括Icon Genie硬编码组的特定标准模式  | `["spa"，"pwa"]`/`["all"]` |
| icon | String | 源文件的路径图标;可以是绝对的或相对于 Quasar 项目文件夹的根`my-icon.png` |
| background | String | 可选背景源文件(用于启动屏幕图像)的路径;可以是绝对的或相对于 Quasar 项目文件夹的根`my-bg.png` |
| filter | String | 可选择通过发电机过滤资产;使用时，它只能生成一种类型的资产而不是全部 |  `ico` |
| quality | Number [1-12]  | 生成文件的质量;更高的质量意味着更大的文件化，较慢;较低的质量意味着更小的文件化，更快 |`12` |
| padding | Array [编号] |  (v2.1 +)修剪后将固定填充物应用于图标图像;语法：[<hize_px>，<vert_px>];默认为：[0,0]  | `[10，0]`/`[5,5]` |
| skipTrim  | Boolean |  (v2.2 +)不要修剪图标源文件 | |
| themeColor  | String [十六进制]  | 用于需要颜色的所有发电机的主题颜色;如果还指定了任何生成颜色，则会被覆盖 |  `ccc` /`e2b399` |
| pngColor  | String [十六进制]  | 用于PNG生成器的背景颜色，当资产定义中的“背景：True”时(如Cordova / Covelitor IOS图标) |  `ccc` / `e2b399` |
| splashscreenColor  | String [十六进制]  | 用于闪光发电机的背景颜色 |  `ccc` /`e2b399` |
| svgColor  | String [十六进制]  | 用于生成的单色SVG的颜色 |  `ccc` /`e2b399` |
| splashscreenIconRatio  | Number [0-100]  | 图标尺寸相对于所得闪光的宽度或高度(以较小的)的比例;代表百分比; 0表示它不会添加背景顶部的图标 |`40` |

### 资产

如果需要的话，`assets` 数组可以包含自定义**额外资产(extr assets)**。 当 Icon Genie 的每个模式的默认列表不足以满足您的用例时，可以使用此选项。如果`params`中未指定`include`属性，则只能生成自定义资产。

在99％的情况下，您无需指定 `assets` 数组，但 Icon Genie 设计非常灵活，因此它也包括此功能。

`assets` 的一些示例，您可以从中获取 Icon Genie 可以生成的各种类型的资产的语法：

```json
"assets": [
  {
    "generator": "png",
    "name": "icon-{size}x{size}.png",
    "folder": "src-bex/icons",
    "sizes": [ 16, 48, 128 ]
  },

  {
    "generator": "svg",
    "name": "safari-pinned-tab.svg",
    "folder": "public/icons"
  },

  {
    "generator": "splashscreen",
    "name": "apple-launch-{size}.png",
    "folder": "public/icons",
    "sizes": [
      [ 1668, 2388 ]
    ],
    "tag": "<link rel=\"apple-touch-startup-image\" media=\"(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)\" href=\"icons/{name}\">"
  },

  {
    "generator": "icns",
    "name": "icon.icns",
    "folder": "src-electron/icons"
  },

  {
    "generator": "ico",
    "name": "icon.ico",
    "folder": "src-electron/icons"
  },

  {
    "generator": "splashscreen",
    "name": "Default-Landscape-2436h.png",
    "folder": "src-cordova/res/screen/ios",
    "sizes": [
      [ 2436, 1125 ]
    ]
  },

  {
    "generator": "png",
    "name": "icon-29@2x.png",
    "folder": "src-cordova/res/ios",
    "sizes": [ 58 ],
    "platform": "cordova-ios",
    "background": true
  },

  {
    "generator": "png",
    "name": "icon-29@2x.png",
    "folder": "src-cordova/res/ios",
    "sizes": [ 58 ],
    "platform": "cordova-ios",
    "background": true
  },

  {
    "generator": "png",
    "name": "xxxhdpi.png",
    "folder": "src-cordova/res/android",
    "sizes": [ 192 ],
    "platform": "cordova-android",
    "density": "xxxhdpi"
  },

  {
    "generator": "splashscreen",
    "name": "Default@2x~ipad~comany.png",
    "folder": "src-cordova/res/screen/ios",
    "sizes": [
      [ 1278, 2732 ]
    ],
    "platform": "cordova-ios"
  },

  {
    "generator": "splashscreen",
    "name": "splash-land-xxxhdpi.png",
    "folder": "src-cordova/res/screen/android",
    "sizes": [
      [ 1920, 1280 ]
    ],
    "platform": "cordova-android",
    "density": "land-xxxhdpi"
  }
]
```

## Bootstrap 配置文件

Icon Genie 还提供[配置文件命令](/icongenie/command-list#配置) ，其可以为您引导JSON配置文件。 它可以帮助您创建一个或多个这样的文件，然后可以通过[生成命令](/icongenie/command-list#生成) 与`--profile` 参数(或较短的`-p`) 批量运行这些文件。

最方便的用例是将多个配置文件生成到一个特定的文件夹中，每个文件都有自己的参数，然后通过`$ icongenie generate -p /patp/to/folder` 运行所有的文件。
