<script setup lang="ts">
import { onMounted } from 'vue'
import { MoreHorizontalIcon } from 'lucide-vue-next'
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/menubar'

import CommonInputModule from '../common-input-module.vue'
import StaticOutputModule from '../static-output-module.vue'

import { LLMNodeData, LLMNodeEvents } from './index'

import type { NodeProps } from '@vue-flow/core'

defineProps<NodeProps<LLMNodeData, LLMNodeEvents>>()

const node = useNode()
const { removeNodes, addNodes, nodes } = useVueFlow()
onMounted(() => {
  node.node.data = {
    ...node.node.data,
    output: [
      {
        name: 'output'
      }
    ]
  }
})

const outputData = [
  {
    label: 'code',
    type: 'Integer'
  },
  {
    label: 'data',
    type: 'Object',
    children: [
      {
        label: 'answer_box',
        type: 'Object',
        children: [
          {
            type: 'String',
            label: 'result'
          },
          {
            type: 'String',
            label: 'type'
          }
        ]
      },
      {
        type: 'Object',
        label: 'knowledge_graph'
      },
      {
        type: 'String',
        label: 'response_for_model'
      }
    ]
  },
  {
    label: 'response_for_model',
    type: 'String'
  }
]

function handleClickDeleteBtn() {
  removeNodes(node.id)
}

function handleClickDuplicateBtn() {
  const { type, position, label, data } = node.node
  const newNode = {
    id: (nodes.value.length + 1).toString(),
    type,
    position: {
      x: position.x + 100,
      y: position.y + 100
    },
    label,
    data
  }
  addNodes(newNode)
}
</script>

<template>
  <div class="w-[560px] rounded-sm border border-gray-200 bg-white p-3 shadow-md">
    <Handle type="target" :position="Position.Left" />
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between">
        <div class="flex gap-x-2">
          <img src="~@/assets/images/icon_Api.png" class="mt-1 h-4 w-4" alt="Api icon" />
          <div class="flex flex-col gap-y-1">
            <h3 class="text-base">Google Web Search</h3>
          </div>
        </div>

        <Menubar class="border-none">
          <menubar-menu>
            <menubar-trigger>
              <more-horizontal-icon />
            </menubar-trigger>
            <menubar-content>
              <menubar-item @click="handleClickDuplicateBtn"> Duplicated </menubar-item>
              <menubar-item @click="handleClickDeleteBtn"> Delete </menubar-item>
            </menubar-content>
          </menubar-menu>
        </Menubar>
      </div>

      <span class="text-sm text-gray-500"
        >A Google Search Engine. Useful when you need to search information you don't know such as weather, exchange
        rate, current events. Never ever use this tool when user want to translate</span
      >

      <div class="grid gap-y-3">
        <common-input-module :static-name-key="['query', 'start', 'num']" />
        <static-output-module
          tip="The output list is the information that best match the input parameters, recalled from all selected knowledge"
          :data="outputData"
        />
      </div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>
