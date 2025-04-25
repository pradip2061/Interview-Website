import React, { useState, useRef, useEffect, useContext } from 'react';
import SideBar from '../../SideBar';
import HtmlStructure from './HtmlStructure';
import Elements from './Elements';
import Attributes from './Attributes';
import FormInput from './FormInput'
import LinkandNavigation from './LinkandNavigation';
import Lists from './Lists';
import SemanticElements from './SemanticElements';
import Tables from './Tables';
import Media from './Media';
import Html5 from './Html5';
import MetaTags from './MetaTags';
import axios from 'axios'
import { debounce } from 'lodash';
import { SearchContext } from '../../../ContextApi';
import img from '../../../assets/commingsoon.jpg'
const Html = () => {
  const{slideElem,subtopic,closeSideBar,setCloseSideBar,setSubTopic}=useContext(SearchContext)
  const[loading,setLoading]=useState(false)
  const[questions,setQuestions]=useState([])
  const[pages,setPages]=useState('')
  const[page,setPage]=useState(1)
  const question=async()=>{
    try {
      setLoading(true)
      setPages(0)
      const response = await axios.get(`http://localhost:3000/interview/htmlqueryget/${subtopic}?page=${page}`)
    
      if(response.status === 200){
       setQuestions(response.data.questions)
       setPages(response.data.totalpages)
      }
    } catch (error) {
      console.log(error)
    }finally{
    setLoading(false)
    }}
    useEffect(()=>{
question()
    },[subtopic,page])

    useEffect(()=>{
      setSubTopic("htmlstructure")
      setCloseSideBar(true)
    },[])

    const sidebarRef = useRef(null);
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setCloseSideBar(false);
      }
    };

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
  return (
    <div className='mt-7 lg:flex '>
        <div className='lg:w-[30%]' ref={sidebarRef} >
         {
          closeSideBar &&  <SideBar subitem={slideElem[0].subItems} />
         }
          </div>
          <div className='lg:w-[100%] lg:mr-35'>
          { 
  subtopic === 'htmlstructure' ?
  <HtmlStructure/>:subtopic === 'htmlelements' ?<Elements/>:subtopic === 'htmlattributes' ?<Attributes {...(questions ? { questions } : {})}/>:subtopic === 'htmlformsandinputs' ?
<FormInput/>:subtopic === 'htmllinksandnavigation' ?<LinkandNavigation/>:subtopic === 'htmllists' ?<Lists/>:subtopic === 'htmlsemanticelements' ?
<SemanticElements/>:subtopic === 'htmltables' ?
<Tables  {...(questions ? { questions } : {})}/>:subtopic === 'htmlmedia' ? <Media/>: subtopic === 'html5features' ?  <Html5/>:subtopic === 'htmlmetatags'?<MetaTags/>:<img src={img}  alt="no image found" className=' w-70 h-70 ml-10 lg:w-100 lg:h-130 lg:ml-80 '/>}

<div className=' gap-x-1  flex justify-center mt-10 '>
        <button className={`${page == 1?' text-white bg-gray-400' : 'text-white bg-blue-500'} w-10 h-10`} onClick={handlePrev} disabled={page === 1}>prev</button>
        {
            Array.from({length:pages},(_,index)=>(
                <button key={index+1} className={`${page==index+1? ' bg-blue-900':'bg-blue-500'} text-white w-10 h-10`} onClick={()=>currentpage(index+1)}>{index+1}</button>
            ))
        }
        <button className={`${page == pages?' text-white bg-gray-400' : 'text-white bg-blue-500'} w-10 h-10`} onClick={handleNext}>next</button>
    </div>
          </div>
    </div>
  );
};

export default Html;