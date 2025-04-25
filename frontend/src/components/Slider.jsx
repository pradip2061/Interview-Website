import React from "react";

const Slider = () => {
  const slideElem = [
    {
      id: 1,
      name: "HTML",
    },
    {
      id: 2,
      name: "JAVA",
    },
    {
      id: 3,
      name: "PYTHON",
    },
    {
      id: 4,
      name: "CSS",
    },
    {
      id: 5,
      name: "JAVASCRIPT",
    },
    {
      id: 6,
      name: "NODEJS",
    },
    {
        id:7,
        name:'REACT'
    },
  ];
  return <div className="pt-17 w-[100%] flex overflow-x-scroll  scrollbar-hide">
    {
       slideElem.map((item)=>(
        <div key={item.id} className="px-5 h-7  bg-black flex items-center hover:bg-indigo-500">
           <h3 className="text-white">{item.name}</h3> 
        </div>
       ))
    }
  </div>;
};

export default Slider;
