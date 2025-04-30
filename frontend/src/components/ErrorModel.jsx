import { useState } from "react"


export default function ErrorModel({item}) {
const[show,setShow]=useState(true)
  return (
<>
    {
        show &&   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{item}</h2>
        <button
          onClick={()=>setShow(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
          aria-label="X"
        >
          × 
        </button>
      </div>
    </div>
    }
</>
  )
}
