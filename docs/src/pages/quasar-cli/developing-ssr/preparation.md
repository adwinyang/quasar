---
title: 准备 SSR
desc: 如何用 Quasar CLI 添加SSR模式。
related:
  - /quasar-cli/quasar-conf-js
---

我们将使用 Quasar CLI 来开发和建立一个SSR网站。构建SPA、Mobile App、Electron App、PWA或SSR之间的区别只是由 "quasar dev "和 "quasar build "命令中的 "模式 "参数决定的。

为了开发或建立一个SSR网站，我们首先需要在我们的 Quasar 项目中添加SSR模式。
```bash
$ quasar mode add ssr
```

如果你想直接进入并开始开发，你可以跳过 "Quasar 模式 "命令并发出。
```bash
$ quasar dev -m ssr
```

这将自动添加SSR模式，如果它是缺失的。

一个新的文件夹将出现在你的项目文件夹中(这在[配置SSR](/quasar-cli/developing-ssr/configuring-ssr)页面有详细解释)：

```bash
.
└── src-ssr/
    ├── middlewares/  # SSR 中间件文件
    ├── directives/   # Vue 指令的 SSR 转换
    └── production-export.js # SSR 网络服务器生产出口
```
