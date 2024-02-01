<script setup lang="ts">
import { markRaw, nextTick, ref, watch } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'

import StartNode from '@/components/vue-flow/nodes/start-node.vue'
import EndNode from '@/components/vue-flow/nodes/end-node.vue'
import LLMNode from '@/components/vue-flow/nodes/LLM-node.vue'
import CodeNode from '@/components/vue-flow/nodes/code-node.vue'
import KnowledgeNode from '@/components/vue-flow/nodes/knowledge-node.vue'
import ApiNode from '@/components/vue-flow/nodes/api-node.vue'
import { Test_data } from '@/lib/constant'

import type { Dimensions, Elements } from '@vue-flow/core'

const elements = ref<Elements>()

const nodeTypes = {
  start: markRaw(StartNode),
  end: markRaw(EndNode),
  LLM: markRaw(LLMNode),
  code: markRaw(CodeNode),
  knowledge: markRaw(KnowledgeNode),
  api: markRaw(ApiNode)
}

const { findNode, nodes, addNodes, addEdges, project, vueFlowRef, onConnect, setNodes, setEdges, setTransform } =
  useVueFlow({
    nodes: [
      {
        id: '1',
        type: 'start',
        label: 'start',
        position: { x: 25, y: 400 }
      },
      {
        id: '2',
        type: 'end',
        label: 'end',
        position: { x: 1000, y: 400 }
      }
    ]
  })

onConnect((params) => {
  console.log(params)
  addEdges(params)
})

function handleOnDrop(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/vueflow')
  if (type === 'workflow') {
    const { nodes, edges, position, zoom } = Test_data
    const [x = 0, y = 0] = position
    setNodes(nodes)
    setEdges(edges)
    setTransform({ x, y, zoom: zoom || 0 })
    return
  }

  const { left, top } = vueFlowRef.value!.getBoundingClientRect()

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top
  })

  const newNode = {
    id: (nodes.value.length + 1).toString(),
    type,
    position,
    label: `${type} node`,
    data: {
      title: type
    }
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
  <div class="relative h-full w-full" id="main-canvas" @drop="handleOnDrop" @dragover="handleOnDragOver">
    <VueFlow v-model="elements" :node-types="nodeTypes">
      <Controls />
      <Background />
    </VueFlow>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';

#main-canvas {
  --vf-handle: hsl(var(--primary));

  .vue-flow__handle {
    width: 18px;
    height: 18px;
  }
}
</style>
