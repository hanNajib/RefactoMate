import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode, readOnly = false }) {
  return (
    <Editor
      height="380px"
      width="100%"
      language="javascript"
      value={code}
      onChange={(value) => setCode && setCode(value)}
      theme="vs-dark" // Bisa ganti jadi 'light' atau lainnya
      options={{ readOnly }}
    />
  );
}

export default CodeEditor;
