---
title: 支持TypeScript
desc: 如何在Quasar应用程序中启用对TypeScript的支持。
related:
  - /quasar-cli/quasar-conf-js
---

对Typescript的支持并没有被默认添加到你的项目中(除非你在创建项目文件夹时选择了TS)，但它可以通过本页面的指南轻松集成。

::: tip
只有当你在创建一个新的Quasar项目时**没有选择TypeScript支持时，才需要以下步骤。如果你在创建项目时选择了TS选项，TypeScript支持已经被启用。
:::

## 安装TypeScript支持

为了支持TypeScript，你需要编辑`/quasar.conf.js`。

```js
module.exports = function (ctx) {
  return {
    supportTS: true,
    ....
  }
}
```

然后在你的项目根部创建`/tsconfig.json`文件，内容如下。

```json
{
  "extends": "@quasar/app/tsconfig-preset",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

现在你可以开始在你的项目中使用TypeScript。

::: tip
记住，你必须把你的JavaScript文件的扩展名改为`.ts`，以允许在里面写TypeScript代码。要在你的组件中写入TS代码，相反，要改变脚本的开头标签，就像这样`<script lang="ts">`。
:::

::: warning
如果你启用了`supportTS`标志，但没有添加`tsconfig.json`文件，应用程序将在编译时中断
:::

## 处理TS Webpack加载器

在幕后，Quasar使用`ts-loader`和`fork-ts-checker-webpack-plugin`(由`@quasar/app`包提供)来管理TS文件。如果你需要为这些库提供一个自定义的配置，你可以通过制定`supportTS'属性来实现，就像这样。

```js
// quasar.conf.js
module.exports = function (ctx) {
  return {
    supportTS: {
      tsLoaderConfig: {
        // `appendTsSuffixTo: [/\.vue$/]`和`transpileOnly: true`是默认添加的，不能被重写。
        ...
      },
      tsCheckerConfig: {
        // `vue: true`是默认添加的，不能被重写。
        ...
      }
    },
    ....
  }
}
```

### 提示性设置

首先添加需要的依赖性。

```bash
$ yarn add --dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

然后相应地更新你的ESLint配置，就像下面的示例。

```js
// .eslintrc.js
const { resolve } = require('path');

module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // 这个选项在这个文件上中断了配置的层次结构
  // 如果你有一个更高级别的ESLint配置文件，就把它去掉(它通常会发生在一个monorepos中)。
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
  // 必须使用parserOptions而不是 "parser"，以便让vue-eslint-parser继续工作。
  // `parser: vue-eslint-parser'`已经包含在任何'plugin:vue/**'配置中，应该省略。
  parserOptions: {
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint
    // 需要使解析器考虑到'vue'文件
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },

  // 规则的顺序很重要，请避免洗牌。
  extends: [
    // 基础ESLint推荐规则
    'eslint:recommended',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint排版规则
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 如果检查时间过长，可以考虑禁用这类规则
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention
    // 考虑切换到`plugin:vue/strongly-recommended`或`plugin:vue/recommended`以获得更严格的规则
    'plugin:vue/essential',

    // ---只有在使用更漂亮的时候 ---
    // https://github.com/prettier/eslint-config-prettier#installation
    // 与Prettier的使用，由'eslint-config-prettier'提供。
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],

  plugins: [
    // 需要应用需要类型信息的规则
    '@typescript-eslint',

    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // 需要对*.vue文件进行润色
    'vue',
  ],

  // 在这里添加你的自定义规则
  rules: {
    // 其他人的规则...

    // 术语表
    'quotes': ['warn', 'single'],
    '@typescript-eslint/explicit-function-return-type': 'off',
  }
}
```

如果有什么问题，请阅读[typescript-eslint guide](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)，这个示例就是基于此。

作为最后一步，更新你的`yarn lint`命令，使其也对`.ts`文件进行检查。

::: tip
由于类型检查的开销，TypeScript Linting真的很慢，我们建议你在`quasar.conf.js`中禁用Webpack lint扩展，用于开发构建。
:::

如果你设置了TypeScript linting并希望`fork-ts-checker-webpack-plugin`(由`@quasar/app`包提供)考虑到它，那么你应该使用`tsCheckerConfig`属性。

```js
// quasar.conf.js
module.exports = function (ctx) {
  return {
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: true,
          files: './src/**/*.{ts,tsx,js,jsx,vue}'
        }
      }
    },
    ....
  }
}
```
