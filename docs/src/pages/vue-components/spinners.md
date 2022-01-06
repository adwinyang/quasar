---
title: 纺纱机
desc: QSpinner及其衍生的Vue组件被用来向用户展示当前正在进行的一个及时的进程。它让用户感觉到系统正在继续为长期活动工作。
keys: QSpinner,QSpinnerAudio,QSpinnerBall,QSpinnerBars,QSpinnerBox,QSpinnerClock,QSpinnerComment,QSpinnerCube,QSpinnerDots,QSpinnerFacebook,QSpinnerGears,QSpinnerGrid,QSpinnerHearts,QSpinnerHourglass,QSpinnerInfinity,QSpinnerIos,QSpinnerOrbit,QSpinnerOval,QSpinnerPie,QSpinnerPuff,QSpinnerRadio,QSpinnerRings,QSpinnerTail
related:
  - /vue-components/linear-progress
  - /vue-components/circular-progress
  - /vue-components/skeleton
  - /vue-components/inner-loading
  - /quasar-plugins/loading
  - /quasar-plugins/loading-bar
---

旋转器是用来向用户显示当前正在进行的及时进程。这是一个重要的用户体验功能，它让用户感觉到系统正在继续工作，以进行长期的活动，如从服务器上抓取数据或一些繁重的计算。

## QSpinner API

<doc-api file="QSpinner" />

## 其他Spinner API

::: tip
下面的API适用于所有的旋转器，除了QSpinner。用QSpinnerCube制作一个示例。
:::

<doc-api file="QSpinnerCube" />

## 使用方法

<doc-example title="QSpinner" file="QSpinner/Default" />

在下面的示例中，将鼠标悬停在旋转器上可以看到它们的名字。

<doc-example title="其他旋转器" file="QSpinner/Others" />

<doc-example title="着色" file="QSpinner/Color" />

请注意，在默认情况下，QSpinner和所有其他的旋转器都会继承父类的字体大小，并将其作为自己的大小来应用。

<doc-example title="尺寸" file="QSpinner/Size" />

<doc-example title="标准尺寸" file="QSpinner/StandardSizes" />
