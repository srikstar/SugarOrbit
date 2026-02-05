import React from 'react'

import './Home.css'

function Home() {

  const wrapper = 'https://sangamsweets.in/cdn/shop/files/Banner_New_Gift_Hamper_1.png?v=1766405392'
  const categories = [
    {
      id: 1,
      name: "Artisanal Sweets",
      description: "Heritage recipes meet modern craftsmanship",
      image: "./artisanal-sweets.jpg"
    },
    {
      id: 2,
      name: "Premium Namkeens",
      description: "Crispy perfection in every bite",
      image: "https://t3.ftcdn.net/jpg/01/35/88/24/360_F_135882487_NlLY54S7hYZQHXVTzSLc6KkXBp7gz0nD.jpg"
    },
    {
      id: 3,
      name: "Exotic Chocolates",
      description: "Pure indulgence redefined",
      image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
  ]

  return (
    <>
      <div className="main-section">

        {/* Section 1 */}
        <section className="home-wrapper-container div-m">
          <img className='wrapper-image' src={wrapper} alt="wrapper-image" />
        </section>

        {/* Section 2 */}
        <section className="home-item-container div-m row">
          <div className="div-80 div-w">
            <h1>Explore the finest flavors</h1>
            <div className="para">
              <p>Every flavor is carefully selected and crafted using the finest quality ingredients, delivering exceptional richness, perfect balance, and authentic taste in every bite.</p>
            </div>
            <div className="collection-main-container row-sb">
              <div className="collections-header-wrapper">
                <div className="collections-categories-container">
                  <div className="category-card-large">
                    <img src='./sweet.jpg' alt={categories[0].name} />
                    <div className="card-overlay-gradient"></div>

                    <div className="category-card-content">
                      <h3>{categories[0].name}</h3>
                      <p>{categories[0].description}</p>
                      <br />
                      <span>Discover the range →</span>
                    </div>
                  </div>
                  <div className="category-cards-right">
                    {categories.slice(1, 3).map(cat => (
                      <div key={cat.id} className="category-card-medium">
                        <img src={cat.image} alt={cat.name} />
                        <div className="card-overlay-gradient"></div>

                        <div className="category-card-medium-content">
                          <h3>{cat.name}</h3>
                          <p>Discover the range →</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="home-bestseller-container row div-m">
          <div className="div-80 div-w">
            <h1><span>Our</span><br />Best Sellers</h1>

            <div className="cards-main-container">
              <div className="card-maxcontainer row">
                <div className="cards-container">

                </div>
                <div className="cards-container">

                </div>
                <div className="cards-container">

                </div>
                <div className="cards-container">

                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  )
}

export default Home