---
title: 聊天信息
desc: QChatMessage Vue组件显示一个包含一个或多个用户信息的聊天条目。
keys: QChatMessage
---

QChatMessage Vue组件显示一个包含一个或多个用户信息的聊天条目。

::: tip
要在同一个主题中混合有头像和无头像的信息，请使用一个占位头像。
:::

## QChatMessage API

<doc-api file="QChatMessage" />

## 使用方法

### 基础知识

::: tip
使用属性`sent`是为聊天信息的发送者准备的。另一边是针对收到的消息。
:::

<doc-example title="基础" file="QChatMessage/Basic" />

<doc-example title="名称" file="QChatMessage/Name" />

<doc-example title="头像" file="QChatMessage/Avatar" />

<doc-example title="印章" file="QChatMessage/Stamp" />

<doc-example title="标签" file="QChatMessage/Label" />

### 自定义

<doc-example title="文本和背景颜色" file="QChatMessage/Color" />

<doc-example title="大小" file="QChatMessage/Size" />

### 槽位

<doc-example title="默认插槽" file="QChatMessage/SlotDefault" />

<doc-example title="头像/图章/名字插槽" file="QChatMessage/SlotAvatarStampName" />

### 消毒处理

::: warning
如果你不相信源头(如果值来自于用户输入)，总是对值时行清理。
:::

<doc-example title="消毒的内容" file="QChatMessage/Sanitize" />
