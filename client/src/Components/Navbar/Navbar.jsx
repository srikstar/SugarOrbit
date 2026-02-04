import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  const handleMenuContainer = () => {
    setIsOpen(!isOpen)
    console.log(isOpen)
  }

  return (
    <>
      <div className="navbar-main-container row">
        <nav className="navbar div-80 row-sb">
          <div className="nav-containers main-logo">
            <Link to='/'><img className='main-logo' src="./donut.svg" alt="main-logo" /></Link>
          </div>
          <div className="nav-containers nav-links row">
            <Link><h3>Sweets</h3></Link>
            <Link><h3>Namkeens</h3></Link>
            <Link><h3>Chocolates</h3></Link>
          </div>
          <div className="nav-containers nav-icons-container row">
            <div className="nav-icons" onClick={handleMenuContainer}><Link className='row'><img className='nav-icon' src="./menu.png" alt="menu-logo" /> <h4>Cart 0</h4></Link></div>
            <div className="nav-icons"><Link className='row'><img className='nav-icon' src="./cart.png" alt="cart-logo" /> <h4>Cart 0</h4></Link></div>
            <div className="nav-icons"><Link className='row'><img className='nav-icon' src="./user.png" alt="user-logo" /> <h4>Profile</h4> </Link></div>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div className="menu-main-container">
          <div className="menu-container">
            <div className="div row">
              <div className="div-80 back-btn-container">
                <div className="nav-icons" onClick={handleMenuContainer}><Link><img className='nav-icon' src="./close.png" alt="close-logo" /></Link></div>
              </div>
            </div>
            <div className="div row">
              <div className="div-80 menu-list-container">
                <h2>Sweets</h2>
                <h2>Namkeens</h2>
                <h2>Chocolates</h2>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Navbar