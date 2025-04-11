import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapViewModal from './MapView';
import GuideSelectionModal from './GuideSelectionModal';
import '../Styles/styles.css';
import BookingAppointmentModal from './BookingAppointmentModal';
const ToursAndPackages = () => {
    const [tourPackages, setTourPackages] = useState([]);
    const [filter, setFilter] = useState({
        category: 'All',
        price: 'All',
        days: 0
    });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedGuide, setSelectedGuide] = useState([]);
    const [showGuideModal, setShowGuideModal] = useState(false);
    const [packageIdForGuide, setPackageIdForGuide] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8000/api/tours/')
            .then(response => setTourPackages(response.data))
            .catch(error => console.error('Error fetching packages:', error));
    }, []);

    const handleFindGuidesByLocation = (pkg) => {
        const locationName = pkg.location?.[0]?.name;
        if (!locationName) {
            alert('No location found for this tour package.');
            return;
        }

        axios.get(`http://localhost:8000/api/guides/?location=${locationName}/`)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setSelectedGuide(res.data);
                    setPackageIdForGuide(pkg.id);
                    setShowGuideModal(true);
                } else {
                    alert('No guide found for this location');
                }
            })
            .catch(err => {
                console.error('Error fetching guides:', err);
                alert('Failed to fetch guides for the selected location');
            });
    };

    const handleConnectWithGuide = (guide) => {
        const selectedPackage = tourPackages.find(pkg => pkg.id === packageIdForGuide);
        const locationName = selectedPackage?.location?.[0]?.name || 'Unknown';

        axios.post('http://localhost:8000/api/connect-guide/', {
            guide_id: guide.id,
            location: locationName,
            tour_package_id: selectedPackage.id
        })
            .then(res => {
                alert(`You have been connected to ${guide.name} for the tour of ${locationName}`);
            })
            .catch(err => {
                console.error("Connection failed", err);
                alert("Failed to connect with guide.");
            });
    };

    const filteredPackages = tourPackages.filter(pkg =>
        (filter.category === 'All' || pkg.category === filter.category) &&
        (filter.price === 'All' || pkg.priceRange === filter.price) &&
        (filter.days === 0 || pkg.days <= filter.days)
    );
    // eslint-disable-next-line
    const getLocationNames = (pkg) => {
        if (pkg.location && Array.isArray(pkg.location)) {
            return pkg.location.map(loc => loc.name).join(',');
        }
        return 'No locations available';
    };
   
    const handlePackageImageClick = (pkg) => {
        setSelectedPackage(pkg);
        setShowBookingModal(true);
    };

    return (
        <div className="tours-packages">
             {/* Scrolling animated text section */}
            <div className="scrolling-text">
                <p>For more details, click the package</p>
            </div>
            {/* Filters */}
            <div className="filters">
                <select onChange={(e) => setFilter({...filter, category: e.target.value})}>
                    <option value="All">All Categories</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Cultural">Cultural</option>
                </select>
                <select onChange={(e) => setFilter({...filter, price: e.target.value})}>
                    <option value="All">All Prices</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select onChange={(e) => setFilter({...filter, days: parseInt(e.target.value)})}>
                    <option value="0">All Days</option>
                    <option value="3">Up to 3 days</option>
                    <option value="7">Up to 7 days</option>
                    <option value="14">Up to 14 days</option>
                </select>
            </div>

            {/* Package Listings */}
            <div className="package-grid">
                {filteredPackages.map(pkg => (

                    
                    <div key={pkg.id} className="package-card">
                        <h3>{pkg.name}</h3>

                        <img 
                             src={`http://localhost:8000${pkg.image}`} 
                             alt={pkg.name} 
                             onClick={()=> handlePackageImageClick(pkg)}/>

                        <p>{pkg.description}</p>
                        <p><strong>Price:</strong> $ {pkg.price_range}</p>
                        <p><strong>Duration:</strong> {pkg.days} Days</p>
                        <p><strong>Category:</strong> {pkg.category}</p>
                        {/*<p><strong>Activities:</strong> {pkg.activities?.map(a => a.name).join(', ')}</p>
                        <p><strong>Hotels:</strong> {pkg.hotels?.map(h => h.name).join(', ')}</p>
                        <p><strong>Location:</strong> {getLocationNames(pkg)}</p>*/}
                        <div className='package-button'>
                            <button onClick={() => handleFindGuidesByLocation(pkg)}>
                                Connect with Guide
                            </button>
                            <button onClick={() => {
                                console.log("Selected location:", pkg.location?.[0]?.name || pkg.name);
                                setSelectedLocation(pkg.location?.[0]?.name || pkg.name);
                            }}>
                                View location
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedLocation && (
                <MapViewModal
                    locationName={selectedLocation}
                    onClose={() => setSelectedLocation(null)}
                />
            )}
            
            {showGuideModal && (
                <GuideSelectionModal
                    guides={selectedGuide}
                    onSelect={(guide) => handleConnectWithGuide(guide)}
                    onClose={() => setShowGuideModal(false)}
                />
            )}

            {showBookingModal && (
                <BookingAppointmentModal
                    packageDetails={selectedPackage}
                    onClose={() => setShowBookingModal(false)}  // Close the modal
                />
            )}
        </div>
    );
};

export default ToursAndPackages;