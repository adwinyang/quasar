---
title: CSS 间距类
desc: 由Quasar提供的CSS类的列表，以简化响应式围栏和边距的规范。
related:
  - /style/typography
  - /style/positioning
  - /style/visibility
  - /style/breakpoints
---
Quasar提供了一些CSS类来帮助你处理DOM元素或组件的间距。所有的选项都以
前缀为`q-`，然后细分为类型(T)、方向(D)和大小(S)。请看下面的表格
以了解所有可能的排列组合。

## 语法
```
q-[p|m][t|r|b|l|a|x|y]-[none|auto|xs|sm|md|lg|xl]
    T       D                   S

T - type
  - values: p (padding), m (margin)

D - direction
  - values:
      t (top), r (right), b (bottom), l (left),
      a (all), x (both left & right), y (both top & bottom)

S - size
  - values:
      none,
      auto (ONLY for specific margins: q-ml-*, q-mr-*, q-mx-*),
      xs (extra small),
      sm (small),
      md (medium),
      lg (large),
      xl (extra large)
```

## ##实例

```html
<!-- small padding in all directions -->
<div class="q-pa-sm">...</div>

<!-- medium margin to top, small margin to right -->
<q-card class="q-mt-md q-mr-sm">...</q-card>
```

## ###Flex附加组件
当启用(通过`quasar.conf.js >框架 > cssAddon: true`)，它提供了断点意识的版本为所有间距相关的CSS类。

> 请注意，在启用它时，将有一个明显的碰撞的CSS足迹。所以只有在你真正需要的时候才这样做。

```
.q-(p|m)(t|r|b|l|a|x|y)-<bp>-(none|auto|xs|sm|md|lg|xl)
```

示例。`q-pa-xs-md q-pa-sm-sm q-px-md-lg q-py-md-md`。

## 变化表

