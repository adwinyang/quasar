---
title: 部署SSR
desc: 如何发布Quasar服务器端渲染的应用程序。
---
当作为SPA或PWA进行部署时，由Quasar CLI生成的distributables文件夹可以由静态Web服务器提供。然而，在SSR(服务器端渲染)构建中，情况就不是这样了。在这种情况下，你的distributables也包含你的生产网络服务器--可以从`/src-ssr`中进行调整。

默认情况下，SSR可分发文件使用[Express](https://expressjs.com/)，但你可以用你选择的webserver来替换它。

## Serverless <q-badge align="top" color="brand-primary" label="@quasar/app v3.2+" />

如果你要部署到无服务器服务，那么请阅读[SSR Production Export](/quasar-cli/developing-ssr/ssr-production-export)关于如何准备的内容。

## 分布式文件夹
在SSR模式下构建你的应用程序(`$ quasar build -m ssr`)后，生成的文件夹包含了一个独立的webserver，并为SSR服务进行了调整。

你会注意到它包含一个`package.json`文件。它有一个npm脚本，叫做 "start"。

```js
"scripts": {
  "start": "node index.js"
}
```

因此，你在部署时需要做的是把这个distributables文件夹复制到你的服务器上，yarn/npm安装其中的依赖项，然后运行`$ yarn start`。这就启动了网络服务器，并开始监听连接。

::: tip
构建应用程序后生成的distributables文件夹是独立的。它不需要项目文件夹的其他部分来工作，也不依赖于`@quasar/cli`的安装。
:::

## 增强性能
默认情况下，Webserver只运行在服务器的一个可用内核上。你可以做的是让它使用所有内核。这方面有一个解决方案。[PM2](http://pm2.keymetrics.io/)。

在你的服务器上安装PM2后，你的npm启动脚本可以改成这样。
```js
"scripts": {
  "start": "pm2 start index.js"
}
```

## 使用Cleavr进行部署
你可以使用[Cleavr](https://cleavr.io)将Quasar SSR应用程序部署到几个流行的VPS供应商。Cleavr会自动为你的应用程序设置启用集群模式的PM2。

在Cleavr中添加一个新的**NodeJS SSR**站点，然后用以下方式配置网络应用程序设置。

- **输入点：** index.js
- **构建命令：** npx quasar build --mode ssr
- **工件路径：** dist/ssr
