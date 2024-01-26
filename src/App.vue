<script setup lang="ts">
import { X, FilePenLineIcon, CheckCircle2Icon, GhostIcon, CopyPlusIcon } from 'lucide-vue-next'
import Button from './components/ui/button/Button.vue'
</script>

<template>
  <div class="absolute bottom-0 left-0 right-0 top-0">
    <div class="relative flex h-full w-full flex-col">
      <header class="h-16 border-b border-gray-200 px-4 py-3">
        <div class="flex items-center justify-between">
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
      <main class="flex-1"></main>
    </div>
  </div>
</template>
