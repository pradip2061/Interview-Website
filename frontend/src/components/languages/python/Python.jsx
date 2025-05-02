import React, { useState, useRef, useEffect, useContext } from 'react';
import SideBar from '../../SideBar';
import axios from 'axios'
import { debounce } from 'lodash';
import { SearchContext } from '../../../ContextApi';
import img from '../../../assets/commingsoon.jpg'
import Variables from './Variables';
import DataTypes from './DataTypes';
import Typecasting from './Typecasting ';
import Stringandstringmethods from './Stringandstringmethods';
import Operators from './Operators';
import InputUser from './InputUser';
import OperatorPrecedence from './OperatorPrecedence';
import IfandElse from './IfandElse';
import MatchCase from './MatchCase';
import Fstrings from './Fstrings ';
import Loops from './Loops';
const Python = () => {
  const{slideElem,subtopic,closeSideBar,setCloseSideBar,setSubTopic}=useContext(SearchContext)
  const[loading,setLoading]=useState(false)
  const[questions,setQuestions]=useState([])
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const[pages,setPages]=useState('')
  const[page,setPage]=useState(1)
  const question=async()=>{
    try {
      setLoading(true)
      setPages(0)
      const response = await axios.get(`${BASE_URL}/pythonqueryget/${subtopic}?page=${page}`)
    
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
    useEffect(()=>{
question()
    },[subtopic,page])

    useEffect(() => {
      if (!subtopic) {
        setSubTopic('pythonvariables');
      }
      setCloseSideBar(true);
    }, []);
    

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
          closeSideBar &&  <SideBar subitem={slideElem[2].subItems} />
         }
          </div>
          <div className='lg:w-[100%] lg:mr-35'>
          { 
  subtopic === 'pythonvariables' ?
  <Variables {...(questions ? { questions } : {})}/>:subtopic === 'pythondatatypes' ?<DataTypes/>:subtopic === 'pythontypecasting' ?<Typecasting {...(questions ? { questions } : {})}/>:subtopic === 'pythonstringandstringmethods' ?
<Stringandstringmethods/>:subtopic === 'pythonoperators' ?<Operators/>:subtopic === 'pythoninputuser' ?<InputUser/>:subtopic === 'pythonoperatorprecedence' ?
<OperatorPrecedence/>:subtopic === 'pythonifandelse' ?
<IfandElse  {...(questions ? { questions } : {})}/>:subtopic === 'pythonmatchcase' ? <MatchCase/>: subtopic === 'pythonfstrings' ?  <Fstrings/>:subtopic === 'pythonloops'?<Loops/>:<img src={img}  alt="no image found" className=' w-70 h-70 ml-10 lg:w-100 lg:h-130 lg:ml-80 '/>}

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

export default Python;