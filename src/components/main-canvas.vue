<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'

import LLMNode from '@/components/vue-flow/nodes/LLM.vue'

import type { Dimensions, Elements } from '@vue-flow/core'

const elements = ref<Elements>()

let id = 0
function getId() {
  return `dndnode_${id++}`
}

const { findNode, addNodes, project, vueFlowRef } = useVueFlow({
  nodes: [
    { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
    { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
    { id: '3', type: 'output', label: 'Node 3', position: { x: 400, y: 200 } },
    {
      id: '4',
      type: 'LLM',
      label: 'Node 4',
      position: { x: 400, y: 200 },
      data: {
        title: 'LLM'
      }
    }
  ],
  edges: [
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e1-2', source: '1', target: '2', animated: true }
  ]
})

function handleOnDrop(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/vueflow')

  const { left, top } = vueFlowRef.value!.getBoundingClientRect()

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top
  })

  const newNode = {
    id: getId(),
    type,
    position,
    label: `${type} node`
  }

  addNodes([newNode])

  nextTick(() => {
    const node = findNode(newNode.id)
    const stop = watch(
      () => node!.dimensions,
      (dimensions: Dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0 && node) {
          node.position = {
            x: node.position.x - node.dimensions.width / 2,
            y: node.position.y - node.dimensions.height / 2
          }
          stop()
        }
      },
      { deep: true, flush: 'post' }
    )
  })
}
function handleOnDragOver(event: DragEvent) {
  event.preventDefault()

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}
</script>

<template>
  <div class="relative h-full w-full" @drop="handleOnDrop" @dragover="handleOnDragOver">
    <VueFlow v-model="elements">
      <template #node-LLM="LLMNodeProps">
        <LLMNode v-bind="LLMNodeProps" />
      </template>

      <Controls />
    </VueFlow>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';
</style>
