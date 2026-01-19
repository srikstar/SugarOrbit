import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Pages/Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Promo from './Pages/Components/Promo/Promo'

function App() {
  return (
    <BrowserRouter>
      <Promo />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App