<script lang="ts" setup>
import { ref } from 'vue'
import { ChevronsUpDownIcon, PlusIcon, AlertCircleIcon, MinusCircleIcon } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

type KnowledgeItem = {
  knowledgeId: string
}

const isOpen = ref(true)
const data = ref<{
  relatedKnowledgeArray: KnowledgeItem[]
  maxRecalls: number[]
  minMatchingDegree: number[]
}>({
  relatedKnowledgeArray: [{ knowledgeId: '' }],
  maxRecalls: [3],
  minMatchingDegree: [0.4]
})

const knowledgeOptions = ref([
  {
    label: 'knowledge-base1',
    value: 'knowledge-base1Id1'
  },
  {
    label: 'knowledge-base2',
    value: 'knowledge-base1Id2'
  }
])

function handleOnClickAddBtnInInput(e: Event) {
  e.stopPropagation()
  isOpen.value = true
  data.value.relatedKnowledgeArray.push({
    knowledgeId: ''
  })
}

function handleClickDeleteBtnInInput(index: number) {
  data.value.relatedKnowledgeArray.splice(index, 1)
}
</script>

<template>
  <div class="rounded-md bg-muted px-3 py-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>Knowledge</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60">
                    Select the range of knowledge that needs to be matched, and recall information only from the
                    selected knowledge
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
        <div
          class="flex w-full cursor-pointer items-center gap-x-2"
          v-for="(item, index) in data.relatedKnowledgeArray"
          :key="index"
        >
          <Select v-model="item.knowledgeId">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select knowledge" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="(item, index) in knowledgeOptions" :key="index" v-if="knowledgeOptions.length > 0">
                <SelectItem :key="item.value" :value="item.value">
                  {{ item.label }}
                </SelectItem>
              </SelectGroup>
              <p class="px-2 text-muted-foreground" v-else>no items</p>
            </SelectContent>
          </Select>
          <minus-circle-icon class="h-4 w-4" @click="() => handleClickDeleteBtnInInput(index)" />
        </div>
        <div class="flex gap-x-8">
          <div class="flex w-52 items-center gap-x-1">
            <p class="text-nowrap text-sm text-muted-foreground">Maximum number of recalls</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60">
                    The maximum number of paragraphs returned to the model from knowledge. The larger the number, the
                    more content is returned.
                  </p>
                </tooltip-content>
              </tooltip>
            </tooltip-provider>
          </div>
          <Slider v-model="data.maxRecalls" :max="10" :min="1" :step="1" />
          <p class="w-8">
            {{ data.maxRecalls?.[0] }}
          </p>
        </div>
        <div class="flex gap-x-8">
          <div class="flex w-52 items-center gap-x-1">
            <p class="text-nowrap text-sm text-muted-foreground">Minimum matching degree</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60">
                    Select paragraphs according to the set matching degree and return it to the model. Content with a
                    matching degree lower that the set will not be recalled.
                  </p>
                </tooltip-content>
              </tooltip>
            </tooltip-provider>
          </div>
          <Slider v-model="data.minMatchingDegree" :max="0.99" :min="0.01" :step="0.1" />
          <p class="w-8">
            {{ data.minMatchingDegree?.[0] }}
          </p>
        </div>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
