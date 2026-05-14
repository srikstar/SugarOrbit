import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "./Checkout.css";

import { auth } from "../../FirebaseConfig";
import { setAuthData } from "../../Redux/user.auth";
import { setUserData } from "../../Redux/user.redux";
import { getUser } from "../../API/user.api";
import { applyCouponAPI } from "../../API/coupons.api.js"

// ─── helpers ─────────────────────────────────────────────────────────────────

const isValidPhone = (v) => /^\d{10}$/.test(v);

// ─── Firebase OTP ─────────────────────────────────────────────────────────────

let confirmationResult = null;
let recaptchaVerifier  = null;

const clearVerifier = () => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
    recaptchaVerifier = null;
  }
};

const requestOtp = async (phone) => {
  clearVerifier();
  recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
    callback: () => {},
    "expired-callback": () => clearVerifier(),
  });
  await recaptchaVerifier.render();
  confirmationResult = await signInWithPhoneNumber(auth, `+91${phone}`, recaptchaVerifier);
};

const confirmOtp = async (otp) => {
  const result = await confirmationResult.confirm(otp);
  return result.user;
};

// ─── Countdown ────────────────────────────────────────────────────────────────

function Countdown({ seconds, onEnd }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    setLeft(seconds);
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) { clearInterval(id); onEnd(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return <span className="co-otp-resend-timer">Resend in {left}s</span>;
}

/* ─────────────────────────────────────────
   OTP Login form (guest users)
───────────────────────────────────────── */
function OtpLogin() {
  const dispatch = useDispatch();

  const [phone, setPhone]           = useState("");
  const [step, setStep]             = useState("phone"); // "phone" | "otp"
  const [otp, setOtp]               = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError]     = useState("");
  const [loading, setLoading]       = useState(false);
  const [canResend, setCanResend]   = useState(false);

  const inputs = useRef([]);
  const digits = otp.split("").concat(Array(6).fill("")).slice(0, 6);

  // ── OTP box keyboard handler ──────────────────────────────────────────────
  const handleOtpKey = (e, i) => {
    if (e.key === "Backspace") {
      const next = digits.slice();
      if (next[i]) {
        next[i] = "";
        setOtp(next.join(""));
      } else if (i > 0) {
        next[i - 1] = "";
        setOtp(next.join(""));
        inputs.current[i - 1]?.focus();
      }
      return;
    }
    if (!/^\d$/.test(e.key)) return;
    const next = digits.slice();
    next[i] = e.key;
    setOtp(next.join(""));
    setOtpError("");
    if (i < 5) inputs.current[i + 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    setOtp(pasted.padEnd(6, "").slice(0, 6));
    inputs.current[Math.min(pasted.length, 5)]?.focus();
    e.preventDefault();
  };

  // ── Send OTP ──────────────────────────────────────────────────────────────
  const sendOtp = async () => {
    setPhoneError("");
    if (!isValidPhone(phone)) {
      setPhoneError("Enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    try {
      await requestOtp(phone);
      setStep("otp");
      setCanResend(false);
      setTimeout(() => inputs.current[0]?.focus(), 100);
    } catch {
      setPhoneError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Verify OTP → fetch user → dispatch to Redux ───────────────────────────
  const verifyOtp = async () => {
    if (otp.length < 6) { setOtpError("Please enter all 6 digits."); return; }
    setOtpError("");
    setLoading(true);
    try {
      const firebaseUser = await confirmOtp(otp);

      dispatch(setAuthData({ phone: firebaseUser.phoneNumber, uid: firebaseUser.uid }));

      const dbUser = await getUser(firebaseUser.phoneNumber);
      if (dbUser?.isLoggedIn === false) {
        setOtpError("No account found. Please sign up first.");
        setLoading(false);
        return;
      }

      dispatch(setUserData(dbUser));
    } catch {
      setOtpError("Incorrect OTP. Please try again.");
      setOtp("");
      setTimeout(() => inputs.current[0]?.focus(), 100);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setOtp(""); setOtpError(""); setCanResend(false);
    try { await requestOtp(phone); } catch { setOtpError("Could not resend OTP."); }
  };

  return (
    <div className="co-otp-card">
      <div id="recaptcha-container" />

      {step === "phone" ? (
        <>
          <p className="co-otp-label">Sign in with your mobile number to continue</p>
          <div className="co-phone-row">
            <div className="co-phone-prefix">🇮🇳 +91</div>
            <input
              className={`co-input${phoneError ? " co-input-error" : ""}`}
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setPhoneError(""); }}
              onKeyDown={(e) => e.key === "Enter" && sendOtp()}
            />
          </div>
          {phoneError && <p className="co-field-error">{phoneError}</p>}
          <button className="co-otp-submit-btn" onClick={sendOtp} disabled={loading}>
            {loading ? "Sending…" : "Send OTP →"}
          </button>
        </>
      ) : (
        <>
          <p className="co-otp-label">
            Enter the 6-digit OTP sent to{" "}
            <strong>+91 {phone.replace(/(\d{2})\d{6}(\d{2})/, "$1••••••$2")}</strong>
          </p>

          <div className="co-otp-boxes">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                className={`co-otp-box${otpError ? " co-otp-box-error" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={() => {}}
                onKeyDown={(e) => handleOtpKey(e, i)}
                onPaste={handleOtpPaste}
                onFocus={(e) => e.target.select()}
                autoFocus={i === 0}
              />
            ))}
          </div>

          {otpError && <p className="co-field-error">{otpError}</p>}

          <button
            className="co-otp-submit-btn"
            onClick={verifyOtp}
            disabled={loading || otp.length < 6}
          >
            {loading ? "Verifying…" : "Verify & Continue →"}
          </button>

          <div className="co-otp-resend-row">
            {canResend
              ? <button className="co-otp-back-btn" onClick={handleResend}>Resend OTP</button>
              : <Countdown seconds={30} onEnd={() => setCanResend(true)} />
            }
          </div>

          <button
            className="co-otp-back-btn"
            onClick={() => { setStep("phone"); setOtp(""); setOtpError(""); }}
          >
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
        id:       `${item._id}-${item.selectedSize}`,
        name:     item.productName,
        variant:  item.selectedSize,
        price:    item.price,
        quantity: item.quantity,
        image:    item.productImages?.[0],
      }));

  /* ── Totals ── */
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 100;
  const tax      = Math.round(subtotal * 0.18 * 100) / 100;

  /* ── Coupon ── */
  const [couponInput, setCouponInput]       = useState("");
  const [appliedCoupon, setAppliedCoupon]   = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError]       = useState("");
  const [couponSuccess, setCouponSuccess]   = useState("");
  const [couponLoading, setCouponLoading]   = useState(false); // ← new

  const applyCoupon = async () => {
    setCouponError(""); setCouponSuccess("");
    const code = couponInput.trim().toUpperCase();
    if (!code) { setCouponError("Please enter a coupon code."); return; }

    setCouponLoading(true);
    try {
      // Pass subtotal as cartTotal (items total before shipping & tax)
      const res = await applyCouponAPI(code, subtotal);
      if (res.success) {
        setAppliedCoupon(res.coupon.code);
        setCouponDiscount(res.discount);
        setCouponSuccess(`Coupon applied! You save ₹${res.discount.toFixed(2)}`);
      }
    } catch (err) {
      // Backend throws { success: false, message: "..." } on 4xx errors
      setCouponError(err.message || "Invalid coupon code. Please try again.");
      setAppliedCoupon(""); setCouponDiscount(0);
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(""); setCouponDiscount(0);
    setCouponInput(""); setCouponError(""); setCouponSuccess("");
  };

  /* ── Billing ── */
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  /* ── Final total ── */
  const total = subtotal + shipping + tax - couponDiscount;

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
              <div className="co-order-item" key={`${item.id}-${item.variant}`}>
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

            {/* Coupon */}
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
                  : (
                    <button
                      className="co-coupon-apply-btn"
                      onClick={applyCoupon}
                      disabled={couponLoading}
                    >
                      {couponLoading ? "Checking…" : "Apply"}
                    </button>
                  )
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