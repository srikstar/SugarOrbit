import React, { useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  return (
    <div className="main-section">


      <div className="co-page">
        <div className="co-main">
          {/* LEFT */}
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
              <button className="co-pay-btn">Pay now — ₹325.00</button>
              <p className="co-pay-note">🔒 Encrypted & secure checkout via Razorpay</p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="co-right">
            <div className="co-order-title">Your Order</div>

            <div className="co-order-item">
              <div className="co-item-img">
                🍬
                <span className="co-item-qty">1</span>
              </div>
              <div className="co-item-info">
                <div className="co-item-name">Mysore Pak</div>
                <div className="co-item-sub">Classic · 250g</div>
              </div>
              <span className="co-item-price">₹225.00</span>
            </div>

            <div className="co-divider" />

            <div className="co-summary-row">
              <span>Subtotal</span>
              <span>₹225.00</span>
            </div>
            <div className="co-summary-row">
              <span>Shipping</span>
              <span>₹100.00</span>
            </div>
            <div className="co-summary-row">
              <span>Taxes</span>
              <span>Included</span>
            </div>

            <div className="co-divider" />

            <div className="co-total-row">
              <span className="co-total-label">Total</span>
              <span className="co-total-amount">₹325.00</span>
            </div>

            <div className="co-savings-badge">🎉 You saved ₹25 on this order!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;