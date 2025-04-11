import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Importing React Bootstrap components
import '../Styles/styles.css';
import safari1 from '../Images/safari1.jpeg';

const africaCountries = [
    {
        id: 1,
        name: "Kenya",
        countyInfo: [
            {
                countyName: "Nairobi",
                images: safari1,
                info: "Nairobi is Kenya's capital city, known for its wildlife parks and diverse culture.",
                adventurePlaces: [
                    {
                        name: "Nairobi National Park",
                        image: safari1,
                        description: "Nairobi National Park is a unique wildlife park located just outside Nairobi city, offering visitors the chance to see wildlife with the city skyline in the background.",
                        activities: ["Game Drives", "Picnics", "Wildlife Watching"],
                        entranceFee: "USD 50 for non-residents, KES 1,000 for Kenyans",
                        paymentModes: ["Cash", "Credit/Debit Card", "Mobile Payment (M-Pesa)"],
                        history: "Established in 1946, Nairobi National Park is the first national park to be established in Kenya, serving as a sanctuary for wildlife in the city.",
                        whatToExpect: "Expect to see a variety of wildlife including lions, giraffes, zebras, and rhinos. The park offers panoramic views of the Nairobi skyline.",
                        distanceFromCBD: "7km from Nairobi CBD",
                        guideContact: "Contact John Doe, Guide, at +254 712 345 678",
                        mapLink: "https://www.google.com/maps/place/Nairobi+National+Park"
                    },
                    // Other places...
                ]
            },
            // Other counties...
        ]
    },
    // Other countries...
];

const AdventurePlaceDetailsPage = () => {
    const { countryName, countyName, placeName } = useParams(); // Get parameters from URL
    const country = africaCountries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
    const countyDetails = country?.countyInfo.find((county) => county.countyName.toLowerCase() === countyName.toLowerCase());
    const placeDetails = countyDetails?.adventurePlaces.find((place) => place.name.toLowerCase() === placeName.toLowerCase());

    if (!placeDetails) {
        return (
            <div>
                <h2>Adventure Place not found</h2>
                <p>Sorry, the adventure place you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <Container className="place-details-page" style={{ padding: '20px' }}>
            <Row className="mb-4">
                <Col className="text-center">
                    <h1>{placeDetails.name}</h1>
                    <Card.Img variant="top" src={placeDetails.image} alt={placeDetails.name} className="place-image" />
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Text>{placeDetails.description}</Card.Text>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Entrance Fee:</strong> {placeDetails.entranceFee}</p>
                                    <p><strong>Payment Modes:</strong> {placeDetails.paymentModes.join(", ")}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>History:</strong> {placeDetails.history}</p>
                                    <p><strong>What to Expect:</strong> {placeDetails.whatToExpect}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Distance from CBD:</strong> {placeDetails.distanceFromCBD}</p>
                                    <p><strong>Contact a Guide:</strong> {placeDetails.guideContact}</p>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <Button variant="primary" href={placeDetails.mapLink} target="_blank" rel="noopener noreferrer">
                                    View Live Map
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdventurePlaceDetailsPage;
