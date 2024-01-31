<script lang="ts" setup>
import { ref } from 'vue'
import { AlertCircleIcon } from 'lucide-vue-next'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectGroup } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const data = ref({
  model: '',
  temperature: ''
})
</script>

<template>
  <div class="grid grid-cols-2 divide-x-2 rounded-md bg-muted px-3 py-4">
    <div class="grid w-full gap-1.5 pr-4">
      <Label for="Model">Model</Label>
      <Select id="Model" v-model="data.model">
        <select-trigger>
          <select-value placeholder="select a model" />
        </select-trigger>
        <select-content>
          <select-group>
            <select-item value="GPT-3.5(16K)"> GPT-3.5(16K) </select-item>
            <select-item value="GPT-4(8K)"> GPT-4(8K) </select-item>
            <select-item value="GPT-4 Turbo(128K)"> GPT-4 Turbo(128K) </select-item>
          </select-group>
        </select-content>
      </Select>
    </div>

    <div class="grid w-full gap-1.5 pl-4">
      <Label for="Temperature" class="flex items-center gap-x-2">
        Temperature
        <tooltip-provider>
          <tooltip>
            <tooltip-trigger>
              <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
            </tooltip-trigger>
            <tooltip-content>
              <p class="max-w-60">
                Used to control the randomness of large models generating text. When set higher, the model will generate
                more diversified text, increasing uncertainty; when set lower, the model will generate high probability
                words, reducing uncertainty.
              </p>
            </tooltip-content>
          </tooltip>
        </tooltip-provider>
      </Label>
      <Input v-model="data.temperature" />
    </div>
  </div>
</template>
