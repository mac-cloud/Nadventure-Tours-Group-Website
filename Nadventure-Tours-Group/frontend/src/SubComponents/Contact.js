import React, { useState } from 'react';
import '../Styles/styles.css';
import Footer from '../Components/Footer';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setStatus('Please fill in all fields.');
            return;
        }

        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });

        // Here, you can integrate an API to actually send the message
    };

    return (
        <div>
        <section className="contact-section">
            <div className="contact-container">
                <h1>Contact </h1>
                <p>We'd love to hear from you! Reach out with any questions or feedback.</p>

                <form onSubmit={handleSubmit} className="contact-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Send Message</button>
                </form>

                {status && <p className="status-message">{status}</p>}
            </div>
            
        </section>
       <Footer/>
       </div>
    );
    
};

export default Contact;
