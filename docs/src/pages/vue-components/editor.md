---
title: 编辑器(所见即所得)
desc: QEditor Vue组件是一个所见即所得的编辑器，可以编写和粘贴HTML。
keys: QEditor
---

QEditor组件是一个WYSIWYG("所见即所得")编辑器组件，使用户可以编写甚至粘贴HTML。它使用所谓的设计模式和跨浏览器的`内容可编辑'接口。这里有一些来自MDN webdocs的可供参考的页面，其中有关于底层技术的更详细的信息。

- [使内容可编辑](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content)
- [设计模式](https://developer.mozilla.org/en-US/docs/Web/API/Document/designMode)
- [execCommand()参考](https://developer.mozilla.org/en-US/docs/Web/API/document/execCommand)
- [contentEditable spec](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)

## QEditor API

<doc-api file="QEditor" />

## 示例
<doc-example title="默认编辑器" file="QEditor/Basic" />

::: warning
在这第一个示例中，编辑器下面有两个卡片。第一张显示的是使用双胡子的未解析的html，而第二张显示的是使用`v-html="editor"`的已渲染版本。这样使用v-html会使你的用户容易受到跨站脚本攻击。如果内容是用户生成的，请确保在渲染或服务器端(或两者)对其进行消毒。
:::

在默认情况下，QEditor提供了大部分(如果不是全部)你在所见即所得编辑器中需要的命令。粗体、斜体、删除、下划线、无序(列表)、有序(列表)、下标、上标、链接、全屏、引用、向左(对齐)、居中(对齐)、向右(对齐)、对齐(对齐)、打印、缩进、删除格式、hr、撤销、重做、h1到h6、p(段落)、code(代码段落)、size-1到size-7。

这些命令中的每一个都预先配置了图标和它们自己的国际化工具提示。然而，如果你想覆盖它们的一些设置，你可以在定义对象属性的帮助下这样做。

```html
:definitions="{
  bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
}"
```

<doc-example title="重新定义加粗命令" file="QEditor/NewBold" />

下面是一个增加自定义定义的示例。在这种情况下，请确保你不与默认的命令相重叠。

<doc-example title="添加新命令" file="QEditor/NewCommands" />

<doc-example title="厨房水槽" file="QEditor/KitchenSink" />

<doc-example title="自定义样式" file="QEditor/Custom" />

<doc-example title="使用工具条插槽" file="QEditor/ToolbarSlot" />

## 下拉菜单

### 下拉框的类型

```html
<q-editor
  v-model="model"
  :toolbar="[
    [
      {
        label: 'Icons & Label',
        icon: 'filter_1',
        fixedLabel: true,
        fixedIcon: true,
        options: ['bold', 'italic', 'strike', 'underline']
      }
    ],
    [
      {
        label: 'Only label',
        icon: 'filter_2',
        fixedLabel: true,
        fixedIcon: true,
        list: 'no-icons',
        options: ['bold', 'italic', 'strike', 'underline']
      }
    ],
    [
      {
        label: 'Only icons',
        icon: 'filter_3',
        fixedLabel: true,
        fixedIcon: true,
        list: 'only-icons',
        options: ['bold', 'italic', 'strike', 'underline']
      }
    ]
  ]"
/>
```
### 有专属选项的下拉菜单
用户只能从每个下拉菜单中选择一个选项。

* 第一个下拉菜单的图标和标签根据当前的选择而改变。
* 第二个有固定的标签，但有动态图标
* 第三项有固定的图标，但有动态标签

```html
<q-editor
  v-model="model"
  :toolbar="[
    [
      {
        label: 'Dynamic label',
        icon: 'help_outline',
        options: ['left', 'center', 'right', 'justify']
      }
    ],
    [
      {
        label: 'Static label',
        fixedLabel: true,
        options: ['left', 'center', 'right', 'justify']
      }
    ],
    [
      {
        label: 'Some label',
        icon: 'account_balance',
        fixedIcon: true,
        options: ['left', 'center', 'right', 'justify']
      }
    ]
  ]"
/>
```

## 注意事项

### 自动更正和拼写检查
在某些情况下，你可能想关闭许多现代浏览器提供的综合自动更正、自动完成、自动大写和拼写校正 "功能"。要做到这一点，只需将`<q-editor>`组件包裹在`<form>`元素中，像这样。

```html
<form
  autocorrect="off"
  autocapitalize="off"
  autocomplete="off"
  spellcheck="false"
>
  <q-editor model="editor" />
</form>
```

### 图片
不幸的是，在不同的浏览器中，从缓冲区中粘贴和将图片拖放到编辑器中的做法是不同的--而且还高度依赖于图片首先是如何进入缓冲区的。事实上，直到最近，在使用Firefox时，你甚至可以在ContentEditable中调整图片的大小。如果你想允许图片的粘贴/下拉，我们强烈建议你编写自己的方法。

```html
<q-editor
  model="editor"
  @paste.native="evt => pasteCapture(evt)"
  @drop.native="evt => dropCapture(evt)"
 />
```

### 纯文本粘贴
如果粘贴事件的内容类型是文本，根据文本的来源，可能已经有大量的标记，contentEditable会自动解析。如果你想只粘贴 "干净的、无标记的 "文本，那么你可以使用这个示例中的方法(它也关闭了上面提到的拼写校正)。

<doc-example title="粘贴事件重写" file="QEditor/Pasting" />

### 打印
如果你没有设置字体(或者用户没有选择字体)，打印对话框将默认为系统字体，这可能会因浏览器和底层操作系统而不同。请务必考虑到这一点。

### 国际化
QEditor的工具提示内容是由[Quasar Language Pack](/options/quasar-language-packs)翻译的，所以仅仅改变语言也会改变界面。如果你想要的语言包丢失了--或者你发现了一个错误，请考虑以PR的形式提供更新。
