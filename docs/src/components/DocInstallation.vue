<template lang="pug">
q-card.doc-installation.q-my-lg(flat, bordered)
  q-tabs.text-grey-7.bg-white(v-model="currentTab", align="left", indicator-color="brand-primary", dense, :breakpoint="0")
    q-tab(
      v-for="tab in ['Quasar CLI', 'Vite plugin / Vue CLI', 'UMD']"
      :key="`installation-${tab}`"
      :name="tab"
      :label="tab"
      no-caps
    )

  q-separator

  q-tab-panels(v-model="currentTab", animated)
    q-tab-panel.q-pa-none(name="Quasar CLI")
      doc-code(:code="QuasarCli")

    q-tab-panel.q-pa-none(name="Vite plugin / Vue CLI")
      doc-code(:code="ExternalCli")

    q-tab-panel.q-pa-none(name="UMD")
      doc-code(:code="UMD")
</template>

<script>
import { ref, computed } from 'vue'
import DocCode from './DocCode.vue'

export default {
  name: 'DocInstallation',

  components: {
    DocCode
  },

  props: {
    components: [ Array, String ],
    directives: [ Array, String ],
    plugins: [ Array, String ],
    config: String
  },

  setup (props) {
    const currentTab = ref('Quasar CLI')

    function nameAsString (name, indent, quotes = true) {
      const wrapper = quotes
        ? str => `'${str}'`
        : str => str

      return Array.isArray(name)
        ? name.map(wrapper).join(',\n' + ''.padStart(indent, ' '))
        : wrapper(name)
    }

    const quasarConf = computed(() => {
      return props.config !== void 0
        ? `${props.config}: { /* look at QuasarConfOptions from the API card */ }`
        : null
    })

    const QuasarCli = computed(() => {
      if (props.plugins === void 0 && quasarConf.value === null) {
        return `/*
* 无需安装步骤。
* 它默认由 @quasar/app 安装。
*/`
      }

      const parts = []

      if (props.plugins !== void 0) {
        parts.push(`plugins: [
      ${nameAsString(props.plugins, 6)}
    ]`)
      }

      if (quasarConf.value !== null) {
        parts.push(`config: {
      ${quasarConf.value}
    }`)
      }

      return `// quasar.conf.js

return {
  framework: {
    ${parts.join(',\n    ')}
  }
}`
    })

    const UMD = computed(() => {
      const config = quasarConf.value !== null
        ? `

// 可选的。
// 将全局的quasarConfig对象放在Quasar脚本标签之前的一个脚本标签中。
app.use(Quasar, {
  config: {
    ${quasarConf.value}
  }
}`
        : ''

      const content = `/*
* 无需安装步骤。
* 它默认安装。
*/`

      return content + config
    })

    const ExternalCli = computed(() => {
      const types = [], imports = []

      ;[ 'components', 'directives', 'plugins' ].forEach(type => {
        if (props[ type ] !== void 0) {
          imports.push(nameAsString(props[ type ], 2, false))
          types.push(`${type}: {
    ${nameAsString(props[ type ], 4, false)}
  }`)
        }
      })

      if (quasarConf.value !== null) {
        types.push(`config: {
    ${quasarConf.value}
  }`)
      }

      return `// main.js

import {
  Quasar,
  ${imports.join(',\n  ')}
} from 'quasar'

app.use(Quasar, {
  ${types.join(',\n  ')}
})`
    })

    return {
      currentTab,

      QuasarCli,
      UMD,
      ExternalCli
    }
  }
}
</script>
