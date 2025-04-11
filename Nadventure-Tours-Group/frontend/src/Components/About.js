import React from 'react';
import '../Styles/styles.css';

const About = () => {
    return (
        <section className="about">
            <div className="about-container">
                <h2>Who We Are</h2>
                <p className="about-intro">
                    At <span className="brand-name">Travel Explorer</span>, we turn dreams into reality. Whether you're seeking breathtaking landscapes, immersive cultural experiences, or luxurious getaways, we craft journeys that leave lasting memories.
                </p>

                <div className="about-grid">
                    <div className="about-text">
                        <h3>Why Choose Us?</h3>
                        <p>We believe travel should be **seamless, stress-free, and extraordinary**. With years of expertise, a passion for exploration, and a commitment to excellence, we ensure every detail is perfected for your adventure.</p>
                        <p>Our dedicated team works tirelessly to provide personalized experiences tailored to your unique preferences.</p>
                    </div>

                    <div className="about-stats">
                        <div className="stat-item">
                            <span>100+</span>
                            <p>Exotic Destinations</p>
                        </div>
                        <div className="stat-item">
                            <span>500+</span>
                            <p>Happy Clients</p>
                        </div>
                        <div className="stat-item">
                            <span>98%</span>
                            <p>Satisfaction Rate</p>
                        </div>
                    </div>
                </div>

                <div className="about-cta">
                    <h3>Let’s Plan Your Next Adventure</h3>
                    <p>Get in touch today and let us create the perfect itinerary for you!</p>
                    <a href="/contact" className="btn">Contact Us</a>
                </div>
            </div>
        </section>
    );
};

export default About;
