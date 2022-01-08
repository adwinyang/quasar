---
title: PWA 的热模块重新加载
desc: 如何用Quasar PWA管理HMR(热模块重新加载)。
---

**在开发模式下**(不是生产模式)，安装和运行服务工作器会扰乱HMR(热模块重新加载)。然而，浏览器可以被配置为绕过网络，而不是使用服务工作器的缓存。

![使HMR适用于PWA](https://cdn.quasar.dev/img/pwa-hmr.png)

当你的开发活动不包括配置服务工作器时(比如在编辑 "/src-pwa/register-service-worker.js" 文件时)，那么你可以安全地触发`$ quasar dev -m spa`(而不是`$ quasar dev -m pwa`)命令，以避免关注服务工作器的效果的额外麻烦--有时可能会妨碍到它。

在不直接处理服务工作者的开发时，在SPA模式下进行开发(如上所述)的另一个原因是，你可能会碰到下面的警告(可以忽略它，并在这里有完整的描述[https://github.com/GoogleChrome/workbox/issues/1790])。

> GenerateSW 被多次调用，可能是因为在 --watch 模式下运行 webpack。第一次调用后生成的预缓存清单可能不准确！请参考。更多信息请参见https://github.com/GoogleChrome/workbox/issues/1790。
