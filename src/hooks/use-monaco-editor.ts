import * as monaco from 'monaco-editor'
import { ref, nextTick, onBeforeUnmount } from 'vue'

export function useMonacoEditor(language: string = 'javascript') {
  let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null

  const monacoEditorRef = ref<HTMLElement | null>(null)

  function createEditor(editorOption: monaco.editor.IStandaloneEditorConstructionOptions = {}) {
    if (!monacoEditorRef.value) return
    monacoEditor = monaco.editor.create(monacoEditorRef.value, {
      model: monaco.editor.createModel('', language),
      roundedSelection: true,
      theme: 'vs-dark',
      tabSize: 2,
      autoIndent: 'advanced',
      ...editorOption
    })
    return monacoEditor
  }

  async function formatDoc() {
    await monacoEditor?.getAction('editor.action.formatDocument')?.run()
  }

  function updateVal(val: string) {
    nextTick(() => {
      // if (getOption(monaco.editor.EditorOption.readOnly)) {
      //   updateOptions({ readOnly: false })
      // }
      monacoEditor?.setValue(val)
      setTimeout(async () => {
        await formatDoc()
      }, 10)
    })
  }

  function updateOptions(opt: monaco.editor.IStandaloneEditorConstructionOptions) {
    monacoEditor?.updateOptions(opt)
  }

  function getOption(name: monaco.editor.EditorOption) {
    return monacoEditor?.getOption(name)
  }

  function getEditor() {
    return monacoEditor
  }

  onBeforeUnmount(() => {
    if (monacoEditor) {
      monacoEditor.dispose()
    }
  })

  return {
    monacoEditorRef,
    createEditor,
    getEditor,
    updateVal,
    updateOptions,
    getOption,
    formatDoc
  }
}
