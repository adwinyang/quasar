---
title: 变形指令
desc: Vue指令可以在DOM元素之间甚至同一DOM元素的两种状态之间进行变形。
keys: morph
related:
  - /quasar-utils/morph-utils
---

"Morph" 是一个 Quasar 指令，它提供了在两种状态下对DOM元素进行变形的能力。

在底层，它使用Quasar [Morph function util](/quasar-utils/morph-utils)。

## Morph API

<doc-api file="Morph" />

## 使用方法

首先阅读[Morph function util](/quasar-utils/morph-utils)会对你理解这个指令的工作方式有很大帮助。

这条指令将一个组中的一个元素变形为另一个。通过改变指令的值(模型)以匹配变形元素的名称，可以激活变形。

::: warning
* "name" 和 "group" (作为指令参数或通过指令的值)是必须的。
* 如果指令的值是 Object 形式的，那么 "model" 也是必须的。
:::

<doc-example title="在一个组中的多个元素之间变形" file="Morph/BasicGroup" />

<doc-example title="将一个按钮变形为一个卡片" file="Morph/Card" />
