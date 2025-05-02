import React, { useState, useRef, useEffect, useContext,useMemo} from 'react';
import SideBar from '../../SideBar';
import axios from 'axios';
import { SearchContext } from '../../../ContextApi';
import Inheritance from './Inheritance';
import img from '../../../assets/commingsoon.jpg'
import SuggestModel from '../../SuggestModel';
const Java = () => {
   const{slideElem,subtopic,closeSideBar,setCloseSideBar,setSubTopic,setSuggestions,suggestions}=useContext(SearchContext)
   const[loading,setLoading]=useState(false)
   const[questions,setQuestions]=useState([])
   const[pages,setPages]=useState('')
   const[page,setPage]=useState(1)
   const BASE_URL = import.meta.env.VITE_BASE_URL
   const question=async()=>{
    try {
      setLoading(true)
      setPages(0)
      const response = await axios.get(`${BASE_URL}/javaqueryget/${subtopic}?page=${page}`)
    
      if(response.status === 200){
       setQuestions(response.data.questions)
       setPages(response.data.totalpages)
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setQuestions([]);
        setPages(0);
      } else {
        console.error(error);
      }
    }finally{
    setLoading(false)
    }}
   
    useEffect(() => {
 question()
    }, [subtopic, page]);
    useEffect(() => {
      if (!subtopic) {
        setSubTopic('javainheritance');
      }
      setCloseSideBar(true);
    }, []);
    

  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setCloseSideBar(false);
    }
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (closeSideBar && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSideBar]);
      const currentpage =(page)=>{
        setPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const handlePrev =()=>{
        setPage((prev)=>Math.max(prev-1,1))
    }
    const handleNext =()=>{
        setPage((prev)=>Math.min(prev+1,pages))
    }
    useEffect(() => {
      const isMobile = window.innerWidth < 1024;
      if (closeSideBar && isMobile) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [closeSideBar]);

  const memoizedSubitem = useMemo(() => {
    return slideElem[1]?.subItems || [];
  }, [slideElem]);
  return (
    <div className="mt-7 lg:flex">
       <div className='lg:w-[30%]' ref={sidebarRef} >
         {
          closeSideBar &&  <SideBar subitem={memoizedSubitem} />
         }
          </div>
      <div className="lg:w-[100%] lg:mr-35">
        {subtopic === 'javainheritance' ? (
          <Inheritance questions={questions} loading={loading} />
        ) : <img src={img}  alt="no image found" className=' w-70 h-70 ml-10 lg:w-100 lg:h-130 lg:ml-80 '/>}
        <div className=' gap-x-1  flex justify-center mt-10 '>
        <button className={`${page == 1?' text-white bg-gray-400' : 'text-white bg-blue-500'} w-10 h-10`} onClick={handlePrev} disabled={page === 1} aria-label='prev'>prev</button>
        {
            Array.from({length:pages},(_,index)=>(
                <button key={index+1} className={`${page==index+1? ' bg-blue-900':'bg-blue-500'} text-white w-10 h-10`} onClick={()=>currentpage(index+1)} aria-label={index+1}>{index+1}</button>
            ))
        }
        <button className={`${page == pages?' text-white bg-gray-400' : 'text-white bg-blue-500'} w-10 h-10`} onClick={handleNext} aria-label='next'>next</button>
    </div>
      </div>
    </div>
  );
};

export default Java;
