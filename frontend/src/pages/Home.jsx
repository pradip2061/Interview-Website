import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import InfoModal from '../components/InfoModel';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.loginSuccess) {
      // Clear the state to prevent toast from showing again on page reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  return (
    <div>
      <Navbar />
      <InfoModal />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Home;
