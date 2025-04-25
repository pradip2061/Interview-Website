import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const MonacoEditorComponent = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');

  // Function to handle editor change (capture the code)
  const handleEditorChange = (value) => {
    setCode(value);
  };

  // Function to execute JavaScript code and display console output in the frontend
  const handleRunCode = () => {
    if (language === 'javascript') {
      try {
        // Redirect console output to capture console.log
        const originalLog = console.log;
        console.log = (message) => setOutput((prevOutput) => prevOutput + message + '\n');

        // Execute JavaScript code
        const result = new Function(code)(); // Executes the code in the global context

        // Reset console.log after execution
        console.log = originalLog;

        // Display the result if there's any
        if (result !== undefined) {
          setOutput((prevOutput) => prevOutput + result + '\n');
        }
      } catch (error) {
        setOutput(`Error executing code: ${error.message}`);
      }
    } else if (language === 'python') {
      // Example: Using Brython to run Python in the browser (with a JS-Python interpreter)
      try {
        // Include Brython or another JS Python interpreter to evaluate Python code
        // For simplicity, we won't actually import Brython, but you can use it if needed
        // For now, we simulate by showing an error
        setOutput('Python execution is not implemented in this example.');
      } catch (error) {
        setOutput(`Error executing Python code: ${error.message}`);
      }
    }
  };

  // Function to change the editor language
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const clearoutput = ()=>{
    setOutput("")
  }

  return (
    <div style={{ height: '500px' }}>
      <div>
        <select onChange={handleLanguageChange} value={language} style={{ marginBottom: '20px' }}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          {/* You can add more languages here like C++, Java, etc. */}
        </select>
      </div>

      <MonacoEditor
        height="400px"
        language={language}
        value={code}
        onChange={handleEditorChange} // Capture changes in the editor
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          minimap: { enabled: true },
        }}
      />
      <button onClick={handleRunCode} style={{ marginTop: '20px' }}>
        Run Code
      </button>
      <button onClick={clearoutput} className='bg-red-400'>
        clear
      </button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default MonacoEditorComponent;
