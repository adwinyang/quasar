---
title: ESLint
desc: 如何在Quasar应用程序中配置一个代码转换器。
---
强烈推荐使用代码衬垫器(如[ESLint](https://eslint.org/))，它可以确保你的代码看起来清晰可读。它还可以帮助你在运行代码之前捕获一些错误。

当你用Quasar CLI创建一个Quasar项目文件夹时，它会问你是否需要一个linter，以及你想为ESLint做什么设置。

* [标准](https://github.com/standard/standard)
* [Airbnb](https://github.com/airbnb/javascript)
* [Prettier](https://github.com/prettier/prettier)
* ...或者你可以自己配置一个

两个点状文件将被创建。

* .eslintrc.js -- ESLint配置，包括规则
* .eslintignore -- ESLint在进行linting时应该忽略的内容

可以对上面的Eslint设置之一做进一步的扩展。你的项目将默认使用`eslint-plugin-vue`来处理你的Vue文件。快速看一下`.eslintrc.js`并注意它。

```js
extends: [
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // 考虑切换到`plugin:vue/strongly-recommended`或`plugin:vue/recommended`的更严格的规则。
  'plugin:vue/strongly-recommended'
]
```

如果你在创建项目文件夹时选择了ESLint，你也会注意到`/quasar.conf.js`为你在Webpack配置中添加了eslint-loader。

```js
build: {
  chainWebpack (chain) {
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: [ 'js', 'vue' ] }])
  }
}
```

## 润色规则
提示规则可以被删除、改变或添加。注意一些事情。

* 有些规则是针对标准、Airbnb或Prettier标准的(无论你在创建项目时选择哪一种)。例如："brace-style"。
* 有些规则是针对eslint-plugin-vue的。例如：'vue/max-attributes-per-line'。

你可以通过首先访问https://eslint.org/docs/rules/ 或 https://github.com/vuejs/eslint-plugin-vue 来添加/删除/改变规则。

下面是ESLint规则的示例。
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

## 禁用 Linter
为了让你以后能禁用ESLint，你只需要从`/quasar.conf.js`中注释掉(或删除)以下代码。

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
