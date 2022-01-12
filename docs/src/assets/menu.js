const gettingStarted = [
  {
    name: '选择 Quasar 风格',
    path: 'pick-quasar-flavour'
  },
  {
    name: 'Quasar 风格',
    opened: true,
    children: [
      {
        name: 'Quasar CLI',
        path: 'quasar-cli'
      },
      {
        name: 'UMD / 独立',
        path: 'umd'
      },
      {
        name: 'Vite 插件',
        badge: 'new',
        path: 'vite-plugin'
      },
      {
        name: 'Vue CLI 插件',
        path: 'vue-cli-plugin'
      }
    ]
  },
  {
    name: '如何使用 Vue',
    path: 'how-to-use-vue'
  },
  {
    name: '练习场',
    path: 'playground'
  },
  {
    name: '发行说明',
    path: 'release-notes'
  },
  {
    name: '路线图',
    path: 'roadmap'
  },
  {
    name: '升级指南',
    badge: 'new',
    path: 'upgrade-guide'
  },
  {
    name: 'VS code 配置',
    path: 'vs-code-configuration'
  }
]

const contributionGuide = [
  {
    name: '捐款指南',
    path: 'contribution-guide'
  },
  {
    name: '运行项目',
    path: 'running-projects'
  },
  {
    name: '开始一个新项目',
    path: 'new-project'
  },
  {
    name: '项目维护者的角色',
    path: 'project-maintainer'
  },
  {
    name: '承诺公约',
    path: 'commit-conventions'
  }
]

const options = [
  {
    name: '$q 对象',
    path: 'the-q-object'
  },
  {
    name: '应用程序图标',
    path: 'app-icons'
  },
  {
    name: '搜索引擎优化',
    path: 'seo'
  },
  {
    name: 'Quasar 语言包',
    path: 'quasar-language-packs'
  },
  {
    name: '应用程序国际化',
    path: 'app-internationalization'
  },
  {
    name: 'RTL支持',
    path: 'rtl-support'
  },
  {
    name: '安装图标库',
    path: 'installing-icon-libraries'
  },
  {
    name: 'Quasar 图标集',
    path: 'quasar-icon-sets'
  },
  {
    name: '平台检测',
    path: 'platform-detection'
  },
  {
    name: '屏幕插件',
    path: 'screen-plugin'
  },
  {
    name: '动画',
    path: 'animations'
  },
  {
    name: '过渡',
    path: 'transitions'
  }
]

const security = [
  {
    name: '该做什么和不该做什么',
    path: 'dos-and-donts'
  },
  {
    name: '报告一个漏洞',
    path: 'report-a-vulnerability'
  }
  // Re-enable when ready again
  // {
  //   name: 'Get help!',
  //   path: 'get-help'
  // }
]

