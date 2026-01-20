import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
import Cart from '../Cart/Cart'

function Navbar() {

  const [isActiveCart, setIsActiveCart] = useState(false)

  const handleCart = () => {
    setIsActiveCart(true)
  }

  return (
    <>

      {isActiveCart && <Cart close={setIsActiveCart}/>}

      <section className='navbar-main-container row'>
        <div className="navbar-container row-sb">
          <div className="nav-content-container">
            <Link to='/'><img className='donut-logo' src="./donut.jpg" alt="donut-logo" /></Link>
          </div>
          <div className="nav-content-container row">
            <Link to='/'><img src="./profile.png" alt="profile-icon" className="profile-icon nav-icons" /></Link>
            <div onClick={handleCart} className="overlay-number">
              <Link to='/'><span className='cart-content-count'>5</span></Link>
              <Link to='/'><img src="./shopping-cart.png" alt="shopping-cart" className="shopping-cart nav-icons" /></Link>
            </div>
          </div>
        </div>
        <div className="sub-navbar-main-container row">
          <div className="subnav-max row">
            <div className="sub-navbar row-sb">
              <Link className="sub-navlinks">Sweets</Link>
              <Link className="sub-navlinks">Namkeens</Link>
              <Link className="sub-navlinks">Snacks</Link>
              <Link className="sub-navlinks">Boulangerie</Link>
              <Link className="sub-navlinks">Chocolates</Link>
              <Link className="sub-navlinks">Gifting</Link>
              <Link className="sub-navlinks">Candles</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Navbar

