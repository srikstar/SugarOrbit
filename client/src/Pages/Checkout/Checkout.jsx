import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";

/* ─────────────────────────────────────────
   OTP Login form (guest users)
───────────────────────────────────────── */
function OtpLogin() {
  const [phone, setPhone]       = useState("");
  const [step, setStep]         = useState("phone"); // "phone" | "otp"
  const [otp, setOtp]           = useState(["", "", "", "", "", ""]);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError]   = useState("");
  const [sending, setSending]     = useState(false);
  const refs = useRef([]);

  const handleOtpChange = (val, i) => {
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    setOtpError("");
    if (val && i < 5) refs.current[i + 1]?.focus();
    if (!val && i > 0) refs.current[i - 1]?.focus();
  };

  const handleOtpKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const sendOtp = async () => {
    setPhoneError("");
    if (phone.replace(/\D/g, "").length < 10) {
      setPhoneError("Enter a valid 10-digit mobile number.");
      return;
    }
    setSending(true);
    try {
      // TODO: window.confirmationResult = await signInWithPhoneNumber(auth, `+91${phone}`, recaptchaVerifier)
      setStep("otp");
      setTimeout(() => refs.current[0]?.focus(), 100);
    } catch (err) {
      setPhoneError("Failed to send OTP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const verifyOtp = async () => {
    setOtpError("");
    const code = otp.join("");
    if (code.length < 6) {
      setOtpError("Please enter all 6 digits.");
      return;
    }
    try {
      // TODO: await window.confirmationResult.confirm(code)
      // On success Redux will update state.user.data and this component unmounts
      setOtpError(""); // clear on success path
    } catch (err) {
      setOtpError("Incorrect OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => refs.current[0]?.focus(), 100);
    }
  };

  return (
    <div className="co-otp-card">
      {step === "phone" ? (
        <>
          <p className="co-otp-label">Sign in with your mobile number to continue</p>
          <div className="co-phone-row">
            <div className="co-phone-prefix">🇮🇳 +91</div>
            <input
              className={`co-input${phoneError ? " co-input-error" : ""}`}
              type="tel"
              maxLength={10}
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setPhoneError(""); }}
              onKeyDown={(e) => e.key === "Enter" && sendOtp()}
            />
          </div>
          {phoneError && <p className="co-field-error">{phoneError}</p>}
          <button className="co-otp-submit-btn" onClick={sendOtp} disabled={sending}>
            {sending ? "Sending…" : "Send OTP →"}
          </button>
        </>
      ) : (
        <>
          <p className="co-otp-label">
            Enter the 6-digit OTP sent to <strong>+91 {phone}</strong>
          </p>
          <div className="co-otp-boxes">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => (refs.current[i] = el)}
                className={`co-otp-box${otpError ? " co-otp-box-error" : ""}`}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
              />
            ))}
          </div>
          {otpError && <p className="co-field-error">{otpError}</p>}
          <button className="co-otp-submit-btn" onClick={verifyOtp}>
            Verify & Continue →
          </button>
          <button className="co-otp-back-btn" onClick={() => { setStep("phone"); setOtp(["","","","","",""]); setOtpError(""); }}>
            ← Change number
          </button>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Reusable address form
