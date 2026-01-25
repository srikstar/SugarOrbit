import { useState } from "react";
import "./Product.css";

const Product = () => {
  const [weight, setWeight] = useState("250g");
  const [qty, setQty] = useState(1);

  return (
    <section className="product-page">
      <div className="product-container">
        
        {/* LEFT – Images */}
        <div className="product-images">
          <img src="/assets/kaju-roll-1.jpg" alt="Kaju Roll" />
          <img src="/assets/kaju-roll-box.jpg" alt="Kaju Roll Box" />
          <img src="/assets/kaju-roll-2.jpg" alt="Kaju Roll Back" />
        </div>

        {/* RIGHT – Details */}
        <div className="product-details">
          <span className="brand">SANGAM SWEETS</span>
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
            <div className="qty-box">
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
              <summary>Description</summary>
              <p>
                Popular across many North Indian households, the Kaju Roll is
                elegantly crafted with a rich cashew paste exterior and a
                delicious dry fruit filling.
              </p>
            </details>

            <details>
              <summary>Specification</summary>
              <ul>
                <li>Net Weight: 250g / 500g</li>
                <li>Product Type: Dryfruit Sweets</li>
                <li>Shelf Life: 30 days</li>
                <li>Store in a cool, dry place</li>
              </ul>
            </details>

            <details>
              <summary>Contents</summary>
              <p>Cashew nuts, sugar, ghee, assorted dry fruits</p>
            </details>

            <details>
              <summary>Shipping</summary>
              <p>
                Fast and secure delivery via our online store.
                Also available on Swiggy and Zomato.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Recommendations */}
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
              <img src="/assets/kaju-roll-1.jpg" alt={item} />
              <h4>{item}</h4>
              <p>Net Weight: 250g</p>
              <span>From Rs. 325.00</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
