import React, { useCallback, useState } from 'react'
import ExampleModel from '../../ExampleModel'
import { ChevronRight, ChevronDown } from 'lucide-react';
const Tables = ({questions}) => {
  const [openIndex, setOpenIndex] = useState(null);
    const showexample = useCallback((index) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    },[openIndex])
  console.log(questions,"hello")
  return (
    <div className=' h-[40rem] overflow-y-auto w-[100%] scroll-smooth pb-10'>
    {
      questions?.map((items,index)=>(
        <div key={items?._id}>
        <div className='text-lg font-poppins ml-3 pt-5 text-primary'>{items?.Topic}</div>
    <h1 className='whitespace-pre-wrap p-3 font-poppins'>
      {index+1}. {items?.question}
    </h1>
{ items.category === 'output'?
  <div className=' bg-gray-200 w-[90%] p-5 mt-3 ml-4'>
        <div className='border-l-5 border-indigo-500 whitespace-pre-wrap bg-white overflow-x-auto flex pl-5 w-[100%] py-5 mt-3'>
        {
            items.outputQuestion|| "no data found!"
        }
        </div>
     <button className='bg-green-600 text-white p-2 mt-3 hover:bg-green-900' aria-label='Try it Yourself!'>Try it Yourself!</button>
        </div>:null
}
    <div className='flex gap-2 items-center w-[90%] h-10 bg-gray-200 pl-3 mt-3 ml-4' onClick={()=>showexample(index)}>
      <h1>View answers</h1>
      {
        openIndex === index ? <ChevronDown size={20} color="black" />: 
        <ChevronRight size={20} color="black"/>
      }
     
    </div>
    {
      openIndex === index && <ExampleModel example={items?.Answer || {}}/>
    }
    </div>
      ))
      
    }

    </div>
  )
}
export default React.memo(Tables)