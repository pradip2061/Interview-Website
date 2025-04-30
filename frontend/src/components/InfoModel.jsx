import { useEffect, useState } from 'react';

export default function InfoModal() {
  const [show, setShow] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setShow(false)
    },10000)
  },[])

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">ℹ️ Upcoming Features</h2>
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>🏠 A Landing Page</li>
          <li>✅ upcoming languages:</li>
          <li className='ml-2'> 1.python</li>
          <li className='ml-2'> 2.JavaScript</li>
          <li className='ml-2'> 3.React</li>
          <li className='ml-2'> 4.Nodejs</li>
          <li>🔍 update more searching functionality</li>
          <li>📱 updating the css for mobile View</li>
        </ul>
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
          aria-label='X'
        >
          ×
        </button>
      </div>
    </div>
  );
}
