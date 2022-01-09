---
title: 标签页
desc: QTabs、QTab和QRouteTab Vue组件是一种帮助用户在页面或标签面板之间导航的方式。
keys: QTabs,QTab,QRouteTab
related:
  - /vue-components/tab-panels
  - /vue-components/button-toggle
  - /vue-components/icon
  - /vue-components/badge
---
标签是一种使用较少的窗口空间来显示更多信息的方式。本页通过QTabs、QTab和QRouteTab来描述标签选择部分。

这个组件的一个常见用例是在Layout的页眉/页脚。请参考[Layouts](/layout/layout)和[Header & Footer](/layout/header-and-footer#example--playing-with-qtabs)以获取参考。

::: tip
与[QTabPanels](/vue-components/tab-panels)一起使用非常好，这个组件严格指的是面板(标签内容)本身。
:::

## QTabs API

<doc-api file="QTabs" />

## QTab API

<doc-api file="QTab" />

## QRouteTab API

<doc-api file="QRouteTab" />

## 使用方法

::: tip TIPS
* 当QTabs的宽度长于容器的宽度时，可以水平滚动。相应地调整你的浏览器以看到这个动作。
* 在桌面上，你会看到两边的雪佛龙，可以点击。
* 在手机上，你可以用手指平移标签。
* 如果你想强制箭头在手机上可见，请使用`mobile-arrows`属性。
:::

::: warning
如果你不同时安装Vue Router，QRouteTab不会也不能与UMD版本一起工作。
:::

### 基础

<doc-example title="基础" file="QTabs/Basic" />

### 外部、内部和移动箭头上可见的

<doc-example title="移动箭头的外侧、内侧和可见性" file="QTabs/ArrowsModifiers" />

### 垂直方向

<doc-example title="垂直(使用QSplitter的例子)" file="QTabs/Vertical" />

### 密集的

<doc-example title="密集" file="QTabs/Dense" />

### 单独的颜色

<doc-example title="单个颜色" file="QTabs/IndividualColor" />

### 波纹

<doc-example title="无波纹和自定义波纹颜色" file="QTabs/Ripples" />

### 自定义指标

在下面的例子中，请注意最后两个QTabs：指标在顶部和没有指标。

<doc-example title="自定义指标" file="QTabs/CustomIndicator" />

### 标签通知

有多种方法来显示标签的通知：用QBadge，通过警报点或警报图标(可以是任何)。

<doc-example title="标签通知" file="QTabs/Notifying" />

### 对齐方式

QTabs是响应式的，当容器的宽度(不是窗口的宽度)大于配置的断点时，`align`属性(见下文)会被激活。为了演示的目的，下面的标签已经禁用了断点。

<doc-example title="对齐" file="QTabs/Alignment" />

在下面例子的第二个QTabs中，如果窗口宽度低于1024px，那么 "Movies "和 "Photos "标签将被一个 "More... "下拉菜单所取代。

### 有下拉菜单

<doc-example title="有下拉菜单" file="QTabs/Dropdown" />

### 在QToolbar上

注意我们需要指定`shrink`属性。默认情况下，QTabs试图扩展到所有可用的水平空间，但在这种情况下，我们把它作为QToolbar的一个子节点，所以我们不希望如此。

<doc-example title="QToolbar中的标签" file="QTabs/TabsInToolbar" />

### 动态更新

<doc-example title="动态标签" file="QTabs/DynamicTabs" />

### 与QTabsPanel一起

::: tip
QTabPanels也可以作为独立的使用。它们不依赖于QTabs的存在。而且，它们可以被放置在页面的任何地方，而不仅仅是靠近QTabs。
:::

<doc-example title="带有标签面板的标签" file="QTabs/TabsWithTabpanels" />

更多信息：[标签面板](/vue-components/tab-panels)。

## 连接到Vue Router
你可以通过`QRouteTab`组件将标签与Vue Router一起使用。
这个组件继承了QTab的一切，但是它也有`router-link`属性与之绑定。这些属性允许监听当前应用程序的路由，并在点击/触摸时触发一个路由。

```html
<q-tabs>
  <q-route-tab
    icon="mail"
    to="/mails"
    exact
  />
  <q-route-tab
    icon="alarm"
    to="/alarms"
    exact
  />
</q-tabs>
```

::: warning
QRouteTab变得 "活跃 "取决于你的应用程序的路线，而不是由于v-model。所以v-model的初始值或直接改变v-model不会同时改变你的应用程序的路线。
:::

### 处理自定义导航

```html
<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-tabs
        no-caps
        class="bg-orange text-white shadow-2"
      >
        <q-route-tab :to="{ query: { tab: '1' } }" exact replace label="Activate in 2s" @click="navDelay" />
        <q-route-tab :to="{ query: { tab: '2' } }" exact replace label="Do nothing" @click="navCancel" />
        <q-route-tab :to="{ query: { tab: '3' } }" exact replace label="Navigate to the second tab" @click="navRedirect" />
        <q-route-tab :to="{ query: { tab: '4' } }" exact replace label="Navigate immediatelly" @click="navPass" />
      </q-tabs>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navDelay (e, go) {
      e.preventDefault() // 我们取消默认导航

      // console.log('2s内触发导航')
      setTimeout(() => {
        // console.log('按照2s前的承诺进行导航')
        go()
      }, 2000)
    },

    navCancel (e) {
      e.preventDefault() // 我们取消默认导航
    },

    navRedirect (e, go) {
      e.preventDefault() // 我们取消默认导航
      go({ query: { tab: '2', noScroll: true } })
    },

    navPass () {}
  }
}
</script>
```
