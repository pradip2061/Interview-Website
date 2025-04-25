import React, { useContext, useState } from 'react';
import { X } from 'lucide-react';
import { SearchContext } from '../ContextApi';


const SideBar=({subitem}) => {

    const[onclose,setOnClose]=useState(true)
   const{subtopic,setSubTopic,setCloseSideBar}=useContext(SearchContext)
   console.log(subitem)
  return (
    <>
      <div className="w-64 bg-white shadow-lg h-[40rem] overflow-y-auto fixed lg:relative ">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800"></h3>
        <button
          onClick={()=>setCloseSideBar(false)}
          className="p-1 hover:bg-gray-200 rounded-full lg:hidden">
          <X className="h-5 w-5 text-black" />
        </button>
      </div>
      <div className="p-4 ">
        <ul className="space-y-2">
          {subitem?.map((topic) => (
            <li
              key={topic}
              className={`p-2 ${subtopic === topic.toLowerCase().replace(/\s+/g,"")?'bg-indigo-500':'bg-white'} hover:bg-gray-100 rounded cursor-pointer transition-colors`}
              onClick={() => setSubTopic(topic.toLowerCase().replace(/\s+/g, ""))}
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default SideBar;