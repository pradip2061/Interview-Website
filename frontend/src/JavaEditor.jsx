import React, { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';


const JavaEditor= () => {
  const [JavaCode, setJavaCode] = useState();
const {questions}=useParams()
  const onChange = (newValue) => {
    setJavaCode(newValue);
  };
  useEffect(()=>{
    setJavaCode(questions)
  },[])

  const options = {
    selectOnLineNumbers: true,
    lineNumbers: 'on',
    automaticLayout: true,
    minimap: { enabled: false },
  };

  return (
    <div className="flex flex-row  p-4">
      {/* Monaco Editor */}
      <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">HTML Code Editor</h2>
        <MonacoEditor
        width="880px"
          height="640px"
          language="Java"
           theme="vs-dark"
          value={JavaCode}
          onChange={onChange}
          options={options}
        />
      </div>

      {/* Live Preview */}
      <div className="w-[37rem]   h-[40rem] p-4 mt-12 bg-gray-100 rounded-md shadow-md">
        <h3 className="text-xl font-semibold text-blue-500">Live Preview</h3>
        <div className="mt-4" dangerouslySetInnerHTML={{ __Java: JavaCode }} />
      </div>
    </div>
  );
};

export default JavaEditor;
