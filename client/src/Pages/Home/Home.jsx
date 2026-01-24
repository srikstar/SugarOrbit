import React from 'react'
import './Home.css'
import Footer from '../Components/Footer/Footer';

function Home() {

  // Features section refs and state
  const featuresRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - featuresRef.current.offsetLeft);
    setScrollLeft(featuresRef.current.scrollLeft);
    featuresRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (featuresRef.current) {
      featuresRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - featuresRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    featuresRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (featuresRef.current) {
        featuresRef.current.style.cursor = 'grab';
      }
    }
  }

  // Section 2 - Best Sellers
  const itemsScrollRef1 = React.useRef(null);
  const [isItemsDragging1, setIsItemsDragging1] = React.useState(false);
  const [itemsStartX1, setItemsStartX1] = React.useState(0);
  const [itemsScrollLeft1, setItemsScrollLeft1] = React.useState(0);

  const handleItemsMouseDown1 = (e) => {
    setIsItemsDragging1(true);
    setItemsStartX1(e.pageX - itemsScrollRef1.current.offsetLeft);
    setItemsScrollLeft1(itemsScrollRef1.current.scrollLeft);
  };

  const handleItemsMouseUp1 = () => {
    setIsItemsDragging1(false);
  };

  const handleItemsMouseMove1 = (e) => {
    if (!isItemsDragging1) return;
    e.preventDefault();
    const x = e.pageX - itemsScrollRef1.current.offsetLeft;
    const walk = (x - itemsStartX1) * 2;
    itemsScrollRef1.current.scrollLeft = itemsScrollLeft1 - walk;
  };

  const handleItemsMouseLeave1 = () => {
    setIsItemsDragging1(false);
  };

  // Section 4 - Signature Mithai
  const itemsScrollRef2 = React.useRef(null);
  const [isItemsDragging2, setIsItemsDragging2] = React.useState(false);
  const [itemsStartX2, setItemsStartX2] = React.useState(0);
  const [itemsScrollLeft2, setItemsScrollLeft2] = React.useState(0);

  const handleItemsMouseDown2 = (e) => {
    setIsItemsDragging2(true);
    setItemsStartX2(e.pageX - itemsScrollRef2.current.offsetLeft);
    setItemsScrollLeft2(itemsScrollRef2.current.scrollLeft);
  };

  const handleItemsMouseUp2 = () => {
    setIsItemsDragging2(false);
  };

  const handleItemsMouseMove2 = (e) => {
    if (!isItemsDragging2) return;
    e.preventDefault();
    const x = e.pageX - itemsScrollRef2.current.offsetLeft;
    const walk = (x - itemsStartX2) * 2;
    itemsScrollRef2.current.scrollLeft = itemsScrollLeft2 - walk;
  };

  const handleItemsMouseLeave2 = () => {
    setIsItemsDragging2(false);
  };

  // Section 8 - Masterfully Made Chocolate
  const itemsScrollRef3 = React.useRef(null);
  const [isItemsDragging3, setIsItemsDragging3] = React.useState(false);
  const [itemsStartX3, setItemsStartX3] = React.useState(0);
  const [itemsScrollLeft3, setItemsScrollLeft3] = React.useState(0);

  const handleItemsMouseDown3 = (e) => {
    setIsItemsDragging3(true);
    setItemsStartX3(e.pageX - itemsScrollRef3.current.offsetLeft);
    setItemsScrollLeft3(itemsScrollRef3.current.scrollLeft);
  };

  const handleItemsMouseUp3 = () => {
    setIsItemsDragging3(false);
  };

  const handleItemsMouseMove3 = (e) => {
    if (!isItemsDragging3) return;
    e.preventDefault();
    const x = e.pageX - itemsScrollRef3.current.offsetLeft;
    const walk = (x - itemsStartX3) * 2;
    itemsScrollRef3.current.scrollLeft = itemsScrollLeft3 - walk;
  };

  const handleItemsMouseLeave3 = () => {
    setIsItemsDragging3(false);
  };

  const features = [
    {
      id: 1,
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="12" r="3" />
        </svg>
      ),
      title: 'Sulphur-Free Process'
    },
    {
      id: 2,
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
      title: 'Trans Fat-Free Oil'
    },
    {
      id: 3,
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
          <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      ),
      title: '100% Vegetarian'
    },
    {
      id: 4,
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="11" rx="7" ry="9" />
          <path d="M12 2v9" />
        </svg>
      ),
      title: 'Eggless'
    },
    {
      id: 5,
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="13" rx="9" ry="4" />
          <path d="M12 17c-4.97 0-9-1.79-9-4v-2c0-2.21 4.03-4 9-4s9 1.79 9 4v2c0 2.21-4.03 4-9 4z" />
          <path d="M12 3v4" />
        </svg>
      ),
      title: 'Freshly Baked'
    },
    {
      id: 6,
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: 'Handcrafted'
    }
  ];

  const home_wrapper_image =
    'https://static.vecteezy.com/system/resources/thumbnails/049/994/140/small/abstract-holographic-gradient-blurred-background-fluid-aura-wallpaper-empty-textured-backdrop-illustration-vector.jpg'

  const item_top = {
    orders: 25,
    image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
    name: 'Mysore Pak',
    description:
      'Mysore Pak is a true taste of tradition. Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance of sweetness.',
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

          {/* Home Section 2 */}
          <div className="home-section-two-container">
            <h3>Best Sellers</h3>
            <div className="home-para-one">
              <p>
                Our best sellers are customer favorites, loved for their
                irresistible flavors and perfect balance.
              </p>
            </div>

            <div
              className={`items-display-main-container column ${isItemsDragging1 ? 'dragging' : ''}`}
              ref={itemsScrollRef1}
              onMouseDown={handleItemsMouseDown1}
              onMouseUp={handleItemsMouseUp1}
              onMouseMove={handleItemsMouseMove1}
              onMouseLeave={handleItemsMouseLeave1}
            >
              <div className="item-display-max">
                {items.map((item, i) => (
                  <div className="item-display-container" key={i}>
                    <span className="order-count">{item.orders}k orders</span>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                      draggable="false"
                    />

                    <h4>{item.name}</h4>
                    <p>{item.description}</p>

                    <div className="item-size-container row-fs">
                      {item.weight.map((w, index) => (
                        <div
                          key={index}
                          className={`item-size row ${index !== 0 ? 'item-size-n' : ''}`}
                        >
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>

                    <button className="item-add-btn">Add to cart</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

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

          {/* Home Section 4 */}
          <div className="home-section-two-container">
            <h3>Signature Mithai</h3>
            <div className="home-para-one">
              <p>Our signature mithai are customer favorites, celebrated for their irresistible flavors, authentic recipes, and perfectly balanced sweetness.</p>
            </div>

            <div
              className={`items-display-main-container column ${isItemsDragging2 ? 'dragging' : ''}`}
              ref={itemsScrollRef2}
              onMouseDown={handleItemsMouseDown2}
              onMouseUp={handleItemsMouseUp2}
              onMouseMove={handleItemsMouseMove2}
              onMouseLeave={handleItemsMouseLeave2}
            >
              <div className="item-display-max">
                {items.map((item, i) => (
                  <div className="item-display-container" key={i}>
                    <span className="order-count">{item.orders}k orders</span>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                      draggable="false"
                    />

                    <h4>{item.name}</h4>
                    <p>{item.description}</p>

                    <div className="item-size-container row-fs">
                      {item.weight.map((w, index) => (
                        <div
                          key={index}
                          className={`item-size row ${index !== 0 ? 'item-size-n' : ''}`}
                        >
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>

                    <button className="item-add-btn">Add to cart</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
        <div className="home-section-six-container row-sb">
          <section className="features-section">
            <div className="features-container">
              <div
                className="features-grid row-sb"
                ref={featuresRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {features.map((feature) => (
                  <div key={feature.id} className="feature-item">
                    <div className="feature-icon row">
                      {feature.icon}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="div-90">

          {/* Home Section 7 */}
          <div className="home-section-seven-container row-sb">
            <h1>Our 🍩! <br />Through Their Words.</h1>
            <div className="reviews-container-section">
              <div className="reviews-container-section-main">
                <div className="reviews-container">

                </div>
                <div className="reviews-container">

                </div>
                <div className="reviews-container">

                </div>

              </div>
            </div>
          </div>

          {/* Home Section 8 */}
          <div className="home-section-eight-container row-sb">
            <div className="home-section-two-container">
              <h3>Masterfully Made Chocolate</h3>
              <div className="home-para-one">
                <p>Each chocolate is thoughtfully created using fine ingredients and precise techniques, resulting in smooth textures, deep flavors, and a perfectly balanced finish in every bite.
                </p>
              </div>

              <div
                className={`items-display-main-container column ${isItemsDragging3 ? 'dragging' : ''}`}
                ref={itemsScrollRef3}
                onMouseDown={handleItemsMouseDown3}
                onMouseUp={handleItemsMouseUp3}
                onMouseMove={handleItemsMouseMove3}
                onMouseLeave={handleItemsMouseLeave3}
              >
                <div className="item-display-max">
                  {items.map((item, i) => (
                    <div className="item-display-container" key={i}>
                      <span className="order-count">{item.orders}k orders</span>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                        draggable="false"
                      />

                      <h4>{item.name}</h4>
                      <p>{item.description}</p>

                      <div className="item-size-container row-fs">
                        {item.weight.map((w, index) => (
                          <div
                            key={index}
                            className={`item-size row ${index !== 0 ? 'item-size-n' : ''}`}
                          >
                            <span>{w}</span>
                          </div>
                        ))}
                      </div>

                      <button className="item-add-btn">Add to cart</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        <Footer />

      </section>
    </>
  )
}

export default Home