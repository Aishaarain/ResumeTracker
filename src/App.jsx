import React from 'react';
import {   Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Auth from './routes/Auth';
import Upload from './routes/Upload';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
         <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
};

export default App;
