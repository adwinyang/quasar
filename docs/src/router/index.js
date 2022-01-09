/* global gtag */

import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

import routes from './routes'

/**
 * 如果不使用 SSR 模式构建，您可以
 *  直接导出 Router 实例化；
 *
 * 下面的函数也可以是异步的；要么使用
 * async/await 或返回一个解决的 Promise
 * 与 Router 实例。
*/

export default function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : createWebHistory

  const Router = createRouter({
    scrollBehavior: (to, _, savedPosition) => (
      to.hash.length > 1
        ? false
        : (savedPosition || { left: 0, top: 0 })
    ),
    routes,

    // 保持原样并在 quasar.conf.js 中进行更改！
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  process.env.CLIENT === true && Router.afterEach(to => {
    gtag('config', 'UA-6317975-6', {
      page_path: to.path
    })
  })

  return Router
}
