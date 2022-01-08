---
title: 安全方面的 "应该 "和 "不应该
desc: Quasar安全建议的清单。
---
**做**定期审查你的应用程序的安全性，因为任何疏忽都可能使你自己、你的团队、你的用户、甚至你的服务器处于严重被利用的风险之中。**不要***忽视这个页面，因为你认为你知道一切。

我们已经为那些刚进入安全领域的人收集了一些最佳实践，也为刚进入Vue生态系统的安全专家收集了一些见解。当我们通过自己的研究和惊人的安全社区的出版物意识到风险时，我们将修改和补充这份文件。

![Quasar Audited - Gold](https://cdn.quasar.dev/img/secure-gold-hero.jpg "Quasar Audited - Gold")

## Vue安全风险

### 用户输入和v-html的危险

`v-html`指令是一种以编程方式渲染标记的绝佳方式，但即使是Vue文档也有[这个警告](https://v3.vuejs.org/api/directives.html#v-html)。
> "在你的网站上动态渲染任意的HTML是非常危险的，因为它很容易导致XSS漏洞。只在可信的内容上使用HTML插值，而不是在用户提供的内容上。"

如果你不知道这意味着什么，请快速看看OWASP对[XSS(又称跨站脚本)](https://owasp.org/www-community/attacks/xss/)的说法。

公平地说，这*是*好的建议，但**不要**的手忙脚乱。**要像攻击者一样思考，他们会创新、社会工程、撒谎、钓鱼和偷窃他们进入你的系统的方式。如果一个webpack加载器的漏洞出现并以邪恶的方式改变了你的页面怎么办？如果有人做了一个卑鄙和不怀好意的公关呢？如果第三方API突然改变，开始发送相同的结构，但内容不同，而不是明文呢？如果你认为安全的系统被发现实际上已经被反追踪了呢？如果一个初级开发人员意外地对代码做了一个根本上有威胁的改变，而没有得到适当的审查，怎么办？(是的，白痴有时和坏的意图一样危险！)重点是，***DO*通过为最坏的情况做准备和加固你所有的系统来预测意外。

**如果你需要采取额外的预防措施，请使用`v-pre`指令。

### vue-i18n
Vue的准官方国际化包(Internationali(s/z)ation)允许你在key的值中存储html，并[有可能渲染它们](https://kazupon.github.io/vue-i18n/guide/formatting.html#html-formatting)。如果用户不能修改这些值，你应该是可以的--但要确保你信任(又称审查)译者 我们的建议(尽管它是更多的工作，并且会减慢HMR)是***使用[模板插值](https://kazupon.github.io/vue-i18n/guide/interpolation.html#basic-usage)。

### eval()
尽管你可能很想使用`eval()`，即使你知道你在做什么，但就是**不要**。

![Don't be eval()](https://cdn.quasar.dev/img/dont-be-eval.png "Don't be eval()" )

## Quasar组件
一些 Quasar 组件和插件可以被配置为允许渲染 "不安全的内容"。这是一个选择功能，通过使用`*-html`类型的布尔属性来执行。这些组件将在下面讨论。

### QSelect
如果你没有定制与菜单相关的作用域槽(即`option`作用域槽)，**DO**防止该组件在标签和子标签中渲染HTML(通过组件属性不启用它)。一般来说，这不是用户提供的数据。如果你要定制这个槽，你有责任自己做消毒处理。

### QChat & Emoji
QChatMessage "组件默认不以HTML形式显示内容。但你可以启用它(通过`*-html`属性)，在这种情况下，你应该对内容进行消毒。

::: tip
最近有一些漏洞(特别是针对旧的安卓和iOS设备)，某些表情符号和非标准UTF-8实际上触发了移动设备重启和启动屏幕循环。**DO*考虑在纯文本类型的输入字段中整合markdown解析的devland，并在传递给聊天对象之前在服务器端将其渲染成HTML。
:::

### 加载
许多开发者要求Loading插件能够显示HTML，所以默认启用了这个功能，但如果你担心，**DO**添加`sanitize: true`，你就删除了矢量。

### 通知
默认情况下，Notify插件能够显示HTML，但如果你设置了布尔属性`html: true`，那么你就有责任对其进行消毒。

### Dialog
默认情况下不能使用HTML样式的Dialog插件，但是如果你设置了布尔属性`html: true`，那么你就要负责对标题和信息进行消毒处理。

### QInput
任何能够让用户输入按键、从缓冲区粘贴或丢弃文件的字段都是一种安全风险。我们不会去讨论这个问题的细节，但只要记住，维护安全是你的责任。只有你能防止服务台的火灾!

### QEditor
这个组件允许用户实际创建HTML(甚至粘贴它)。如果你要保存这些内容并将其展示给其他用户，就需要在服务器端注意验证它。在这种情况下，***DO*将`<script></script>`和`<iframe></iframe>`剥离。你可以访问文档中的[v-html vs. double-moustache](/vue-components/editor#example--default-editor)示例，玩玩QEditor组件，看看这两种渲染方法会提供什么。QEditor没有`sanitize`标签。此外，如果你创建了自定义按钮，你有责任使它们安全。你已经被警告过了。

## 处理文件
那么，你是如何验证和处理一个文件的呢？好吧，虽然这有点超出了 "前端框架 "的范围，但我们知道你们中的许多人在阅读这篇文章时也会在服务器上存储用户创建的文件。如果你只是存储它们(而不是以任何方式处理它们)，**DO**通过检测[神奇数字](https://en.wikipedia.org/wiki/List_of_file_signatures)来验证该文件是适当的类型。**DO**考虑使用ClamAV来检查文件的已知病毒特征。

### 图像
如果你允许用户上传图片到你的服务器，你应该知道许多常用的模块只是检查文件的后缀。制作一个仅在表面上看起来是图像的图像是很容易的。**DO*通过检查魔法数字来验证文件是否是它所声称的那样，为此可以考虑使用[is-image](https://github.com/sindresorhus/image-type)。虽然你可以在浏览器中[用这个方法](https://medium.com/the-everyday-developer/detect-file-mime-type-using-magic-numbers-and-javascript-16bc513d4e1e)检查魔法数字，但另一种方法是让用户将图像加载到画布中，然后直接从画布中上传。[Vue-croppa](https://github.com/zhanziyang/vue-croppa)是很好的前端工具，可以做到这一点。

### 档案
用于目录穿越的档案解压攻击是一个真正的安全问题，如果不解压文件，几乎不可能发现。如果你可以不接受这种类型的媒体，那么就这样做。否则，在linux上**DO**使用卑微的`less`/`lesspipe`和`.lysfilter`，用你的自定义工作流程来预处理这些文件。

## 密码
**不要***保存明文密码，事实上--***不要***保存它们。**DO**保存安全的哈希值，并根据使用安全盐和适当算法的方案在内存中计算它们。**DO**限制密码的长度(包括最小和最大的字符数)，但要使其上限高到没有合法用户会打到。**DO**考虑一个高度安全的密码重设应用流程，并使用户能够根据自己的喜好进行配置。这是每个项目都有的过程，所以我们不能告诉你如何解决这个问题。尽管如此，这里有几个好的链接。

- [OWASP骗局表](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Choosing_and_Using_Security_Questions_Cheat_Sheet.md)
- [FIDO指南](https://fidoalliance.org/recommended-account-recovery-practices/)

## 密码学
- **不要**创建你自己的密码学解决方案
- **不要**以明文方式存储个人信息
- **不要**创建你自己的密码解决方案*(故意重复)*。
- **不要**忽视执行细节的任何方面
- **不要**创建你自己的密码解决方案*(故意重复)**。
- **不要**使用MD5或SHA1
- **不要**创建你的[自己的加密解决方案](https://about.unimelb.edu.au/newsroom/news/2019/march/researchers-find-trapdoor-in-swissvote-election-system)

阅读这个话题并正确选择工业强度的解决方案的一个好地方是[libsodium](https://download.libsodium.org/doc/)


## 分布

::: tip
如果有人想改变你的数据库或向服务器添加一些文件，而他们没有使用SSH密钥，那么***要验证***并对输入进行消毒。
:::

### 网络
- **不要**使用http
- **不要**在JWT中存储敏感数据
- **DO** 使用 https / wss
- **DO**手动审核你的证书
- **DO**验证用户
- **DO**记住JWT本身并不是加密的。
- **DO**使用JWE而不是JWT并使用AES256 CBC + HMAC SHA512
- **DO**加倍努力，执行完整的OWASP网络审计

### Cordova / Capacitor
- **不要**使用iframes
- **不要**为Android Gingerbread打包
- **DO**签署你所有的构建文件
- **DO**对所有的静态数据进行加密

[Cordova Docs Page](https://cordova.apache.org/docs/en/latest/guide/appdev/security/)详细介绍了 Cordova 的安全问题，虽然它似乎已经过时，但大部分信息仍然是正确的。

### Electron
Electron是一个非常特殊的情况，因为XSS和远程代码注入实际上可以导致最终用户(甚至是开发者)的设备完全被破坏。
- **不要**禁用 "网络安全"。
- **不要**启用远程代码执行
- **DO**阅读我们关于增强[ Electron 安全]的指南(/quasar-cli/developing-electron-apps/electron-security-concerns)。

### SSR
当你用SSR模式生成你的项目时，你会得到一个最小的Express服务器。你有责任加固你的环境以保护你的服务器和你的用户。为此，我们提供了一个重要的HEADERS集合，在你的项目进入生产阶段之前，你可以考虑并应选择性地激活这些HEADERS(见`src-ssr/index.js`)。重要的是要记住，HEADERS并不是无懈可击的，因为这取决于浏览器供应商是否尊重它们--例如，如果你的内容安全策略使用`sandbox`值，[Chrome会破坏PDF浏览](https://bugs.chromium.org/p/chromium/issues/detail?id=413851)。
- **不要**忘记设置限制性头文件
- **不要**认为仅靠头文件就能保护你免受所有攻击。
- **DO**阅读有关[头文件](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

## 环境安全
更加安全意味着要考虑到很多事情，你尊重的以下准则越多，攻击的足迹就越小。

![有效的SSL证书](https://cdn.quasar.dev/img/lets-encrypt.jpg "有效的SSL证书")

### 运营安全
审计你的开发系统如何工作。
- **不要**保留不需要的软件
- **DO**使用一个操作系统和发行版，其占用空间较小，并启用了安全功能(例如SELinux)。
- 确保你的机器上的所有软件都是最新的(尤其是NODE)。
- **DO**使用一个密码管理器
- **DO**在所有可能的地方使用2FA

审计你的生产环境如何运作。
- **不要**认为通过隐蔽性的安全会在你受到攻击时帮助你。
- **不要**留下不需要的端口
- **不要**假装容器或虚拟机的性质使你安全。
- **不要**停止偏执的态度
- **DO**关闭对你的服务器的密码和根权限
- **DO**使用安全传输协议(SSH、HTTPS、SFTP、WSS)。
- **DO**安装fail2ban和rkhunter
- **DO**定期分析你的日志
- **DO**在休息时对数据进行加密
- **DO**使用先进的媒体类型分析
- **DO**使用ClamAV来检测被感染的文件
- **DO**定期进行系统维护
- **DO**从允许/可用的类型中删除旧的密码器
- **DO**用CSP头来保护用户

### 组织和存储库安全

这是每一个团队都应该关注的问题，并进行一些思考。**考虑谁可以访问你的存储库，如何合并提交以及如何发布资产。这里有一些要记住的好东西。

- 不要把敏感数据放在你的源代码中。
- **不要**忽视`yarn审计`或`npm审计`报告
- **不要**盲目地依赖第三方服务
- **DO**要求在合并到主站之前进行审查
- **DO**要求审查者/代码提交者使用2FA。
- **DO**要求签名提交
- **DO**认真对待GitHub的安全警告
- **DO**进行深入的代码审查
- **DO**审查关键的第三方库，特别是任何与真实文件相关的库。
- **DO**关键库的引脚版本
- **DO**提交软件包锁定文件
- **DO**在你的".gitignore "中添加".env "文件

## 最后说明
安全不是心安理得，它是对知识的实际应用，需要保持警惕和意识。**不要**停止对安全的关注，**不要**认为你做的已经足够了。你可以做的事情总是很多，不断有新的漏洞需要注意。但是最大的安全威胁是懒惰，所以穿上你的外鞋，向后滚动页面并***阅读[关于XSS的OWASP链接](/security/dos-and-donts#user-input-and-the-dangers-of-v-html)。我们不会告诉任何人。
