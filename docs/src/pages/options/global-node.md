---
title: 全局节点生成
desc: 一些用于显示浮动元素的 Quasar 组件和插件将创建将它们附加到主体的全局节点。
---
你可以为这个全局节点元素定义自定义 className。

## 安装
你不需要做任何事情。

## 配置

为了给全局节点定义自定义类，请编辑你的 /quasar.conf.js 文件，如下所示。

```js
// 文件：/quasar.conf.js

framework: {
  config: {
    globalNode: {
      className: 'my-class'
    }
  }
}
```
