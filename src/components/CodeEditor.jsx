import Editor from "@monaco-editor/react";
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from "react";

function CodeEditor({ code, setCode, readOnly = false }) {
  const [localCode, setLocalCode] = useState(code.substring(0, 65536));
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    
    editor.onDidChangeModelContent(() => {
      const currentValue = editor.getValue();
      if (currentValue.length > 65536) {
        const limitedValue = currentValue.substring(0, 65536);
        
        if (limitedValue !== currentValue) {
          const position = editor.getPosition();
          
          editor.setValue(limitedValue);
          
          if (position) {
            const column = Math.min(position.column, limitedValue.length + 1);
            editor.setPosition({ lineNumber: position.lineNumber, column: column });
          }
          
          setLocalCode(limitedValue);
          setCode && setCode(limitedValue);
        }
      }
    });
  };

  useEffect(() => {
    if (code !== localCode) {
      const limitedValue = code.substring(0, 65536);
      setLocalCode(limitedValue);
      setCode && setCode(limitedValue);
    }
  }, [code, setCode, localCode]);

  const handleChange = (value) => {
    if (!setCode) return;
    
    const limitedValue = value.substring(0, 65536);
    setLocalCode(limitedValue);
    setCode(limitedValue);
  };

  return (
    <div>
      <Editor
        height="380px"
        width="100%"
        language="javascript"
        value={localCode}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{ readOnly }}
      />
      <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
        {localCode.length}/65536 characters
      </div>
    </div>
  );
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func,
  readOnly: PropTypes.bool
};

export default CodeEditor;