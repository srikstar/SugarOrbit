import React, { useEffect, useState } from 'react'
import './Home.css'
import Footer from '../../Components/Footer/Footer'

const VISIBLE_CARDS = 3

function Home() {
  const [activeSize, setActiveSize] = useState({})
  const [bestSellersIndex, setBestSellersIndex] = useState(0)
  const [namkeensIndex, setNamekeensIndex] = useState(0)

  const heroImage =
    'https://sangamsweets.in/cdn/shop/files/Banner_New_Gift_Hamper_1.png?v=1766405392'

  const categories = [
    {
      id: 1,
      name: 'Artisanal Sweets',
      description: 'Heritage recipes meet modern craftsmanship',
      image: './sweet.jpg',
      link: '/sweets',
    },
    {
      id: 2,
      name: 'Premium Namkeens',
      description: 'Crispy perfection in every bite',
      image: 'https://t3.ftcdn.net/jpg/01/35/88/24/360_F_135882487_NlLY54S7hYZQHXVTzSLc6KkXBp7gz0nD.jpg',
      link: '/namkeens',
    },
    {
      id: 3,
      name: 'Exotic Chocolates',
      description: 'Pure indulgence redefined',
      image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      link: '/chocolates',
    },
  ]

  // Each item has a prices map keyed by size
  const sweetItems = [
    {
      id: 1,
      name: 'Soan Papdi',
      description: 'Delicate, flaky texture with traditional taste',
      sizes: ['250g', '500g', '1kg'],
      prices: { '250g': '₹299', '500g': '₹549', '1kg': '₹999' },
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Gulab Jamun',
      description: 'Soft, spongy balls in sweet syrup',
      sizes: ['250g', '500g', '1kg'],
      prices: { '250g': '₹349', '500g': '₹649', '1kg': '₹1,199' },
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Kaju Katli',
      description: 'Silky cashew fudge with cardamom essence',
      sizes: ['250g', '500g', '1kg'],
      prices: { '250g': '₹399', '500g': '₹749', '1kg': '₹1,399' },
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',
      rating: 5.0,
    },
    {
      id: 4,
      name: 'Rasgulla',
      description: 'Fluffy, spongy dumplings in light syrup',
      sizes: ['250g', '500g', '1kg'],
      prices: { '250g': '₹279', '500g': '₹529', '1kg': '₹979' },
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',
      rating: 4.7,
    },
    {
      id: 5,
      name: 'Barfi Assorted',
      description: 'Mix of milk, coconut & chocolate barfi',
      sizes: ['250g', '500g', '1kg'],
      prices: { '250g': '₹449', '500g': '₹849', '1kg': '₹1,549' },
      image: 'https://bombaysweets.in/cdn/shop/files/Milk_Soanpapdi_1000x1000_1346e3df-f1d0-4f02-a2b5-7bca2c0fbc4b.jpg?v=1698835796',
      rating: 4.9,
    },
  ]

  // Namkeen items use ids starting at 100 so activeSize state stays separate
  const namkeenItems = sweetItems.map(item => ({ ...item, id: item.id + 100 }))

  /* ---- helpers ---- */

  const handleSizeSelect = (itemId, size) =>
    setActiveSize(prev => ({ ...prev, [itemId]: size }))

  const nav = (direction, setIndex, total) => {
    const max = total - VISIBLE_CARDS
    setIndex(prev =>
      direction === 'left' ? Math.max(prev - 1, 0) : Math.min(prev + 1, max)
    )
  }

  useEffect(() => {
    document.title = 'Sugar Orbit | Premium Sweets & Namkeens'
  }, [])

  /* ---- reusable carousel ---- */

  const ProductCarousel = ({ items, currentIndex, setIndex }) => {
    const translateX = -(currentIndex * (100 / VISIBLE_CARDS))

    return (
      <>
        <div className="carousel-wrapper">
          <div
            className="carousel-track"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {items.map((item) => {
              const selectedSize = activeSize[item.id] || item.sizes[0]
              return (
                <div key={item.id} className="carousel-slide">
                  <div className="product-card">
                    <div className="product-image-wrapper">
                      <img src={item.image} alt={item.name} className="product-image" />
                      <div className="product-badge">{item.rating} ★</div>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{item.name}</h3>
                      <p className="product-description">{item.description}</p>
                      <div className="size-selector">
                        {item.sizes.map(size => (
                          <button
                            key={size}
                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                            onClick={() => handleSizeSelect(item.id, size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <div className="product-footer">
                        <span className="product-price">{item.prices[selectedSize]}</span>
                        <button className="add-to-cart-btn">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: items.length - VISIBLE_CARDS + 1 }).map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </>
    )
  }

  /* ---- render ---- */

  return (
    <div className="home-wrapper row">

      {/* Hero */}
      <section className="hero-section">
        <img src={heroImage} alt="Hero Banner" className="hero-image" />
        <div className="hero-overlay" />
      </section>

      {/* Intro */}
      <section className="intro-section div-80">
        <div className="container">
          <div className="intro-content">
            <h1 className="intro-title">
              Taste the <span className="accent">Artistry</span> of Tradition
            </h1>
            <p className="intro-description">
              Meticulously crafted with heritage recipes and premium ingredients, each sweet
              tells a story of tradition and excellence. Discover the perfect blend of
              authentic taste and modern craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section div-80">
        <div className="container">
          <div className="section-header">
            <h2>Explore Our Collections</h2>
            <div className="header-accent" />
          </div>

          <div className="categories-grid">
            <div className="category-card large-card">
              <div className="card-image-wrapper">
                <img src={categories[0].image} alt={categories[0].name} className="card-image" />
              </div>
              <div className="card-overlay" />
              <div className="card-content">
                <h3>{categories[0].name}</h3>
                <p>{categories[0].description}</p>
                <a href={categories[0].link} className="card-link">
                  Explore <span className="arrow">→</span>
                </a>
              </div>
            </div>

            <div className="categories-right">
              {categories.slice(1, 3).map(cat => (
                <div key={cat.id} className="category-card medium-card">
                  <div className="card-image-wrapper">
                    <img src={cat.image} alt={cat.name} className="card-image" />
                  </div>
                  <div className="card-overlay" />
                  <div className="card-content">
                    <h3>{cat.name}</h3>
                    <a href={cat.link} className="card-link">
                      Explore <span className="arrow">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="products-section div-80">
        <div className="container">
          <div className="section-header">
            <div className="header-content">
              <h2>Best Sellers</h2>
              <p>Customer favorites loved for their irresistible flavors and perfect balance</p>
            </div>
            <div className="scroll-controls">
              <button
                className="scroll-btn"
                onClick={() => nav('left', setBestSellersIndex, sweetItems.length)}
                disabled={bestSellersIndex === 0}
                aria-label="Previous"
              >←</button>
              <button
                className="scroll-btn"
                onClick={() => nav('right', setBestSellersIndex, sweetItems.length)}
                disabled={bestSellersIndex >= sweetItems.length - VISIBLE_CARDS}
                aria-label="Next"
              >→</button>
            </div>
          </div>

          <ProductCarousel
            items={sweetItems}
            currentIndex={bestSellersIndex}
            setIndex={setBestSellersIndex}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="hero-section">
        <img src={heroImage} alt="Hero Banner" className="hero-image" />
        <div className="hero-overlay" />
      </section>

      {/* Premium Namkeens */}
      <section className="products-section namkeens-section div-80">
        <div className="container">
          <div className="section-header">
            <div className="header-content">
              <h2>Premium Namkeens</h2>
              <p>Crispy, savory delights perfect for any occasion</p>
            </div>
            <div className="scroll-controls">
              <button
                className="scroll-btn"
                onClick={() => nav('left', setNamekeensIndex, namkeenItems.length)}
                disabled={namkeensIndex === 0}
                aria-label="Previous"
              >←</button>
              <button
                className="scroll-btn"
                onClick={() => nav('right', setNamekeensIndex, namkeenItems.length)}
                disabled={namkeensIndex >= namkeenItems.length - VISIBLE_CARDS}
                aria-label="Next"
              >→</button>
            </div>
          </div>

          <ProductCarousel
            items={namkeenItems}
            currentIndex={namkeensIndex}
            setIndex={setNamekeensIndex}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home