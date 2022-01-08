---
title: 浏览器兼容性
desc: 如何用 Quasar CLI 处理浏览器的支持。
related:
  - /quasar-cli/quasar-conf-js
---

## 配置兼容性
你的`/package.json`文件应该包含一个`browserslist`字段。这将告诉Quasar App该项目所针对的浏览器的范围。Babel和Autoprefixer将使用这个字段来决定如何转译JS代码(如果转译被允许的话)，以及需要什么CSS供应商前缀来添加你的CSS代码。

Babel会准确地寻找需要转译的JS功能(基于配置的浏览器)并应用它们。不过要注意这一点，因为在选项列表中增加一个 "坏苹果 "就足够了，这将使你的代码变回ES5的水平。

以下是你创建 Quasar 项目时默认的 "浏览器列表"。

```js
// package.json

"browserslist": [
  "last 10 Chrome versions",
  "last 10 Firefox versions",
  "last 4 Edge versions",
  "last 7 Safari versions",
  "last 8 Android versions",
  "last 8 ChromeAndroid versions",
  "last 8 FirefoxAndroid versions",
  "last 10 iOS versions",
  "last 5 Opera versions"
]
```

关于如何指定浏览器范围的更多信息。[browserslist](https://github.com/browserslist/browserslist) 。
