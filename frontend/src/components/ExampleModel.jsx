import React from 'react'
import { Copy } from 'lucide-react';
const ExampleModel = ({example}) => {
  const handleCopy = async () => {
    try {
      const combinedText = `${example?.theory ?? ''}\n\n${example?.code ?? ''}`;
      await navigator.clipboard.writeText(combinedText);
      alert('Copied!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  return (
    <div className=' bg-gray-200 w-[90%] p-5 mt-3 ml-4 pt-3'>
    <Copy 
        size={30} 
        style={{ cursor: 'pointer' }} 
        onClick={handleCopy} 
        title="Copy to clipboard"
        className=' ml-70 lg:ml-220 pb-3 text-black'
      />
       {
        example.theory &&  <h1>{example.theory || "no data found!"}</h1>
       }
        {
            example.code && <div className='border-l-5 border-indigo-500 whitespace-pre-wrap bg-white overflow-x-auto flex pl-5 w-[100%] py-5 mt-3'>
        {
         example.code || "no data found!"
        }
        </div>
        }
    </div>
  )
}

export default React.memo(ExampleModel)