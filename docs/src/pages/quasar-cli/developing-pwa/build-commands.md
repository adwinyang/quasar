---
title: PWA 构建命令
desc: 在开发或构建渐进式Web App时， Quasar CLI 的命令列表。
---
[Quasar CLI](/start/quasar-cli)使得从你的源代码中开发或构建最终的可分发文件变得异常简单。

## 开发

```bash
$ quasar dev -m pwa

# ..or the longer form:
$ quasar dev --mode pwa
```

::: warning
不要错过[HMR for PWA](/quasar-cli/developing-pwa/hmr-for-dev) (Hot Module Reload)页面。
:::

::: danger
不要在你的开发构建中运行[Lighthouse](https://developers.google.com/web/tools/lighthouse/) ，因为在这个阶段，代码故意没有被优化，并且包含嵌入式源码图(以及许多其他东西)。
:::

## 为生产而建

```bash
$ quasar build -m pwa

# ..或更长的形式:
$ quasar build --mode pwa
```

如果你想要一个启用了调试功能的生产构建：

```bash
$ quasar build -m pwa -d

# ..或更长的形式:
$ quasar build -m pwa --debug
```
