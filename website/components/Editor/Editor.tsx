import MonacoEditor, { BeforeMount, EditorProps, Monaco } from "@monaco-editor/react"

let _installed = false
const installTypes = (monaco: Monaco) => {
  if (_installed) return
  _installed = true
  // extra libraries
  var libSource = ["declare namespace React {", "    export type FC<T> = any", "}"].join("\n")
  var libUri = "ts:filename/react.d.ts"
  monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri)
  // When resolving definitions and references, the editor will try to use created models.
  // Creating a model for the library allows "peek definition/references" commands to work with the library.
  monaco.editor.createModel(libSource, "typescript", monaco.Uri.parse(libUri))
}

const Editor: React.FC<EditorProps> = (props) => {
  const beforeMount: BeforeMount = (monaco) => {
    installTypes(monaco)
  }

  return (
    <MonacoEditor
      {...props}
      height="70vh"
      theme="vs-dark"
      language="typescript"
      options={{
        lineNumber: "on",
        roundedSelection: true,
        minimap: { enabled: false },
        ...props.options,
      }}
      beforeMount={beforeMount}
    ></MonacoEditor>
  )
}

export default Editor
