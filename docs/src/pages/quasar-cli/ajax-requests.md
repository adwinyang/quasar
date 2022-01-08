---
title: 阿贾克斯请求
desc: 在 Quasar 应用中使用Axios来获取数据。
---

> 我们建议在项目初始化时选择Axios。

如果你在项目初始化时没有选择Axios，那么你应该创建一个新的启动文件`axios.js`，看起来像这样。
(这里你也可以为你的axios实例指定额外的设置)

```js
// src/boot/axios.js

import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(({ app }) => {
  // 通过this.$axios和this.$api在Vue文件中使用(选项式 API)。

  app.config.globalProperties.$axios = axios
  // ^ ^ 这将允许你使用this.$axios(用于Vue Options API形式)。
  //       所以你不一定要在每个vue文件中导入axios。

  app.config.globalProperties.$api = api
  // ^ ^ 这将允许你使用this.$api(用于Vue选项式 API形式)。
  //       所以你可以轻松地对你的应用程序的API执行请求
})

export { axios, api }
```

还要确保yarn/npm安装`axios`包。

::: tip
如果你使用 Quasar CLI ，请务必查看[预取功能](/quasar-cli/prefetch-feature) 。
:::

在你的单一文件组件方法中的用法将像下面一样。注意，在下一个示例中，我们使用 Quasar 的[Notify插件](/quasar-plugins/notify)(通过`$q = useQuasar()`和`$q.notify`)，你需要安装它(按照前面的链接)。

```js
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  const data = ref(null)

  function loadData () {
    api.get('/api/backend')
      .then((response) => {
        data.value = response.data
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
  }

  return { data, loadData }
}
```

在Vuex Actions中使用，用于向axios全局添加头信息(如在认证期间)。

```js
import { api } from 'boot/axios'

export function register ({ commit }, form) {
  return api.post('/auth/register', form)
    .then(response => {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
      commit('login', {token: response.data.token, user: response.data.user})
    })
}
```

也可以看看[Axios docs](https://github.com/axios/axios)，了解更多信息。
