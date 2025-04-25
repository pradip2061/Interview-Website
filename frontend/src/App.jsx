import React from 'react';
import MonacoEditorComponent from './MonacoEditorComponent';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import { SearchProvider } from './ContextApi';
import HtmlEditor from './HtmlEditor';
function App() {
  return (
    <SearchProvider>
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/htmleditor/:questions' element={<HtmlEditor/>}/>
  </Routes>
</BrowserRouter>
</SearchProvider>
  );
}

export default App;
