import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/styles.css';
import tourlogo from '../Images/tourlogo.jpeg';
const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            alert(`Searching for: ${searchTerm}`);
        }
    };

    


    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo">
                <img src={tourlogo} alt="Travel Logo" />
            </div>

            {/* Navigation Links */}
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/destination">Destination</Link></li>
        
                <li><Link to="guide-register">Guide as Register</Link></li>
                <li><Link to="/packages">Packages</Link></li>


                
            </ul>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>🔍</button>
            </div>
        </nav>
    );
};

export default Navbar;
