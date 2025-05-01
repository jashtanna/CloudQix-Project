import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { basicSetup } from 'codemirror';

// editor for writing or uploading json
function JSONEditor({ label, value, onChange }) {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result); // parse uploaded json
        const formatted = JSON.stringify(parsed, null, 2); // beautify it
        onChange(formatted);
      } catch {
        alert('Invalid JSON'); // if user uploades bad json
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="json-editor">
      <label>{label}</label>
      <input type="file" accept=".json" onChange={handleUpload} /> {/* upload json file */}
      <CodeMirror
        value={value}
        height="300px"
        extensions={[basicSetup, json()]}
        onChange={(val) => onChange(val)} // for typing inside the editor
      />
    </div>
  );
}

export default JSONEditor;