const cli = [
  {
    name: '安装',
    path: 'installation'
  },
  {
    name: 'quasar.conf.js',
    path: 'quasar-conf-js'
  },
  {
    name: '浏览器兼容性',
    path: 'browser-compatibility'
  },
  {
    name: '支持 TypeScript',
    path: 'supporting-ts'
  },
  {
    name: '目录结构',
    path: 'directory-structure'
  },
  {
    name: '构建命令',
    path: 'build-commands'
  },
  {
    name: '命令列表',
    path: 'commands-list'
  },
  {
    name: 'CSS 预处理程序',
    path: 'css-preprocessors'
  },
  {
    name: '路由',
    path: 'routing'
  },
  {
    name: '延迟加载 - 代码拆分',
    path: 'lazy-loading'
  },
  {
    name: '处理静态资源',
    path: 'handling-assets'
  },
  {
    name: '启动文件',
    path: 'boot-files'
  },
  {
    name: '预取功能',
    path: 'prefetch-feature'
  },
  {
    name: 'API 代理',
    path: 'api-proxying'
  },
  {
    name: '处理 Webpack',
    path: 'handling-webpack'
  },
  {
    name: '处理 process.env',
    path: 'handling-process-env'
  },
  {
    name: 'Vuex 仓库',
    path: 'vuex-store'
  },
  {
    name: '代码检查(linter)',
    path: 'linter'
  },
  {
    name: '测试与审计',
    path: 'testing-and-auditing'
  },
  {
    name: '开发 SPA',
    path: 'developing-spa',
    children: [
      {
        name: '简介',
        path: 'introduction'
      },
      {
        name: '用于SPA的应用程序图标',
        path: 'app-icons-spa'
      },
      {
        name: '构建命令',
        path: 'build-commands'
      },
      {
        name: '部署',
        path: 'deploying'
      }
    ]
  },
  {
    name: '开发 SSR',
    path: 'developing-ssr',
    children: [
      {
        name: '简介',
        path: 'introduction'
      },
      {
        name: '编写通用代码',
        path: 'writing-universal-code'
      },
      {
        name: '升级指南',
        badge: 'new',
        path: 'ssr-upgrade-guide'
      },
      {
        name: '准备工作',
        path: 'preparation'
      },
      {
        name: '配置SSR',
        path: 'configuring-ssr'
      },
      {
        name: 'ssrContext',
        badge: 'update',
        path: 'ssr-context'
      },
      {
        name: 'SSR 中间件',
        badge: 'new',
        path: 'ssr-middleware'
      },
      {
        name: 'SSR 生产导出',
        badge: 'new',
        path: 'ssr-production-export'
      },
      {
        name: 'Vue SSR指令',
        badge: 'new',
        path: 'vue-ssr-directives'
      },
      {
        name: 'SSR 的应用程序图标',
        path: 'app-icons-ssr'
      },
      {
        name: '为 SSR 做 SEO',
        path: 'seo-for-ssr'
      },
      {
        name: '客户端激活',
        path: 'client-side-hydration'
      },
      {
        name: '处理404和500错误',
        path: 'handling-404-and-500-errors'
      },
      {
        name: '带PWA的SSR',
        path: 'ssr-with-pwa'
      },
      {
        name: 'SSR常见的问题',
        path: 'ssr-frequently-asked-questions'
      },
      {
        name: '构建命令',
        path: 'build-commands'
      },
      {
        name: '带类型的SSR',
        badge: 'new',
        path: 'ssr-with-typescript'
      },
      {
        name: '部署',
        path: 'deploying'
      }
    ]
  },
  {
    name: '开发PWA',
    path: 'developing-pwa',
    children: [
      {
        name: '简介',
        path: 'introduction'
      },
      {
        name: '准备工作',
        path: 'preparation'
      },
      {
        name: '构建命令',
        path: 'build-commands'
      },
      {
        name: '配置PWA',
        path: 'configuring-pwa'
      },
      {
        name: 'PWA的HMR',
        path: 'hmr-for-dev'
      },
      {
        name: 'PWA的应用程序图标',
        path: 'app-icons-pwa'
      },
      {
        name: '搬运服务人员',
        path: 'handling-service-worker'
      },
      {
        name: '使用Typescript的PWA',
        badge: 'new',
        path: 'pwa-with-typescript'
      }
    ]
  },
  {
    name: '开发移动应用程序',
    path: 'developing-mobile-apps'
  },
  {
    name: '开发 Capacitor 应用程序',
    path: 'developing-capacitor-apps',
    children: [
      {
        name: '简介',
        path: 'introduction'
      },
      {
        name: '准备工作',
        path: 'preparation'
      },
      {
        name: ' Capacitor 版本',
        badge: 'new',
        path: 'capacitor-version-support'
      },
      {
        name: '配置 Capacitor ',
        path: 'configuring-capacitor'
      },
      {
        name: ' Capacitor 的应用程序图标',
        path: 'app-icons-capacitor'
      },
      {
        name: ' Capacitor API',
        path: 'capacitor-api'
      },
      {
        name: '构建命令',
        path: 'build-commands'
      },
      {
        name: '故障排除和提示',
        path: 'troubleshooting-and-tips'
      },
      {
        name: '管理 Google Analytics',
        path: 'managing-google-analytics'
      },
      {
        name: '发布到商店',
        path: 'publishing-to-store'
      }
    ]
  },
  {
    name: '开发 Cordova 应用程序',
    path: 'developing-cordova-apps',
    children: [
      {
        name: '简介',
        path: 'introduction'
      },
      {
        name: '准备工作',
        path: 'preparation'
      },
      {
        name: '配置Cordova',
        path: 'configuring-cordova'
      },
      {
        name: 'Cordova 的应用程序图标',
        path: 'app-icons-cordova'
      },
      {
        name: 'Cordova 插件',
        path: 'cordova-plugins'
      },
      {
        name: '构建命令',
        path: 'build-commands'
      },
      {
        name: '故障排除和提示',
        path: 'troubleshooting-and-tips'
      },
      {
        name: '管理 Google Analytics',
        path: 'managing-google-analytics'
      },
      {
        name: '发布到商店',
        path: 'publishing-to-store'
      }
    ]
  },
  {
    name: '开发 Electron 应用程序',
    path: 'developing-electron-apps',
    children: [
      {
        name: '简介',
        path: 'introduction'
      },
      {
        name: '升级指南',
        path: 'electron-upgrade-guide',
        badge: 'new'
      },
      {
        name: '准备工作',
        path: 'preparation'
      },
      {
        name: '配置电子',
        path: 'configuring-electron'
      },
      {
        name: 'Electron 应用图标',
        path: 'app-icons-electron'
      },
      {
        name: '构建命令',
        path: 'build-commands'
      },
      {
        name: '预加载脚本',
        path: 'electron-preload-script'
      },
      {
        name: 'Electron 包',
        path: 'electron-packages'
      },
      {
        name: '访问文件',
        path: 'electron-accessing-files'
      },
      {
        name: '无框 Electron 窗',
        path: 'frameless-electron-window'
      },
      {
        name: '带 Typescript 的 Electron',
        badge: 'new',
        path: 'electron-with-typescript'
      },
      {
        name: 'Electron 安全问题',
        path: 'electron-security-concerns'
      },
      {
        name: '故障排除和提示',
        path: 'troubleshooting-and-tips'
      }
    ]
  },
  {
    name: '开发浏览器扩展',
    path: 'developing-browser-extensions',
    children: [
      {
        name: '简介',
        path: 'introduction'
      },
      {
        name: '准备工作',
        path: 'preparation'
      },
      {
        name: '配置BEX',
        path: 'configuring-bex'
      },
      {
        name: 'BEX的应用程序图标',
        path: 'app-icons-browser-extension'
      },
      {
        name: '构建命令',
        path: 'build-commands'
      },
      {
        name: 'BEX的类型',
        path: 'types-of-bex'
      },
      {
        name: 'BEX交流/活动',
        path: 'bex-communication'
      },
      {
        name: '背景钩子',
        path: 'background-hooks'
      },
      {
        name: '内容钩子',
        path: 'content-hooks'
      },
      {
        name: 'DOM 钩子',
        path: 'dom-hooks'
      }
    ]
  },
  {
    name: 'Ajax 请求',
    path: 'ajax-requests'
  },
  {
    name: '向公众开放开发服务器',
    path: 'opening-dev-server-to-public'
  }
]

