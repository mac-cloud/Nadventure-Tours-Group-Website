import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import Navbar from "./Components/Navbar.js";
import Homepage from './Components/Homepage.js';
import Services from './Components/Service.js';
import Blog from './Components/Blog.js';
import Footer from './Components/Footer.js';
import About from './Components/About.js';
import Story from './Components/StoryTelling.js';
import Contact from './SubComponents/Contact.js';
import Destinations from './SubComponents/Destination.js';
import ToursAndPackages from './SubComponents/TourPackages.js';
//import CountyDetailsPage from './SubComponents/CountyDetails.js';
import AdventurePlaceDetailsPage from './SubComponents/AdventurePlaceDetailsPage.js';
import GuideRegistrationPage from './Registering/GuideRegisterionPage.js';
import PackageDetailsPage from './SubComponents/PackageDetails.js';
function App() {
  return (
    <Router>
      <Navbar />

      {/* Add a link to the Contact page */}
      <nav>
        <Link to="/contact">Go to Contact</Link>
        <Link to="/destination">Destination</Link>
        <Link to="/packages">Packages</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <Homepage />
            <Services />
            <Blog />
            <Story />
            <About />
            <Footer />
          </>
        } />
        <Route path="/contact" element={<Contact />} />
        <Route path="/destination" element={<Destinations />} />
        <Route path="/packages" element={<ToursAndPackages />} />
        {/*<Route path="/county/:countryName/:countyName" element={<CountyDetailsPage />} /> */}
        <Route path="/place-details/:countryName/:countyName/:placeName" element={<AdventurePlaceDetailsPage />} />
        <Route path="/guide-register" element={<GuideRegistrationPage />} /> 
        <Route path="/package/:packageId" element={<PackageDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
