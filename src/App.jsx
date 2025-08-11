import React from 'react';
import {   Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Auth from './routes/Auth';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
