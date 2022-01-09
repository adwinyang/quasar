---
title: ESLint
desc: 如何在 Quasar 应用程序中配置一个代码检查工具（code linter)。
---
强烈推荐使用代码检查工具(如[ESLint](https://eslint.org/) )，它可以确保你的代码看起来清晰可读。它还可以帮助你在运行代码之前捕获一些错误。

当你用 Quasar CLI 创建一个 Quasar 项目文件夹时，它会问你是否需要一个代码检查工具(linter)，以及你想为 ESLint 做什么设置。

* [Standard](https://github.com/standard/standard)
* [Airbnb](https://github.com/airbnb/javascript)
* [Prettier](https://github.com/prettier/prettier)
* ...或者你可以自己配置一个

将创建两个”点“开头的文件：

* .eslintrc.js -- ESLint配置，包括规则
* .eslintignore -- ESLint在进行代码检查时应该忽略的内容

可以对上面的 ESLint 设置之一做进一步的扩展。你的项目将默认使用`eslint-plugin-vue`来处理你的Vue文件。快速看一下`.eslintrc.js` 并注意它：

```js
extends: [
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // 考虑切换到`plugin:vue/strongly-recommended`或`plugin:vue/recommended`的更严格的规则。
  'plugin:vue/strongly-recommended'
]
```

如果你在创建项目文件夹时选择了ESLint，你也会注意到`/quasar.conf.js`为你在Webpack配置中添加了 eslint-loader：

```js
build: {
  chainWebpack (chain) {
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: [ 'js', 'vue' ] }])
  }
}
```

## Lint 规则
提示规则可以被删除、改变或添加。注意一些事情。

* 有些规则是针对标准、Airbnb或Prettier标准的(无论你在创建项目时选择哪一种)。例如："brace-style"。
* 有些规则是针对eslint-plugin-vue的。例如：'vue/max-attributes-per-line'。

你可以通过首先访问 https://eslint.org/docs/rules/ 或 https://github.com/vuejs/eslint-plugin-vue 来添加/删除/改变规则。

下面是ESLint规则的示例的：
```js
// .eslintrc.js

'rules': {
  'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],

  'vue/max-attributes-per-line': 0,
  'vue/valid-v-for': 0,

  // 允许异步等待(async-await)。
  'generator-star-spacing': 'off',

  // 允许无父无母的箭头函数
  'arrow-parens': 0,
  'one-var': 0,

  'import/first': 0,
  'import/named': 2,
  'import/namespace': 2,
  'import/default': 2,
  'import/export': 2,
  'import/extensions': 0,
  'import/no-unresolved': 0,
  'import/no-extraneous-dependencies': 0,

  // 允许在开发过程中使用调试器
  'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
}
```

## 禁用代码检查工具
为了以后能禁用 ESLint，你只需要从`/quasar.conf.js`中注释掉(或删除)以下代码。

```js
build: {
  chainWebpack (chain) {
    /*
     * we comment out this block
     *
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: [ 'js', 'vue' ] }])
    */
  }
}
```
