<script lang="ts" setup>
import { PropType } from 'vue'

interface Output {
  label: string
  type: string
  children?: Output[]
}

defineProps({
  data: {
    type: Object as PropType<Output>,
    required: true
  }
})
</script>

<template>
  <li v-bind="$attrs">
    <div class="flex items-center gap-x-2">
      <p class="text-sm">{{ data.label }}</p>
      <p class="rounded-sm bg-slate-200 p-1 text-center text-xs text-muted-foreground">{{ data.type }}</p>
    </div>
    <static-output-item class="ml-6 mt-2" v-for="item in data.children" :data="item" :key="item.label" />
  </li>
</template>
