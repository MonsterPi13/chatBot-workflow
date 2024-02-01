export const Test_data = {
  nodes: [
    {
      type: 'LLM',
      data: { title: 'LLM', output: [{ name: 'output1', type: '', description: 'balabala' }] },
      events: {},
      id: '1',
      position: { x: -413.62574973269915, y: 110.25705825948319 },
      label: 'LLM node'
    },
    {
      type: 'code',
      data: { title: 'code', output: [{ name: 'key0', type: 'String', description: 'just for test' }] },
      events: {},
      id: '2',
      position: { x: 262.70018202243125, y: -104.44788021583054 },
      label: 'code node'
    },
    {
      type: 'knowledge',
      data: { title: 'knowledge', output: [{ name: 'output' }] },
      events: {},
      id: '3',
      position: { x: 939.64275630104, y: 51.1990333957562 },
      label: 'knowledge node'
    }
  ],
  edges: [
    {
      sourceHandle: '1__handle-right',
      targetHandle: '2__handle-left',
      type: 'default',
      source: '1',
      target: '2',
      data: {},
      events: {},
      id: 'vueflow__edge-11__handle-right-22__handle-left',
      sourceX: 200.40522146581822,
      sourceY: 488.25689832215323,
      targetX: 253.70017309626013,
      targetY: 364.55198874414043
    },
    {
      sourceHandle: '2__handle-right',
      targetHandle: '3__handle-left',
      type: 'default',
      source: '2',
      target: '3',
      data: {},
      events: {},
      id: 'vueflow__edge-22__handle-right-33__handle-left',
      sourceX: 871.6999267177814,
      sourceY: 364.55198874414043,
      targetX: 930.6427473748689,
      targetY: 342.1989975362437
    }
  ],
  position: [-151.90460217317343, 183.68497815279642],
  zoom: 0.5802807591037111,
  viewport: { x: -151.90460217317343, y: 183.68497815279642, zoom: 0.5802807591037111 }
}
