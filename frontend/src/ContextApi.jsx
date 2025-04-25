// ThemeContext.js
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const[subtopic,setSubTopic]=useState("")
  const[closeSideBar,setCloseSideBar]=useState(true)
  console.log(closeSideBar)
  const slideElem = [
        {
          id:1,
            name: 'HTML',
          subItems: ['HTML Structure', 'HTML Elements', 'HTML Attributes', 'HTML Forms and Inputs', 'HTML Links and Navigation', 'HTML Lists', 'HTML Semantic Elements','HTML Tables','HTML Media','HTML Forms Advanced','HTML Iframe','HTML Data Attributes','HTML5 Features','HTML Meta Tags','HTML SVG and Canvas','HTML Accessibility (ARIA)','HTML Custom Elements','HTML SEO Best Practices'],
        },
        {
          id:2,
              name:"JAVA",
           subItems:['JAVA basicjava', 'JAVA datatypes', 'JAVA Type casting', 'JAVA operators', 'JAVA keywords', 'JAVA control statements', 'JAVA class,object and constructor','JAVA inheritance','JAVA polymorphism','JAVA Abstraction','JAVA Encapsulation']
            },
          {
            id: 3,
            name: "PYTHON",
            subItems:[""]
          },
          {
            id: 4,
            name: "CSS",
            subItems:[""]
          },
          {
            id: 5,
            name: "JAVASCRIPT",
            subItems:[""]
            
          },
          {
            id: 6,
            name: "NODEJS",
            subItems:[""]
          },
          {
              id:7,
              name:'REACT',
              subItems:[""]
          }
        ];

  return (
    <SearchContext.Provider value={{ setSearch,search,slideElem,setSubTopic,subtopic,setCloseSideBar,closeSideBar}}>
      {children}
    </SearchContext.Provider>
  );
};
