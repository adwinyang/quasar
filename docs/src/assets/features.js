import menu from './menu.js'

function normalizeComps (list) {
  let acc = [
    {
      // name: 'Layout',
      name: '布局',
      path: 'layout'
    },
    {
      // name: 'Layout Header',
      name: '面局页眉',
      path: 'header-and-footer'
    },
    {
      // name: 'Layout Footer',
      name: '面局页脚',
      path: 'header-and-footer'
    },
    {
      // name: 'Layout Drawer',
      name: '布局抽屉',
      path: 'drawer'
    },
    {
      // name: 'Layout Page',
      name: '布局页面',
      path: 'page'
    },
    {
      // name: 'Page Sticky',
      name: '页面粘性',
      path: 'page-sticky'
    },
    {
      // name: 'Page Scroller',
      name: '页面滚动条',
      path: 'page-scroller'
    }
  ]

  list.forEach(entry => {
    if (entry.children) {
      acc = acc.concat(entry.children)
    }
    else {
      acc.push(entry)
    }
  })

  return acc.sort((a, b) => a.name.localeCompare(b.name))
}

export default {
  // comps: normalizeComps(menu.find(entry => entry.name === 'Vue Components').children),
  comps: normalizeComps(menu.find(entry => entry.name === 'Vue 组件').children),
  // dirs: menu.find(entry => entry.name === 'Vue Directives').children,
  dirs: menu.find(entry => entry.name === 'Vue 指令').children,
  // plugins: menu.find(entry => entry.name === 'Quasar Plugins').children
  plugins: menu.find(entry => entry.name === 'Quasar 插件').children
}
