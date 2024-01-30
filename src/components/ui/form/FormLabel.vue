<script lang="ts" setup>
import { useAttrs } from 'vue'
import { Label, type LabelProps } from 'radix-vue'
import { useFormField } from './useFormField'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false
})
defineProps<LabelProps>()

const { error, formItemId } = useFormField()
const { class: className, ...rest } = useAttrs()
</script>

<template>
  <Label
    :class="
      cn(
        'block text-left text-sm font-medium tracking-tight text-foreground',
        error && 'text-destructive',
        className ?? ''
      )
    "
    :for="formItemId"
    v-bind="rest"
  >
    <slot />
  </Label>
</template>
