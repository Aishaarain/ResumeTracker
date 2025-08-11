// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { BrowserRouter } from 'react-router-dom'

// ReactDOM.createRoot(document.getElementById('root')).render(
//    const { init } = usePuterStore();

//   useEffect(() => {
//     init();
//   }, [init]);

//   <React.StrictMode>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// )


// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import App from "./App";
// // import Home from "./routes/Home";
// // import "./index.css";

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <React.StrictMode>
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<App />}>
// //           <Route index element={<Home />} />
// //         </Route>
// //       </Routes>
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { usePuterStore } from '../lib/puter';
import App from './App';
import './index.css';

function Root() {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
