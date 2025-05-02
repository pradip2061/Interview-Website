import React, { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';

const PythonEditor = () => {
  const [pythonCode, setPythonCode] = useState('');
  const [pyodide, setPyodide] = useState(null);
  const [output, setOutput] = useState('');
  const { questions } = useParams();

  // Decode question param to prefill editor
  useEffect(() => {
    if (questions) {
      try {
        const decoded = decodeURIComponent(questions);
        setPythonCode(decoded);
      } catch (err) {
        console.error("Invalid question param:", err);
        setPythonCode('');
      }
    }
  }, [questions]);

  // Load Pyodide once
  useEffect(() => {
    const loadPyodide = async () => {
      const pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });
      setPyodide(pyodideInstance);
    };
    loadPyodide();
  }, []);

  // Run Python code when button is clicked
  const runPythonCode = async () => {
    if (pyodide) {
      try {
        const result = await pyodide.runPythonAsync(pythonCode);
        setOutput(result?.toString() || ''); // Show output
      } catch (err) {
        setOutput(`❌ Error: ${err.message}`);
      }
    }
  };

  const options = {
    selectOnLineNumbers: true,
    lineNumbers: 'on',
    automaticLayout: true,
    minimap: { enabled: false },
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4">
      {/* Editor */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Python Code Editor</h2>
        <div className="w-full h-[400px] sm:h-[500px] lg:h-[640px]">
          <MonacoEditor
            height="100%"
            width="100%"
            language="python"
            theme="vs-dark"
            value={pythonCode}
            onChange={(value) => setPythonCode(value)}
            options={options}
          />
        </div>
        <button
          onClick={runPythonCode}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Run Code
        </button>
      </div>

      {/* Output */}
      <div className="w-full lg:w-1/2 bg-gray-100 rounded-md shadow-md p-4">
        <h3 className="text-xl font-semibold text-blue-500">Output</h3>
        <div className="mt-4 h-[400px] sm:h-[500px] lg:h-[640px] overflow-auto border border-gray-300 p-2 bg-white rounded whitespace-pre-wrap">
          {output}
        </div>
      </div>
    </div>
  );
};

export default PythonEditor;