const icongenie = [
  {
    name: '简介',
    path: 'introduction'
  },

  {
    name: '安装/升级说明',
    path: 'installation'
  },

  {
    name: '命令列表',
    path: 'command-list'
  },

  {
    name: '应用程序图标列表',
    path: 'app-icons-list'
  },

  {
    name: '简介文件',
    path: 'profile-files'
  }
]

const style = [
  {
    name: '排版学',
    path: 'typography'
  },
  {
    name: '色调',
    path: 'color-palette'
  },
  {
    name: '主题生成器',
    path: 'theme-builder'
  },
  {
    name: '黑暗模式',
    path: 'dark-mode'
  },
  {
    name: '间距类',
    path: 'spacing'
  },
  {
    name: '阴影',
    path: 'shadows'
  },
  {
    name: '断点',
    path: 'breakpoints'
  },
  {
    name: '主体类',
    path: 'body-classes'
  },
  {
    name: '可见性',
    path: 'visibility'
  },
  {
    name: '定位',
    path: 'positioning'
  },
  {
    name: 'Sass/SCSS变量',
    path: 'sass-scss-variables'
  },
  {
    name: '其他辅助帮类',
    path: 'other-helper-classes'
  }
]

const layout = [
  {
    name: '弹性网格',
    path: 'grid',
    opened: true,
    children: [
      {
        name: 'Flexbox 简介',
        path: 'introduction-to-flexbox'
      },
      {
        name: '网格行',
        path: 'row'
      },
      {
        name: '网格列',
        path: 'column'
      },
      {
        name: '网格间隔',
        path: 'gutter'
      },
      {
        name: 'Flexbox 模式',
        path: 'flexbox-patterns'
      },
      {
        name: 'Flex 练习场',
        path: 'flex-playground'
      }
    ]
  },
  {
    name: '布局',
    path: 'layout'
  },
  {
    name: '用布局和页面进行路由',
    path: 'routing-with-layouts-and-pages'
  },
  {
    name: '布局页眉和页脚',
    path: 'header-and-footer'
  },
  {
    name: '布局抽屉',
    path: 'drawer'
  },
  {
    name: '布局页面',
    path: 'page'
  },
  {
    name: '布局构建者',
    external: true,
    path: '/layout-builder'
  },
  {
    name: '布局图库',
    path: 'gallery'
  },
  {
    name: '页面粘性',
    path: 'page-sticky'
  },
  {
    name: '页面滚动条',
    path: 'page-scroller'
  }
]

