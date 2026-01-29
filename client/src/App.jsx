import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Pages/Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Sweets from './Pages/Products/Sweets/Sweets'
import Product from './Pages/Products/Product/Product'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sweets' element={<Sweets />} />
        <Route path='/product' element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App