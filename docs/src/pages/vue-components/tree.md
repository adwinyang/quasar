---
title: 树木
desc: QTree是一个高度可配置的Vue组件，它可以显示分层数据，如树状结构的目录。
keys: QTree
---
Quasar Tree代表了一个高度可配置的组件，可以显示分层数据，如树状结构的目录。

## QTree API

<doc-api file="QTree" />

## 使用方法

### 基本

<doc-example title="基本" file="QTree/Basic" />

### 没有连接线

<doc-example title="无连接线" file="QTree/NoConnectors" /> ###无连接线

### 密集的 <q-badge align="top" color="brand-primary" label="v2.2.4+"

<doc-example title="密集型" file="QTree/DenseTree" /> ###暗黑型

### 黑暗

<doc-example title="黑暗" file="QTree/Dark" dark /> ###黑暗

### 综合实例

<doc-example title="使用QSplitter和QTabPanels" file="QTree/Splitter" /> ###集成实例

更多信息。[QSplitter](/vue-components/splitter), [QTabPanels](/vue-components/tab-panels)。

### 自定义内容

注意(在下面的示例中)默认的标题和正文槽的定制。

<doc-example title="默认的页眉和页身槽" file="QTree/SlotsDefault" />

注意(在下面的示例中)自定义的页眉和正文槽。

<doc-example title="自定义节点" file="QTree/SlotsCustomized" />

::: warning
在自定义页眉上点击或按下 "空格 "或 "ENTER "会选择树状项目(而自定义页眉会被模糊)。

如果你不希望发生这种情况，只需将自定义页眉的内容包裹在`<div @click.stop @keypress.stop>`中(或将监听器添加到各自的组件/元素中，以发出它们)。
:::

### 手风琴，过滤和可选择的

在下面的示例中，当一个节点被展开时，同级节点会被收缩。

<doc-example title="Accordion模式" file="QTree/Accordion" />

<doc-example title="过滤节点" file="QTree/FilterDefault" />

<doc-example title="可选择的节点" file="QTree/Selectable" />

### 懒惰的加载

<doc-example title="懒惰加载节点" file="QTree/LazyLoad" /> ### 懒惰加载？

### 选择与勾选、扩展

* 选择(通过QTree `selected`属性)指的是当前选择的节点(会以不同的背景突出显示)。
* 勾选(通过QTree `ticked`属性)指的是与每个节点相关的复选框。
* 扩展(通过QTree `expanded`属性)指的是被扩展的节点。

以上所有的属性都需要使用`v-model:<prop_name>`指令来动态绑定，以便它们能够正确工作(例如：`v-model:expanded`)。

<doc-example title="同步节点属性" file="QTree/Sync" />

### 勾选策略

有三种勾选策略：'leaf'、'leaf-filtered'、'strict'，还有一个额外的(也是默认的)'none'，它禁止勾选。

| 策略 | 描述 |
| 叶子 | 勾选的节点只是叶子。勾选一个节点也会影响父节点的勾选状态(父节点变成部分勾选或勾选)，以及它的子节点(所有可勾选的子节点都变成勾选)。|
| 叶子-过滤 | 与 "叶子 "的概念相同，只是这个策略只适用于过滤的节点(过滤后仍然可见的节点)。|
| strict | 勾选的节点与父节点或子节点的勾选状态无关。|
你可以为QTree应用一个全局的勾选策略，并通过在`nodes'模型中指定`tickStrategy'来局部改变某个节点的勾选策略。

<doc-example title="滴答策略" file="QTree/TickStrategy" />

### 自定义过滤方法

你可以通过指定`过滤方法'属性来定制过滤方法。下面的方法通过输入来过滤，如果它也有'(*)'。
<doc-example title="自定义过滤器" file="QTree/FilterCustom" />

### 节点模型结构

下面描述了QTree的v-model所考虑的节点的属性。
| 节点属性|类型|不存在时的行为|描述|

| |<nodeKey\> | String, Number | 会产生一个错误 | 节点的键。从`nodeKey`属性中指定的键中挑选。|
| label | String | 该项目没有标签 | 节点的标签。当`labelKey`属性被设置时，标签将从该键中提取。|
| icon | String | 使用默认的图标 | 节点的图标。|
| iconColor | String | 继承的颜色被使用 | 节点的图标颜色。从Quasar调色板中选择一个。|
| img | String | 不显示图片 | 节点的图片。使用/public文件夹。例如：'mountain.png' | |
| avatar | String | 不显示头像 | 节点的头像。使用/public文件夹。示例: 'boy-avatar.png' | 子女 | 数组
| children | Array | 此节点没有子节点 | 子节点的数组。|
| disabled | Boolean | 该节点已启用 | 节点是否禁用？|
| 可扩展 | 布尔值 | 该节点可扩展 | 该节点是否可扩展？|
| 可选择 | 布尔值 | 节点可选择 | 节点是否可选择？|
| 处理程序 | 不调用额外的函数 | 点击节点时应调用的自定义函数。接收`node`作为参数。|
| 当使用勾选策略时，每个节点都显示一个复选框。一个节点的复选框应该被禁用吗？|
| noTick | Boolean | 节点显示复选框 | 当使用勾选策略时，节点应该显示复选框吗？|
| tickStrategy | String | 使用'none'的打钩策略 | 只为这个节点覆盖全局打钩策略。是'leaf', 'leaf-filtered', 'strict', 'none'中的一个。|
| lazy | Boolean | 子节点没有被懒惰地加载 | 子节点应该被懒惰地加载吗？在这种情况下，也不要指定'children'属性。|
| header | String | 使用'default-header'插槽 | 节点头范围内的插槽名称，没有必要的'header-' 前缀。例如：'story'指的是'header-story'范围内的槽。|
| 槽位 "default-body "是节点的主体槽位名称，没有必要的 "body-"前缀。例如：'story'指的是'body-story'范围内的槽。|


