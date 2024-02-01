<script lang="ts" setup>
import { ref } from 'vue'
import { ChevronsUpDownIcon, MinusCircleIcon } from 'lucide-vue-next'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export interface Input {
  name: string
  type: string
  description: string
  isRequired: boolean
}

const props = defineProps<{ data: Input }>()
const emit = defineEmits(['click-delete'])

const isOpen = ref(true)
const form = ref(props.data)

function handleClickDeleteBtn() {
  emit('click-delete')
}
</script>

<template>
  <div class="rounded-md bg-muted p-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>{{ form.name }}</p>
          </div>
          <Button variant="ghost">
            <minus-circle-icon class="h-4 w-4 cursor-pointer" @click="handleClickDeleteBtn" />
          </Button>
        </div>
      </collapsible-trigger>
      <collapsible-content class="space-y-3 px-3 py-3">
        <Label> Name </Label>
        <Input v-model="form.name" placeholder="Enter name" :maxlength="20" />

        <Label>Type</Label>
        <Select>
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="String"> String </SelectItem>
              <SelectItem value="Integer"> Integer </SelectItem>
              <SelectItem value="Boolean"> Boolean </SelectItem>
              <SelectItem value="Number"> Number </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label>Description</Label>
        <Textarea placeholder="Enter variable description" />

        <div class="flex justify-between">
          <Label> Required </Label>
          <Switch :checked="form.isRequired" aria-readonly />
        </div>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