const components = [
  {
    name: 'Ajax 状态栏',
    path: 'ajax-bar'
  },
  {
    name: '头像',
    path: 'avatar'
  },
  {
    name: '徽章',
    path: 'badge'
  },
  {
    name: '横幅',
    path: 'banner'
  },
  {
    name: '栏',
    path: 'bar'
  },
  {
    name: '面包屑',
    path: 'breadcrumbs'
  },
  {
    name: '按钮',
    listPath: 'buttons',
    children: [
      {
        name: '按钮',
        path: 'button'
      },
      {
        name: '按钮组',
        path: 'button-group'
      },
      {
        name: '按钮下拉',
        path: 'button-dropdown'
      }
    ]
  },
  {
    name: '卡片',
    path: 'card'
  },
  {
    name: '走马灯',
    path: 'carousel'
  },
  {
    name: '聊天信息',
    path: 'chat'
  },
  {
    name: '碎片',
    path: 'chip'
  },
  {
    name: '圆环进度条',
    path: 'circular-progress'
  },
  {
    name: '颜色选择器',
    path: 'color-picker'
  },
  {
    name: '对话框',
    path: 'dialog'
  },
  {
    name: '编辑器 - 所见即所得',
    path: 'editor'
  },
  {
    name: '扩展项',
    path: 'expansion-item'
  },
  {
    name: '浮动的操作按钮',
    path: 'floating-action-button'
  },
  {
    name: '表单组件',
    opened: true,
    listPath: 'form-components',
    children: [
      {
        name: '输入框',
        path: 'input'
      },
      {
        name: '选择框',
        path: 'select'
      },
      {
        name: '文件选取器',
        path: 'file-picker'
      },
      {
        name: '表单',
        path: 'form'
      },
      {
        name: '字段(包装器)',
        path: 'field'
      },
      {
        name: '单选框',
        path: 'radio'
      },
      {
        name: '复选框',
        path: 'checkbox'
      },
      {
        name: '切换开关',
        path: 'toggle'
      },
      {
        name: '按钮切换',
        path: 'button-toggle'
      },
      {
        name: '选项组',
        path: 'option-group'
      },
      {
        name: '滑块',
        path: 'slider'
      },
      {
        name: '范围',
        path: 'range'
      },
      {
        name: '时间选择器',
        path: 'time'
      },
      {
        name: '日期选择器',
        path: 'date'
      }
    ]
  },
  {
    name: '图标',
    path: 'icon'
  },
  {
    name: '印象',
    path: 'img'
  },
  {
    name: '无限滚动',
    path: 'infinite-scroll'
  },
  {
    name: '内部加载',
    path: 'inner-loading'
  },
  {
    name: '交叉点',
    path: 'intersection'
  },
  {
    name: '旋钮',
    path: 'knob'
  },
  {
    name: '线性进度条',
    path: 'linear-progress'
  },
  {
    name: '列表和列表项',
    path: 'list-and-list-items'
  },
  {
    name: '标记表格',
    path: 'markup-table'
  },
  {
    name: '菜单',
    path: 'menu'
  },
  {
    name: '无 SSR',
    path: 'no-ssr'
  },
  {
    name: '监听器(观察者)',
    listPath: 'observers',
    children: [
      {
        name: '调整大小监听器(针对元素)',
        path: 'resize-observer'
      },
      {
        name: '滚动监听器',
        path: 'scroll-observer'
      }
    ]
  },
  {
    name: '分页',
    path: 'pagination'
  },
  {
    name: '视差',
    path: 'parallax'
  },
  {
    name: '弹出式编辑',
    path: 'popup-edit'
  },
  {
    name: '弹出代理',
    path: 'popup-proxy'
  },
  {
    name: '下拉刷新',
    path: 'pull-to-refresh'
  },
  {
    name: '评价',
    path: 'rating'
  },
  {
    name: '反应式',
    path: 'responsive'
  },
  {
    name: '滚动区域',
    path: 'scroll-area'
  },
  {
    name: '分割线',
    path: 'separator'
  },
  {
    name: '骨架屏',
    path: 'skeleton'
  },
  {
    name: '滑动项',
    path: 'slide-item'
  },
  {
    name: '滑动过渡',
    path: 'slide-transition'
  },
  {
    name: '间距',
    path: 'space'
  },
  {
    name: '旋转器',
    path: 'spinners'
  },
  {
    name: '分割容器',
    path: 'splitter'
  },
  {
    name: '步骤条',
    path: 'stepper'
  },
  {
    name: '表格',
    path: 'table'
  },
  {
    name: '标签',
    path: 'tabs'
  },
  {
    name: '标签面板',
    path: 'tab-panels'
  },
  {
    name: '时间轴',
    path: 'timeline'
  },
  {
    name: '工具栏',
    path: 'toolbar'
  },
  {
    name: '工具提示',
    path: 'tooltip'
  },
  {
    name: '树形控件',
    path: 'tree'
  },
  {
    name: '上传器',
    path: 'uploader'
  },
  {
    name: '视频',
    path: 'video'
  },
  {
    name: '虚拟滚动',
    path: 'virtual-scroll'
  }
]

