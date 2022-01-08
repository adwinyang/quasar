---
title: DOM 钩子
desc: 如何在 Quasar 浏览器扩展模式下使用dom钩子与底层网页通信。
---

`src-bex/js/dom-hooks.js`是一个javascript文件，它被 Quasar 自动注入到底层网页中，但与所有其他钩子文件一样，可以通过访问桥接。

```js
export default function attachDomHooks (bridge) {
}
```

如果你发现自己需要将一个JS文件注入到你的底层网页中，你可以使用dom钩子来代替，因为这意味着你可以在BEX中保持这种通信链。

例如，假设你想写一个BEX来检测一个 Quasar 应用程序是否在页面上运行，唯一的方法就是在网页的上下文中运行一些javascript。

```js
// detect-quasar.js:

function initQuasar (bridge, quasarInstance) {
  bridge.send('quasar.detect', {
    version: quasarInstance.version,
    dark: {
      isActive: quasarInstance.dark ? quasarInstance.dark.isActive : void 0
    },
    umd: quasarInstance.umd,
    iconSet: {
      name: quasarInstance.iconSet.name,
      __installed: quasarInstance.iconSet.__installed
    },
    lang: {
      rtl: quasarInstance.lang.rtl
    }
  })
  window.__QUASAR_DEVTOOLS__ = {
    Quasar: quasarInstance
  }
}

export default function detectQuasar (bridge) {
  if (window. Quasar ) { // UMD
    initQuasar(bridge, {
      version: window.Quasar.version,
      dark: window.Quasar.Dark,
      ...window. Quasar ,
      umd: true
    })
  }
  else { // CLI
    let isVue3 = false
    setTimeout(() => {
      const all = document.querySelectorAll('*')
      let el
      for (let i = 0; i < all.length; i++) {
        if (all[i].__vue__ || all[i].__vue_app__) {
          el = all[i]
          isVue3 = all[i].__vue_app__ !== void 0
          break
        }
      }

      if (el) {
        const Vue = isVue3 ? el.__vue_app__ : Object.getPrototypeOf(el.__vue__).constructor

        const quasar = isVue3 ? Vue.config.globalProperties.$q : Vue.prototype.$q
        if (quasar) {
          initQuasar(bridge, quasar, Vue)
        }
      }
    }, 100)
  }
}
```

```js
// dom-hooks.js:

import detectQuasar from './dom/detect-quasar'
export default function attachDomHooks (bridge) {
  detectQuasar(bridge)
}
```

上面的桥接器将通知BEX中的所有监听器，Quasar已经被找到，并同时发送实例信息。
