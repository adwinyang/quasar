---
title: SSR构建命令
desc: 在开发或构建服务器端渲染的应用程序时，Quasar CLI的命令列表。
---
[Quasar CLI](/start/quasar-cli)使得从你的源代码中开发或构建最终的可分发文件变得异常简单。

## 开发
```bash
$ quasar dev -m ssr

# ..or the longer form:
$ quasar dev --mode ssr
```

## 为生产而建
```bash
$ quasar build -m ssr

# ..or the longer form:
$ quasar build --mode ssr
```

如果你想要一个启用了调试功能的生产构建。

```bash
$ quasar build -m ssr -d

# ..or the longer form
$ quasar build -m ssr --debug
```
