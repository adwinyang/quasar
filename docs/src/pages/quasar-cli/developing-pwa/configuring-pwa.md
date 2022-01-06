---
title: 配置PWA
desc: 如何用Quasar CLI管理你的渐进式Web应用程序。
related:
  - /quasar-cli/quasar-conf-js
---

## 服务工作者
将PWA模式添加到Quasar项目中意味着将创建一个新的文件夹。`/src-pwa`，其中包含PWA特定的文件。

```bash
.
└── src-pwa/
    ├── register-service-worker.js  # (or .ts) App-code *managing* service worker
    └── custom-service-worker.js    # (or .ts) Optional custom service worker file
                                    #               (InjectManifest mode ONLY)
```

你可以自由编辑这些文件。注意几件事。

1. `register-service-worker.[js|ts]`被自动导入你的应用程序(就像其他/src文件)。它注册了服务工作者(由Workbox创建的或你自定义的，取决于workbox插件模式 -- quasar.conf.js > pwa > workboxPluginMode)，你可以监听服务工作者的事件。你可以使用ES6代码。
2. `custom-service-worker.[js|ts]`只有在workbox插件模式设置为 "InjectManifest"(quasar.conf.js > pwa > workboxPluginMode: 'InjectManifest')时，才会成为你的服务工作者文件。否则，Workbox将为你创建一个服务工作文件。
3. 只在生产构建中运行[Lighthouse](https://developers.google.com/web/tools/lighthouse/)测试是有意义的。

::: tip
阅读更多关于`注册-服务-工人。[js|ts]`以及如何与服务工人互动的信息，请参见[处理服务工人](/quasar-cli/developing-pwa/handling-service-worker)文档页面。
:::

## Quasar.conf.js
在这里你可以配置Workbox的行为，也可以对manifest.json进行调整。

```js
pwa: {
  // workboxPluginMode: 'InjectManifest',
  // workboxOptions: {},
  manifest: {
    // ...
  },

  // 使用这个或metaVariablesFn，但不能同时使用。
  // 用来注入特定PWA的变量
  // 元标签(以下是默认值)。
  metaVariables: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    appleTouchIcon120: 'icons/apple-icon-120x120.png',
    appleTouchIcon180: 'icons/apple-icon-180x180.png',
    appleTouchIcon152: 'icons/apple-icon-152x152.png',
    appleTouchIcon167: 'icons/apple-icon-167x167.png',
    appleSafariPinnedTab: 'icons/safari-pinned-tab.svg',
    msapplicationTileImage: 'icons/ms-icon-144x144.png',
    msapplicationTileColor: '#000000'
  },

  // 可选的，覆盖上面的metaVariables。
  // 使用这个或metaVariables，但不能同时使用。
  metaVariablesFn (manifest) {
    // ...
    return [
      {
        // 这个条目将产生。
        // <meta name="theme-color" content="ff0">。

        tagName: 'meta',
        attributes: {
          name: 'theme-color',
          content: '#ff0'
        }
      },

      {
        // 这个条目将产生。
        // <link rel="apple-touch-icon" sizes="180x180" href="icons/icon-180.png">。
        // 参考资料 /public/icons/icon-180.png

        tagName: 'link',
        attributes: {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'icons/icon-180.png'
        },
        closeTag: false // this is optional;
                        // 指定标签是否还需要一个明确的结束标签。
                        // 默认情况下，它是布尔型假的
      }
    ]
  },

  // 可选的；webpack的配置对象
  // 自定义服务工作者 ONLY (/src-pwa/custom-service-worker. [js|ts] )
  // 如果在InjectManifest模式下使用工作箱
  extendWebpackCustomSW (cfg) {
    // 直接改变cfg的props。
    // 不需要归还任何东西
  },

  // optional; 等同于extendWebpackCustomSW()，但使用webpack-chain。
  // 仅用于自定义服务工作者(/src-pwa/custom-service-worker.[js|ts])。
  // 如果在InjectManifest模式下使用工作箱
  chainWebpackCustomSW (chain) {
    // 链是一个webpack-chain实例
    // 的Webpack配置

    // 示例。
    // chain.plugin('eslint-webpack-plugin')
    //   .use(ESLintPlugin, [{ extensions: [ 'js' ] }] )
  }
}
```

更多信息。[Workbox Webpack Plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin), [Workbox](https://developers.google.com/web/tools/workbox/).

`metaVariables`对象仅由Quasar本身使用(对Workbox没有意义)，用于将一些PWA元标签的特定值属性注入到渲染的HTML页面。例如：`<meta name="apple-mobile-web-app-status-bar-style">`将有价值属性分配给`metaVariables.appleMobileWebAppStatusBarStyle`的内容。

你可以使用metaVariables的替代品：`metaVariablesFn(manifest)`，它可以返回一个对象数组(见上面代码中的形式)。如果你将此函数配置为不返回数组或返回空数组，那么Quasar App CLI将理解为不添加任何标签--因此你可以直接在`/src/index.template.html`中手动添加你的自定义标签。

## 选定工作箱模式

有两种工作箱操作模式。**GenerateSW**(默认)和**InjectManifest**。第一种会根据 quasar.conf.js > pwa > workboxOptions(如果有的话)自动生成一个服务工作者，而第二种模式允许你编写自己的服务工作者文件。

设置你想使用的模式是通过quasar.conf.js完成的。

```js
// quasar.conf.js
pwa: {
  // workboxPluginMode: 'InjectManifest',
  // workboxOptions: { ... }
}
```

::: danger
确保你的`workboxOptions`与你选择的Workbox模式相匹配，否则workbox webpack插件可能会[停止你的应用程序的编译](https://github.com/quasarframework/quasar/issues/4998)。
:::

### GenerateSW

什么时候使用GenerateSW:

* 你想预存文件。
* 你有简单的运行时配置需求(例如，配置允许你定义路由和策略)。

什么时候不使用GenerateSW。

* 你想使用其他服务工作者的功能(如网络推送)。
* 你想导入额外的脚本或添加额外的逻辑。

::: tip
请在[工作箱网站](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_generatesw_config)上查看该模式的可用工作箱选项。
:::

### InjectManifest

何时使用 InjectManifest。

* 你想对你的服务工作者有更多的控制。
* 你想预先缓存文件。
* 你在路由方面有更复杂的需求。
* 你想将你的服务工作者与其他API一起使用(例如Web Push)。

什么时候不使用InjectManifest。

* 你希望以最简单的方式向你的网站添加服务工作者。

::: tip TIPS
* 如果你想使用这种模式，你将不得不自己编写服务工作者(`/src-pwa/custom-service-worker.[js|ts]`)文件。
* 请在[Workbox网站](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config)上查看该模式的可用workboxOptions。
:::

下面的片段是自定义服务工作者的默认代码(`/src-pwa/custom-service-worker. [js|ts]`)。

```js
import { precacheAndRoute } from 'workbox-precaching'

// 与预存储注射一起使用
precacheAndRoute(self.__WB_MANIFEST)
```

## 配置Manifest文件
Manifest文件是由Quasar CLI生成的，它有一个默认的配置。但是你可以通过`/quasar.conf.js`来调整这个配置。

```js
// quasar.conf.js
pwa: {
  // workboxPluginMode: 'InjectManifest',
  // workboxOptions: {},
  manifest: {
    name: 'Quasar Play',
    short_name: 'Quasar-Play',
    description: 'Quasar Framework Showcase',
    icons: [
      {
        'src': 'icons/icon-128x128.png',
        'sizes': '128x128',
        'type': 'image/png'
      },
      {
        'src': 'icons/icon-192x192.png',
        'sizes': '192x192',
        'type': 'image/png'
      },
      {
        'src': 'icons/icon-256x256.png',
        'sizes': '256x256',
        'type': 'image/png'
      },
      {
        'src': 'icons/icon-384x384.png',
        'sizes': '384x384',
        'type': 'image/png'
      },
      {
        'src': 'icons/icon-512x512.png',
        'sizes': '512x512',
        'type': 'image/png'
      }
    ],
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#027be3'
  }
}
```

在深入研究之前，请阅读有关[清单配置](https://developer.mozilla.org/en-US/docs/Web/Manifest)。

::: warning
请注意，您不需要编辑您的index.html文件(由`/src/index.template.html`生成)来链接到清单文件。Quasar CLI将为您嵌入正确的东西。
::::

::: tip
如果你的PWA是在基本认证之后或需要授权头，请将quasar.conf.js > pwa > useCredentials设置为true，以便在manifest.json元标签上包括`crossorigin="use-credentials"`。
::::

∮∮PWA检查表
更多信息。[PWA检查表](https://web.dev/pwa-checklist/)

::: danger
不要在你的开发构建中运行[Lighthouse](https://developers.google.com/web/tools/lighthouse/)，因为在这个阶段，代码故意没有被优化，并且包含嵌入式源码图(以及许多其他东西)。更多信息请参见本文档的[测试和审计](/quasar-cli/testing-and-auditing)部分。
:::

## 重新加载并自动更新
对于那些不想在服务工作者更新时手动重新加载页面的人，**使用默认的GenerateSW工作箱模式**，你可以让它一次性激活。更新quasar.conf.js中的workboxOptions配置，如下所示。

```js
// quasar.conf.js
pwa: {
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true
  }
}
```

[来源](https://developers.google.com/web/tools/workbox/guides/codelabs/webpack)
