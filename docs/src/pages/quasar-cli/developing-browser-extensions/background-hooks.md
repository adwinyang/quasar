---
title: 背景钩子
desc: 如何使用后台脚本与浏览器扩展（BEX）的其他部分进行通信。
---

`src-bex/js/background-hooks.js` 本质上是一个标准的[后台脚本](https://developer.chrome.com/extensions/background_pages)，欢迎你使用它。后台脚本可以与在您的 BEX 下运行的 **所有** 网页、开发工具、选项和弹出窗口进行通信。

此文件的额外好处是此功能：

```js
export default function attachBackgroundHooks (bridge, activeConnections) {
}
```

这个函数通过 Quasar BEX 构建链自动调用，并注入一个BEX所有部分之间共享的桥，这意味着你可以与BEX的任何部分进行通信。

`bridge` 参数是用于通信的桥接器。 `activeConnections` 参数提供了通过桥接器注册的所有 BEX 连接的数组，即同一个 Quasar 应用程序使用的所有网页、选项、弹出窗口和开发工具 BEX。

例如，假设我们想监听在网页浏览器中打开的新标签，然后在我们的 Quasar 应用程序中对其作出反应。首先，我们需要监听新的标签页被打开，并发出一个新的事件来告诉 Quasar 应用程序这已经发生。

```js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  bridge.send('bex.tab.opened', { url: tab.url })
})
```

然后在我们的 Quasar 应用程序中，我们会在我们的一个组件生命周期钩子中监听这个，像这样：

```js
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    // 我们的函数，接收后台脚本发送的URL。
    function doOnTabOpened (url) {
      console.log('New Browser Tab Openend: ', url)
    }

    // 添加我们的听众
    $q.bex.on('bex.tab.opened', doOnTabOpened)

    // 不要忘了清理它
    onBeforeUnmount(() => {
      $q.bex.off('bex.tab.opened', doOnTabOpened)
    })

    return {}
  }
}
```

浏览器扩展后台脚本可做各种各样的事件--如果你想在这方面有所作为，请善于利用搜索引擎。

如果你想以某种方式修改底层的网页内容呢？这就是我们要使用`content-hooks.js`的地方。让我们在下一节看一下。
