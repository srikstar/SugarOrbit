import React from 'react';
import './Footer.css';

const Footer = () => {
    const shopLinks = [
        { name: 'Sweets', href: '#' },
        { name: 'Namkeens', href: '#' },
        { name: 'Snacks', href: '#' },
        { name: 'Chocolates', href: '#' },
        { name: 'Gifting', href: '#' }
    ];

    const quickLinks = [
        { name: "FAQ's", href: '#' },
        { name: 'Blogs', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Site Map', href: '#' }
    ];

    const legalLinks = [
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Return and Exchange', href: '#' },
        { name: 'Privacy Policy', href: '#' }
    ];

    return (
        <footer className="footer-main row">
            <div className="footer-wrapper">

                {/* Footer Links Section */}
                <div className="footer-links-section row-sb">
                    <div className='column'>
                        <img
                            className="footer-logo-icon"
                            src="donut.jpg"
                            alt="footer-logo-icon"
                        />
                        <h2>Sugar Orbit</h2>
                    </div>

                    <div className="footer-links-container row">

                        <div className="footer-column">
                            <h3 className="footer-column-title">Shop Now</h3>
                            <ul className="footer-links-list">
                                {shopLinks.map((link, index) => (
                                    <li key={index} className="footer-link-item">
                                        <a href={link.href} className="footer-link">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-column-title">Quick Links</h3>
                            <ul className="footer-links-list">
                                {quickLinks.map((link, index) => (
                                    <li key={index} className="footer-link-item">
                                        <a href={link.href} className="footer-link">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-column-title">Legals</h3>
                            <ul className="footer-links-list">
                                {legalLinks.map((link, index) => (
                                    <li key={index} className="footer-link-item">
                                        <a href={link.href} className="footer-link">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-column-title">Customer Care</h3>

                            <div className="footer-contact-item row-fs">
                                <a
                                    href="mailto:contact@sugarorbit.com"
                                    className="footer-contact-link"
                                >
                                    contact@sugarorbit.com
                                </a>
                            </div>

                            <div className="footer-contact-item row-fs">
                                <a
                                    href="tel:+8080808088"
                                    className="footer-contact-link"
                                >
                                    +80 8080808088
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom row-sb">
                    <p className="footer-bottom-text">
                        © {new Date().getFullYear()} Sugar Orbit. All rights reserved.
                    </p>
                    <p className="footer-bottom-text">
                        Developed by <span>Sugar Orbit Tech Team</span>
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
