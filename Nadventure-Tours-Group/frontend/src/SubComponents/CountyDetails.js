{ /*import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Added Link for routing
import '../Styles/styles.css';
import safari2 from '../Images/safari2.jpeg';
import safari1 from '../Images/safari1.jpeg';
import Footer from '../Components/Footer';
const africaCountries = [
    {
        id: 1,
        name: "Kenya",
        countyInfo: [
            {
                countyName: "Nairobi",
                images: safari2,
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
                ]
            },
            // Other counties...
        ]
    },
    // Other countries...
];

const CountyDetailsPage = () => {
    const { countryName, countyName } = useParams();
    const country = africaCountries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
    const countyDetails = country?.countyInfo.find((county) => county.countyName.toLowerCase() === countyName.toLowerCase());

    if (!countyDetails) {
        return (
            <div>
                <h2>County not found</h2>
                <p>Sorry, the county you are looking for does not exist. Please check the URL or go back to the main page.</p>
            </div>
        );
    }

    return (
        <div>
        <div className="county-details-page">
            <div className="countyPage" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '10vh' }}>
                <h1>{countyDetails.countyName} - Information</h1>
                <p>{countyDetails.info}</p>
                <img src={countyDetails.images} alt={countyDetails.countyName} />
            </div>

            {countyDetails.adventurePlaces && countyDetails.adventurePlaces.length > 0 && (
                <div>
                    <h3 style={{ fontSize: '1.6em', color: 'green', marginBottom: '20px', textAlign: 'center' }}>
                        Adventure Places in {countyDetails.countyName}
                    </h3>
                    <div className="adventure-places">
                        {countyDetails.adventurePlaces.map((place, index) => (
                            <div key={index} className="adventure-place">
                                <h4>
                                    <Link to={`/place-details/${countryName}/${countyName}/${place.name}`}>{place.name}</Link> 
                                </h4>
                                <img src={place.image} alt={countyDetails.countyName} />
                                <p>{place.description}</p>
                                
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
       <Footer />
        </div>
    );
};

export default CountyDetailsPage;
*/}