const directives = [
  {
    name: '关闭弹出窗口',
    path: 'close-popup'
  },
  {
    name: '交叉点',
    path: 'intersection'
  },
  {
    name: '材料波纹',
    path: 'material-ripple'
  },
  {
    name: '突变',
    path: 'mutation'
  },
  {
    name: '变形',
    path: 'morph'
  },
  {
    name: '滚动',
    path: 'scroll'
  },
  {
    name: '滚动触发',
    path: 'scroll-fire'
  },
  {
    name: '触摸保持',
    path: 'touch-hold'
  },
  {
    name: '触摸平移',
    path: 'touch-pan'
  },
  {
    name: '触摸重复',
    path: 'touch-repeat'
  },
  {
    name: '触摸轻扫',
    path: 'touch-swipe'
  }
]

const plugins = [
  {
    name: '地址栏颜色',
    path: 'addressbar-color'
  },
  {
    name: '应用程序全屏',
    path: 'app-fullscreen'
  },
  {
    name: '应用程序的可见性',
    path: 'app-visibility'
  },
  {
    name: '底部工作表',
    path: 'bottom-sheet'
  },
  {
    name: 'Cookies',
    path: 'cookies'
  },
  {
    name: '黑暗',
    path: 'dark'
  },
  {
    name: '对话框',
    path: 'dialog'
  },
  {
    name: '加载',
    path: 'loading'
  },
  {
    name: '装载条',
    path: 'loading-bar'
  },
  {
    name: '本地/会话存储',
    path: 'web-storage'
  },
  {
    name: 'Meta',
    path: 'meta'
  },
  {
    name: '通知',
    path: 'notify'
  }
]

const composables = [
  {
    name: 'useQuasar',
    path: 'use-quasar'
  },
  {
    name: 'useDialogPluginComponent',
    path: 'use-dialog-plugin-component'
  },
  {
    name: 'useFormChild',
    path: 'use-form-child'
  },
  {
    name: 'useMeta',
    path: 'use-meta'
  }
]

