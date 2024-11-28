import React, {useEffect} from 'react';

import {initGA, logPageView} from './analytics/ga4';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import './App.css';

const App = () => {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
};

export default App;
