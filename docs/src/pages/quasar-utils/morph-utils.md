---
title: 形状的利用
desc: 使用 Quasar 的变形工具，将一个DOM元素变形为另一个DOM元素(带动画)，或在同一元素的两个状态之间进行变形。
keys: morph
related:
  - /vue-directives/morph
---

你可以使用 Quasar 的morph工具将一个DOM元素变形为另一个(有动画)，或者在同一个元素的两个状态之间变形。

可能也值得看看[Morph指令](/vue-directives/morph)，它使用这个工具，但使用起来更简单。

## 基本用法

```js
import { morph } from 'quasar'

// 将一个DOM元素变形为另一个。
const cancelMorph = morph({
  from: '#from-el',
  to: '#to-el'
})

// 调用cancelMorph()来取消变形。
```

该函数希望有一个强制性的对象参数，其键值如下。

| 名称 | 类型 | 默认值 | 说明 |
| from | DOM | - | (**必须的**) 一个DOM元素或CSS选择器，或者一个返回DOM元素的函数。
| to | DOM | - | 与 "from "相同；如果缺少 "to"，则假定其与 "from "相同。
| onToggle() | 函数 | - | 一个同步的切换函数，将在初始元素的状态被保存后立即执行。使用一个切换组件状态的函数，使目标元素变得可用。|
| waitFor | Number/'transitioned'/Promise | 0 | 一个数字，'transitionend'或一个Promise - 它将延迟动画开始的时间，直到目标元素发出'transitionend'事件，或直到承诺被解决(如果承诺被拒绝，变形将中止，但`toggle函数`已经被调用) |
| 持续时间 | 数字 | 300 | 动画的持续时间，以毫秒为单位。
| easing | String | 'ease-in-out' | 动画的时间函数(CSS缓和格式) |
| 延迟 | 数字 | 0 | 动画的延迟，以毫秒为单位。
| 填充 | String | 'none' | 动画的填充模式 |
| 样式 | 字符串/对象 | - | 当变形元素被动画化时，要应用到它的额外样式(可以是字符串或CSSStyleDeclaration对象)。
| 类 | 字符串 | - | 当变形元素被动画化时，额外的类将被应用到变形元素上(以字符串形式)。
| resize | Boolean | *false* | 强制调整大小，而不是默认的缩放变换。
| useCSS | Boolean | *false* | 强制使用CSS而不是动画API。
| hideFromClone | Boolean | *false* | 默认情况下，初始元素的克隆会被用来填补元素被移除后的空间--如果初始元素没有被移除，或者不希望初始元素占用的空间被调整大小，则设置此标志。
| keepToClone | Boolean | *false* | 默认情况下，最终的元素会从它的最终位置被移除，以实现动画效果 - 设置此标志，在最终位置保留一个副本
| 默认情况下，最终元素会从初始元素的位置和角度变形到最终元素的位置和角度 - 设置此标志，在初始元素和最终元素之间使用不透明的变形。
| tweenFromOpacity | Number | 0.6 | 如果使用**tween**，它是初始元素的初始不透明度(将被动画化为0)--初始元素被放置在目标元素之上。
| tweenToOpacity | Number | 0.5 | 如果使用**tween**，它是目标元素的初始不透明度(将被动画化为1)。
| onEnd(direction, aborted) | Function | - | 一个在变形完成后会被调用的函数，接收两个参数。"方向 "是一个字符串(如果变形在最终状态下完成，则为'to'，如果在初始状态下完成，则为'from')，"中止 "是一个布尔值(真表示动画被中止)。
## 变形的生命周期

1. 获取初始元素的方面和位置(如果提供了获取初始元素的函数，它将被调用)。

2. 计算初始元素的容器的大小和位置
3. 如果另一个变形使用了相同的元素，该变形将被中止。
4. 执行onToggle()函数(如果存在)。
5. 重新计算初始元素的容器的大小和位置，检查它们是否被改变了
6. 在下一个tick(允许Vue处理状态变化)中，最终元素将被识别(如果提供了一个函数用于获取最终元素，它将被调用)。
7. 如果另一个变形使用了相同的元素，该变形将被中止。
8. 计算最终元素的容器的大小和位置
9. 如果提供了**waitFor**，则等待该数量的 "transitionend "事件或直到承诺被解决(如果承诺被拒绝，则变形被中止)。
10. 重新计算最后一个元素的容器的大小和位置，以检查它们是否被改变。
11. 获取最终元素的方面和位置
12. 启动动画
关于cancel()函数(调用morph()的返回值)。

* 如果返回的`cancel`函数在步骤1到11之间被调用，那么变形将被中止(如果取消是在步骤4之后，`toggle函数`仍将被调用)，返回值将是**false**。
* 如果`cancel'函数在动画的开始和结束之间被调用，那么动画将被逆转，返回值将是**true**。
* 如果在动画结束后调用`cancel'函数，则不会发生任何事情，返回值将是**false**。
## 示例

<doc-example title="对同一元素进行变形" file="MorphUtils/SameElement" />

<doc-example title="从QFabAction变形一个QCard" file="MorphUtils/FabCard" />



<doc-example title="图像画廊" file="MorphUtils/ImageGallery" />

<doc-example title="水平图像条" file="MorphUtils/ImageStripHorizontal" />

<doc-example title="垂直图像条" file="MorphUtils/ImageStripVertical" />
