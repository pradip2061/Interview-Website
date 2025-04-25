import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MainContent from '../components/MainContent';
import InfoModal from '../components/InfoModel';

function Home(){
    return(
        <div>
           <Navbar/>
           <InfoModal/>
           <MainContent />
           <Footer/>
        </div>
    )
}
export default Home;