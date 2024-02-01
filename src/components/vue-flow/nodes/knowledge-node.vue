<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MoreHorizontalIcon } from 'lucide-vue-next'
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/menubar'
import { Input } from '@/components/ui/input'

import CommonInputModule from '../common-input-module.vue'
import CommonKnowledgeModule from '../common-knowledge-module.vue'
import StaticOutputModule from '../static-output-module.vue'

import { LLMNodeData, LLMNodeEvents } from './index'

import type { NodeProps } from '@vue-flow/core'

const props = defineProps<NodeProps<LLMNodeData, LLMNodeEvents>>()

const title = ref(props.data.title)
const isEditTitle = ref(false)

const node = useNode()
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

const { removeNodes, nodes, addNodes } = useVueFlow()

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
  <div class="rounded-sm border border-gray-200 bg-white p-3 shadow-md">
    <Handle type="target" :position="Position.Left" />
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between">
        <div class="flex gap-x-2">
          <img src="~@/assets/images/icon_Knowledge.png" class="mt-1 h-4 w-4" alt="Knowledge icon" />
          <div class="flex flex-col gap-y-1">
            <Input v-model="title" class="h-5" v-if="isEditTitle" @blur="() => (isEditTitle = false)" />
            <h3 class="text-base" v-else>{{ title }}</h3>

            <p class="text-sm text-gray-500">Knowledge</p>
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
              <menubar-item @click="isEditTitle = true"> Rename </menubar-item>
            </menubar-content>
          </menubar-menu>
        </Menubar>
      </div>

      <span class="text-sm text-gray-500"
        >In the selected knowledge, the best matching information is recalled based on the input variable and returned
        as an Array.</span
      >

      <div class="grid gap-y-3">
        <common-input-module static-name-key="Query" />
        <common-knowledge-module />
        <static-output-module
          tip="The output list is the information that best match the input parameters, recalled from all selected knowledge"
          :data="[
            {
              label: 'outputList',
              type: 'Array<Object>',
              children: [
                {
                  label: 'output',
                  type: 'string'
                }
              ]
            }
          ]"
        />
      </div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>
