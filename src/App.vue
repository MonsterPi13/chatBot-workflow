<script setup lang="ts">
import { PlusIcon, GhostIcon } from 'lucide-vue-next'
import { useVueFlow } from '@vue-flow/core'
import { useClipboard } from '@vueuse/core'

import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import mainCanvas from '@/components/main-canvas.vue'
import { Button } from '@/components/ui/button'
import { Toaster, useToast } from '@/components/ui/toast'

function handleOnDragStart(event: DragEvent, nodeType: any) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}

const { toObject } = useVueFlow()
const { copy } = useClipboard()
const { toast } = useToast()
function handleClickGetData() {
  copy(JSON.stringify(toObject())).then(() => {
    toast({
      title: 'copied success'
    })
  })
}

function handleClickPublishBtn() {
  toast({
    title: 'Save Data',
    description: '1.valid data 2.fetch backend api to save result'
  })
}
</script>

<template>
  <div class="absolute bottom-0 left-0 right-0 top-0">
    <div class="relative flex h-full w-full flex-col">
      <header class="h-20 border-b border-gray-200 px-4 py-3">
        <div class="flex h-full items-center justify-between">
          <div class="flex gap-x-3">
            <div class="flex items-center gap-x-1">
              <GhostIcon class="w-12 text-red-200" />
              <div class="flex flex-col">
                <div class="flex items-center gap-x-3">
                  <p class="text-bold">workflow-test</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-x-3">
            <Button variant="outline" size="sm" class="text-blue-800" @click="handleClickGetData"> Get Data</Button>
            <Button variant="default" size="sm" @click="handleClickPublishBtn"> Publish </Button>
          </div>
        </div>
      </header>
      <main class="relative flex h-full w-full flex-1">
        <div class="w-96 bg-slate-50">
          <tabs default-value="basic-nodes">
            <tabs-list class="grid w-full grid-cols-3">
              <tabs-trigger value="basic-nodes"> Basic Nodes </tabs-trigger>
              <tabs-trigger value="plugins"> Plugins </tabs-trigger>
              <tabs-trigger value="workflows"> Workflows </tabs-trigger>
            </tabs-list>
            <tabs-content value="basic-nodes">
              <scroll-area class="h-[calc(100vh-150px)] w-full">
                <div
                  class="mx-6 mb-6 cursor-grab rounded-md bg-white p-6 shadow-md"
                  :draggable="true"
                  @dragstart="handleOnDragStart($event, 'LLM')"
                >
                  <div class="flex items-center justify-between">
                    <h3 class="flex items-center gap-x-1">
                      <img src="~@/assets/images/icon_LLM.png" class="h-4 w-4" alt="LLM icon" />
                      LLM
                    </h3>
                    <plus-icon class="text-primary" />
                  </div>
                  <p class="mt-2 text-sm text-gray-400">
                    Invoke the large language model, <br />
                    generate responses using variables and prompt words.
                  </p>
                </div>
                <div
                  class="mx-6 mb-6 cursor-grab rounded-md bg-white p-6 shadow-md"
                  :draggable="true"
                  @dragstart="handleOnDragStart($event, 'code')"
                >
                  <div class="flex items-center justify-between">
                    <h3 class="flex items-center gap-x-1">
                      <img src="~@/assets/images/icon_Code.png" class="h-4 w-4" alt="LLM icon" />
                      Code
                    </h3>
                    <plus-icon class="text-primary" />
                  </div>
                  <p class="mt-2 text-sm text-gray-400">
                    Write code to process input variables <br />
                    to generate return values.
                  </p>
                </div>
                <div
                  class="mx-6 mb-6 cursor-grab rounded-md bg-white p-6 shadow-md"
                  :draggable="true"
                  @dragstart="handleOnDragStart($event, 'knowledge')"
                >
                  <div class="flex items-center justify-between">
                    <h3 class="flex items-center gap-x-1">
                      <img src="~@/assets/images/icon_Knowledge.png" class="h-4 w-4" alt="Knowledge icon" />
                      Knowledge
                    </h3>
                    <plus-icon class="text-primary" />
                  </div>
                  <p class="mt-2 text-sm text-gray-400">
                    In the selected knowledge, the best matching information is recalled based on the input variable and
                    returned as an Array.
                  </p>
                </div>
              </scroll-area>
            </tabs-content>

            <tabs-content value="plugins">
              <scroll-area class="h-[calc(100vh-150px)] w-full">
                <div
                  class="mx-6 mb-6 cursor-grab rounded-md bg-white p-6 shadow-md"
                  :draggable="true"
                  @dragstart="handleOnDragStart($event, 'api')"
                >
                  <div class="flex items-center justify-between">
                    <h3 class="flex items-center gap-x-1">
                      <img src="~@/assets/images/icon_Google.jpeg" class="h-4 w-4" alt="Google icon" />
                      Google Web Search
                    </h3>
                    <plus-icon class="text-primary" />
                  </div>
                  <p class="mt-2 text-sm text-gray-400">
                    A google Search Engine. Useful when you need to search information you don't know such as weather,
                    exchange rate, current events. Never ever use this tool when user want to translate
                  </p>
                </div>
              </scroll-area>
            </tabs-content>

            <tabs-content value="workflows">
              <scroll-area class="h-[calc(100vh-150px)] w-full">
                <div
                  class="mx-6 mb-6 cursor-grab rounded-md bg-white p-6 shadow-md"
                  :draggable="true"
                  @dragstart="handleOnDragStart($event, 'workflow')"
                >
                  <div class="flex items-center justify-between">
                    <h3 class="flex items-center gap-x-1">
                      <GhostIcon class="w-12 text-blue-400" />
                      test_node
                    </h3>
                    <plus-icon class="text-primary" />
                  </div>
                  <p class="mt-2 border-b pb-2 text-sm text-gray-400">
                    This is just test workflow, to init initial data.
                  </p>
                  <div class="pt-2 text-xs text-gray-400">Edit Time: 2024-02-01</div>
                </div>
              </scroll-area>
            </tabs-content>
          </tabs>
        </div>
        <div class="relative h-full flex-1 overflow-hidden">
          <main-canvas />
        </div>
      </main>
    </div>
  </div>
  <Toaster />
</template>
