<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { ChevronsUpDownIcon, AlertCircleIcon } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import StaticOutputItem from './static-output-item.vue'

interface Output {
  label: string
  type: string
  children?: Output[]
}

defineProps({
  tip: {
    type: String,
    default: `Here is the API's response. After this node has finished running, these variables will be assigned the content returned by the API, and you can reference these variables in downstream nodes.`
  },
  data: {
    type: Array as PropType<Output[]>,
    default: () => []
  }
})

const isOpen = ref(false)
</script>

<template>
  <div class="rounded-md bg-muted px-3 py-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>Output</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60">
                    {{ tip }}
                  </p>
                </tooltip-content>
              </tooltip>
            </tooltip-provider>
          </div>
        </div>
      </collapsible-trigger>
      <collapsible-content class="space-y-3 px-3 py-3">
        <ul>
          <static-output-item v-for="item in data" :key="item.label" :data="item" />
        </ul>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
