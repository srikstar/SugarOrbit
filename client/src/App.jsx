import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Pages/Components/Navbar/Navbar'
import Home from './Pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App