const appExtensions = [
  {
    name: '简介',
    path: 'introduction'
  },
  {
    name: '发现应用扩展',
    path: 'discover'
  },
  {
    name: '开发指南',
    path: 'development-guide',
    opened: true,
    children: [
      {
        name: '简介',
        path: 'introduction'
      },
      {
        name: '提示 API',
        path: 'prompts-api'
      },
      {
        name: '安装 API',
        path: 'install-api'
      },
      {
        name: '索引 API',
        path: 'index-api'
      },
      {
        name: '卸载 API',
        path: 'uninstall-api'
      }
    ]
  },
  {
    name: '技巧和窍门',
    path: 'tips-and-tricks',
    opened: true,
    children: [
      {
        name: '简介',
        path: 'introduction'
      },
      {
        name: '提供一个UI组件',
        path: 'provide-a-ui-component'
      },
      {
        name: '提供一个指令',
        path: 'provide-a-directive'
      },
      {
        name: '注入Quasar插件',
        path: 'inject-quasar-plugin'
      },
      {
        name: '相当于入门套件',
        path: 'starter-kit-equivalent'
      },
      {
        name: 'Webpack 链',
        path: 'chain-webpack'
      }
    ]
  }
]

const utils = [
  {
    name: '日期工具',
    path: 'date-utils'
  },
  {
    name: '颜色工具',
    path: 'color-utils'
  },
  {
    name: 'DOM工具',
    path: 'dom-utils'
  },
  {
    name: '变形工具',
    path: 'morph-utils'
  },
  {
    name: '格式化工具',
    path: 'formatter-utils'
  },
  {
    name: '滚动工具',
    path: 'scrolling-utils'
  },
  {
    name: '其他工具',
    path: 'other-utils'
  }
]

module.exports = [
  {
    name: '为什么是 Quasar？',
    icon: 'room',
    path: 'introduction-to-quasar'
  },
  {
    name: '赞助商和支持者',
    icon: 'favorite',
    path: 'sponsors-and-backers'
  },
  {
    name: '为什么捐款很重要',
    icon: 'assignment_late',
    path: 'why-donate'
  },
  {
    name: 'API 浏览器',
    icon: 'travel_explore',
    path: 'api-explorer'
  },
  {
    name: '视频教程',
    icon: 'ondemand_video',
    path: 'video-tutorials'
  },
  {
    name: '认识我们的团队',
    icon: 'people',
    path: 'meet-the-team'
  },
  {
    name: '入门',
    icon: 'flight_takeoff',
    path: 'start',
    children: gettingStarted
  },
  {
    name: '捐款指南',
    icon: 'code',
    path: 'contribution-guide',
    children: contributionGuide
  },
  {
    name: '选项和帮助者',
    icon: 'tune',
    path: 'options',
    children: options
  },
  {
    name: '风格与身份',
    icon: 'style',
    path: 'style',
    children: style
  },
  {
    name: '布局和网格',
    icon: 'view_quilt',
    path: 'layout',
    children: layout
  },
  {
    name: 'Vue 组件',
    icon: 'widgets',
    path: 'vue-components',
    children: components
  },
  {
    name: 'Vue 指令',
    icon: 'swap_calls',
    path: 'vue-directives',
    children: directives
  },
  {
    name: 'Quasar 插件',
    icon: 'extension',
    path: 'quasar-plugins',
    children: plugins
  },
  {
    name: 'Vue 可组合性',
    icon: 'developer_mode',
    path: 'vue-composables',
    children: composables
  },
  {
    name: '安全问题',
    icon: 'security',
    path: 'security',
    children: security
  },
  {
    name: 'Quasar CLI',
    icon: 'build',
    path: 'quasar-cli',
    children: cli
  },
  {
    name: 'Genie CLI Icon',
    icon: 'stars',
    path: 'icongenie',
    children: icongenie
  },
  {
    name: '应用程序扩展',
    icon: 'note_add',
    path: 'app-extensions',
    children: appExtensions
  },
  {
    name: 'Quasar 工具',
    icon: 'healing',
    path: 'quasar-utils',
    children: utils
  }
]
