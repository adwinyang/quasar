---
title: 内部装载
desc: QInnerLoading Vue组件允许你在一个组件内以局部覆盖的形式添加一个加载指标。
keys: QInnerLoading
related:
  - /vue-components/linear-progress
  - /vue-components/circular-progress
  - /vue-components/spinners
  - /vue-components/skeleton
  - /quasar-plugins/loading
  - /quasar-plugins/loading-bar
---

QInnerLoading组件允许你在一个组件中添加一个进度动画。与[加载插件](/quasar-plugins/loading)非常相似，它的目的是向用户提供视觉确认，即某些进程正在后台发生，而这需要过多的时间。QInnerLoading将在延迟的元素上添加一个不透明的覆盖层，同时还有一个[Spinner](/vue-components/spinners)。

## QInnerLoading API

<doc-api file="QInnerLoading" />

## 使用方法

::: warning
为了使旋转器正确地放置在你希望加载显示的元素的中心，该元素必须将CSS位置设置为`相对'(或声明`相对位置'CSS类)。
:::

::: warning
QInnerLoading必须是其父辈内部的最后一个元素，这样它才能出现在其他内容的上面。
:::

### 基本

<doc-example title="基本" file="QInnerLoading/Basic" />

### 标签 <q-badge align="top" color="brand-primary" label="v2.2+" />

你可以在使用默认槽时添加一个标签，但你也可以使用 "标签 "属性来代替。

<doc-example title="标签属性" file="QInnerLoading/LabelProp" />
