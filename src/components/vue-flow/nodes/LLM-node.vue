<script setup lang="ts">
import { ref } from 'vue'
import { MoreHorizontalIcon } from 'lucide-vue-next'
import { Handle, Position } from '@vue-flow/core'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/menubar'
import { Input } from '@/components/ui/input'

import CommonBasicModule from '../common-basic-module.vue'
import CommonInputModule from '../common-input-module.vue'
import CommonPromptModule from '../common-prompt-module.vue'
import commonOutputModule from '../common-output-module.vue'

import { LLMNodeData, LLMNodeEvents } from './index'

import type { NodeProps } from '@vue-flow/core'

const props = defineProps<NodeProps<LLMNodeData, LLMNodeEvents>>()

const title = ref(props.data.title)

const isEditTitle = ref(false)
</script>

<template>
  <div class="rounded-sm border border-gray-200 bg-white p-3 shadow-md">
    <Handle type="target" :position="Position.Left" />
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between">
        <div class="flex gap-x-2">
          <img src="~@/assets/images/icon_LLM.png" class="mt-1 h-4 w-4" alt="LLM icon" />
          <div class="flex flex-col gap-y-1">
            <Input v-model="title" class="h-5" v-if="isEditTitle" />
            <h3 class="text-base" v-else>{{ title }}</h3>

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

      <div class="grid gap-y-3">
        <common-basic-module />
        <common-input-module />
        <common-prompt-module />
        <common-output-module />
      </div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>
