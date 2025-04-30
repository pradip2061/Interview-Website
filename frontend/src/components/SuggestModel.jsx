import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../ContextApi';

export default function SuggestModel({item}) {
  const [show, setShow] = useState(true);
  const{setSearch,suggestions,setSuggestions}=useContext(SearchContext)

  const handle =(results)=>{
    setSearch(results)
    setSuggestions("")
  }
  return (
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">ℹ️ Did you mean that?</h2>
        <div className="text-gray-700 space-y-2 text-sm">
        {
  item?.length > 0 ? (
    item.map((results,index) => (
      <div key={index} className='hover:underline' onClick={()=>handle(results.item)}>{results.item}</div>
    ))
  ) : (
    <div>No data found</div>
  )
}
        </div>
        <button
          onClick={()=>setSuggestions("")}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
           aria-label='X'
        >
          ×
        </button>
      </div>
    </div>
  )
}
