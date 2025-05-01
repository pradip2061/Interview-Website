import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import InfoModal from '../components/InfoModel';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success('Login Successful');
      // Clear the state to prevent toast from showing again on page reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  return (
    <div>
      <Navbar />
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
        toastClassName={() =>
    "bg-white text-black text-sm md:text-base px-4 py-3 rounded-md shadow-lg max-w-[90vw] md:max-w-md"
  }
      />
      <InfoModal />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Home;
