---
title: 带类型的SSR
desc: 如何在 Quasar 中使用带有SSR的类型脚本
---

为了用Typescript支持SSR，你需要：1:

1. 编辑quasar.conf.js > supportTS。将其设置为`true`或使用Object形式。
2.  将你在/src-ssr中的所有文件从`.js`重命名为`.ts`，并进行必要的TS代码修改。

更多信息：[支持TS](/quasar-cli/supporting-ts)
