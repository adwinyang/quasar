---
title: 对电子安全的担忧
desc: 关于Quasar桌面应用程序的安全性，你应该知道的事情。
---
如果你在构建Electron应用程序时没有保持警惕，你可能会将你的应用程序的用户置于切实的数字危险之中。像XSS(跨站脚本)和远程代码执行这样的东西，实际上可以使攻击者深入访问你的应用程序中的数据--甚至可能是底层操作系统。

特别是在 "公开 "工作时，即作为一个开源项目，你肯定要考虑用代码签名和完整性检查来加固你的应用程序。(见 "提示 "部分)

::: danger
在任何情况下，你都不应该加载和执行远程代码。相反，只使用本地文件(与你的应用程序一起打包)，在你的主线程和/或预加载脚本中执行Node.js代码。
:::

## 检查表。安全建议
Electron团队自己提出了以下建议。

1.  确保你将`webPreferences`>`contextIsolation`设置为`true`。使用[preload script](/quasar-cli/developing-electron-apps/electron-preload-script)，只注入必须的API到渲染器线程。
2.  如果你必须加载远程内容，并且无法绕过这一点，那么就使用[只加载安全内容](https://electronjs.org/docs/tutorial/security#1-only-load-secure-content)
3.  [在所有加载远程内容的会话中使用`ses.setPermissionRequestHandler()`](https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content)
4.  4. [不要禁用`webSecurity`](https://electronjs.org/docs/tutorial/security#5-do-not-disable-websecurity)
5.  [不要将`allowRunningInsecureContent`设置为`true`](https://electronjs.org/docs/tutorial/security#7-do-not-set-allowrunninginsecurecontent-to-true)
6.  [不要启用实验性功能](https://electronjs.org/docs/tutorial/security#8-do-not-enable-experimental-features)
7.  7. [不要使用`enableBlinkFeatures`](https://electronjs.org/docs/tutorial/security#9-do-not-use-enableblinkfeatures)
8.  [`<webview>`: 不要使用`allowpopups`](https://electronjs.org/docs/tutorial/security#10-do-not-use-allowpopups)
9.  [`<webview>`: 验证选项和参数](https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation)
10.  [禁用或限制导航](https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation)
11.  [禁止或限制创建新窗口](https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows)

除了上面的第3和第4项，如果检测到这些问题中的一个，Electron会在开发控制台中发出警告。


## 技巧和窍门

#### 通讯协议
你现在应该知道了，但是如果你没有使用**https** / **sftp** / **wss**，那么应用程序与外界的通信就会非常容易被篡改。无论你在构建什么，请在任何地方使用安全协议。

#### 文件系统访问
拥有对文件系统的读写权限是渗透测试者的圣杯，如果你的应用程序能够实现这种类型的交互，请考虑使用IPC和多个窗口(具有不同的权限)，以尽量减少攻击面。

#### 加密
如果你的应用程序的用户有秘密，如钱包地址、个人信息或其他类型的商业秘密，在休息时保持该信息的加密，只有在需要时才在内存中解密，并确保在你用完它时覆盖/销毁内存中的对象。但无论你如何处理，都要遵循这四条规则。

1.使用强加密(即抗碰撞，而不是md5)。
2.不要发明一种新的加密类型
3.明确地遵循实施说明
4.考虑到用户体验

#### 在生产中禁用开发者工具

你可能不想让那些穿着连帽衫的流氓在你的应用程序的控制台中执行这样的东西。

```js
window.location='https://evilsite.com/looks-just-like-your-app'
```

The key-combination <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>I</kbd> (or <kbd>ALT</kbd>+<kbd>CMD</kbd>+<kbd>I</kbd> on Mac) will open the dev tools and enable inspection of the application. It will even enable some degree of modification. Prevent the simple `evil maid` attack by catching these keypresses and `return false`.

#### Publish checksums
When you have built your binary blobs and want to publish them e.g. on GitHub, use `shasum` and post these results somewhere prominent (like on the GitHub release page for your project) and potentially on a public blockchain, such as [Steem](https://steemworld.org/@quasarframework).

```bash
$ shasum -a 256 myApp-v1.0.0_darwin-x64.dmg
40ed03e0fb3c422e554c7e75d41ba71405a4a49d560b1bf92a00ea6f5cbd8daa myApp-v1.0.0_darwin-x64.dmg
```

#### 签署构建
虽然不是分享你的应用程序的硬性要求，但签署代码是一种最佳做法--而且MacOS和Windows商店都要求这样做。在这个[Electron官方教程]中阅读更多关于它的内容(https://electronjs.org/docs/tutorial/code-signing)。

#### 使用SNYK
[Snyk.io](https://snyk.io)是一个服务、CLI甚至GitHub集成机器人，它通过比较你的package.json中的依赖关系和它的受损模块列表来跟踪节点模块的漏洞。在许多情况下，他们的服务可以推荐最低更新版本，甚至提供他们自己已经打过补丁的模块。他们还进行研究和漏洞披露。如果你正在使用压缩文件(zip、tar等)，可以查看他们的[文章](https://snyk.io/research/zip-slip-vulnerability)和[受影响软件列表](https://github.com/snyk/zip-slip-vulnerability)。


#### 对于那些真正的偏执狂
为每个平台目标使用一个专门的物理桌面机器。如果你必须让这个设备保持在线，确保操作系统一直在更新，允许从互联网/蓝牙(尤其是shell/ssh)的零入站连接，并不断进行病毒和rootkit检查。

只允许合并有GPG签名的提交，并要求至少有两个团队成员(没有做PR的人)审查和批准该提交。

重新考虑你的node软件包管理系统。
- 使用一个私有的npm注册表(如[JFrog](https://jfrog.com/))。
- 将你的包修正为已知的特定版本
- 使用pnpm
- 审核每一个模块和它的依赖关系

#### 付出被黑的代价
某个聪明人可能已经黑掉了你的项目(或一个底层库)。如果你用这个应用程序赚钱，可以考虑获得一个[Hacker One](https://hackerone.com)账户，并不断进行赏金奖励。至少你能说服黑客遵守道德，不要把漏洞卖给你的竞争对手。

#### 获得帮助
你可能会感到不知所措，因为Electron的可怕之处带来了许多你从未想过的头痛问题。如果是这种情况，请考虑[联系](mailto:razvan.stoenescu@gmail.com)并获得专家的支持，由给你带来Quasar框架的经验丰富的开发团队对你的应用程序进行审查、审计和加固。

<q-separator class="q-mt-xl" />

> 本页部分内容取自官方的[Electron安全指南](https://electronjs.org/docs/tutorial/security)。
