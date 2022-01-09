---
title: 下拉按钮
desc: QBtnDropdown Vue组件被用来在一个按钮上显示下拉内容。
keys: QBtnDropdown
related:
  - /vue-components/button
  - /vue-components/button-group
---
QBtnDropdown是一个非常方便的下拉按钮。它与[QList](/vue-components/list-and-list-items)作为下拉内容搭配得非常好，但它绝不仅限于此。

如果你想找一个下拉的 "输入 "而不是 "按钮"，可以用[Select](/vue-components/select)代替。

## QBtnDropdown API

<doc-api file="QBtnDropdown" />

## 使用方法

<doc-example title="基础" file="QBtnDropdown/Basic" />

<doc-example title="各种内容" file="QBtnDropdown/VariousContent" />

<doc-example title="分割" file="QBtnDropdown/Split" />

<doc-example title="自定义按钮" file="QBtnDropdown/CustomButton" />

<doc-example title="自定义下拉图标" file="QBtnDropdown/CustomDropdownIcon" />

<doc-example title="标签插槽" file="QBtnDropdown/LabelSlot" />

<doc-example title="使用v-model" file="QBtnDropdown/Model" />

<doc-example title="禁用" file="QBtnDropdown/Disable" />

下面的例子在UMD版本中不能工作(所以在Codepen/jsFiddle中也不能)，因为它依赖于Vue Router的存在。

<doc-example title="主界面上的分割和路由器链接" file="QBtnDropdown/Link" no-edit />
