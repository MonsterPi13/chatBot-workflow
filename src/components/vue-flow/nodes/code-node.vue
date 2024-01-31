<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import CommonInputModule from '../common-input-module.vue'
import CommonCodeModule from '../common-code-module.vue'
import CommonOutputModule from '../common-output-module.vue'

import type { NodeProps } from '@vue-flow/core'
import { LLMNodeData, LLMNodeEvents } from './index'

defineProps<NodeProps<LLMNodeData, LLMNodeEvents>>()

const outputInitialData = [
  {
    name: 'key0',
    type: 'String',
    description: 'just for test'
  }
]
</script>

<template>
  <div class="w-[600px] rounded-sm border border-gray-200 bg-white p-3 shadow-md">
    <Handle type="target" :position="Position.Left" />
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between">
        <div class="flex items-center gap-x-2">
          <img src="~@/assets/images/icon_Code.png" class="h-4 w-4" alt="Code icon" />
          <div class="flex flex-col gap-y-1">
            <p class="text-sm text-gray-500">Code</p>
          </div>
        </div>
      </div>

      <span class="text-sm text-gray-500">Write code to process input variables to generate return values.</span>

      <div class="grid gap-y-3">
        <common-input-module />
        <common-code-module />
        <common-output-module :data="outputInitialData" />
      </div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>
