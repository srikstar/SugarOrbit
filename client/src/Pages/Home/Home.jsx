import React from 'react'

import './Home.css'

function Home() {

  const home_wrapper_image = 'https://static.vecteezy.com/system/resources/thumbnails/049/994/140/small/abstract-holographic-gradient-blurred-background-fluid-aura-wallpaper-empty-textured-backdrop-illustration-vector.jpg'


  const item_top = {
    orders: 25,
    image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
    name: 'Mysour Pak',
    description: 'Mysore Pak is a true taste of tradition. Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance of sweetness',
    weight: ['250g', '500g', '1kg']
  }

  return (
    <>
      <section className='main-container row'>

        <div className="div-90 row">

          {/* Home Section 1 */}
          <div className="home-section-one-container">
            <h1>Explore the finest flavors</h1>
            <div className="home-para-one">
              <p>Every flavor is carefully selected to deliver richness, balance, and authenticity, creating memorable tastes that feel familiar yet exciting with every bite. </p>
            </div>
            <img src={home_wrapper_image} alt="home-wrapper-image" className="home-wrapper-image" />
          </div>


          {/* Home Section 2 */}
          <div className="home-section-two-container">
            <h3>Best Sellers</h3>
            <div className="home-para-one">
              <p>Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance of sweetness and savoriness.</p>
            </div>
            <div className="items-display-main-container row-sb">
              <div className="item-display-container">
                <span className='order-count'>{item_top.orders}k orders</span><br />
                <img src={item_top.image} alt="item-image" className="item-image" />
                <h4>{item_top.name}</h4>
                <p>{item_top.description}</p>
                <div className="item-size-container row-fs">
                  {item_top.weight.map((w, index) => (
                    <div key={index} className={`item-size row${index !== 0 ? "item-size-n row" : ""}`}>
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
                <button className='item-add-btn'>Add to cart</button>
              </div>

              <div className="item-display-container">
                <span className='order-count'>{item_top.orders}k orders</span><br />
                <img src={item_top.image} alt="item-image" className="item-image" />
                <h4>{item_top.name}</h4>
                <p>{item_top.description}</p>
                <div className="item-size-container row-fs">
                  {item_top.weight.map((w, index) => (
                    <div key={index} className={`item-size row${index !== 0 ? "item-size-n row" : ""}`}>
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
                <button className='item-add-btn'>Add to cart</button>
              </div>

              <div className="item-display-container">
                <span className='order-count'>{item_top.orders}k orders</span><br />
                <img src={item_top.image} alt="item-image" className="item-image" />
                <h4>{item_top.name}</h4>
                <p>{item_top.description}</p>
                <div className="item-size-container row-fs">
                  {item_top.weight.map((w, index) => (
                    <div key={index} className={`item-size row${index !== 0 ? "item-size-n row" : ""}`}>
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
                <button className='item-add-btn'>Add to cart</button>
              </div>

              <div className="item-display-container">
                <span className='order-count'>{item_top.orders}k orders</span><br />
                <img src={item_top.image} alt="item-image" className="item-image" />
                <h4>{item_top.name}</h4>
                <p>{item_top.description}</p>
                <div className="item-size-container row-fs">
                  {item_top.weight.map((w, index) => (
                    <div key={index} className={`item-size row${index !== 0 ? "item-size-n row" : ""}`}>
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
                <button className='item-add-btn'>Add to cart</button>
              </div>

            </div>
          </div>


        </div>
      </section>
    </>
  )
}

export default Home