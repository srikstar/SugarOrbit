import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Home.css'
import Footer from '../../Components/Footer/Footer'
import { homeSweets, homeNamkeens } from '../../API/home.api'
import { setHomeSweetData, setHomeNamkeenData } from '../../Redux/home.js'
import { setCartData } from '../../Redux/cart.redux.js'

const VISIBLE_CARDS = 3
const DRAG_THRESHOLD = 50

function ProductCarousel({
  items,
  currentIndex,
  setIndex,
  dragHandlers,
  isDragging,
  activeSize,
  onSizeSelect,
  onAddToCart,
  onItemClick
}) {
  const translateX = -(currentIndex * (100 / VISIBLE_CARDS))

  return (
    <>
      <div
        className="carousel-wrapper"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        {...dragHandlers}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {items.map((item) => {
            const sizes = item.productPrice.map((p) => p.size)
            const selectedSize = activeSize[item._id] || sizes[0]
            const selectedPrice = item.productPrice.find((p) => p.size === selectedSize)?.price

            return (
              <div
                key={item._id}
                className="carousel-slide"
                onClick={() => onItemClick(item._id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-card">
                  <div className="product-image-wrapper">
                    <img
                      src={item.productImages[0]}
                      alt={item.productName}
                      className="product-image"
                      draggable="false"
                    />
                    <div className="product-badge">{item.totalOrders} orders</div>
                  </div>
                  <div className="product-info">
                    <h3 className="item-name">{item.productName}</h3>
                    <p className="product-description">{item.productDescription}</p>
                    <div className="size-selector">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); onSizeSelect(item._id, size) }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div className="product-footer">
                      <span className="item-price">₹{selectedPrice}</span>
                      <button
                        className="add-to-cart-btn"
                        onClick={(e) => { e.stopPropagation(); onAddToCart({ ...item, selectedSize }) }}
                      >
                        Add to Cart
                      </button>
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

/* ─────────────────────────────────────────────────────────────────────────────
   Home
───────────────────────────────────────────────────────────────────────────── */
function Home() {
  const [activeSize, setActiveSize] = useState({})
  const [bestSellersIndex, setBestSellersIndex] = useState(0)
  const [namkeensIndex, setNamekeensIndex] = useState(0)
  const [isDraggingBS, setIsDraggingBS] = useState(false)
  const [isDraggingNK, setIsDraggingNK] = useState(false)

  /* One ref per carousel — stores startX during drag */
  const bsDragRef = useRef({ active: false, startX: 0 })
  const nkDragRef = useRef({ active: false, startX: 0 })

  const heroImage = 'https://sugar-orbit-assets.s3.ap-south-1.amazonaws.com/homepage.png'
  const shopImage = './shopimg.png'
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    const handleSweets = async () => {
      try {
        const response = await homeSweets()
        dispatch(setHomeSweetData(response?.data))
      } catch (error) {
        console.log(error)
      }
    }

    const handleNamkeens = async () => {
      try {
        const response = await homeNamkeens()
        dispatch(setHomeNamkeenData(response?.data))
      } catch (error) {
        console.log(error)
      }
    }

    handleSweets()
    handleNamkeens()
  }, [])

  const handleSweetItem = (id) => navigate(`/sweets/${id}`)
  const handleNamkeenItem = (id) => navigate(`/namkeens/${id}`)

  const handleCart = (data) => {
    const selectedPrice = data.productPrice.find(p => p.size === data.selectedSize)?.price

    const cartItem = {
      _id: data._id,
      productName: data.productName,
      selectedSize: data.selectedSize,
      price: selectedPrice,
      productImages: data.productImages,
      quantity: 1
    }

    dispatch(setCartData(cartItem))
  }

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

  const sweetItems = useSelector(state => state.home.sweets)
  const namkeenItems = useSelector(state => state.home.namkeens)

  /* ── Helpers ─────────────────────────────────────────────────────────────── */

  const handleSizeSelect = (itemId, size) =>
    setActiveSize(prev => ({ ...prev, [itemId]: size }))

  const nav = (direction, setIndex, total) => {
    const max = total - VISIBLE_CARDS
    setIndex(prev =>
      direction === 'left' ? Math.max(prev - 1, 0) : Math.min(prev + 1, max)
    )
  }

  /* ── Drag factory ────────────────────────────────────────────────────────── */
  const makeDragHandlers = (dragRef, setIndex, total, setDragging) => {
    const max = total - VISIBLE_CARDS

    const start = (clientX) => {
      dragRef.current = { active: true, startX: clientX }
      setDragging(true)
    }

    const end = (clientX) => {
      if (!dragRef.current?.active) return
      const diff = dragRef.current.startX - clientX
      if (diff > DRAG_THRESHOLD) setIndex(p => Math.min(p + 1, max))
      else if (diff < -DRAG_THRESHOLD) setIndex(p => Math.max(p - 1, 0))
      dragRef.current = { active: false, startX: 0 }
      setDragging(false)
    }

    return {
      onMouseDown: (e) => start(e.clientX),
      onMouseUp: (e) => end(e.clientX),
      onMouseLeave: (e) => end(e.clientX),
      onTouchStart: (e) => start(e.touches[0].clientX),
      onTouchEnd: (e) => end(e.changedTouches[0].clientX),
    }
  }

  const bsDragHandlers = makeDragHandlers(bsDragRef, setBestSellersIndex, sweetItems.length, setIsDraggingBS)
  const nkDragHandlers = makeDragHandlers(nkDragRef, setNamekeensIndex, namkeenItems.length, setIsDraggingNK)

  useEffect(() => {
    document.title = 'Sugar Orbit | Premium Sweets & Namkeens'
  }, [])

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <div className="home-wrapper row">

      {/* Hero */}
      <section className="hero-section">
        <img src={heroImage} alt="Hero Banner" className="hero-image" draggable="false" />
        <div className="hero-overlay" />
      </section>

      {/* Intro */}
      <div className="carousels-gold-wrapper div row">
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
      </div>

      {/* Categories */}
      <div className="carousels-gold-wrapper div row">
        <section className="categories-section div-80">
          <div className="container">
            <div className="section-header">
              <h2>Explore Our Collections</h2>
              <div className="header-accent" />
            </div>

            <div className="categories-grid">

              <Link to="/sweets">
                <div className="category-card large-card">
                  <div className="card-image-wrapper">
                    <img
                      src={categories[0].image}
                      alt={categories[0].name}
                      className="card-image"
                      draggable="false"
                    />
                  </div>
                  <div className="card-overlay" />
                  <div className="card-content">
                    <h3>{categories[0].name}</h3>
                    <p>{categories[0].description}</p>
                    <span className="card-link">
                      Explore <span className="arrow">→</span>
                    </span>
                  </div>
                </div>
              </Link>

              <div className="categories-right">
                {categories.slice(1, 3).map((cat) => (
                  <Link to={cat.link} key={cat.id}>
                    <div className="category-card medium-card">
                      <div className="card-image-wrapper">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="card-image"
                          draggable="false"
                        />
                      </div>
                      <div className="card-overlay" />
                      <div className="card-content">
                        <h3>{cat.name}</h3>
                        <span className="card-link">
                          Explore <span className="arrow">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* ── Gold wrapper ── */}
      <div className="carousels-gold-wrapper div">
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
              dragHandlers={bsDragHandlers}
              isDragging={isDraggingBS}
              activeSize={activeSize}
              onSizeSelect={handleSizeSelect}
              onAddToCart={handleCart}
              onItemClick={handleSweetItem}
            />
          </div>
        </section>

        {/* Gifting */}
        <div className="carousels-gold-wrapper div row">
          <section className="intro-section div">
            <div className="container">
              <div className="intro-content div-80">
                <h1 className="intro-title">
                  Celebrate Every Moment with <span className="accent">Perfect Gifting</span>
                </h1>
                <p className="intro-description">
                  Thoughtfully curated gift hampers crafted with premium sweets and elegant packaging.
                  Whether it's festivals, weddings, or corporate celebrations, make every occasion
                  unforgettable with a touch of tradition and luxury.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Mid Hero */}
        <section className="hero-section">
          <img src={shopImage} alt="Hero Banner" className="shop-image" draggable="false" />
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
              dragHandlers={nkDragHandlers}
              isDragging={isDraggingNK}
              activeSize={activeSize}
              onSizeSelect={handleSizeSelect}
              onAddToCart={handleCart}
              onItemClick={handleNamkeenItem}
            />
          </div>
        </section>

      </div>{/* /carousels-gold-wrapper */}




      <Footer />
    </div>
  )
}

export default Home