import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Sweets from './Pages/Sweets/Sweets'
import Namkeen from './Pages/Namkeens/Namkeen'
import Chocolates from './Pages/Chocolates/Chocolates'
import Cart from './Pages/Cart/Cart'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sweets' element={<Sweets />} />
        <Route path='/namkeens' element={<Namkeen />} />
        <Route path='/chocolates' element={<Chocolates />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App