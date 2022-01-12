---
title: BEX的类型
desc: 如何在 Quasar 中配置每种类型的浏览器扩展。
---

如前所述，Quasar可以处理浏览器扩展的各种位置，即新标签、网页、开发工具选项或弹出窗口。你不需要为每个地方单独安装 Quasar 应用程序。你可以用路由器做一些方便的工作。

## 新标签

这是一个BEX运行的默认方式。你可以通过点击浏览器中的BEX图标进入。Quasar应用程序将在这个新的(空白)标签中运行。

## 开发工具、选项和弹出窗口

这些都遵循相同的模式，设置一个路由并配置`manifest.json`文件，当它试图显示其中一个类型时，就会查看该路由。比如说。

```js
// routes.js。

const routes = [
  { path: '/options', component: () => import('pages/OptionsPage.vue') },
  { path: '/popup', component: () => import('pages/PopupPage.vue') },
  { path: '/devtools', component: () => import('pages/DevToolsPage.vue') }
]
```

你可以用以下方式配置你的`manifest.json`文件，这样选项页面就会从该路由加载。

```json
{
  "name": "My extension",
  ...
  "options_page": "www/index.html#/options", // Options Page
  ...
  "browser_action": {
    "default_popup": "www/index.html#/popup" // Popup Page
  },
  ...
  "devtools_page": "www/index.html#/devtools", // Dev Tools
}
```

## 网页

这就是真正的力量所在。通过一点小技巧，我们可以将 Quasar 应用程序注入到网页中，并将其作为一个覆盖层，使其看起来像我们的 Quasar 应用程序是网页体验的一部分。

下面是一个关于如何实现这一目标的简要介绍：

* `src-bex/js/content-hooks.js`。

这里的想法是创建一个IFrame并将我们的 Quasar 应用添加到其中，然后将其注入到页面中。

鉴于我们的 Quasar 应用程序可能需要占用窗口的全部高度(从而停止与底层页面的任何交互)，我们有一个事件来处理设置IFrame的高度。默认情况下，IFrame的高度刚好可以让 Quasar 工具条显示出来(反过来也允许与页面的其他部分互动)。

我们可以在任何时候从我们的 Quasar 应用程序中调用这个事件，我们知道我们正在打开抽屉，从而改变IFrame的高度，使整个绘图可见。

```js
const
  iFrame = document.createElement('iframe'),
  defaultFrameHeight = '62px'

/**
 * 设置包含BEX的iFrame的高度
 * @param height
 */
const setIFrameHeight = height => {
  iFrame.height = height
}

/**
 * 将iFrame重置为其默认高度，例如顶栏的高度。
 */
const resetIFrameHeight = () => {
  setIFrameHeight(defaultFrameHeight)
}

/**
 * 在iFrame中侦听来自BEX的消息的内容挂钩
 * @param bridge
 */
export default function attachContentHooks (bridge) {
  /**
   * 切换抽屉时，设置iFrame高度以占据整个页面。
   * 抽屉关闭时复位。
   */
  bridge.on('wb.drawer.toggle', event => {
    const payload = event.data
    if (payload.open) {
      setIFrameHeight('100%')
    } else {
      resetIFrameHeight()
    }
    bridge.send(event.eventResponseKey)
  })
}

/**
 * 下面的代码将使一切正常运行。使用默认值初始化iFrame并将其添加到页面中。
 * @type {string}
 */
iFrame.id = 'bex-app-iframe'
iFrame.width = '100%'
resetIFrameHeight()

// 指定一些造型，使其看起来天衣无缝
Object.assign(iFrame.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  border: '0',
  zIndex: '9999999', // Make sure it's on top
  overflow: 'visible'
})

;(function () {
  // 当页面加载时，插入我们的浏览器扩展应用。
  iFrame.src = chrome.runtime.getURL(`www/index.html`)
  document.body.prepend(iFrame)
})()
```

* `src-bex/css/content-css.css`。

在我们的文档顶部添加一个空白，这样我们的 Quasar 工具条就不会与实际的页面内容重叠了。

```css
.target-some-header-class {
  margin-top: 62px;
}
```

* `Quasar应用程序`

然后在我们的 Quasar 应用程序(/src)中，我们有一个函数来切换抽屉，并向内容脚本发送一个事件，告诉它
调整IFrame的大小，从而使我们的整个应用程序可见。

```html
<q-drawer :model-value="drawerIsOpen" @update:model-value="drawerToggled">
  Some Content
</q-drawer>
```

```js
import { useQuasar } from 'quasar'
import { ref } from 'vue'

setup () {
  const $q = useQuasar()
  const drawerIsOpen = ref(true)

  function drawerToggled () {
    $q.bex
      .send('wb.drawer.toggle', {
        open: drawerIsOpen.value // So it knows to make it bigger / smaller
      })
      .then(r => {
        // 只有在承诺解决后才设置这个，这样我们才能看到整个滑动动画。
        drawerIsOpen.value = !drawerIsOpen.value
      })
  }

  return { drawerToggled }
}
```

现在你有一个在网页中运行的 Quasar 应用程序。你现在可以从 Quasar 应用中触发其他事件，而内容
脚本可以监听并与底层页面互动。
