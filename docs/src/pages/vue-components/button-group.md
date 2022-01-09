---
title: 按钮组
desc: QBtnGroup Vue组件将QBtn和QBtnDropdown组合成一个单元。
keys: QBtnGroup
related:
  - /vue-components/button
  - /vue-components/button-dropdown
  - /vue-components/button-toggle
---

你可以使用QBtnGroup方便地将[QBtn](/vue-components/button)和[QBtnDropdown](/vue-components/button-dropdown)分组。请务必查看这些组件的各自页面，看看它们的属性和方法。


## QBtnGroup API

<doc-api file="QBtnGroup" />

## 使用方法
<doc-example title="例子" file="QBtnGroup/Group" />

::: warning
你必须在父QBtnGroup和子QBtn/QBtnDropdown上使用相同的设计属性(平面、轮廓、推动...)。
:::

<doc-example title="水平传播" file="QBtnGroup/GroupSpread" />

<doc-example title="使用QBtnDropdown" file="QBtnGroup/WithDropdown" />
