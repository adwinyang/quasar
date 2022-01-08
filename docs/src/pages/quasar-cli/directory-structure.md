---
title: 目录结构
desc: Quasar 应用程序的结构与每个文件夹和文件的解释。
---
这是一个安装了所有模式的项目的结构。不过，我们没有理由被吓倒!

::: tip
如果你是一个初学者，你需要关心的是`/quasar.conf.js`( Quasar 应用程序配置文件)，`/src/router`，`/src/layouts`，`/src/pages`和可选`/src/assets`。
:::

```bash
.
├── public/                  # 纯静态资产（直接复制）
├── src/
│   ├── assets/              #动态资产（由webpack处理）
│   ├── components/          #页面&布局中使用的.vue组件
│   ├── css/                 # CSS/Sass/... 应用的文件
|   |   ├── app.sass
|   │   └── quasar.variables.sass # Quasar Sass 变量供你调整
│   ├── layouts/             # layout .vue 文件
│   ├── pages/               # page .vue 文件
│   ├── boot/                # 启动文件（app初始化代码）
│   ├── router/              # Vue 路由器
|   |   ├── index.js         # Vue Router 定义
|   │   └── routes.js        # 应用路由定义
│   ├── store/               # Vuex Store
|   |   ├── index.js         # Vuex Store 定义
|   │   ├── <文件夹>          # Vuex 存储模块...
|   │   └── <文件夹>          # Vuex 存储模块...
│   ├── App.vue              # 你的App的根Vue组件
│   └── index.template.html  # index.html的模板
├── src-ssr/                 # SSR特定代码（如生产Node webserver）
├── src-pwa/                 # PWA特定代码（如Service Worker）
├── src-cordova/             # Cordova 生成的文件夹，用于创建移动应用
├── src-electron/            # Electron 特定代码（如“主”线程）
├── src-bex/                 # BEX（浏览器扩展）特定代码（如“主”线程）
├── dist/                    # 生产构建去哪里
│   ├── spa/                 # 构建SPA时的例子
│   ├── ssr/                 #构建SSR时的例子
│   ├── electron/            # 构建Electron时的例子
│   └── ……
├── quasar.conf.js           # Quasar App 配置文件
├── babel.config.js          # Babeljs 配置
├── .editorconfig            # 编辑器配置
├── .eslintignore            # ESlint 忽略路径
├── .eslintrc.js             # ESlint 配置
├── .postcssrc.js            # PostCSS 配置
├── .gitignore               # GIT 忽略路径
├── package.json             # npm 脚本和依赖
└── README.md                # 你的网站/应用程序的自述文件
```
