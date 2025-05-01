import axios from 'axios'
import React, { useState,useEffect } from 'react'
import AdminQuery from '../components/AdminQuery'
import SentQuery from './SentQuery'

const QueryRender = () => {
    const[select,setSelect]=useState("user")
    useEffect(()=>{
        const checkrole =async()=>{
            const token = await localStorage.getItem("token")
            const BASE_URL = import.meta.env.VITE_BASE_URL
           const response = await axios.post(`${BASE_URL}/verify`, {},{
                headers:{
                    Authorization:`${token}`
                }
            });
            if(response.data.message === "admin"){
                setSelect("admin")
            }else{
                setSelect("user")
            }
        }
        checkrole()
    },[])
  return (
    <div>
        {
            select === "admin" ? <AdminQuery/> :<SentQuery/>
        }
    </div>
  )
}

export default QueryRender