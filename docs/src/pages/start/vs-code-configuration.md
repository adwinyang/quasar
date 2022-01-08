---
title: 配置VS代码
desc: 如何配置VSCode以达到与 Quasar 的最佳使用效果。
---

::: tip
本指南假定你已经安装了Quasar CLI 1.0或更高版本和Visual Studio Code。
:::

## 标准ES-Lint规则

如果不进行一些定制，VS Code中的默认格式在运行`quasar dev`或`quasar build`命令时，会产生似乎无穷无尽的错误，因为它们包括对es-lint的调用，并在你创建项目时指定规则集。本指南中的配置是针对标准规则集的。

### 安装VS Code Extensions for Standard

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### 更新VS Code的标准设置文件

要编辑设置，请使用视图菜单中命令调色板中的`打开设置JSON`命令(ctrl+shift+p)。

```js
{
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
      "source.fixAll": true
  },
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "javascript.format.placeOpenBraceOnNewLineForControlBlocks": false,
  "javascript.format.placeOpenBraceOnNewLineForFunctions": false,
  "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
  "typescript.format.placeOpenBraceOnNewLineForControlBlocks": false,
  "typescript.format.placeOpenBraceOnNewLineForFunctions": false,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.js": "vscode-typescript"
}
```

### 在一个新的 Quasar 项目上测试标准

```bash
# I selected default values for all options to create this guide
$ quasar create qt

# Verify it runs without error
$ cd qt
$ quasar dev
```

你现在可以在不违反标准ES-lint规则的情况下编辑文件了!

## ###Prettier ES-Lint规则

VS Code可以使用Prettier扩展来在保存时自动格式化你的代码。

### 安装VS Code的Prettier扩展程序

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### 为Prettier更新VS Code设置文件

要编辑设置，请使用视图菜单中命令调色板中的`Open Settings JSON`命令(ctrl+shift+p)。

```js
{
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,

  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },

  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatter.js": "prettier-eslint",
}
```

### 在一个新的 Quasar 项目上测试Prettier

```bash
# I selected default values for all options to create this guide
# except for the linting profile, I selected prettier instead of standard
$ quasar create qtp

# Verify it runs without error
$ cd qtp
$ quasar dev
```

你现在可以在不违反es-lint标准规则的情况下编辑文件了!

## 推荐额外的VS Code扩展和设置更新

- [自动重命名标签](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [自动关闭标签](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [括号对着色器](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [上下文菜单中的格式](https://marketplace.visualstudio.com/items?itemName=lacroixdavid1.vscode-format-context-menu)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [导入成本](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)
- [Sass Lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint)
- [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [对HTML和Jade属性进行排序](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-attrs-sorter)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [Vue Peek](https://marketplace.visualstudio.com/items?itemName=dariofuzinato.vue-peek)
- [VS代码图标](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)

要编辑设置，请使用视图菜单的命令调色板中的`Open Settings JSON`命令(ctrl+shift+p)。

```js
{
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,

  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },

  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatter.js": "prettier-eslint",

  "attrsSorter.order": [
    "is",
    "v-for",
    "v-if",
    "v-else-if",
    "v-else",
    "v-show",
    "v-cloak",
    "v-once",
    "v-pre",
    "id",
    "ref",
    "key",
    "v-slot",
    "v-slot.+",
    "#.*",
    "slot",
    "v-model",
    "v-model.+",
    "v-bind",
    "v-bind.+",
    ":.+",
    "v-text",
    "v-text.+",
    "v-html",
    "v-html.+",
    "class",
    "v-on.+",
    "@.+",
    "name",
    "data-.+",
    "ng-.+",
    "src",
    "for",
    "type",
    "href",
    "values",
    "title",
    "alt",
    "role",
    "aria-.+",
    "$unknown$"
  ],
  "todohighlight.isEnable": true,
  "todohighlight.include": [
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
    "**/*.html",
    "**/*.php",
    "**/*.css",
    "**/*.sass",
    "**/*.scss",
    "**/*.vue"
  ],
  "workbench.iconTheme": "vscode-icons"
}
```

## 在VS代码中调试 Quasar 项目

1. 首先，前往[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)，并彻底阅读它。
2. 然后，由于 Quasar 是基于Vue的，你还需要参考[Vue Cookbook for VSCode debugging](https://vuejs.org/v2/cookbook/debugging-in-vscode.html)来设置调试Vue应用程序。

最好的方法是在本页面旁边的浏览器中打开，这样你就可以在阅读这些说明时回顾这些说明。并在你的项目中应用这些改变。

Vue手册的第一步说的是启用源码地图。Quasar会自动启用开发模式的源码地图。这里有一篇很好的文章](https://blog.scottlogic.com/2017/11/01/webpack-source-map-options-quick-guide.html)，描述了[webpack devtool设置](https://webpack.js.org/configuration/devtool/)的不同值(开启或关闭源码地图的那个)。 Quasar默认使用_cheap-module-eval-source-map_。

虽然`cheap-module-eval-source-map`可能构建得更快，但它使调试更难，而且它使VSCode的调试几乎不可能。在这种情况下，devtool的推荐值是`source-map`。这使得在VSCode中的调试正常进行，因为你的完整的vue源文件可以在内置的chrome调试器中找到，因此会更容易找到你的原始源文件，更容易正确定位你想设置断点的那一行。如果你想启用这一点，你可以在你的_quasar.config.js_文件中添加这一行。

```js
// quasar.conf.js
build: {
  // ...

  // 这是一个传递给
  // 到底层的Webpack
  devtool: 'source-map'
}
```

然后你需要告诉VSCode为调试器添加一个配置。最简单的方法是点击操作栏上的bug图标(对于ltr语言，就是最左边的那个栏)。一旦你点击了那个bug图标，文件树区域就会切换到调试和运行区域。点击该窗口标题栏中的齿轮图标，它将弹出一个名为_launch.json_的文件。这是你把启动要调试的应用程序的不同配置放在这里。下面是在Chrome中启动 Quasar 应用程序的设置。对于Firefox版本，请看上面提到的Vue cookbook。

```js
{
  "type": "chrome",
  "request": "launch",
  "name": "Quasar App: chrome",
  "url": "http://localhost:8080",
  "webRoot": "${workspaceFolder}/src",
  "breakOnLoad": true,
  "sourceMapPathOverrides": {
    "webpack:///./src/*": "${webRoot}/*"
  }
}
```

现在保存该文件，然后在调试和运行窗格的标题栏的下拉菜单中选择该配置。在你启动调试器之前，应用程序必须正在运行。在命令行中，用`quasar dev`启动你的应用程序的开发模式。然后在调试和运行窗格中点击绿色的 "go "按钮，启动调试会话，并附加到你正在运行的应用程序。你现在可以设置断点，控制步进/步出等，所有这些都来自VSCode。你也可以启动内置的Chrome调试器，它将保持同步。如果你还安装了[Vue devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)(强烈推荐)，这可能很有用。

::: tip
如果你只是想使用Chrome或Firefox的调试器，但你发现很难在浏览器的源代码标签中找到正确的源代码文件，那么你可以在代码中使用调试器语句，强制调试器在该行停止，并调出正确的源代码。
:::



