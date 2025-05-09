import React, { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';

const HtmlEditor = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const { questions } = useParams();

  const onChange = (newValue) => {
    setHtmlCode(newValue);
  };

  useEffect(() => {
    if (questions) {
      try {
        const decoded = decodeURIComponent(questions);
        setHtmlCode(decoded);
      } catch (err) {
        console.error("Invalid question param:", err);
        setHtmlCode(''); // fallback
      }
    }
  }, [questions]);
  

  const options = {
    selectOnLineNumbers: true,
    lineNumbers: 'on',
    automaticLayout: true,
    minimap: { enabled: false },
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4">
      {/* Monaco Editor */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">HTML Code Editor</h2>
        <div className="w-full h-[400px] sm:h-[500px] lg:h-[640px]">
          <MonacoEditor
            height="100%"
            width="100%"
            language="html"
            theme="vs-dark"
            value={htmlCode}
            onChange={onChange}
            options={options}
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-full lg:w-1/2 bg-gray-100 rounded-md shadow-md p-4">
        <h3 className="text-xl font-semibold text-blue-500">Live Preview</h3>
        <div
          className="mt-4 h-[400px] sm:h-[500px] lg:h-[640px] overflow-auto border border-gray-300 p-2 bg-white rounded"
          dangerouslySetInnerHTML={{ __html: htmlCode }}
        />
      </div>
    </div>
  );
};

export default HtmlEditor;
