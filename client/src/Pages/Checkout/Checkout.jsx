import React, { useState, useEffect } from "react";
import "./Checkout.css";

const Checkout = () => {
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setCartLoading(true);
        const response = await fetch("/api/cart");
        if (!response.ok) throw new Error("Failed to fetch cart");
        setCartItems([{
          "id": "1",
          "name": "Mysore Pak",
          "variant": "Classic · 250g",
          "price": 225,
          "quantity": 1,
          "emoji": "🍬"
        }, {
          "id": "2",
          "name": "Kaju Katli",
          "variant": "Premium · 250g",
          "price": 300,
          "quantity": 3,
          "emoji": "🥮"
        }]);
      } catch (err) {
        setCartError(err.message);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 100;
  const total = subtotal + shipping;

  return (
    <div className="main-section">
      <div className="co-page">
        <div className="co-main div-80">
          <div className="co-left">

            <section className="co-section">
              <div className="co-section-header">
                <h2 className="co-section-title">Contact</h2>
                <a href="#" className="co-link">Sign in</a>
              </div>
              <input type="text" placeholder="Email or mobile phone number" className="co-input" />
            </section>

            <section className="co-section">
              <h2 className="co-section-title">Delivery</h2>
              <select className="co-input"><option>India</option></select>
              <div className="co-row">
                <input className="co-input" placeholder="First name (optional)" />
                <input className="co-input" placeholder="Last name" />
              </div>
              <input className="co-input" placeholder="Address" />
              <input className="co-input" placeholder="Apartment, suite, etc. (optional)" />
              <div className="co-row">
                <input className="co-input" placeholder="City" />
                <input className="co-input" placeholder="State" />
                <input className="co-input" placeholder="PIN code" />
              </div>
              <input className="co-input" placeholder="Phone" />
            </section>

            <section className="co-section">
              <h3 className="co-section-title" style={{ fontSize: '16px' }}>Shipping method</h3>
              <div className="co-shipping-box">
                <div className="co-shipping-label">
                  <div className="co-shipping-icon">📦</div>
                  <div>
                    <div style={{ fontWeight: 500 }}>Standard Delivery</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>3–5 business days</div>
                  </div>
                </div>
                <span className="co-shipping-price">₹100.00</span>
              </div>
            </section>

            <section className="co-section">
              <h2 className="co-section-title">Payment</h2>
              <p className="co-muted">All transactions are secure and encrypted.</p>
              <div className="co-payment-box">
                <span className="co-payment-badge">Razorpay</span>
                <span>Secure Payment</span>
                <div className="co-payment-methods">
                  <span className="co-pm-chip">UPI</span>
                  <span className="co-pm-chip">Cards</span>
                  <span className="co-pm-chip">Wallets</span>
                  <span className="co-pm-chip">NetBanking</span>
                </div>
              </div>
            </section>

            <section className="co-section">
              <h2 className="co-section-title">Billing address</h2>
              <div className="co-billing-box">
                <label className="co-billing-option">
                  <input type="radio" checked={billingSameAsShipping} onChange={() => setBillingSameAsShipping(true)} />
                  <span>Same as shipping address</span>
                </label>
                <label className="co-billing-option">
                  <input type="radio" checked={!billingSameAsShipping} onChange={() => setBillingSameAsShipping(false)} />
                  <span>Use a different billing address</span>
                </label>
                {!billingSameAsShipping && (
                  <div className="co-billing-form">
                    <input className="co-input" placeholder="Address" />
                    <div className="co-row">
                      <input className="co-input" placeholder="City" />
                      <input className="co-input" placeholder="PIN code" />
                    </div>
                  </div>
                )}
              </div>
            </section>

            <div className="co-cta">
              <button className="co-pay-btn">
                Pay now — ₹{total.toFixed(2)}
              </button>
              <p className="co-pay-note">🔒 Encrypted & secure checkout via Razorpay</p>
            </div>

          </div>

          <div className="co-right">
            <div className="co-order-title">Your Order</div>

            {cartLoading && <p className="co-muted">Loading cart...</p>}
            {cartError && <p className="co-muted" style={{ color: 'red' }}>Error: {cartError}</p>}

            {!cartLoading && !cartError && cartItems.map((item) => (
              <div className="co-order-item" key={item.id}>
                <div className="co-item-img">
                  {item.emoji}
                  <span className="co-item-qty">{item.quantity}</span>
                </div>
                <div className="co-item-info">
                  <div className="co-item-name">{item.name}</div>
                  <div className="co-item-sub">{item.variant}</div>
                </div>
                <span className="co-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="co-divider" />

            <div className="co-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="co-summary-row">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="co-summary-row">
              <span>Taxes</span>
              <span>Included</span>
            </div>

            <div className="co-divider" />

            <div className="co-total-row">
              <span className="co-total-label">Total</span>
              <span className="co-total-amount">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;