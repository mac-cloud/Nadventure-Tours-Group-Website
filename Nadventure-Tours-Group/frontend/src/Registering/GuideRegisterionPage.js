import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
// eslint-disable-next-line
import axios, { formToJSON } from 'axios';
import '../Styles/styles.css';


const GuideRegistrationPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        clearance_certificate: '',
        relevant_certificate: '',
        licenses: '',
        experience: '',
        country: '',
        location: '',
        qualifications: '',
        id_proof: '', // Assuming a file upload for ID proof
        status: 'pending', // Default state is 'pending'
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [locations, setLocations] = useState([]);

    const countryLocations = {
        Kenya: ["Nairobi", "Mombasa", "Nakuru", "Nyeri"],
        Uganda: ["Kampala", "Entebbe", "Gulu"],
        Tanzania: ["Dar es Salaam", "Arusha", "Dodoma"],
        Rwanda: ["Kigali", "Butare", "Gisenyi"],
        "South Africa": ["Cape Town", "Johannesburg", "Durban"],
        Namibia: ["Windhoek", "Swakopmund", "Walvis Bay"],
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData ({
            ...formData,
            [name]: value,
        });

        if (name === "country") {
            setLocations(countryLocations[value] || []);
            setFormData((prev) => ({
                ...prev,
                location: "",
            }))
        };
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
    
            const response = await axios.post('http://localhost:8000/api/register/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201 || response.status === 'Guide registerd successfully') {
                setSuccess('Guide registered successfully. Awaiting admin approval.');
                setError(null);
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    password: '',
                    address: '',
                    experience: '',
                    country: '',
                    location: '',
                    qualifications: '',
                    relevant_certificate:'',
                    clearance_certificate:'',
                    licenses:'',
                    id_proof: '',
                    status: 'pending',
                });
            } else {
                throw new Error("Unexpected response");
            }
    
        } catch (error) {
            console.error(error.response?.data || error.message);
    
            if (error.response?.status === 400 || error.response?.status === 409) {
                // Backend returned a validation or duplicate error
                const serverMessage = error.response.data?.detail || "These details already exist in the system.";
                setError(serverMessage);
            } else {
                setError('There was an error during registration. Please try again.');
            }
            setSuccess(null);
        }
    };
        
    
       
    

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2>Guide Registration</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="experience">
                            <Form.Label>Experience (Years)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter years of experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                as="select"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select your Country</option>
                                {Object.keys(countryLocations).map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        
                        {formData.country && (
                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="location"
                                    value={formData.location || ""}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select your Location</option>
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc}>
                                            {loc}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}
             
                        <Form.Group controlId="qualifications">
                            <Form.Label>Qualifications</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your qualifications"
                                name="qualifications"
                                value={formData.qualifications}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="relevantCertificate">
                            <Form.Label>Relevant Certificates</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Enter your relevant certificates"
                                name="relevant_certificate"
                                
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="clearanceCertificate">
                            <Form.Label>Clearance Certificate</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Clearance certificate"
                                name="clearance_certificate"
                                
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="licenses">
                            <Form.Label>Tour Guide License</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Tour Guide License"
                                name="licenses"
                                
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="id_proof">
                            <Form.Label>ID Proof</Form.Label>
                            <Form.Control
                                type="file"
                                name="id_proof"
                                accept=".pdf, .jpg, .png"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register Guide
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default GuideRegistrationPage;
