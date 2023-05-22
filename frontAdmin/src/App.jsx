import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import viteLogo from '/vite.svg'
import React from 'react'
import Login from './Component/Login';
import AdminDashboard from './Component/Dashbord'



function App() {
  

  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
      {/* <Route path="/sign" element = {<Singin/>}/>
      <Route path="/Project" element = {<Project/>}/> */}
    </Routes>
    </BrowserRouter>
       
  )
}

export default App
