import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper row">
      <div className="footer-container row-sb-e">
        <div className="footer-brand column">
          <img className='donut-footer-image' src="./donut.svg" alt="donut-footer-image" />
        </div>

        <div className="footer-links row">
          <div className="footer-col row">
            <h4>Shop Now</h4>
            <ul className="column">
              <li><a href="#">Sweets</a></li>
              <li><a href="#">Namkeens</a></li>
              <li><a href="#">Chocolates</a></li>
            </ul>
          </div>

          <div className="footer-col row">
            <h4>Quick Links</h4>
            <ul className="column">
              <li><a href="#">FAQ's</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">Contact ↗</a></li>
            </ul>
          </div>

          <div className="footer-col row">
            <h4>Legal</h4>
            <ul className="column">
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