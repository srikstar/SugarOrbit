import React from 'react'

import './Home.css'

function Home() {

  const home_wrapper_image = 'https://static.vecteezy.com/system/resources/thumbnails/049/994/140/small/abstract-holographic-gradient-blurred-background-fluid-aura-wallpaper-empty-textured-backdrop-illustration-vector.jpg'

  return (
    <>
      <section className='main-container row'>

        <div className="div-90 row">

          {/* Home Section 1 */}
          <div className="home-section-one-container">
            <h1>Explore the finest flavors</h1>
            <div className="home-para-one">
              <p>Every flavor is carefully selected to deliver richness, balance, and authenticity, creating memorable tastes that feel familiar yet exciting with every bite.</p>
            </div>
            <img src={home_wrapper_image} alt="home-wrapper-image" className="home-wrapper-image" />
          </div>
        </div>

        <div className="div-90"></div>
      </section>
    </>
  )
}

export default Home