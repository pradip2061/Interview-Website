import React, { useContext, useEffect, useRef, useState } from 'react';
import JavaScript from './languages/JavaScript';
import Html from './languages/html/Html';
import Python from './languages/python/Python';
import Css from './languages/Css';
import Java from './languages/java/Java';
import Reacts from './languages/Reacts';
import { MenuIcon, XCircle } from 'lucide-react';
import { SearchContext } from '../ContextApi';
import img from '../assets/404.jpg';
import SuggestModel from './SuggestModel';
import Fuse from 'fuse.js';
import ErrorModel from './ErrorModel';

const MainContent = () => {
  const [pageName, setPageName] = useState('HTML');
  const hasMounted = useRef(false); // <-- track first mount

  const {
    search,
    slideElem,
    setSubTopic,
    setCloseSideBar,
    closeSideBar,
    setSuggestions,
    suggestions,
  } = useContext(SearchContext);

  useEffect(() => {
    hasMounted.current = true; // <-- mark as mounted
  }, []);

  useEffect(() => {
    setSuggestions('');
    const showQuestions = () => {
      if (!search) return;

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
        if (lowerSearch === topic.key) {
          setPageName(topic.label);
          return;
        }
      }

      for (const topic of topics) {
        if (lowerSearch.includes(topic.key)) {
          setPageName(topic.label)
          const slideTopic = slideElem.find((elem) => elem.name === topic.label);
          if (slideTopic && slideTopic.subItems.length > 0) {
            const matched = slideTopic.subItems.find((subItem) => {
              const formatted = subItem.replace(/\s+/g, '').toLowerCase();
              return formatted === lowerSearch;
            });

            if (matched) {
              setSubTopic(lowerSearch);
            } else {
              const fuse = new Fuse(slideTopic.subItems, {
                includeScore: true,
                threshold: 0.6,
              });

              const results = fuse.search(lowerSearch);
              if (results.length > 0) {
                setSuggestions(results);
              }
            }
          }
          return;
        }
      }

      const matchedSubItems = [];
      for (const topic of slideElem) {
        for (const subItem of topic.subItems) {
          const formattedSubItem = subItem.replace(/\s+/g, '').toLowerCase();
          if (formattedSubItem.includes(lowerSearch)) {
            matchedSubItems.push({ item: subItem });
          }
        }
      }

      setSuggestions(matchedSubItems);
    };

    showQuestions();
  }, [search]);

  const closemenuBar = () => {
    setCloseSideBar(!closeSideBar);
  };

  return (
    <div className="pt-15">
      <div className="flex fixed bg-black w-[100%] z-50">
        <MenuIcon
          size={23}
          color="white"
          className="mt-1 ml-2 lg:hidden md:hidden"
          onClick={closemenuBar}
        />
        <div className="ml-2 flex overflow-x-scroll scrollbar-hide">
          {slideElem.map((item) => (
            <div
              key={item.id}
              className={`${
                pageName === item.name ? 'bg-indigo-500' : 'bg-darkblack'
              } px-5 h-7 flex items-center hover:bg-indigo-900`}
              onClick={() => setPageName(item.name)}
            >
              <h3 className="text-white">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {pageName ? (
        <div>
          {pageName === 'JAVASCRIPT' ? (
            <JavaScript />
          ) : pageName === 'HTML' ? (
            <Html />
          ) : pageName === 'PYTHON' ? (
            <Python />
          ) : pageName === 'CSS' ? (
            <Css />
          ) : pageName === 'JAVA' ? (
            <Java />
          ) : pageName === 'REACT' ? (
            <Reacts />
          ) : (
            <img
              src={img}
              alt="image not found"
              className="w-70 h-70 ml-10 lg:w-150 lg:h-130 lg:ml-120"
            />
          )}
        </div>
      ) : (
        <div className="h-[50vh] flex flex-col items-center justify-center bg-white">
          <XCircle size={50} color="red" />
          <h2 className="text-gray-500 mt-4 text-xl">No result found</h2>
        </div>
      )}

      {Array.isArray(suggestions) && suggestions.length > 0 && hasMounted.current ? (
        <SuggestModel item={suggestions} />
      ) : null}
    </div>
  );
};

export default MainContent;
