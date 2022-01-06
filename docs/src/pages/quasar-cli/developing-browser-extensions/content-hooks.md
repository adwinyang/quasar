---
title: 内容钩子
desc: 如何在Quasar浏览器扩展模式下使用你的内容脚本与你的Quasar应用程序和后台脚本进行通信。
---

`src-bex/js/content-hooks.js`本质上是一个标准的[内容脚本](https://developer.chrome.com/extensions/content_scripts) ，我们欢迎你这样使用它。内容脚本能够访问底层网页的DOM，因此你能够操纵上述网页的内容。

这个文件的额外好处是这个功能。

```js
export default function attachContentHooks (bridge) {
}
```

这个函数通过Quasar BEX构建链自动调用，并注入一个桥梁，这个桥梁在你的Quasar App实例和BEX的后台脚本之间共享。

例如，假设我们想对Quasar App上的一个按钮作出反应，并在底层网页上突出显示一些文本，这将通过内容脚本来完成。

```js
// Quasar App, /src

setup () {
  const $q = useQuasar()

  function myButtonClickHandler () {
    $q.bex.send('highlight.content.event', { someData: 'someValue '}).then(r => {
      console.log('Text has been highlighted')
    })
  }

  return { myButtonClickHandler }
}
```

```css
/* src-bex/css/content-css.css */

.bex-highlight {
    background-color: red;
}
```

```js
// src-bex/js/content-hooks.js。

export default function attachContentHooks (bridge) {
  bridge.on('highlight.content.event', event => {
    // 找到一个.some-class元素并添加我们的高亮CSS类。
    const el = document.querySelector('.some-class')
    if (el !== null) {
      el.classList.add('bex-highlight')
    }

    // 不要求但解决我们的承诺。
    bridge.send(event.responseKey)
  })
}
```

内容脚本存在于一个[隔离的世界](https://developer.chrome.com/extensions/content_scripts#isolated_world) 中，允许内容脚本对其JavaScript环境进行修改，而不会与页面或其他内容脚本发生冲突。

隔离的世界不允许内容脚本、扩展和网页访问任何由其他人创建的变量或函数。这也使内容脚本有能力启用网页不应访问的功能。

这就是 `dom-hooks` 的作用。
