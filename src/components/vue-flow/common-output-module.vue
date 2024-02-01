<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { useNode } from '@vue-flow/core'
import { ChevronsUpDownIcon, PlusIcon, AlertCircleIcon, MinusCircleIcon } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type Output = {
  name: string
  type: string
  description: string
}

const props = defineProps({
  data: {
    type: Object as PropType<Output[]>,
    default: () => []
  }
})

const typesOptions = [
  {
    value: 'String',
    label: 'String'
  },
  {
    value: 'Integer',
    label: 'Integer'
  },
  {
    value: 'Boolean',
    label: 'Boolean'
  },
  {
    value: 'Number',
    label: 'Number'
  },
  {
    value: 'Object',
    label: 'Object'
  },
  {
    value: 'Array<String>',
    label: 'Array<String>'
  },
  {
    value: 'Array<Integer>',
    label: 'Array<Integer>'
  },
  {
    value: 'Array<Boolean>',
    label: 'Array<Boolean>'
  },
  {
    value: 'Array<Number>',
    label: 'Array<Number>'
  },
  {
    value: 'Array<Object>',
    label: 'Array<Object>,'
  }
]

const node = useNode()

const isOpen = ref(false)
const data = ref<Output[]>(props.data)
if (props.data.length !== 0) {
  isOpen.value = true
  node.node.data = {
    ...node.node.data,
    output: data
  }
}

function handleOnClickAddBtnInInput(e: Event) {
  e.stopPropagation()
  isOpen.value = true
  data.value.push({ name: '', type: '', description: '' })
  node.node.data = {
    ...node.node.data,
    output: data
  }
}

function handleClickDeleteBtnInInput(index: number) {
  data.value.splice(index, 1)
  node.node.data = {
    ...node.node.data,
    output: data
  }
}
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
                    Enter the information that needs to be added to the prompt words, which can be referenced by the
                    prompt words.
                  </p>
                </tooltip-content>
              </tooltip>
            </tooltip-provider>
          </div>
          <Button variant="ghost">
            <plus-icon class="h-4 w-4 cursor-pointer text-primary" @click="handleOnClickAddBtnInInput" />
          </Button>
        </div>
      </collapsible-trigger>
      <collapsible-content class="space-y-3 px-3 py-3">
        <div class="flex gap-x-4">
          <Label class="w-4/12 text-sm text-muted-foreground">Name</Label>
          <Label class="w-2/12 text-sm text-muted-foreground">Type</Label>
          <Label class="w-6/12 text-sm text-muted-foreground">Description</Label>
        </div>
        <div class="flex gap-x-4" v-for="(item, index) in data" :key="index">
          <div class="w-3/12">
            <Input v-model="item.name" placeholder="Enter name" />
          </div>
          <div class="w-3/12">
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="option in typesOptions" :value="option.value" :key="option.value">
                    {{ option?.label }}</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex w-6/12 cursor-pointer items-center gap-x-2">
            <Input v-model="item.description" placeholder="Describe what the variable is used for" />
            <minus-circle-icon class="h-4 w-4 text-primary" @click="() => handleClickDeleteBtnInInput(index)" />
          </div>
        </div>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
