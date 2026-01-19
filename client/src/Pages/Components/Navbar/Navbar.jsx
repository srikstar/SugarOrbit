import React from 'react'
import {Link} from 'react-router-dom'

import './Navbar.css'

function Navbar() {
  return (
    <section className='navbar-main-container row'>
      <div className="navbar-container row-sb">
        <div className="nav-content-container">
          <Link to='/'><img className='donut-logo' src="./donut.jpg" alt="donut-logo" /></Link>
        </div>
        <div className="nav-content-container"></div>
      </div>
    </section>
  )
}

export default Navbar