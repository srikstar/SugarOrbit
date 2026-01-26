import React from 'react'

import './Home.css'
import Footer from '../Components/Footer/Footer';
import ItemsCarousel from '../Components/ItemsCarousel/ItemsCarousel';
import Features from '../Components/Features/Features';

function Home() {

  const home_wrapper_image =
    'https://static.vecteezy.com/system/resources/thumbnails/049/994/140/small/abstract-holographic-gradient-blurred-background-fluid-aura-wallpaper-empty-textured-backdrop-illustration-vector.jpg'

  const item_top = {
    orders: 25,
    image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
    name: 'Mysore Pak',
    description:
      'Mysore Pak is a true taste of tradition. Our best sellers are customer favorites.',
    weight: ['250g', '500g', '1kg']
  }

  const items = Array(6).fill(item_top)

  const categories = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&h=900&fit=crop',
      name: 'Artisanal Sweets',
      description: 'Handcrafted delicacies following century-old recipes, perfected over generations.',
      badge: 'Premium Selection',
      type: 'large'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&h=400&fit=crop',
      name: 'Premium Namkeens',
      type: 'medium'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&h=400&fit=crop',
      name: 'Exotic Chocolates',
      type: 'medium'
    }
  ]

  return (
    <>
      <section className="main-container row">
        <div className="div-90 row">

          {/* Home Section 1 */}
          <div className="home-section-one-container">
            <h1>Explore the finest flavors</h1>
            <div className="home-para-one">
              <p>
                Every flavor is carefully selected to deliver richness,
                balance, and authenticity with every bite.
              </p>
            </div>
            <img
              src={home_wrapper_image}
              alt="home-wrapper"
              className="home-wrapper-image"
            />
          </div>

          {/* Home Section 2 - Best Sellers */}
          <ItemsCarousel
            items={items}
            title="Best Sellers"
            description="Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
          />

          {/* Home Section 3 */}
          <div className="home-section-three-container">
            <div className="connoisseur-header-wrapper">
              <div className="connoisseur-header-text">
                <h2 className='connoisseur-title'>Crafted for the <br /></h2>
                <h1>
                  <span className="connoisseur-title-accent">Connoisseur.</span>
                </h1>
                <p>
                  We don't just make sweets; we engineer moments of absolute pleasure through heritage and precision.
                </p>
              </div>
              <div className="connoisseur-categories-container row-top">

                <div className="category-card-large">
                  <img src={categories[0].image} alt={categories[0].name} />
                  <div className="card-overlay-gradient"></div>

                  <div className="category-card-content">
                    <h3>{categories[0].name}</h3>
                    <p>{categories[0].description}</p>
                    <br />
                    <span>Discover the range →</span>
                  </div>
                </div>
                <div className="category-cards-right row-top">
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

          {/* Home Section 4 - Signature Mithai */}
          <ItemsCarousel
            items={items}
            title="Signature Mithai"
            description="Our signature mithai are customer favorites, celebrated for their irresistible flavors, authentic recipes, and perfectly balanced sweetness."
          />

          {/* Home Section 5 */}
          <div className="home-section-five-container">
            <h1>Shop the Finest</h1>
            <p>
              Every flavor is carefully selected to deliver richness,
              balance, and authenticity with every bite.
            </p>
            <img src={home_wrapper_image} alt="home-wrapper" className="section-five-img" />
          </div>
        </div>

        {/* Home Section 6 */}
        <Features />

        <div className="div-90">

          {/* Home Section 7 */}
          <div className="home-section-seven-container row-sb">
            <h1>Our 🍩! <br />Through Their Words.</h1>

            <div className="reviews-container-section-main row">
              <div className="reviews-container">

              </div>
              <div className="reviews-container">

              </div>
              <div className="reviews-container">

              </div>

            </div>

          </div>

          {/* Home Section 8 - Masterfully Made Chocolate */}
          <ItemsCarousel
            items={items}
            title="Masterfully Made Chocolate"
            description="Each chocolate is thoughtfully created using fine ingredients and precise techniques, resulting in smooth textures, deep flavors, and a perfectly balanced finish in every bite."
          />

        </div>

        <Footer />

      </section>
    </>
  )
}

export default Home