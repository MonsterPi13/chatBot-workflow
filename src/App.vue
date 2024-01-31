<script setup lang="ts">
import { X, FilePenLineIcon, CheckCircle2Icon, GhostIcon, CopyPlusIcon, PlusIcon } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import mainCanvas from '@/components/main-canvas.vue'

function handleOnDragStart(event: DragEvent, nodeType: any) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}
</script>

<template>
  <div class="absolute bottom-0 left-0 right-0 top-0">
    <div class="relative flex h-full w-full flex-col">
      <header class="h-20 border-b border-gray-200 px-4 py-3">
        <div class="flex h-full items-center justify-between">
          <div class="flex gap-x-3">
            <Button variant="ghost">
              <X class="h-4 w-4" />
            </Button>
            <div class="flex items-center gap-x-1">
              <GhostIcon class="w-12 text-red-200" />
              <div class="flex flex-col">
                <div class="flex items-center gap-x-3">
                  <p class="text-bold">workflow-name</p>
                  <Button variant="ghost" size="sm" class="flex h-auto gap-x-1 px-1">
                    <FilePenLineIcon class="w-3" />
                    <span class="text-primary"> Edit </span>
                  </Button>
                  <div class="flex items-center gap-x-1 px-0">
                    <CheckCircle2Icon class="w-3 text-green-500" />
                    <span class="text-xs text-gray-400">Published</span>
                  </div>
                </div>

                <div class="flex text-sm text-gray-400">
                  <span class="mr-2">workflow-name</span>
                  |
                  <span class="ml-2">Auto-saved 15:15:15</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-x-3">
            <Button variant="outline" size="sm"> Display Last Run </Button>
            <Button variant="outline" size="sm" class="text-blue-800"> Test Run </Button>
            <Button variant="default" size="sm"> Publish </Button>
            <Button variant="outline" size="sm">
              <CopyPlusIcon class="h-4 w-4" />
            </Button>
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
              <scroll-area class="h-full w-full">
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
              </scroll-area>
            </tabs-content>

            <tabs-content value="plugins"> plugins </tabs-content>

            <tabs-content value="workflows"> workflows </tabs-content>
          </tabs>
        </div>
        <div class="relative h-full flex-1 overflow-hidden">
          <main-canvas />
        </div>
      </main>
    </div>
  </div>
</template>
