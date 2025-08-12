import React from 'react';
import {   Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Auth from './routes/Auth';
import Upload from './routes/Upload';
import Resume  from './routes/Resume';

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
         <Route path="/upload" element={<Upload />} />
           <Route path="/resume/:id" element={<Resume />} />
      </Routes>
    </div>
  );
};

export default App;
