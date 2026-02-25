import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Sweets from './Pages/Sweets/Sweets'
import Namkeen from './Pages/Namkeens/Namkeen'
import Chocolates from './Pages/Chocolates/Chocolates'
import Product from './Components/Product/Product'
import Checkout from './Pages/Checkout/Checkout'
import PaymentStatus from './Pages/PaymentStatus/PaymentStatus'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sweets' element={<Sweets />} />
        <Route path='/namkeens' element={<Namkeen />} />
        <Route path='/chocolates' element={<Chocolates />} />
        <Route path='/product' element={<Product />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/payment' element={<PaymentStatus />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App