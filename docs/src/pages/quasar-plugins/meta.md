---
title: Quasar Meta Plugin
desc: 一个 Quasar 插件，可以轻松地处理一个应用程序的元标签，帮助你增加SEO。它可以管理元标签、样式和脚本标签、HTML和正文属性以及页面标题。
keys: Meta
related:
  - /vue-composables/use-meta
---

**为您的网站提供更好的SEO！** Meta插件可以动态改变页面标题，管理`<meta>`标签，管理`<html>`和`<body>` DOM元素属性，添加/删除/改变您文档头部的`<style>`和`<script>`标签(对CDN样式表或对js-ld标记很有用，例如)，或管理`<noscript>`标签。

::: tip
通过使用**Quasar CLI**，特别是**SSR(服务器端渲染)构建，充分利用这一功能。将其用于SPA(单页应用程序)也是有意义的。尽管在这种情况下，元信息将在运行时添加，而不是由网络服务器直接提供(如SSR构建)，但现代网络爬虫如[Googlebot](https://developers.google.com/search/docs/guides/javascript-seo-basics)将渲染动态页面并提取动态设置的元信息。
:::

## 安装

<doc-installation plugins="Meta" />

## 使用方法
Meta插件的作用是，它可以在你的Vue组件中使用一个叫做`meta'的特殊属性。看看下面的示例，几乎所有的功能都在其中。

### 组成API

我们将使用[useMeta](/vue-composables/use-meta)可组合。

```js
// 一些.vue文件
import { useMeta } from 'quasar'

const metaData = {
  // 设置文件标题
  title: 'Index Page',
  // 可选的；将最终标题设置为 "索引页--我的网站"，对于多级元来说很有用。
  titleTemplate: title => `${title} - My Website`,

  // 元标签
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // 注意：对于Open Graph类型的元数据，你将需要使用SSR，以确保页面被服务器渲染。
    ogTitle:  {
      property: 'og:title',
      // 可选的；类似于titleTemplate，但允许用其他元属性进行模板化。
      template (ogTitle) {
        return `${ogTitle} - My Website`
      }
    }
  },

  // CSS标签
  link: {
    material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  },

  // JS标签
  script: {
    ldJson: {
      type: 'application/ld+json',
      innerHTML: `{ "@context": "http://schema.org" }`
    }
  },

  // <html>属性
  htmlAttr: {
    'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined // generates <html empty>
  },

  // <body>属性
  bodyAttr: {
    'action-scope': 'xyz', // generates <body action-scope="xyz">
    empty: undefined // generates <body empty>
  },

  // <noscript>标签
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)'
  }
}

export default {
  setup () {
    // 需要在setup()中调用。
    useMeta(metaData)
  }
}
```

如果你依赖于组件的状态来计算元对象，那么你可以提供一个函数而不是对象本身。更多信息，请查看本页的 "Reactive "部分。

### 选项式 API

```js
// 一些.vue文件
import { createMetaMixin } from 'quasar'

const metaData = {
  // 设置文件标题
  title: 'Index Page',
  // 可选的；将最终标题设置为 "索引页--我的网站"，对于多级元来说很有用。
  titleTemplate: title => `${title} - My Website`,

  // 元标签
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // 注意：对于Open Graph类型的元数据，你将需要使用SSR，以确保页面被服务器渲染。
    ogTitle:  {
      property: 'og:title',
      // 可选的；类似于titleTemplate，但允许用其他元属性进行模板化。
      template (ogTitle) {
        return `${ogTitle} - My Website`
      }
    }
  },

  // CSS标签
  link: {
    material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  },

  // JS标签
  script: {
    ldJson: {
      type: 'application/ld+json',
      innerHTML: `{ "@context": "http://schema.org" }`
    }
  },

  // <html>属性
  htmlAttr: {
    'xmlns:cc': 'http://creativecommons.org/ns#' // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined // generates <html empty>
  },

  // <body>属性
  bodyAttr: {
    'action-scope': 'xyz', // generates <body action-scope="xyz">
    empty: undefined // generates <body empty>
  },

  // <noscript>标签
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)'
  }
}

export default {
  mixins: [
    createMetaMixin(metaData)
  ]
}
```

对于Options API方法，如果你依赖于组件的状态来计算元对象，那么你可以提供一个Function而不是对象本身。

```js
export default {
  mixins: [
    createMetaMixin(function () {
      // 这里的 "这个 "指的是你的组件
      return {
        // 假设`this.myTitle`存在于你的混合组件中
        title: this.myTitle
      }
    })
  ]
}
```

## 它是如何工作的
Metas是按照vue组件被Vue Router激活的顺序从.vue文件中计算出来的(为了进一步解释，我们把这称为一个链)。例如：App.vue > SomeLayout.vue > IndexPage.vue > ...?

当一个使用Meta插件的组件被渲染或销毁时，它将被添加/删除到/离开该链，元数据也会相应地被更新。

### 非反应式

注意，所有的属性(除了title和titleTemplate)都是Objects；你可以通过再次使用相同的键来覆盖链上之前的Vue组件中定义的元属性。例如：

```js
// 第一个加载的Vue组件
setup () {
  useMeta({
    meta: {
      myKey: { name: 'description', content: 'My Website' }
    }
  })
}

// 链条中的一个后续Vue组件。
// 这将覆盖 "myKey "的第一个定义。
setup () {
  useMeta({
    meta: {
      myKey: { name: 'description', content: 'Page 1' }
    }
  })
}
```

::: warning
只要确保不要重复`/src/index.template.html`中已经存在的内容。如果你想使用Meta插件，推荐的方法是将相同的标签从html模板中删除。但是，在你知道一个标签永远不会改变，并且你总是希望它被呈现出来的情况下，那么最好只在html模板上有它。
:::

### 反应式

在上面的部分，你注意到所有的元属性都是 "静态 "的。但如果你愿意，它们也可以是动态的(reactive)。你可以像管理Vue的计算属性那样来管理它们。

```js
// 一些.vue文件
import { useMeta } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const title = ref('Some title') // we define the "title" prop

    // 注意，这里的参数是一个函数
    // 在引擎盖下，它被转换为一个Vue计算的属性，以获得反应性
    useMeta(() => {
      return {
        // 只要上面的 "标题 "发生变化，你的元就会自动更新。
        title: title.value
      }
    })

    function setAnotherTitle () {
      title.value = 'Another title' // will automatically trigger a Meta update due to the binding
    }

    return {
      setAnotherTitle
    }
  }
}
```

## 测试元
在你部署之前，你真的应该确保你在元标签上的工作是合规的。虽然你可以直接复制并粘贴你的链接到Discord聊天记录、Facebook帖子或Tweet中，但我们建议用[https://metatags.io/](https://metatags.io/)进行验证。
