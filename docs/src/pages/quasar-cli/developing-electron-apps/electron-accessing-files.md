---
title:  Electron 访问文件
desc: 如何在 Quasar 桌面应用程序中访问文件。
---

## 使用 __dirname 与 __filename
由于主进程是用webpack捆绑的，所以使用`__dirname`和`__filename`在生产中不会提供一个预期的值。参考文件树，你会发现在生产中，electron-main.js和electron-preload.js文件被放在`dist/electron-*`文件夹内。基于这个知识，相应地使用`__dirname`和`__filename`。

```bash
app.asar
└─ dist
   └─ electron-*
      ├─ js/...
      ├─ icons/
      ├─ node_modules/
      ├─ index.html
      ├─ package.json
      ├─ electron-main.js
      ├─ electron-preload.js
      └─ ...contents of /public
```

## 读取和写入本地文件
使用Electron的一个很大的好处是能够访问用户的文件系统。这使你能够读取和写入本地系统的文件。为了帮助避免Chromium的限制和对你的应用程序的内部文件的写入，请确保使用electron的API，特别是app.getPath(name)函数。这个辅助方法可以得到系统目录的文件路径，如用户的桌面、系统临时文件等。

我们可以使用userData目录，它是专门为我们的应用程序保留的，所以我们可以有信心其他程序或其他用户的互动不应该篡改这个文件空间。

```js
//  Electron 主件或 Electron 预装件

import path from 'path'
import { app } from '@electron/remote'

const filePath = path.join(app.getPath('userData'), '/some.file')
```

## 访问公共文件夹

如果由于某种原因，你有重要的文件存放在/public文件夹中，你也可以通过下面的代码来访问这些文件。要了解为什么你需要以这种方式访问它们，请阅读上面的 "使用__dirname & __filename "一节。

```js
//  Electron 主件或 Electron 预装件

import path from 'path'

const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)
```
