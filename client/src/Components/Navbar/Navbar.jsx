import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Cart from '../Cart/Cart'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const openCart = () => {
    setCartOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeCart = () => {
    setCartOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>

      {cartOpen && <Cart onClose={closeCart} />}

      <div className="navbar-main-container row">
        <nav className="navbar div-80 row-sb">

          <div className="nav-containers">
            <Link to='/'><img className='main-logo' src="./donut.svg" alt="main-logo" /></Link>
          </div>

          <div className="nav-containers nav-links row">
            <Link to='/sweets'><h3>Sweets</h3></Link>
            <Link to='/namkeens'><h3>Namkeens</h3></Link>
            <Link to='/chocolates'><h3>Chocolates</h3></Link>
          </div>

          <div className="nav-containers nav-icons-container row">
            <div className="nav-icons" onClick={() => setIsOpen(true)}>
              <Link className='row'>
                <img className='nav-icon menu' src="./menu.png" alt="menu-logo" />
              </Link>
            </div>
            <div className="nav-icons" onClick={openCart}>
              <Link className='row'>
                <img className='nav-icon' src="./cart.png" alt="cart-logo" />
                <h4>Cart 0</h4>
              </Link>
            </div>
            <div className="nav-icons">
              <Link className='row' to='/profile'>
                <img className='nav-icon' src="./user.png" alt="user-logo" />
                <h4>Profile</h4>
              </Link>
            </div>
          </div>

        </nav>
      </div>

      <div className={`menu-main-container ${isOpen ? 'active' : 'inactive'}`}>
        <div className="menu-container">
          <div className="div row">
            <div className="div-80 back-btn-container">
              <p onClick={() => setIsOpen(false)}>back</p>
            </div>
          </div>
          <div className="div row">
            <div className="div-80 menu-list-container">
              <Link to='/sweets' onClick={() => setIsOpen(false)}><h2>Sweets</h2></Link>
              <Link to='/namkeens' onClick={() => setIsOpen(false)}><h2>Namkeens</h2></Link>
              <Link to='/chocolates' onClick={() => setIsOpen(false)}><h2>Chocolates</h2></Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Navbar