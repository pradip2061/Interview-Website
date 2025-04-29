import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import HtmlEditor from './HtmlEditor';
import AuthForm from './pages/AuthForm';
import MonacoEditorComponent from './MonacoEditorComponent'; // (if you use it somewhere else)
import { SearchProvider } from './ContextApi';
import SentQuery from './pages/SentQuery';
function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/htmleditor/:questions' element={<HtmlEditor />} />
          <Route path='/authenticate' element={<AuthForm />} />
          <Route path='/sentQuery' element={<SentQuery />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
