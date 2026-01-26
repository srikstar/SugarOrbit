import { useEffect, useState } from "react";
import "./Product.css";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import Features from "../../Components/Features/Features";

const Product = () => {
  const [weight, setWeight] = useState("250g");
  const [qty, setQty] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const image = 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg'


  return (
    <>

      <div className="main-container row">
        <div className="div-90">
          <section className="product-page">
            <div className="product-container">

              {/* Images */}
              <div className="product-images">
                <img src={image} alt="Kaju Roll" />
              </div>


              <div className="product-details">
                <div className="item-details-container">
                  <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="108" height="108" rx="16" fill="#F4FFF6" stroke="#2E7D32" stroke-width="4" />
                    <path d="M40 65c15-30 40-35 40-35s-2 28-22 45c-8 6-14 4-18-10z"
                      fill="#2E7D32" />
                    <path d="M45 65l8 8 18-20" stroke="#2E7D32" stroke-width="5" fill="none" stroke-linecap="round" />
                    <text x="60" y="105" text-anchor="middle" font-size="12" fill="#2E7D32"
                      font-family="Arial, sans-serif">VEGETARIAN</text>
                  </svg>

                </div>
                <h1>Kaju Roll</h1>
                <p className="price">Rs. 345.00</p>
                <p className="tax">Taxes included. Shipping calculated at checkout.</p>

                {/* Weight */}
                <div className="weight">
                  <p>Weight</p>
                  <div className="weight-options">
                    <button
                      className={weight === "250g" ? "active" : ""}
                      onClick={() => setWeight("250g")}
                    >
                      250g
                    </button>
                    <button
                      className={weight === "500g" ? "active" : ""}
                      onClick={() => setWeight("500g")}
                    >
                      500g
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="quantity">
                  <p>Quantity</p>
                  <div className="qty-box row-sb">
                    <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(qty + 1)}>+</button>
                  </div>
                </div>

                {/* Actions */}
                <button className="add-cart">Add to cart</button>
                <button className="buy-now">Buy it now</button>

                {/* Accordions */}
                <div className="accordion">
                  <details open>
                    <summary>
                      <span className="acc-icon">📦</span>
                      <span className="acc-title">Description</span>
                    </summary>
                    <p>
                      Popular across many North Indian households, the Kaju Roll is
                      elegantly crafted with a rich cashew paste exterior and a
                      delicious dry fruit filling.
                    </p>
                  </details>

                  <details>
                    <summary>
                      <span className="acc-icon">📋</span>
                      <span className="acc-title">Specification</span>
                    </summary>
                    <ul>
                      <li>Net Weight: 250g / 500g</li>
                      <li>Product Type: Dryfruit Sweets</li>
                      <li>Shelf Life: 30 days</li>
                      <li>Store in a cool, dry place</li>
                    </ul>
                  </details>

                  <details>
                    <summary>
                      <span className="acc-icon">🌾</span>
                      <span className="acc-title">Contents</span>
                    </summary>
                    <p>Cashew nuts, sugar, ghee, assorted dry fruits</p>
                  </details>

                  <details>
                    <summary>
                      <span className="acc-icon">🚚</span>
                      <span className="acc-title">Shipping</span>
                    </summary>
                    <p>
                      Fast and secure delivery via our online store.
                      Also available on Swiggy and Zomato.
                    </p>
                  </details>
                </div>

              </div>
            </div>
          </section>
        </div>

        <Features />

        <div className="div-90 row">
          <div className="recommend">
            <h2>You may also like</h2>
            <div className="recommend-grid">
              {[
                "Kesar Kaju Burfi",
                "Kaju Burfi",
                "Kaju Pakam",
                "Monthal",
              ].map((item, i) => (
                <div className="card" key={i}>
                  <img src={image} alt={item} />
                  <Link to='/product'><h4>{item}</h4></Link>
                  <div className="recommend-card-container row-sb">
                    <p>Net Weight: 250g</p>
                    <span>From Rs. 325.00</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Product;
