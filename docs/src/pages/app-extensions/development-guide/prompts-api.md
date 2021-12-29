---
title: 应用程序扩展提示 API
desc: 为配置Quasar应用程序扩展而向用户提出的问题的语法。
---

本页指的是`src/prompts.js`文件，该文件在安装App Extension时处理提示问题。并非所有的应用扩展都需要提示--这是一个可选的步骤。

用户的答案被保存在`/quasar.extensions.json`（项目文件夹的根目录），除非你真的知道你在做什么，否则不应该被篡改。

文件的基本结构示例:

```js
module.exports = function () {
  return [
    //问题
  ]
}
```

你可以在[Install](/app-extensions/development-guide/install-api)、[Index](/app-extensions/development-guide/index-api)和[Uninstall](/app-extensions/development-guide/uninstall-api)中访问`api.prompts`（它保存你的App Extension的答案）。

现在让我们关注定义问题的返回数组的结构。以下各节提供了最常用问题类型的示例。

::: warning
以下并不是一个可能的问题类型的详尽列表，也绝不是描述了全部可用的API。请查看[Inquirer.js](https://github.com/SBoudrias/Inquirer.js#readme)，以了解这方面的情况（Quasar CLI在后台使用）。
:::

## 字符串
```js
{
  // "description" 是一个变更，用于保存答案
  name: 'description'
  type: 'input',
    required: false, // 可选
    message: 'Project description',
default: 'A Quasar Framework app', // 可选
}
```

```js
{
  name: 'source_build',
  type: 'input',
  required: true, // 可选
  message:
    '如果你想在生产过程中用一个单独的文件作为源图像，请在这里指定它：',
  validate: (input) => {
    // ...做一些事情 ...
  },
  default: (answer) => {
    return answers.source_dev || defaultImg
  }
}
```

## 确认
```js
{
  // "featureX "将是一个变量, 用于保存答案
  name: 'featureX',
  type: 'confirm',
  message: '使用 feature X,
  default: true // 可选
}
```

## 列表中的选择
```js
{
  // "iconSet "将是一个变量, 用来保存答案
  name: 'iconSet',
  type: 'list',
  message: '选择图标集',
  choices: [
    {
      name: 'Material Icons（推荐）',
      value: 'material-icons', //答案变量的值
      short: 'Material Icons' // 用户选择后显示的短名称
    },
    {
      name: 'Fontawesome v5',
      value: 'fontawesome-v5', //答案变量的值
      short: 'Fontawesome v5' // 用户选择这个后显示的短名称
    }
    // ...所有其他选择
  ]
}
```
