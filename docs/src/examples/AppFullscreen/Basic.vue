<template>
  <div class="q-pa-md">
    <q-btn
      color="secondary"
      @click="$q.fullscreen.toggle()"
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      :label="$q.fullscreen.isActive ? '退出全屏' : '进入全屏'"
    />
  </div>
</template>
