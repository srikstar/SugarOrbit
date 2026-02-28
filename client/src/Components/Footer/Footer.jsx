import React from 'react';
import './Footer.css';

/* ── SVG Logos ────────────────────────────────────────── */

const SwiggyInstamart = () => (
  <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="platform-svg">
    <path d="M8 28C8 28 4 22 4 17C4 12 7.5 8 12 8C14 8 15.5 9 16 10.5C16.5 9 18 7 20 7C23 7 25 9.5 25 13C25 18 20 24 16 28C14 26 10 22 8 28Z" fill="currentColor" opacity="0.9"/>
    <text x="30" y="17" fontFamily="'Poppins', sans-serif" fontSize="9" fontWeight="700" fill="currentColor" letterSpacing="0.5">SWIGGY</text>
    <text x="30" y="28" fontFamily="'Poppins', sans-serif" fontSize="10" fontWeight="800" fill="currentColor" letterSpacing="0.3">instamart</text>
  </svg>
)

const Zomato = () => (
  <svg viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="platform-svg">
    <text x="0" y="22" fontFamily="'Poppins', sans-serif" fontSize="22" fontWeight="800" fill="currentColor" letterSpacing="-0.5">zomato</text>
  </svg>
)

const Amazon = () => (
  <svg viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="platform-svg">
    <text x="0" y="22" fontFamily="'Poppins', sans-serif" fontSize="22" fontWeight="400" fill="currentColor" letterSpacing="-0.3">amazon</text>
    <path d="M4 29 Q30 36 68 29" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M64 26 L68 29 L63 30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Swiggy = () => (
  <svg viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="platform-svg">
    <path d="M8 22C8 22 5 17 5 13.5C5 10 7.5 7 11 7C12.5 7 13.5 7.8 14 9C14.5 7.8 15.8 6.5 17.5 6.5C20 6.5 22 8.5 22 12C22 16.5 17.5 21.5 14 24C12 22.5 9.5 19.5 8 22Z" fill="currentColor" opacity="0.85"/>
    <text x="26" y="20" fontFamily="'Poppins', sans-serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="0.2">SWIGGY</text>
  </svg>
)

const Zepto = () => (
  <svg viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="platform-svg">
    <text x="0" y="22" fontFamily="'Poppins', sans-serif" fontSize="22" fontWeight="700" fill="currentColor" letterSpacing="-0.3">zept</text>
    <circle cx="72" cy="18" r="5" fill="currentColor"/>
  </svg>
)

const Blinkit = () => (
  <svg viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="platform-svg">
    <text x="0" y="22" fontFamily="'Poppins', sans-serif" fontSize="22" fontWeight="800" fill="currentColor" letterSpacing="-0.3">blinkit</text>
  </svg>
)

const platforms = [
  { id: 1, label: 'Swiggy Instamart', Logo: SwiggyInstamart },
  { id: 2, label: 'Zomato',           Logo: Zomato           },
  { id: 3, label: 'Amazon',           Logo: Amazon           },
  { id: 4, label: 'Swiggy',           Logo: Swiggy           },
  { id: 5, label: 'Zepto',            Logo: Zepto            },
  { id: 6, label: 'Blinkit',          Logo: Blinkit          },
]

/* ── Footer ───────────────────────────────────────────── */

const Footer = () => {
  const marqueeItems = [...platforms, ...platforms]

  return (
    <footer className="footer-wrapper row">

      {/* ── Available On ── */}
      <section className="available-section">
        <div className="available-rule" />

        <div className="available-header">
          <p className="available-eyebrow">Delivery Partners</p>
          <h2 className="available-title">We Are Also Available On</h2>
          <p className="available-sub">Same day delivery in Bangalore</p>
        </div>

        <div className="marquee-outer">
          <div className="marquee-fade marquee-fade--left"  />
          <div className="marquee-fade marquee-fade--right" />
          <div className="marquee-track">
            {marqueeItems.map((p, i) => (
              <div key={`${p.id}-${i}`} className="marquee-item">
                <div className="platform-pill">
                  <p.Logo />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="available-rule" />
      </section>

      {/* ── Existing footer body ── */}
      <div className="footer-container row-sb-e">
        <div className="footer-brand column">
          <img className='donut-footer-image' src="./donut.svg" alt="donut-footer-image" />
        </div>

        <div className="footer-links row">
          <div className="footer-col row-fs">
            <h4>Shop Now</h4>
            <ul className="column-s">
              <li><a href="#">Sweets</a></li>
              <li><a href="#">Namkeens</a></li>
              <li><a href="#">Chocolates</a></li>
            </ul>
          </div>

          <div className="footer-col row-fs">
            <h4>Quick Links</h4>
            <ul className="column-s">
              <li><a href="#">FAQ's</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">Contact ↗</a></li>
            </ul>
          </div>

          <div className="footer-col row-fs">
            <h4>Legal</h4>
            <ul className="column-s">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy ↗</a></li>
              <li><a href="#">Cookies Preferences Center</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-watermark row">Sugar Orbit</div>

      <div className="credits-copyright-container row">
        <div className="cc-container div-80 row-sb">
          <p>2026. Sugar Orbit Inc.</p>
          <p>Site by Srikanth</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;