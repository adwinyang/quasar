---
title: 虚拟卷轴
desc: 当用户在容器中滚动时，QVirtualScroll组件会渲染一个大的项目列表，保持DOM树的清洁，并尽可能地占用最少的内存量。
keys: QVirtualScroll
related:
  - /vue-components/select
  - /vue-components/infinite-scroll
---

QVirtualScroll组件允许你只显示一长串项目的一部分，并在用户在容器中滚动时更新可见项目。这有几个好处：只有可见的项目被渲染，所以在任何给定的时间点，DOM树中的节点数量最少，内存使用也保持在最低水平。

目前有两种类型的QVirtualScroll。"列表"(使用QItems)和 "表格"(使用表格风格来显示数据行)。

## QVirtualScroll API

<doc-api file="QVirtualScroll" />

## 使用方法

::: tip
* (Composition API) 为了在使用大型列表时获得最佳性能，不要用ref()/computed()/reactive()/etc.包裹你在`items`属性中传递的数组。这允许Vue跳过使列表对变化做出 "响应"。
* (Options API) 为了在使用大型列表时获得最佳性能，可以使用`Object.freeze(items)`来冻结你在`items`属性中传递的数组。这允许Vue跳过使列表对变化做出 "响应"。
* 将被渲染的项目数量将根据`virtual-scroll-item-size`属性和可滚动区域的大小来计算，但你可以使用`virtual-scroll-slice-size`属性来适应你的需求。
* 使用`virtual-scroll-item-size`来指定元素的大小(高度的像素，如果是水平的，则是宽度)。当一个元素在屏幕上被渲染后，它的尺寸会自动更新，但如果你指定一个接近真实尺寸的元素尺寸，你会得到一个更好的滚动位置的初始指示。不管你是否会使用这个属性，QVirtualScroll仍然可以工作，但如果没有它，你可能会遇到连续滚动时滚动条不跟随鼠标抓取位置的情况(在桌面上)，或者在移动端连续滚动时，容器的实际滚动会稍微偏离一到两个元素。
:::

::: warning
每个浏览器都有一个滚动容器的最大高度。在IE11中，这个高度大约是100万像素，而在其他浏览器中，这个高度要大得多，但仍然有限。
:::

滚动下面的示例来看看QVirtualScroll的操作。

### 基本

<doc-example title="基本" file="QVirtualScroll/Basic" />

### 横向

<doc-example title="水平" file="QVirtualScroll/BasicHorizontal" /> ## 不同的模板。

### 不同的模板

<doc-example title="项目的不同模板" file="QVirtualScroll/VariousContent" /> ### 不同的模板

<doc-example title="水平项目的不同模板" file="QVirtualScroll/VariousContentHorizontal" /> ##不同的模板

### 表格类型

注意`type="table"`属性。

<doc-example title="基本表格" file="QVirtualScroll/TableBasic" />


带有随内容一起滚动的标题(不停留在原地)。

<doc-example title="带有滚动页眉/页脚的表格" file="QVirtualScroll/TableBasicHeader" />

注意(在下面的示例中)使表头和表脚 "粘 "起来所需的CSS。还要注意定义页眉和页脚内容的附加范围槽。

<doc-example title="粘性表头" file="QVirtualScroll/TableSticky" />

下面是一个更复杂的示例，玩的是粘性页眉和页脚。

<doc-example title="使用粘性标题" file="QVirtualScroll/TableSticky2" />

### 滚动目标

如果你需要指定滚动目标(因为自动检测的目标不是你想要的)，请将一个CSS选择器(作为字符串)或DOM元素传递给`scroll-target`属性。

如果你需要使用整个页面的虚拟列表作为滚动元素，请设置`scroll-target="body"`。

::: warning
* 如果你用`scroll-target`属性传递一个自定义的滚动目标容器，你必须确保该元素的存在，并且它可以被溢出(它必须有一个最大高度和一个允许滚动的溢出)。
* 如果滚动目标容器不能被溢出，你会得到整个列表的渲染。
:::

::: danger
如果你想为`scroll-target'使用Vue引用，请注意在安装组件后设置它，就像下面的示例。
:::

<doc-example title="按id自定义滚动目标" file="QVirtualScroll/ScrollTargetId" />

<doc-example title="通过ref自定义滚动目标" file="QVirtualScroll/ScrollTargetRef" />

<doc-example title="使用QScrollArea" file="QVirtualScroll/ScrollArea" />

### 滚动到位置

<doc-example title="滚动到位置" file="QVirtualScroll/ScrollTo" /> ###滚动到位置？

### 同步和异步

你也可以通过使用`items-fn`属性来生成要在列表上显示的项目。

::: warning
请确保使用一个同步函数来返回要显示的项目列表。
:::

如果你需要异步数据，请使用一个能检索和渲染数据的组件。

<doc-example title="实时生成项目" file="QVirtualScroll/GenerateItems" />

### 实用类

有两个CSS类，你可以使用(如果你需要的话)来控制VirtualScroll的大小计算。
* 在VirtualScroll渲染的元素上使用`q-virtual-scroll--with-prev`类，表示该元素应与前一个元素分组(主要用例是由同一行数据生成的多个表格行)。
* 在VirtualScroll渲染的元素上使用`q-virtual-scroll--skip`类，以表示在计算大小时应忽略该元素的大小。

<doc-example title="一个数据行有多行的虚拟卷轴" file="QTable/VirtscrollMultipleRows" />

<doc-example title="带有扩展模型的虚拟卷轴" file="QTable/VirtscrollExpandedRow" />
