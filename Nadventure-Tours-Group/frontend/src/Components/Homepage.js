// Components/HomePage.js
import React from 'react';
import '../Styles/styles.css';
import safari from '../Images/safari.jpg';
import MagazineSubscription from '../SubComponents/Subscription';
const HomePage = () => {
  return (
    <div>
    <div className="home-section">
      <img src={safari} alt='safari adventure' className="background-image"/>
      <div className="overlay-content">
      <MagazineSubscription />
      </div>
      
    </div>
    
    </div>
  );
};

export default HomePage;