───────────────────────────────────────── */
function AddressForm({ defaults = {} }) {
  return (
    <div className="co-addr-fields">
      <select className="co-input" defaultValue="India">
        <option>India</option>
      </select>
      <div className="co-row">
        <input className="co-input" placeholder="First name (optional)" defaultValue={defaults.firstName || ""} />
        <input className="co-input" placeholder="Last name"             defaultValue={defaults.lastName  || ""} />
      </div>
      <input className="co-input" placeholder="Address"                            defaultValue={defaults.address || ""} />
      <input className="co-input" placeholder="Apartment, suite, etc. (optional)" />
      <div className="co-row">
        <input className="co-input" placeholder="City"     defaultValue={defaults.city  || ""} />
        <input className="co-input" placeholder="State"    defaultValue={defaults.state || ""} />
        <input className="co-input" placeholder="PIN code" defaultValue={defaults.pin   || ""} />
      </div>
      <input className="co-input" placeholder="Phone" defaultValue={defaults.phone || ""} />
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Checkout
───────────────────────────────────────── */
const Checkout = () => {
  const user   = useSelector((state) => state.user?.data);
  const buyNow = useSelector((state) => state.buynow);
  const cart   = useSelector((state) => state.cart);

  const isLoggedIn = !!user;

  /* ── Cart items ── */
  const isBuyNow  = !!buyNow?.product;
  const cartItems = isBuyNow
    ? [{
        id:       buyNow.product._id,
        name:     buyNow.product.productName,
        variant:  buyNow.weight,
        price:    buyNow.price,
        quantity: buyNow.quantity,
        image:    buyNow.image,
      }]
    : cart.map((item) => ({
        id:       item._id,
        name:     item.productName,
        variant:  item.selectedSize,
        price:    item.price,
        quantity: item.quantity,
        image:    item.productImages?.[0],
      }));

  /* ── Coupon ── */
  const [couponInput, setCouponInput]       = useState("");
  const [appliedCoupon, setAppliedCoupon]   = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError]       = useState("");
  const [couponSuccess, setCouponSuccess]   = useState("");

  const applyCoupon = () => {
    setCouponError(""); setCouponSuccess("");
    const code = couponInput.trim().toUpperCase();
    if (!code) { setCouponError("Please enter a coupon code."); return; }
    if (code === "KEEPLEARNING") {
      setAppliedCoupon("KEEPLEARNING");
      setCouponDiscount(50);
      setCouponSuccess("Coupon applied successfully!");
    } else {
      setCouponError("Invalid coupon code. Please try again.");
      setAppliedCoupon(""); setCouponDiscount(0);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(""); setCouponDiscount(0);
    setCouponInput(""); setCouponError(""); setCouponSuccess("");
  };

  /* ── Billing ── */
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  /* ── Totals ── */
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 100;
  const tax      = Math.round(subtotal * 0.18 * 100) / 100;
  const total    = subtotal + shipping + tax - couponDiscount;

  /* ── Address defaults from Redux ── */
  const addrDefaults = isLoggedIn && user?.address
    ? {
        firstName: user.name?.split(" ")[0]                 || "",
        lastName:  user.name?.split(" ").slice(1).join(" ") || "",
        address:   [user.address.building, user.address.street].filter(Boolean).join(", "),
        city:      user.address.city    || "",
        state:     user.address.state   || "",
        pin:       user.address.pincode || user.address.pin || "",
        phone:     user.phoneno         || "",
      }
    : {};

  return (
    <div className="main-section row">
      <div className="co-page row">
        <div className="co-main div-80">

          {/* ══════════ LEFT ══════════ */}
          <div className="co-left">

            {/* 1 · Contact */}
            <section className="co-section">
              <div className="co-section-header">
                <h2 className="co-section-title">Contact</h2>
                {!isLoggedIn && <span className="co-link">Sign In</span>}
              </div>

              {isLoggedIn ? (
                /* ── Radio-style logged-in card ── */
                <div className="co-user-pill">
                  <div className="co-user-radio">
                    <div className="co-radio-outer">
                      <div className="co-radio-inner" />
                    </div>
                  </div>
                  <div className="co-user-text">
                    <span className="co-user-name">{user.name}</span>
                    <span className="co-user-phone">{user.phoneno}</span>
                  </div>
                </div>
              ) : (
                <OtpLogin />
              )}
            </section>

            {/* 2 · Delivery */}
            <section className="co-section">
              <h2 className="co-section-title">Delivery</h2>
              <AddressForm defaults={addrDefaults} />
            </section>

            {/* 3 · Shipping method */}
            <section className="co-section">
              <h2 className="co-section-title">Shipping method</h2>
              <div className="co-shipping-box">
                <div className="co-shipping-label">
                  <div className="co-shipping-icon">📦</div>
                  <div>
                    <div className="co-shipping-name">Standard Delivery</div>
                    <div className="co-shipping-sub">3–5 business days</div>
                  </div>
                </div>
                <span className="co-shipping-price">₹100.00</span>
              </div>
            </section>

            {/* 4 · Payment */}
            <section className="co-section">
              <h2 className="co-section-title">Payment</h2>
              <p className="co-secure-note">
                <span className="co-secure-icon">○</span>
                All transactions are secure and encrypted.
              </p>
              <div className="co-payment-box">
                <span className="co-payment-badge">Razorpay</span>
                <span className="co-payment-label">Secure Payment</span>
                <div className="co-payment-methods">
                  <span className="co-pm-chip">UPI</span>
                  <span className="co-pm-chip">Cards</span>
                  <span className="co-pm-chip">Wallets</span>
                  <span className="co-pm-chip">NetBanking</span>
                </div>
              </div>
            </section>

            {/* 5 · Billing address */}
            <section className="co-section">
              <h2 className="co-section-title">Billing address</h2>
              <div className="co-billing-box">
                <label className="co-billing-option">
                  <input type="radio" name="billing" checked={billingSameAsShipping}  onChange={() => setBillingSameAsShipping(true)} />
                  <span>Same as shipping address</span>
                </label>
                <label className="co-billing-option co-billing-option-last">
                  <input type="radio" name="billing" checked={!billingSameAsShipping} onChange={() => setBillingSameAsShipping(false)} />
                  <span>Use a different billing address</span>
                </label>
                {!billingSameAsShipping && (
                  <div className="co-billing-form">
                    <AddressForm />
                  </div>
                )}
              </div>
            </section>

            {/* CTA */}
            <div className="co-cta">
              {!isLoggedIn && (
                <p className="co-login-warning">⚠ Please sign in to complete your purchase.</p>
              )}
              <button
                className={`co-pay-btn${!isLoggedIn ? " co-pay-btn-disabled" : ""}`}
                disabled={!isLoggedIn}
              >
                Pay now — ₹{total.toFixed(2)}
              </button>
              <p className="co-pay-note">🔒 Encrypted &amp; secure checkout via Razorpay</p>
            </div>

          </div>

          {/* ══════════ RIGHT ══════════ */}
          <div className="co-right">
            <div className="co-order-title">Your Order</div>

            {cartItems.length === 0 && (
              <p className="co-empty">Your cart is empty.</p>
            )}

            {cartItems.map((item) => (
              <div className="co-order-item" key={item.id}>
                <div className="co-item-img">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="co-item-img-inner" />
                    : <span style={{ fontSize: 22 }}>🍬</span>
                  }
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

            {/* Coupon — above subtotal */}
            <div className="co-coupon-card">
              <div className="co-coupon-title">Apply Coupon</div>
              <div className="co-coupon-row">
                <input
                  className={`co-coupon-input${couponError ? " co-input-error" : ""}`}
                  placeholder="Enter Coupon"
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); setCouponSuccess(""); }}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  disabled={!!appliedCoupon}
                />
                {appliedCoupon
                  ? <button className="co-coupon-remove-btn" onClick={removeCoupon}>Remove</button>
                  : <button className="co-coupon-apply-btn" onClick={applyCoupon}>Apply</button>
                }
              </div>
              {couponError   && <p className="co-field-error">{couponError}</p>}
              {couponSuccess && (
                <div className="co-coupon-applied-row">
                  <span className="co-coupon-code">🏷 {appliedCoupon}</span>
                  <span className="co-coupon-applied-badge">Applied!</span>
                </div>
              )}
            </div>

            <div className="co-divider" />

            {/* Summary */}
            <div className="co-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="co-summary-row">
                <span className="co-discount-label">Discount ({appliedCoupon})</span>
                <span className="co-discount-val">− ₹{couponDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="co-summary-row">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="co-summary-row">
              <span>Taxes <span className="co-tax-rate">(18% GST)</span></span>
              <span>₹{tax.toFixed(2)}</span>
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