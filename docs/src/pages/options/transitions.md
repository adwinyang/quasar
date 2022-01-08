---
title: Quasar 组件过渡
desc: Quasar组件的开箱即用的CSS过渡。
components:
  - transitions/TransitionList
---

有一些 Quasar 组件通过`transition-show`/`transition-hide`或`transition-prev`/`transition-next`或简单的`transition`属性提到了过渡的问题。我们将在这里展示这些过渡。

<transition-list />

使用上面标题中标明的过渡属性的名称。例如：

```html
<q-menu
  transition-show="jump-down"
  transition-hide="jump-up"
/>
```
