import React, { useContext, useEffect, useState } from 'react'
import JavaScript from './languages/JavaScript';
import Html from './languages/html/Html';
import Python from './languages/python/Python';
import Css from './languages/Css';
import Java from './languages/java/Java';
import Reacts from './languages/Reacts';
import { MenuIcon,XCircle} from 'lucide-react';
import { data } from 'react-router-dom';
import { SearchContext } from '../ContextApi';
import img from '../assets/404.jpg'

const MainContent = () => {
    const[pageName,setPageName]=useState('HTML')
    const[boolean,setBoolean]=useState(true)
    const{search,slideElem,setSubTopic,setCloseSideBar,closeSideBar}=useContext(SearchContext)
    
      useEffect(() => {
        const showQuestions = () => {
          const topics = [
            { key: 'html', label: 'HTML' },
            { key: 'javascript', label: 'JAVASCRIPT' },
            { key: 'java', label: 'JAVA' },
            { key: 'css', label: 'CSS' },
            { key: 'python', label: 'PYTHON' },
            { key: 'nodejs', label: 'NODEJS' },
            { key: 'react', label: 'REACT' },
          ];
      
          const lowerSearch = search.replace(/\s+/g, '').toLowerCase();
      
          for (const topic of topics) {
            if (lowerSearch.includes(topic.key)) {
              setPageName(topic.label);
              setSubTopic(lowerSearch)
              break;
            }
          }
        };
      
        showQuestions();
      }, [search]);
      
      const closemenuBar=()=>{
       closeSideBar?setCloseSideBar(false):setCloseSideBar(true)
      }
 

  return (
    <div className='pt-15'>
       <div className="  flex fixed  bg-black w-[100%] z-50">
       <MenuIcon size={23} color='white' className=' mt-1 ml-2 lg:hidden md:hidden' onClick={closemenuBar}/>
       <div className='ml-2 flex overflow-x-scroll  scrollbar-hide '>
       {
       slideElem.map((item)=>(
        <div key={item.id} className={`${pageName === item.name ? 'bg-indigo-500': 'bg-darkblack'} px-5 h-7  flex items-center hover:bg-indigo-900`} onClick={()=>setPageName(item.name)}>
           <h3 className="text-white">{item.name}</h3> 
        </div>
       ))
    }
    </div>
    <div>

    </div>
  </div>
{
pageName ?<div>{
    pageName === 'JAVASCRIPT' ?<JavaScript/>: pageName === 'HTML' ?<Html/>: pageName === 'PYTHON' ?<Python/> :pageName === 'CSS' ?<Css/> :
    pageName === 'JAVA'?<Java/>: pageName === 'REACT' ?<Reacts/>:<img src={img} alt="image not found" className=' w-70 h-70 ml-10 lg:w-150 lg:h-130 lg:ml-120 '/>
  }
  </div>:
  <div className="h-[50vh] flex flex-col items-center justify-center bg-white">
          <XCircle size={50} color="red" />
          <h2 className="text-gray-500 mt-4 text-xl">
            No result found
          </h2>
        </div>
}
    </div>
  )
}

export default MainContent





// const booleancheck=()=>{
//   setBoolean((prev)=>!prev)
// }
// useEffect(() => {
//   const pages = (topic) => {
//     slideElem.forEach((item) => {
//       if (item?.name.toLowerCase().includes(topic.toLowerCase())) {
//         setPageName(item.name);
//       }
//       item?.subItems.forEach((sub) => {  // ✅ Correct: Accessing subItems inside each item
//         if (sub.toLowerCase().includes(topic.toLowerCase())) {
//           setSubTopic(sub);
//         }
//       });
//     });
//   };
//   pages(Topic);
// }, [Topic]);


// const setPage=(name)=>{
//   setPageName(name)}
//    console.log(pageName,"search bata")