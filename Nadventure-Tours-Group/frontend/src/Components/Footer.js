import React from 'react';
import '../Styles/styles.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-about">
                    <h3>About Us</h3>
                    <p>We provide the best travel experiences tailored to your needs.</p>
                </div>
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="destination">Destinations</Link></li>
                        <li><Link to="blog">Blog</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <Link to="/" target="_blank" rel="noopener noreferrer">🌍</Link>
                        <Link to="/" target="_blank" rel="noopener noreferrer">📘</Link>
                        <Link to="/" target="_blank" rel="noopener noreferrer">📸</Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Travel Explorer. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
