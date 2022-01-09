---
title: 提交约定
desc: Quasar提交约定
---

## 目标
 - 允许通过Git Botect忽略inuctits(不是格式化的重要提交)
 - 浏览历史时提供更好的信息

::: warning
此规则适用于所有[Quasar存储库](https://github.com/quasarframework) 。
:::

被关心的日志是一个美丽而有用的东西。 `git责备责备，`恢复`，`rebase`，`log`，`shortlog`和其他子命令。 审查他人的提交和拉拔请求变得值得做，突然可以独立完成。 了解为什么几个月或几年前的事情不仅可能而且有效。

## 推荐的 git 消息提交规则

1. 用空白线分隔主体
2. 将主题行限制为70个字符
3. 利用主题行
4. 不要以句号结束主题行
5. 在主题行中使用祈使语气
6. 正文每80个字符进行换行
7. 使用主体解释是什么、为什么、如何做

## 提交消息的格式

```
type(<scope>): <Subject> #<github-ref-id>

<body>

<footer>
```

### 提交消息的示例

```
fix(ui): Ensure Range headers adhere more closely to RFC 2616 #2310

To add new dependency use `range-parser`to compute the range.
It is more well-tested in the wild.

BREAKING CHANGE:
port-runner command line option has changed to runner-port.
To migrate your project, change all the commands,
where you use --port-runner to --runner-port.
```

## 消息主题(第一行)

第一行不能超过70个字符，第二行始终为空。类型和范围应始终为小写，如下所示。

**允许`<type>`值：**

 -  **feat**  - 用户的新功能，而不是构建脚本的新功能
 -  **fix**  - 针对用户的bug修复，而不是针对构建脚本的修复
 -  **docs**  - 仅更改文档
 -  **style**  - 不影响代码含义的更改(空白，格式化，缺少半冒号等)
 -  **refactor**  - 重构生产代码，代码更改既不修复错误也不是添加一个功能
 -  **chore**  - 不修改src或测试文件的其他更改；无生产代码更改
 -  **perf**  - 改善性能的修改
 -  **revert**  - 恢复以前的提交
 -  **test**  - 添加缺失的测试，重构测试;无生产代码更改
 -  **build**  - 影响构建系统或外部依赖项的更改(示例范围：GULP，NPM)
 -  **ci**  - 更改我们的持续积分配置文件和脚本(示例范围：Travis，Circle CI)

**示例`<scope>`值：**

 -  UI，CLI，API，TouchSwipe，QTime等。

::: tip
`<scope>`可以包含由逗号分隔的更多值。 示例：`FIX(UI，CLI)：添加了 Cordova 模式。

`<scope>`可以是空的(例如，如果更改是全局)，在这种情况下省略括号。
:::

## 邮件正文

- 使用命令，目前时态：“更改”而不是“更改”也不“更改”
- 包括改变和对比的动机与以前的行为

## 消息解注

### 破坏性变化

所有的破坏性修改都必须在页脚以破坏性修改块的形式提及，它应该以BREAKING CHANGE: 字样开始，并加上空格或两个换行。提交信息的其余部分是对修改的描述、理由和迁移说明。

```
BREAKING CHANGE: isolate scope bindings definition has changed and
    the inject option for the directive controller injection was removed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
      myBind: 'bind',
      myExpression: 'expression',
      myEval: 'evaluate',
      myAccessor: 'accessor'
    }

    After:

    scope: {
      myAttr: '@',
      myBind: '@',
      myExpression: '&',
      // Myeval  - 通常没有有用，但在表达式的情况下，您可以使用'='
      myAccessor: '=' // in directive's template change myAccessor() to myAccessor
    }
```

### 参考问题

已关闭的问题应列在页脚上的单独一行上，以“closees”关键字开头，如下所示：

`Closes #234`

或者存在多个问题的情况下：

`Closes #123，#245，#992`
