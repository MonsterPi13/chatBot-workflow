<script setup lang="ts">
import { ref } from 'vue'
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/menubar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { MoreHorizontalIcon } from 'lucide-vue-next'

import { LLMNodeData, LLMNodeEvents } from './index'

import type { NodeProps } from '@vue-flow/core'

const { findNode } = useVueFlow()
const props = defineProps<NodeProps<LLMNodeData, LLMNodeEvents>>()

const form = ref({
  title: '',
  model: '',
  temperature: ''
})
console.log('ssss')

function updateNode(title: string) {
  // TODO: update node data
  isEditTitle.value = false
}

const isEditTitle = ref(false)
</script>

<template>
  <div class="rounded-sm border border-gray-200 bg-white p-3 shadow-md">
    <Handle type="target" :position="Position.Left" />
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between">
        <div class="flex gap-x-2">
          <img src="@/assets/images/icon_LLM.png" class="mt-1 h-4 w-4" alt="LLM icon" />
          <div class="flex flex-col gap-y-1">
            <Input v-model="form.title" class="h-5" v-if="isEditTitle" @blur="updateNode" />
            <h3 class="text-base" v-else>{{ form.title }}</h3>

            <p class="text-sm text-gray-500">LLM</p>
          </div>
        </div>

        <Menubar class="border-none">
          <menubar-menu>
            <menubar-trigger>
              <more-horizontal-icon />
            </menubar-trigger>
            <menubar-content>
              <menubar-item> Duplicated </menubar-item>
              <menubar-item> Delete </menubar-item>
              <menubar-item @click="isEditTitle = true"> Rename </menubar-item>
            </menubar-content>
          </menubar-menu>
        </Menubar>
      </div>

      <span class="text-sm text-gray-500"
        >Invoke the large language model, generate responses using variables and prompt words.</span
      >

      <Tabs default-value="single-time">
        <tabs-list class="grid w-full grid-cols-2">
          <tabs-trigger value="single-time"> Single time </tabs-trigger>
          <tabs-trigger value="batch-processing"> Batch processing </tabs-trigger>
        </tabs-list>
        <tabs-content value="single-time">
          <div class="flex divide-x-2 bg-gray-400"></div>
        </tabs-content>

        <tabs-content value="batch-processing"> Batch Processing </tabs-content>
      </Tabs>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>
