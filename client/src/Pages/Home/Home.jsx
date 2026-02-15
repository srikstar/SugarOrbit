import React, { useEffect } from 'react'

import './Home.css'
import Footer from '../../Components/Footer/Footer'


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

  const items = [
    {
      id: 1,
      name: 'Soan Papi',
      description: 'Soan papdi is a popular dessert in the Indian subcontinent. It is usually cube-shaped or served as flakes, and has a crisp and flaky texture.',
      itemsize: ['250g', '500g', '1 kg'],
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',

    },
    {
      id: 2,
      name: 'Soan Papi',
      description: 'Soan papdi is a popular dessert in the Indian subcontinent. It is usually cube-shaped or served as flakes, and has a crisp and flaky texture.',
      itemsize: ['250g', '500g', '1 kg'],
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',

    },
    {
      id: 3,
      name: 'Soan Papi',
      description: 'Soan papdi is a popular dessert in the Indian subcontinent. It is usually cube-shaped or served as flakes, and has a crisp and flaky texture.',
      itemsize: ['250g', '500g', '1 kg'],
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',

    },
    {
      id: 4,
      name: 'Soan Papi',
      description: 'Soan papdi is a popular dessert in the Indian subcontinent. It is usually cube-shaped or served as flakes, and has a crisp and flaky texture.',
      itemsize: ['250g', '500g', '1 kg'],
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',
    },
    {
      id: 5,
      name: 'Soan Papi',
      description: 'Soan papdi is a popular dessert in the Indian subcontinent. It is usually cube-shaped or served as flakes, and has a crisp and flaky texture.',
      itemsize: ['250g', '500g', '1 kg'],
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',
    }
  ]

  useEffect(() => {
    document.title = "Sugar Orbit | Home";
  }, [])

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
            <h1><b>Explore the finest flavors</b></h1>
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

        {/* Section 3 - Best Sellers */}
        <section className="home-seller-container row div-m">
          <div className="div-80 div-w">
            <div className="seller-container row-sb-e">
              <div>
                <h1><b>Best Sellers</b></h1>
                <p className='para'>Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance.</p>
              </div>

              <div className="card-slide-container row-sb">
                <span>←</span>
                <span>→</span>
              </div>
            </div>
            <div className="cards-main-container">
              <div className="card-maxcontainer row">
                {items && items.map((item) => (
                  <div key={item.id} className="cards-container">
                    <div className="itemhome-image-container">
                      <img className='item-image' src={item.image} alt={item.name} />
                    </div>
                    <h2>{item.name}</h2>
                    <p className="item-para">{item.description}</p>
                    <div className="item-weight-container row-fs">
                      {item.itemsize.map((size, index) => (
                        <div key={index} className="item-weight item-active row">
                          <span>{size}</span>
                        </div>
                      ))}
                    </div>
                    <button className="item-btn row">Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="home-wrapper-container div-m">
          <img className='wrapper-image' src={wrapper} alt="wrapper-image" />
        </section>

        {/* Section 5 - Namkeens */}
        <section className="home-seller-container row div-m">
          <div className="div-80 div-w">
            <div className="seller-container row-sb-e">
              <div>
                <h1><b>Namkeens</b></h1>
                <p className='para'>Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance.</p>
              </div>

              <div className="card-slide-container row-sb">
                <span>←</span>
                <span>→</span>
              </div>
            </div>
            <div className="cards-main-container">
              <div className="card-maxcontainer row">
                {items && items.map((item) => (
                  <div key={item.id} className="cards-container">
                    <div className="item-image-container">
                      <img className='item-image' src={item.image} alt={item.name} />
                    </div>
                    <h2>{item.name}</h2>
                    <p className="item-para">{item.description}</p>
                    <div className="item-weight-container row-fs">
                      {item.itemsize.map((size) => (
                        <div key={item.id} className="item-weight item-active row">
                          <span>{size}</span>
                        </div>
                      ))}
                    </div>
                    <button className="item-btn row">Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />

      </div>
    </>
  )
}

export default Home