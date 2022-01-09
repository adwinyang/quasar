<template>
  <div class="q-pa-md">
    <div>
      切换到另一个浏览器标签或应用程序，然后回到这里，看到一些变化。
    </div>

    <q-markup-table v-if="eventList.length > 0" class="q-mt-md">
      <tbody>
        <tr v-for="evt in eventList" :key="evt.timestamp">
          <td>{{ evt.timestamp }}</td>
          <td>{{ evt.label }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, watch } from 'vue'

function pad (number) {
  return (number < 10 ? '0' : '') + number
}

export default {
  setup () {
    const $q = useQuasar()
    const eventList = ref([])

    watch(() => $q.appVisible, state => {
      const date = new Date()
      eventList.value.unshift({
        timestamp: pad(date.getHours()) + ':' +
            pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + '.' +
            date.getMilliseconds(),
        label: `App became ${state ? 'visible' : 'hidden'}`
      })
    })

    return {
      eventList
    }
  }
}
</script>
