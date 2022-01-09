<template lang="pug">
.q-my-lg.q-mx-md.q-pa-md.text-center
  q-icon(:name="mdiAlert" color="negative" size="4em")
  .q-mt-md.text-weight-thin 不是你，是我。
  .text-weight-thin 无法连接到我们的搜索服务...
</template>

<script>
import { mdiAlert } from '@quasar/extras/mdi-v6'

export default {
  name: 'ResultError',
  setup () {
    return { mdiAlert }
  }
}
</script>
