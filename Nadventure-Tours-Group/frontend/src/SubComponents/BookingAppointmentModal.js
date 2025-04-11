// BookingAppointmentModal.js
import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/styles.css';

const BookingAppointmentModal = ({ onClose, packageDetails }) => {
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    // eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState('');
    // eslint-disable-next-line
    const [isSubmitted, setIsSubmitted] = useState(false);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactInfo({
            ...contactInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post('http://localhost:8000/api/booking/', {
            name: contactInfo.name,
            email: contactInfo.email,
            phone: contactInfo.phone,
            tour_package_id: packageDetails.id,
            tour_name: packageDetails.name,
        })
        .then(response => {
            setSuccessMessage('Thank you, we will get back to you in the next 20 minutes. Please bear with us.');
            setIsSubmitted(true);  // <== Hide form
            setLoading(false);
        
            // Let the message disappear, but not the isSubmitted flag
            setTimeout(() => {
                setSuccessMessage('');
            }, 10000);
        })
        .catch(error => {
            console.error('Error booking the appointment:', error);
            setLoading(false);
            setErrorMessage('Failed to submit your information. Please try again later.');
        
            // Clear the error after 10 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 10000);
        });
    };

    return (
        <div className="modal">
            <div className="content">
                
                {successMessage && <p>{successMessage}</p>}
                {!successMessage && (
                    <form onSubmit={handleSubmit}>
                        <h2>Book Your Appointment</h2>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={contactInfo.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={contactInfo.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={contactInfo.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                            <button className="close" onClick={onClose}>Close</button>
                        </button>
                      
                    </form>
                )}
                
            </div>
        </div>
    );
};

export default BookingAppointmentModal;
