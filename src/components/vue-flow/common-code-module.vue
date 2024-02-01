<script lang="ts" setup>
import { ref } from 'vue'
import { ChevronsUpDownIcon, SquarePenIcon } from 'lucide-vue-next'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import MonacoEditor from '../monaco-editor.vue'

const isOpen = ref(true)

const code = ref(
  'async function main({ params }: Args): Promise<Output> {\n    const ret = {\n        "key0": params.input + params.input,\n                      };\n    return ret;\n}'
)
</script>

<template>
  <div class="rounded-md bg-muted px-3 py-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>Code</p>
          </div>
          <Dialog>
            <DialogTrigger @click="(e: Event) => e.stopPropagation()">
              <Button variant="ghost" class="flex items-center gap-x-1 text-primary">
                <SquarePenIcon class="h-4 w-4" />
                <p>Edit in IDE</p>
              </Button>
            </DialogTrigger>
            <DialogContent class="w-full! max-w-full! h-full">
              <monaco-editor v-model="code" />
            </DialogContent>
          </Dialog>
        </div>
      </collapsible-trigger>
      <collapsible-content class="space-y-3 px-3 py-3">
        <div class="h-96 w-full">
          <monaco-editor v-model="code" :editor-option="{ readOnly: true }" />
        </div>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
