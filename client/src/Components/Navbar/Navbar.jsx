import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  const handleMenuOpen = () => {
    setIsOpen(true)
  }

  const handleMenuClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="navbar-main-container row">
        <nav className="navbar div-80 row-sb">
          <div className="nav-containers main-logo">
            <Link to='/'><img className='main-logo' src="./donut.svg" alt="main-logo" /></Link>
          </div>
          <div className="nav-containers nav-links row">
            <Link to='/sweets'><h3>Sweets</h3></Link>
            <Link to='/namkeens'><h3>Namkeens</h3></Link>
            <Link to='/chocolates'><h3>Chocolates</h3></Link>
          </div>
          <div className="nav-containers nav-icons-container row">
            <div className="nav-icons" onClick={handleMenuOpen}><Link className='row'><img className='nav-icon menu' src="./menu.png" alt="menu-logo" /></Link></div>
            <div className="nav-icons"><Link className='row'><img className='nav-icon' src="./cart.png" alt="cart-logo" /> <h4>Cart 0</h4></Link></div>
            <div className="nav-icons"><Link className='row'><img className='nav-icon' src="./user.png" alt="user-logo" /> <h4>Profile</h4> </Link></div>
          </div>
        </nav>
      </div>

      <div className={`menu-main-container ${isOpen ? 'active' : 'inactive'}`}>
        <div className="menu-container">
          <div className="div row">
            <div className="div-80 back-btn-container">
              <div className="nav-icons"><Link onClick={handleMenuClose}><p>back</p></Link></div>
            </div>
          </div>
          <div className="div row">
            <div className="div-80 menu-list-container">
              <Link to='/sweets' onClick={handleMenuClose}><h2>Sweets</h2></Link>
              <Link to='/namkeens' onClick={handleMenuClose}><h2>Namkeens</h2></Link>
              <Link to='/chocolates' onClick={handleMenuClose}><h2>Chocolates</h2></Link>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Navbar