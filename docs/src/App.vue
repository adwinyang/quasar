<template>
  <router-view />
</template>

<script>
import { useMeta } from 'quasar'

import { provideDocStore } from 'assets/doc-store.js'
import getMeta from 'assets/get-meta.js'

export default {
  name: 'App',

  setup () {
    useMeta({
      title: 'Quasar 框架',
      titleTemplate: title => `${title} | Quasar 框架`,

      meta: getMeta(
        // 'Quasar Framework - Build high-performance VueJS user interfaces in record time',
        'Quasar Framework - 在创纪录的时间内构建高性能的 VueJS 用户界面',
        // 'Developer-oriented, front-end framework with VueJS components for best-in-class high-performance, responsive websites, PWA, SSR, Mobile and Desktop apps, all from the same codebase. Sensible people choose Vue. Productive people choose Quasar. Be both.'
        '面向开发人员的前端框架，带有 VueJS 组件，用于一流的高性能、响应式网站、PWA、SSR、移动和桌面应用程序，所有这些都来自同一个代码库。明智的人选择 Vue。有生产力的人选择 Quasar。两者兼而有之。'
      )
    })

    provideDocStore()
  }
}
</script>
