<template lang="pug">
div
  q-btn-dropdown.text-bold(:align="align", flat, no-caps, stretch, :label="`v${$q.version}`", auto-close)
    q-list(dense padding)
      q-item-label(header) Latest (v{{ $q.version }})
      q-item(clickable, to="/start/release-notes")
        q-item-section.text-teal(avatar)
          q-icon(:name="mdiClipboardText")
        q-item-section.text-no-wrap 发行说明

      q-item(clickable, href="https://github.com/quasarframework/quasar/issues", target="_blank", rel="noopener")
        q-item-section.text-purple(avatar)
          q-icon(:name="mdiBugCheck")
        q-item-section.text-no-wrap 报告错误

      q-item(clickable, href="https://github.com/quasarframework/quasar", target="_blank", rel="noopener")
        q-item-section(avatar)
          q-icon(:name="fabGithub")
        q-item-section Repository

      q-separator.q-mb-sm.q-mt-md

      q-item-label(header) 旧版本
      q-item(
        key="v1-link"
        clickable
        href="https://v1.quasar.dev/"
        target="_blank"
        rel="noopener"
      )
        q-item-section v1 文档
      q-item(
        v-for="version in ['17', '16', '15', '14', '13']"
        :key="version"
        clickable
        :href="`https://v0-${version}.quasar-framework.org/`"
        target="_blank"
        rel="noopener"
      )
        q-item-section {{ `v0.${version}` }} 文档

  q-btn-dropdown.text-bold(:align="align", flat, no-caps, stretch, label="Tools", auto-close)
    q-list(dense padding)
      q-item(clickable, href="https://awesome.quasar.dev", rel="noopener", target="_blank")
        q-item-section.text-yellow-9(avatar)
          q-icon(:name="mdiFlare")
        q-item-section.text-no-wrap Awesome 列表

      q-item(to="/app-extensions/discover")
        q-item-section.text-brand-primary(avatar)
          q-icon(:name="mdiFilePlus")
        q-item-section.text-no-wrap 应用扩展

      q-item-label.q-mt-md(header) 帮助者

      q-item(clickable, to="/icongenie")
        q-item-section.text-red(avatar)
          q-icon(:name="mdiStarCircle")
        q-item-section.text-no-wrap
          .row.no-wrap.items-center
            span Icon Genie CLI
            //- q-badge.q-ml-sm new

      q-item(clickable, to="/style/theme-builder")
        q-item-section.text-teal(avatar)
          q-icon(:name="mdiPaletteSwatch")
        q-item-section.text-no-wrap 主题生成器

      q-item(clickable, to="/style/dark-mode")
        q-item-section(avatar)
          q-icon(:name="mdiInvertColors")
        q-item-section.text-no-wrap 暗默模式

      q-item(clickable, href="layout-builder", target="_blank")
        q-item-section.text-brand-primary(avatar)
          q-icon(:name="mdiViewDashboard")
        q-item-section.text-no-wrap 布局生成器

      q-item(clickable, to="/layout/gallery")
        q-item-section.text-grey-8(avatar)
          q-icon(:name="mdiShoppingMusic")
        q-item-section.text-no-wrap 布局图库

      q-item(clickable, to="/layout/grid/flex-playground")
        q-item-section.text-orange(avatar)
          q-icon(:name="fasFlask")
        q-item-section.text-no-wrap
          .row.no-wrap.items-center
            span Flex Playground

      q-item-label.q-mt-md(header) 练习场

      q-item(clickable, href="https://codepen.quasar.dev", target="_blank", rel="noopener")
        q-item-section.text-brown-5(avatar)
          q-icon(:name="fabCodepen")
        q-item-section Codepen

      q-item(clickable, href="https://jsfiddle.quasar.dev", target="_blank", rel="noopener")
        q-item-section.text-brand-primary(avatar)
          q-icon(:name="fabJsfiddle")
        q-item-section jsFiddle

      q-item(clickable, href="https://codesandbox.quasar.dev", target="_blank", rel="noopener")
        q-item-section.text-black(avatar)
          q-icon(:name="fasCubes")
        q-item-section Codesandbox

  q-btn-dropdown.text-bold(:align="align", flat, no-caps, stretch, label="Support", auto-close)
    q-list(dense padding)

      q-item(clickable, href="https://chat.quasar.dev", rel="noopener", target="_blank")
        q-item-section.text-brand-primary(avatar)
          q-icon(:name="mdiChat")
        q-item-section.text-no-wrap Discord 聊天室

      q-item(clickable, href="https://forum.quasar.dev/", rel="noopener", target="_blank")
        q-item-section.text-secondary(avatar)
          q-icon(:name="mdiForum")
        q-item-section 论坛

      q-item(clickable, href="https://github.com/quasarframework", rel="noopener", target="_blank")
        q-item-section(avatar)
          q-icon(:name="fabGithub")
        q-item-section.text-no-wrap GitHub 仓库

      q-item-label.q-mt-md(header) 社交

      q-item(clickable, href="https://blog.quasar.dev", rel="noopener", target="_blank")
        q-item-section.text-brand-primary(avatar)
          q-icon(:name="mdiPost")
        q-item-section 博客

      q-item(clickable, href="https://github.com/quasarframework/quasar/discussions/categories/announcements", target="_blank", rel="noopener")
        q-item-section.text-purple(avatar)
          q-icon(:name="mdiBullhorn")
        q-item-section 公告

      q-item(clickable, href="https://twitter.quasar.dev", target="_blank", rel="noopener")
        q-item-section.text-blue(avatar)
          q-icon(:name="fabTwitter")
        q-item-section Twitter

      q-item(clickable, href="https://facebook.quasar.dev", target="_blank", rel="noopener")
        q-item-section.text-blue-8(avatar)
          q-icon(:name="fabFacebook")
        q-item-section
          .row.no-wrap.items-center
            span Facebook

      q-item-label.q-mt-md(header) 捐赠

      q-item(clickable, href="https://donate.quasar.dev", target="_blank", rel="noopener")
        q-item-section(avatar)
          q-icon(:name="mdiCharity")
        q-item-section.text-no-wrap GitHub 赞助
</template>

<script>
import {
  fabGithub, fasFlask, fabCodepen, fabJsfiddle,
  fasCubes, fabTwitter, fabFacebook
} from '@quasar/extras/fontawesome-v5'

import {
  mdiPost, mdiForum, mdiChat, mdiBullhorn,
  mdiViewDashboard, mdiShoppingMusic, mdiClipboardText,
  mdiBugCheck, mdiFlare, mdiFilePlus, mdiPaletteSwatch,
  mdiInvertColors, mdiCharity, mdiStarCircle
} from '@quasar/extras/mdi-v6'

export default {
  name: 'HeaderMenu',

  props: {
    align: String
  },

  setup () {
    return {
      fabGithub,
      fasFlask,
      fabCodepen,
      fabJsfiddle,
      fasCubes,
      fabTwitter,
      fabFacebook,

      mdiPost,
      mdiChat,
      mdiForum,
      mdiBullhorn,
      mdiViewDashboard,
      mdiShoppingMusic,
      mdiClipboardText,
      mdiBugCheck,
      mdiFlare,
      mdiFilePlus,
      mdiPaletteSwatch,
      mdiInvertColors,
      mdiCharity,
      mdiStarCircle
    }
  }
}
</script>
