import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MapView from './MapView'; 
import ReviewSection from './ReviewSection'; 

const PackageDetailsPage = () => {
  const { packageId } = useParams(); 
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`http://localhost:8000/api/tours/${packageId}`)
      .then(response => setSelectedPackage(response.data))
      .catch(error => {
        console.error('Error fetching package details:', error);
        //navigate('/'); // Redirect to home page if package not found
      });
  }, [packageId, navigate]);

  if (!selectedPackage) return <div>Loading...</div>;

  return (
    <div className="package-details">
      <h3>{selectedPackage.name}</h3>
      <img src={`http://localhost:8000${selectedPackage.image}`} alt={selectedPackage.name} />
      <p>{selectedPackage.description}</p>

      <MapView locations={selectedPackage.location || []} />

      <div className="customize-package">
        <h4>Customize Your Package</h4>
        <p><strong>Days:</strong> {selectedPackage.days} <button>Edit</button></p>
        <p><strong>Hotels:</strong> {selectedPackage.hotels?.map(h => h.name).join(', ')} <button>Edit</button></p>
        <p><strong>Activities:</strong> {selectedPackage.activities?.map(a => a.name).join(', ')} <button>Edit</button></p>
      </div>

      {/* Reviews and Ratings */}
      <ReviewSection reviews={selectedPackage.review} />
    </div>
  );
};

export default PackageDetailsPage;
