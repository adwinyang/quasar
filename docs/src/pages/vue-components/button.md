---
title: 钮扣
desc: QBtn Vue组件是一个具有塑形、加载状态、波纹等功能的按钮。
keys: QBtn
related:
  - /vue-components/button-group
  - /vue-components/button-dropdown
  - /vue-components/button-toggle
---
 Quasar 有一个叫QBtn的组件，它是一个具有一些额外有用功能的按钮。例如，它有两种形状：矩形(默认)和圆形。它还具有材料波纹效果(可以禁用)。

该按钮组件还带有一个旋转器或加载效果。当应用程序的执行可能导致延迟，而你想给用户一些关于延迟的反馈时，你会使用这个效果。当使用时，一旦用户点击按钮，该按钮就会显示一个旋转的动画。

当没有禁用或旋转时，QBtn会发出一个`@click`事件，只要它被点击或轻击。

## QBtn API

<doc-api file="QBtn" />

## 使用方法

### 标准

<doc-example title="标准按钮" file="QBtn/Standard" />

### 自定义颜色

<doc-example title="自定义颜色" file="QBtn/CustomColor" /> ###自定义颜色

### 带图标

<doc-example title="带图标" file="QBtn/WithIcons" /> ###带图标

### 圆形

<doc-example title="圆形按钮" file="QBtn/Round" /> ###自定义内容

### 自定义内容

<doc-example title="自定义内容" file="QBtn/CustomContent" /> ###自定义内容

<doc-example title="截断标签" file="QBtn/TruncateLabel" /> ###自定义内容

### 设计

<doc-example title="按钮设计" file="QBtn/ButtonDesign" /> ###设计

### 排列方式

<doc-example title="按钮对齐 "file="QBtn/ButtonAlignment" /> ### 尺寸

### 尺寸

<doc-example title="按钮尺寸" file="QBtn/ButtonSize" /> ### 尺寸

### 填充

默认的padding是 "xs md"。但是，你可以使用`padding`属性来定制它。

<doc-example title="按钮填充" file="QBtn/ButtonPadding" />

### 与进度有关

一些按钮动作涉及到联系服务器，所以是异步响应。你最好通知用户一个后台进程的发生，直到异步响应准备好。QBtn通过`loading`属性提供了这种可能性。这个属性将显示一个QSpinner(默认)，而不是按钮的图标和/或标签。也可以使用自定义的加载内容(不仅仅是文本或旋转器)。

<doc-example title="不确定的进度" file="QBtn/IndeterminateProgress" />

如果你愿意，你也可以通过使用额外的`百分比`属性，以及你已经学到的关于带进度的按钮的知识，在按钮中显示一个确定的进度。

<doc-example title="确定的进度" file="QBtn/DeterministicProgress" />

### 自定义波纹

<doc-example title="自定义波纹" file="QBtn/CustomRipple" /> ###自定义波纹

### 处理导航 <q-badge align="top" color="brand-primary" label="uped for v2.4+" />

::: warning UMD usage
* 如果你将使用`to`和`replace`属性，请确保你在项目中也注入Vue Router。否则就使用替代的`href`属性。
* 由于上述原因，下面的一些QBtn在Codepen/jsFiddle中也无法工作。
:::

::: tip
如果可以的话，最好使用Vue Router属性而不是`href`，因为使用`href`你会触发一个窗口导航而不是页面内的Vue Router导航。
:::

<doc-example title="链接" file="QBtn/Links" no-edit />

对于更复杂的用例，你也可以直接使用本地Vue的`<router-link>`组件来包装一个QBtn。这也提供了根据应用程序的当前路线来控制状态的机会。

<doc-example title="RouterLink的范围槽" file="QBtn/RouterLinkExample" no-edit />

### 其他选项

<doc-example title="其他选项" file="QBtn/OtherOptions" /> ### 其他选项

### 禁用

<doc-example title="禁用" file="QBtn/Disabled" /> ###禁用

### 控制表单提交的按钮
当你有一个向服务器提交表单输入的按钮时，比如 "保存 "按钮，很多时候你也想让用户按一下ENTER键就能提交表单。如果你还想给用户反馈正在进行的保存过程，并防止用户重复按下按钮，你需要让按钮显示一个加载旋钮，并从点击事件中禁用。QBtn允许这种行为，如果这样配置的话。

::: warning
当把类型为 "submit "的QBtn放在QField、QInput或QSelect的 "before"、"after"、"prepend "或 "append "槽中时，你还应该在相关的QBtn上添加一个`@click`监听器。这个监听器应该调用提交表单的方法。所有在这些槽中的 "点击 "事件都不会传播到它们的父元素。
:::

<doc-example title="表单提交" file="QBtn/FormSubmission" />
