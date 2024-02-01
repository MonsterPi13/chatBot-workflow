<script lang="ts" setup>
import { PropType, ref, watchEffect } from 'vue'
import { ChevronsUpDownIcon, PlusIcon, AlertCircleIcon, MinusCircleIcon } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useNode, useVueFlow } from '@vue-flow/core'

type InputItem = {
  name: string
  type: 'reference' | 'input'
  value: string
}

type Option = {
  groupName: string
  options: {
    label: string
    value: string
  }[]
}

const props = defineProps({
  staticNameKey: {
    type: [String, Array] as PropType<string | Array<string>>,
    default: ''
  }
})

const isOpen = ref(true)
const data = ref<InputItem[]>([])
watchEffect(() => {
  if (props.staticNameKey) {
    if (typeof props.staticNameKey === 'string') {
      data.value.push({
        name: props.staticNameKey,
        type: 'reference',
        value: ''
      })
    } else {
      props.staticNameKey.forEach((key) => {
        data.value.push({
          name: key,
          type: 'reference',
          value: ''
        })
      })
    }
  }
})

const referenceOptions = ref<Option[]>([])

const node = useNode()
const { findNode } = useVueFlow()
watchEffect(() => {
  if (node.connectedEdges && node.connectedEdges.value.length > 0) {
    const filteredEdges = node.connectedEdges.value.filter((item) => item.target === node.id)
    referenceOptions.value = filteredEdges.map((edge) => {
      const node = findNode(edge.source)
      const currentItem: Option = {
        groupName: node?.data.title ?? node?.label,
        options: []
      }

      if (node?.data.output) {
        node?.data.output
          .filter((item: any) => Boolean(item.name))
          .forEach((option: any) => {
            currentItem.options.push({
              label: option.name,
              value: option.name
            })
          })
      } else {
        currentItem.options = []
      }
      return currentItem
    })
  }
})

function handleOnClickAddBtnInInput(e: Event) {
  e.stopPropagation()
  isOpen.value = true
  data.value.push({ name: '', type: 'reference', value: '' })
}

function handleClickDeleteBtnInInput(index: number) {
  data.value.splice(index, 1)
}
</script>

<template>
  <div class="rounded-md bg-muted px-3 py-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>Input</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60">
                    Enter the information that needs to be added to the prompt words, which can be referenced by the
                    prompt words.
                  </p>
                </tooltip-content>
              </tooltip>
            </tooltip-provider>
          </div>
          <Button variant="ghost">
            <plus-icon
              class="h-4 w-4 cursor-pointer text-primary"
              @click="handleOnClickAddBtnInInput"
              v-if="!staticNameKey"
            />
          </Button>
        </div>
      </collapsible-trigger>
      <collapsible-content class="space-y-3 px-3 py-3">
        <div class="flex gap-x-4">
          <Label class="w-3/12 text-sm text-muted-foreground">Name</Label>
          <Label class="w-3/12 text-sm text-muted-foreground">Type</Label>
          <Label class="w-6/12 text-sm text-muted-foreground">Value</Label>
        </div>
        <div class="flex gap-x-4" v-for="(item, index) in data" :key="index">
          <div class="w-3/12">
            <p v-if="staticNameKey">{{ item.name }}</p>
            <Input v-model="item.name" placeholder="Enter name" v-else />
          </div>
          <div class="w-3/12">
            <Select v-model="item.type">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="reference"> Reference </SelectItem>
                  <SelectItem value="input"> Input </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex w-6/12 cursor-pointer items-center gap-x-2">
            <Select v-if="item.type === 'reference'" v-model="item.value">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="(group, index) in referenceOptions" :key="index" v-if="referenceOptions.length > 0">
                  <SelectLabel>{{ group.groupName }}</SelectLabel>
                  <SelectItem v-for="option in group.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </SelectItem>
                </SelectGroup>
                <p class="px-2 text-muted-foreground" v-else>no items</p>
              </SelectContent>
            </Select>
            <Input v-model="item.value" placeholder="Enter value" v-else />
            <minus-circle-icon
              class="h-4 w-4"
              @click="() => handleClickDeleteBtnInInput(index)"
              v-if="!staticNameKey"
            />
          </div>
        </div>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
