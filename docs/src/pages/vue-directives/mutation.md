---
title: 突变指令
desc: Vue指令，使用Mutation Observer API来观察DOM树的变化。
keys: mutation
---

"Mutation "是一个Quasar指令，它提供了观察DOM树变化的能力，并在这些变化被触发时调用一个方法。

在引擎盖下，它使用[Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)。

## 突变API

<doc-api file="Mutation" />

## 使用方法

首先阅读[Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)将对你理解这个指令的工作方式有很大帮助。

处理函数需要一个参数，它是一个[MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord)的数组。

### 抓住一切

通过不指定任何修改器(除了 "一次")，突变指令将启用所有的修改器。

<doc-example title="捕捉一切" file="Mutation/CatchAll" />

### 拖放示例

由于拖放浏览器API的支持，下面的示例只对台式机有效。将彩色方块拖到其他位置，以查看突变观测器的结果。

<doc-example title="拖放(仅限桌面)" file="Mutation/DragDrop" />

### 撤销-重做示例

突变观测器的一个用例是在你的应用程序中实现一个撤消/重做堆栈。你可以根据你的过滤要求，观察数据的添加和删除。你可以在栈中捕获突变，并使用栈来实现撤销。撤销过程中的任何突变数据，都可以进入重做栈。当规范化的数据被放入撤销堆栈时，不要忘记清除重做堆栈。

<doc-example title="撤销/重做" file="Mutation/UndoRedo" />
