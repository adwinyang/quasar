<template lang="pug">
.q-my-lg.q-mx-md.q-pa-md.text-center
  q-icon(:name="mdiTextBoxSearchOutline" color="brand-primary" size="4em")
  .q-mt-md.text-weight-thin 我们找过了，但是找不到... 它可能存在，但尚未编制索引。
  .q-mt-sm 请改进您的搜索条件。
</template>

<script>
import { mdiTextBoxSearchOutline } from '@quasar/extras/mdi-v6'

export default {
  name: 'ResultEmpty',
  setup () {
    return { mdiTextBoxSearchOutline }
  }
}
</script>
