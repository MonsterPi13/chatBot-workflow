<script lang="ts" setup>
import { ref } from 'vue'
import { PlusIcon, AlertCircleIcon } from 'lucide-vue-next'
import { Handle, Position, useNode } from '@vue-flow/core'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import StartInputModule from '../start-input-module.vue'

import type { NodeProps } from '@vue-flow/core'
import { LLMNodeData, LLMNodeEvents } from './index'
import type { Input } from '../start-input-module.vue'

defineProps<NodeProps<LLMNodeData, LLMNodeEvents>>()

const data = ref<Input[]>([])

const node = useNode()

function handleClickAddBtn() {
  data.value.push({
    name: '',
    description: '',
    type: '',
    isRequired: true
  })
  node.node.data = {
    ...node.node.data,
    output: data
  }
}

function handleClickDeleteBtn(index: number) {
  data.value.splice(index, 1)
  node.node.data = {
    ...node.node.data,
    output: data
  }
}
</script>

<template>
  <div class="max-w-[520px] rounded-sm border border-gray-200 bg-white p-3 shadow-md">
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between">
        <div class="flex items-center gap-x-2">
          <img src="~@/assets/images/icon_Start.png" class="h-4 w-4" alt="Start icon" />
          <div class="flex flex-col gap-y-1">
            <p class="text-sm text-gray-500">Start</p>
          </div>
        </div>
      </div>

      <span class="text-sm text-gray-500"
        >The starting node of the workflow, used to set the information needed to initiate the workflow.</span
      >

      <div class="flex justify-between">
        <p class="flex items-center gap-x-1">
          Input
          <tooltip-provider>
            <tooltip>
              <tooltip-trigger>
                <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
              </tooltip-trigger>
              <tooltip-content>
                <p class="max-w-60">
                  Define the input parameters needed to start the workflow, these contents will be read by LLM during
                  the Bot conversation process, allowing LLM to start the workflow at the appropriate time and fill in
                  the correct information.
                </p>
              </tooltip-content>
            </tooltip>
          </tooltip-provider>
        </p>
        <plus-icon class="h-6 w-5 cursor-pointer text-primary" @click="handleClickAddBtn" />
      </div>

      <div class="grid gap-y-3">
        <start-input-module
          v-for="(item, index) in data"
          :key="index"
          :data="item"
          @click-delete="handleClickDeleteBtn(index)"
        />
      </div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>