| 前缀 | 类型 | 方向 | 大小 | 示例 |
|--------|------|-----------|------|---------
| `q-` | `p` (padding) | `t` (top) | `none` | `q-pt-none` !
| `q-` | `p` (padding) | `t` (top) | `xs` (extra small) | `q-pt-xs` !
| `q-` | `p` (padding) | `t` (top) | `sm` (small) | `q-pt-sm` !
| `q-` | `p` (padding) | `t` (top) | `md` (medium) | `q-pt-md` !
| `q-` | `p` (padding) | `t` (top) | `lg` (large) | `q-pt-lg` !
| `q-` | `p` (padding) | `t` (top) | `xl` (extra large) | `q-pt-xl` !
| `q-` | `p` (padding) | `r` (right) | `none` | `q-pr-none` !
| `q-` | `p` (padding) | `r` (right) | `xs` (extra small) | `q-pr-xs` !
| `q-` | `p` (padding) | `r` (right) | `sm` (small) | `q-pr-sm` !
| `q-` | `p` (padding) | `r` (right) | `md` (medium) | `q-pr-md` !
| `q-` | `p` (padding) | `r` (right) | `lg` (large) | `q-pr-lg` !
| `q-` | `p` (padding) | `r` (right) | `xl` (extra large) | `q-pr-xl` !
| `q-` | `p` (padding) | `b` (bottom) | `none` | `q-pb-none` !
| `q-` | `p` (padding) | `b` (bottom) | `xs` (extra small) | `q-pb-xs` !
| `q-` | `p` (padding) | `b` (bottom) | `sm` (small) | `q-pb-sm` !
| `q-` | `p` (padding) | `b` (bottom) | `md` (medium) | `pb-md` !
| `q-` | `p` (padding) | `b` (bottom) | `lg` (large) | `q-pb-lg` !
| `q-` | `p` (padding) | `b` (bottom) | `xl` (extra large) | `q-pb-xl` !
| `q-` | `p` (padding) | `l` (left) | `none` | `pl-none` !
| `q-` | `p` (padding) | `l` (left) | `xs` (extra small) | `pl-xs` !
| `q-` | `p` (padding) | `l` (left) | `sm` (small) | `q-pl-sm` !
| `q-` | `p` (padding) | `l` (left) | `md` (medium) | `pl-md` !
| `q-` | `p` (padding) | `l` (left) | `lg` (large) | `q-pl-lg` !
| `q-` | `p` (padding) | `l` (left) | `xl` (extra large) | `pl-xl` !
| `q-` | `p` (padding) | `a` (all) | `none` | `q-pa-none` | `q-pa-none` !
| `q-` | `p` (padding) | `a` (all) | `xs` (extra small) | `q-pa-xs` !
| `q-` | `p` (padding) | `a` (all) | `sm` (small) | `q-pa-sm` !
| `q-` | `p` (padding) | `a` (all) | `md` (medium) | `q-pa-md` !
| `q-` | `p` (padding) | `a` (all) | `lg` (large) | `q-pa-lg` !
| `q-` | `p` (padding) | `a` (all) | `xl` (extra large) | `q-pa-xl` !
| `q-` | `p` (padding) | `x` (left & right) | `none` | `px-none` !
| `q-` | `p` (padding) | `x` (left & right) | `xs` (extra small) | `q-px-xs` !
| `q-` | `p` (padding) | `x` (left & right) | `sm` (small) | `px-sm` !
| `q-` | `p` (padding) | `x` (left & right) | `md` (medium) | `px-md` !
| `q-` | `p` (padding) | `x` (left & right) | `lg` (large) | `px-lg` !
| `q-` | `p` (padding) | `x` (left & right) | `xl` (extra large) | `q-px-xl` !
| `q-` | `p` (padding) | `y` (top & bottom) | `none` | `py-none` !
| `q-` | `p` (padding) | `y` (top & bottom) | `xs` (extra small) | `q-py-xs` !
| `q-` | `p` (padding) | `y` (top & bottom) | `sm` (small) | `q-py-sm` !
| `q-` | `p` (padding) | `y` (top & bottom) | `md` (medium) | `py-md` !
| `q-` | `p` (padding) | `y` (top & bottom) | `lg` (large) | `py-lg` !
| `q-` | `p` (padding) | `y` (top & bottom) | `xl` (extra large) | `q-py-xl` !
| `q-` | `m` (margin) | `t` (top) | `none` | `mt-none` !
| `q-` | m` (margin) | `t` (top) | `xs` (extra small) | `q-mt-xs` !
| `q-` | m` (margin) | `t` (top) | `sm` (small) | `q-mt-sm` !
| `q-` | `m` (margin) | `t` (top) | `md` (medium) | `q-mt-md` !
| `q-` | `m` (margin) | `t` (top) | `lg` (large) | `q-mt-lg` !
| `q-` | m` (margin) | `t` (top) | `xl` (extra large) | `q-mt-xl` !
| `q-` | `m` (margin) | `t` (top) | `auto` | `q-mt-auto` |
| `q-` | m` (margin) | `r` (right) | `none` | `mr-none` !
| `q-` | m` (margin) | `r` (right) | `xs` (extra small) | `q-mr-xs` !
| `q-` | `m` (margin) | `r` (right) | `sm` (small) | `q-mr-sm` !
| `q-` | `m` (margin) | `r` (right) | `md` (medium) | `mr-md` !
| `q-` | m` (margin) | `r` (right) | `lg` (large) | `q-mr-lg` |
| `q-` | m` (margin) | `r` (right) | `xl` (extra large) | `mr-xl` !
| `q-` | m` (margin) | `r` (right) | `auto` | `mr-auto` !
| `q-` | m` (margin) | `b` (bottom) | `none` | `q-mb-none` !
| `q-` | m` (margin) | `b` (bottom) | `xs` (extra small) | `q-mb-xs` !
| `q-` | m` (margin) | `b` (bottom) | `sm` (small) | `q-mb-sm` !
| `q-` | `m` (margin) | `b` (bottom) | `md` (medium) | `q-mb-md` !
| `q-` | `m` (margin) | `b` (bottom) | `lg` (large) | `q-mb-lg` !
| `q-` | m` (margin) | `b` (bottom) | `xl` (extra large) | `q-mb-xl` !
| `q-` | `m` (margin) | `b` (bottom) | `auto` | `q-mb-auto` !
| `q-` | `m` (margin) | `l` (left) | `none` | `ml-none` !
| `q-` | m` (margin) | `l` (left) | `xs` (extra small) | `q-ml-xs` !
| `q-` | `m` (margin) | `l` (left) | `sm` (small) | `q-ml-sm` !
| `q-` | `m` (margin) | `l` (left) | `md` (medium) | `ml-md` !
| `q-` | `m` (margin) | `l` (left) | `lg` (large) | `q-ml-lg` !
| `q-` | m` (margin) | `l` (left) | `xl` (extra large) | `q-ml-xl` !
| `q-` | m` (margin) | `l` (left) | `auto` | `ml-auto` !
| `q-` | `m` (margin) | `a` (all) | `none` | `ma-none` !
| `q-` | `m` (margin) | `a` (all) | `xs` (extra)
| `q-` | `m` (margin) | `a` (all) | `sm` (small) | `q-ma-sm` !
| `q-` | `m` (margin) | `a` (all) | `md` (medium) | `q-ma-md` !
| `q-` | `m` (margin) | `a` (all) | `lg` (large) | `q-ma-lg` !
| `q-` | `m` (margin) | `a` (all) | `xl` (extra large) | `q-ma-xl` !
| `q-` | `m` (margin) | `x` (left & right) | `none` | `mx-none` !
| `q-` | `m` (margin) | `x` (left & right) | `xs` (extra small) | `q-mx-xs` !
| `q-` | m` (margin) | `x` (left & right) | `sm` (small) | `q-mx-sm` !
| `q-` | `m` (margin) | `x` (left & right) | `md` (medium) | `mx-md` !
| `q-` | `m` (margin) | `x` (left & right) | `lg` (large) | `q-mx-lg` !
| `q-` | `m` (margin) | `x` (left & right) | `xl` (extra large) | `q-mx-xl` !
| `q-` | `m` (margin) | `x` (left & right) | `auto` | `q-mx-auto` !
| `q-` | `m` (margin) | `y` (top & bottom) | `none` | `my-none` !
| `q-` | m` (margin) | `y` (top & bottom) | `xs` (extra small) | `q-my-xs` |
| `q-` | `m` (margin) | `y` (top & bottom) | `sm` (small) | `my-sm` | `my-sm` !
| `q-` | `m` (margin) | `y` (top & bottom) | `md` (medium) | `my-md` !
| `q-` | `m` (margin) | `y` (top & bottom) | `lg` (large) | `q-my-lg` !
| `q-` | m` (margin) | `y` (top & bottom) | `xl` (extra large) | `q-my-xl` !
| `q-` | `m` (margin) | `y` (top & bottom) | `auto` | `my-auto` !

::: tip
请看更多关于[Flex Addons]的细节(/layout/grid/introduction-to-flexbox#flex-addons)。
:::

## 其他相关
| 类别名称 | 说明 |
| `no-margin` | 移除任何应用的边距。
| `no-padding` | 删除任何应用的padding

