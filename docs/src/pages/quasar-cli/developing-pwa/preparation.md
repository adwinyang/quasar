---
title: 为PWA做准备
desc: 如何用Quasar CLI添加PWA模式。
related:
  - /quasar-cli/quasar-conf-js
---

我们将使用Quasar CLI来开发和构建一个PWA。构建SPA、Mobile App、Electron App、PWA或SSR之间的区别只是由 "quasar dev "和 "quasar build "命令中的 "mode "参数决定。

为了建立一个PWA，我们首先需要在我们的Quasar项目中添加PWA模式。

```bash
$ quasar mode add pwa
```

如果你想直接进入并开始开发，你可以跳过 "Quasar 模式 "命令并发出。

```bash
$ quasar dev -m pwa
```

这将自动添加PWA模式，如果它是缺失的。

一个新的文件夹将出现在你的项目文件夹中(这在[配置PWA](/quasar-cli/developing-pwa/configuring-pwa)页面有详细解释)。

```bash
.
└── src-pwa/
    ├── register-service-worker.js  # (or .ts) App-code *managing* service worker
    └── custom-service-worker.js    # (or .ts) Optional custom service worker file
                                    #               (InjectManifest mode ONLY)
```

这两个文件将在接下来的页面中详细介绍，但高度概括的是。

* `register-service-worker.[js|ts]`文件是UI代码的一部分，与服务工作者进行通信。
* 当使用InjectManifest时，你可以编写你自己的自定义服务工作者(`custom-service-worker. [js|ts]`)。
