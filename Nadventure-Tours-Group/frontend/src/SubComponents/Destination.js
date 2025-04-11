import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/styles.css';
import Footer from '../Components/Footer';


const AfricaWildlifePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countyName, setCountyName] = useState('');
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [countyInfo, setCountyInfo] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:8000/api/countries/')
           .then(response => setCountries(response.data))
           .catch(error => console.error(error));
    }, []);


    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        setIsModalOpen(true); 
    };

    const handleCountyInputChange = (e,) => {
        setCountyName(e.target.value); 
        
    };

    const handleContinueClick = async() => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/countries/${selectedCountry.name}/county/${countyName}/`
            );

            const county_info = response.data;

            if (county_info) {
                setCountyInfo(county_info);
                setIsModalOpen(false);

                } else {
                    alert('Couty not found. Please try again');
                }
        } catch (error) {
            console.error('Error fetching countyinfo', error);
            alert('County not found! Please try again.');
        } 
    };

    return (
        <div>
        <div className="africa-wildlife-page">
            <h2>African Countries and Their Wildlife</h2>
            <div className="country-list">
                {countries.map(country => (
                    <div key={country.id} className="country-card" onClick={() => handleCountryClick(country)}>              
                        <img src={`http://localhost:8000${country.image}`} alt={country.image} />     
                        <div className="country-info">
                            <h3>{country.name}</h3>
                            <ul className="country-description">
                                {country.descriptions.map((desc, index) => (
                                    <li key={index}>{desc.text}</li>
                                ))}
                              
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && selectedCountry && (
    <div className="modal-overlay">
        <div className="modal-content" style={{ height: '82%' }}>
            <p style={{ fontSize: '24px', color: 'green'}}>Welcome! Get to know the country more 🌍</p>
            <h2>Enter the County Name</h2>
            <input
                type="text"
                placeholder="Enter county name"
                value={countyName}
                onChange={handleCountyInputChange}
            />
            <img
                src={`http://localhost:8000${selectedCountry.image}`}
                alt={selectedCountry.name}
                style={{ width: '100%', height: '30%' }}
            />
            <div style={{ marginTop: '1rem' }}>
                <button onClick={handleContinueClick} style={{ marginRight: '0.5rem' }}>➡️</button>
                <button onClick={() => setIsModalOpen(false)}>❌</button>
            </div>
        </div>
    </div>
)}

        </div>
        <Footer />
</div>
    );
};

export default AfricaWildlifePage;
